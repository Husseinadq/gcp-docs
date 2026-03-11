---
title: GKE
description: The service hub for Kubernetes workloads on Google Cloud Platform.
docType: service-hub
goal: I need to decide whether GKE is worth the complexity compared with simpler managed runtimes.
summary: Managed Kubernetes for teams that need cluster-level control and Kubernetes-native workflows.
difficulty: intermediate
estimatedTime: 6 minutes
lastReviewed: 2026-03-11
order: 2
bestFor:
  - Teams already comfortable with Kubernetes
  - Multi-service platforms
  - Workloads needing cluster primitives
related:
  - /docs/gke/quickstart
  - /docs/gke/when-gke-is-worth-it
  - /docs/gke/cluster-checklist
---

## TL;DR

GKE is powerful, but it is not the best first step for most beginners.

Use it when Kubernetes itself is part of the solution, not just because the app needs a place to run.

## Use it when

- the team already understands Kubernetes
- workloads need cluster-level features and scheduling control
- the platform contains many services with shared Kubernetes operations

## Avoid it when

- the team only needs to deploy one or two web services
- operational simplicity is more important than low-level control
- Cloud Run already matches the runtime model

## Fastest starting path

Start by asking one question:

does the platform need Kubernetes, or does it only need a runtime?

If the answer is only "a runtime," start with [Cloud Run](/docs/cloud-run).

## Common jobs

- run Kubernetes-native services
- manage containerized platforms with custom networking and workload patterns
- standardize deployment across teams already working in Kubernetes

## Compare it to

### Cloud Run

Cloud Run is usually the better first choice for a small number of web services. GKE becomes more compelling when Kubernetes knowledge and platform needs are already real.

### Compute Engine

GKE is about orchestration, not just virtual machines. If the need is only VM control, Compute Engine is the closer comparison.

## Read next

- [Cloud Run](/docs/cloud-run)
- [How GCP Is Organized](/docs/explain/how-gcp-is-organized)
