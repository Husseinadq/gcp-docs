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

## Common call shapes

```python
from google import genai

client = genai.Client(vertexai=True, project="PROJECT_ID", location="global")
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Summarize this support ticket in one sentence."
)
print(response.text)
```

```bash
ACCESS_TOKEN="$(gcloud auth print-access-token)"
curl -X POST \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json; charset=utf-8" \
  "https://global-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/gemini-2.5-flash:generateContent" \
  -d '{"contents":[{"role":"USER","parts":[{"text":"Summarize this support ticket in one sentence."}]}]}'
```

## Data checklist

- source data is understood
- sensitive data handling is intentional
- storage of outputs and evaluations is defined

## Minimum production decisions

| Decision | Why it matters |
| --- | --- |
| Prompt ownership | Someone must own changes to prompts and instructions |
| Evaluation set | You need repeatable checks before changing the workflow |
| Sensitive data policy | Prevents accidental data leakage into prompts or logs |
| Fallback path | Keeps the feature usable when the model call fails |
| Output storage | Makes review and debugging possible |

## Quality checklist

- evaluation exists before scale
- failure review path is known
- the team can explain what "good enough" means

## Stop condition

The feature is ready for launch only when:

- the team can rerun a known evaluation set
- prompt changes have an owner
- fallback behavior is defined
