---
title: "Theme config guide"
date: 2026-05-05
description: "How to customize ComicHero through params.comichero and preset config packs."
---

## Overview

ComicHero supports configuration-first customization in `hugo.toml` via `params.comichero`.

## Key options

- `defaultThumbnail`: fallback image for cards when post `image` is missing
- `homeCardLimit`: number of cards on home list
- `blogTagLimit`: max tags shown on blog list header
- `labels.*`: UI labels for pagination, TOC, tag filter, and timestamps
- `shortcodeDefaults.panelTitle`: default `panel` shortcode title

## Preset packs

Preset examples are provided in:

- `config/presets/minimal.toml`
- `config/presets/comic.toml`
- `config/presets/dark-pro.toml`

Copy the blocks you want into `hugo.toml` and tweak values.

## Validation

Run:

```bash
python scripts/validate_frontmatter.py
```

This checks required front matter fields, date format, and image-link existence.
