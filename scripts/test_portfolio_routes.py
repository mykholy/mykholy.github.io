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


def check_articles() -> None:
    for locale in ('en', 'ar'):
        index = (ROOT/locale/'blog/index.html').read_text(encoding='utf-8')
        assert f'<link rel="canonical" href="{SITE}/{locale}/blog/">' in index
        assert index.count('class="blogcard') == 200
        assert 'class="publication-note"' in index
        published = sum(item.get('status') == 'published' for item in ARTICLES)
        assert f'{published} ' in index
        assert index.count('data-review="published"') == published
        listing_links = re.findall(r'<article class="blogcard[^"]*"[^>]*><a href="([^"]+)"', index)
        assert len(listing_links) == 200
        assert all(link.startswith(f'/{locale}/blog/') for link in listing_links), locale
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
            if record['status'] != 'published':
                assert 'content="noindex,follow"' in html, path
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
    assert "'/assets/js/chat.js'" in (ROOT/'assets/js/blog.js').read_text(encoding='utf-8')
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
    assert 'publication-controls' in (ROOT/'assets/js/blog.js').read_text(encoding='utf-8')
    assert 'blog-load-more' in (ROOT/'assets/js/blog.js').read_text(encoding='utf-8')
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


def main() -> None:
    for lang in ('en', 'ar'):
        check_home(lang)
    check_articles()
    check_scripts_and_weights()
    print(f'PASS: 2 localized profiles, 12 featured links, 400 article pages, SVG icons and {asset_refs} image references')


if __name__ == '__main__':
    main()
