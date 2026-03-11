# GCP Docs Project Plan

## Goal

Build an open-source documentation site for Google Cloud Platform that is easier to learn than the official docs for:

- beginners
- developers moving from AWS or Azure
- startup teams shipping fast
- engineers who want copy-paste working examples

The core idea is simple:

- explain cloud concepts in plain language
- organize docs by real tasks, not by product marketing
- show architecture, tradeoffs, pricing impact, and failure cases early
- make every page actionable in under 5 minutes

## Product Principles

Every page should answer these questions fast:

1. What is this?
2. When should I use it?
3. When should I not use it?
4. What does the smallest working example look like?
5. What will it cost or break if I choose it?

Writing rules:

- use plain English first, then introduce Google terminology
- explain acronyms on first use
- start with an opinionated quick answer before deep detail
- prefer examples and diagrams over long paragraphs
- include a "Common mistakes" section on major pages
- include migration notes for users coming from AWS and Azure where relevant

## Audience

Primary audience:

- junior to mid-level developers
- founders and small teams
- full-stack engineers using GCP for the first time

Secondary audience:

- DevOps engineers comparing services
- teams preparing for production or compliance

## Information Architecture

The site should not mirror the official Google Cloud navigation. It should be task-first.

Top-level sections:

1. Start Here
2. Core Concepts
3. Products
4. Architectures
5. Tutorials
6. Best Practices
7. Cost Guides
8. Troubleshooting
9. Glossary

Recommended content under each section:

### Start Here

- What is GCP?
- How GCP is organized: projects, billing, IAM, regions
- Best first services to learn
- GCP learning path for web apps
- GCP learning path for AI apps

### Core Concepts

- IAM
- networking
- storage
- compute
- observability
- security
- deployment models

### Products

Group by function, not by Google org chart:

- compute: Cloud Run, GKE, Compute Engine, App Engine
- storage: Cloud Storage, Filestore, Persistent Disk
- databases: Cloud SQL, Firestore, Spanner, Bigtable, Memorystore
- messaging: Pub/Sub, Eventarc
- data: BigQuery, Dataflow, Dataproc
- AI: Vertex AI, embeddings, model hosting
- identity and security: IAM, Secret Manager, KMS, Armor

Each product page should include:

- one-sentence summary
- best use cases
- avoid if
- mental model
- hello world
- production checklist
- pricing notes
- alternatives inside GCP
- AWS/Azure equivalents

### Architectures

This section is the main differentiator.

Example architecture guides:

- static site on Cloud Run + CDN
- SaaS app on Cloud Run + Cloud SQL + Redis
- event-driven pipeline with Pub/Sub + Cloud Run
- file upload processing pipeline
- RAG app with Vertex AI + Cloud Storage + vector store
- internal admin app with Identity-Aware Proxy

Each architecture page should include:

- diagram
- why this design
- request flow
- failure points
- scaling limits
- expected cost shape
- deployment steps

### Tutorials

Tutorials should be short, opinionated, and production-aware.

Template:

- what you will build
- prerequisites
- 10-minute quickstart
- explain what just happened
- production hardening
- next improvements

### Best Practices

- security defaults
- IAM role design
- regional strategy
- logging and monitoring
- backup and disaster recovery
- CI/CD
- secrets management

### Cost Guides

- how GCP pricing works
- low-cost startup stack
- common billing mistakes
- cost comparison between common service choices

### Troubleshooting

- Cloud Run cold start issues
- IAM permission denied
- VPC connectivity issues
- Cloud SQL connection failures
- quota errors

### Glossary

- plain-language definitions for common GCP terms

## Content Model

Use markdown-driven content with frontmatter.

Recommended frontmatter fields:

```yaml
title:
description:
category:
product:
tags:
difficulty:
lastReviewed:
estimatedTime:
prerequisites:
related:
awsEquivalent:
azureEquivalent:
icon:
summary:
```

Page blocks to standardize:

- TL;DR
- When to use
- Avoid if
- How it works
- Quickstart
- Production checklist
- Common mistakes
- Related guides

## Technical Stack

Base stack:

- Nuxt 4
- Tailwind CSS
- Nuxt Content
- TypeScript

Recommended Nuxt modules:

