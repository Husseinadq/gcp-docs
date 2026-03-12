---
title: Cloud SQL quickstart
description: The shortest useful path to putting a managed relational database behind an app on GCP.
docType: how-to
category: Get started
goal: I need PostgreSQL or MySQL on GCP without self-managing the database layer.
summary: Start with one engine, one instance for one app boundary, and one explicit connection path.
difficulty: beginner
estimatedTime: 12 minutes
lastReviewed: 2026-03-11
order: 1
bestFor:
  - SaaS apps
  - Internal tools
  - Teams moving from local Postgres to GCP
prerequisites:
  - A GCP project with billing enabled
  - An app that already expects a relational database
related:
  - /docs/cloud-sql/when-cloud-sql-fits
  - /docs/cloud-sql/production-checklist
  - /docs/cloud-run
---

## Goal

Provision one relational database with a clean ownership boundary and a connection model the team can explain.

## Fast path

This quickstart creates a PostgreSQL instance, adds an application database, and connects locally through the Cloud SQL Auth Proxy.

## 1. Set your variables

```bash
export PROJECT_ID="your-project-id"
export REGION="us-central1"
export INSTANCE="atlas-postgres"
export DATABASE="appdb"
export DB_PASSWORD="change-this-password"

gcloud config set project "$PROJECT_ID"
gcloud services enable sqladmin.googleapis.com
```

## 2. Create the instance and database

Use the smallest dev size your region allows if this is only a test instance. The command below uses a current PostgreSQL example shape from the Cloud SQL docs:

```bash
gcloud sql instances create "$INSTANCE" \
  --database-version=POSTGRES_16 \
  --cpu=2 \
  --memory=7680MB \
  --region="$REGION" \
  --edition=ENTERPRISE

gcloud sql databases create "$DATABASE" \
  --instance="$INSTANCE"

gcloud sql users set-password postgres \
  --instance="$INSTANCE" \
  --password="$DB_PASSWORD"
```

## 3. Start the Cloud SQL Auth Proxy

Download the proxy for Linux 64-bit:

```bash
curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.20.0/cloud-sql-proxy.linux.amd64
chmod +x cloud-sql-proxy
```

Start the proxy:

```bash
./cloud-sql-proxy "${PROJECT_ID}:${REGION}:${INSTANCE}" --port 5432
```

Leave that running in one terminal.

## 4. Connect with `psql`

In a second terminal:

```bash
psql "host=127.0.0.1 port=5432 sslmode=disable dbname=${DATABASE} user=postgres"
```

When prompted, enter the password from `DB_PASSWORD`.

## 5. Run one real SQL statement

```sql
create table if not exists todos (
  id bigserial primary key,
  title text not null,
  done boolean not null default false
);

insert into todos (title) values ('ship the docs');

select * from todos;
```

## 6. Minimal app connection code

```js
import pg from 'pg'

const pool = new pg.Pool({
  host: '127.0.0.1',
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

const result = await pool.query('select now()')
console.log(result.rows[0])
```

## What you should have now

- one PostgreSQL instance
- one application database
- one verified connection path that works locally

That is enough to start wiring a real service without guessing how the database boundary works.
