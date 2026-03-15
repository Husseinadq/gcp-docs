---
title: Connection model
description: The plain-English model for how local tools, Cloud Run, the proxy, sockets, and private IP fit together.
docType: explanation
category: Concepts
goal: Cloud SQL connectivity still feels fuzzy and I need the simplest model that explains how the pieces fit.
summary: Choose one connection path per environment and keep the runtime identity, network path, and pool settings explicit.
difficulty: intermediate
estimatedTime: 8 minutes
lastReviewed: 2026-03-15
order: 3
bestFor:
  - Developers moving from local Postgres to GCP
  - Teams connecting Cloud Run to Cloud SQL
related:
  - /docs/cloud-sql/quickstart
  - /docs/cloud-sql/connect-from-cloud-run
  - /docs/cloud-sql/troubleshooting
---

## The four common paths

### Local development

Use the Cloud SQL Auth Proxy and connect to `127.0.0.1`.

This is the easiest way to develop without manually allowlisting your laptop or dealing with database certificates.

### Human debugging

Use `gcloud sql connect` only for quick interactive checks against public-IP instances.

That command temporarily allowlists your current IP address. It is useful for debugging, not for application architecture.

### Cloud Run with the built-in Cloud SQL path

Attach the instance to the service and connect through the Unix socket path:

```text
/cloudsql/PROJECT:REGION:INSTANCE
```

This is the default path to choose when Cloud Run is the app runtime and you do not have a strong reason to force private IP.

### Private IP

Use private IP when network policy requires traffic to stay on your VPC path or when the architecture already depends on that model.

That path usually means:

- the instance has a private IP
- Cloud Run uses direct VPC egress or a connector
- the app connects to the instance IP and port directly

## The part people mix up

Three things are separate:

- who is calling: user, service account, or local ADC
- how traffic reaches the instance: proxy, Unix socket, or private IP
- how the app manages connections: pool size, timeouts, retries

Confusing those layers is why Cloud SQL often feels harder than it is.

## Good default for a web app

```text
Local dev -> Cloud SQL Auth Proxy -> 127.0.0.1:5432
Cloud Run -> attached Cloud SQL instance -> /cloudsql/INSTANCE_CONNECTION_NAME
```

That gives the team one clean dev path and one clean production path.

## Pooling matters more than people expect

Do not size the pool as if one application process owns the whole database.

Cloud Run can scale to many service instances, and each instance can open its own pool.

Start with:

- small pool sizes such as `5`
- explicit acquire timeouts
- explicit review before raising max instances or pool limits

## Common mistakes

- using `gcloud sql connect` as if it were the production connection model
- forgetting that the Cloud Run runtime service account needs `roles/cloudsql.client`
- opening too many connections because each app instance has its own large pool
- mixing public-IP debugging steps with private-IP production architecture
