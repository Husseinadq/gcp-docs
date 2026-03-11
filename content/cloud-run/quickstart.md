---
title: Cloud Run quickstart
description: The shortest useful path to shipping one service on Cloud Run without hiding the important decisions.
docType: how-to
category: Get started
goal: I want to deploy one web service to Cloud Run and understand the pieces that matter.
summary: Start with one HTTP service, one service account, and one clear deployment boundary.
difficulty: beginner
estimatedTime: 12 minutes
lastReviewed: 2026-03-11
order: 1
bestFor:
  - First Cloud Run deployment
  - Internal APIs
  - Small production services
prerequisites:
  - A GCP project with billing enabled
  - A containerized app that runs locally
  - Permission to deploy Cloud Run services
related:
  - /docs/cloud-run/when-cloud-run-fits
  - /docs/cloud-run/production-checklist
---

## Goal

Deploy one containerized service cleanly enough that you can explain how it runs, who it runs as, and where it logs.

## Step 1: Keep the first service narrow

Start with one HTTP app or one API.

Do not mix web traffic, workers, admin tasks, and experiments into the first deployment.

## Step 2: Choose the runtime identity before deployment

Create or pick the service account first.

That one choice controls secrets access, storage access, and the shape of later debugging.

## Step 3: Deploy from a versioned image

Treat the container image as the deployable unit.

The important thing is not the exact build command. The important thing is that the running version is explicit and repeatable.

## Step 4: Set the minimum runtime settings intentionally

Check these before calling it done:

- region
- public or private access
- request timeout
- environment variables and secrets
- attached service account

## Step 5: Verify the stop condition

A successful deployment means:

- the service responds successfully
- logs appear in the right project
- the correct identity is attached
- you know which dependencies it talks to

## What to read next

- [When Cloud Run fits](/docs/cloud-run/when-cloud-run-fits)
- [Cloud Run production checklist](/docs/cloud-run/production-checklist)
