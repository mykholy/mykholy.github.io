#!/usr/bin/env python3
"""Build stable, locale-specific portfolio and article pages for GitHub Pages.

Existing /blog/ paths remain as legacy entry points. Canonical pages live under
/en/ and /ar/, and each share card is rendered in HTML for social crawlers.
Publication timestamps are taken from the original publication commits, not
manufactured staggered dates. Unreviewed articles remain noindex.
"""
from __future__ import annotations

import html
import json
import re
import urllib.parse
from pathlib import Path
from datetime import datetime, timezone
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://mykholy.github.io"
CATALOG = json.loads((ROOT / "blog/articles.json").read_text(encoding="utf8"))
FIRST_RELEASE = "2026-10-22T23:54:00Z"
LIBRARY_RELEASE = "2026-10-23T00:30:41Z"
LAST_REVISED = "2026-10-24"
XMLNS = "http://www.sitemaps.org/schemas/sitemap/0.9"
XHTML = "http://www.w3.org/1999/xhtml"
ET.register_namespace("", XMLNS)
ET.register_namespace("xhtml", XHTML)



def publication_metadata(item: dict, index: int, lang: str = 'en') -> tuple[str, str, str]:
    """Use explicit per-article UTC dates when provided. Fall back to real
    historical batch-publication timestamps; do not invent unique dates.
    """
    original = item.get('publishedAt') or (FIRST_RELEASE if index < 50 else LIBRARY_RELEASE)
    changed = item.get('modifiedAt') or original

    def parse(value: str) -> datetime:
        instant = datetime.fromisoformat(str(value).replace('Z', '+00:00'))
        if instant.tzinfo is None:
            raise ValueError('Article timestamp requires timezone: ' + str(value))
        return instant.astimezone(timezone.utc)

    published = parse(original)
    modified = parse(changed)
    if modified < published:
        raise ValueError('modifiedAt precedes publishedAt: ' + item['slug'])
    months_en = ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
    months_ar = ('يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر')
    if lang == 'ar':
        display = f'{published.day} {months_ar[published.month - 1]} {published.year}'
        display = display.translate(str.maketrans('0123456789', '٠١٢٣٤٥٦٧٨٩'))
    else:
        display = f'{published.day} {months_en[published.month - 1]} {published.year}'
    return published.strftime('%Y-%m-%dT%H:%M:%SZ'), modified.strftime('%Y-%m-%dT%H:%M:%SZ'), display + ' (UTC)'


