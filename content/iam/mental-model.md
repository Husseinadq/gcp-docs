---
title: IAM mental model
description: A plain-English explanation of the three moving parts that make IAM either clear or miserable.
docType: explanation
category: Concepts
goal: IAM feels mysterious and I need the simplest model that makes the permission system understandable.
summary: IAM becomes manageable when identity, role, and scope are all explicit.
difficulty: beginner
estimatedTime: 7 minutes
lastReviewed: 2026-03-15
order: 2
bestFor:
  - First access design
  - Permission debugging
related:
  - /docs/iam/service-accounts-first
  - /docs/iam/groups-roles-and-scope
  - /docs/iam/troubleshooting
  - /docs/iam/access-review-checklist
---

## The three parts

IAM answers:

who can do what on which resource

That means three things must be clear:

- identity
- role
- scope

## Why IAM feels random

When one of those three is implicit, the platform starts feeling magical and hostile.

Usually the problem is not "GCP is weird."

It is that the identity, scope, or role choice is hidden.

## Identity means the principal

Usually that is one of these:

- a user
- a Google Group
- a service account

For humans, groups are usually the cleanest default.

For workloads, user-managed service accounts are the cleanest default.

## Role means the permissions bundle

Roles are collections of permissions.

That is why `roles/run.developer` is easier to reason about than guessing individual `run.*` permissions one by one.

Start with predefined roles and only consider custom roles when a repeated least-privilege gap is obvious.

## Scope means where the binding lives

Bindings can live at organization, folder, project, or resource level.

That matters because access inherits downward through the resource hierarchy.

If you grant a role at the project level, that access usually reaches resources inside the project too.

## The best default

Keep human access group-based and workload access service-account-based.

That makes permission reviews far easier later.

## Two debugging questions that cut through most IAM confusion

1. Which principal made the call?
2. On which resource was the permission actually needed?

If either answer is fuzzy, the fix is usually design clarity, not a broader role.

## Common mistakes

- binding roles directly to many individual users
- using the default service account without reviewing its permissions
- granting project-wide roles when a resource-level binding would do
- fixing a permission error by reaching for `Owner` or `Editor`
