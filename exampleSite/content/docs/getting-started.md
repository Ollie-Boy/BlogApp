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

- `{{< sfx text="POW!" >}}` — inline sound-effect badge  
- `{{< burst text="BAM!" >}}` — centered burst  
- `{{< panel title="Note" >}}` ... `{{< /panel >}}` — bordered panel  

## Next

See [Customization](/docs/customization/) for menus and motion.
