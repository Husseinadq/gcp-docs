---
title: Cloud Run quickstart
description: The shortest useful path to shipping one service on Cloud Run without hiding the important decisions.
docType: how-to
category: Get started
goal: I want to deploy one web service to Cloud Run and understand the pieces that matter.
summary: Start with one HTTP service, one service account, and one clear deployment boundary.
difficulty: beginner
estimatedTime: 12 minutes
lastReviewed: 2026-03-11
order: 1
bestFor:
  - First Cloud Run deployment
  - Internal APIs
  - Small production services
prerequisites:
  - A GCP project with billing enabled
  - A containerized app that runs locally
  - Permission to deploy Cloud Run services
related:
  - /docs/cloud-run/deploy-from-image
  - /docs/cloud-run/revision-model
  - /docs/cloud-run/common-commands
---

## Goal

Deploy one containerized service cleanly enough that you can explain how it runs, who it runs as, and where it logs.

## Fast path

This example uses Node.js and Cloud Run source deployment so you can go from an empty folder to a live URL with one service.

## 1. Set your project and service name

```bash
export PROJECT_ID="your-project-id"
export REGION="us-central1"
export SERVICE="hello-cloud-run"

gcloud config set project "$PROJECT_ID"
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
```

## 2. Create a tiny web app

`package.json`

```json
{
  "name": "hello-cloud-run",
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
    service: 'hello-cloud-run',
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

## 3. Deploy from source

```bash
gcloud run deploy "$SERVICE" \
  --source . \
  --region "$REGION" \
  --allow-unauthenticated
```

Cloud Run builds the container for you, stores the image, and deploys one revision.

## 4. Verify the deployment

```bash
SERVICE_URL="$(gcloud run services describe "$SERVICE" --region "$REGION" --format='value(status.url)')"

echo "$SERVICE_URL"
curl "$SERVICE_URL"
```

Expected response:

```json
{"service":"hello-cloud-run","status":"ok"}
```

## 5. What you should have now

- one deployed service
- one public URL
- one Cloud Run revision you can inspect and roll forward from

## Why this is the right first shape

It is one service with one responsibility, one route, and one deploy command.

That keeps Cloud Run understandable before you add secrets, storage, or a database.

## What to read next

- [Deploy from a container image](/docs/cloud-run/deploy-from-image)
- [Revision model](/docs/cloud-run/revision-model)
- [Common commands](/docs/cloud-run/common-commands)
