---
title: "ComicHero Complete Theme and Customization Guide"
date: 2026-05-05
description: "A beginner-friendly, step-by-step guide for installing, configuring, customizing, and safely editing the ComicHero Hugo theme."
tags: ["theme", "hugo", "guide"]
image: "/images/furry-god-thumb.svg"
schema_version: 1
---

This guide is written for complete beginners. You do not need to understand Hugo, HTML, CSS, or JavaScript before you start. Follow each step in order, copy the example text carefully, save the file, refresh your browser, and compare the result.

If you only remember one rule, remember this: **most site changes should start in `exampleSite/hugo.toml` or in a post file under `exampleSite/content/`.** Only edit theme templates or CSS after you have confirmed that configuration cannot do what you need.

## 1. What each folder is for

Open the project folder and use this map:

| Path | What it means | When you edit it |
| --- | --- | --- |
| `exampleSite/hugo.toml` | The main demo-site settings file. | Change navigation, homepage text, labels, card counts, thumbnails, and theme defaults. |
| `exampleSite/content/` | Your posts, docs, and pages. | Add or edit articles. |
| `exampleSite/static/` | Files copied directly to the final site. | Add images, downloads, icons, or other public files. |
| `exampleSite/static/images/` | The demo site's local image folder. | Replace the sample thumbnail image or add your own local thumbnails. |
| `themes/comichero/` | The theme itself. | Edit layout, shortcodes, CSS, or JavaScript. |
| `themes/comichero/assets/css/main.css` | The main style file. | Change colors, spacing, typography, cards, buttons, and responsive layout. |
| `themes/comichero/assets/js/theme.js` | The main interaction file. | Change copy buttons, theme switching, lightbox, scroll effects, and other browser behavior. |

## 2. Start the site locally

1. Open a terminal in the project root.
2. Run this command:

```bash
hugo server --source exampleSite --themesDir themes
```

3. Open the local URL shown in the terminal, usually:

```text
http://localhost:1313/
```

4. Keep the terminal open while editing files.
5. After each file save, refresh the browser if the page does not update automatically.

## 3. Change the site title, homepage text, and footer text

Open:

```text
exampleSite/hugo.toml
```

Find this area:

```toml
title = "wind in the sky"

[params.comichero]
  heroTitle = "wind in the sky"
  heroSubtitle = "A personal notebook of code, ideas, and small experiments drifting forward one post at a time."
  heroSfx = "KAPOW!"
  latestHeading = "Fresh off the press"
  footerText = "Write light. Ship often. Keep moving with the wind."
```

Change the words inside the quotes. For example:

```toml
title = "My Personal Site"

[params.comichero]
  heroTitle = "My Personal Site"
  heroSubtitle = "Notes, projects, and stories from my desk."
  heroSfx = "BOOM!"
  latestHeading = "Latest posts"
  footerText = "Built with ComicHero and Hugo."
```

Save the file and refresh the browser.

## 4. Change the header navigation

In `exampleSite/hugo.toml`, look for blocks like this:

```toml
[[menus.main]]
  name = "Home"
  url = "/"
  weight = 1
```

Each block is one navigation item.

- `name` is the visible text.
- `url` is the destination.
- `weight` controls order. Smaller numbers appear first.

To add a new link to an external website, add this block:

```toml
[[menus.main]]
  name = "GitHub"
  url = "https://github.com/your-name"
  weight = 99
```

Save and refresh.

## 5. Create a new blog post

Create a new Markdown file in:

```text
exampleSite/content/blog/
```

Example file name:

```text
my-first-post.md
```

Paste this starter content:

```markdown
---
title: "My First Post"
date: 2026-05-10
description: "A short introduction to my new site."
tags: ["personal", "update"]
image: "/images/furry-god-thumb.svg"
schema_version: 1
---

This is my first post.

I can write normal paragraphs, add headings, and include images later.

## A small section

This is another paragraph.
```

Save the file. Then open:

```text
http://localhost:1313/blog/
```

You should see the new post card.

