---
title: Vertex AI quickstart
description: The shortest useful path to adding one AI feature on GCP without turning the stack into prompt chaos.
docType: how-to
category: Get started
goal: I need to build one model-backed product feature with a clear problem statement and a measurable output.
summary: Start with one user workflow, one model task, and one evaluation loop.
difficulty: intermediate
estimatedTime: 14 minutes
lastReviewed: 2026-03-11
order: 1
bestFor:
  - AI product prototypes
  - Internal copilots
  - Retrieval and generation features
related:
  - /docs/vertex-ai/product-fit
  - /docs/vertex-ai/serving-checklist
  - /docs/cloud-storage
---

## Goal

Ship one AI-backed workflow where the input, output, and success criteria are explicit.

## Fast path

This quickstart enables Vertex AI, sends one prompt with the Google Gen AI SDK, and shows the equivalent REST request.

## 1. Set your project and model

```bash
export PROJECT_ID="your-project-id"
export LOCATION="global"
export MODEL="gemini-2.5-flash"

gcloud config set project "$PROJECT_ID"
gcloud services enable aiplatform.googleapis.com
```

## 2. Install the SDK

```bash
pip install google-genai
```

## 3. Send one prompt with Python

`prompt.py`

```python
from google import genai
from google.genai.types import HttpOptions

client = genai.Client(
    vertexai=True,
    project="YOUR_PROJECT_ID",
    location="global",
    http_options=HttpOptions(api_version="v1"),
)

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Write a one-sentence summary of why Cloud Run is useful.",
)

print(response.text)
```

Run it:

```bash
python prompt.py
```

## 4. Equivalent REST request

```bash
ACCESS_TOKEN="$(gcloud auth print-access-token)"

curl -X POST \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json; charset=utf-8" \
  "https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}:generateContent" \
  -d '{
    "contents": [
      {
        "role": "USER",
        "parts": [
          {
            "text": "Write a one-sentence summary of why Cloud Run is useful."
          }
        ]
      }
    ]
  }'
```

## What this should teach you

- the project and location are part of the model call
- you should prove one workflow with one prompt before building a larger feature
- the model response is only step one; evaluation still matters before launch
