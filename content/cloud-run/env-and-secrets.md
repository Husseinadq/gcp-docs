---
title: Set environment variables and secrets
description: Configure plain environment variables and Secret Manager values for a Cloud Run service without baking them into the image.
docType: how-to
category: Guides
goal: I want to configure runtime settings and secrets for Cloud Run the right way.
summary: Use env vars for non-sensitive config and `--update-secrets` for Secret Manager values.
difficulty: intermediate
estimatedTime: 12 minutes
lastReviewed: 2026-03-14
order: 3
bestFor:
  - Database URLs and app config
  - API keys and passwords
  - Services moving from local `.env` files
prerequisites:
  - A deployed Cloud Run service
  - Permission to update the service
  - A Secret Manager secret if you need secret values
related:
  - /docs/cloud-run/common-commands
  - /docs/cloud-run/troubleshooting
  - /docs/iam
---

## Goal

Configure runtime values for a Cloud Run service without rebuilding the image for every config change.

## 1. Set one regular environment variable

Use a normal environment variable for values that are not secrets.

```bash
export SERVICE="docs-api"
export REGION="us-central1"

gcloud run services update "$SERVICE" \
  --region "$REGION" \
  --update-env-vars APP_ENV=production,LOG_LEVEL=info
```

This creates a new revision with the updated runtime config.

## 2. Create a secret

If the value is sensitive, put it in Secret Manager instead of using a plain env var.

```bash
printf 'super-secret-password' | gcloud secrets create db-password \
  --data-file=-
```

If the secret already exists, add a new version instead:

```bash
printf 'super-secret-password' | gcloud secrets versions add db-password \
  --data-file=-
```

## 3. Allow the runtime identity to read the secret

```bash
export PROJECT_ID="your-project-id"
export SERVICE_ACCOUNT_EMAIL="docs-api-runner@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud secrets add-iam-policy-binding db-password \
  --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}" \
  --role="roles/secretmanager.secretAccessor"
```

## 4. Expose the secret as an environment variable

```bash
gcloud run deploy "$SERVICE" \
  --image "IMAGE_URI" \
  --region "$REGION" \
  --update-secrets DB_PASSWORD=db-password:latest
```

This keeps the secret value out of the image and out of your source tree.

## 5. Read the values in app code

```js
console.log(process.env.APP_ENV)
console.log(process.env.DB_PASSWORD ? 'db password loaded' : 'missing secret')
```

## What to remember

- use env vars for normal config
- use Secret Manager for sensitive values
- every config change creates a new Cloud Run revision
