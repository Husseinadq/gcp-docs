---
title: Pub/Sub quickstart
description: The shortest useful path to publishing one event and consuming it without turning the system into event fog.
docType: how-to
category: Get started
goal: I need to introduce one clean asynchronous event flow on GCP.
summary: Start with one event, one topic, one subscription, and one consumer responsibility.
difficulty: intermediate
estimatedTime: 12 minutes
lastReviewed: 2026-03-11
order: 1
bestFor:
  - Background processing
  - Event fan-out
  - First async architecture step
related:
  - /docs/pub-sub/delivery-model
  - /docs/pub-sub/subscriber-checklist
  - /docs/cloud-run
---

## Goal

Move one important workflow from direct coupling to explicit event delivery.

## Fast path

This quickstart creates one topic, one subscription, publishes one event, and shows the smallest useful Node.js consumer.

## 1. Set your project and resource names

```bash
export PROJECT_ID="your-project-id"
export TOPIC="orders"
export SUBSCRIPTION="orders-worker"

gcloud config set project "$PROJECT_ID"
gcloud services enable pubsub.googleapis.com
```

## 2. Create the topic and subscription

```bash
gcloud pubsub topics create "$TOPIC"
gcloud pubsub subscriptions create "$SUBSCRIPTION" \
  --topic="$TOPIC"
```

## 3. Publish one event

```bash
gcloud pubsub topics publish "$TOPIC" \
  --message='{"orderId":"o-1001","status":"paid"}'
```

## 4. Pull the event from the subscription

```bash
gcloud pubsub subscriptions pull "$SUBSCRIPTION" \
  --auto-ack \
  --limit=1
```

If that works, your event path is real.

## 5. Minimal consumer code

```bash
npm install @google-cloud/pubsub
```

`subscriber.js`

```js
import { PubSub } from '@google-cloud/pubsub'

const pubsub = new PubSub()
const subscription = pubsub.subscription(process.env.SUBSCRIPTION_NAME)

subscription.on('message', (message) => {
  console.log('message id:', message.id)
  console.log('payload:', message.data.toString())
  message.ack()
})
```

Run it:

```bash
export SUBSCRIPTION_NAME="$SUBSCRIPTION"
node subscriber.js
```

## What this should teach you

- the topic is the producer boundary
- the subscription is the consumer boundary
- the app should be able to handle the same event more than once
