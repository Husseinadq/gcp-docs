---
title: Cloud Storage
description: A fast reference page for deciding when Cloud Storage is the right place for files and objects.
docType: reference
goal: I need a quick decision page for whether Cloud Storage is the right place for this data.
product: Cloud Storage
difficulty: beginner
estimatedTime: 5 minutes
lastReviewed: 2026-03-11
order: 2
bestFor:
  - Uploads
  - Static assets
  - Exports and generated files
awsEquivalent: S3
azureEquivalent: Blob Storage
related:
  - /docs/how-to/store-user-uploads-in-cloud-storage
  - /docs/learn/ship-your-first-web-app-on-gcp
---

## One-sentence summary

Cloud Storage is the default home for durable files and objects in GCP.

## Common commands

```bash
# create a bucket
gcloud storage buckets create gs://BUCKET_NAME --location=US

# upload one object
gcloud storage cp ./file.txt gs://BUCKET_NAME/path/file.txt

# list objects
gcloud storage ls gs://BUCKET_NAME/path/

# grant a workload object access at the bucket level
gcloud storage buckets add-iam-policy-binding gs://BUCKET_NAME \
  --member=serviceAccount:SERVICE_ACCOUNT_EMAIL \
  --role=roles/storage.objectUser
```

## Good fit

- user uploads
- static assets
- exports and reports
- artifacts shared across services

## Avoid when

- you need relational queries
- you need row-level transactional updates
- the real problem is metadata, not object storage

## What matters most

### Bucket purpose

Keep bucket responsibility clear instead of starting with one vague bucket for everything.

### Access model

Decide early whether objects are public, private, or served through signed access patterns.

### Lifecycle

If objects are temporary, define cleanup behavior from the start.

## Minimum design checklist

| Decision | Good default |
| --- | --- |
| Bucket purpose | One clear job per bucket or access model |
| Access model | Private first, then signed or public only when needed |
| Metadata ownership | Keep ownership and workflow state in the app or database |
| Cleanup | Add lifecycle or deletion behavior early |

## Common gotchas

- treating object keys like a traditional filesystem hierarchy
- storing secrets in buckets
- forgetting to design object retention and cleanup

## Remember

Cloud Storage solves the file problem.

It does not replace application data modeling, permission design, or business metadata.

## Use with

- Cloud Run for serving or processing app traffic
- a database when file metadata must be queried as application data

## Read next

- [Store User Uploads in Cloud Storage](/docs/how-to/store-user-uploads-in-cloud-storage)
- [Cloud Run](/docs/reference/cloud-run)
