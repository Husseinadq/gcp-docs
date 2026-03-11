---
title: Deploy to Cloud Run
description: The shortest safe path to deploying a containerized web app on Cloud Run.
docType: how-to
goal: I have a containerized app and I want to deploy it to Cloud Run with the minimum useful setup.
difficulty: beginner
estimatedTime: 12 minutes
lastReviewed: 2026-03-11
order: 1
bestFor:
  - First Cloud Run deployment
  - Small services and APIs
  - Teams choosing managed compute over Kubernetes
prerequisites:
  - A GCP project with billing enabled
  - A containerized application
  - Permission to deploy services in the target project
related:
  - /docs/reference/cloud-run
  - /docs/explain/iam-in-plain-english
---

## Goal

Deploy one HTTP application to Cloud Run cleanly enough that you can understand the deployment shape and improve it later.

## Assumptions

This guide assumes:

- your app already runs in a container
- you are not solving advanced networking yet
- your first goal is a working managed deployment

## Step 1: Decide which identity the service should run as

Before deployment, choose the service account for the workload.

Why this comes first:

If identity is vague, secrets access, storage access, and later debugging all become harder.

## Step 2: Build and push the image

Your deployment target is not source code by itself. It is a container image.

The exact image build pipeline can vary, but the important point is that Cloud Run should receive a versioned image you can reason about.

## Step 3: Deploy one service with one clear responsibility

Keep the first service narrow.

Good first examples:

- the main web app
- one API
- one internal service

Bad first example:

- mixing web traffic, background jobs, and admin tasks into one vague service

## Step 4: Set the runtime configuration intentionally

At minimum, check:

- region
- service account
- environment variables and secrets
- request timeout
- public or private access

Those are not edge settings. They define the behavior of the service.

## Step 5: Confirm the stop condition

Do not call the task done until:

- the service responds successfully
- logs are visible
- the correct identity is attached
- you know the URL and the owning project

## Common failure points

### The app boots locally but fails in Cloud Run

This often means the container contract is wrong or required configuration is missing.

### The app deploys but cannot reach another service

This is often an IAM or networking assumption problem, not a deployment failure.

### The service works but the structure is unclear

That usually means too many responsibilities were packed into the first deployment.

## What to keep open while doing this

- [IAM in Plain English](/docs/explain/iam-in-plain-english)
- [Cloud Run](/docs/reference/cloud-run)
