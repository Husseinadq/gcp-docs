---
title: Store User Uploads in Cloud Storage
description: A direct guide for moving file uploads out of the app container and into durable object storage.
docType: how-to
goal: I need a clean way to store user files instead of writing them to local runtime storage.
difficulty: beginner
estimatedTime: 10 minutes
lastReviewed: 2026-03-11
order: 2
bestFor:
  - Web apps with uploads
  - Teams moving from local disk assumptions
  - Services generating exports or reports
prerequisites:
  - A GCP project
  - A Cloud Storage bucket or permission to create one
  - An application that needs durable file storage
related:
  - /docs/reference/cloud-storage
  - /docs/reference/cloud-run
---

## Goal

Store user files in Cloud Storage instead of relying on the app container filesystem.

## Assumptions

This guide assumes:

- files need to survive restarts and new instances
- your application can talk to GCP services through an explicit identity

## Step 1: Create one bucket with a clear purpose

Name the bucket around the job it serves.

Good examples:

- user uploads
- generated exports
- public assets

Do not start with a bucket that is meant to do everything.

## Step 2: Decide whether the files are private or public

This decision shapes the rest of the access design.

- private files usually need signed access patterns or controlled server access
- public files need a much tighter review of what should ever become public

## Step 3: Give the workload the right bucket access

The application identity should have the narrowest access that lets it do the job.

This is where many teams accidentally create future security problems by giving broad storage permissions too early.

## Step 4: Store metadata separately if needed

Cloud Storage holds the objects well.

If your product needs extra application metadata such as ownership, workflow state, or user associations, keep that in the database or application layer.

## Step 5: Define cleanup behavior

If uploads are temporary, add a retention or cleanup policy early.

That avoids a slow cost leak and keeps old artifacts from becoming product archaeology.

## Common failure points

### Files are written to local disk first and then disappear

That is a design issue, not a bug in the cloud provider.

### Access works in one environment and fails in another

That often means the wrong service account or bucket policy is attached in one project.

## What to keep open while doing this

- [Cloud Storage](/docs/reference/cloud-storage)
- [IAM in Plain English](/docs/explain/iam-in-plain-english)
