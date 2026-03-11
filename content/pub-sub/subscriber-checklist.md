---
title: Pub/Sub subscriber checklist
description: A fast reference for event ownership, idempotency, and failure-handling decisions.
docType: reference
category: Reference
goal: I know I need Pub/Sub and I want a short review list before consumers multiply.
summary: Review event meaning, subscriber ownership, retries, and failure visibility.
difficulty: intermediate
estimatedTime: 5 minutes
lastReviewed: 2026-03-11
order: 3
bestFor:
  - Subscriber reviews
  - Event-system hardening
related:
  - /docs/pub-sub/quickstart
  - /docs/pub-sub/delivery-model
---

## Event checklist

- event name matches a real business action
- payload meaning is documented
- producer ownership is explicit

## Subscriber checklist

- each subscriber has one clear responsibility
- duplicates do not create broken state
- downstream side effects are understood

## Failure checklist

- retry behavior is known
- teams know where failed processing is visible
- the system is still explainable without tribal knowledge
