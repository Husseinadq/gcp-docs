---
title: Service accounts first
description: The shortest useful path to making workload identity explicit before permissions turn into guesswork.
docType: how-to
category: Get started
goal: I need to make workload access safe and understandable from the start.
summary: Give each workload a deliberate identity before attaching access to storage, secrets, or deployment paths.
difficulty: beginner
estimatedTime: 9 minutes
lastReviewed: 2026-03-11
order: 1
bestFor:
  - New GCP projects
  - Cloud Run and GKE workloads
  - Teams cleaning up vague permissions
related:
  - /docs/iam/mental-model
  - /docs/iam/access-review-checklist
  - /docs/cloud-run
---

## Goal

Make workload identity explicit before the project accumulates broad roles and hard-to-explain access paths.

## Step 1: Separate humans from workloads

Humans log in.

Workloads should run as service accounts.

## Step 2: Give each important workload its own identity

Do not let unrelated services share one vague service account if they do different jobs.

## Step 3: Grant narrow access for real needs

Attach only the roles that match what the workload actually does.

## Step 4: Keep the reason visible

The team should be able to say why the workload needs each role.

## Step 5: Review before widening

If a permission error appears, check the identity, scope, and role choice before reaching for broader access.
