---
title: IAM in Plain English
description: The simplest useful model for understanding who can do what on which resource in GCP.
docType: explanation
goal: IAM keeps blocking me and I need the concept to make sense before I can fix permissions safely.
difficulty: beginner
estimatedTime: 7 minutes
lastReviewed: 2026-03-11
order: 2
bestFor:
  - Teams setting up first production access
  - Developers seeing permission denied errors
  - Readers confused by service accounts
related:
  - /docs/explain/how-gcp-is-organized
  - /docs/how-to/deploy-to-cloud-run
---

## TL;DR

IAM answers one question:

**who can do what on which resource**

That means three moving parts:

- identity
- permissions
- scope

If one of those is unclear, IAM feels like magic. If all three are explicit, IAM becomes manageable.

## Identity

Identity means the actor.

Usually that actor is one of these:

- a human user
- a group
- a service account

The most important distinction is between humans and workloads. Humans log in. Workloads should run as service accounts.

## Permissions

Permissions are almost never granted one by one in normal use.

Instead, GCP groups permissions into roles.

That means your practical question is usually not "what single permission is missing?"

It is:

"which role should this identity have, and is the scope too broad?"

## Scope

Scope is where the access applies:

- organization
- folder
- project
- specific resource

This is why somebody can have the right role and still hit an access problem. The role may be attached at the wrong level.

## Why service accounts matter so much

GCP becomes much easier to reason about when every workload has an explicit identity.

For example:

- Cloud Run runs as one service account
- that service account reads one secret
- that service account writes logs
- that service account maybe reads one bucket

That is a clean, inspectable model.

## Common mistake

The fastest bad fix is giving broad roles to make an error disappear.

That solves the symptom while hiding the real design problem:

- wrong identity
- wrong scope
- wrong role

## Safer default

- give teams access through groups
- give workloads dedicated service accounts
- start narrow, then widen only when necessary
- document why a role exists

## What to read next

- [Deploy to Cloud Run](/docs/how-to/deploy-to-cloud-run)
- [Cloud Run](/docs/reference/cloud-run)
