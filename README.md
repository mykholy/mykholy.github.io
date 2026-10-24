# Ahmed Elkholy — Engineering Portfolio

Personal engineering portfolio, live at **https://mykholy.github.io/**.

This site presents selected Laravel, Shopify, Filament, payments, SaaS, commerce, AI/media and EdTech work with engineering context rather than feature lists. Project artwork is illustrative, not screenshots of production software.

## Site structure

- `index.html` — semantic page markup, SEO metadata, structured data and content sections
- `assets/css/site.css` — responsive styling, dark visual system, accessible focus and reduced-motion treatment
- `assets/js/site.js` — project catalog, English/Arabic translations, keyboard-accessible dialogs and UI interactions
- `assets/images/` — optimized WebP illustrations for projects and hero sections
- `Ahmed_Elkholy_CV_Senior_Backend_Laravel_Master_2026-10-14.pdf` — original PDF CV
- `sitemap.xml`, `robots.txt` and `.nojekyll` — static site publishing support

## Features

- 17 selected projects with category filtering and details about **role, challenge, engineering approach and scope**
- Engineering highlights for commerce reliability, Shopify catalog QA and AI media workflows
- Capability/service descriptions and delivery process for clients
- Responsive desktop, tablet and mobile layouts
- Lightweight scroll reveals, hover cues, progress indicator and `prefers-reduced-motion` support
- English/Arabic toggle with RTL-aware styling
- Native PDF download and direct email / WhatsApp contact links
- Open Graph, Twitter Card, JSON-LD (`Person`, `WebSite`, `ProfilePage`, `ItemList`) and sitemap metadata

## Development

The production site is static HTML/CSS/JavaScript. Generate the localized pages and social cards before previewing changes locally:

```bash
python3 -m pip install Pillow==11.3.0
python3 scripts/build_article_media.py
python3 scripts/build_social_images.py
python3 scripts/build_locale_seo.py
```

Then serve the repository with a static HTTP server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

Update the project data and translations in `assets/js/site.js`, and add new images under `assets/images/`. Keep case-study claims grounded in actual work and never attribute fabricated testimonials or benchmark improvements.

## Publishing

GitHub Pages is configured to publish this user site from `main`. Commits to `main` trigger deployment.

## Contact

- GitHub: https://github.com/mykholy
- LinkedIn: https://www.linkedin.com/in/mykholy
- Email: mykholys30@gmail.com

© 2026 Ahmed Elkholy.

## AI engineering specialization

The portfolio includes a dedicated AI section covering AI product integrations, automation and agent workflows, voice/audio API pipelines (including ElevenLabs), and production AI video/media orchestration. All published project numbers refer to documented work; example use cases are not presented as prior client deployments.

## Analytics and privacy

Google Analytics 4 and Microsoft Clarity use portfolio-specific project IDs and **load only after visitor opt-in**. Search Console owner verification meta is included in the homepage; ownership still needs the Verify action in Google's UI. See [owner setup, events, KPIs and privacy guidance](docs/ANALYTICS.md). The public [privacy page](privacy.html) explains what is and is not collected.

## Engineering insights blog and international SEO

Canonical routes have explicit language prefixes: [English portfolio](https://mykholy.github.io/en/), [Arabic portfolio](https://mykholy.github.io/ar/), [English insights](https://mykholy.github.io/en/blog/), and [Arabic insights](https://mykholy.github.io/ar/blog/). Each article has one route per language: `/en/blog/{slug}/` and `/ar/blog/{slug}/`. Legacy `/blog/...` URLs redirect to the canonical equivalents; the shared locale-switch control preserves the article topic.

The library contains **200 bilingual topics (400 localized articles)**. Currently **53 topics are approved for search indexing** and **147 require content/editorial review**; those unreviewed articles intentionally retain `noindex,follow`. Do not remove their `noindex` directives without confirming substantive topic coverage, original value, accuracy, and proper internal linking.

- `blog/articles.json` — source metadata, topics and editorial status
- `scripts/build_article_media.py` — verified artwork integration
- `scripts/build_social_images.py` — fixed-size 1200×630 JPEG Open Graph cards
- `scripts/build_locale_seo.py` — pre-rendered locale pages, unique titles/descriptions, social previews, canonical, hreflang, `BlogPosting` structured data, share buttons, RSS and sitemap
- `en/` and `ar/` — generated localized pages
- `sitemap.xml` — only canonical, indexable URLs, with reciprocal locale alternatives
- `en/feed.xml` and `ar/feed.xml` — locale-specific RSS feeds

The displayed publication dates reflect the real original Git publication commits (October 22 and 23, 2026 UTC), **not retroactively invented historical dates**. Search indexing is determined by search engines, not by adding metadata. Use Google Search Console to submit `https://mykholy.github.io/sitemap.xml`, inspect priority URLs, and monitor Coverage, duplicate canonical selection, and Page indexing. The build validates HTML routes and metadata; it does not certify all technical claims or promise immediate search ranking.

Keep examples accurate and explicitly framed as recommendations or architectural illustrations when they are not documented production implementations.

## Service pages, case studies and smaller collections

- Six service offers are available at `/en/services/` and `/ar/services/`.
- Seventeen project case studies are rendered from the existing project facts at `/en/projects/` and `/ar/projects/`.
- Canonical blog listings contain 12 articles per page, with regular HTML pagination. Search and category filters apply to the current page. The complete unreviewed library remains available under `/en/blog/previews/` and `/ar/blog/previews/`; these pages stay `noindex`.
- `blog/arabic-guides.json` contains 50 topic-specific Arabic implementation notes, failure checks and metrics, replacing the old repeated summaries. These published Arabic routes are indexable; the 147 unreviewed topics in each language remain excluded.
- `publishedAt` records the original release. Locale-specific `modifiedAt` records real editorial revisions, without inventing earlier publication dates.
- The sitemap contains only canonical indexable pages (including collection pagination). A regression check rejects `noindex` URLs and broken internal links.
- Live visitor monitoring still starts on page view. The first-party greeting waits while an analytics choice is open, then appears automatically when that choice closes. Analytics remain opt-in.

Run `python3 scripts/build_locale_seo.py` and `python3 scripts/test_portfolio_routes.py` after editing sources. Run `node scripts/smoke_portfolio.mjs` with `puppeteer-core` and `CHROME_PATH` for browser verification. CI also records Lighthouse lab measurements; these do not replace field Core Web Vitals or Search Console indexing reports.
