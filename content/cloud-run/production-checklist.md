---
title: Cloud Run production checklist
description: A fast reference for the runtime, identity, traffic, and debugging decisions that matter before going live.
docType: reference
category: Reference
goal: I already know I want Cloud Run and I need a production sanity check.
summary: Review identity, rollout, observability, and dependency boundaries before scaling traffic.
difficulty: intermediate
estimatedTime: 6 minutes
lastReviewed: 2026-03-11
order: 3
bestFor:
  - Production readiness reviews
  - Teams hardening a first deployment
related:
  - /docs/cloud-run/quickstart
  - /docs/cloud-run/common-commands
  - /docs/cloud-run/private-services
---

## Deployment checklist

- one service per clear responsibility
- versioned image per rollout
- known region and ownership

## Identity checklist

- dedicated service account per service
- only the roles the workload actually needs
- secret access granted intentionally, not broadly

## Runtime checklist

- request timeout matches workload behavior
- environment variables and secrets are explicit
- durable files are stored outside the container filesystem

## Traffic checklist

- public versus private access is explicit
- rollback path is understood
- health validation happens after deploy, not before traffic ramps

## Debugging checklist

- logs are easy to find
- error ownership is clear
- downstream dependencies are listed and understood
