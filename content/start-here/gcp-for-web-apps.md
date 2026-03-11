---
title: GCP for Web Apps
description: The simplest useful starting architecture for shipping a web application on Google Cloud.
category: Start Here
difficulty: beginner
estimatedTime: 8 minutes
lastReviewed: 2026-03-11
tags:
  - cloud-run
  - cloud-sql
  - cloud-storage
  - architecture
---

## TL;DR

For many web apps, the best first GCP stack is:

- Cloud Run
- Cloud SQL
- Cloud Storage
- Secret Manager
- Cloud Logging and Monitoring

That setup gives you a strong balance of simplicity, scale, and managed operations.

## Why this is a strong default

It avoids the two most common beginner problems:

- picking infrastructure that is too low-level
- spreading your app across too many GCP services too early

You can ship quickly while still leaving room to grow.

## The stack in plain language

### Cloud Run

Runs your app container without making you manage servers directly.

Use it when:

- your app can run in HTTP request/response style
- you want fast deployments
- you prefer managed scaling

### Cloud SQL

Managed relational database for PostgreSQL, MySQL, or SQL Server.

Use it when:

- you already know SQL
- your app is transactional
- you want familiar database tooling

### Cloud Storage

Object storage for uploads, static assets, exports, and backups.

Use it when:

- files do not belong inside your database
- you need durable storage
- you want signed URLs or simple public assets

### Secret Manager

Stores credentials and secrets outside your application code and environment files.

### Logging and Monitoring

Makes debugging and production operations much easier from the start.

## Avoid if

This default stack is not ideal if:

- you need Kubernetes-level control right now
- you need ultra-low-latency specialized infrastructure
- your workload is mostly batch compute, not web traffic

## A practical first deployment path

1. Put your app in a container.
2. Deploy it to Cloud Run.
3. Attach a Cloud SQL database if you need relational data.
4. Store uploads in Cloud Storage.
5. Keep secrets in Secret Manager.
6. Confirm logs, health, and error reporting before launch.

## Common mistakes

### Treating Cloud Run like a VM

Cloud Run is designed for stateless container workloads. Do not depend on local disk persistence or long-lived background state.

### Storing uploads in Cloud SQL

Files belong in Cloud Storage, not in a relational database, unless you have a very specific reason.

### Using production as the first project

Start in a separate development project first so IAM and billing mistakes are cheaper.

## What to read next

- [IAM basics](/docs/core-concepts/iam-basics)
- [Cloud Run](/docs/products/cloud-run)
- [Cloud Storage](/docs/products/cloud-storage)
