---
title: What Is GCP?
description: A plain-language introduction to Google Cloud Platform, what it contains, and how to think about it as a developer.
category: Start Here
difficulty: beginner
estimatedTime: 6 minutes
lastReviewed: 2026-03-11
tags:
  - overview
  - projects
  - billing
  - regions
---

## TL;DR

Google Cloud Platform is a collection of hosted services for running applications, storing data, processing events, and using Google's infrastructure without managing everything yourself.

The most important idea to learn early is this:

GCP is not "one big thing." It is a set of services that you assemble inside a **project**, under a **billing account**, with access controlled by **IAM**.

## The basic mental model

Think about GCP in five layers:

1. Your organization
2. Billing account
3. Projects
4. Services inside each project
5. Permissions on top of everything

If you understand those five layers, the platform becomes much easier to navigate.

## What a project really is

A project is the main container for your cloud resources.

You usually place these things inside a project:

- Cloud Run services
- storage buckets
- databases
- service accounts
- logs and metrics

A useful beginner rule is:

use one project per environment when you want strong isolation.

That often means:

- `myapp-dev`
- `myapp-staging`
- `myapp-prod`

## What billing does

Billing decides who pays for the resources in your project.

A project without billing attached can exist, but many services will not run properly. This is one reason new users think GCP is broken when the real problem is account setup.

## Regions and zones

Regions are broad geographic areas like `us-central1`.

Zones are subdivisions inside a region, such as `us-central1-a`.

For many modern managed services, the first decision you care about is the **region**, not the zone.

## The services most teams learn first

If you are building a normal web product, these are strong first services:

| Need | Good first pick |
| --- | --- |
| Run a containerized app | Cloud Run |
| Store files | Cloud Storage |
| Run Postgres or MySQL | Cloud SQL |
| Publish events | Pub/Sub |
| Store secrets | Secret Manager |

## When GCP is a good fit

GCP is often a good fit when:

- you want managed infrastructure more than low-level control
- you want strong data and AI tooling later
- your team prefers smaller ops overhead
- Cloud Run matches your deployment style

## Avoid this beginner mistake

Do not compare all GCP services at once.

Instead, start with the smallest stack that can ship your app. Complexity grows very fast if you begin with too many products before understanding the core platform model.

## What to read next

- [GCP for web apps](/docs/start-here/gcp-for-web-apps)
- [IAM basics](/docs/core-concepts/iam-basics)
- [Cloud Run](/docs/products/cloud-run)
