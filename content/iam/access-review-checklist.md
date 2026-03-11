---
title: IAM access review checklist
description: A fast reference for reviewing workload identity, human access, and the reasons broad roles keep appearing.
docType: reference
category: Reference
goal: I know IAM matters and I want a short checklist before access becomes production debt.
summary: Review identity boundaries, role scope, and the reason each permission exists.
difficulty: beginner
estimatedTime: 5 minutes
lastReviewed: 2026-03-11
order: 3
bestFor:
  - Access reviews
  - Least-privilege work
related:
  - /docs/iam/service-accounts-first
  - /docs/iam/mental-model
---

## Human access checklist

- groups are used where possible
- project ownership is explicit
- access changes have a visible reason

## Workload checklist

- each important workload has its own service account
- storage, secrets, and deployment permissions are not mixed carelessly
- broad roles are challenged before they become permanent

## Review checklist

- identity, role, and scope can all be explained
- the team knows who approved broad access
- permission errors are fixed by design, not by panic
