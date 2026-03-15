---
title: Common commands
description: The Cloud SQL commands you keep reaching for while building, inspecting, and operating a relational app on GCP.
docType: reference
category: Reference
goal: I already understand Cloud SQL and I want the shortest path to the exact command I need.
summary: Keep instance, database, user, proxy, backup, and operations commands in one place.
difficulty: beginner
estimatedTime: 5 minutes
lastReviewed: 2026-03-15
order: 4
bestFor:
  - Developers in the middle of implementation
  - Teams debugging instance state
related:
  - /docs/cloud-sql/quickstart
  - /docs/cloud-sql/connect-from-cloud-run
  - /docs/cloud-sql/production-checklist
---

## Inspect instance state

```bash
gcloud sql instances describe INSTANCE
gcloud sql instances describe INSTANCE --format='value(connectionName)'
gcloud sql instances describe INSTANCE --format='value(ipAddresses.ipAddress)'
```

## Databases and users

```bash
gcloud sql databases list --instance=INSTANCE
gcloud sql databases create appdb --instance=INSTANCE
gcloud sql users list --instance=INSTANCE
gcloud sql users create app --instance=INSTANCE --password='change-this-password'
gcloud sql users set-password app --instance=INSTANCE --password='new-password'
```

## Local connection paths

```bash
gcloud sql connect INSTANCE --user=postgres --database=appdb
./cloud-sql-proxy PROJECT:REGION:INSTANCE --port 5432
```

Use `gcloud sql connect` only for public-IP instances. Use the proxy when you need the more normal local development path.

## Operations and backups

```bash
gcloud sql operations list --instance=INSTANCE --limit=10
gcloud sql backups list --instance=INSTANCE
gcloud sql instances patch INSTANCE --deletion-protection
```

## Cloud Run integration

```bash
gcloud run services update SERVICE \
  --region REGION \
  --set-cloudsql-instances PROJECT:REGION:INSTANCE

gcloud run services describe SERVICE \
  --region REGION \
  --format='value(spec.template.spec.serviceAccountName)'
```

## Keep this in mind

If the app is on Cloud Run, always verify both sides:

- the Cloud SQL instance metadata
- the Cloud Run service identity and attached Cloud SQL instance
