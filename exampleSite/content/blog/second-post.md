---
title: "Motion without the motion sickness"
date: 2026-04-22
description: "How the theme handles reduced motion and theme toggles."
tags: ["a11y", "css"]
image: "/images/It%20Is%20Rennnnnnnnny%20Time/stitch-Thank-you-gif.gif"
---

Cards and the home hero use **bouncy** keyframes. If the visitor enables _prefers-reduced-motion_, animations collapse to almost nothing so the site stays usable.

The **theme toggle** flips `data-theme` on the root element and persists the choice in `localStorage`.
