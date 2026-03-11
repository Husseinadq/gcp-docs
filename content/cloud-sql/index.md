---
title: Cloud SQL
description: The service hub for managed PostgreSQL, MySQL, and SQL Server on Google Cloud.
docType: service-hub
goal: I need to know whether Cloud SQL is the right database choice for this application and what tradeoffs matter first.
summary: Managed relational databases for teams that want SQL with less infrastructure overhead.
difficulty: beginner
estimatedTime: 6 minutes
lastReviewed: 2026-03-11
order: 4
bestFor:
  - Web applications with transactional data
  - Teams that already know SQL
  - Small and medium products
related:
  - /docs/cloud-sql/quickstart
  - /docs/cloud-sql/when-cloud-sql-fits
  - /docs/cloud-sql/production-checklist
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

Use Cloud SQL as the database companion to [Cloud Run](/docs/cloud-run) when the product needs relational data and the team wants a managed default.

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

- [Cloud Run](/docs/cloud-run)
- [How GCP Is Organized](/docs/explain/how-gcp-is-organized)
