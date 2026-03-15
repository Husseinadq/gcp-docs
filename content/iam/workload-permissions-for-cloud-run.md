---
title: Workload permissions for Cloud Run
description: Give a Cloud Run service the exact IAM roles it needs without falling back to broad project access.
docType: how-to
category: Guides
goal: My Cloud Run service needs to reach other Google Cloud resources and I want the runtime identity to stay clear and narrow.
summary: Create one runtime service account, grant only the needed roles, and attach it to the service instead of using default identities.
difficulty: intermediate
estimatedTime: 12 minutes
lastReviewed: 2026-03-15
order: 3
bestFor:
  - Cloud Run APIs
  - Services that use Cloud Storage, Secret Manager, or Cloud SQL
  - Teams cleaning up default service account usage
prerequisites:
  - A Cloud Run service
  - A clear list of target resources the service must access
related:
  - /docs/iam/service-accounts-first
  - /docs/cloud-run/env-and-secrets
  - /docs/cloud-sql/connect-from-cloud-run
  - /docs/iam/troubleshooting
---

## Goal

Give one Cloud Run service one explicit runtime identity and only the resource access that service actually needs.

## 1. Set your variables

```bash
export PROJECT_ID="your-project-id"
export REGION="us-central1"
export SERVICE="docs-api"
export BUCKET="docs-user-uploads"
export DEPLOYERS_GROUP="gcp-deployers@example.com"
export RUNTIME_SERVICE_ACCOUNT_NAME="docs-runtime"
export RUNTIME_SERVICE_ACCOUNT="${RUNTIME_SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
```

## 2. Create the runtime service account if it does not already exist

```bash
gcloud iam service-accounts create "$RUNTIME_SERVICE_ACCOUNT_NAME" \
  --description="Runtime identity for the docs API" \
  --display-name="docs-runtime"
```

## 3. Grant only the roles the service needs

Example runtime roles for a service that reads secrets, stores uploads, and connects to Cloud SQL:

```bash
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${RUNTIME_SERVICE_ACCOUNT}" \
  --role="roles/secretmanager.secretAccessor"

gcloud storage buckets add-iam-policy-binding "gs://${BUCKET}" \
  --member="serviceAccount:${RUNTIME_SERVICE_ACCOUNT}" \
  --role="roles/storage.objectUser"

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${RUNTIME_SERVICE_ACCOUNT}" \
  --role="roles/cloudsql.client"
```

Do not add roles just because a future feature might need them.

When the target resource supports resource-level IAM, prefer that over project-wide access.

## 4. Let deployers attach this service account, but only this one

```bash
gcloud iam service-accounts add-iam-policy-binding "$RUNTIME_SERVICE_ACCOUNT" \
  --member="group:${DEPLOYERS_GROUP}" \
  --role="roles/iam.serviceAccountUser"
```

That gives deployers the `iam.serviceAccounts.actAs` permission on this specific runtime identity.

## 5. Attach the service account to the Cloud Run service

```bash
gcloud run services update "$SERVICE" \
  --region="$REGION" \
  --service-account="$RUNTIME_SERVICE_ACCOUNT"
```

## 6. Verify the active runtime identity

```bash
gcloud run services describe "$SERVICE" \
  --region="$REGION" \
  --format='value(spec.template.spec.serviceAccountName)'

gcloud projects get-iam-policy "$PROJECT_ID" \
  --flatten="bindings[].members" \
  --filter="bindings.members:${RUNTIME_SERVICE_ACCOUNT}" \
  --format="table(bindings.role)"
```

## Good defaults

- one runtime service account per important service
- no JSON keys for in-project workloads
- narrow roles on the runtime service account
- separate deployer access from runtime access

## Stop condition

You are done when:

- the Cloud Run service shows the intended runtime service account
- that service account has only the roles the workload needs
- deployers can attach the identity without getting broad access to every service account
