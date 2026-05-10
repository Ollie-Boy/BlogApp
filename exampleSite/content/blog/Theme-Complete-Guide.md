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
