---
title: Troubleshooting
description: Fix the Cloud SQL failures that show up most often while creating instances, connecting apps, and debugging access.
docType: reference
category: Operate
goal: My Cloud SQL setup is failing and I need the shortest path to the likely root cause.
summary: Check instance metadata, operations, logs, runtime identity, and the real connection path before changing random settings.
difficulty: intermediate
estimatedTime: 8 minutes
lastReviewed: 2026-03-15
order: 4
bestFor:
  - Connection failures
  - Cloud Run to Cloud SQL debugging
  - Instance setup issues
related:
  - /docs/cloud-sql/connect-from-cloud-run
  - /docs/cloud-sql/common-commands
  - /docs/cloud-sql/production-checklist
---

## First commands to run

```bash
gcloud sql instances describe INSTANCE
gcloud sql operations list --instance=INSTANCE --limit=10
gcloud logging read "resource.type=cloudsql_database" --project=PROJECT_ID --limit=20
```

Those three commands usually tell you whether the problem is configuration, a failed operation, or a database-side error.

## If local development cannot connect

Check these first:

- the proxy uses the correct connection name
- the Cloud SQL Admin API is enabled
- your local `gcloud` auth session is valid
- the instance is actually running

If the instance is private-IP only and you are using the proxy, make sure you understand whether the proxy also needs `--private-ip` for your path.

## If Cloud Run cannot connect

Check these in order:

1. the runtime service account on the Cloud Run service
2. whether that identity has `roles/cloudsql.client`
3. whether the service has the Cloud SQL instance attached
4. whether the app is using `/cloudsql/INSTANCE_CONNECTION_NAME`

Useful command:

```bash
gcloud run services describe SERVICE \
  --region REGION \
  --format='value(spec.template.spec.serviceAccountName)'
```

## If `psql` works locally but the app fails

Usually the mistake is one of these:

- wrong `DB_NAME`
- wrong `DB_USER`
- wrong password or secret version
- socket path not matching the real instance connection name
- a pool configuration that opens too many connections too fast

## If you hit connection limits

Lower the pressure before changing the instance:

- reduce pool size
- review Cloud Run max instances
- stop creating a fresh connection per request

Connection pressure is often an app-design problem before it is an instance-size problem.

## Good debugging order

1. Confirm the instance exists and is healthy.
2. Confirm the connection path for this environment.
3. Confirm the runtime identity.
4. Confirm the exact database, user, and secret values the app is using.
5. Read logs before widening permissions or changing network policy.
