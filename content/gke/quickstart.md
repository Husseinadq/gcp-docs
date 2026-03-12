---
title: GKE quickstart
description: The shortest realistic path to starting with GKE when Kubernetes is actually part of the requirement.
docType: how-to
category: Get started
goal: I need to start with GKE without pretending it is as simple as a managed app runtime.
summary: Begin with one cluster decision, one workload path, and a clear reason for using Kubernetes at all.
difficulty: intermediate
estimatedTime: 15 minutes
lastReviewed: 2026-03-11
order: 1
bestFor:
  - Teams already using Kubernetes
  - Platforms with multiple services
related:
  - /docs/gke/when-gke-is-worth-it
  - /docs/gke/cluster-checklist
  - /docs/cloud-run
---

## Goal

Start one GKE environment in a way that keeps the cluster understandable instead of turning it into infrastructure fog.

## Fast path

This quickstart creates an Autopilot cluster, deploys one sample app, and exposes it with a load balancer.

## 1. Set your project, region, and cluster name

```bash
export PROJECT_ID="your-project-id"
export REGION="us-central1"
export CLUSTER="atlas-autopilot"

gcloud config set project "$PROJECT_ID"
gcloud services enable container.googleapis.com
```

## 2. Create an Autopilot cluster

```bash
gcloud container clusters create-auto "$CLUSTER" \
  --location "$REGION"
```

## 3. Fetch cluster credentials

```bash
gcloud container clusters get-credentials "$CLUSTER" \
  --location "$REGION"
```

## 4. Deploy one app with a manifest

`hello-server.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-server
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hello-server
  template:
    metadata:
      labels:
        app: hello-server
    spec:
      containers:
        - name: hello-server
          image: us-docker.pkg.dev/google-samples/containers/gke/hello-app:1.0
          ports:
            - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: hello-server
spec:
  type: LoadBalancer
  selector:
    app: hello-server
  ports:
    - port: 80
      targetPort: 8080
```

Apply it:

```bash
kubectl apply -f hello-server.yaml
```

## 5. Verify the rollout

```bash
kubectl get pods
kubectl get services hello-server
```

Wait until `EXTERNAL-IP` is populated, then open the address in your browser.

## What this should teach you

- the cluster is the platform boundary
- the deployment is the workload declaration
- the service is the network entry point for the workload

If that feels heavier than the problem requires, use [Cloud Run](/docs/cloud-run) instead.