## 6. Edit a post safely

Every post starts with front matter between `---` lines. Example:

```yaml
---
title: "My First Post"
date: 2026-05-10
description: "A short introduction to my new site."
tags: ["personal", "update"]
image: "/images/furry-god-thumb.svg"
schema_version: 1
---
```

Beginner-safe rules:

1. Keep the opening and closing `---` lines.
2. Keep quotes around text when the text contains punctuation.
3. Keep dates in `YYYY-MM-DD` format.
4. Keep tags inside square brackets.
5. Put the article body below the second `---` line.

## 7. Where thumbnails and placeholder images live

The demo posts currently use this local thumbnail:

```text
exampleSite/static/images/furry-god-thumb.svg
```

Because files inside `exampleSite/static/` are copied directly to the site root, that file is referenced in content as:

```yaml
image: "/images/furry-god-thumb.svg"
```

The theme also includes built-in placeholder artwork here:

```text
themes/comichero/assets/images/placeholder-comic.svg
themes/comichero/assets/images/cover-blog-wind.svg
themes/comichero/assets/images/cover-series-arc.svg
```

Use `exampleSite/static/images/` for your own site images. Use `themes/comichero/assets/images/` only when you want to change theme-provided artwork.

## 8. Replace a post thumbnail with a local image

1. Copy your image into:

```text
exampleSite/static/images/
```

2. Example file name:

```text
my-cover.jpg
```

3. Open the post file.
4. Change the `image` field:

```yaml
image: "/images/my-cover.jpg"
```

5. Save and refresh the blog list page.

## 9. Replace a post thumbnail with an external image URL

You can also use a full image URL instead of a local file.

Example:

```yaml
image: "https://example.com/my-cover.jpg"
```

This is useful when your image is already hosted on another service. Make sure the URL opens directly to an image file in your browser.

## 10. Change the default thumbnail for posts without an image

Open:

```text
exampleSite/hugo.toml
```

Find:

```toml
[params.comichero.media]
  defaultThumbnail = "/images/furry-god-thumb.svg"
```

Change it to a local image:

```toml
[params.comichero.media]
  defaultThumbnail = "/images/my-default-cover.jpg"
```

Or change it to an external image URL:

```toml
[params.comichero.media]
  defaultThumbnail = "https://example.com/default-cover.jpg"
```

Any post without its own `image` value will use this default.

## 11. Change light and dark theme behavior

ComicHero can choose the theme from local time.

In `exampleSite/hugo.toml`, use:

```toml
[params.comichero]
  defaultTheme = "auto"
```

With the current site script, automatic mode uses your computer's local clock:

- 7:00 AM through 6:59 PM uses light mode.
- 7:00 PM through 6:59 AM uses dark mode.

If you click the theme button in the header, that manual choice is saved. To return to automatic mode, clear the browser site's local storage or remove these keys in DevTools:

```text
comichero-theme
comichero-theme-mode
```

## 12. Change colors without knowing CSS deeply

Open:

```text
themes/comichero/assets/css/main.css
```

Near the top, look for `:root`. It contains many theme variables. A variable looks like this:

```css
--accent: #f03e4d;
```

To change the main red accent to blue, change only the color value:

```css
--accent: #228be6;
```

Save, then refresh. If you do not like the result, undo the change and save again.

## 13. Change dark-mode colors

In the same CSS file, search for:

```css
[data-theme="dark"]
```

Values inside that block are used in dark mode. Change one color at a time, save, and refresh.

## 14. Use a simple shortcode

Shortcodes are small content blocks that you place inside Markdown.

Example note:

```markdown
{{</* note title="Tip" */>}}
Save your file before refreshing the browser.
{{</* /note */>}}
```

Example button:

```markdown
{{</* button href="/blog/" label="Read the blog" */>}}
```

Example figure:

```markdown
{{</* figure src="/images/my-cover.jpg" alt="My cover image" caption="A custom image." */>}}
```

## 15. Find all shortcode examples

Open:

```text
exampleSite/content/blog/shortcode-showcase.md
```

