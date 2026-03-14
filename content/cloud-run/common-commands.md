---
title: Common commands
description: The Cloud Run CLI commands you keep reaching for during deploys, rollouts, and debugging.
docType: reference
category: Reference
goal: I already understand Cloud Run and I want the shortest path to the exact command I need.
summary: Keep deploy, describe, logs, revision, and config commands in one place.
difficulty: beginner
estimatedTime: 4 minutes
lastReviewed: 2026-03-13
order: 4
bestFor:
  - Developers in the middle of implementation
  - Teams debugging live services
related:
  - /docs/cloud-run/quickstart
  - /docs/cloud-run/deploy-from-image
  - /docs/cloud-run/production-checklist
---

## Deploy

```bash
gcloud run deploy SERVICE --source . --region REGION
gcloud run deploy SERVICE --image IMAGE_URI --region REGION
```

## Describe

```bash
gcloud run services describe SERVICE --region REGION
gcloud run services describe SERVICE --region REGION --format='value(status.url)'
gcloud run services describe SERVICE --region REGION --format='value(spec.template.spec.serviceAccountName)'
```

## Update config

```bash
gcloud run services update SERVICE --region REGION --update-env-vars KEY=VALUE
gcloud run services update SERVICE --region REGION --service-account SERVICE_ACCOUNT_EMAIL
gcloud run deploy SERVICE --image IMAGE_URI --update-secrets ENV_VAR=SECRET_NAME:latest
```

## Revisions and logs

```bash
gcloud run revisions list --service=SERVICE --region=REGION
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=SERVICE" --limit=20
```

## IAM

```bash
gcloud run services add-iam-policy-binding SERVICE \
  --region REGION \
  --member="user:alice@example.com" \
  --role="roles/run.invoker"
```

## Keep this in mind

If you are changing deploy identity, env vars, or image version, you are effectively creating a new revision even if the service URL stays the same.
