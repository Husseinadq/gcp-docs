# Stripe-Inspired GCP Docs Plan

## Objective

Build an open-source GCP docs experience that feels as clear and fast as Stripe docs, while still fitting the scale and complexity of Google Cloud.

The goal is not to clone Stripe visually.

The goal is to copy the parts that make Stripe feel excellent:

- strong information hierarchy
- obvious product switching
- task-first writing
- excellent search and discoverability
- consistent page anatomy
- low ambiguity

## Research Summary

### What Stripe gets right

Stripe is the benchmark because it makes product navigation and task execution feel obvious.

Patterns worth copying:

- a strong global top bar
- direct product switching
- clear split between getting started, guides, and API/reference material
- pages that answer "what do I do next?" without making the reader hunt
- excellent code and integration ergonomics

### Other UI/UX patterns worth borrowing

- GitHub Docs: strong journeys and clear onboarding surfaces
- Cloudflare Docs: good product directory and deep product navigation
- Vercel Docs: fast-start quickstarts and framework-specific branching
- MDN Learn: clear learning paths
- Nielsen Norman ideas: information scent, progressive disclosure, and scannable content

## Key Product Decision

The user asked for a top bar based on GCP services, and that is directionally correct.

But copying Stripe literally would fail if we put every GCP service directly in the top bar.

Why:

- Stripe has a smaller product surface than GCP
- GCP has too many services for a flat service nav
- a literal all-services top bar would become noise instead of navigation

So the right adaptation is:

- top bar shows the most important services and categories
- an "All services" mega menu shows the full product map
- the homepage still starts from user goals

This keeps the Stripe feeling without creating a broken GCP navigation system.

## Ultimate Navigation Model

### Global top bar

Desktop top bar should contain:

- Docs home
- Cloud Run
- GKE
- Cloud Storage
- Cloud SQL
- BigQuery
- Pub/Sub
- Vertex AI
- IAM
- Networking
- All services
- Search

Rules:

- keep the visible service list to 8-10 high-traffic items
- rotate only when usage data justifies it
- never let the top bar become a long alphabet soup

### All services mega menu

The "All services" item opens a Stripe-style mega menu grouped by category:

- Compute
- Storage
- Databases
- Messaging
- Data and Analytics
- AI and ML
- Security and Identity
- Networking
- DevOps and Operations

Each item in the mega menu should include:

- service name
- one-line description
- best use case

### Service-level navigation

Once the user enters a service, the docs should switch to a local nav model:

- Overview
- Quickstart
- How-to guides
- Concepts
- Reference
- Examples
- Troubleshooting
- Related services

This is the most important structural move.

The global nav helps users choose the service.

The local nav helps users succeed inside the service.

## Homepage Strategy

The homepage should not look like a generic docs landing page.

It should answer one question:

"What are you trying to do on GCP?"

Homepage sections:

1. Hero with search-first experience
2. Popular service bar
3. Choose-your-goal cards
4. Fast paths
5. Featured service hubs
6. Migration paths from AWS and Azure

Goal cards should include:

- Deploy a web app
- Store files
- Add a database
- Build an event-driven system
- Secure access
- Build with AI

## Service Hub Template

Every major service should have a hub page that feels like a Stripe product page plus docs index.

Each service hub must include:

- one-sentence summary
- when to use it
- when not to use it
- smallest working architecture
- common tasks
- quickstart CTA
- comparison with adjacent GCP services
- related services

Example for Cloud Run:

- what it is
- when it beats GKE
- when it loses to GKE
- first deployment path
- common tasks
- reference links

## Page Types

The site should still keep the four documentation modes under the surface:

- tutorial
- how-to
- explanation
- reference

But the service pages should expose them in a Stripe-like structure that feels simpler to the user.

That means the reader should mostly feel:

- I am inside Cloud Run docs
- now I can choose quickstart, guides, concepts, or reference

That is easier than forcing users to understand the docs framework first.

## Best UI/UX Rules To Copy

### 1. Strong information scent

Users should understand where a link goes before clicking it.

That means:

- label links by outcome, not by vague nouns
- use one-line descriptions under service names
- distinguish quickstarts from reference clearly

### 2. Progressive disclosure

Do not put every detail on the first screen.