This page demonstrates the shortcode set. You can copy a block, paste it into your own post, and edit the words.

For parameter details, open:

```text
exampleSite/content/docs/shortcode-params.md
```

## 16. Change the number of homepage cards

Open:

```text
exampleSite/hugo.toml
```

Find:

```toml
[params.comichero.layout]
  homeCardLimit = 6
```

Change `6` to another number:

```toml
[params.comichero.layout]
  homeCardLimit = 9
```

Save and refresh the homepage.

## 17. Change list-page introductions

Open:

```text
exampleSite/hugo.toml
```

Find:

```toml
[params.comichero.sectionIntro]
  blog = "Browse the latest posts — this is where I share coding notes, life updates, and new experiments."
```

Change the text inside quotes. This controls the intro text on section list pages.

## 18. Keep everything on the public website in English

The demo site is intended to render English text. When adding content:

- Use English `title` and `description` values.
- Use English navigation names in `hugo.toml`.
- Use English shortcode labels such as `label`, `title`, `aLabel`, and `bLabel`.
- Use English image alt text.

This keeps the final generated website consistent even if internal planning notes or Git commit messages use another language.

## 19. Run basic checks before publishing

From the project root, run:

```bash
npm run format:check
```

Then run:

```bash
hugo --source exampleSite --themesDir themes --printPathWarnings --printUnusedTemplates
```

If both commands finish without errors, the site is in better shape for publishing.

## 20. Recommended beginner workflow

Use this order every time:

1. Start the local server.
2. Edit only one file.
3. Save.
4. Refresh the browser.
5. Confirm the change worked.
6. If it worked, continue.
7. If it failed, undo the last edit and try a smaller change.

This slow workflow is the fastest way to avoid breaking the site when you are still learning.

## 21. Common beginner errors and fixes

### The page does not update after I save

Try these steps in order:

1. Confirm the terminal running `hugo server` is still open.
2. Look for an error message in the terminal.
3. Refresh the browser manually.
4. Hard refresh the browser with `Ctrl + F5` on Windows or `Cmd + Shift + R` on macOS.
5. Confirm you edited a file inside `exampleSite/` or `themes/comichero/`.

### The site shows a blank page

This usually means one of these things happened:

- A quote is missing in `hugo.toml`.
- A front matter block is missing one of the `---` lines.
- A shortcode was opened but not closed.
- A local image path points to a file that does not exist.

Undo the last change, save, and refresh. If the site returns, redo the change more slowly.

### My image does not show

Check these rules:

- Local images should usually go in `exampleSite/static/images/`.
- A local image path should look like `/images/my-image.jpg`.
- A remote image path should start with `https://` or `http://`.
- File names are case-sensitive on many hosting providers.

## 22. Back up before editing

Before a large edit, make a copy of the file.

Example:

```text
Theme-Complete-Guide.md
Theme-Complete-Guide.backup.md
```

A simple beginner workflow is:

1. Copy the file.
2. Edit the original.
3. Save and refresh.
4. If the page breaks, compare the original with the backup.
5. Restore the backup if needed.

If you use Git, run this before editing:

```bash
git status
```

Then run this after your edit works:

```bash
git add .
git commit -m "Update site content"
```

## 23. Publish to GitHub Pages

This is the beginner version of the GitHub Pages workflow.

1. Create a GitHub repository.
2. Push this project to that repository.
3. Build the site with Hugo.
4. Publish the generated `public/` folder.

A common command is:

```bash
hugo --source exampleSite --themesDir themes --destination public
```

Then configure GitHub Pages to serve the branch or folder that contains the generated site.

If you use GitHub Actions later, create a workflow that installs Hugo, runs the build command, and deploys the output.

## 24. Bind a custom domain

After GitHub Pages works:

1. Buy or choose your domain.
2. Open the domain DNS settings.
3. Add the DNS records required by your host.
4. In GitHub Pages settings, enter the custom domain.
5. Wait for DNS propagation.
6. Enable HTTPS when GitHub allows it.

