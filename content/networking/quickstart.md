---
title: Networking quickstart
description: The shortest useful path to mapping traffic flow on GCP before networking decisions become trial and error.
docType: how-to
category: Get started
goal: I need to understand how requests enter, move through, and leave my system before choosing networking settings.
summary: Start with one request path, one public entry point, and one clear list of internal and external dependencies.
difficulty: beginner
estimatedTime: 11 minutes
lastReviewed: 2026-03-11
order: 1
bestFor:
  - Teams connecting a few services
  - First public/private boundary decisions
  - Cloud Run and GKE architectures
related:
  - /docs/networking/request-flow-model
  - /docs/networking/boundary-checklist
  - /docs/cloud-run
---

## Goal

Draw the request flow clearly enough that ingress, egress, and service boundaries stop feeling like random platform settings.

## Fast path

This quickstart creates one custom VPC, one subnet, and one firewall rule so the basic networking building blocks are visible in code.

## 1. Set your project and names

```bash
export PROJECT_ID="your-project-id"
export REGION="us-central1"
export NETWORK="atlas-net"
export SUBNET="atlas-us-central1"

gcloud config set project "$PROJECT_ID"
```

## 2. Create a custom VPC and subnet

```bash
gcloud compute networks create "$NETWORK" \
  --subnet-mode=custom \
  --bgp-routing-mode=regional \
  --mtu=1460

gcloud compute networks subnets create "$SUBNET" \
  --network="$NETWORK" \
  --region="$REGION" \
  --range=10.10.0.0/24
```

## 3. Add one explicit web-ingress firewall rule

```bash
gcloud compute firewall-rules create atlas-allow-http \
  --network="$NETWORK" \
  --allow=tcp:80,tcp:443 \
  --source-ranges=0.0.0.0/0 \
  --target-tags=web \
  --description="Allow web traffic to instances tagged web"
```

## 4. Inspect what you created

```bash
gcloud compute networks subnets list \
  --filter="network:${NETWORK}"

gcloud compute firewall-rules list \
  --filter="network:${NETWORK}"
```

## What this should teach you

- the VPC is the network boundary
- the subnet is the IP range inside that boundary
- the firewall rule is the explicit statement of what traffic is allowed

That is enough structure to stop talking about networking as magic and start talking about concrete request paths.
