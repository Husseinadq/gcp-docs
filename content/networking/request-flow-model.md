---
title: Request flow model
description: A plain-English way to think about ingress, egress, and service boundaries without drowning in networking jargon.
docType: explanation
category: Concepts
goal: Networking terms feel disconnected from the app and I need a simpler mental model.
summary: Most early networking design becomes clearer when you follow one request from entry to exit.
difficulty: beginner
estimatedTime: 7 minutes
lastReviewed: 2026-03-11
order: 2
bestFor:
  - Beginners learning ingress and egress
  - Service-boundary design reviews
related:
  - /docs/networking/quickstart
  - /docs/networking/boundary-checklist
  - /docs/iam
---

## The simple model

Networking gets easier when you stop thinking in isolated terms and start thinking in request flow.

For one request, ask:

- where does it enter
- which service receives it first
- which internal services does it call
- which external systems does it need
- where does the response or side effect finish

## Ingress

Ingress is how traffic gets into the system.

The practical question is not "what is ingress?"

It is "which service should be reachable from outside, and under what conditions?"

## Egress

Egress is how traffic leaves the system.

The useful question is "what external destinations does this workload need to reach?"

## Service boundaries

A service boundary defines what a service owns and how other parts of the system are allowed to interact with it.

Weak boundaries are why networking and IAM often feel tangled together.

## Why this model helps

It ties platform settings back to application behavior.

That is the difference between intentional networking and configuration archaeology.
