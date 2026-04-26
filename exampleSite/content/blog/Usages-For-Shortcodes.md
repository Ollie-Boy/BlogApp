+++
title = "What Doodle theme can provide to you"
date = "2024-11-07"
draft = false
description = "My golden fingers."
tags = ["hugo", "perosonalize"]
+++

# blockquote

1. Normal quote:

```go-html-template
{{</* blockquote >}}
  This is a simple quote.
{{< /blockquote */>}}
```

{{< blockquote >}} This is a simple quote. {{< /blockquote >}}

2. Quote with author:

```go-html-template
{{</* blockquote author="`Ollie`" >}}
  This is a quote with only an author named Ollie.
{{< /blockquote */>}}
```

{{< blockquote author="Ollie" >}} This is a quote with only an author named Ollie. {{< /blockquote >}}

3. Quote with author and source:

```go-html-template
{{</* blockquote author="Ollie" source="Source" >}}
  This is a quote from Ollie and source "source."
{{< /blockquote */>}}
```

{{< blockquote author="Ollie" source="Source" >}} This is a quote from Ollie and source "source." {{< /blockquote >}}

4. Quote with author and link:

```go-html-template
{{</* blockquote author="Ollie" link="https://example.com" >}}
  This is a quote from Ollie and links to https://example.com.
{{< /blockquote */>}}
```

{{< blockquote author="Ollie" link="https://example.com" >}} This is a quote from Ollie and links to https://example.com. {{< /blockquote >}}

5. Quote with author, link and title:

```go-html-template
{{</* blockquote author="Ollie" link="https://example.com" title="title" >}}
  This is a quote from Ollie and links to https://example.com with title "title".
{{< /blockquote */>}}
```

{{< blockquote author="Ollie" link="https://example.com" title="title" >}} This is a quote from Ollie and links to https://example.com with title "title". {{< /blockquote >}}

# image gallery

```go-html-template
{{</* image-gallery gallery_dir="/images/Usage For Shortcodes" */>}}
```

{{< image-gallery gallery_dir="/images/Usage For Shortcodes" >}}

# sidenote

```go-html-template
{{</* sidenote `
Some content.
` >}}
This is a sidenote. :smile:
{{< /sidenote */>}}
```

{{< sidenote `Some content.` >}} This is a sidenote. {{< /sidenote >}}

```go-html-template
{{</* sidenote `
Another content.
` left >}}
And sidenote on the left side. :sunglasses:
{{< /sidenote */>}}
```

{{< sidenote `Another content.` left >}} And sidenote on the left side. {{< /sidenote >}}

# audio

```go-html-template
{{</* audio mp3="/audio/bird-sing.mp3" */>}}
{{</* audio mp3="/audio/Voicy_Happy Happy Happy.mp3" */>}}
{{</* audio mp3="/audio/we-wish-you-a-merry-christmas-happy-remix-background-intro-theme-277943.mp3" */>}}
```

{{< audio mp3="/audio/bird-sing.mp3">}}
{{< audio mp3="/audio/Voicy_Happy Happy Happy.mp3" >}}
{{< audio mp3="/audio/we-wish-you-a-merry-christmas-happy-remix-background-intro-theme-277943.mp3" >}}

{{< sidenote `
# collapsible
` left >}} From collapsible to badge, all codes are based on [zwbetz-gh](https://zwbetz.com)'s [papercss-hugo-theme](https://github.com/zwbetz-gh/papercss-hugo-theme), I appreciate. ❤️ {{< /sidenote >}}

```go-html-template
{{</* collapsible "One Layer Collapsible" */>}}
Content here.
{{</* /collapsible */>}}
```

{{< collapsible "One Layer Collapsible" >}} Content here. {{< /collapsible >}}

```go-html-template
{{</* collapsible "A" */>}}
Some contents here.
{{</* /collapsible */>}}
{{</* collapsible "B" */>}}
Other contents here.
{{</* /collapsible */>}}
```

{{< collapsible "A" >}} Some contents here. {{< /collapsible >}}
{{< collapsible "B" >}} Other contents here. {{< /collapsible >}}

# color

{{< color "primary" >}} Primary {{< /color >}}
{{< color "secondary" >}} Secondary {{< /color >}}
{{< color "success" >}} Success {{< /color >}}
{{< color "warning" >}} Warning {{< /color >}}
{{< color "danger" >}} Danger {{< /color >}}
{{< color "muted" >}} Muted {{< /color >}}

# alert

{{< alert >}} Normal {{< /alert >}}
{{< alert "primary" >}} Primary {{< /alert >}}
{{< alert "secondary" >}} Secondary {{< /alert >}}
{{< alert "success" >}} Success {{< /alert >}}
{{< alert "warning" >}} Warning {{< /alert >}}
{{< alert "danger" >}} Danger {{< /alert >}}
{{< alert "muted" >}} Muted {{< /alert >}}

# background

{{< background "primary" >}} Primary {{< /background >}}
{{< background "secondary" >}} Secondary {{< /background >}}
{{< background "success" >}} Success {{< /background >}}
{{< background "warning" >}} Warning {{< /background >}}
{{< background "danger" >}} Danger {{< /background >}}
{{< background "muted" >}} Muted {{< /background >}}

# badge

{{< badge >}}normal{{< /badge >}}
{{< badge "primary" >}}primary{{< /badge >}}
{{< badge "secondary" >}}secondary{{< /badge >}}
{{< badge "success" >}}success{{< /badge >}}
{{< badge "warning" >}}warning{{< /badge >}}
{{< badge "danger" >}}danger{{< /badge >}}
{{< badge "muted" >}}muted{{< /badge >}}

# Emojis

Just look this: https://gohugo.io/quick-reference/emojis/.

# Katex

    Euler's identity: $e^{i\pi} + 1 = 0$

    $$
    \int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
    $$

Euler's identity: $e^{i\pi} + 1 = 0$

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
