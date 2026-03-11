# GCP Docs Project Plan

## Goal

Build open-source Google Cloud documentation that is easier to understand than the official docs by fixing the two main failure modes of cloud docs:

- too many product pages before the reader has a mental model
- too many page types mixed together in one navigation system

This project should feel clearer because it routes the reader to the right kind of page first.

## Core Product Bet

The best documentation systems on the internet do not win by looking pretty. They win by separating different documentation jobs.

This project should follow a four-part system:

1. Tutorial
2. How-to
3. Explanation
4. Reference

That means:

- tutorials teach by building
- how-to guides solve one task
- explanation pages make the platform make sense
- reference pages answer fast

## Product Principles

Every important page should answer one clear job.

Rules:

- never mix tutorial and reference goals on the same page
- start from user intent, not product taxonomy
- prefer one good path over ten equal options
- explain tradeoffs early
- keep examples small and realistic
- make "what to read next" obvious

## Audience

Primary audience:

- developers new to GCP
- startup teams shipping fast
- full-stack engineers moving from simpler hosting platforms
- developers moving from AWS or Azure who want the GCP mental model quickly

Secondary audience:

- DevOps engineers comparing GCP service choices
- teams preparing for production hardening

## Information Architecture

The site should not be organized like Google Cloud's internal product map.

It should be organized like a good documentation system:

### 1. Learn by Building

Use for guided tutorials.

Examples:

- ship your first web app on GCP
- first event-driven service on GCP
- first internal admin tool on GCP

### 2. Solve a Specific Task

Use for short execution guides.

Examples:

- deploy to Cloud Run
- store uploads in Cloud Storage
- connect a service to Secret Manager
- expose a service privately

### 3. Understand the Platform

Use for mental models and tradeoffs.

Examples:

- how GCP is organized
- IAM in plain English
- when Cloud Run is enough and when it is not
- regions, projects, and identities

### 4. Look Up Facts Fast

Use for concise service reference.

Examples:

- Cloud Run
- Cloud Storage
- Cloud SQL
- Pub/Sub

## Why This Model Wins

It borrows the strongest traits from the best docs systems:

- Stripe-style task clarity
- React-style teaching flow
- MDN-style learning paths
- Tailwind-style fast reference
- Rust-style separation between different kinds of docs

The goal is not to copy any one site visually. The goal is to copy the structural discipline.

## Page Design Rules

### Tutorial pages

Must include:

- outcome
- assumptions
- ordered steps
- checkpoints
- what this page deliberately skips
- next steps

### How-to pages

Must include:

- goal
- assumptions
- exact sequence
- stop condition
- common failure points

### Explanation pages

Must include:

- plain-language mental model
- relationship between concepts
- common misunderstandings
- tradeoffs

### Reference pages

Must include:

- one-sentence summary
- good fit
- avoid when
- common gotchas
- links to the right tutorial or how-to

## Content Model

Use markdown with frontmatter.

Recommended fields:

```yaml
title:
description:
docType:
goal:
summary:
difficulty:
estimatedTime:
lastReviewed:
bestFor:
prerequisites:
related:
product:
awsEquivalent:
azureEquivalent:
order:
```

## Frontend Direction

The frontend should guide choice before it shows detail.

That means the UI should:

- ask what kind of help the reader needs
- make tutorials, how-to guides, explanation, and reference visually distinct
- show "use this page when" near the top
- show prerequisites clearly
- show next actions clearly

Tailwind CSS should be used as the styling system, but the visual design should serve the information architecture rather than the other way around.

## Current App Direction

The Nuxt app should provide:

- a homepage that starts from user intent
- a docs index that explains the four page types
- navigation grouped by documentation job
- page metadata surfaced in the page chrome
- markdown-driven content with strong internal linking

## MVP Scope

Do not aim for full GCP coverage.

Start with the clearest first path:

- one tutorial for shipping a web app
- two explanation pages for platform structure and IAM
- two how-to guides for deployment and storage
- two reference pages for core services

If these pages are excellent, the project has a foundation worth expanding.

## Next Phases

### Phase 1

- finish the four-part documentation structure
- polish navigation and page chrome
- expand the first web app learning path

### Phase 2

- add search
- add Cloud SQL and Secret Manager pages in all four modes where needed
- add architecture diagrams

### Phase 3

- add contribution rules for doc type quality
- add issue templates for missing tutorial, how-to, explanation, and reference pages
- add editorial review workflow

## Success Metric

The project is successful if a new GCP user can answer these questions faster than they can with the official docs:

- what should I use?
- why should I use it?
- how do these services fit together?
- what do I do next?

If the docs reduce mystery, the project is on the right track.
