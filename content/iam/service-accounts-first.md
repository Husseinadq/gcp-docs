---
title: Service accounts first
description: The shortest useful path to making workload identity explicit before permissions turn into guesswork.
docType: how-to
category: Get started
goal: I need to make workload access safe and understandable from the start.
summary: Give each workload a deliberate identity before attaching access to storage, secrets, or deployment paths.
difficulty: beginner
estimatedTime: 9 minutes
lastReviewed: 2026-03-11
order: 1
bestFor:
  - New GCP projects
  - Cloud Run and GKE workloads
  - Teams cleaning up vague permissions
related:
  - /docs/iam/mental-model
  - /docs/iam/access-review-checklist
  - /docs/cloud-run
---

## Goal

Make workload identity explicit before the project accumulates broad roles and hard-to-explain access paths.

## Fast path

This quickstart creates one service account, grants two narrow project roles, and shows how to inspect the result.

## 1. Set your project and service account name

```bash
export PROJECT_ID="your-project-id"
export SERVICE_ACCOUNT_NAME="app-runner"

gcloud config set project "$PROJECT_ID"
```

## 2. Create the service account

```bash
gcloud iam service-accounts create "$SERVICE_ACCOUNT_NAME" \
  --description="Runs the docs workload" \
  --display-name="app-runner"
```

Build the email address you will bind roles to:

```bash
export SERVICE_ACCOUNT_EMAIL="${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
echo "$SERVICE_ACCOUNT_EMAIL"
```

## 3. Grant only the roles the workload actually needs

```bash
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}" \
  --role="roles/storage.objectUser"

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}" \
  --role="roles/logging.logWriter"
```

## 4. Verify the current bindings

```bash
gcloud projects get-iam-policy "$PROJECT_ID" \
  --flatten="bindings[].members" \
  --filter="bindings.members:${SERVICE_ACCOUNT_EMAIL}" \
  --format="table(bindings.role)"
```

## What this should teach you

- workloads should have their own identities
- roles should be attached for a reason you can explain
- broad access is usually a design smell, not a quick win

If you later deploy to Cloud Run or GKE, attach this service account to the workload instead of using a vague shared identity.
