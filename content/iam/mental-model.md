---
title: IAM mental model
description: A plain-English explanation of the three moving parts that make IAM either clear or miserable.
docType: explanation
category: Concepts
goal: IAM feels mysterious and I need the simplest model that makes the permission system understandable.
summary: IAM becomes manageable when identity, role, and scope are all explicit.
difficulty: beginner
estimatedTime: 7 minutes
lastReviewed: 2026-03-11
order: 2
bestFor:
  - First access design
  - Permission debugging
related:
  - /docs/iam/service-accounts-first
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

## The best default

Keep human access group-based and workload access service-account-based.

That makes permission reviews far easier later.
