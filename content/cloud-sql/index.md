---
title: Cloud SQL
description: The service hub for managed PostgreSQL, MySQL, and SQL Server on Google Cloud.
docType: service-hub
goal: I need to know whether Cloud SQL is the right database choice for this application and what tradeoffs matter first.
summary: Managed relational databases for teams that want SQL with less infrastructure overhead.
difficulty: beginner
estimatedTime: 6 minutes
lastReviewed: 2026-03-15
order: 4
bestFor:
  - Web applications with transactional data
  - Teams that already know SQL
  - Small and medium products
related:
  - /docs/cloud-sql/quickstart
  - /docs/cloud-sql/connect-from-cloud-run
  - /docs/cloud-sql/common-commands
---

## TL;DR

Cloud SQL is the default relational database starting point for many GCP web apps.

It is usually the right first pick when the team wants PostgreSQL or MySQL without self-managing database infrastructure.

## Use it when

- the product needs SQL
- the data is relational
- the team wants a familiar operational model

## Avoid it when

- the product needs a non-relational storage model
- global distribution or unusual scaling patterns drive the database choice
- the database problem is really analytics, not application transactions

## Fastest starting path

1. Start with [Cloud SQL quickstart](/docs/cloud-sql/quickstart) to create one instance, one app database, and one verified connection path.
2. Use [Connect from Cloud Run](/docs/cloud-sql/connect-from-cloud-run) when the app is already running on GCP.
3. Keep [Common commands](/docs/cloud-sql/common-commands) open while you work.

## Common jobs

- application data for SaaS products
- user accounts and product entities
- transactional workflows

## Compare it to

### Firestore

Use Firestore when the data model and access patterns are document-oriented. Use Cloud SQL when relational queries and transactions are central.

### BigQuery

BigQuery is for analytics, not for the primary transactional store of a web app.

## Read next

- [Connect from Cloud Run](/docs/cloud-sql/connect-from-cloud-run)
- [Migrations and schema changes](/docs/cloud-sql/migrations-and-schema-changes)
- [Troubleshooting](/docs/cloud-sql/troubleshooting)
