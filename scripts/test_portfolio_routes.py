#!/usr/bin/env python3
"""Static regression checks for routes, SEO, icon assets and page weight."""
from __future__ import annotations

import json
import re
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
SITE = 'https://mykholy.github.io'
ARTICLES = json.loads((ROOT/'blog/articles.json').read_text(encoding='utf-8'))
asset_refs = 0


def check_assets(source: str, page: Path) -> None:
    global asset_refs
    for match in re.finditer(r'<img\b[^>]*\bsrc="([^"]+)"', source):
        src = match.group(1)
        if src.startswith('data:'):
            continue
        url = urlparse(src)
        if url.scheme:
            if url.hostname == 'mykholy.github.io':
                asset = ROOT/url.path.lstrip('/')
            else:
                continue
        else:
            # All locale page paths use <base href="/">, relative assets start at /.
            asset = ROOT/(url.path.lstrip('/'))
        assert asset.exists() and asset.stat().st_size > 1024, (page, src)
        asset_refs += 1


def check_home(locale: str) -> None:
    path = ROOT/locale/'index.html'
    page = path.read_text(encoding='utf-8')
    assert f'<html lang="{locale}"' in page, path
    assert f'<link rel="canonical" href="{SITE}/{locale}/">' in page, path
    assert 'property="og:image"' in page and 'name="twitter:card"' in page
    assert 'https://unpkg.com/lucide' not in page, path
    assert 'data-lucide="' not in page, path
    assert page.count('class="lucide lucide-') >= 35, path
    assert '<base href="/">' in page, path
    links = re.findall(r'<article class="home-insight-card[^"]*"[^>]*><a href="([^"]+)"', page)
    assert len(links) == 6, (path, len(links))
    assert all(link.startswith(f'/{locale}/blog/') for link in links), (path, links)
    for link in links:
        assert (ROOT/link.lstrip('/')/'index.html').is_file(), link
    check_assets(page, path)


def check_profile_dates() -> None:
    from datetime import datetime, timezone
    pattern = re.compile(r'^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$')
    for relative in ('index.html', 'en/index.html', 'ar/index.html'):
        source=(ROOT/relative).read_text()
        profiles=[]
        for raw in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',source,re.S):
            data=json.loads(raw)
            profiles.extend(node for node in data.get('@graph',[data]) if node.get('@type')=='ProfilePage')
        assert profiles, relative
        for profile in profiles:
            value=profile.get('dateModified','')
            assert pattern.fullmatch(value), (relative,'ProfilePage.dateModified needs a full ISO 8601 DateTime with timezone',value)
            instant=datetime.fromisoformat(value.replace('Z','+00:00'))
            assert instant.tzinfo is not None and instant<=datetime.now(timezone.utc), (relative,value)


def check_articles() -> None:
    for locale in ('en', 'ar'):
        index = (ROOT/locale/'blog/index.html').read_text(encoding='utf-8')
        assert f'<link rel="canonical" href="{SITE}/{locale}/blog/">' in index
        listing_pages = [ROOT/locale/'blog/index.html'] + sorted((ROOT/locale/'blog/page').glob('*/index.html'))
        preview_pages = [ROOT/locale/'blog/previews/index.html'] + sorted((ROOT/locale/'blog/previews/page').glob('*/index.html'))
        for previews, paths in [(False, listing_pages), (True, preview_pages)]:
            links = []
            for listing_page in paths:
                listing_html = listing_page.read_text()
                assert listing_page.stat().st_size < 45_000, listing_page
                page_links = re.findall(r'<article class="blogcard[^"]*"[^>]*><a href="([^"]+)"', listing_html)
                assert 0 < len(page_links) <= 12, listing_page
                assert ('content="noindex,follow"' in listing_html) == previews, listing_page
                links.extend(page_links)
                if previews or '/page/' in str(listing_page):
                    assert 'class="feature-story' not in listing_html, listing_page
            expected = [f'/{locale}/blog/{x["slug"]}/' for x in ARTICLES if (x['status'] != 'published') == previews]
            assert sorted(links) == sorted(expected), (locale, previews)
            assert len(set(links)) == len(links)
        for record in ARTICLES:
            slug = record['slug']
            path = ROOT/locale/'blog'/slug/'index.html'
            html = path.read_text(encoding='utf-8')
            assert f'<link rel="canonical" href="{SITE}/{locale}/blog/{slug}/">' in html, path
            assert f'hreflang="{locale}" href="{SITE}/{locale}/blog/{slug}/"' in html, path
            assert 'class="article-share"' in html and '<time datetime="' in html, path
            assert 'property="og:image"' in html and 'name="twitter:image"' in html, path
            assert 'Transparency: this AI-assisted article' not in html, path
            assert 'name="description"' in html and '<title>' in html, path
            assert ('content="noindex,follow"' in html) == (record['status'] != 'published'), path
            check_assets(html, path)
            legacy = ROOT/'blog'/('ar/' if locale=='ar' else '')/slug/'index.html'
            old_html = legacy.read_text(encoding='utf-8')
            assert 'data-locale-redirect' in old_html, legacy
            assert f'<link rel="canonical" href="{SITE}/{locale}/blog/{slug}/">' in old_html, legacy
            assert f'hreflang="{locale}" href="{SITE}/{locale}/blog/{slug}/"' in old_html, legacy
            assert 'hreflang="en" href="' + SITE + '/blog/' not in old_html, legacy
            assert 'hreflang="ar" href="' + SITE + '/blog/ar/' not in old_html, legacy


