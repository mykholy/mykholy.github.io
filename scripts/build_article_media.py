#!/usr/bin/env python3
"""Enhance committed static bilingual blog pages with editorial image assets.

Idempotent, standard-library only. Used by GitHub Pages deployment and CI.
Never changes articles' indexing status or fabricates production-client claims.
"""
from __future__ import annotations

import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTICLES = ROOT / "blog" / "articles.json"
IMAGE_BASE = "/assets/images/articles/"
BASE_URL = "https://mykholy.github.io"

SPECIAL = {
    "saas-businesses-knowledge-grounded-assistants": "ai-laravel-sdk",
    "clinics-voice-ai-receptionist": "clinic-voice",
    "saas-businesses-workflow-approvals": "ai-agent-approvals",
    "whatsapp-ai-from-question-to-order": "whatsapp-commerce",
    "ai-automation-cost-beyond-tokens": "ai-cost",
    "webhooks-without-duplicate-orders": "webhook-reliability",
    "ai-agents-vs-rules-what-to-build": "ai-governance",
    "human-in-the-loop-ai-workflows": "ai-agent-approvals",
    "arabic-voice-ai-and-dialect-testing": "voice-arabic",
    "ai-phone-agents-latency-and-handoff": "voice-agent",
    "voice-ai-for-booking-appointments": "clinic-voice",
    "rag-vs-fine-tuning-for-business-knowledge": "rag",
    "hybrid-search-and-citation-ready-rag": "rag",
    "shopify-catalog-qa-before-ai-suggestions": "ecommerce-catalog",
    "prompt-injection-safety-for-ai-tools": "security",
    "ai-media-jobs-webhooks-and-credits": "media",
    "ai-content-moderation-with-review": "ai-governance",
    "clinic-appointment-automation": "clinic-general",
    "measuring-automation-roi-honestly": "reports",
    "automated-invoices-and-reminders": "billing",
    "product-recommendations-grounded-in-inventory": "shopify",
    "ai-real-estate-property-matching": "content",
    "text-to-speech-pipelines-with-queues": "voice-arabic",
    "ai-automation-roadmap-from-spreadsheets-to-reliable-workflows": "automations",
}

FLOW_KEYS = [
    ("voice|call|speech|audio|dialect|transcription|phone", "voice-agent"),
    ("whatsapp|follow-up|follow-ups|cart-recovery", "whatsapp-commerce"),
    ("webhook|idempotenc|duplicate", "webhook-shield"),
    ("approval|human-in-the-loop|escalation", "ai-agent-approvals"),
    ("payments|reconcil|invoice|refund", "billing"),
    ("content|moderation|creative|media", "content"),
    ("knowledge|grounded|rag|search|retrieval", "rag"),
    ("agent|permission|injection|security|multi-tenant", "ai-governance"),
    ("analytics|report|cost|roi|metric", "reports"),
    ("crm|lead|qualification|conversation", "crm"),
    ("document|migration|cleanup|data", "ai-architecture"),
    ("support|automation|workflow|monitoring|observability", "automations"),
]

CATEGORY_KEYS = {
    "Healthcare": "clinic-general",
    "E-commerce": "ecommerce-catalog",
    "Education": "education",
    "Real Estate": "content",
    "Hospitality": "whatsapp-commerce",
    "Operations": "operations",
    "People Operations": "ai-agent-approvals",
    "SaaS": "ai-architecture",
    "Events": "events",
    "Logistics": "operations",
    "Strategy": "ai-cost",
    "Engineering": "ai-architecture",
    "Voice AI": "voice-agent",
    "Automation": "automations",
    "Security": "security",
    "AI Media": "media",
    "Shopify": "shopify",
}

