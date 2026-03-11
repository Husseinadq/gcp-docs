---
title: Vertex AI
description: The service hub for models, prompts, serving, pipelines, and AI features on Google Cloud.
docType: service-hub
goal: I need to know where Vertex AI fits in a product and when to bring it in instead of bolting AI onto the stack blindly.
summary: Managed AI platform for model access, serving, prompting, and ML workflows on GCP.
difficulty: intermediate
estimatedTime: 7 minutes
lastReviewed: 2026-03-11
order: 7
bestFor:
  - AI features in products
  - Model serving
  - Structured prompt workflows
related:
  - /docs/vertex-ai/quickstart
  - /docs/vertex-ai/product-fit
  - /docs/vertex-ai/serving-checklist
---

## TL;DR

Vertex AI is the place to start when the product needs AI capabilities and the team wants them inside the GCP ecosystem instead of stitched together from unrelated pieces.

## Use it when

- the product needs model inference or AI workflows
- the team wants managed model-serving and platform integration
- prompts, embeddings, or model pipelines are becoming product features

## Avoid it when

- the AI need is still vague
- the team does not yet know the product workflow that AI should improve
- the platform is overcomplicating a feature that should be solved more simply

## Fastest starting path

Define the product problem before the model choice:

- what user experience needs AI
- what input and output shape matters
- where the data lives

If those are not clear, model comparisons are too early.

## Common jobs

- add chat or generation features
- build retrieval workflows
- serve model-backed product actions
- orchestrate managed ML workflows

## Compare it to

### A direct external model API

Use a direct API when the need is small and isolated. Use Vertex AI when the AI workflow belongs inside the wider GCP platform and needs stronger integration.

### BigQuery and Cloud Storage

Those store and organize data. Vertex AI turns that data into model-driven product behavior.

## Read next

- [Cloud Storage](/docs/cloud-storage)
- [Pub/Sub](/docs/pub-sub)