def check_scripts_and_weights() -> None:
    js = (ROOT/'assets/js/site.js').read_text(encoding='utf-8')
    assert "$$('.home-insight-card a').forEach" in js
    assert js.index('let revealObserver;') < js.index('translate(lang);')
    assert 'window.lucide?.createIcons' not in js
    assert "'/assets/js/chat.js'" in js
    assert '/assets/js/chat.js' in (ROOT/'assets/js/blog.js').read_text(encoding='utf-8')
    chat=(ROOT/'assets/js/chat.js').read_text(encoding='utf-8')
    assert '6adba7539cb48b346f87ea7e/default' in chat
    assert 'window.Tawk_API.autoStart = true' in chat
    assert 'document.head.appendChild(script)' in chat
    assert 'showWelcome' in chat and 'Hi there!' in chat
    assert "script.src = embed" in chat
    assert 'requestIdleCallback' not in chat
    assert "window.addEventListener('load', scheduleConnect" not in chat
    assert "'DOMContentLoaded', showWelcome" in chat
    assert 'Connecting to live chat' in chat
    assert 'ae_tawk_visitor_optout_v1' in chat
    assert "script.fetchPriority = 'low'" in chat
    assert 'navigator.globalPrivacyControl === true' in chat
    assert 'ae:privacy-closed' in chat
    assert 'document.querySelector(".ae-consent")' in chat
    privacy=(ROOT/'privacy.html').read_text(encoding='utf-8')
    assert 'id="chatOptOut"' in privacy
    assert 'Decline analytics' in privacy
    assert 'ae-chat-launcher' not in chat
    assert 'embed.tawk.to' not in js
    assert '<script src="/assets/js/chat.js" defer>' in (ROOT/'privacy.html').read_text(encoding='utf-8')
    assert (ROOT/'assets/js/site.js').stat().st_size < 100_000
    assert (ROOT/'assets/css/site.css').stat().st_size < 65_000
    for photo in ['assets/portfolio-social.jpg', 'assets/images/articles/ai-cost-share.jpg']:
        assert (ROOT/photo).is_file() and (ROOT/photo).stat().st_size > 10_000


def check_discovery() -> None:
    import xml.etree.ElementTree as ET
    urls = [node.text for node in ET.parse(ROOT/'sitemap.xml').findall('.//{*}loc')]
    assert len(urls) == len(set(urls))
    for url in urls:
        path = ROOT/urlparse(url).path.lstrip('/')
        if path.is_dir(): path = path/'index.html'
        page = path.read_text()
        assert 'content="noindex' not in page, url
        assert f'<link rel="canonical" href="{url}">' in page, url
        assert len(re.findall(r'<h1\b',page)) == 1, url
    from build_profile_pages import SERVICES, projects
    for locale in ('en','ar'):
        for kind, slugs in [('services',[x['slug'] for x in SERVICES]), ('projects',[x['id'] for x in projects()['projects']])]:
            for slug in [''] + slugs:
                url=f'{SITE}/{locale}/{kind}/'+(slug+'/' if slug else '')
                assert url in urls, url
                page=(ROOT/locale/kind/slug/'index.html').read_text()
                assert 'application/ld+json' in page
                assert 'mailto:mykholys30@gmail.com' in page
                check_assets(page,ROOT/locale/kind/slug/'index.html')
    guides=json.loads((ROOT/'blog/arabic-guides.json').read_text())
    assert len(guides)==50
    assert len({g['test'] for g in guides.values()})==50
    for slug,guide in guides.items():
        page=(ROOT/'ar/blog'/slug/'index.html').read_text()
        assert guide['test'] in page and guide['implementation'] in page, slug
        assert 'نسخة عربية مختصرة' not in page
    from urllib.parse import urljoin, unquote
    from html import unescape
    broken=[]
    for path in list((ROOT/'en').rglob('*.html'))+list((ROOT/'ar').rglob('*.html')):
        source=path.read_text()
        base=SITE+'/' if '<base href="/">' in source else SITE+'/'+str(path.parent.relative_to(ROOT))+'/'
        for href in re.findall(r'<a[^>]+href="([^"]+)"',source):
            resolved=urlparse(urljoin(base,unescape(href)))
            if resolved.netloc!='mykholy.github.io':continue
            target=ROOT/unquote(resolved.path).lstrip('/')
            if target.is_dir():target=target/'index.html'
            if not target.is_file():broken.append((str(path.relative_to(ROOT)),href))
    assert not broken, broken[:20]
    print(f'PASS: {len(urls)} indexable sitemap URLs, 50 Arabic guides, service/project pages and crawlable pagination')


def main() -> None:
    for lang in ('en', 'ar'):
        check_home(lang)
    check_profile_dates()
    check_articles()
    check_scripts_and_weights()
    check_discovery()
    print(f'PASS: 2 localized profiles, 12 featured links, 400 article pages, SVG icons and {asset_refs} image references')


if __name__ == '__main__':
    main()
