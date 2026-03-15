---
title: When Cloud SQL fits
description: A plain-English guide to when Cloud SQL is the right database default and when another data system is a better fit.
docType: explanation
category: Concepts
goal: I need to decide whether this application data really belongs in a managed relational database.
summary: Cloud SQL is the default when the app needs familiar SQL transactions without custom database operations.
difficulty: beginner
estimatedTime: 7 minutes
lastReviewed: 2026-03-15
order: 2
bestFor:
  - Teams choosing between Cloud SQL and Firestore
  - Beginners adding a first database on GCP
related:
  - /docs/cloud-sql/quickstart
  - /docs/cloud-sql/connection-model
  - /docs/cloud-sql/production-checklist
  - /docs/bigquery
---

## Cloud SQL is a good fit when

- the data is relational
- the app needs transactions
- the team already knows SQL
- operational simplicity matters more than unusual scaling patterns

## Cloud SQL is the wrong fit when

- the real workload is analytics, not transactions
- the data model is document-oriented and access patterns follow that shape
- the application needs a distributed system with very different database tradeoffs

## The useful default

For many web apps, Cloud SQL is the safe first choice because the team can reason about it quickly.

That matters more than theoretical flexibility the app may never need.

It also gives you a familiar split:

- application code on Cloud Run
- relational data in Cloud SQL
- files in Cloud Storage
- analytics somewhere else later

## Smallest useful production shape

```text
Cloud Run service
  -> Cloud SQL (transactional data)
  -> Cloud Storage (files)
```

That shape is boring in the best way:

- the app writes rows to Cloud SQL
- files stay out of the database
- analytics goes somewhere else later

## Compare it to Firestore

Choose Firestore when the application naturally fits document data and application code benefits from that model.

Choose Cloud SQL when relationships, joins, and transactions are central to the product.

## Compare it to BigQuery

BigQuery is for analysis.

Cloud SQL is for the application's day-to-day transactional state.

## Quick decision matrix

| If the problem is mostly... | Start with... |
| --- | --- |
| app transactions, accounts, orders, joins | Cloud SQL |
| document-shaped app state and flexible records | Firestore |
| reporting, dashboards, event analysis | BigQuery |
| PostgreSQL compatibility with less database toil | Cloud SQL |

## Red flags

Cloud SQL is probably the wrong first choice if:

- you still cannot name the main relational entities
- the team keeps saying "analytics" but has no app database yet
- files or large blobs are drifting into tables because there is no storage plan

## The production reality check

Cloud SQL is easy to start and still needs discipline:

- keep pool sizes small
- keep migrations intentional
- keep one clear owner for backups and restore
- keep the app boundary obvious so unrelated workloads do not pile into one instance
