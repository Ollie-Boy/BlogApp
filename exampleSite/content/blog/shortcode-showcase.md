---
title: "Shortcode gallery: every ComicHero block"
date: 2026-04-25
description: "Live demos plus copy-paste snippets for panel, sfx, speech, grid, spoiler, and more."
tags: ["theme", "hugo", "shortcodes"]
image: "/images/cover-blog-wind.svg"
---

This page **renders** each shortcode first, then shows the **same markup as escaped text** so you can copy it.

**Why not a normal ` ``` ` fence?** Hugo evaluates **all** Go-template shortcodes (the usual `{{` `<` shortcode `>` `}}` form) *before* Markdown runs, so shortcodes inside a fenced code block would still execute (and break demos). Use **`codesnippet`** with a self-closing tag, for example `path="assets/snippets/foo.txt"` (see each section below), which reads the file and prints HTML-escaped source. Snippet files live under `exampleSite/assets/snippets/` in this repo. Each `codesnippet` block includes a **Copy** button (clipboard).

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
We need **one** theme to rule blog, docs, _and_ notes.
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

## New storytelling kit (narration / A-B / villain beats)

### `narrator` — standalone narration box

{{< narrator title="Narrator" >}}
Rain swallowed the skyline before the sirens arrived.
{{< /narrator >}}

{{< codesnippet path="assets/snippets/narrator.txt" />}}

### `thought-cloud` — unified thought bubble style

{{< thought-cloud from="Mira" >}}
If we miss this window, the relay is gone.
{{< /thought-cloud >}}

{{< codesnippet path="assets/snippets/thought-cloud.txt" />}}

### `dialogue-ab` — two-column A/B dialogue

{{< dialogue-ab title="Checkpoint Choice" aLabel="A 路线" bLabel="B 路线" >}}
Walk in with forged credentials.
---
Cut power first, then breach from the roof.
{{< /dialogue-ab >}}

{{< codesnippet path="assets/snippets/dialogue-ab.txt" />}}

### `cast-lite` — lightweight character intro card

{{< cast-lite name="Captain Mira" role="Sky Guard Leader" img="/images/placeholder-comic.svg" >}}
Fast strategist with a habit of risky flank calls.
{{< /cast-lite >}}

{{< codesnippet path="assets/snippets/cast-lite.txt" />}}

### `relation-mini` — mini allies vs enemies map

{{< relation-mini center="Captain Mira" allies="Jax,Archivist" enemies="Iron Fang,Null Choir" >}}{{< /relation-mini >}}

{{< codesnippet path="assets/snippets/relation-mini.txt" />}}

### `battle-timeline` — short beat-by-beat timeline

{{< battle-timeline title="Boss Clash" >}}
Beat 1|Smoke dash|Enemy formation broken
Beat 2|EMP blade|Shield dropped to 12%
Beat 3|Finisher|Target neutralized
{{< /battle-timeline >}}

{{< codesnippet path="assets/snippets/battle-timeline.txt" />}}

### `quote-bar` — emphasized quote bar

{{< quote-bar from="Field Notes" >}}
You don’t win by being louder. You win by being earlier.
{{< /quote-bar >}}

{{< codesnippet path="assets/snippets/quote-bar.txt" />}}

### `villain-strip` — villain highlight strip

{{< villain-strip name="Iron Fang" threat="Critical" >}}
Appears whenever the city grid enters blackout mode.
{{< /villain-strip >}}

{{< codesnippet path="assets/snippets/villain-strip.txt" />}}

### `sidenote` — compact inline lore / editor note

{{< sidenote title="Lore note" icon="✦" side="right" >}}
Arc day one clock freeze
---
The city clocks all stopped at **03:17** on arc day one.
{{< /sidenote >}}

{{< codesnippet path="assets/snippets/sidenote.txt" />}}

Use `side="right"` (default) or `side="left"` to place the sidenote outside the main text column. Put the **trigger text** above `---`, and the note content below it.

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

## `video` — comic-framed HTML5 video

{{< video src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" poster="/images/placeholder-comic.svg" >}}
Sample clip — set **src** to your file or CDN URL.
{{< /video >}}

{{< codesnippet path="assets/snippets/video.txt" />}}

Params: `src` (required), `poster`, `caption`, `controls` (set `controls="false"` to hide native controls), `class`.

---

## `pullquote` — oversized pull quote + optional SFX

{{< pullquote sfx="ZING!" cite="— Editorial desk" >}}
**One sentence** that yanks the reader sideways like a sound-effect balloon.
{{< /pullquote >}}

{{< codesnippet path="assets/snippets/pullquote.txt" />}}

Optional `sfx`, `cite` (Markdown), `class`.

---

## `steps` — numbered doc steps as comic panels

{{< steps >}}
### Install Hugo

Grab the extended build if you use Hugo Pipes SCSS.
---
### Copy the theme

Drop `themes/comichero` into your project.
---
### Run the demo

Point `themesDir` at the folder that contains the theme.
{{< /steps >}}

{{< codesnippet path="assets/snippets/steps.txt" />}}

Split steps with a line containing only `---` (same convention as `grid`).

---

## `compare` — before/after or A/B

**Slider** (drag the range; left image reveals over right):

{{< compare left="/images/compare-before.svg" right="/images/compare-after.svg" leftLabel="Before" rightLabel="After" slider="true" >}}{{< /compare >}}

{{< codesnippet path="assets/snippets/compare-slider.txt" />}}

**Static** side-by-side (set `slider="false"`):

{{< compare left="/images/compare-before.svg" right="/images/compare-after.svg" slider="false" >}}{{< /compare >}}

{{< codesnippet path="assets/snippets/compare-static.txt" />}}

**Markdown panels** (no `left`/`right`; inner split by `---`):

{{< compare >}}
### Option A

Markdown **here**.
---
### Option B

More copy.
{{< /compare >}}

{{< codesnippet path="assets/snippets/compare-panels.txt" />}}

---

## `file` — highlighted source from the site tree

Requires `[markup.highlight]` in your site config (see this demo `hugo.toml`). Path is **site-relative** (e.g. `hugo.toml` at the site root).

{{< file path="hugo.toml" title="Site config (excerpt preview)" >}}{{< /file >}}

{{< codesnippet path="assets/snippets/file.txt" />}}

Optional `lang` overrides auto-detect from the file extension.

---

## `button` — theme-styled CTA link

{{< button href="/docs/getting-started/" style="primary" >}}Open docs{{< /button >}}
{{< button href="/docs/" style="ghost" >}}Docs{{< /button >}}

{{< codesnippet path="assets/snippets/button.txt" />}}

`style`: `primary` or `ghost`. Optional `text` param instead of inner label; optional `class`.

---

## `toc` — mini table of contents for the current page

Built from headings on **this** page (same engine as the docs sidebar TOC):

{{< toc >}}{{< /toc >}}

{{< codesnippet path="assets/snippets/toc.txt" />}}

---

## `codesnippet` — show shortcode source safely (+ copy)

{{% codesnippet lang="text" %}}
{{< codesnippet path="assets/snippets/panel.txt" />}}
{{% /codesnippet %}}

Or put raw lines inside `{{% codesnippet %}}` / `{{% /codesnippet %}}` (percent delimiters) so inner shortcode markers are not executed.

---

## `cast` — character intro (avatar + nameplate + line)

{{< cast name="The Editor" img="/images/placeholder-comic.svg" >}}
**Cast** shortcode: avatar, name tag, and one speech block for the line.
{{< /cast >}}

{{< codesnippet path="assets/snippets/cast.txt" />}}

Params: `name`, `img` (or `src`), optional `class`.

---

## `soundboard` — tap SFX buttons (Web Audio)

{{< soundboard >}}
POW|440
BAM|330
ZIP|660
{{< /soundboard >}}

{{< codesnippet path="assets/snippets/soundboard.txt" />}}

One word per line; optional `Label|frequencyHz`. **Long-press the first button** to mute all beeps (stored in `localStorage`).

---

## `chapter` — big chapter / 「回」 title block

{{< chapter label="第 3 回" volume="Vol. 1" subtitle="Optional **subtitle** markdown." >}}

{{< codesnippet path="assets/snippets/chapter.txt" />}}

Params: `label` (or `title`), `volume`, `subtitle`, `class`.


---

## `battle-log` — turn-based event stream

{{< battle-log title="Boss Fight" >}}
Round 1|Slash|24|Shield cracked
Round 2|Counter|18|Enemy staggered
Round 3|Finisher|56|KO
{{< /battle-log >}}

{{< codesnippet path="assets/snippets/battle-log.txt" />}}

---

## `inventory` — item card grid

{{< inventory title="Loadout" >}}
Pulse Blade|Legendary|High crit melee weapon
Nano Kit|Rare|Restores 35 HP instantly
Flash Bomb|Common|Briefly blinds enemies
{{< /inventory >}}

{{< codesnippet path="assets/snippets/inventory.txt" />}}

---

## `mission` — mission board card

{{< mission title="Secure the Relay" type="main" status="active" reward="900 XP + Rare Mod" >}}
Reach the rooftop relay and hold for 90 seconds.
{{< /mission >}}

{{< codesnippet path="assets/snippets/mission.txt" />}}

---

## `map-pin` — location card

{{< map-pin name="Sector 7 Relay" coords="E-17 / N-04" faction="City Guard" arc="Nightfall" >}}
A high-ground signal node with heavy patrol routes.
{{< /map-pin >}}

{{< codesnippet path="assets/snippets/map-pin.txt" />}}

---

## `loot-table` — drop table with rarity colors

{{< loot-table title="Raid Drops" >}}
Core Shard|42%|Common
Aegis Coil|18%|Rare
Phoenix Cell|4%|Legendary
{{< /loot-table >}}

{{< codesnippet path="assets/snippets/loot-table.txt" />}}

---

## `dialogue-tree` — collapsible dialogue branches

{{< dialogue-tree title="Gatekeeper Dialogue" >}}
Ask for passage politely.
---
Offer a bribe to skip inspection.
---
Challenge authority and force entry.
{{< /dialogue-tree >}}

{{< codesnippet path="assets/snippets/dialogue-tree.txt" />}}

---

## `relation-graph` — allies vs enemies map

{{< relation-graph center="Captain Mira" allies="Jax,The Archivist" enemies="Iron Fang,Null Choir" >}}{{< /relation-graph >}}

{{< codesnippet path="assets/snippets/relation-graph.txt" />}}

---

## `character-card` — profile card

{{< character-card name="Captain Mira" img="/images/placeholder-comic.svg" faction="Sky Guard" ability="Photon Dash" debut="Issue #1" >}}
Tactical leader who specializes in rapid flank maneuvers.
{{< /character-card >}}

{{< codesnippet path="assets/snippets/character-card.txt" />}}

---

## `choice` — branch buttons

{{< choice aText="Take rooftop route" aHref="#route-a" bText="Take alley route" bHref="#route-b" >}}{{< /choice >}}

{{< codesnippet path="assets/snippets/choice.txt" />}}

---

## `stats` — compact metric panel

{{< stats label="Threat Level" value="82" trend="up" change="+6 this chapter" >}}{{< /stats >}}

{{< codesnippet path="assets/snippets/stats.txt" />}}

---

## `warning-strip` — top warning banner

{{< warning-strip level="spoiler" text="Major plot spoiler below." >}}{{< /warning-strip >}}

{{< codesnippet path="assets/snippets/warning-strip.txt" />}}

## Dark QA

Use this section to quickly verify contrast and edge visibility in dark mode.

{{< speech from="Narrator" tone="narrator" >}}
Dark mode QA keeps labels and bubbles readable while preserving comic tone.
{{< /speech >}}

{{< note type="info" title="Contrast check" >}}
Check label text, border contrast, and body copy readability.
{{< /note >}}

{{< aside side="right" >}}
This rail note validates panel/background separation in dark mode.
{{< /aside >}}

{{< button href="/about/" style="primary" >}}Open About QA{{< /button >}}
{{< button href="/docs/getting-started/" style="ghost" >}}Ghost QA{{< /button >}}

{{< spoiler label="Dark spoiler test" >}}
Ensure spoiler body remains readable and border contrast is clear.
{{< /spoiler >}}

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
| `video`        | Framed `<video>` + optional poster/caption |
| `pullquote`    | Big quote + optional SFX / cite |
| `steps`        | Numbered comic panels |
| `compare`      | Slider, static A/B, or markdown panels |
| `file`         | Syntax-highlighted file from repo |
| `button`       | Primary/ghost CTA link |
| `toc`          | In-page mini TOC |
| `codesnippet`  | Escaped source + copy button |
| `cast`         | Avatar + nameplate + dialogue line |
| `soundboard`   | Tap SFX buttons (Web Audio) |
| `chapter`      | Large chapter / issue heading |
| `battle-log`   | Turn-based event stream |
| `inventory`    | Item card grid with rarity |
| `mission`      | Mission board card |
| `map-pin`      | Location metadata card |
| `loot-table`   | Drop table with rarity tint |
| `dialogue-tree`| Collapsible branch dialogue |
| `relation-graph`| Allies/enemies relation map |
| `character-card`| Character profile card |
| `narrator`     | Standalone narration panel |
| `thought-cloud`| Unified thought bubble panel |
| `dialogue-ab`  | Two-column A/B dialogue choices |
| `cast-lite`    | Lightweight character intro card |
| `relation-mini`| Mini ally/enemy relation map |
| `battle-timeline`| Beat-by-beat battle timeline |
| `quote-bar`    | Cinematic emphasized quote bar |
| `villain-strip`| Villain spotlight warning strip |
| `sidenote`     | Compact inline lore/editor note |

**One file with every call (for bulk copy):**

{{< codesnippet path="assets/snippets/all-shortcodes.txt" />}}

End of transmission. {{< sfx text="END" >}}
