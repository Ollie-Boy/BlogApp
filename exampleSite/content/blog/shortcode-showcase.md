---
title: "Shortcode showcase (clean reference)"
date: 2026-04-25
description: "A concise, copy-first reference page for ComicHero shortcodes."
tags: ["theme", "hugo", "shortcodes"]
image: "/images/cover-blog-wind.svg"
---

This page is a **minimal reference** for the most-used ComicHero shortcodes.

- Each section shows a live render.
- A matching `codesnippet` block follows for quick copy/paste.
- Snippets are loaded from `exampleSite/assets/snippets/`.

---

## Core blocks

### `panel`

{{< panel title="From the editor" >}}
Use a panel for highlighted notes, callouts, or side context.
{{< /panel >}}

{{< codesnippet path="assets/snippets/panel.txt" />}}

### `speech`

{{< speech from="Hero" >}}
Keep content short and punchy for comic rhythm.
{{< /speech >}}

{{< codesnippet path="assets/snippets/speech.txt" />}}

### `narrator`

{{< narrator title="Narrator" tone="calm" >}}
The city held its breath before the reveal.
{{< /narrator >}}

{{< codesnippet path="assets/snippets/narrator.txt" />}}

---

## Layout helpers

### `grid`

{{< grid cols="2" >}}
{{< panel title="Column A" >}}Left content{{< /panel >}}
{{< panel title="Column B" >}}Right content{{< /panel >}}
{{< /grid >}}

{{< codesnippet path="assets/snippets/grid.txt" />}}

### `steps`

{{< steps >}}
Write the first step
---
Then the second step
---
Finish with the third step
{{< /steps >}}

{{< codesnippet path="assets/snippets/steps.txt" />}}

---

## Media

### `figure`

{{< figure src="/images/placeholder-comic.svg" alt="Placeholder" caption="Theme-compatible image frame." >}}

{{< codesnippet path="assets/snippets/figure.txt" />}}

### `video`

{{< video src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" caption="Video frame style follows theme controls." >}}

{{< codesnippet path="assets/snippets/video.txt" />}}

---

## Data / utility blocks

### `table`-style alternatives

{{< stats >}}
Speed | 88
Power | 72
Focus | 95
{{< /stats >}}

{{< codesnippet path="assets/snippets/stats.txt" />}}

### `inventory`

{{< inventory >}}
Signal key | 1
Energy cell | 2
Patch kit | 1
{{< /inventory >}}

{{< codesnippet path="assets/snippets/inventory.txt" />}}

---

## Advanced storytelling

### `dialogue-ab`

{{< dialogue-ab title="Choose response" aLabel="Plan A" bLabel="Plan B" >}}
Move now while comms are clear.
---
Hold and wait for visual confirmation.
{{< /dialogue-ab >}}

{{< codesnippet path="assets/snippets/dialogue-ab.txt" />}}

### `villain-strip`

{{< villain-strip name="Black Nova" threat="High" icon="☠" >}}
Observed near the relay tower perimeter.
{{< /villain-strip >}}

{{< codesnippet path="assets/snippets/villain-strip.txt" />}}

---

## Quick index

| Shortcode | Purpose |
| --- | --- |
| `panel` | Framed callout block |
| `speech` | Dialogue bubble |
| `narrator` | Narration box |
| `grid` | Multi-column layout |
| `steps` | Numbered sequence |
| `figure` | Image + caption |
| `video` | Themed video frame |
| `stats` | Compact metrics table |
| `inventory` | Item list block |
| `dialogue-ab` | Two-option dialogue card |
| `villain-strip` | Threat highlight strip |

For the full raw snippet bundle, open:

{{< codesnippet path="assets/snippets/all-shortcodes.txt" />}}
