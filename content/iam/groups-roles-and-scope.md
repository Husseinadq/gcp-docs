---
title: Groups, roles, and scope
description: The practical model for deciding which principal gets which role and where to bind it.
docType: explanation
category: Concepts
goal: I understand the words in IAM, but I still need a simple design model that prevents messy access patterns.
summary: Use groups for humans, service accounts for workloads, and bind roles at the lowest practical scope that matches the job.
difficulty: beginner
estimatedTime: 8 minutes
lastReviewed: 2026-03-15
order: 3
bestFor:
  - Platform design
  - Access reviews
  - Teams standardizing IAM patterns
related:
  - /docs/iam/mental-model
  - /docs/iam/grant-project-access
  - /docs/iam/access-review-checklist
---

## Start with the principal type

### Humans

Use groups when possible.

That keeps project policies stable even when team membership changes.

### Workloads

Use user-managed service accounts.

That keeps runtime identity separate from human operators and makes access reviews easier.

## Then choose the role

Good default order:

1. predefined role that already fits
2. a small combination of predefined roles
3. custom role only when there is a repeated least-privilege gap

Avoid basic roles like `Owner`, `Editor`, and `Viewer` when a narrower service role exists and the task is clear.

## Then choose the scope

Google Cloud access inherits through the resource hierarchy:

```text
organization -> folder -> project -> resource
```

That means project-level access usually reaches the resources inside the project too.

Bind at the lowest practical scope that matches the job:

- project when the team really owns that project boundary
- resource when only one service, bucket, or secret needs to be shared

## The design rule that keeps IAM sane

Use different principals for different jobs:

- human readers
- deployers
- runtime workloads
- break-glass admins

Once those get mixed together, every permission review gets harder.

## Common design smells

- individual users bound all over the project policy
- a runtime service account with far more access than the app needs
- deployers depending on broad project roles instead of narrow act-as rights
- service account keys being created for workloads that already run on GCP
