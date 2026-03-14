---
title: Revision model
description: A plain-English explanation of what a Cloud Run revision is and why it matters for rollout, rollback, and debugging.
docType: explanation
category: Concepts
goal: I want Cloud Run deployments to make sense before I start changing traffic, env vars, and service settings.
summary: Each deploy creates an immutable revision, and the service decides which revisions get traffic.
difficulty: beginner
estimatedTime: 6 minutes
lastReviewed: 2026-03-13
order: 3
bestFor:
  - Teams learning Cloud Run rollouts
  - Readers confused by revisions and traffic splits
related:
  - /docs/cloud-run/quickstart
  - /docs/cloud-run/common-commands
  - /docs/cloud-run/production-checklist
---

## The simplest model

Cloud Run has two layers:

- the **service**, which is the stable address
- the **revision**, which is one immutable deploy result

Every time you deploy, you make a new revision.

## Why that matters

If a deploy changes:

- the image
- environment variables
- service settings

Cloud Run creates a new revision instead of mutating the old one in place.

That is why rollback is possible and why debugging a bad deploy is much easier than on a hand-managed server.

## A useful command pair

```bash
gcloud run revisions list --service=SERVICE --region=REGION
gcloud run services describe SERVICE --region=REGION
```

Use the first command to see revisions.

Use the second command to see which one is currently serving traffic.

## Good mental model

Think of the service as the front door and the revision as the exact build currently standing behind that door.

If you remember that, Cloud Run rollouts stop feeling mysterious.
