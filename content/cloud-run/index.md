---
title: Cloud Run
description: The service hub for deploying containerized apps, APIs, and event-driven handlers on Google Cloud.
docType: service-hub
goal: I want to know whether Cloud Run is the right runtime for this workload and where to start inside its docs.
summary: Managed containers with fast deployment, managed scaling, and low operational overhead.
difficulty: beginner
estimatedTime: 6 minutes
lastReviewed: 2026-03-11
order: 1
bestFor:
  - Web applications
  - APIs
  - Event handlers
related:
  - /docs/cloud-run/quickstart
  - /docs/cloud-run/deploy-from-image
  - /docs/cloud-run/common-commands
---

## TL;DR

Cloud Run is the best first compute service for many teams shipping web apps on GCP.

It is strongest when:

- the workload can run in a container
- the application is request-driven or event-driven
- the team wants fast deployment without running Kubernetes

## Use it when

- you want managed deployment and scaling
- your service is stateless or close to stateless
- your team values speed more than infrastructure control

## Avoid it when

- you need deep Kubernetes control
- the workload depends on long-lived local state
- the platform needs cluster primitives rather than a managed service boundary

## Fastest starting path

1. Use [Cloud Run quickstart](/docs/cloud-run/quickstart) to get the first service live.
2. Use [Deploy from a container image](/docs/cloud-run/deploy-from-image) when the app is already Dockerized.
3. Keep [Common commands](/docs/cloud-run/common-commands) open while you work.

## Common jobs

- deploy a web app
- deploy an API
- run event-driven background handlers
- connect managed compute to storage, secrets, and a database

## Compare it to

### GKE

Choose GKE when the team needs Kubernetes as a platform. Choose Cloud Run when the team wants a simpler managed runtime for services.

### Compute Engine

Choose Compute Engine when the workload truly needs VM-level control. Otherwise Cloud Run usually keeps operations simpler.

## Read next

- [Deploy from a container image](/docs/cloud-run/deploy-from-image)
- [Run a private service](/docs/cloud-run/private-services)
- [Common commands](/docs/cloud-run/common-commands)
