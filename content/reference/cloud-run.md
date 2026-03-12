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

## Common commands

```bash
# deploy from source
gcloud run deploy SERVICE --source . --region REGION

# deploy from an existing image
gcloud run deploy SERVICE --image IMAGE_URI --region REGION

# get the live URL
gcloud run services describe SERVICE --region REGION --format='value(status.url)'

# check the runtime identity
gcloud run services describe SERVICE --region REGION --format='value(spec.template.spec.serviceAccountName)'
```

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

## Minimum deploy settings

| Setting | Why it matters |
| --- | --- |
| Region | Controls latency, data locality, and nearby managed services |
| Service account | Defines what the workload can reach |
| Public vs private | Decides whether the service is internet-facing |
| Image or source version | Gives you a deployable version you can reason about |
| Timeout and env vars | Changes runtime behavior, not just polish |

## Common gotchas

- broad IAM roles used as a shortcut
- weak separation between web traffic and background work
- deployment done before the region and identity decisions are explicit

## Remember

Cloud Run is easiest when one service does one job.

As soon as a single service starts acting like a web app, queue worker, cron box, and admin shell at the same time, the design usually needs to split.

## Use with

- Cloud Storage for file objects
- Secret Manager for secrets
- one relational or non-relational database if the product needs it

## Read next

- [Deploy to Cloud Run](/docs/how-to/deploy-to-cloud-run)
- [IAM in Plain English](/docs/explain/iam-in-plain-english)
