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

## Step 1: Name the event clearly

Describe what happened in business terms, not transport terms.

## Step 2: Start with one producer and one consumer path

Do not design for every future consumer before the first event makes sense.

## Step 3: Keep the consumer responsibility narrow

One subscriber should have one clear job when it receives the event.

## Step 4: Expect retries and duplicates

Consumers should be designed so the same event arriving again does not break the system.

## Step 5: Make ownership visible

The team should know who publishes, who subscribes, and how failure is detected.
