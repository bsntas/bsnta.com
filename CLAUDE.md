# bsnta.com — Site Guide for Claude

Personal website of Basanta Sharma (उन्मेशित). Static HTML/CSS/JS — no build step, no framework.

## Structure

```
articles/
  index.html          — master list of all articles (newest first, numbered)
  poems/              — individual poem pages
  essays/             — individual essay pages
assets/               — images, icons, favicon
css/style.css         — single global stylesheet
js/
  nav.js              — injects shared nav & footer
  lang-toggle.js      — bilingual toggle (ne ↔ en)
  main.js             — article list filtering
index.html            — home page
```

## Adding a New Article

### 1. Create the article page

Copy the structure from an existing poem (e.g. `articles/poems/prem-kasto-kathor.html`) or essay. Key rules:

- **Always include an English translation** for Nepali poems/essays using the bilingual `lang-toggle` pattern:
  - Add `data-ne="…" data-en="…"` on the `<h1>` for the title.
  - Wrap Nepali body in `<div class="post-poem nepali" data-lang-content="ne">`.
  - Wrap English body in `<div class="post-poem" data-lang-content="en" hidden>`.
  - Include the lang-toggle buttons and `<script src="../../js/lang-toggle.js"></script>`.
- Set the `<title>` as `{Nepali title} — Basanta Sharma`.
- Set `<meta name="description">` to a one-line excerpt from the poem/essay.

### 2. Update `articles/index.html`

Add the new entry **above the `<!-- Add new articles above this line -->` comment**, incrementing the article number. Always newest first.

```html
<a href="poems/your-slug.html"
   class="article-item" data-type="poem" data-lang="ne">
  <span class="article-num">NN</span>
  <div>
    <div class="article-title nepali">…</div>
    <div class="article-meta">
      <span class="article-tag poem">कविता</span>
      <span class="article-tag lang-ne">नेपाली</span>
      <span class="article-tag translation">Translation</span>
    </div>
    <div class="article-excerpt nepali">…</div>
  </div>
  <span class="article-date">DD Month YYYY</span>
</a>
```

Use `data-type="essay"` and `class="article-tag essay"` for essays. Omit the `translation` tag only if no English translation exists.

### 3. Update `index.html` home page — Recent Reflections

The "Recent Reflections" section in `index.html` always shows the **3 most recent articles** by number. After adding a new article, update that section to replace the oldest entry with the new one. Keep the 3 highest-numbered entries.

```html
<!-- update the article-list block inside the "Recent Reflections" section -->
<a href="articles/poems/your-slug.html" class="article-item" data-type="poem">
  <span class="article-num">NN</span>
  <div>
    <div class="article-title nepali">…</div>
    <div class="article-meta">
      <span class="article-tag poem">कविता</span>
    </div>
    <div class="article-excerpt nepali">…</div>
  </div>
  <span class="article-date">DD Month YYYY</span>
</a>
```

## Dates

Use Nepali numerals for dates in Nepali context: `२ सेप्टेम्बर २०२५`.
Month names: जनवरी फेब्रुअरी मार्च अप्रिल मे जुन जुलाई अगस्त सेप्टेम्बर अक्टोबर नोभेम्बर डिसेम्बर

## Deployment

No build step — push to `main`, the site deploys automatically via Cloudflare Pages (`.gitlab-ci.yml` is vestigial).

## Git Workflow

- Feature branch: `claude/<descriptive-slug>`
- Commit messages in English; poem titles may be Nepali in the subject line.
- Create a PR and merge to `main` when changes are complete.
