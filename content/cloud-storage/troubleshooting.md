---
title: Troubleshooting
description: Fix the Cloud Storage problems that show up most often when buckets, uploads, and signed URLs are not behaving as expected.
docType: reference
category: Operate
goal: My Cloud Storage setup is failing and I need the fastest path to the likely cause.
summary: Check bucket name, object path, IAM, lifecycle rules, and signed URL signing identity before changing random settings.
difficulty: intermediate
estimatedTime: 8 minutes
lastReviewed: 2026-03-14
order: 5
bestFor:
  - Failed uploads
  - Access denied errors
  - Signed URL issues
related:
  - /docs/cloud-storage/common-commands
  - /docs/cloud-storage/download-urls
  - /docs/cloud-storage/bucket-checklist
---

## First commands to run

```bash
gcloud storage buckets describe "gs://${BUCKET_NAME}"
gcloud storage ls "gs://${BUCKET_NAME}/"
gcloud storage ls "gs://${BUCKET_NAME}/${OBJECT_PREFIX}"
```

That tells you whether the bucket exists, whether the object path is real, and whether you are even checking the right resource.

## If uploads fail with access denied

Check:

- which service account the workload runs as
- whether that identity has `roles/storage.objectUser` on the bucket
- whether you granted access on the right bucket in the right project

## If the signed URL does not work

Check:

- whether the signing service account can sign URLs
- whether the signed URL was created for the correct object path
- whether the URL expired already

For `gcloud storage sign-url`, the service account used for signing must be explicit and valid.

## If the object exists but the app cannot find it

This is usually an object-path problem, not a bucket problem.

Print the exact path your app wrote and compare it to the path your app later reads.

## If objects disappear unexpectedly

Check the bucket lifecycle configuration.

```bash
gcloud storage buckets describe "gs://${BUCKET_NAME}"
```

Look for lifecycle rules or retention settings that delete or protect objects.

## Good debugging order

1. Confirm the bucket name and object path.
2. Confirm the workload identity.
3. Confirm the bucket IAM binding.
4. Confirm lifecycle or retention behavior.
5. Only then debug the application code.
