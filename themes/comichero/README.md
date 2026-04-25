# ComicHero

American comic book style Hugo theme: hard shadows, Bangers-style headlines, and bold CSS animations. Suited for **blogs**, **portfolios**, and **docs** in one site.

## Features

- Home hero with rotating SFX burst, CTA buttons (`menus.hero`)
- Section cards + post grid with staggered “bounce in” animation
- Light/dark `data-theme` with `localStorage` and no-flash boot script
- **Docs** content type uses `layouts/docs/single.html` with table of contents
- Shortcodes: `panel`, `sfx`, `burst`, `speech`, `thought`, `stamp`, `divider`, `aside`, `figure`, `grid`, `spoiler`, `note`, `video`, `pullquote`, `steps`, `compare`, `file`, `button`, `toc`, `codesnippet`, `cast`, `soundboard`, `chapter` (see Shortcode gallery; avoid putting `{{< … >}}` inside Markdown code fences — Hugo still runs them)
- **Series** taxonomy + `/series/` term pages; blog footer **next / prev / random** when `series` is set in front matter
- **Header:** reading **progress** bar; **back to top** with speed-line overlay on click
- **SEO / share:** `partials/head-meta.html` — Open Graph, Twitter card, JSON-LD (`BlogPosting` / `WebSite`); set `params.og_image` or `params.comichero.og_image`, or per-page `image` / `og_image`
- Fonts: `@font-face` from theme `static/fonts/` plus optional Google Fonts link in config

## Use in your site

1. Copy `themes/comichero` into your Hugo project (or submodule).
2. In `hugo.toml` / `config.toml`:

```toml
theme = "comichero"
```

3. Optional params:

```toml
[params.comichero]
  defaultTheme = "light" # or "dark"
  googleFontsUrl = "https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&display=swap"
  heroTitle = "Your site"
  heroSubtitle = "Tagline here"
  heroSfx = "POW!"
  latestHeading = "Latest"
  footerText = "© you"
  homeTypes = ["blog", "portfolio"]
  og_image = "/images/og-default.png"  # optional default social image (absURL in meta)
```

4. Menus: `menus.main`, `menus.footer`, `menus.hero`.

## Demo

From repository root:

```bash
hugo server --source exampleSite --themesDir themes
```

Or from `exampleSite` if `themesDir` points at the folder that contains `comichero`:

```bash
cd exampleSite && hugo server --themesDir ../themes
```

## License

MIT — see `LICENSE` in this theme directory.
