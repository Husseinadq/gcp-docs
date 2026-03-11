---
title: Vertex AI product fit
description: A plain-English guide to when Vertex AI belongs in the architecture and when AI is still too vague.
docType: explanation
category: Concepts
goal: I need to decide whether the product requirement is real enough to justify an AI platform decision.
summary: Vertex AI fits when AI is part of a defined product workflow rather than a vague feature wish.
difficulty: intermediate
estimatedTime: 7 minutes
lastReviewed: 2026-03-11
order: 2
bestFor:
  - AI product planning
  - Teams comparing direct model APIs to platform integration
related:
  - /docs/vertex-ai/quickstart
  - /docs/vertex-ai/serving-checklist
---

## Vertex AI is a good fit when

- the product has a clear model-backed workflow
- prompts, retrieval, or model serving need to live inside the wider GCP system
- the team wants managed integration instead of stitching pieces together manually

## Vertex AI is the wrong fit when

- the user problem is still vague
- the team is adding AI because it sounds strategic
- there is no evaluation model for output quality

## The useful question

What exact user step becomes better because a model is involved?

If that answer is weak, the architecture is not ready yet.