FEATURED_HOOKS = {
    "saas-businesses-knowledge-grounded-assistants": (
        "Your AI assistant can reach production. Can it respect every user's permissions?",
        "المساعد الذكي ممكن يشتغل في الإنتاج… لكن هل يحترم صلاحيات كل مستخدم؟",
    ),
    "clinics-voice-ai-receptionist": (
        "A voice agent that books the wrong appointment costs more than a missed call.",
        "مساعد صوتي يحجز موعدًا غلط ممكن يكلف العيادة أكتر من مكالمة ضايعة.",
    ),
    "saas-businesses-workflow-approvals": (
        "An AI Agent should never approve its own high-risk actions.",
        "مين يحاسب الـAI Agent لو نفّذ قرارًا حساسًا من غير موافقة؟",
    ),
    "whatsapp-ai-from-question-to-order": (
        "Getting replies is easy. Turning a conversation into a verified order is engineering.",
        "الرد على العميل سهل… لكن تحويل المحادثة لأوردر مؤكد محتاج نظام.",
    ),
    "ai-automation-cost-beyond-tokens": (
        "The token bill isn't your AI automation budget. Failures and human review count too.",
        "فاتورة الـTokens مش هي التكلفة الحقيقية للـAI… في مصاريف تانية بتختفي.",
    ),
    "webhooks-without-duplicate-orders": (
        "Your payment provider can send the same event twice. Your customer must not pay twice.",
        "إشعار الدفع ممكن يوصلك مرتين… لكن العميل ماينفعش يدفع مرتين.",
    ),
}


def theme_for(item: dict) -> str:
    slug = item['slug']
    if slug in SPECIAL:
        return SPECIAL[slug]
    for pattern, theme in FLOW_KEYS:
        if re.search(pattern, slug, re.I):
            return theme
    return CATEGORY_KEYS.get(item.get('category', ''), 'generic')


def e(value: str) -> str:
    return html.escape(str(value), quote=True)


def replace_once(source: str, old: str, new: str) -> str:
    return source.replace(old, new, 1) if old in source else source


def hook_for(item: dict, ar: bool) -> str:
    slug = item['slug']
    if slug in FEATURED_HOOKS:
        return FEATURED_HOOKS[slug][1 if ar else 0]
    name = (item.get('arTitle') if ar else item.get('title')) or item.get('title', '')
    # A topic-specific reader question; this is not claimed as an empirical result.
    if ar:
        return f"هل {name.replace('خطة تشغيل عملية','').rstrip(': ')} قابل للتشغيل من غير أخطاء مكلفة؟"
    name = re.sub(r': a production-ready plan$', '', name, flags=re.I)
    return f"What does {name.lower()} take to work safely beyond the demo?"


def takeaways(item: dict, ar: bool) -> list[str]:
    topic = item['arTitle'] if ar else item['title']
    category = item.get('category', 'Engineering')
    if ar:
        return [
            f"ابدأ بتحديد القرار ومسؤولية الفريق في موضوع {topic}.",
            "راجع الصلاحيات وأخطاء الخدمات الخارجية قبل تشغيل أي أتمتة.",
            "قِس النتائج المكتملة والتصحيحات البشرية، مش عدد الرسائل فقط.",
        ]
    return [
        f"Define the accountable owner and decision boundary for {topic}.",
        f"Validate authorization, failures and recovery before scaling this {category.lower()} workflow.",
        "Measure completed outcomes and human correction, not message volume alone.",
    ]


