---
title: Cloud Run
description: A concise reference page for when Cloud Run is the right runtime, when it is not, and what to watch for.
docType: reference
goal: I need a fast snapshot of Cloud Run so I can decide whether it fits this workload.
product: Cloud Run
difficulty: beginner
estimatedTime: 6 minutes
lastReviewed: 2026-03-11
order: 1
bestFor:
  - Containerized web services
  - APIs
  - Teams preferring managed compute
awsEquivalent: App Runner or ECS Fargate depending on workload shape
azureEquivalent: Container Apps
related:
  - /docs/how-to/deploy-to-cloud-run
  - /docs/learn/ship-your-first-web-app-on-gcp
---

## One-sentence summary

Cloud Run is a managed way to run containerized services without taking on full Kubernetes operations.

## Good fit

- stateless web applications
- APIs
- event-driven handlers
- teams that want fast deployment cycles with low ops drag

## Avoid when

- you need deep Kubernetes control
- the workload depends on local persistent state
- the runtime shape does not fit request-driven or managed execution well

## What matters most

### Identity

Treat the service account as part of the service definition, not as a later detail.

### Runtime boundary

The container should be responsible for one clear workload, not every job in the system.

### Storage model

Do not treat the service filesystem as durable user storage.

## Common gotchas

- broad IAM roles used as a shortcut
- weak separation between web traffic and background work
- deployment done before the region and identity decisions are explicit

## Use with

- Cloud Storage for file objects
- Secret Manager for secrets
- one relational or non-relational database if the product needs it

## Read next

- [Deploy to Cloud Run](/docs/how-to/deploy-to-cloud-run)
- [IAM in Plain English](/docs/explain/iam-in-plain-english)
