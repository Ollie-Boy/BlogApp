---
title: "Shortcode gallery: every ComicHero block"
date: 2026-04-25
description: "Live demos plus copy-paste snippets for panel, sfx, speech, grid, spoiler, and more."
tags: ["theme", "hugo", "shortcodes"]
image: "/images/placeholder-comic.svg"
---

This page **renders** each shortcode first, then shows the **same markup as escaped text** so you can copy it.

**Why not a normal ` ``` ` fence?** Hugo evaluates **all** Go-template shortcodes (the usual `{{` `<` shortcode `>` `}}` form) *before* Markdown runs, so shortcodes inside a fenced code block would still execute (and break demos). Use **`codesnippet`** with a self-closing tag, for example `path="assets/snippets/foo.txt"` (see each section below), which reads the file and prints HTML-escaped source. Snippet files live under `exampleSite/assets/snippets/` in this repo.

---

## `panel` — bordered box with optional title

{{< panel title="From the editor" >}}
Use panels for **asides** that should read like a comic caption box.
{{< /panel >}}

{{< codesnippet path="assets/snippets/panel.txt" />}}

---

## `sfx` — inline sound effect

Turn it up: {{< sfx text="POW!" >}}

{{< codesnippet path="assets/snippets/sfx.txt" />}}

---

## `burst` — big centered burst

{{< burst text="WHAM!" >}}

{{< codesnippet path="assets/snippets/burst.txt" />}}

---

## `speech` — dialogue bubble + optional speaker

{{< speech from="Hero" >}}
We need **one** theme to rule blog, portfolio, _and_ docs.
{{< /speech >}}

{{< codesnippet path="assets/snippets/speech.txt" />}}

Omit `from` if you only want the bubble.

---

## `thought` — thought cloud + dots

{{< thought from="Villain" >}}
Maybe I should have used **WordPress**… _(No.)_
{{< /thought >}}

{{< codesnippet path="assets/snippets/thought.txt" />}}

---

## `stamp` — small seal (pairs with inner text or `text` param)

{{< stamp color="warn" >}}BETA{{< /stamp >}} inline next to copy. Or: {{< stamp text="NEW!" color="accent" >}}{{< /stamp >}}

{{< codesnippet path="assets/snippets/stamp.txt" />}}

`color`: `accent` | `warn` | `info`.

---

## `divider` — panel break / chapter line

{{< divider label="Act II" style="gutter" >}}

{{< codesnippet path="assets/snippets/divider.txt" />}}

`style`: `gutter` (default), `zap`, `burst`. Omit `label` for a plain break.

---

## `aside` — margin note (magazine / editorial rail)

The main column keeps flowing while a short note sits in the margin on wide screens; on narrow viewports it stacks full width.

{{< aside side="right" >}}
**Rail note:** keep this short—one or two sentences.
{{< /aside >}}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.

{{< aside side="left" >}}
**Left rail:** same component, `side="left"`.
{{< /aside >}}

More body copy so you can see wrap behavior around the floated aside on desktop.

{{< codesnippet path="assets/snippets/aside.txt" />}}

`side`: `right` (default) or `left`. Optional `class`.

---

## `figure` — framed image + optional caption

{{< figure src="/images/placeholder-comic.svg" alt="Demo art" caption="Optional **caption** supports Markdown." tilt="true" >}}

{{< codesnippet path="assets/snippets/figure.txt" />}}

- `src` — required. Site paths like `/images/foo.svg` or full `https://…` URLs.  
- `alt`, `caption` — optional.  
- `tilt="true"` — slight comic tilt on the whole figure.  
- `class` — optional extra CSS class.

---

## `grid` — multi-panel row (split cells with `---`)

{{< grid cols="2" >}}
**Panel A** — first cell.

Use normal Markdown here.
---
**Panel B** — second cell.

Lists work too:

- One
- Two
{{< /grid >}}

Three columns:

{{< grid cols="3" >}}
**1**
---
**2**
---
**3**
{{< /grid >}}

{{< codesnippet path="assets/snippets/grid.txt" />}}

Split cells with a line that contains **only** `---` (three hyphens). Optional `cols`: `2` (default), `3`, or `4`.

---

## `spoiler` — click to reveal

{{< spoiler label="Reveal ending" >}}
The butler did **not** do it. The theme was Hugo all along.
{{< /spoiler >}}

{{< codesnippet path="assets/snippets/spoiler.txt" />}}

Default label is “Reveal spoiler” if you omit `label`.

---

## `note` — callout (pairs with stamp-style hierarchy)

{{< note type="warning" title="Heads up" >}}
Breaking changes in the next release. **Pin** your version in `hugo.toml`.
{{< /note >}}

{{< note type="info" title="FYI" >}}
`type="info"` uses the blue accent lane.
{{< /note >}}

{{< note type="tip" title="Pro tip" >}}
Combine **notes** with `stamp` for scan-friendly docs.
{{< /note >}}

{{< note type="success" title="Ship it" >}}
Green lane for “all good” messaging.
{{< /note >}}

{{< codesnippet path="assets/snippets/note.txt" />}}

`type`: `info` | `warning` | `tip` | `success`. Optional `title` and `class`.

---

## `codesnippet` — show shortcode source safely

{{% codesnippet lang="text" %}}
{{< codesnippet path="assets/snippets/panel.txt" />}}
{{% /codesnippet %}}

Or put raw lines inside `{{% codesnippet %}}` / `{{% /codesnippet %}}` (percent delimiters) so inner shortcode markers are not executed.

---

## Quick reference table

| Shortcode      | Role |
|----------------|------|
| `panel`        | Titled box |
| `sfx`          | Inline POW-style badge |
| `burst`        | Big centered burst |
| `speech`       | Dialogue bubble |
| `thought`      | Thought cloud |
| `stamp`        | Small seal |
| `divider`      | Chapter / gutter break |
| `aside`        | Float margin note |
| `figure`       | Framed image + caption |
| `grid`         | 2–4 column panel row |
| `spoiler`      | `<details>` reveal |
| `note`         | Warning / info / tip / success |
| `codesnippet`  | Escaped source from `path` or inner |

**One file with every call (for bulk copy):**

{{< codesnippet path="assets/snippets/all-shortcodes.txt" />}}

End of transmission. {{< sfx text="END" >}}
