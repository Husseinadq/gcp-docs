---
title: When BigQuery fits
description: A plain-English explanation of when the problem is analytics and when the team actually needs a transactional store.
docType: explanation
category: Concepts
goal: I need to know whether the workload belongs in a data warehouse at all.
summary: BigQuery fits when the value comes from analysis across large datasets, not from application transactions.
difficulty: intermediate
estimatedTime: 7 minutes
lastReviewed: 2026-03-11
order: 2
bestFor:
  - Teams comparing Cloud SQL and BigQuery
  - Analytics architecture decisions
related:
  - /docs/bigquery/quickstart
  - /docs/bigquery/cost-checklist
  - /docs/cloud-sql
---

## BigQuery is a good fit when

- the team needs reporting across large datasets
- event, usage, or log data should be queried over time
- the workload is analytical instead of transactional

## BigQuery is the wrong fit when

- the application needs low-latency row-by-row writes
- the product's main database still does not exist
- the problem is really operational data, not analysis

## The useful distinction

Cloud SQL runs the product.

BigQuery helps the team understand what the product did.

If those jobs are mixed together, architecture decisions get muddy fast.
