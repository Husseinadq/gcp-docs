---
title: Common commands
description: The Cloud Storage commands you keep reaching for while creating buckets, uploading objects, and managing access.
docType: reference
category: Reference
goal: I already understand Cloud Storage and I want the exact command without searching through long docs.
summary: Keep bucket, object, IAM, and lifecycle commands in one place.
difficulty: beginner
estimatedTime: 4 minutes
lastReviewed: 2026-03-13
order: 4
bestFor:
  - Developers in the middle of implementation
  - Teams reviewing bucket setup
related:
  - /docs/cloud-storage/quickstart
  - /docs/cloud-storage/uploads-from-node-service
  - /docs/cloud-storage/bucket-checklist
---

## Buckets

```bash
gcloud storage buckets create "gs://${BUCKET_NAME}" --location=us-central1
gcloud storage buckets describe "gs://${BUCKET_NAME}"
gcloud storage ls
```

## Objects

```bash
gcloud storage cp ./file.txt "gs://${BUCKET_NAME}/path/file.txt"
gcloud storage ls "gs://${BUCKET_NAME}/path/"
gcloud storage rm "gs://${BUCKET_NAME}/path/file.txt"
```

## Bucket IAM

```bash
gcloud storage buckets add-iam-policy-binding "gs://${BUCKET_NAME}" \
  --member="serviceAccount:SERVICE_ACCOUNT_EMAIL" \
  --role="roles/storage.objectUser"
```

## Lifecycle rules

```bash
gcloud storage buckets update "gs://${BUCKET_NAME}" --lifecycle-file=lifecycle.json
```

## Keep this in mind

Buckets are durable storage boundaries.

Objects are application data files.

IAM, lifecycle rules, and naming are not optional polish; they define how the bucket behaves over time.
