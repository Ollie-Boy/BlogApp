---
title: "iPhone publishing workflow (Working Copy + Obsidian)"
description: "Create, commit, and publish Hugo posts from iPhone with a stable Git workflow."
weight: 40
---

## Recommended apps

- **Working Copy** (Git client on iOS)
- **Obsidian Mobile** (writing and note workflow)

## Recommended Obsidian plugins

- **Templater**
- **QuickAdd**
- **Linter**
- **Git** (plugin name: `Obsidian Git`, optional on mobile)
- **Commander** (optional)

## One-time setup

1. Clone your site repo in **Working Copy**.
2. Open the same repo folder as an Obsidian vault.
3. In Obsidian, enable the plugins above.
4. Create a post template (below) and wire it into QuickAdd.

## Mobile post template

Use this front matter template for blog posts:

```yaml
---
title: "{{VALUE:title}}"
date: {{DATE:YYYY-MM-DDTHH:mm:ssZ}}
draft: false
tags: ["blog"]
description: ""
summary: ""
series: []
issue:
image: "/images/placeholder-comic.svg"
---
```

## Daily publish flow (iPhone)

1. In Obsidian, run a QuickAdd command to create a new post under `content/blog/`.
2. Write content and save.
3. Open Working Copy, review diff, then **Commit**.
4. Push to GitHub.
5. Your deployment pipeline (GitHub Actions / Netlify / Vercel) publishes automatically.

## Practical tips

- Keep image files in `static/images/` and reference as `/images/xxx.png`.
- Keep Git as single source of truth: edit in Obsidian, review/ship in Working Copy.
- If Obsidian Git plugin is unstable on iOS, do commits only in Working Copy.
