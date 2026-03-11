---
title: IAM Basics
description: The simplest useful mental model for understanding who can do what in Google Cloud.
category: Core Concepts
difficulty: beginner
estimatedTime: 7 minutes
lastReviewed: 2026-03-11
tags:
  - iam
  - security
  - service-accounts
---

## TL;DR

IAM answers one question:

**who can do what on which resource?**

In GCP, you usually grant a **role** to a **member** on a **resource**.

If that sentence is clear to you, you already understand the center of IAM.

## The three things to remember

### Member

A member is the identity:

- a person
- a group
- a service account

### Role

A role is a bundle of permissions.

Examples:

- viewer
- editor
- a product-specific admin role

### Resource

A resource is the thing access applies to:

- organization
- folder
- project
- specific service resource

## The most important beginner idea

Prefer granting access to **groups** and **service accounts**, not to individual people wherever possible.

That keeps access easier to review and change later.

## Service accounts

A service account is an identity used by workloads instead of humans.

For example:

- a Cloud Run service might use a service account
- that service account might be allowed to read a Secret Manager secret
- it might also be allowed to write logs or access a storage bucket

## Common mistakes

### Giving broad roles too early

Beginner teams often grant `Editor` or similarly broad access because it is fast. That works for day one, but it creates risk and confusion later.

### Mixing human access and workload access

Human users and services should not share the same identity patterns. Treat them differently from the start.

### Forgetting the project boundary

A user may have access in one project and not in another. That is normal and often desirable.

## A safer default approach

- use groups for team-level access
- give workloads dedicated service accounts
- start narrow, then expand only when needed
- document why a role was granted

## What to read next

- [What is GCP?](/docs/start-here/what-is-gcp)
- [Cloud Run](/docs/products/cloud-run)
