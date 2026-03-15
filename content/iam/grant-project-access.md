---
title: Grant project access
description: Give humans access to a project in a way that stays understandable when the team grows.
docType: how-to
category: Guides
goal: I need to grant project access without creating a pile of one-off user bindings and broad roles.
summary: Bind groups to deliberate project roles, and use service-account-level access only where act-as permission is really required.
difficulty: beginner
estimatedTime: 10 minutes
lastReviewed: 2026-03-15
order: 2
bestFor:
  - Platform teams
  - Team onboarding
  - Cloud Run based projects
prerequisites:
  - A GCP project
  - Team Google Groups or equivalent managed groups
related:
  - /docs/iam/mental-model
  - /docs/iam/workload-permissions-for-cloud-run
  - /docs/iam/common-commands
---

## Goal

Grant human access in a way that answers three questions quickly:

- which group has access
- which role it has
- why the role exists

## 1. Set your variables

```bash
export PROJECT_ID="your-project-id"
export VIEWERS_GROUP="gcp-viewers@example.com"
export DEPLOYERS_GROUP="gcp-deployers@example.com"
export RUNTIME_SERVICE_ACCOUNT="docs-runtime@${PROJECT_ID}.iam.gserviceaccount.com"
```

## 2. Grant baseline read access to a viewer group

```bash
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="group:${VIEWERS_GROUP}" \
  --role="roles/browser"

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="group:${VIEWERS_GROUP}" \
  --role="roles/logging.viewer"
```

This is much easier to manage than binding the same role to individual users one by one.

Add other service-specific read roles only when the team can explain why they are needed.

## 3. Grant deploy access to a deployer group

```bash
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="group:${DEPLOYERS_GROUP}" \
  --role="roles/run.developer"

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="group:${DEPLOYERS_GROUP}" \
  --role="roles/artifactregistry.reader"
```

Those roles are about deploying and reading the built image. They are not enough to attach a runtime service account yet.

## 4. Grant `Service Account User` only on the runtime service account

```bash
gcloud iam service-accounts add-iam-policy-binding "$RUNTIME_SERVICE_ACCOUNT" \
  --member="group:${DEPLOYERS_GROUP}" \
  --role="roles/iam.serviceAccountUser"
```

This keeps the act-as permission narrow instead of handing it out across every service account in the project.

## 5. Verify what the groups really have

```bash
gcloud projects get-iam-policy "$PROJECT_ID" \
  --flatten="bindings[].members" \
  --filter="bindings.members:group:${DEPLOYERS_GROUP}" \
  --format="table(bindings.role)"

gcloud iam service-accounts get-iam-policy "$RUNTIME_SERVICE_ACCOUNT"
```

## When not to use project-level access

If only one resource needs to be shared, bind the role at the resource instead of the project when practical.

Project-level access is best when the team really does need that boundary.

## Stop condition

You are done when:

- human access is group-based
- deploy roles are explicit
- service-account act-as access is narrow and intentional
