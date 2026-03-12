---
title: Store User Uploads in Cloud Storage
description: A direct guide for moving file uploads out of the app container and into durable object storage.
docType: how-to
goal: I need a clean way to store user files instead of writing them to local runtime storage.
difficulty: beginner
estimatedTime: 10 minutes
lastReviewed: 2026-03-11
order: 2
bestFor:
  - Web apps with uploads
  - Teams moving from local disk assumptions
  - Services generating exports or reports
prerequisites:
  - A GCP project
  - A Cloud Storage bucket or permission to create one
  - An application that needs durable file storage
related:
  - /docs/reference/cloud-storage
  - /docs/reference/cloud-run
---

## Goal

Store user files in Cloud Storage instead of relying on the app container filesystem.

## Assumptions

This guide assumes:

- files need to survive restarts and new instances
- your application can talk to GCP services through an explicit identity

## 1. Set your variables

```bash
export PROJECT_ID="your-project-id"
export REGION="us-central1"
export BUCKET_NAME="${PROJECT_ID}-user-uploads"
export SERVICE_ACCOUNT_EMAIL="app-runner@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud config set project "$PROJECT_ID"
```

## 2. Create the bucket

```bash
gcloud storage buckets create "gs://${BUCKET_NAME}" \
  --location="$REGION" \
  --uniform-bucket-level-access
```

## 3. Grant only object access to the workload

```bash
gcloud storage buckets add-iam-policy-binding "gs://${BUCKET_NAME}" \
  --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}" \
  --role="roles/storage.objectUser"
```

That is enough for uploads without granting broad bucket admin access.

## 4. Install the upload dependencies

```bash
npm install express multer @google-cloud/storage
```

## 5. Add one upload route

`server.js`

```js
import express from 'express'
import multer from 'multer'
import { Storage } from '@google-cloud/storage'

const app = express()
const upload = multer({ storage: multer.memoryStorage() })
const storage = new Storage()
const bucketName = process.env.BUCKET_NAME
const bucket = storage.bucket(bucketName)
const port = process.env.PORT || 8080

app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'file is required' })
  }

  const object = bucket.file(`uploads/${Date.now()}-${req.file.originalname}`)

  await object.save(req.file.buffer, {
    contentType: req.file.mimetype,
  })

  res.status(201).json({
    bucket: bucketName,
    object: object.name,
  })
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
```

## 6. Run the app locally

```bash
export BUCKET_NAME="$BUCKET_NAME"
node server.js
```

Upload a file from another terminal:

```bash
curl -X POST \
  -F "file=@./hello.txt" \
  http://localhost:8080/upload
```

Expected response:

```json
{"bucket":"your-project-id-user-uploads","object":"uploads/1710150000000-hello.txt"}
```

## 7. Verify the object exists

```bash
gcloud storage ls "gs://${BUCKET_NAME}/uploads/"
```

## 8. Keep metadata outside the bucket

Cloud Storage should hold the file bytes.

Your app or database should hold metadata such as:

- which user owns the file
- whether it is approved
- which record points to it

## Common failure points

### Files are written to local disk first and then disappear

That is a design issue, not a bug in the cloud provider.

### Access works in one environment and fails in another

That often means the wrong service account or bucket policy is attached in one project.

## Stop condition

You are done when:

- uploads return `201`
- the object appears in the bucket
- the workload identity only has object-level write/read access

## What to keep open while doing this

- [Cloud Storage](/docs/reference/cloud-storage)
- [IAM in Plain English](/docs/explain/iam-in-plain-english)
