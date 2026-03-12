---
title: BigQuery quickstart
description: The shortest useful path to loading data into BigQuery and proving the analytics workflow is real.
docType: how-to
category: Get started
goal: I need to set up a first analytics path in BigQuery without confusing it with the app database.
summary: Start with one dataset, one data source, and one question the business actually cares about.
difficulty: beginner
estimatedTime: 12 minutes
lastReviewed: 2026-03-11
order: 1
bestFor:
  - Product analytics
  - Reporting projects
  - Event analysis
related:
  - /docs/bigquery/when-bigquery-fits
  - /docs/bigquery/cost-checklist
  - /docs/pub-sub
---

## Goal

Put one meaningful dataset into BigQuery and answer one real analytical question with it.

## Fast path

This quickstart creates one dataset, loads one small CSV file, and runs one query that proves the analytics path works.

## 1. Set your project and dataset name

```bash
export PROJECT_ID="your-project-id"
export DATASET="atlas_demo"

gcloud config set project "$PROJECT_ID"
gcloud services enable bigquery.googleapis.com
```

## 2. Create the dataset

```bash
bq --location=US mk --dataset "$DATASET"
```

## 3. Create a tiny CSV file

```bash
cat > events.csv <<'EOF'
signup,emea,14
signup,na,22
purchase,emea,8
purchase,na,11
EOF
```

## 4. Load the file into BigQuery

```bash
bq load \
  "$DATASET.events" \
  ./events.csv \
  event_name:string,region:string,total:integer
```

## 5. Run one query that answers a real question

```bash
bq query --use_legacy_sql=false \
  "SELECT region, SUM(total) AS total
   FROM \`${PROJECT_ID}.${DATASET}.events\`
   GROUP BY region
   ORDER BY total DESC"
```

Expected result:

```text
+--------+-------+
| region | total |
+--------+-------+
| na     |    33 |
| emea   |    22 |
+--------+-------+
```

## What this should teach you

- BigQuery is for analytical questions over stored datasets
- loading data and querying data are separate steps
- this is not the same job as your application database
