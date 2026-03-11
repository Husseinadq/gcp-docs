---
title: IAM
description: The service hub for identity, access, roles, and service-account design on Google Cloud.
docType: service-hub
goal: I need to understand how identity and permissions work before the project becomes chaotic.
summary: Access control layer for people, groups, service accounts, and resources across GCP.
difficulty: beginner
estimatedTime: 6 minutes
lastReviewed: 2026-03-11
order: 8
bestFor:
  - Teams setting up a project
  - Production access design
  - Service account planning
related:
  - /docs/iam/service-accounts-first
  - /docs/iam/mental-model
  - /docs/iam/access-review-checklist
---

## TL;DR

IAM is the answer to one question:

who can do what on which resource

If this is unclear, the whole platform starts feeling random.

## Use it when

- setting up project access
- giving workloads service identities
- deciding who can deploy, read secrets, or access storage

## Avoid this mistake

Do not treat IAM like a cleanup step after the architecture is done.

Permissions are part of the architecture.

## Fastest starting path

1. Read [IAM in Plain English](/docs/explain/iam-in-plain-english).
2. Decide which humans, groups, and workloads need access.
3. Use narrow roles first, then widen only when necessary.

## Common jobs

- user and group access
- service account design
- workload permissions
- project boundary enforcement

## Compare it to

### Organization policy

IAM answers who can do what. Organization policy answers broader guardrails and constraints.

### Service-specific settings

Many service settings depend on IAM decisions. That is why IAM belongs early in design, not late.

## Read next

- [IAM in Plain English](/docs/explain/iam-in-plain-english)
- [How GCP Is Organized](/docs/explain/how-gcp-is-organized)
- [Cloud Run](/docs/cloud-run)
