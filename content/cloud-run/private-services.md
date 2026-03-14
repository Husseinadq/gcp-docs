---
title: Run a private service
description: Keep a Cloud Run service private, then grant invoker access only to the identities that should reach it.
docType: how-to
category: Guides
goal: I want a Cloud Run service that is not publicly reachable from the internet.
summary: Deploy the service without public access, then grant `roles/run.invoker` only to the users or workloads that need it.
difficulty: intermediate
estimatedTime: 12 minutes
lastReviewed: 2026-03-13
order: 2
bestFor:
  - Internal APIs
  - Admin services
  - Workload-to-workload traffic
prerequisites:
  - A deployed Cloud Run service or a service ready to deploy
  - Permission to change Cloud Run IAM policy
related:
  - /docs/cloud-run/deploy-from-image
  - /docs/cloud-run/common-commands
  - /docs/iam
---

## Goal

Deploy a Cloud Run service that rejects anonymous traffic and only allows named callers.

## 1. Set your variables

```bash
export PROJECT_ID="your-project-id"
export REGION="us-central1"
export SERVICE="internal-api"
export CALLER_EMAIL="alice@example.com"

gcloud config set project "$PROJECT_ID"
```

## 2. Deploy without public access

```bash
gcloud run deploy "$SERVICE" \
  --source . \
  --region "$REGION" \
  --no-allow-unauthenticated
```

That keeps anonymous internet traffic out.

## 3. Grant access to one user or service account

For a human caller:

```bash
gcloud run services add-iam-policy-binding "$SERVICE" \
  --region "$REGION" \
  --member="user:${CALLER_EMAIL}" \
  --role="roles/run.invoker"
```

For another workload:

```bash
gcloud run services add-iam-policy-binding "$SERVICE" \
  --region "$REGION" \
  --member="serviceAccount:caller@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/run.invoker"
```

## 4. Verify that anonymous traffic is blocked

```bash
SERVICE_URL="$(gcloud run services describe "$SERVICE" --region "$REGION" --format='value(status.url)')"

curl -i "$SERVICE_URL"
```

You should see an authentication or authorization failure instead of your app response.

## 5. Verify an authorized call

```bash
curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" "$SERVICE_URL"
```

## What this should teach you

- public access is a deploy-time and IAM decision
- `roles/run.invoker` is the caller permission that matters
- private services are normal services with a stricter caller list
