---
title: BigQuery
description: The service hub for large-scale analytics and warehouse-style querying on Google Cloud.
docType: service-hub
goal: I need to decide whether the problem is analytics and reporting instead of operational application data.
summary: Analytics warehouse for querying large datasets, reporting, and data workflows.
difficulty: intermediate
estimatedTime: 6 minutes
lastReviewed: 2026-03-11
order: 5
bestFor:
  - Reporting
  - Analytics
  - Event analysis
related:
  - /docs/bigquery/quickstart
  - /docs/bigquery/when-bigquery-fits
  - /docs/bigquery/cost-checklist
---

## TL;DR

BigQuery is for analyzing data at scale, not for serving as the main transactional database behind a normal web app.

## Use it when

- the team needs reporting and analytics
- the workload is query-heavy across large datasets
- the product has events, logs, or batch data that should be explored and aggregated

## Avoid it when

- the problem is application transactions
- the product needs a regular relational database first
- the team is looking for low-latency row-by-row operational storage

## Fastest starting path

Ask this first:

is the workload analytical or transactional?

If the answer is transactional, start with [Cloud SQL](/docs/cloud-sql), not BigQuery.

## Common jobs

- dashboards
- business reporting
- event analysis
- usage analytics

## Compare it to

### Cloud SQL

Cloud SQL serves the application. BigQuery helps the team understand what the application has done.

### Pub/Sub

Pub/Sub moves events. BigQuery stores and analyzes the data after the events are collected.

## Read next

- [Pub/Sub](/docs/pub-sub)
- [Cloud SQL](/docs/cloud-sql)
