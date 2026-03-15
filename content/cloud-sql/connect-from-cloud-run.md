---
title: Connect from Cloud Run
description: Connect a Cloud Run service to Cloud SQL without guessing about identity, sockets, or connection limits.
docType: how-to
category: Guides
goal: My Cloud Run service needs Cloud SQL and I want a connection path that works in development and production.
summary: Grant the runtime service account access, attach the instance to the service, and connect through the Unix socket path.
difficulty: intermediate
estimatedTime: 12 minutes
lastReviewed: 2026-03-15
order: 2
bestFor:
  - Cloud Run APIs
  - Relational web apps
  - Teams moving from local Postgres to GCP
prerequisites:
  - A Cloud Run service
  - A Cloud SQL instance and database
  - A runtime service account for the app
related:
  - /docs/cloud-sql/quickstart
  - /docs/cloud-sql/connection-model
  - /docs/cloud-sql/troubleshooting
  - /docs/cloud-run/env-and-secrets
---

## Goal

Make the database connection path explicit:

- one runtime identity
- one attached Cloud SQL instance
- one application pool configuration

## 1. Set your variables

```bash
export PROJECT_ID="your-project-id"
export REGION="us-central1"
export SERVICE="docs-api"
export INSTANCE="atlas-postgres"
export DB_NAME="appdb"
export DB_USER="app"
export RUNTIME_SERVICE_ACCOUNT="docs-runtime@${PROJECT_ID}.iam.gserviceaccount.com"
export INSTANCE_CONNECTION_NAME="$(gcloud sql instances describe "$INSTANCE" --format='value(connectionName)')"
```

## 2. Grant the runtime identity Cloud SQL access

```bash
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${RUNTIME_SERVICE_ACCOUNT}" \
  --role="roles/cloudsql.client"
```

This is the role that lets the Cloud Run workload use the Cloud SQL connection.

If a human deployer attaches this service account to Cloud Run, that deployer also needs `roles/iam.serviceAccountUser` on the service account.

## 3. Attach the instance to the Cloud Run service

```bash
gcloud run services update "$SERVICE" \
  --region="$REGION" \
  --service-account="$RUNTIME_SERVICE_ACCOUNT" \
  --set-cloudsql-instances="$INSTANCE_CONNECTION_NAME" \
  --update-env-vars INSTANCE_CONNECTION_NAME="$INSTANCE_CONNECTION_NAME",DB_NAME="$DB_NAME",DB_USER="$DB_USER"
```

Store `DB_PASSWORD` separately with Secret Manager instead of hard-coding it in the service spec.

## 4. Use the Unix socket path in the app

For PostgreSQL with the `pg` package:

```js
import pg from 'pg'

const pool = new pg.Pool({
  host: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 5,
  idleTimeoutMillis: 600000,
  connectionTimeoutMillis: 30000,
})

export async function getDbTime() {
  const result = await pool.query('select now() as now')
  return result.rows[0]
}
```

That socket path is the normal Cloud Run path when you attach a Cloud SQL instance to the service.

## 5. Verify the service config

```bash
gcloud run services describe "$SERVICE" \
  --region="$REGION" \
  --format='value(spec.template.metadata.annotations)'

gcloud run services describe "$SERVICE" \
  --region="$REGION" \
  --format='value(spec.template.spec.serviceAccountName)'
```

Then hit one endpoint that runs a trivial query such as `select now()`.

## 6. Keep connection counts boring

Cloud Run scales horizontally, so each service instance can open its own pool.

Start small:

- `max: 5` in the app pool
- one database per app boundary
- explicit review before raising Cloud Run max instances or pool sizes

## Stop condition

You are done when:

- the runtime service account is explicit
- the Cloud Run service shows the Cloud SQL attachment
- the app can run one SQL query in production without manual IP allowlists
