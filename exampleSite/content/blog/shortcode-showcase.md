---
title: "Shortcode showcase (complete reference)"
date: 2026-04-25
description: "Live render + copy snippet for the full ComicHero shortcode set."
tags: ["theme", "hugo", "shortcodes"]
image: "/images/placeholder-comic.svg"
---

This page is a **complete shortcode reference**.

For each block below:
1. you see a live render,
2. then the exact snippet via `codesnippet`.

---

## Text and callouts

### `panel`
{{< panel title="From the editor" >}}Use panel for framed context.{{< /panel >}}
{{< codesnippet path="assets/snippets/panel.txt" />}}

### `aside`
{{< aside side="right" >}}Aside-style annotation with float layout.{{< /aside >}}
{{< codesnippet path="assets/snippets/aside.txt" />}}

### `note`
{{< note type="tip" title="Tip" >}}Keep shortcode examples short and practical.{{< /note >}}
{{< codesnippet path="assets/snippets/note.txt" />}}

### `warning-strip`
{{< warning-strip level="spoiler" >}}Contains story spoiler-level context.{{< /warning-strip >}}
{{< codesnippet path="assets/snippets/warning-strip.txt" />}}

### `quote-bar`
{{< quote-bar from="Captain Vale" >}}Discipline beats chaos in long campaigns.{{< /quote-bar >}}
{{< codesnippet path="assets/snippets/quote-bar.txt" />}}

### `pullquote`
{{< pullquote by="Operator" sfx="WHAM" >}}Move early, validate often, ship small.{{< /pullquote >}}
{{< codesnippet path="assets/snippets/pullquote.txt" />}}

---

## Dialogue and storytelling

### `speech`
{{< speech from="Hero" >}}Ready when you are.{{< /speech >}}
{{< codesnippet path="assets/snippets/speech.txt" />}}

### `thought`
{{< thought from="Villain" >}}This is not over.{{< /thought >}}
{{< codesnippet path="assets/snippets/thought.txt" />}}

### `narrator`
{{< narrator title="Narrator" tone="calm" >}}The rain stopped before sunrise.{{< /narrator >}}
{{< codesnippet path="assets/snippets/narrator.txt" />}}

### `thought-cloud`
{{< thought-cloud from="Mira" >}}If we reroute now, we can still make it.{{< /thought-cloud >}}
{{< codesnippet path="assets/snippets/thought-cloud.txt" />}}

### `dialogue-ab`
{{< dialogue-ab title="Choose response" aLabel="Plan A" bLabel="Plan B" >}}
Move now while comms are clear.
---
Hold and wait for visual confirmation.
{{< /dialogue-ab >}}
{{< codesnippet path="assets/snippets/dialogue-ab.txt" />}}

### `dialogue-tree`
{{< dialogue-tree title="Negotiation" >}}
A -> B -> C
{{< /dialogue-tree >}}
{{< codesnippet path="assets/snippets/dialogue-tree.txt" />}}

### `villain-strip`
{{< villain-strip name="Black Nova" threat="High" icon="☠" >}}Observed near the relay tower perimeter.{{< /villain-strip >}}
{{< codesnippet path="assets/snippets/villain-strip.txt" />}}

---

## Layout and structure

### `grid` (2×2 example)
{{< grid cols="2" >}}
{{< panel title="A1" >}}Cell A1{{< /panel >}}
---
{{< panel title="A2" >}}Cell A2{{< /panel >}}
---
{{< panel title="B1" >}}Cell B1{{< /panel >}}
---
{{< panel title="B2" >}}Cell B2{{< /panel >}}
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

### `chapter`
{{< chapter label="Arc 1" title="Cold Open" subtitle="Into the storm" >}}
{{< codesnippet path="assets/snippets/chapter.txt" />}}

### `divider`
{{< divider label="Transition" >}}
{{< codesnippet path="assets/snippets/divider.txt" />}}

### `toc`
{{< toc title="On this page" >}}{{< /toc >}}
{{< codesnippet path="assets/snippets/toc.txt" />}}

---

## Media and comparison

