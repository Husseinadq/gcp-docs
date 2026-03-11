---
title: Cloud Storage quickstart
description: The shortest safe path to storing files in Cloud Storage instead of inside your runtime.
docType: how-to
category: Get started
goal: I need durable file storage for uploads, assets, or generated artifacts.
summary: Start with one bucket, one clear access model, and one cleanup rule.
difficulty: beginner
estimatedTime: 10 minutes
lastReviewed: 2026-03-11
order: 1
bestFor:
  - User uploads
  - Report exports
  - Static files shared across services
prerequisites:
  - A GCP project
  - Permission to create or use a bucket
  - An app or workload that needs durable object storage
related:
  - /docs/cloud-storage/access-patterns
  - /docs/cloud-storage/bucket-checklist
---

## Goal

Move file data into Cloud Storage so it survives restarts, deployments, and scaling events.

## Step 1: Create one bucket for one job

Start with a bucket purpose that is easy to explain:

- user uploads
- public assets
- generated exports

## Step 2: Decide the access pattern before code

Ask whether the files should be:

- private
- public
- served through signed access

That decision drives the rest of the design.

## Step 3: Give the workload the narrowest useful access

Avoid broad storage permissions just to make the first test pass.

Treat bucket access as part of the application design.

## Step 4: Keep product metadata outside the bucket

Cloud Storage should hold the object.

Application ownership, workflow state, and user relationships usually belong in the app or database layer.

## Step 5: Define cleanup behavior early

If files are temporary, add a lifecycle rule or cleanup process at the start instead of waiting for costs to drift.
