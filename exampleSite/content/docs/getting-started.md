---
title: "Getting started"
description: "Install the theme and run the demo site."
weight: 10
---

## Copy the theme

Clone this repository or copy the `themes/comichero` folder into your site `themes/comichero`.

## Configure

Point `theme` and `themesDir` at the parent if you keep the provided `exampleSite` layout:

```toml
theme = "comichero"
themesDir = ".."
```

Or place the theme inside your project:

```toml
theme = "comichero"
```

## Run Hugo

From the `exampleSite` directory:

```bash
hugo server --themesDir ..
```

## Parameters

Under `[params.comichero]` you can set `heroTitle`, `heroSubtitle`, `heroSfx`, `latestHeading`, `footerText`, `homeTypes`, `defaultTheme`, and `googleFontsUrl`.

## Types and layouts

| Type        | Layout                         |
|------------|---------------------------------|
| `blog`     | Default list + single           |
| `portfolio` | Default list + single          |
| `docs`     | List + `docs/single` with TOC  |

## Shortcodes

Hugo runs **all** shortcode tags (the usual Go-template style with double braces and angle brackets) **before** Markdown, so a normal fenced code block **still executes** shortcodes written inside it. To show copy-paste source safely, use **`codesnippet`** with a site-relative file path, for example the bundled reference file `assets/snippets/all-shortcodes.txt`. Or wrap raw lines in percent-style shortcode tags so the inner markup is not evaluated (see the theme `codesnippet` template).

- **sfx** — inline sound-effect badge  
- **burst** — centered burst  
- **panel** — bordered panel (paired)  
- **speech** — labeled dialogue bubble (paired; optional `from`)  
- **thought** — thought cloud + dot trail (paired; optional `from`)  
- **stamp** — inline seal; inner text or `text="..."`; `color`: `accent`, `warn`, `info`  
- **divider** — panel break; optional `label`; `style`: `gutter` (default), `zap`, `burst`  
- **aside** — floated margin note; `side`: `right` or `left`  
- **figure** — framed image; `src` (required), `alt`, `caption`, `tilt="true"`  
- **grid** — 2–4 columns; split inner cells with a line containing only `---`  
- **spoiler** — expandable block; optional `label`  
- **note** — callout; `type`: `info`, `warning`, `tip`, `success`; optional `title`  
- **video** — framed HTML5 video; `src`, `poster`, optional inner or `caption` param; `controls="false"` to hide controls  
- **pullquote** — large quote; optional `sfx`, `cite`  
- **steps** — numbered panels; split inner steps with a line containing only `---`  
- **compare** — two images: `left`, `right`, `leftLabel`, `rightLabel`, `slider="true"` (default) or `false`; or omit images and split inner markdown with `---`  
- **file** — syntax-highlighted file via `readFile`; needs `[markup.highlight]` in config. Use opening and closing **file** tags with a real **site-relative** path (paths are resolved from the site root next to `hugo.toml`, e.g. the config file name without a leading slash). Do **not** put example shortcode tags inside Markdown backticks in this page — Hugo still parses them.  
- **button** — CTA link; `href`, `style` (`primary` / `ghost`), label as inner or `text`  
- **toc** — in-page table of contents for the current page; use paired opening and closing **toc** tags (see the Shortcode gallery post for exact markup).  
- **codesnippet** — escaped source from a `path` (site-relative) or from percent-delimited inner content; includes a **Copy** button  
- **cast** — character card: `name`, `img` or `src`, inner line (Markdown)  
- **soundboard** — inner lines `WORD` or `WORD|hz`; Web Audio beep; long-press first button to mute  
- **chapter** — big issue title: `label` or `title`, optional `volume`, `subtitle`

**Theme / site:** Header **reading progress** bar, **back to top** with speed-line effect on click, **Open Graph / Twitter** + **JSON-LD** via `layouts/partials/head-meta.html` (use `params.og_image` or `params.comichero.og_image`, or per-page `og_image` / `image`). **Series** taxonomy: add `series` and optional `issue` in front matter; list at `/series/`; blog posts show **next / previous / random** cards when `series` is set.

Avoid self-closing shortcode tags when Hugo reports parse errors; prefer explicit closing tags. Copy-paste examples live in the **Shortcode gallery** blog post and under `assets/snippets/`, not as inline backticks here.

See the blog post **Shortcode gallery** for live examples and `codesnippet` copy blocks.

## Next

See [Customization](/docs/customization/) for menus and theme options.