### `figure`
{{< figure src="/images/placeholder-comic.svg" alt="Placeholder" caption="Theme-compatible image frame." >}}
{{< codesnippet path="assets/snippets/figure.txt" />}}

### `video`
{{< video src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" caption="Video frame style follows theme controls." />}}
{{< codesnippet path="assets/snippets/video.txt" />}}

### `compare`
{{< compare slider="true" left="/images/compare-before.svg" right="/images/compare-after.svg" leftLabel="Before" rightLabel="After" >}}{{< /compare >}}
{{< codesnippet path="assets/snippets/compare-slider.txt" />}}

---

## Data / utility

### `stats`
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

### `button`
{{< button href="/docs/" style="primary" text="Open docs" />}}
{{< codesnippet path="assets/snippets/button.txt" />}}

### `file`
{{< file path="assets/snippets/panel.txt" lang="txt" title="snippet/panel.txt" />}}
{{< codesnippet path="assets/snippets/file.txt" />}}

### `spoiler`
{{< spoiler title="Reveal answer" >}}The passcode is **7429**.{{< /spoiler >}}
{{< codesnippet path="assets/snippets/spoiler.txt" />}}

### `soundboard`
{{< soundboard >}}
Ping|880
Alert|660
Success|990
{{< /soundboard >}}
{{< codesnippet path="assets/snippets/soundboard.txt" />}}

---

## Character and relation widgets

### `cast-lite`
{{< cast-lite name="Rook" role="Scout" >}}Fast recon specialist.{{< /cast-lite >}}
{{< codesnippet path="assets/snippets/cast-lite.txt" />}}

### `cast`
{{< cast name="Astra" >}}Team lead and strategist.{{< /cast >}}
{{< codesnippet path="assets/snippets/cast.txt" />}}

### `character-card`
{{< character-card name="Nova" faction="Vanguard" ability="Overcharge" >}}Frontline breaker.{{< /character-card >}}
{{< codesnippet path="assets/snippets/character-card.txt" />}}

### `relation-mini`
{{< relation-mini center="Nova" allies="Mira,Jin" enemies="Warden" >}}Current arc relationship map.{{< /relation-mini >}}
{{< codesnippet path="assets/snippets/relation-mini.txt" />}}

### `relation-graph`
{{< relation-graph >}}
Nova -> Mira : ally
Nova -> Warden : rival
{{< /relation-graph >}}
{{< codesnippet path="assets/snippets/relation-graph.txt" />}}

---

## Battle / map / mission extras

### `battle-log`
{{< battle-log title="Skirmish" >}}
00:01 | Contact
00:03 | Flank
{{< /battle-log >}}
{{< codesnippet path="assets/snippets/battle-log.txt" />}}

### `battle-timeline`
{{< battle-timeline title="Encounter" >}}
Phase 1 | Scan | Low risk
Phase 2 | Push | Medium risk
Phase 3 | Lockdown | High risk
{{< /battle-timeline >}}
{{< codesnippet path="assets/snippets/battle-timeline.txt" />}}

### `map-pin`
{{< map-pin place="North Gate" x="62" y="40" >}}Checkpoint Alpha{{< /map-pin >}}
{{< codesnippet path="assets/snippets/map-pin.txt" />}}

### `mission`
{{< mission title="Recover the relay" >}}Reach objective before dawn.{{< /mission >}}
{{< codesnippet path="assets/snippets/mission.txt" />}}

### `loot-table`
{{< loot-table >}}
Med kit | Common
Data shard | Rare
{{< /loot-table >}}
{{< codesnippet path="assets/snippets/loot-table.txt" />}}

---

## SFX / visual accents

### `sfx`, `burst`, `stamp`
Inline: {{< sfx text="POW!" >}}

{{< burst text="WHAM!" >}}

{{< stamp text="Approved" />}}

{{< codesnippet path="assets/snippets/sfx.txt" />}}
{{< codesnippet path="assets/snippets/burst.txt" />}}
{{< codesnippet path="assets/snippets/stamp.txt" />}}

---

## Full snippet bundle

{{< codesnippet path="assets/snippets/all-shortcodes.txt" />}}
