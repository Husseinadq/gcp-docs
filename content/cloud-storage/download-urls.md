---
title: Create download URLs
description: Generate short-lived signed download URLs so clients can fetch private objects without broad bucket access.
docType: how-to
category: Guides
goal: I want users or external systems to download a private object without making the whole bucket public.
summary: Use a service account with signing ability to create a time-limited URL for one object.
difficulty: intermediate
estimatedTime: 12 minutes
lastReviewed: 2026-03-14
order: 3
bestFor:
  - Private file downloads
  - One-time access links
  - APIs that return file links to clients
prerequisites:
  - A bucket with an existing object
  - A service account that can sign URLs
related:
  - /docs/cloud-storage/signed-urls
  - /docs/cloud-storage/common-commands
  - /docs/cloud-storage/troubleshooting
---

## Goal

Create a time-limited URL that lets someone download one private object without giving them bucket-wide access.

## 1. Create a signed URL with `gcloud`

```bash
export BUCKET_NAME="your-bucket-name"
export OBJECT_NAME="uploads/report.pdf"
export SIGNING_SERVICE_ACCOUNT="signed-url-account@your-project-id.iam.gserviceaccount.com"

gcloud storage sign-url "gs://${BUCKET_NAME}/${OBJECT_NAME}" \
  --duration=10m \
  --impersonate-service-account="${SIGNING_SERVICE_ACCOUNT}"
```

The output includes a `signed_url` value you can return to a client.

## 2. Download the file with the URL

```bash
curl "$SIGNED_URL" --output report.pdf
```

## 3. Generate a signed URL in Node.js

```js
import { Storage } from '@google-cloud/storage'

const storage = new Storage()
const file = storage.bucket(process.env.BUCKET_NAME).file('uploads/report.pdf')

const [url] = await file.getSignedUrl({
  version: 'v4',
  action: 'read',
  expires: Date.now() + 10 * 60 * 1000,
})

console.log(url)
```

## When to use this

Use a signed download URL when:

- the object should stay private
- the client needs direct download access
- you want access to expire automatically

Do not make the bucket public just to solve one private-download use case.
