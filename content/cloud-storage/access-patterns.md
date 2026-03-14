---
title: Cloud Storage access patterns
description: A simple explanation of the three access models that matter most for buckets and objects.
docType: explanation
category: Concepts
goal: I need the storage access model to make sense before I wire uploads into the app.
summary: Most storage decisions come down to private access, public access, or signed access.
difficulty: beginner
estimatedTime: 6 minutes
lastReviewed: 2026-03-11
order: 2
bestFor:
  - Teams designing uploads
  - Static asset decisions
related:
  - /docs/cloud-storage/quickstart
  - /docs/cloud-storage/uploads-from-node-service
  - /docs/cloud-storage/signed-urls
  - /docs/iam
---

## The three useful patterns

### Private objects

Use this when the app or an authorized backend should control access.

This is the safest default for user data.

### Public objects

Use this for assets that are meant to be public.

Make the rule explicit. Do not let "temporary testing" turn into accidental public storage.

### Signed access

Use this when the files stay private but clients still need controlled direct access.

This is often the cleanest model for downloads and browser uploads.

## The common mistake

Teams often mix application metadata and object storage decisions together.

Keep them separate:

- Cloud Storage holds the object
- the app decides who owns it and when it should be accessible

## The design question that matters most

Who should be able to read or write the object, and how do you want to prove that access later?