def enrich_article(text: str, item: dict, ar: bool) -> str:
    if 'data-article-media="v1"' in text:
        return text
    theme = theme_for(item)
    image = IMAGE_BASE + theme + '-hero.webp'
    absolute = BASE_URL + image
    image_alt = (item['arTitle'] if ar else item['title']) + (" — رسم توضيحي بالذكاء الاصطناعي" if ar else " — AI-generated editorial illustration")
    # Update Open Graph and Twitter share cards in real HTML, not client-side JS.
    text = re.sub(r'(<meta property="og:image" content=")[^"]+("\s*/?>)', lambda m: m.group(1)+absolute+m.group(2), text, count=1)
    text = replace_once(text, '<meta property="og:type" content="article">',
                        '<meta property="og:type" content="article"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="'+absolute+'"><meta property="og:image:alt" content="'+e(image_alt)+'"><meta property="og:image:width" content="1400"><meta property="og:image:height" content="788">')
    # JSON-LD article image on indexable and draft pages alike.
    text = re.sub(r'("image"\s*:\s*")[^"]+("\s*[,}])',
                  lambda m: m.group(1)+absolute+m.group(2), text, count=1)
    figure = ('<figure class="article-hero-visual" data-article-media="v1">'
              '<img src="'+image+'" width="1400" height="788" fetchpriority="high" decoding="async" alt="'+e(image_alt)+'">'
              '<figcaption>'+('تصميم توضيحي بالذكاء الاصطناعي، وليس لقطة شاشة من نظام حقيقي.' if ar else 'AI-generated concept illustration, not a production-system screenshot.')+'</figcaption></figure>')
    if '<div class="bloglayout">' in text:
        text = replace_once(text, '<div class="bloglayout">', figure+'<div class="bloglayout">')
    prompt = e(hook_for(item, ar))
    text = re.sub(r'(<header class="articlehead">[\s\S]*?<h1>[\s\S]*?</h1>)',
                  lambda m: m.group(1)+'<p class="article-hook">'+prompt+'</p>', text, count=1)
    take = ('<div class="quick-insights"><span class="eyebrow">'
            + ('خلاصة سريعة' if ar else 'THE DECISION IN 30 SECONDS')
            + '</span><ul>'+''.join('<li>'+e(x)+'</li>' for x in takeaways(item, ar))+'</ul></div>')
    text = replace_once(text, '<article class="blogprose">', '<article class="blogprose">'+take)
    return text


def enrich_listing(text: str, manifest: list[dict], ar: bool) -> str:
    # Existing article cards are stable HTML and remain crawlable without JavaScript.
    for item in manifest:
        slug = item['slug']
        link = '/blog/' + ('ar/' if ar else '') + slug + '/'
        theme = theme_for(item)
        title = item['arTitle'] if ar else item['title']
        image = ('<img class="editorial-thumb" src="'+IMAGE_BASE+theme+'-thumb.webp" width="680" height="383" '
                 'loading="lazy" decoding="async" alt="'+e(title)+' — '+('صورة توضيحية' if ar else 'editorial illustration')+'">')
        # One matching featured card and one catalog card, both inside an anchor.
        text = text.replace('<a href="'+link+'"><span class="feature-top">',
                            '<a href="'+link+'">'+image+'<span class="feature-top">')
        text = text.replace('<a href="'+link+'"><div class="cardtop">',
                            '<a href="'+link+'">'+image+'<div class="cardtop">')
    return text


def enrich_home(text: str, manifest: list[dict]) -> str:
    for item in manifest:
        slug=item['slug']
        if not item.get('featured'):
            continue
        needle='<a href="/blog/'+slug+'/"><span class="home-insight-meta">'
        img='<img class="home-insight-image" src="'+IMAGE_BASE+theme_for(item)+'-thumb.webp" width="680" height="383" loading="lazy" decoding="async" alt="'+e(item['title'])+' editorial artwork">'
        text=text.replace(needle,'<a href="/blog/'+slug+'/">'+img+'<span class="home-insight-meta">')
    return text


def run(root: Path=ROOT):
    manifest=json.loads((root/'blog/articles.json').read_text(encoding='utf8'))
    assert len(manifest)==200 and len({x['slug'] for x in manifest})==200
    themes=set()
    for item in manifest:
        theme=theme_for(item)
        themes.add(theme)
        for kind in ('hero','thumb'):
            target=root/'assets/images/articles'/f'{theme}-{kind}.webp'
            if not target.exists():
                raise FileNotFoundError(f'Missing artwork: {target}')
        for arabic in (False, True):
            path=root/'blog'/('ar' if arabic else '')/item['slug']/'index.html'
            source=path.read_text(encoding='utf8')
            enhanced=enrich_article(source,item,arabic)
            path.write_text(enhanced,encoding='utf8')
    for arabic in (False,True):
        path=root/'blog'/('ar' if arabic else '')/'index.html'
        source=path.read_text(encoding='utf8')
        path.write_text(enrich_listing(source,manifest,arabic),encoding='utf8')
    home=root/'index.html'
    home.write_text(enrich_home(home.read_text(encoding='utf8'),manifest),encoding='utf8')
    return len(themes)

if __name__=='__main__':
    n=run()
    print(f'Enriched 400 bilingual article pages + 2 indexes + homepage, with {n} thematic image families')