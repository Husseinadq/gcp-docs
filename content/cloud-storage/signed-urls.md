---
title: Signed URLs for browser uploads
description: Generate short-lived signed upload URLs so the browser can send the file directly to Cloud Storage.
docType: how-to
category: Guides
goal: I want the browser to upload directly to Cloud Storage without proxying the file through my app server.
summary: The backend creates a short-lived signed URL, and the browser uses `PUT` to upload the file directly.
difficulty: intermediate
estimatedTime: 15 minutes
lastReviewed: 2026-03-13
order: 2
bestFor:
  - Large uploads
  - Browser-direct upload flows
  - Apps that want less backend bandwidth
prerequisites:
  - A bucket
  - A backend that can generate signed URLs
related:
  - /docs/cloud-storage/uploads-from-node-service
  - /docs/cloud-storage/access-patterns
  - /docs/cloud-storage/common-commands
---

## Goal

Generate a short-lived signed URL on the backend, then upload the file directly from the client.

## 1. Generate the signed URL on the backend

```js
import { Storage } from '@google-cloud/storage'

const storage = new Storage()
const bucket = storage.bucket(process.env.BUCKET_NAME)

export async function createUploadUrl(fileName, contentType) {
  const [url] = await bucket.file(`uploads/${fileName}`).getSignedUrl({
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000,
    contentType,
  })

  return url
}
```

## 2. Upload the file with `PUT`

```bash
curl -X PUT \
  -H "Content-Type: image/png" \
  --upload-file ./avatar.png \
  "$SIGNED_URL"
```

## 3. Verify the object exists

```bash
gcloud storage ls "gs://${BUCKET_NAME}/uploads/"
```

## When this pattern is worth it

Use signed uploads when:

- files are large
- the browser should talk directly to Cloud Storage
- the backend only needs to authorize the upload, not proxy the bytes

Use backend-managed uploads instead when the server must inspect the file before it is stored.