Show:

- the fastest answer first
- advanced detail lower on the page
- optional depth in expandable or secondary sections

### 3. Search as a first-class control

Search should be prominent in the header, not hidden.

Requirements:

- command-palette style search
- service names plus synonyms
- AWS and Azure term mapping
- recent pages
- task-based matches

### 4. Consistent page anatomy

Every page of the same type should look the same.

For example, all service overview pages should share:

- summary
- use/avoid decision
- quickstart CTA
- common tasks
- related services

### 5. Scannable reading layout

Rules:

- keep headings strong
- use short paragraphs
- use callouts for warnings and cost notes
- keep code blocks easy to copy
- maintain sticky local navigation
- maintain right-side table of contents on desktop

## Visual Direction

The UI should feel premium, technical, and confident.

It should not feel like:

- a corporate portal
- a plain blog
- a generic docs starter

Recommended visual traits:

- bright reading surface
- strong contrast
- expressive serif or semi-serif headline style
- tight spacing discipline
- subtle but intentional motion
- service-color accents used carefully

Do not copy Stripe's colors directly.

Copy the confidence of the hierarchy, not the brand.

## Core UI Components

Required components:

- global top bar
- service mega menu
- search modal
- service hub hero
- sticky left nav
- sticky right table of contents
- service comparison cards
- quickstart CTA cards
- warning, cost, and decision callouts
- code blocks with copy
- "next step" footer cards

## Recommended Content Taxonomy

For each major service:

- `/docs/cloud-run`
- `/docs/cloud-run/quickstart`
- `/docs/cloud-run/guides/deploy`
- `/docs/cloud-run/guides/custom-domains`
- `/docs/cloud-run/concepts`
- `/docs/cloud-run/reference`
- `/docs/cloud-run/troubleshooting`

That URL model is closer to Stripe and easier for users to understand.

## Content Writing Rules

Every major page should answer:

1. What is this?
2. When should I use it?
3. When should I avoid it?
4. What is the smallest working setup?
5. What do I click or run next?

Wording rules:

- use plain English first
- define GCP terms on first use
- prefer outcome labels over internal product terminology
- never make the user infer the next page

## Phased Rollout

### Phase 1: Navigation and shell

- build Stripe-like global top bar
- build all-services mega menu
- build service hub page template
- promote search in header

### Phase 2: First service hubs

- Cloud Run
- Cloud Storage
- Cloud SQL
- Pub/Sub
- Vertex AI

Each gets:

- overview
- quickstart
- guides
- concepts
- reference

### Phase 3: Search and discoverability

- command palette
- synonym mapping
- AWS/Azure mapping
- better cross-links

### Phase 4: Scale

- more services
- architecture galleries
- contribution workflow
- usage analytics

## MVP Recommendation

Do not try to launch all GCP services in the new Stripe-style shell at once.

MVP should be:

- Cloud Run
- Cloud Storage
- Cloud SQL
- IAM
- Vertex AI

That is enough to prove the model.

## Success Criteria

The new system is successful if a first-time GCP user can do these faster than in the official docs:

- choose the right service
- understand why that service is the right fit
- find the quickstart
- move from quickstart to deeper guides

If users still feel lost after landing on a service hub, the system is not Stripe-like enough yet.

## Source Links

- Stripe Docs: https://docs.stripe.com
- Stripe Quickstart: https://docs.stripe.com/get-started/development-environment
- GitHub Docs: https://docs.github.com/en/get-started
- Cloudflare Workers Docs: https://developers.cloudflare.com/workers/get-started/guide/
- Vercel Docs: https://vercel.com/docs/getting-started-with-vercel
- MDN Learn: https://developer.mozilla.org/en-US/docs/Learn_web_development
- Nielsen Norman Group on information foraging: https://media.nngroup.com/media/articles/attachments/Information-Foraging-in-the-Mobile-Ecosystem_Satopaa_Lucero_2012.pdf
- Nielsen Norman Group on progressive disclosure: https://media.nngroup.com/media/articles/attachments/ProgressiveDisclosure_210505.pdf
- Nielsen Norman Group on scannable content: https://media.nngroup.com/media/reports/free/Scannability_of_Text_by_WebUsers.pdf
