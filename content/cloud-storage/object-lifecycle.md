---
title: Object lifecycle
description: A plain-English explanation of how lifecycle rules, storage classes, and retention decisions fit together.
docType: explanation
category: Concepts
goal: I want Cloud Storage cleanup and retention to make sense before buckets quietly accumulate cost and risk.
summary: Storage class changes where objects live, while lifecycle rules and retention decide how long they stay there.
difficulty: beginner
estimatedTime: 6 minutes
lastReviewed: 2026-03-13
order: 3
bestFor:
  - Teams storing temporary exports
  - Buckets that should clean themselves up
related:
  - /docs/cloud-storage/quickstart
  - /docs/cloud-storage/common-commands
  - /docs/cloud-storage/bucket-checklist
---

## The useful distinction

These are different decisions:

- **storage class**: where the object sits and how it is priced
- **lifecycle rule**: when the bucket should change or delete objects
- **retention**: how long objects must stay before deletion is allowed

## Good first rule

If objects are temporary, say so in code and policy early.

That is far better than discovering six months later that the bucket became a graveyard of forgotten uploads.

## Example lifecycle file

`lifecycle.json`

```json
{
  "rule": [
    {
      "action": { "type": "Delete" },
      "condition": { "age": 30 }
    }
  ]
}
```

Apply it:

```bash
gcloud storage buckets update "gs://${BUCKET_NAME}" --lifecycle-file=lifecycle.json
```

## Good mental model

Lifecycle rules are how you make cleanup part of the storage design instead of leaving it to future cleanup projects.
