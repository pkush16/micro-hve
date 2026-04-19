---
title: 10-Minute Delivery MVP Frontend
description: Vue 3 plus Vite frontend baseline with routing and local-only MVP flow.
---

## Overview

This repository contains the frontend-only MVP baseline for a 10-minute delivery flow.
The app uses Vue 3 plus Vite and includes a router-driven 4-screen navigation model:

* Catalog
* Cart
* Checkout
* Tracking

## Commands

Install dependencies:

```bash
npm install
```

Run local development server:

```bash
npm run dev
```

Run lint validation:

```bash
npm run lint
```

Create production build:

```bash
npm run build
```

Run test baseline:

```bash
npm run test
```

## Test Expectation for MVP

This MVP baseline treats tests as conditional during early phases.
`npm run test` is configured with `--passWithNoTests`, so it succeeds when no test files exist yet.
As feature logic lands in later phases, add high-value tests and remove this temporary allowance when the suite is established.
