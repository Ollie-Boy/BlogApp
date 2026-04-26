---
title: "Customization"
description: "Menus, fonts, and theme knobs."
weight: 20
---

## Menus

Define `menus.main` for the header, `menus.footer` for links, and optional `menus.hero` for home page buttons.

## Fonts

**Dual loading:** set `googleFontsUrl` for CDN, and keep files in `themes/comichero/static/fonts/` for offline builds. The theme always references `/fonts/*.ttf` in `@font-face` rules.

## Motion

Animations use CSS keyframes. Users who prefer reduced motion get nearly static transitions via `prefers-reduced-motion`.

## Dark mode

`data-theme` on `<html>` is `light` or `dark`. The inline boot script reads `localStorage` before paint to avoid a flash.

## Content types

Add sections under `content/blog`, `content/docs`, and `content/series`. Adjust `homeTypes` to control which types appear in the home grid.
