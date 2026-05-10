---
title: "ComicHero Internal Feature Implementation Notes"
date: 2026-05-10
description: "Detailed internal notes for the current ComicHero visual, UX, documentation, and configuration features."
tags: ["theme", "internal", "features"]
schema_version: 1
---

This document records the implemented feature set and explains where each feature lives. It is intentionally detailed so future edits can be made safely without guessing.

## 1. Feature flag location

Feature flags are listed in `exampleSite/hugo.toml` under:

```toml
[params.comichero.features]
```

The current flags document the intended feature surface:

- `dynamicBackground`
- `backgroundIntensity`
- `reducedMotionFallback`
- `linkInkHover`
- `heroHalftone`
- `heroClouds`
- `heroSfxEasterEgg`
- `featuredPost`
- `cardReadingMeta`
- `cardTags`
- `cardStickers`
- `tocCollapse`
- `archiveStats`
- `archiveHeatmap`
- `lightboxCaptions`
- `lightboxThumbnails`
- `footerYear`
- `featureFlags`

Some flags are currently documentation/configuration switches, while the theme CSS and JavaScript provide the active default behavior. This makes the configuration file the single place to describe which advanced features the site expects.

## 2. Code block action alignment

Code actions are managed by `themes/comichero/assets/js/theme.js`.

The helper `ensureCodeActions(container, className)` creates a shared action bar. This prevents `Copy` and `Expand` from being positioned independently.

Normal Markdown code blocks use:

```html
<div class="code-actions">...</div>
```

Shortcode code snippets use:

```html
<div class="codesnippet-actions">...</div>
```

The related styles live in `themes/comichero/assets/css/main.css`:

- `.code-actions`
- `.codesnippet-actions`
- `.code-actions > .code-copy-btn`
- `.code-actions > .code-collapse-btn`
- `.codesnippet-actions > .codesnippet-copy`
- `.codesnippet-actions > .code-collapse-btn`

When editing these buttons, keep both buttons inside the same action bar. Do not return to separate absolute positioning for each button.

## 3. Table spacing

Markdown tables inside `.prose` and `.article-content` use dedicated table styles. The important choices are:

- `border-collapse: separate`
- `border-spacing: 0.7rem 0.55rem`
- larger cell padding
- minimum cell width
- themed header and body backgrounds

This avoids cramped columns in beginner guide tables.

## 4. Three-state theme mode

The theme button cycles through:

1. Auto
2. Light
3. Dark
4. Auto again

The mode is stored with:

```text
comichero-theme-mode
```

The theme value is stored with:

```text
comichero-theme
```

Automatic mode uses local time:

- 7:00 AM through 6:59 PM: light
- 7:00 PM through 6:59 AM: dark

Right-clicking the theme button resets the mode to automatic.

## 5. Dynamic background controls

The dynamic background still reacts to scroll and pointer movement. Additional controls exist for debugging and reduced motion:

- `?fx=off` disables animated background updates for the current URL.
- `localStorage.comichero-fx = "off"` disables the effect persistently.
- `localStorage.comichero-bg-intensity` can be set to a number from about `0.35` to `1.6` to tune color motion strength.
- `prefers-reduced-motion: reduce` removes extra decorative animations.

## 6. Hero visual details

The hero area includes:

- a subtle halftone layer,
- small drifting cloud shapes around the SFX burst,
- a click easter egg on the SFX text.

The SFX click behavior is in `theme.js`. The animation styles are in `main.css`.

## 7. Card improvements

Post cards now include:

- reading time,
- word count,
- up to three tags,
- a `New` sticker for recent posts,
- hover lift/parallax behavior,
- subtle paper texture.

These are rendered in:

- `themes/comichero/layouts/index.html`
- `themes/comichero/layouts/_default/list.html`

The styles are in `main.css` under the feature polish pack.

## 8. Featured post block

The homepage renders a featured post section before the regular card grid. It uses the newest blog post from `site.RegularPages` filtered by `Type == "blog"`.

Template:

```text
themes/comichero/layouts/index.html
```

Styles:

```text
themes/comichero/assets/css/main.css
```

## 9. Table of contents behavior

The `toc` shortcode now renders a button and collapsible body:

```html
<button class="comic-toc__toggle" data-toc-toggle>
<div class="comic-toc__body" data-toc-body>
```

JavaScript toggles `.is-collapsed` on the TOC container. CSS adds arrow markers and a sticky mobile behavior.

Template:

```text
themes/comichero/layouts/shortcodes/toc.html
```

## 10. Archive improvements

The archive page now includes:

- total post count,
- year count,
- monthly heatmap cells,
- collapsible month groups.

Template:

```text
themes/comichero/layouts/archives/list.html
```

Styles:

```text
themes/comichero/assets/css/main.css
```

## 11. Lightbox improvements

The image lightbox now supports:

- captions from `figcaption` or image alt text,
- a download link,
- thumbnail navigation,
- keyboard left/right navigation.

The gallery setup is in `theme.js`; visual styles are in `main.css`.

## 12. Footer details

The footer now includes:

- an automatically generated current year,
- a halftone overlay,
- the existing footer fade handoff from the page background.

Template:

```text
themes/comichero/layouts/partials/footer.html
```

## 13. Beginner documentation backlog added by request

The complete guide should continue to grow with beginner topics. The requested documentation areas are:

- common errors and how to fix them,
- backup before editing,
- GitHub Pages publishing,
- domain binding,
- logo replacement,
- font replacement,
- restoring defaults,
- a minimal safe configuration checklist,
- a full copy-paste configuration template.

These topics belong in `exampleSite/content/blog/Theme-Complete-Guide.md`, because that post is the public beginner guide.

## 14. Shortcode showcase tools

The shortcode showcase page includes a filter box and a live snippet scratchpad.

Content location:

```text
exampleSite/content/blog/shortcode-showcase.md
```

JavaScript behavior:

```text
themes/comichero/assets/js/theme.js
```

The browser filter hides or shows each `h2`/`h3` example section based on text matches. The scratchpad mirrors typed shortcode text into a preview block. It does not render Hugo shortcodes in the browser, because Hugo shortcodes are rendered at build time. This is intentional: the scratchpad is a safe copy-and-paste drafting tool.

CSS classes:

- `.showcase-tools`
- `.showcase-tools__input`
- `.showcase-tools__textarea`
- `.showcase-tools__preview`
- `.showcase-tools__details`