def put(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists() or path.read_text(encoding="utf8") != content:
        path.write_text(content, encoding="utf8")


def clean_legacy_marker(source: str) -> str:
    return re.sub(r'<script data-locale-redirect>.*?</script>', '', source, flags=re.S)


def escape(value: object) -> str:
    return html.escape(str(value), quote=True)


def url_for(lang: str, slug: str | None = None) -> str:
    return ORIGIN + "/" + lang + ("/blog/" + slug + "/" if slug else "/blog/")


def locale_path(lang: str, slug: str | None = None) -> str:
    return "/" + lang + ("/blog/" + slug + "/" if slug else "/blog/")


def translate_url(url: str, lang: str) -> str:
    """Translate existing article/internal portfolio URLs to canonical locale paths."""
    if url.startswith(ORIGIN + "/blog/ar/"):
        return ORIGIN + "/ar/blog/" + url[len(ORIGIN + "/blog/ar/"):]
    if url.startswith(ORIGIN + "/blog/"):
        return ORIGIN + "/" + lang + "/blog/" + url[len(ORIGIN + "/blog/"):]
    if url.startswith("/blog/ar/"):
        return "/ar/blog/" + url[len("/blog/ar/"):]
    if url.startswith("/blog/"):
        return "/" + lang + "/blog/" + url[len("/blog/"):]
    if url.startswith("/#"):
        return "/" + lang + "/" + url[1:]
    if url == "/":
        return "/" + lang + "/"
    return url


def rewrite_links(source: str, lang: str) -> str:
    return re.sub(r'(href=")([^"]+)(")', lambda m: m[1] + escape(translate_url(html.unescape(m[2]), lang)) + m[3], source)


def head_metadata(source: str, title: str, description: str, page: str, lang: str,
                  image: str, kind: str, schema: dict, published: str | None = None,
                  modified: str | None = None) -> str:
    """Replace, never stack, crawling and social metadata in static HTML."""
    pattern = r'(<head\b[^>]*>)(.*?)(</head>)'
    found = re.search(pattern, source, flags=re.I | re.S)
    if not found:
        raise ValueError("Missing head for " + page)
    head = found[2]
    # Strip metadata owned by this build step so reruns remain idempotent.
    head = re.sub(r'<title\b[^>]*>.*?</title>', '', head, flags=re.I | re.S)
    head = re.sub(r'<meta\b(?=[^>]*\b(?:name|property)="(?:description|author|twitter:[^"]+|og:[^"]+|article:[^"]+)")[^>]*>', '', head, flags=re.I)
    head = re.sub(r'<link\b(?=[^>]*\brel="(?:canonical|alternate)")[^>]*>', '', head, flags=re.I)
    head = re.sub(r'<script\b[^>]*type="application/ld\+json"[^>]*>.*?</script>', '', head, flags=re.I | re.S)
    head = clean_legacy_marker(head)
    alternate_en = page.replace('/ar/', '/en/') if '/ar/' in page else page
    alternate_ar = page.replace('/en/', '/ar/') if '/en/' in page else page
    fullimage = image if image.startswith("https://") else ORIGIN + image
    robots = 'index,follow,max-image-preview:large'
    if re.search(r'<meta\s+name="robots"\s+content="noindex', head):
        robots = 'noindex,follow'
    head = re.sub(r'<meta\s+name="robots"[^>]*>', '', head, flags=re.I)
    x = [
        "<title>" + escape(title) + "</title>",
        '<meta name="description" content="' + escape(description) + '">',
        '<meta name="author" content="Ahmed Elkholy">',
        '<meta name="robots" content="' + robots + '">',
        '<link rel="canonical" href="' + escape(page) + '">',
        '<link rel="alternate" hreflang="en" href="' + escape(alternate_en) + '">',
        '<link rel="alternate" hreflang="ar" href="' + escape(alternate_ar) + '">',
        '<link rel="alternate" hreflang="x-default" href="' + escape(alternate_en) + '">',
        '<meta property="og:type" content="' + kind + '">',
        '<meta property="og:site_name" content="Ahmed Elkholy | Engineering Portfolio">',
        '<meta property="og:locale" content="' + ("ar_AR" if lang == "ar" else "en_US") + '">',
        '<meta property="og:title" content="' + escape(title) + '">',
        '<meta property="og:description" content="' + escape(description) + '">',
        '<meta property="og:url" content="' + escape(page) + '">',
        '<meta property="og:image" content="' + escape(fullimage) + '">',
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        '<meta property="og:image:alt" content="' + escape(title) + '">',
        '<meta name="twitter:card" content="summary_large_image">',
        '<meta name="twitter:title" content="' + escape(title) + '">',
        '<meta name="twitter:description" content="' + escape(description) + '">',
        '<meta name="twitter:image" content="' + escape(fullimage) + '">',
        '<meta name="twitter:image:alt" content="' + escape(title) + '">',
    ]
    if published:
        x.extend([
            '<meta property="article:published_time" content="' + published + '">',
            '<meta property="article:modified_time" content="' + (modified or published or LAST_REVISED) + '">',
            '<meta property="article:author" content="' + ORIGIN + '/en/">',
        ])
    if kind != 'article':
        x.append('<link rel="alternate" type="application/rss+xml" title="' + ('مقالات أحمد الخولي' if lang == 'ar' else 'Ahmed Elkholy Engineering Insights') + '" href="/' + lang + '/feed.xml">')
    x.append('<script type="application/ld+json">' + json.dumps(schema, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c') + '</script>')
    newhead = head + "\n" + "\n".join(x) + "\n"
    return source[:found.start()] + found[1] + newhead + found[3] + source[found.end():]


def share_markup(lang: str, title: str, absolute_url: str) -> str:
    q = urllib.parse.quote
    u = q(absolute_url, safe='')
    t = q(title, safe='')
    links = [
        ("WhatsApp", "https://api.whatsapp.com/send?text=" + q(title + " " + absolute_url, safe='')),
        ("Telegram", "https://t.me/share/url?url=" + u + "&text=" + t),
        ("X", "https://twitter.com/intent/tweet?url=" + u + "&text=" + t),
        ("Facebook", "https://www.facebook.com/sharer/sharer.php?u=" + u),
        ("LinkedIn", "https://www.linkedin.com/sharing/share-offsite/?url=" + u),
    ]
    label = "شارك المقال" if lang == "ar" else "Share this article"
    copy = "نسخ الرابط" if lang == "ar" else "Copy link"
    rendered = ''.join('<a href="' + escape(url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + escape(label + " on " + platform) + '">' + platform + '</a>' for platform, url in links)
    return '<nav class="article-share" aria-label="' + escape(label) + '"><strong>' + escape(label) + '</strong><div>' + rendered + '<button type="button" data-copy-article="' + escape(absolute_url) + '">' + copy + '</button></div><span class="share-status" role="status" aria-live="polite"></span></nav>'


def responsive_article_thumbs(markup: str) -> str:
    """Use a source image that matches the viewport; preserve the existing image for Retina screens."""
    def update(match: re.Match) -> str:
        tag = match[0]
        if ('home-insight-image' not in tag and 'editorial-thumb' not in tag) or 'srcset=' in tag:
            return tag
        source = re.search(r'src="(/assets/images/articles/)([^"]+)-thumb.webp"', tag)
        if not source:
            return tag
        prefix, theme = source.group(1), source.group(2)
        sizes = '(max-width: 700px) 94vw, (max-width: 1100px) 48vw, 33vw'
        images = (prefix + theme + '-small.webp 420w, ' + prefix + theme + '-thumb.webp 680w')
        return tag.replace(source[0], source[0] + ' srcset="' + images + '" sizes="' + sizes + '"', 1)
    return re.sub(r'<img\b[^>]*>', update, markup)


def process_article(item: dict, index: int, lang: str) -> str:
    slug = item["slug"]
    path = ROOT / "blog" / ("ar/" if lang == "ar" else "") / slug / "index.html"
    source = clean_legacy_marker(path.read_text(encoding="utf8"))
    title = item["arTitle"] if lang == "ar" else item["title"]
    # Prefer the source's actual editorial title over the catalog label.
    h1 = re.search(r'<h1\b[^>]*>(.*?)</h1>', source, re.S | re.I)
    if h1:
        title = html.unescape(re.sub(r'<[^>]+>', '', h1[1])).strip() or title
    desc = item.get("arSummary" if lang == "ar" else "summary", "")
    orig_desc = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', source)
    if orig_desc and len(html.unescape(orig_desc[1])) > 45:
        desc = html.unescape(orig_desc[1])
    desc = re.sub(r'\s+', ' ', desc).strip()[:225]
    page = url_for(lang, slug)
    pic = re.search(r'<figure\b[^>]*class="article-hero-visual"[^>]*>.*?<img\b[^>]*src="([^"]+)"', source, re.S)
    if pic:
        image = html.unescape(pic[1])
    else:
        img = re.search(r'<meta\s+property="og:image"\s+content="([^"]+)"', source)
        image = html.unescape(img[1]) if img else "/assets/portfolio-social.webp"
    if image.startswith("/assets/images/articles/") and image.endswith("-hero.webp"):
        target = ROOT / image.lstrip("/")
        if not target.exists() or target.stat().st_size < 1024:
            source = source.replace(image, "/assets/images/articles/ai-architecture-hero.webp")
            image = "/assets/images/articles/ai-architecture-hero.webp"
    sharing_image = image.replace("-hero.webp", "-share.jpg") if image.endswith("-hero.webp") else "/assets/portfolio-social.jpg"
    source = source.replace("AI-generated concept illustration, not a production-system screenshot.", "Illustration of the engineering concept.")
    source = source.replace("تصميم توضيحي بالذكاء الاصطناعي، وليس لقطة شاشة من نظام حقيقي.", "رسم توضيحي للفكرة الهندسية.")
    source = source.replace(" — AI-generated editorial illustration", " — engineering illustration")
    source = source.replace(" — رسم توضيحي بالذكاء الاصطناعي", " — رسم هندسي توضيحي")
    published, modified, display_date = publication_metadata(item, index, lang)
    schema = {
        "@context": "https://schema.org", "@type": "BlogPosting", "@id": page + "#article",
        "mainEntityOfPage": {"@type": "WebPage", "@id": page},
        "headline": title, "description": desc, "url": page,
        "datePublished": published, "dateModified": modified,
        "inLanguage": lang, "articleSection": item.get("category", ""),
        "author": {"@type": "Person", "@id": ORIGIN + "/#person", "name": "Ahmed Elkholy", "url": ORIGIN + "/en/"},
        "publisher": {"@type": "Person", "name": "Ahmed Elkholy", "url": ORIGIN + "/en/"},
        "image": [ORIGIN + sharing_image],
    }
    source = rewrite_links(source, lang)
    source = re.sub(r'<p class="editorial">\s*Transparency:.*?</p>', '', source, flags=re.S | re.I)
    # Strip editorial numbering if previously baked into any article template.
    source = re.sub(r'<span>\s*\d{1,3}\s*/\s*200\s*</span>', '', source)
    source = re.sub(r'<nav class="article-share".*?</nav>', '', source, flags=re.S)
    byline = '<p class="byline">' + ("أحمد الخولي · نُشر " if lang == "ar" else "Ahmed Elkholy · Published ") + '<time datetime="' + published + '">' + display_date + '</time></p>'
    if re.search(r'<p class="byline">.*?</p>', source, flags=re.S):
        source = re.sub(r'<p class="byline">.*?</p>', lambda _m: byline + share_markup(lang, title, page), source, count=1, flags=re.S)
    else:
        source = source.replace('</header>', byline + share_markup(lang, title, page) + '</header>', 1)
    if "</nav>" in source:
        head, body = source.split("</nav>", 1)
        other = 'ar' if lang == 'en' else 'en'
        label = 'العربية' if lang == 'en' else 'English'
        if locale_path(other, slug) not in head:
            head += '<a class="locale-switch" lang="' + other + '" href="' + locale_path(other, slug) + '" hreflang="' + other + '">' + label + '</a>'
        source = head + "</nav>" + body
    source = source.replace('</body>', '<script src="/assets/js/blog.js" defer></script></body>')
    source = head_metadata(source, title + (" | أحمد الخولي" if lang == "ar" else " | Ahmed Elkholy"), desc,
                           page, lang, sharing_image, "article", schema, published, modified)
    source = re.sub(r'<html\s+lang="[^"]+"', '<html lang="' + lang + '"', source, count=1)
    if lang == "ar":
        source = source.replace('<html lang="ar">', '<html lang="ar" dir="rtl">', 1)
    return source


def process_index(lang: str) -> str:
    path = ROOT / 'blog' / ('ar/' if lang == 'ar' else '') / 'index.html'
    s = clean_legacy_marker(path.read_text(encoding="utf8"))
    s = rewrite_links(s, lang)
    s = re.sub(r'(src="/assets/images/articles/)([^"]+)(-thumb.webp")',
               lambda m: (m[1] + "ai-architecture" + m[3])
               if (ROOT / "assets/images/articles" / (m[2] + "-thumb.webp")).stat().st_size < 1024 else m[0], s)
    s = responsive_article_thumbs(s)
    s = re.sub(r'<span>\s*\d{1,3}\s*/\s*200\s*</span>', '', s)
    # Publication metadata in the listing uses original publication commits in UTC.
    for i, item in enumerate(CATALOG):
        slug = item['slug']
        published, _modified, display = publication_metadata(item, i, lang)
        # The source template can contain stale editorial-status attributes.
        # The catalog is authoritative, so only reviewed pieces are marked published.
        open_card = re.compile(r'(<article class="blogcard[^"]*"[^>]*\bdata-review=")[^"]+("[^>]*><a href="/' +
                               lang + r'/blog/' + re.escape(slug) + r'/")')
        s = open_card.sub(lambda m: m[1] + ('published' if item.get('status') == 'published' else 'review') + m[2], s, count=1)
        card = re.compile(r'(<article class="blogcard[^"]*"[^>]*><a href="/' + lang + r'/blog/' + re.escape(slug) + r'/".*?<div class="cardfoot">)(.*?)(</div>)', re.S)
        s = card.sub(lambda m: m[1] + '<time datetime="' + published + '">' + display + '</time><b>' + ('اقرأ المقال ↗' if lang == 'ar' else 'Read article ↗') + '</b>' + m[3], s, count=1)
    total_published = sum(item.get('status') == 'published' for item in CATALOG)
    total_review = len(CATALOG) - total_published
    summary = (f'{total_published} مقال منشور · {total_review} موضوع قيد المراجعة وغير مفهرس'
               if lang == 'ar' else
               f'{total_published} published articles · {total_review} editorial previews (not indexed)')
    s = re.sub(r'(<h2>[^<]*(?:200|٢٠٠)[^<]*</h2>)',
               lambda m: m[1] + '<p class="publication-note">' + summary + '</p>',
               s, count=1)
    # Rewrite editor picks and search results without serial counting.
    s = re.sub(r'<p id="blogCount"[^>]*>.*?</p>', '<p id="blogCount" aria-live="polite"></p>', s, count=1, flags=re.S)
    title = 'مقالات هندسة البرمجيات وLaravel وأتمتة AI | أحمد الخولي' if lang == 'ar' else 'Laravel, AI Automation & Backend Engineering Articles | Ahmed Elkholy'
    desc = 'مقالات عملية عن Laravel وهندسة الأنظمة والأتمتة والذكاء الاصطناعي والأمان والتكاملات، باللغة العربية.' if lang == 'ar' else 'Practical articles on Laravel, API architecture, AI automation, payment reliability, SaaS and secure integrations.'
    page = url_for(lang)
    schema = {"@context": "https://schema.org", "@type": "CollectionPage", "@id": page + "#articles",
              "url": page, "name": title, "description": desc, "inLanguage": lang,
              "author": {"@type": "Person", "@id": ORIGIN + "/#person", "name": "Ahmed Elkholy"}}
    s = head_metadata(s, title, desc, page, lang, '/assets/portfolio-social.jpg', 'website', schema)
    return s


def localized_home_copy(page: str, lang: str) -> str:
    """Pre-render translated content instead of relying only on client JavaScript."""
    if lang != 'ar':
        return page
    import subprocess
    javascript = r"""
const fs = require('fs'), vm = require('vm');
const code = fs.readFileSync('assets/js/site.js', 'utf8');
const start = code.indexOf('const i18n={') + 'const i18n='.length;
const end = code.indexOf(';\n    // The language dictionaries', start);
if (end < 0) throw new Error('Cannot find translation dictionary');
const dict = vm.runInNewContext('(' + code.slice(start,end) + ')');
const patchStart = code.indexOf('Object.assign(i18n.en', end);
const patchEnd = code.indexOf("let lang=", patchStart);
vm.runInNewContext(code.slice(patchStart,patchEnd), {i18n:dict});
process.stdout.write(JSON.stringify(dict.ar));
"""
    translations = json.loads(subprocess.check_output(['node', '-e', javascript], cwd=ROOT, text=True))
    pattern = re.compile(r'(<(?P<tag>span|a|h1|h2|h3|p|small|div|button|label|li)\b[^>]*\bdata-i18n(?:-html)?="(?P<key>[^"]+)"[^>]*>)(?P<content>.*?)(</(?P=tag)>)', re.S | re.I)
    def apply(match: re.Match) -> str:
        replacement = translations.get(match['key'])
        if replacement is None or re.search(r'<\s*' + match['tag'] + r'\b', match['content'], re.I):
            return match[0]
        # Values are trusted translations from our own committed JavaScript.
        rendered = str(replacement) if 'data-i18n-html=' in match[1] else escape(replacement)
        return match[1] + rendered + match[5]
    return pattern.sub(apply, page)


def render_homepage_icons(source: str) -> str:
    """Render icon SVGs in source HTML: works before JS and without the CDN."""
    import subprocess
    js = r"""
const fs = require('fs'), vm = require('vm');
const source = fs.readFileSync('assets/js/site.js', 'utf8');
const start = source.indexOf('const iconPaths=') + 'const iconPaths='.length;
const end = source.indexOf(';\n    const icons=', start);
if (end < 0) throw new Error('Icon set not found');
process.stdout.write(JSON.stringify(vm.runInNewContext('(' + source.slice(start, end) + ')')));
"""
    shapes = json.loads(subprocess.check_output(["node", "-e", js], cwd=ROOT, text=True))
    def substitute(match: re.Match) -> str:
        raw = match.group(0)
        icon = re.search(r'data-lucide="([^"]+)"', raw)
        assert icon, raw
        name = icon.group(1)
        if name not in shapes:
            raise ValueError('No SVG drawing found for icon: ' + name)
        return ('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" '
                'viewBox="0 0 24 24" fill="none" stroke="currentColor" '
                'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" '
                'class="lucide lucide-' + escape(name) + '" aria-hidden="true">'
                + shapes[name] + '</svg>')
    return re.sub(r'<i\b[^>]*\bdata-lucide="[^"]+"[^>]*>\s*</i>', substitute, source)


def process_home(lang: str, original: str) -> str:
    source = clean_legacy_marker(original)
    source = rewrite_links(source, lang)
    source = localized_home_copy(source, lang)
    # Static artwork and icons must work without JavaScript or third-party CDNs.
    source = re.sub(r'<script\b[^>]*src="https://unpkg.com/lucide[^"]+"[^>]*></script>', '', source)
    source = render_homepage_icons(source)
    source = responsive_article_thumbs(source)
    # Below-fold artwork should never compete with the first viewport for bandwidth.
    source = source.replace('loading="lazy"', 'loading="lazy" fetchpriority="low"')
    # Prefer rendering immediately with system fallback to late webfont swaps on slow mobile links.
    source = source.replace('&display=swap', '&display=optional').replace('&amp;display=swap', '&amp;display=optional')
    # The original images remain for detail views; small local versions go into cards.
    source = re.sub(r'<img\b[^>]*>', lambda m: re.sub(
        r'(src="assets/images/)([^"/]+)(\.webp")',
        lambda item: item[1] + item[2] + '-thumb' + item[3], m[0]
    ) if 'loading="lazy"' in m[0] else m[0], source)
    # Load nonessential web fonts after first paint while preserving no-JS fallback.
    def font_stylesheet(match: re.Match) -> str:
        href = match.group(1)
        return ('<link rel="stylesheet" href="' + href +
                '" media="print" onload="this.media=\'all\'">' +
                '<noscript><link rel="stylesheet" href="' + href + '"></noscript>')
    source = re.sub(r'<link href="(https://fonts\.googleapis\.com/css2\?[^"]+)" rel="stylesheet"\s*/?>',
                    font_stylesheet, source)
    # Keep all relative asset paths resolving correctly below /en/ or /ar/.
    source = source.replace('<head>', '<head><base href="/">', 1)
    source = re.sub(r'(href=")(#[^"]+)(")', lambda m: m[1] + '/' + lang + '/' + m[2] + m[3], source)
    source = re.sub(r'<html\s+lang="[^"]+"\s+dir="[^"]+"', '<html lang="' + lang + '" dir="' + ('rtl' if lang == 'ar' else 'ltr') + '"', source, count=1)
    title = 'أحمد الخولي | مهندس Backend وLaravel وأتمتة الأعمال بالذكاء الاصطناعي' if lang == 'ar' else 'Ahmed Elkholy | Senior Laravel & Backend Engineer'
    desc = ('أحمد الخولي، مهندس برمجيات Backend متخصص في Laravel وPHP وهندسة SaaS والتكاملات والأنظمة الموثوقة وأتمتة الأعمال بالذكاء الاصطناعي.'
            if lang == 'ar' else 'Ahmed Elkholy is a senior Laravel backend engineer building production SaaS, secure APIs, payment integrations and reliable AI automation.')
    url = ORIGIN + '/' + lang + '/'
    schema = {"@context": "https://schema.org", "@graph": [
        {"@type": "Person", "@id": ORIGIN + "/#person", "name": "Ahmed Elkholy",
         "alternateName": ["Ahmed El-Kholy", "أحمد الخولي"], "jobTitle": "Senior Backend Engineer",
         "url": ORIGIN + "/en/", "sameAs": ["https://github.com/mykholy", "https://www.linkedin.com/in/mykholy/"],
         "knowsAbout": ["Laravel", "PHP", "API Architecture", "SaaS", "Shopify", "Payment Systems", "AI Automation"]},
        {"@type": "ProfilePage", "@id": url + "#profile", "url": url, "inLanguage": lang,
         "mainEntity": {"@id": ORIGIN + "/#person"}, "dateModified": LAST_REVISED},
        {"@type": "WebSite", "@id": ORIGIN + "/#website", "name": "Ahmed Elkholy | Engineering Portfolio", "url": ORIGIN + "/",
         "inLanguage": ["en", "ar"]}
    ]}
    source = head_metadata(source, title, desc, url, lang, '/assets/portfolio-social.jpg', 'profile', schema)
    return source


def legacy_redirect(page: str, target: str) -> str:
    # Keep actual original content for no-JS fallbacks and future deterministic builds.
    page = clean_legacy_marker(page)
    page = re.sub(r'<script\b[^>]*src="https://unpkg.com/lucide[^"]+"[^>]*></script>', '', page)
    page = re.sub(r'<p class="editorial">\s*Transparency:.*?</p>', '', page, flags=re.S | re.I)
    page = re.sub(r'<span>\s*\d{1,3}\s*/\s*200\s*</span>', '', page)
    page = re.sub(r'(<link rel="canonical" href=")[^"]+(")', lambda m: m[1] + ORIGIN + target + m[2], page, count=1)
    # Old pages should advertise only the canonical language counterparts,
    # not the legacy /blog/ language locations.
    page = re.sub(r'<link\b[^>]*\brel="alternate"\s+hreflang="[^"]+"[^>]*>', '', page)
    canonical_en = target.replace('/ar/', '/en/') if target.startswith('/ar/') else target
    canonical_ar = target.replace('/en/', '/ar/') if target.startswith('/en/') else target
    alternates = ''.join(
        '<link rel="alternate" hreflang="' + language + '" href="' + ORIGIN + url + '">'
        for language, url in [('en', canonical_en), ('ar', canonical_ar), ('x-default', canonical_en)]
    )
    script = ('<script data-locale-redirect>(function(){var to=' + json.dumps(target) +
              ';if(location.pathname!==to){location.replace(to+location.search+location.hash)}})();</script>')
    return page.replace('</head>', alternates + script + '</head>', 1)


def build_feeds() -> None:
    from datetime import datetime
    from email.utils import format_datetime
    for lang in ('en', 'ar'):
        rss = ET.Element('rss', {'version': '2.0'})
        channel = ET.SubElement(rss, 'channel')
        name = 'مقالات أحمد الخولي — Laravel وAI' if lang == 'ar' else 'Ahmed Elkholy | Engineering Insights'
        summary = ('مقالات في Laravel والأتمتة وهندسة الأنظمة.' if lang == 'ar'
                   else 'Engineering articles on Laravel, SaaS reliability and responsible AI automation.')
        for key, val in [('title', name), ('link', url_for(lang)), ('description', summary),
                         ('language', lang)]:
            ET.SubElement(channel, key).text = val
        for i, article in enumerate(CATALOG):
            if article.get('status') != 'published':
                continue
            item = ET.SubElement(channel, 'item')
            article_url = url_for(lang, article['slug'])
            values = {
                'title': article.get('arTitle' if lang == 'ar' else 'title'),
                'description': article.get('arSummary' if lang == 'ar' else 'summary'),
                'link': article_url, 'guid': article_url,
                'pubDate': format_datetime(datetime.fromisoformat(
                    publication_metadata(article, i, lang)[0].replace('Z', '+00:00'))),
            }
            for key, value in values.items():
                node = ET.SubElement(item, key)
                if key == 'guid':
                    node.set('isPermaLink', 'true')
                node.text = str(value)
        xml = '<?xml version="1.0" encoding="UTF-8"?>\n' + ET.tostring(rss, encoding='unicode')
        put(ROOT / lang / 'feed.xml', xml)
        put(ROOT / ('feed.xml' if lang == 'en' else 'blog/ar/feed.xml'), xml)


def rewrite_sitemap() -> None:
    # Only quality-reviewed, indexable articles. Adding noindex drafts to sitemap
    # would waste crawl budget and send contradictory discovery signals.
    pages = [('/en/', '/ar/', LAST_REVISED), ('/en/blog/', '/ar/blog/', LAST_REVISED)]
    for i, item in enumerate(CATALOG):
        if item.get('status') == 'published':
            slug = item['slug']
            _published, modified, _display = publication_metadata(item, i)
            pages.append((locale_path('en', slug), locale_path('ar', slug), modified[:10]))
    root = ET.Element('{%s}urlset' % XMLNS)
    for en, ar, last_modified in pages:
        for loc in (en, ar):
            el = ET.SubElement(root, '{%s}url' % XMLNS)
            ET.SubElement(el, '{%s}loc' % XMLNS).text = ORIGIN + loc
            ET.SubElement(el, '{%s}lastmod' % XMLNS).text = last_modified
            for language, page in [('en', en), ('ar', ar)]:
                ET.SubElement(el, '{%s}link' % XHTML, {'rel': 'alternate', 'hreflang': language, 'href': ORIGIN + page})
            ET.SubElement(el, '{%s}link' % XHTML, {'rel': 'alternate', 'hreflang': 'x-default', 'href': ORIGIN + en})
    # Keep the privacy policy discoverable without claiming a translated version.
    policy = ET.SubElement(root, '{%s}url' % XMLNS)
    ET.SubElement(policy, '{%s}loc' % XMLNS).text = ORIGIN + '/privacy.html'
    ET.SubElement(policy, '{%s}lastmod' % XMLNS).text = LAST_REVISED
    put(ROOT / 'sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n' + ET.tostring(root, encoding='unicode') + '\n')


def main() -> None:
    assert len(CATALOG) == 200 and len({x['slug'] for x in CATALOG}) == 200
    for i, item in enumerate(CATALOG):
        for lang in ('en', 'ar'):
            old = ROOT / 'blog' / ('ar/' if lang == 'ar' else '') / item['slug'] / 'index.html'
            optimized = process_article(item, i, lang)
            put(ROOT / lang / 'blog' / item['slug'] / 'index.html', optimized)
            put(old, legacy_redirect(old.read_text(encoding='utf8'), locale_path(lang, item['slug'])))
    for lang in ('en', 'ar'):
        old = ROOT / 'blog' / ('ar/' if lang == 'ar' else '') / 'index.html'
        put(ROOT / lang / 'blog' / 'index.html', process_index(lang))
        put(old, legacy_redirect(old.read_text(encoding='utf8'), locale_path(lang)))
    home = ROOT / 'index.html'
    oldhome = home.read_text(encoding='utf8')
    for lang in ('en', 'ar'):
        put(ROOT / lang / 'index.html', process_home(lang, oldhome))
    put(home, legacy_redirect(oldhome, '/en/'))
    rewrite_sitemap()
    build_feeds()
    print('Generated 400 canonical localized articles, 2 indexes, 2 profiles, redirects and sitemap.')


if __name__ == '__main__':
    main()
