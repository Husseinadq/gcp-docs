---
title: Cloud SQL production checklist
description: A fast reference for database ownership, access, backups, and app-boundary decisions.
docType: reference
category: Reference
goal: I know I need Cloud SQL and I want a short review list before depending on it in production.
summary: Review ownership, connection policy, backup assumptions, and data boundaries before launch.
difficulty: intermediate
estimatedTime: 6 minutes
lastReviewed: 2026-03-15
order: 5
bestFor:
  - Database reviews
  - App launch checks
related:
  - /docs/cloud-sql/quickstart
  - /docs/cloud-sql/connect-from-cloud-run
  - /docs/cloud-sql/when-cloud-sql-fits
  - /docs/cloud-sql/common-commands
---

## Ownership checklist

- the owning team is explicit
- each application boundary is understood
- the database is not acting as a dumping ground for unrelated workloads

## Protection checklist

```bash
gcloud sql instances patch INSTANCE --deletion-protection
gcloud sql backups list --instance=INSTANCE
```

- deletion protection is enabled
- backup ownership is clear
- restore responsibility is clear before an incident happens

## Access checklist

- connection path is documented
- runtime identity is explicit
- secrets or credentials are stored intentionally
- workload identity is understood

## Minimum application settings

| Setting | Why it matters |
| --- | --- |
| `DB_HOST` | Tells the app whether it connects through the proxy or another connection path |
| `DB_NAME` | Keeps the app pointed at the intended database instead of a default |
| `DB_USER` | Makes the runtime identity explicit at the database layer |
| `DB_PASSWORD` or secret reference | Avoids hard-coded credentials in the app |

## Connection budget checklist

- pool size is intentionally small
- max service instances are understood
- the team can explain how many app instances might hit the database at peak

## Schema checklist

- schema changes have a rollout plan
- destructive changes are not mixed with the same deploy that still needs old columns
- migrations are tested on the connection path the app really uses

## Scope checklist

- analytics workloads are not quietly turning into transactional database pressure
- file data is not being forced into relational tables
- developers can explain why this app uses Cloud SQL instead of another store

## Stop condition

You are ready for production only when:

- the instance owner is known
- the connection path is documented
- the restore path is documented
- the team can explain why analytics and file data live somewhere else
