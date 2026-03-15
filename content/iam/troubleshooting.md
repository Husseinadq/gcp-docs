---
title: Troubleshooting
description: Fix the IAM failures that show up most often when humans or workloads are blocked by Google Cloud permissions.
docType: reference
category: Operate
goal: I hit a permission error and I need the shortest path to the exact principal, role, or scope mistake behind it.
summary: Identify the principal, identify the resource, inspect bindings, and use Policy Troubleshooter before widening access.
difficulty: intermediate
estimatedTime: 8 minutes
lastReviewed: 2026-03-15
order: 4
bestFor:
  - Permission denied errors
  - Cloud Run access debugging
  - Access review cleanup
related:
  - /docs/iam/common-commands
  - /docs/iam/workload-permissions-for-cloud-run
  - /docs/iam/access-review-checklist
---

## First commands to run

```bash
gcloud projects get-iam-policy PROJECT_ID \
  --flatten="bindings[].members" \
  --filter="bindings.members:PRINCIPAL" \
  --format="table(bindings.role)"

gcloud run services describe SERVICE \
  --region REGION \
  --format='value(spec.template.spec.serviceAccountName)'

gcloud policy-intelligence troubleshoot-policy iam \
  //cloudresourcemanager.googleapis.com/projects/PROJECT_ID \
  --principal-email=PRINCIPAL_EMAIL \
  --permission=resourcemanager.projects.get
```

Those commands usually tell you whether the problem is the wrong principal, the wrong resource scope, or a missing permission.

Use the full member string in the first command, such as `user:alice@example.com`, `group:platform@example.com`, or `serviceAccount:docs-runtime@PROJECT_ID.iam.gserviceaccount.com`.

## If a human deployer cannot update Cloud Run

Check these first:

- does the deployer have `roles/run.developer` or the required Cloud Run role
- does the deployer have `roles/iam.serviceAccountUser` on the runtime service account
- is the image source also gated by Artifact Registry or Cloud Build permissions

The missing `Service Account User` binding is one of the most common hidden causes.

## If a workload cannot reach another Google Cloud service

Check the runtime service account on the workload before touching project policy.

For Cloud Run:

```bash
gcloud run services describe SERVICE \
  --region REGION \
  --format='value(spec.template.spec.serviceAccountName)'
```

Then check the exact roles bound to that service account on the target project or resource.

## If the team wants to fix the error with `Owner` or `Editor`

Stop and answer these instead:

1. which principal is actually making the call
2. which permission is actually missing
3. at which resource should that permission live

If those three answers are still unclear, run Policy Troubleshooter with the exact principal and permission.

## If service account keys start appearing

That is usually a design smell for in-project workloads.

Prefer:

- attached runtime service accounts on GCP resources
- service account impersonation for local testing
- workload identity federation for external environments when supported

## Good debugging order

1. Identify the principal from the failing request.
2. Identify the resource boundary where access is needed.
3. Inspect existing bindings.
4. Use Policy Troubleshooter for the exact permission.
5. Change the narrowest binding that fixes the design.
