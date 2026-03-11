---
title: Cloud SQL quickstart
description: The shortest useful path to putting a managed relational database behind an app on GCP.
docType: how-to
category: Get started
goal: I need PostgreSQL or MySQL on GCP without self-managing the database layer.
summary: Start with one engine, one instance for one app boundary, and one explicit connection path.
difficulty: beginner
estimatedTime: 12 minutes
lastReviewed: 2026-03-11
order: 1
bestFor:
  - SaaS apps
  - Internal tools
  - Teams moving from local Postgres to GCP
prerequisites:
  - A GCP project with billing enabled
  - An app that already expects a relational database
related:
  - /docs/cloud-sql/when-cloud-sql-fits
  - /docs/cloud-sql/production-checklist
  - /docs/cloud-run
---

## Goal

Provision one relational database with a clean ownership boundary and a connection model the team can explain.

## Step 1: Pick the engine for the application, not for fashion

Use the engine your application and team already understand unless there is a real reason to change.

## Step 2: Keep the first instance tied to one app boundary

Do not start with a shared "main database" for every service and experiment.

## Step 3: Make connection ownership explicit

Before wiring the app, answer:

- which service connects
- how it authenticates
- where credentials or connection settings live

## Step 4: Separate database concerns from app concerns

Cloud SQL stores relational data.

Uploads, analytics exports, and background events still belong in the services that fit those jobs.

## Step 5: Verify restore and visibility assumptions

A database is not ready just because the connection string works.

Confirm that the team knows where logs, backups, and ownership live.
