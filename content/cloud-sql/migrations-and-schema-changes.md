---
title: Migrations and schema changes
description: Keep Cloud SQL schema changes boring, reviewable, and safe to roll out with application deploys.
docType: how-to
category: Guides
goal: I need to change the database schema without turning deploys into database roulette.
summary: Use versioned SQL files, test through the real connection path, and prefer additive rollouts over destructive ones.
difficulty: intermediate
estimatedTime: 10 minutes
lastReviewed: 2026-03-15
order: 3
bestFor:
  - SaaS app teams
  - Postgres-backed services
  - Deploy pipelines that already use Cloud Run
prerequisites:
  - A working Cloud SQL connection
  - A local SQL client such as `psql`
related:
  - /docs/cloud-sql/quickstart
  - /docs/cloud-sql/connect-from-cloud-run
  - /docs/cloud-sql/production-checklist
---

## Goal

Make schema changes predictable:

- migration files live in source control
- changes are tested against the real database engine
- app deploys and schema changes do not fight each other

## 1. Put migrations in versioned files

Example layout:

```text
migrations/
  001_create_todos.sql
  002_add_due_date.sql
```

Example migration:

```sql
create table if not exists todos (
  id bigserial primary key,
  title text not null,
  due_at timestamptz,
  created_at timestamptz not null default now()
);
```

## 2. Test the migration through the proxy

```bash
export INSTANCE_CONNECTION_NAME="your-project:us-central1:atlas-postgres"
export DB_NAME="appdb"
export DB_USER="app"

./cloud-sql-proxy "$INSTANCE_CONNECTION_NAME" --port 5432
```

In a second terminal:

```bash
psql "host=127.0.0.1 port=5432 sslmode=disable dbname=${DB_NAME} user=${DB_USER}" \
  -f migrations/001_create_todos.sql
```

## 3. Verify the result before shipping app code

```bash
psql "host=127.0.0.1 port=5432 sslmode=disable dbname=${DB_NAME} user=${DB_USER}" \
  -c '\d+ todos'
```

Do not trust the migration just because the CLI exited with code `0`. Confirm the table, column, or index actually exists.

## 4. Use additive rollout order

The safest default is:

1. add the new column, table, or index
2. deploy app code that can use both old and new shapes
3. backfill data if needed
4. remove old columns later in a separate change

That order keeps deploys reversible.

## 5. Do not run schema changes from the request path

Avoid patterns where the web app tries to create tables on startup or on the first request.

Run migrations:

- from a deploy pipeline
- from a one-off maintenance step
- or from a dedicated job with explicit review

## Stop condition

You are ready to ship the schema change when:

- the SQL file is in source control
- the migration was run against the real engine
- the app deploy order is compatible with the new schema
