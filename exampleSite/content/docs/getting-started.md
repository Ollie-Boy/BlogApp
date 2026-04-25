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
- **codesnippet** — escaped source from a `path` param (site-relative) or from raw percent-delimited inner content

See the blog post **Shortcode gallery** for live examples and `codesnippet` copy blocks.

## Next

See [Customization](/docs/customization/) for menus and motion.
