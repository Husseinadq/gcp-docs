---
title: Cloud Storage
description: The service hub for uploads, static assets, exports, and object storage on GCP.
docType: service-hub
goal: I need to know whether Cloud Storage is the right home for files, assets, or generated objects.
summary: Durable object storage for files that should not live on app containers or inside relational tables.
difficulty: beginner
estimatedTime: 5 minutes
lastReviewed: 2026-03-11
order: 3
bestFor:
  - User uploads
  - Static assets
  - Generated reports
related:
  - /docs/cloud-storage/quickstart
  - /docs/cloud-storage/uploads-from-node-service
  - /docs/cloud-storage/troubleshooting
---

## TL;DR

Cloud Storage is the default place to store files and objects on GCP.

If the data behaves like a file instead of a database row, Cloud Storage is usually the right starting point.

## Use it when

- users upload files
- the app needs static assets
- services generate reports, exports, or artifacts
- multiple services should read and write the same objects

## Avoid it when

- the real problem is relational or transactional data
- the application needs queryable metadata more than object storage
- the team is treating buckets like a traditional application database

## Fastest starting path

1. Use [Cloud Storage quickstart](/docs/cloud-storage/quickstart) to prove the bucket and object flow.
2. Use [Uploads from a Node service](/docs/cloud-storage/uploads-from-node-service) for the first real backend upload path.
3. Keep [Common commands](/docs/cloud-storage/common-commands) open while you work.

## Common jobs

- user uploads
- backups
- exports
- generated file artifacts

## Compare it to

### Cloud SQL

Cloud SQL stores structured relational data. Cloud Storage stores objects and files. They solve different problems and usually belong together, not in competition.

### Local runtime storage

Local container storage is not durable application storage. Use Cloud Storage when the file should survive restarts, redeploys, and scaling events.

## Read next

- [Uploads from a Node service](/docs/cloud-storage/uploads-from-node-service)
- [Signed URLs for browser uploads](/docs/cloud-storage/signed-urls)
- [Create download URLs](/docs/cloud-storage/download-urls)
- [Troubleshooting](/docs/cloud-storage/troubleshooting)
