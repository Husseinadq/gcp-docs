---
title: Networking
description: The service hub for VPCs, ingress, egress, service boundaries, and connectivity decisions on GCP.
docType: service-hub
goal: I need a simpler mental model for how services connect, expose traffic, and talk to each other on GCP.
summary: Connectivity layer for controlling where traffic enters, where it leaves, and how services reach each other.
difficulty: intermediate
estimatedTime: 7 minutes
lastReviewed: 2026-03-11
order: 9
bestFor:
  - Teams connecting multiple services
  - Private and public traffic design
  - Service boundary planning
related:
  - /docs/networking/quickstart
  - /docs/networking/request-flow-model
  - /docs/networking/boundary-checklist
---

## TL;DR

Networking becomes confusing when teams treat it as low-level plumbing instead of as part of service design.

The simplest useful question is:

how does traffic enter, leave, and move between services?

## Use it when

- deciding whether a service is public or private
- designing communication between multiple workloads
- reasoning about ingress, egress, and service boundaries

## Avoid it when

- the workload is still a single simple service and the team is adding complexity too early
- networking terms are being learned in isolation from the actual application architecture

## Fastest starting path

Start from the request flow:

- where the request starts
- which service receives it
- which internal services it touches
- which external systems it needs

That request map explains most early networking decisions.

## Common jobs

- public ingress
- private service communication
- outbound access design
- environment isolation

## Compare it to

### IAM

IAM controls who can access resources. Networking controls how traffic reaches them. They are different layers and both matter.

### Service-level settings

Many product settings are really networking decisions in disguise, especially around exposure and connectivity.

## Read next

- [How GCP Is Organized](/docs/explain/how-gcp-is-organized)
- [IAM](/docs/iam)
- [Cloud Run](/docs/cloud-run)
