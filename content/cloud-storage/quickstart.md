---
title: Cloud Storage quickstart
description: The shortest safe path to storing files in Cloud Storage instead of inside your runtime.
docType: how-to
category: Get started
goal: I need durable file storage for uploads, assets, or generated artifacts.
summary: Start with one bucket, one clear access model, and one cleanup rule.
difficulty: beginner
estimatedTime: 10 minutes
lastReviewed: 2026-03-11
order: 1
bestFor:
  - User uploads
  - Report exports
  - Static files shared across services
prerequisites:
  - A GCP project
  - Permission to create or use a bucket
  - An app or workload that needs durable object storage
related:
  - /docs/cloud-storage/uploads-from-node-service
  - /docs/cloud-storage/signed-urls
  - /docs/cloud-storage/common-commands
  - /docs/cloud-storage/troubleshooting
---

## Goal

Move file data into Cloud Storage so it survives restarts, deployments, and scaling events.

## Fast path

This quickstart creates one bucket, uploads one file with the CLI, and then shows the smallest useful Node.js upload snippet.

## 1. Set your project and bucket name

```bash
export PROJECT_ID="your-project-id"
export REGION="us-central1"
export BUCKET_NAME="${PROJECT_ID}-atlas-uploads"

gcloud config set project "$PROJECT_ID"
```

## 2. Create a bucket

```bash
gcloud storage buckets create "gs://${BUCKET_NAME}" \
  --location="$REGION"
```

## 3. Upload one file from the CLI

```bash
printf 'hello from gcp atlas\n' > hello.txt

gcloud storage cp ./hello.txt "gs://${BUCKET_NAME}/quickstart/hello.txt"
gcloud storage ls "gs://${BUCKET_NAME}/quickstart/"
```

If the upload worked, you should see `hello.txt` in the bucket listing.

## 4. Upload from application code

Install the SDK:

```bash
npm install @google-cloud/storage
```

`upload.js`

```js
import { Storage } from '@google-cloud/storage'

const storage = new Storage()
const bucketName = process.env.BUCKET_NAME

await storage.bucket(bucketName).upload('./hello.txt', {
  destination: 'app-uploads/hello.txt'
})

console.log(`Uploaded hello.txt to gs://${bucketName}/app-uploads/hello.txt`)
```

Run it:

```bash
export BUCKET_NAME="$BUCKET_NAME"
node upload.js
```

## 5. What this should teach you

- buckets are the durable storage boundary
- CLI uploads are useful for proving access
- the app should upload objects, not rely on local container disk

## Keep this rule in mind

Cloud Storage holds the file.

Your app or database should hold metadata like owner, status, and workflow state.
