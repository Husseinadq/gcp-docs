---
title: IAM
description: The service hub for identity, access, roles, and service-account design on Google Cloud.
docType: service-hub
goal: I need to understand how identity and permissions work before the project becomes chaotic.
summary: Access control layer for people, groups, service accounts, and resources across GCP.
difficulty: beginner
estimatedTime: 6 minutes
lastReviewed: 2026-03-15
order: 8
bestFor:
  - Teams setting up a project
  - Production access design
  - Service account planning
related:
  - /docs/iam/service-accounts-first
  - /docs/iam/grant-project-access
  - /docs/iam/common-commands
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

Do not default to broad roles or service account keys just because the first error message was unclear.

## Fastest starting path

1. Read [IAM mental model](/docs/iam/mental-model) so identity, role, and scope stop feeling random.
2. Use [Service accounts first](/docs/iam/service-accounts-first) for workloads.
3. Use [Grant project access](/docs/iam/grant-project-access) for humans through groups.
4. Keep [Common commands](/docs/iam/common-commands) nearby while you work.

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

- [Grant project access](/docs/iam/grant-project-access)
- [Workload permissions for Cloud Run](/docs/iam/workload-permissions-for-cloud-run)
- [Troubleshooting](/docs/iam/troubleshooting)
