---
title: "First panel: why this theme exists"
date: 2026-04-20
description: "A loud intro post with shortcodes and a cover image."
tags: ["theme", "hugo"]
image: "/images/placeholder-comic.svg"
---

This post shows the **single** layout: hero image, tags, and body typography.

{{< sfx text="WOW!" >}}

{{< panel title="Editorial bubble" >}}
**Bold** and _italic_ inside a panel. Links [work too](https://gohugo.io/).
{{< /panel >}}

> Blockquotes get a speech-bubble tail in the stylesheet.

{{< stamp color="warn" >}}TIP{{< /stamp >}} Stamps are good for callouts. {{< stamp color="info" >}}PRO{{< /stamp >}}

{{< thought from="Reader (maybe)" >}}
Did the author really need **this** many shortcodes? _(Yes.)_
{{< /thought >}}

{{< divider label="Scene 2" style="gutter" >}}

```bash
hugo server --themesDir .. --source exampleSite
```

{{< burst text="END" >}}
