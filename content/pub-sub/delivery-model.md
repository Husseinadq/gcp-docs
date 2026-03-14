---
title: Pub/Sub delivery model
description: A plain-English explanation of why event systems feel different from request-response services.
docType: explanation
category: Concepts
goal: I need Pub/Sub to make sense before I turn synchronous code into asynchronous workflows.
summary: Pub/Sub changes the architecture by separating the producer, the consumer, and the timing between them.
difficulty: intermediate
estimatedTime: 7 minutes
lastReviewed: 2026-03-11
order: 2
bestFor:
  - Teams new to event-driven design
  - Producer and consumer design reviews
related:
  - /docs/pub-sub/quickstart
  - /docs/pub-sub/subscriber-checklist
---

## The main shift

With Pub/Sub, the producer says an event happened.

It does not wait for every consumer to finish the rest of the business process.

## Smallest useful event shape

```json
{
  "eventType": "order.paid",
  "orderId": "o-1001",
  "occurredAt": "2026-03-12T10:00:00Z"
}
```

That is better than an event named after infrastructure or a vague verb like `updated`.

## Why this matters

That separation can make systems more resilient and more scalable, but only if the event meaning is clear.

## The common mistake

Teams often add messaging before they have a clean event model.

That produces a system where nobody is sure what each event means or who owns the downstream effect.

## The design question to keep asking

If this event arrives late, twice, or out of order, does the system still make sense?

## When not to use Pub/Sub

Start with direct calls instead if:

- one service immediately needs one answer from another
- the workflow is still simple and synchronous
- the team cannot explain who should own retries and duplicates
