---
title: Deploy from a container image
description: Build an image, push it to Artifact Registry, and deploy it to Cloud Run with a deliberate runtime identity.
docType: how-to
category: Guides
goal: I already have a Dockerized app and I want the cleanest path to deploying it on Cloud Run.
summary: Use Artifact Registry for the image, a dedicated service account for runtime identity, and one explicit deploy command.
difficulty: intermediate
estimatedTime: 15 minutes
lastReviewed: 2026-03-13
order: 1
bestFor:
  - Teams already using Docker
  - CI pipelines that build images before deploy
  - Cloud Run services with explicit runtime identity
prerequisites:
  - A Dockerized app
  - A GCP project with billing enabled
  - Permission to create Artifact Registry repos and deploy Cloud Run services
related:
  - /docs/cloud-run/private-services
  - /docs/cloud-run/common-commands
  - /docs/cloud-run/revision-model
---

## Goal

Push one versioned image to Artifact Registry and deploy it to Cloud Run with a runtime identity you can explain later.

## 1. Set your variables

```bash
export PROJECT_ID="your-project-id"
export REGION="us-central1"
export REPOSITORY="app-images"
export SERVICE="docs-api"
export IMAGE_URI="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${SERVICE}:v1"
export SERVICE_ACCOUNT_NAME="docs-api-runner"

gcloud config set project "$PROJECT_ID"
gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com
```

## 2. Create the runtime identity

```bash
gcloud iam service-accounts create "$SERVICE_ACCOUNT_NAME" \
  --description="Runtime identity for ${SERVICE}" \
  --display-name="${SERVICE}"

export SERVICE_ACCOUNT_EMAIL="${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
```

If the service needs storage, secrets, or database access, bind only those roles next.

## 3. Create the Artifact Registry repository

```bash
gcloud artifacts repositories create "$REPOSITORY" \
  --repository-format=docker \
  --location="$REGION"
```

If the repository already exists, continue.

## 4. Confirm the app is Cloud Run-compatible

`Dockerfile`

```dockerfile
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ENV PORT=8080
CMD ["npm", "start"]
```

The container must listen on `PORT`, not on a hard-coded local port.

## 5. Build and push the image

```bash
gcloud builds submit --tag "$IMAGE_URI"
```

## 6. Deploy the image

```bash
gcloud run deploy "$SERVICE" \
  --image "$IMAGE_URI" \
  --region "$REGION" \
  --service-account "$SERVICE_ACCOUNT_EMAIL" \
  --allow-unauthenticated
```

## 7. Verify the result

```bash
SERVICE_URL="$(gcloud run services describe "$SERVICE" --region "$REGION" --format='value(status.url)')"

echo "$SERVICE_URL"
curl "$SERVICE_URL"
```

Check the runtime identity:

```bash
gcloud run services describe "$SERVICE" \
  --region "$REGION" \
  --format='value(spec.template.spec.serviceAccountName)'
```

## Stop condition

You are done when:

- the service responds successfully
- the image URI is versioned and visible
- the runtime identity is the service account you expected
