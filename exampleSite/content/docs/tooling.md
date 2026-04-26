---
title: "Tooling & performance"
description: "Search index, linting, formatting, validation, and benchmarks."
weight: 30
---

## Commands

```bash
npm install
npm run format:check
npm run lint:css
npm run validate:frontmatter
```

## Build + search index

```bash
hugo -s exampleSite --themesDir themes
npm run build:search
```

## Lighthouse

Run Hugo server first, then:

```bash
npm run lighthouse
```

Override URL:

```bash
LH_URL="http://127.0.0.1:1313/" npm run lighthouse
```
