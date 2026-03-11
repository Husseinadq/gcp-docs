---
title: Vertex AI serving checklist
description: A fast reference for prompt ownership, data flow, evaluation, and guardrails before AI features scale.
docType: reference
category: Reference
goal: I know I want Vertex AI and I need a short list of the decisions that make the feature operational.
summary: Review workflow ownership, data handling, evaluation, and failure review before launch.
difficulty: intermediate
estimatedTime: 6 minutes
lastReviewed: 2026-03-11
order: 3
bestFor:
  - AI launch reviews
  - Prompt and workflow audits
related:
  - /docs/vertex-ai/quickstart
  - /docs/vertex-ai/product-fit
---

## Workflow checklist

- the product step improved by AI is explicit
- inputs and outputs are documented
- ownership for prompts or model configuration is clear

## Data checklist

- source data is understood
- sensitive data handling is intentional
- storage of outputs and evaluations is defined

## Quality checklist

- evaluation exists before scale
- failure review path is known
- the team can explain what "good enough" means
