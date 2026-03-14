---
title: Cloud SQL production checklist
description: A fast reference for database ownership, access, backups, and app-boundary decisions.
docType: reference
category: Reference
goal: I know I need Cloud SQL and I want a short review list before depending on it in production.
summary: Review ownership, connection policy, backup assumptions, and data boundaries before launch.
difficulty: intermediate
estimatedTime: 6 minutes
lastReviewed: 2026-03-11
order: 3
bestFor:
  - Database reviews
  - App launch checks
related:
  - /docs/cloud-sql/quickstart
  - /docs/cloud-sql/when-cloud-sql-fits
---

## Ownership checklist

- the owning team is explicit
- each application boundary is understood
- the database is not acting as a dumping ground for unrelated workloads

## Common commands

```bash
# inspect the instance
gcloud sql instances describe INSTANCE

# list databases
gcloud sql databases list --instance=INSTANCE

# list users
gcloud sql users list --instance=INSTANCE

# create one application database
gcloud sql databases create appdb --instance=INSTANCE
```

## Access checklist

- connection path is documented
- secrets or credentials are stored intentionally
- workload identity is understood

## Minimum application settings

| Setting | Why it matters |
| --- | --- |
| `DB_HOST` | Tells the app whether it connects through the proxy or another connection path |
| `DB_NAME` | Keeps the app pointed at the intended database instead of a default |
| `DB_USER` | Makes the runtime identity explicit at the database layer |
| `DB_PASSWORD` or secret reference | Avoids hard-coded credentials in the app |

## Safety checklist

- backup expectations are explicit
- restore ownership is clear
- schema changes have a rollout plan

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
