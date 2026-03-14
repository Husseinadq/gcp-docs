---
title: Uploads from a Node service
description: Store user uploads in Cloud Storage from an Express service without relying on local runtime disk.
docType: how-to
category: Guides
goal: I need a backend route that accepts a file and writes it into Cloud Storage.
summary: Use one bucket, one service account with object access, and one upload endpoint.
difficulty: beginner
estimatedTime: 15 minutes
lastReviewed: 2026-03-13
order: 1
bestFor:
  - Express or Node services
  - Backend-managed uploads
  - Internal tools with simple file handling
prerequisites:
  - A bucket
  - A service account with `roles/storage.objectUser` on that bucket
related:
  - /docs/cloud-storage/signed-urls
  - /docs/cloud-storage/common-commands
  - /docs/cloud-storage/access-patterns
---

## Goal

Accept a file in an HTTP request and store it directly in Cloud Storage.

## 1. Install the dependencies

```bash
npm install express multer @google-cloud/storage
```

## 2. Create the upload route

`server.js`

```js
import express from 'express'
import multer from 'multer'
import { Storage } from '@google-cloud/storage'

const app = express()
const upload = multer({ storage: multer.memoryStorage() })
const storage = new Storage()
const bucket = storage.bucket(process.env.BUCKET_NAME)
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
    bucket: bucket.name,
    object: object.name,
  })
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
```

## 3. Run and test it

```bash
export BUCKET_NAME="your-bucket-name"
node server.js
```

From another terminal:

```bash
curl -X POST -F "file=@./hello.txt" http://localhost:8080/upload
```

## 4. Verify the object

```bash
gcloud storage ls "gs://${BUCKET_NAME}/uploads/"
```

## When to use this pattern

Use backend-managed uploads when:

- the file is small enough for the app server path
- the backend needs to inspect or validate the file first
- browser-direct uploads are unnecessary complexity
