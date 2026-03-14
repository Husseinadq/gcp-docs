---
title: Troubleshooting
description: Fix the Cloud Run failures that show up most often when a service deploys, starts, or receives traffic.
docType: reference
category: Operate
goal: My Cloud Run service is failing and I need the shortest path to the likely root cause.
summary: Check logs, port binding, runtime identity, image architecture, and caller access before changing random settings.
difficulty: intermediate
estimatedTime: 8 minutes
lastReviewed: 2026-03-14
order: 5
bestFor:
  - Failed deploys
  - Revision startup issues
  - Traffic and auth failures
related:
  - /docs/cloud-run/common-commands
  - /docs/cloud-run/private-services
  - /docs/cloud-run/production-checklist
---

## First commands to run

```bash
gcloud run services describe SERVICE --region REGION
gcloud run revisions list --service=SERVICE --region REGION
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=SERVICE" --limit=50
```

Those three commands usually tell you more than guessing in the console.

## If the container fails to start

Check these first:

- the app listens on `PORT`
- the app listens on `0.0.0.0`, not only `127.0.0.1`
- the image is built for 64-bit Linux

Minimal Node example:

```js
const port = process.env.PORT || 8080
app.listen(port, '0.0.0.0')
```

## If the service deploys but returns auth errors

Check:

- whether the service is public or private
- whether the caller has `roles/run.invoker`
- whether you are sending an identity token for private services

## If the service cannot reach another resource

Check the runtime service account first.

```bash
gcloud run services describe SERVICE \
  --region REGION \
  --format='value(spec.template.spec.serviceAccountName)'
```

Then check whether that identity has the exact role it needs for the target resource.

## If a config change did nothing

Remember that Cloud Run changes land on a new revision.

If traffic never moved to the new revision, you might still be hitting the old one.

## Good debugging order

1. Read the latest revision logs.
2. Confirm the active revision and service URL.
3. Confirm the runtime identity.
4. Confirm whether the problem is startup, traffic, or downstream access.
