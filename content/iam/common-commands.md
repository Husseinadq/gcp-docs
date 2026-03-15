---
title: Common commands
description: The IAM commands you keep reaching for while granting access, inspecting bindings, and debugging principals.
docType: reference
category: Reference
goal: I already understand IAM and I want the shortest path to the exact command I need.
summary: Keep project policy, service account, role metadata, impersonation, and Cloud Run identity commands in one place.
difficulty: beginner
estimatedTime: 5 minutes
lastReviewed: 2026-03-15
order: 4
bestFor:
  - Developers in the middle of implementation
  - Teams reviewing access quickly
related:
  - /docs/iam/grant-project-access
  - /docs/iam/workload-permissions-for-cloud-run
  - /docs/iam/access-review-checklist
---

## Inspect project policy

```bash
gcloud projects get-iam-policy PROJECT_ID

gcloud projects get-iam-policy PROJECT_ID \
  --flatten="bindings[].members" \
  --filter="bindings.members:group:team@example.com" \
  --format="table(bindings.role)"
```

## Grant and remove project roles

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="group:team@example.com" \
  --role="roles/run.developer"

gcloud projects remove-iam-policy-binding PROJECT_ID \
  --member="group:team@example.com" \
  --role="roles/run.developer"
```

## Inspect service accounts

```bash
gcloud iam service-accounts list
gcloud iam service-accounts get-iam-policy SERVICE_ACCOUNT_EMAIL
```

## Let a deployer act as one runtime service account

```bash
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_EMAIL \
  --member="group:deployers@example.com" \
  --role="roles/iam.serviceAccountUser"
```

## Inspect role contents

```bash
gcloud iam roles describe roles/cloudsql.client
gcloud iam roles describe roles/run.developer
```

## Impersonate a service account for testing

```bash
gcloud auth print-access-token \
  --impersonate-service-account=SERVICE_ACCOUNT_EMAIL
```

This is usually better than creating a JSON key for local testing.

## Check Cloud Run runtime identity

```bash
gcloud run services describe SERVICE \
  --region REGION \
  --format='value(spec.template.spec.serviceAccountName)'
```