Then update the site `baseURL` in `exampleSite/hugo.toml`:

```toml
baseURL = "https://www.example.com/"
```

Replace `https://www.example.com/` with your real domain.

## 25. Replace the logo text

The header logo currently uses the site title. To change the text, open:

```text
exampleSite/hugo.toml
```

Change:

```toml
title = "wind in the sky"
```

To:

```toml
title = "My New Site"
```

Save and refresh.

If you want an image logo instead of text, edit:

```text
themes/comichero/layouts/partials/header.html
```

Replace the logo link content with an image tag. Keep the link itself so users can click the logo to return home.

## 26. Change fonts

The safest method is to change the Google Fonts URL in:

```text
exampleSite/hugo.toml
```

Find:

```toml
googleFontsUrl = "https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&display=swap"
```

Replace it with a URL from Google Fonts.

Then open:

```text
themes/comichero/assets/css/main.css
```

Find the font variables near the top and update the font family names.

## 27. Restore default settings

If a configuration edit breaks the site:

1. Open `exampleSite/hugo.toml`.
2. Undo the last edited section.
3. Save.
4. Refresh the browser.

If a CSS edit breaks the design:

1. Open `themes/comichero/assets/css/main.css`.
2. Undo only the last change.
3. Save.
4. Run `npm run format:check`.

If a content edit breaks one post:

1. Open that post file.
2. Check the front matter.
3. Check shortcodes.
4. Check image paths.

## 28. Minimal safe configuration checklist

If you want the smallest safe customization, edit only these values:

```toml
title = "My Site"

[params]
  description = "My site description."
  og_image = "/images/my-default-cover.jpg"

[params.comichero]
  defaultTheme = "auto"
  heroTitle = "My Site"
  heroSubtitle = "My short homepage message."
  heroSfx = "BOOM!"
  latestHeading = "Latest posts"
  footerText = "Built with ComicHero."
  defaultThumbnail = "/images/my-default-cover.jpg"
```

Do not edit templates until this checklist works.

## 29. Full copy-paste configuration template

You can use this as a starting point. Replace only the words inside quotes.

```toml
baseURL = "https://www.example.com/"
languageCode = "en-us"
title = "My Site"
theme = "comichero"
themesDir = "../themes"

[params]
  description = "A short description of my site."
  og_image = "/images/default-cover.jpg"

[taxonomies]
  tag = "tags"
  series = "series"

[params.comichero]
  defaultTheme = "auto"
  googleFontsUrl = "https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&display=swap"
  useLocalFonts = true
  heroTitle = "My Site"
  heroSubtitle = "My homepage subtitle."
  heroSfx = "BOOM!"
  latestHeading = "Latest posts"
  footerText = "Built with ComicHero."
  homeTypes = ["blog"]
  searchPlaceholder = "Search posts, docs, and series..."
  defaultThumbnail = "/images/default-cover.jpg"
  homeCardLimit = 6
  blogTagLimit = 8

  [params.comichero.media]
  defaultThumbnail = "/images/default-cover.jpg"

  [params.comichero.features]
  dynamicBackground = true
  backgroundIntensity = 1.0
  reducedMotionFallback = true
  linkInkHover = true
  heroHalftone = true
  heroClouds = true
  heroSfxEasterEgg = true
  featuredPost = true
  cardReadingMeta = true
  cardTags = true
  cardStickers = true
  tocCollapse = true
  archiveStats = true
  archiveHeatmap = true
  lightboxCaptions = true
  lightboxThumbnails = true
  footerYear = true
  featureFlags = true
```

## 30. Use the shortcode showcase filter and scratchpad

Open:

```text
exampleSite/content/blog/shortcode-showcase.md
```

On the rendered page, use the filter box to find a shortcode by name, such as:

```text
panel
figure
video
dialogue
grid
```

The scratchpad lets you draft shortcode text before copying it into a real post. The preview shows the exact shortcode text you should paste. Hugo renders the real shortcode after you save the Markdown file and refresh the site.
