---
title: Ship Your First Web App on GCP
description: A guided tutorial for understanding the smallest useful GCP stack for a modern web app.
docType: tutorial
goal: I want one guided path that teaches me the platform while I ship a simple web app stack.
difficulty: beginner
estimatedTime: 20 minutes
lastReviewed: 2026-03-11
order: 1
bestFor:
  - First-time GCP users
  - Startup teams
  - Full-stack developers moving from Vercel, AWS, or Render
prerequisites:
  - A Google Cloud account
  - A web app that can run in a container
  - Basic comfort with command-line deployment
related:
  - /docs/explain/how-gcp-is-organized
  - /docs/how-to/deploy-to-cloud-run
  - /docs/reference/cloud-run
---

## Outcome

By the end of this tutorial, you should understand a simple and useful first GCP stack:

- Cloud Run for the app
- Cloud Storage for files
- Secret Manager for secrets
- IAM for access control

That is enough to teach the core platform shape without drowning you in options.

## Why this tutorial uses so few services

The goal of a tutorial is not to prove how many GCP products exist.

The goal is to create a stable mental model:

- one project holds the workload
- one runtime serves the app
- one storage service holds files
- one identity model controls access

Once that clicks, the rest of GCP gets easier.

## Step 1: Create a clean project boundary

Create one project for the workload you are learning.

Why:

- it gives you a clean billing boundary
- it isolates IAM decisions
- it keeps logs, services, and secrets in one place

Checkpoint:

You should be able to say which project contains your app and which billing account pays for it.

## Step 2: Pick the runtime first

Use Cloud Run as the runtime for this tutorial.

Why:

- it removes most infrastructure setup
- it fits the web app request/response model well
- it teaches managed deployment without forcing Kubernetes knowledge

Checkpoint:

You understand that your app is packaged as a container and served through Cloud Run.

## Step 3: Keep files out of the app container

Use Cloud Storage for user uploads, generated exports, and assets that do not belong in your application image.

Why:

- local container disk is not the right place for durable user files
- object storage is easier to reason about than database blobs for most teams

Checkpoint:

You know which data belongs in the app runtime and which data belongs in object storage.

## Step 4: Treat access as part of the architecture

Before deploying, decide which identity the app will use.

The minimum useful rule is:

- humans get human access
- workloads get service accounts

Why:

This is the point where many GCP beginners get lost. They treat permissions like a later cleanup task, then everything feels random when access errors begin.

Checkpoint:

You can describe which service account your workload should run as and what it needs to access.

## Step 5: Move from learning to execution

Once the mental model is clear, stop reading tutorials and switch to task guides.

Use:

- [Deploy to Cloud Run](/docs/how-to/deploy-to-cloud-run) for deployment steps
- [Store User Uploads in Cloud Storage](/docs/how-to/store-user-uploads-in-cloud-storage) for file handling

That is the correct handoff. Tutorials teach. How-to guides execute.

## What this tutorial deliberately skips

- advanced networking
- multi-region design
- database tuning
- organization-wide policy design

Those are real topics, but they are not day-one topics.

## What to do next

1. Read [How GCP Is Organized](/docs/explain/how-gcp-is-organized) if projects and billing still feel fuzzy.
2. Use [Deploy to Cloud Run](/docs/how-to/deploy-to-cloud-run) when you want the concrete deployment steps.
3. Keep [Cloud Run](/docs/reference/cloud-run) open when you need a fast factual snapshot.
