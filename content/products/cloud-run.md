---
title: Cloud Run
description: The best first compute service for many teams building containerized web applications on GCP.
category: Products
product: Cloud Run
difficulty: beginner
estimatedTime: 10 minutes
lastReviewed: 2026-03-11
awsEquivalent: App Runner or ECS Fargate, depending on the workload
azureEquivalent: Container Apps
tags:
  - compute
  - containers
  - serverless
---

## TL;DR

Cloud Run runs containerized applications and scales them for you. For many teams, it is the best first place to deploy a web app or API on GCP.

## When to use it

Cloud Run is a strong fit when:

- your app can run in a container
- you expose HTTP services or event-driven handlers
- you want simpler operations than Kubernetes
- you want to scale with traffic

## Avoid if

Cloud Run is a weaker fit when:

- you need deep Kubernetes orchestration
- you depend on long-running local state
- you need hardware or runtime control it does not provide

## The mental model

Think of Cloud Run as:

"deploy a container, receive HTTPS traffic, let Google handle scaling."

That is not the full story, but it is the right mental model to start with.

## Smallest useful workflow

1. Build a container image for your app.
2. Push it to Artifact Registry.
3. Deploy the image to Cloud Run.
4. Attach environment variables and secrets.
5. Point traffic at the new revision.

## Production checklist

- use a dedicated service account
- configure request timeout intentionally
- set minimum instances only if cold-start behavior requires it
- send logs in structured form when possible
- keep background work out of request handlers unless the runtime model is safe for it

## Common mistakes

### Using local disk for important state

Cloud Run instances are not a permanent storage layer.

### Forgetting database connection limits

Auto-scaling compute can overwhelm a relational database if you do not plan the connection model.

### Packing too many jobs into one service

Keep services focused. Separate user-facing traffic from batch or internal workloads when the behavior differs.

## Hello world shape

```bash
gcloud run deploy my-app \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

The command above is only the starting point. Production deployments usually need better IAM, secrets, and networking decisions.

## Alternatives inside GCP

- GKE for Kubernetes-heavy environments
- Compute Engine for VM-level control
- App Engine if you are specifically aligned with that runtime model

## What to read next

- [Cloud Storage](/docs/products/cloud-storage)
- [IAM basics](/docs/core-concepts/iam-basics)
