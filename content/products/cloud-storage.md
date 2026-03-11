---
title: Cloud Storage
description: Durable object storage for files, assets, exports, and backups across your GCP workloads.
category: Products
product: Cloud Storage
difficulty: beginner
estimatedTime: 8 minutes
lastReviewed: 2026-03-11
awsEquivalent: S3
azureEquivalent: Blob Storage
tags:
  - storage
  - buckets
  - files
---

## TL;DR

Cloud Storage is the default place to store files and objects in GCP. Use it for uploads, static assets, exports, logs, backups, and generated artifacts.

## When to use it

Cloud Storage is the right default when:

- your data is file-like instead of relational
- you need durable storage
- you want signed URLs or simple access control patterns
- multiple services need to read and write the same object data

## Avoid if

Cloud Storage is not a database. Do not use it when:

- you need SQL queries
- you need row-level transactional updates
- you need low-latency key-value access patterns better served by a database or cache

## The mental model

A bucket is a container for objects.

Objects are files plus metadata.

That is the key idea. If your team keeps that model clear, Cloud Storage stays simple.

## Common use cases

- user uploads
- generated reports
- build artifacts
- public static assets
- backups and exports

## Production checklist

- define bucket naming clearly
- choose region and storage class intentionally
- keep sensitive buckets private by default
- use lifecycle rules when old objects should expire
- avoid mixing public and private access patterns in a confusing way

## Common mistakes

### Treating buckets like folders with strong hierarchy rules

Object storage can look folder-like, but the underlying model is object keys, not a traditional filesystem.

### Storing secrets in buckets

Use Secret Manager for secrets, not Cloud Storage.

### Ignoring lifecycle rules

If your app generates many temporary exports or uploads, lifecycle rules prevent long-term clutter and cost growth.

## Hello world shape

```bash
gcloud storage buckets create gs://my-example-bucket --location=us-central1
```

Once the bucket exists, applications usually interact with it through signed URLs, SDKs, or service accounts.

## What to read next

- [Cloud Run](/docs/products/cloud-run)
- [GCP for web apps](/docs/start-here/gcp-for-web-apps)
