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

## Common commands

```bash
# create the topic and subscription
gcloud pubsub topics create TOPIC_NAME
gcloud pubsub subscriptions create SUBSCRIPTION_NAME --topic=TOPIC_NAME

# publish one test event
gcloud pubsub topics publish TOPIC_NAME --message='{"eventType":"order.paid","orderId":"o-1001"}'

# pull one message and ack it
gcloud pubsub subscriptions pull SUBSCRIPTION_NAME --auto-ack --limit=1
```

## Subscriber checklist

- each subscriber has one clear responsibility
- duplicates do not create broken state
- downstream side effects are understood

## Minimal consumer shape

```js
subscription.on('message', async (message) => {
  const event = JSON.parse(message.data.toString())

  await handleEvent(event)
  message.ack()
})
```

The important part is not the callback syntax.

It is that `handleEvent(event)` must be safe to retry.

## Failure checklist

- retry behavior is known
- teams know where failed processing is visible
- the system is still explainable without tribal knowledge

## Stop condition

The subscriber is production-ready only when:

- duplicates are safe
- failures are visible
- the team can explain exactly what happens after `ack`
