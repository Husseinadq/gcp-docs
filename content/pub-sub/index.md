---
title: Pub/Sub
description: The service hub for asynchronous messaging and event-driven systems on GCP.
docType: service-hub
goal: I need to know whether this system should become event-driven instead of using direct request chains.
summary: Messaging backbone for decoupled systems, asynchronous processing, and event fan-out.
difficulty: intermediate
estimatedTime: 6 minutes
lastReviewed: 2026-03-11
order: 6
bestFor:
  - Event-driven systems
  - Background processing
  - Decoupled services
related:
  - /docs/pub-sub/quickstart
  - /docs/pub-sub/delivery-model
  - /docs/pub-sub/subscriber-checklist
---

## TL;DR

Pub/Sub is the default messaging layer when services should communicate asynchronously instead of calling each other directly.

## Use it when

- events should outlive the request that created them
- multiple consumers need the same event
- the system should stay decoupled under load

## Avoid it when

- the workflow is still simple and synchronous
- messaging is being added as complexity theater instead of solving a real system boundary
- the team has not yet defined what the event actually means

## Fastest starting path

Start by defining the event clearly:

- what happened
- who emits it
- who consumes it

If those answers are vague, the system is not ready for messaging yet.

## Common jobs

- background processing
- fan-out events
- decoupled service communication
- workflow triggers

## Compare it to

### Direct service calls

Use direct calls when the workflow should stay simple and immediate. Use Pub/Sub when producer and consumer should be separated cleanly.

### Cloud Tasks

Cloud Tasks is more job-oriented and controlled. Pub/Sub is broader event messaging.

## Read next

- [Cloud Run](/docs/cloud-run)
- [Vertex AI](/docs/vertex-ai)
