---
title: "ComicHero 主题完整功能与自定义指南"
date: 2026-05-05
description: "从安装、配置、布局、shortcode 参数到封面图与样式修改的完整操作手册。"
tags: ["theme", "hugo", "guide"]
image: "/images/furry-god-thumb.svg"
schema_version: 1
---

这是一篇完整说明文，覆盖本主题的**所有核心功能**与**常见可改项**。

## 1. 站点结构总览

- 主题目录：`themes/comichero/`
- 示例站点：`exampleSite/`
- 配置文件：`exampleSite/hugo.toml`
- 内容目录：`exampleSite/content/`
- 静态资源：`exampleSite/static/`
- 核心样式：`themes/comichero/assets/css/main.css`
- 交互脚本：`themes/comichero/assets/js/theme.js`

## 2. 快速启动

```bash
hugo server --source exampleSite --themesDir .
```

## 3. 全局配置（hugo.toml）

主要可改项在 `params.comichero`：

- `ui.*`：首页标题、副标题、SFX 文案、区块标题
- `ui.labels.*`：分页、标签、TOC、更新时间等文案
- `layout.*`：首页卡片数量、博客标签数量、首页内容类型
- `media.defaultThumbnail`：默认缩略图
- `shortcodeDefaults.panelTitle`：`panel` 默认标题
- `sectionIntro.*`：各 section 默认介绍文案

## 4. 首页与列表页可改内容

### 首页
- 模板：`themes/comichero/layouts/index.html`
- 可调：hero 标题/副标题、最新内容标题、卡片数量、缩略图默认图

### 列表页（blog/docs/series）
- 模板：`themes/comichero/layouts/_default/list.html`
- 可调：标签过滤上限、"All" 文案、Section aria 标签

### 分页
- 模板：`themes/comichero/layouts/partials/pagination.html`
- 可调：上一页/下一页文案、Pagination aria 文案

## 5. 文章封面图与缩略图

每篇文章 front matter 的 `image` 字段可单独设置：

```yaml
image: "/images/your-cover.png"
```

若未设置，则自动回退到：

- `params.comichero.media.defaultThumbnail`

## 6. 代码块功能

支持：
- copy 按钮
- 长代码 expand/collapse
- 语言标签显示
- 与 file shortcode 风格一致的顶部条带

相关文件：
- 样式：`themes/comichero/assets/css/main.css`
- 交互：`themes/comichero/assets/js/theme.js`

## 7. 所有 shortcode 与参数说明

完整自动生成文档：
- `content/docs/shortcodes-generated.md`

常用 shortcodes：
- `panel(title, class)`
- `note(type, title)`
- `grid(cols/size, class)`
- `figure(src, alt, caption, tilt)`
- `video(src, poster, caption)`
- `dialogue-ab(title, aLabel, bLabel, voteKey, class)`
- `toc(class)`
- `cast(name, img, class)` / `cast-lite(name, role, img, detail, class)`
- `codesnippet(path, lang)`
- `file(path, lang, title)`

> 参数详情请以自动生成页为准。

## 8. 如何通过代码修改指定内容

### 改 header 导航
- 文件：`exampleSite/hugo.toml`
- 修改 `[[menus.main]]`

### 改主题色与字体
- 文件：`themes/comichero/assets/css/main.css`
- 修改 `:root` 与 `[data-theme="dark"]` 变量

### 改按钮文案
- 文件：`exampleSite/hugo.toml`
- 修改 `params.comichero.ui.labels.*`

### 改首页最近更新时间文案
- 文件：`exampleSite/hugo.toml`
- `params.comichero.ui.labels.lastUpdated`

## 9. 响应式与布局

- grid shortcode 支持 `size="3x3"` 等形式，自动适配小屏单列
- header 采用 sticky 顶部固定
- footer 使用主容器撑开策略，避免短页漂浮

## 10. 深色模式

- 主题切换按钮在 header 右上
- 支持系统主题跟随与手动切换
- 深色样式主要在 `main.css` 的 `[data-theme="dark"]` 变量区

## 11. 质量门禁与协作流程

### 本地 pre-commit
```bash
git config core.hooksPath .githooks
```

会自动执行：
- `python scripts/validate_frontmatter.py`
- `python scripts/generate_shortcode_docs.py`

### CI
- `.github/workflows/quality-gate.yml`
- push / PR 自动校验 front matter 与资源链接

## 12. 预设配置包（Presets）

可参考：
- `config/presets/minimal.toml`
- `config/presets/comic.toml`
- `config/presets/dark-pro.toml`

将其中配置段复制到 `hugo.toml` 即可。

## 13. 建议改造顺序

1. 先调 `hugo.toml`（文案、卡片数量、默认图）
2. 再调 `main.css` 变量（配色、字号、间距）
3. 最后改模板（index/list/shortcodes）

这样最稳，也最容易回滚。
