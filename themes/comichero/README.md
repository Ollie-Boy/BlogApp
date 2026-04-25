# ComicHero

American comic book style Hugo theme: halftone textures, hard shadows, Bangers-style headlines, and bold CSS motion. Suited for **blogs**, **portfolios**, and **docs** in one site.

## Features

- Home hero with rotating SFX burst, CTA buttons (`menus.hero`)
- Section cards + post grid with staggered “bounce in” animation
- Light/dark `data-theme` with `localStorage` and no-flash boot script
- **Docs** content type uses `layouts/docs/single.html` with table of contents
- Shortcodes: `panel`, `sfx`, `burst`, `speech`, `thought`, `stamp`, `divider`, `aside`, `figure`, `grid`, `spoiler`, `note`, `codesnippet` (escaped source for docs: self-closing `codesnippet` with site-relative `path`, or percent-delimited paired form for raw inner; fenced Markdown code blocks still execute inner shortcodes — see `assets/snippets/codesnippet-usage.txt` in the example site)
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