- `@nuxt/content` for markdown docs and collections
- `@nuxtjs/tailwindcss` for styling
- `@nuxt/icon` for a clean icon system
- `@vueuse/nuxt` for small utility hooks if needed

Optional later:

- `@nuxtjs/seo` or equivalent SEO tooling
- analytics
- search provider integration

## Frontend Direction

Tailwind CSS should be the main frontend styling layer.

Design goals:

- clean and technical, but not corporate
- stronger hierarchy than default docs sites
- high readability on long pages
- quick scanning on mobile
- obvious callouts for warnings, costs, and prerequisites

Tailwind usage rules:

- define design tokens in Tailwind theme first
- use semantic utility groups for docs UI patterns
- avoid ad hoc spacing and color usage
- build reusable components for callouts, code blocks, page headers, and step lists

Recommended design tokens:

- neutral text palette with strong contrast
- one primary brand color for actions
- one accent color for diagrams and highlights
- dedicated warning, success, and cost colors

Core UI components:

- docs header
- left navigation
- right table of contents
- search modal
- breadcrumb
- page hero
- callout boxes
- step-by-step tutorial block
- architecture diagram card
- comparison table
- command/code snippet block
- "Common mistakes" panel

## Suggested App Structure

```text
app/
  app.vue
  layouts/
    default.vue
  pages/
    index.vue
    docs/[...slug].vue
  components/
    docs/
    ui/
  assets/
    css/tailwind.css
content/
  start-here/
  core-concepts/
  products/
  architectures/
  tutorials/
  best-practices/
  cost-guides/
  troubleshooting/
  glossary/
server/
  api/
```

## MVP Scope

Do not try to document all of GCP first. Start with the highest-value path.

MVP content:

- Start Here overview
- IAM basics
- Cloud Run
- Cloud Storage
- Cloud SQL
- Pub/Sub
- Vertex AI basics
- 3 architecture guides
- 5 tutorials
- glossary for top 50 terms

MVP product features:

- markdown docs rendering
- search
- sidebar navigation
- table of contents
- code copy button
- mobile docs layout
- dark/light theme only if it does not slow delivery

## Phase Plan

### Phase 1: Foundation

- install Tailwind CSS
- install Nuxt Content
- create docs layout
- create markdown collections
- define page template and reusable components
- replace starter page with real homepage

### Phase 2: Core Docs

- write Start Here section
- write first product guides
- add architecture pages
- add glossary and cross-linking

### Phase 3: Usability

- add search
- add better code blocks and copy actions
- add comparison tables
- improve internal linking and related content

### Phase 4: Open Source Workflow

- add contribution guide
- define page review checklist
- add issue templates
- add content ownership and review labels

### Phase 5: Scale

- add versioning strategy if needed
- add generated diagrams
- add benchmarks and cost calculators
- add multilingual support if demand exists

## Open Source Contribution Model

To keep quality high, contributors need clear rules.

Add these files early:

- `CONTRIBUTING.md`
- `docs/STYLE_GUIDE.md`
- `.github/ISSUE_TEMPLATE/`
- `.github/PULL_REQUEST_TEMPLATE.md`

Contribution rules:

- every new page must include TL;DR and Common mistakes
- claims about pricing or limits must include a source link
- tutorials must be tested end to end before merge
- pages need `lastReviewed` metadata

## Success Metrics

Measure whether the docs are actually easier than the official docs.

Key metrics:

- time to first successful deployment
- bounce rate on tutorial pages
- search exit rate
- average depth per session
- percentage of pages with runnable examples
- contributor turnaround time

## First Execution Checklist

The next implementation steps should be:

1. Add Tailwind CSS to the Nuxt app.
2. Add Nuxt Content and set up the `content/` directory.
3. Build the docs layout with sidebar, top nav, and table of contents.
4. Replace the default landing page with a real homepage.
5. Write the first 5 core pages:
   - What is GCP?
   - GCP for web apps
   - IAM basics
   - Cloud Run guide
   - Cloud Storage guide

## Recommendation

The biggest mistake would be trying to be "complete" before being useful.

This project should win by being:

- clearer
- more opinionated
- more task-focused
- more example-driven

That is how it becomes better than the official docs for most real users.
