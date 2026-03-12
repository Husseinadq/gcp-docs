---
title: Deploy to Cloud Run
description: The shortest safe path to deploying a containerized web app on Cloud Run.
docType: how-to
goal: I have a containerized app and I want to deploy it to Cloud Run with the minimum useful setup.
difficulty: beginner
estimatedTime: 12 minutes
lastReviewed: 2026-03-11
order: 1
bestFor:
  - First Cloud Run deployment
  - Small services and APIs
  - Teams choosing managed compute over Kubernetes
prerequisites:
  - A GCP project with billing enabled
  - A containerized application
  - Permission to deploy services in the target project
related:
  - /docs/reference/cloud-run
  - /docs/explain/iam-in-plain-english
---

## Goal

Deploy one HTTP application to Cloud Run cleanly enough that you can understand the deployment shape and improve it later.

## Assumptions

This guide assumes:

- your app already runs in a container
- you are not solving advanced networking yet
- your first goal is a working managed deployment

## 1. Set your variables

```bash
export PROJECT_ID="your-project-id"
export REGION="us-central1"
export REPOSITORY="app-images"
export SERVICE="web-api"
export IMAGE_URI="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${SERVICE}:v1"
export SERVICE_ACCOUNT_NAME="web-api-runner"

gcloud config set project "$PROJECT_ID"
gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com
```

## 2. Create the runtime service account

```bash
gcloud iam service-accounts create "$SERVICE_ACCOUNT_NAME" \
  --description="Runtime identity for ${SERVICE}" \
  --display-name="${SERVICE}"

export SERVICE_ACCOUNT_EMAIL="${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
echo "$SERVICE_ACCOUNT_EMAIL"
```

If the app needs storage, secrets, or database access, add only those roles next. Do not start with `Editor`.

## 3. Create an Artifact Registry repository

```bash
gcloud artifacts repositories create "$REPOSITORY" \
  --repository-format=docker \
  --location="$REGION"
```

If the repository already exists, Google Cloud returns an "already exists" message. That is fine.

## 4. Confirm the app exposes port `8080`

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

The container must listen on the `PORT` environment variable that Cloud Run provides.

## 5. Build and push the image

```bash
gcloud builds submit \
  --tag "$IMAGE_URI"
```

This gives you one versioned image you can reason about and roll forward from.

## 6. Deploy to Cloud Run

```bash
gcloud run deploy "$SERVICE" \
  --image "$IMAGE_URI" \
  --region "$REGION" \
  --service-account "$SERVICE_ACCOUNT_EMAIL" \
  --allow-unauthenticated
```

## 7. Verify the result

```bash
SERVICE_URL="$(gcloud run services describe "$SERVICE" \
  --region "$REGION" \
  --format='value(status.url)')"

echo "$SERVICE_URL"
curl "$SERVICE_URL"
```

Check the attached identity:

```bash
gcloud run services describe "$SERVICE" \
  --region "$REGION" \
  --format='value(spec.template.spec.serviceAccountName)'
```

## 8. Read logs after the first request

```bash
gcloud logging read \
  "resource.type=cloud_run_revision AND resource.labels.service_name=${SERVICE}" \
  --limit=20 \
  --format='value(textPayload)'
```

## Common failure points

### The app boots locally but fails in Cloud Run

This often means the container contract is wrong or required configuration is missing.

### The app deploys but cannot reach another service

This is often an IAM or networking assumption problem, not a deployment failure.

### The service works but the structure is unclear

That usually means too many responsibilities were packed into the first deployment.

## Stop condition

You are done when:

- the service responds successfully
- the service account is the one you intended
- the image URI is versioned and visible
- the logs show the running revision

## What to keep open while doing this

- [IAM in Plain English](/docs/explain/iam-in-plain-english)
- [Cloud Run](/docs/reference/cloud-run)
