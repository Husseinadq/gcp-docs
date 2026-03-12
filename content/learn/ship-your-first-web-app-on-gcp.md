---
title: Ship Your First Web App on GCP
description: A guided tutorial for understanding the smallest useful GCP stack for a modern web app.
docType: tutorial
goal: I want one guided path that teaches me the platform while I ship a simple web app stack.
difficulty: beginner
estimatedTime: 20 minutes
lastReviewed: 2026-03-11
order: 1
bestFor:
  - First-time GCP users
  - Startup teams
  - Full-stack developers moving from Vercel, AWS, or Render
prerequisites:
  - A Google Cloud account
  - A web app that can run in a container
  - Basic comfort with command-line deployment
related:
  - /docs/explain/how-gcp-is-organized
  - /docs/how-to/deploy-to-cloud-run
  - /docs/reference/cloud-run
---

## Outcome

By the end of this tutorial, you should understand a simple and useful first GCP stack:

- Cloud Run for the app
- Cloud Storage for files
- Secret Manager for secrets
- IAM for access control

That is enough to teach the core platform shape without drowning you in options.

## Fast path

This tutorial gives you one small but real stack:

- one Cloud Run service
- one Cloud Storage bucket
- one runtime service account

## 1. Set your project and enable the core APIs

```bash
export PROJECT_ID="your-project-id"
export REGION="us-central1"
export SERVICE="starter-web"
export BUCKET_NAME="${PROJECT_ID}-starter-files"
export SERVICE_ACCOUNT_NAME="starter-web"

gcloud config set project "$PROJECT_ID"
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  storage.googleapis.com \
  iam.googleapis.com
```

## 2. Create the runtime identity

```bash
gcloud iam service-accounts create "$SERVICE_ACCOUNT_NAME" \
  --description="Runtime identity for the starter web app" \
  --display-name="starter-web"

export SERVICE_ACCOUNT_EMAIL="${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
```

## 3. Create the uploads bucket

```bash
gcloud storage buckets create "gs://${BUCKET_NAME}" \
  --location="$REGION" \
  --uniform-bucket-level-access

gcloud storage buckets add-iam-policy-binding "gs://${BUCKET_NAME}" \
  --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}" \
  --role="roles/storage.objectUser"
```

At this point the mental model is already visible:

- the project is the boundary
- the service account is the workload identity
- the bucket is the file boundary
- Cloud Run will be the request boundary

## 4. Create one tiny app

`package.json`

```json
{
  "name": "starter-web",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.21.2"
  }
}
```

`server.js`

```js
import express from 'express'

const app = express()
const port = process.env.PORT || 8080

app.get('/', (_req, res) => {
  res.json({
    service: 'starter-web',
    uploadsBucket: process.env.BUCKET_NAME,
    status: 'ok'
  })
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
```

Install the dependency:

```bash
npm install
```

## 5. Deploy the app

```bash
gcloud run deploy "$SERVICE" \
  --source . \
  --region "$REGION" \
  --service-account "$SERVICE_ACCOUNT_EMAIL" \
  --set-env-vars "BUCKET_NAME=${BUCKET_NAME}" \
  --allow-unauthenticated
```

## 6. Verify the stack

```bash
SERVICE_URL="$(gcloud run services describe "$SERVICE" --region "$REGION" --format='value(status.url)')"

curl "$SERVICE_URL"
gcloud storage ls "gs://${BUCKET_NAME}"
```

Expected response shape:

```json
{"service":"starter-web","uploadsBucket":"your-project-id-starter-files","status":"ok"}
```

## Why this tutorial uses so few services

The goal of a tutorial is not to prove how many GCP products exist.

The goal is to create a stable mental model:

- one project holds the workload
- one runtime serves the app
- one storage service holds files
- one identity model controls access

Once that clicks, the rest of GCP gets easier.

## Checkpoints

You should now be able to explain:

- which project owns the stack
- which service account the app runs as
- which bucket holds files
- which Cloud Run service receives traffic

## Move from learning to execution

Once the mental model is clear, stop reading tutorials and switch to task guides.

Use:

- [Deploy to Cloud Run](/docs/how-to/deploy-to-cloud-run) for deployment steps
- [Store User Uploads in Cloud Storage](/docs/how-to/store-user-uploads-in-cloud-storage) for file handling

That is the correct handoff. Tutorials teach. How-to guides execute.

## What this tutorial deliberately skips

- advanced networking
- multi-region design
- database tuning
- organization-wide policy design

Those are real topics, but they are not day-one topics.

## What to do next

1. Read [How GCP Is Organized](/docs/explain/how-gcp-is-organized) if projects and billing still feel fuzzy.
2. Use [Deploy to Cloud Run](/docs/how-to/deploy-to-cloud-run) when you want the concrete deployment steps.
3. Keep [Cloud Run](/docs/reference/cloud-run) open when you need a fast factual snapshot.
