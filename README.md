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

No build tools are required. To preview locally, serve the repository with a static HTTP server such as:

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

## Engineering insights blog

The site publishes **50 standalone practical articles** under [Insights](https://mykholy.github.io/blog/) about AI automation, Voice AI, commerce, RAG, Laravel architecture, and sector-specific workflows. Articles have canonical URLs, `BlogPosting` structured data, related reading and consultation links. The index supports client-side search and categories while remaining readable without JavaScript.

- `blog/index.html` — article discovery
- `blog/*/index.html` — 50 crawlable articles
- `blog/articles.json` — metadata manifest
- `assets/css/blog.css` and `assets/js/blog.js` — accessible responsive UI

The blog text includes AI-assisted editorial drafting and illustrative workflows. It does not claim that every sector example has been deployed for a client. Review and update technical examples as provider capabilities change.
