#!/usr/bin/env python3
"""Static service and project pages, using the portfolio's existing project facts."""
import html
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://mykholy.github.io'
REVISED = '2026-10-24'

def e(value):
    return html.escape(str(value), quote=True)

def projects():
    js = """const fs=require('fs'),vm=require('vm');const s=fs.readFileSync('assets/js/site.js','utf8');const a=s.indexOf('const assets=');const b=s.indexOf('const projects=');const end=s.indexOf('];',b)+2;process.stdout.write(vm.runInNewContext(s.slice(a,end)+';JSON.stringify({assets,projects})'));"""
    return json.loads(subprocess.check_output(['node','-e',js],cwd=ROOT,text=True))

# Service scope is an offer, not a promise of a fixed delivery date or outcome.
SERVICES = [
 {'slug':'laravel-saas-development','project':'tikvideo','en':[
 'Laravel & SaaS Development','Laravel backends for products that need clear domains, permissions and dependable operations.',
 'For founders and teams building subscription products, internal platforms or an API consumed by multiple applications. I help turn business workflows into explicit modules and contracts so the next release is easier to change and support.',
 ['Domain and data model, tenant boundaries and role permissions','REST APIs, authentication, subscriptions and asynchronous jobs','Critical-flow tests, deployment notes and operational handover'],
 'We start with the user journeys, expected workload, existing integrations and acceptance criteria. The first milestone is one working business flow. Billing, imports and other high-risk paths are tested with duplicate requests and provider failures before rollout.',
 'Bring the current repository if one exists, a list of user roles and the first workflow you need to ship. Scope, milestones and pricing follow that review.'],
 'ar':[
 'تطوير Laravel ومنصات SaaS','Backend واضح الصلاحيات وقابل للتطوير لمنتجك الرقمي.',
 'للشركات وأصحاب المنتجات الذين يحتاجون منصة اشتراكات أو نظامًا داخليًا أو APIs تخدم أكثر من تطبيق. أحوّل رحلة العمل إلى وحدات وعقود واضحة، مع تحديد ملكية البيانات وحدود كل عميل بدل الاعتماد على استثناءات يصعب صيانتها.',
 ['تصميم الوحدات وقاعدة البيانات والعزل بين العملاء والصلاحيات','واجهات API والمصادقة والاشتراكات والمهام الخلفية','اختبارات المسارات الحرجة وتوثيق النشر وتسليم النظام'],
 'نبدأ برحلات المستخدم والحمل المتوقع والتكاملات ومعايير القبول. أول مرحلة تسلّم مسار عمل مكتملًا، ثم نتوسع تدريجيًا. نختبر الدفع والاستيراد والطلبات المتكررة وتعطل المزود قبل إتاحة العمليات الحساسة للمستخدمين.',
 'أرسل المستودع الحالي إن وجد، وأنواع المستخدمين، وأول رحلة تريد إطلاقها. يتحدد النطاق والمراحل والتكلفة بعد المراجعة.']},
 {'slug':'shopify-app-integrations','project':'vericatalog','en':[
 'Shopify App Development & Integrations','Reliable catalog, admin and operational integrations for Shopify merchants.',
 'For merchants and product teams connecting Shopify to a custom app, catalog-quality tool or internal system. The integration should respect API limits and merchant permissions while making incomplete scans and failed updates visible.',
 ['Shopify Admin GraphQL integration and permission review','Incremental synchronization, webhook processing and queues','Guarded bulk operations with preflight checks and audit records'],
 'Start with the entities to synchronize and the source of truth for each field. I design pagination, retry handling and reconciliation before enabling writes. Catalog checks should identify a concrete problem before a suggestion becomes a merchant-approved change.',
 'Share the store workflow, intended API access and a sample synchronization or catalog problem. App review and distribution requirements depend on the chosen delivery model.'],
 'ar':[
 'تطوير تطبيقات Shopify والتكاملات','ربط المتجر بالأنظمة الخارجية وإدارة الكتالوج بعمليات قابلة للمراجعة.',
 'للتجار وفرق المنتجات الذين يريدون تطبيق Shopify أو ربط المخزون والكتالوج بنظام داخلي. التكامل يحتاج احترام صلاحيات المتجر وحدود API، مع إظهار الفحص الناقص والتحديث الفاشل بدل اعتبار إرسال الطلب دليلًا على نجاحه.',
 ['تكامل Shopify Admin GraphQL ومراجعة الصلاحيات','مزامنة تدريجية ومعالجة Webhooks وطوابير التنفيذ','تعديلات جماعية بفحص مسبق وسجل مراجعة وتحقق من النتيجة'],
 'نحدد البيانات المطلوب مزامنتها ومصدر الحقيقة لكل حقل. نصمم تقسيم النتائج وإعادة المحاولة والمطابقة قبل تفعيل الكتابة. فحص جودة الكتالوج يحدد المشكلة أولًا، ثم يوافق التاجر على التغيير المناسب.',
 'أرسل رحلة المتجر ونوع الوصول المطلوب ومثالًا لمشكلة المزامنة أو الكتالوج. متطلبات مراجعة التطبيق وتوزيعه تتحدد حسب طريقة تقديمه.']},
 {'slug':'payment-api-integrations','project':'flowguard','en':[
 'Payment & API Integrations','Payment flows that distinguish a confirmed result from an uncertain provider response.',
 'For products integrating checkout, subscriptions, wallets, refunds or third-party APIs. A timeout can leave a financial outcome unknown; repeating the request without evidence can create a second side effect.',
 ['Payment state transitions, signed callbacks and idempotency','Provider-side reconciliation, retries and exception queues','Tests for duplicate callbacks, timeouts and interrupted processing'],
 'We map authorization, capture, refund and local settlement boundaries. Provider references and documented idempotency support inform the design. Operators need a way to investigate uncertain outcomes rather than a misleading success or failure flag.',
 'Provide the provider documentation, existing order states and examples of failures. Production credentials are configured through your secure deployment environment.'],
 'ar':[
 'ربط بوابات الدفع وواجهات API','تدفقات دفع تميّز بين النتيجة المؤكدة والعملية التي تحتاج مطابقة.',
 'للمنتجات التي تربط Checkout أو اشتراكات أو محافظ أو استردادات أو خدمات خارجية. انتهاء مهلة الاتصال لا يثبت فشل الخصم؛ إعادة العملية بلا دليل قد تكرر الأثر المالي على العميل.',
 ['حالات الدفع والتحقق من توقيع الإشعارات ومنع التكرار','مطابقة نتائج المزود وإعادة المحاولة وقوائم الاستثناءات','اختبارات تكرار الإشعار وانقطاع الاتصال وتوقف التنفيذ'],
 'نرسم حدود التفويض والخصم والاسترداد والتسوية المحلية. يعتمد التصميم على مراجع المزود ودعمه الموثق لمنع التكرار. يحصل فريق التشغيل على مسار للتحقيق في النتائج المجهولة بدل إشارة نجاح أو فشل مضللة.',
 'أرسل توثيق المزود وحالات الطلب الحالية وأمثلة للأخطاء. تضبط مفاتيح الإنتاج داخل بيئة النشر الآمنة الخاصة بك.']},
 {'slug':'laravel-performance-audit','project':'jomlakwt','en':[
 'Laravel Performance & Reliability Audit','Find the bottleneck and verify the improvement against the same workload.',
 'For teams dealing with slow APIs, expensive queries, queue backlogs or recurring production incidents. The review starts with evidence from the affected route and its dependencies, followed by a bounded fix and a repeatable comparison.',
 ['Query plans, indexes, N+1 queries and API workload review','Queue throughput, Redis, PHP-FPM and Nginx investigation','Prioritized findings, reproducible checks and deployment guidance'],
 'We establish a baseline for latency, errors and workload. I trace the critical path before choosing caching, indexing or concurrency changes. Verification includes failure paths and data correctness, not just a faster isolated endpoint.',
 'Share affected routes, sanitized logs, infrastructure details and the time window of the problem. Any access to production is agreed for the specific investigation.'],
 'ar':[
 'مراجعة أداء Laravel وحل مشاكل التشغيل','تحديد سبب البطء وقياس التحسن على نفس ظروف التشغيل.',
 'للفرق التي تواجه APIs بطيئة أو استعلامات مكلفة أو طوابير متراكمة أو أعطالًا متكررة. تبدأ المراجعة بأدلة من المسار المتأثر والخدمات المرتبطة، ثم إصلاح محدد ومقارنة قابلة للتكرار.',
 ['خطط الاستعلام والفهارس وN+1 وطبيعة طلبات API','تحليل الطوابير وRedis وPHP-FPM وNginx','نتائج مرتبة بالأولوية وخطوات تحقق وإرشادات نشر'],
 'نحدد خط أساس لزمن الاستجابة والأخطاء والحمل. أتتبع المسار الحرج قبل اختيار Cache أو فهرس أو تعديل التزامن. التحقق يشمل صحة البيانات وسلوك الفشل بجانب السرعة.',
 'أرسل المسارات المتأثرة وسجلات منزوعة البيانات الحساسة وتفاصيل البنية وفترة حدوث المشكلة. أي وصول للإنتاج يكون متفقًا عليه لنطاق التحقيق المحدد.']},
 {'slug':'ai-workflow-automation','project':'tikvideo','en':[
 'AI Integration & Workflow Automation','Useful AI behind permissioned APIs, measurable costs and recoverable jobs.',
 'For teams automating repetitive interpretation, content or media workflows. I integrate model and media providers into Laravel applications with clear boundaries between suggestions, approvals and executed changes.',
 ['Provider integration, quotas, usage accounting and job orchestration','Permission checks, tool validation and human approval points','Failure recovery, callbacks, monitoring and evaluation cases'],
 'Choose one business outcome and its authoritative data sources. We test missing context, invalid tool inputs and provider outages before expanding access. Voice and audio integration scope is validated through a bounded pilot; provider selection follows latency, language and operating constraints.',
 'Bring sample inputs you have permission to use, current systems and your definition of a correct outcome. A pilot helps establish feasibility and ongoing operating costs.'],
 'ar':[
 'تكامل الذكاء الاصطناعي وأتمتة الأعمال','AI داخل APIs محمية وتكلفة قابلة للقياس ومهام قابلة للاستعادة.',
 'للفرق التي تريد أتمتة فهم الرسائل أو إنشاء المحتوى والميديا أو ربط خطوات متكررة. أربط مزودي النماذج والميديا بتطبيق Laravel مع فصل الاقتراح عن الموافقة وعن التنفيذ الفعلي.',
 ['تكامل المزودين وحدود الاستخدام واحتساب التكلفة وتنظيم المهام','التحقق من الصلاحيات ومدخلات الأدوات ونقاط الموافقة البشرية','استعادة الأخطاء وCallbacks والمراقبة وحالات تقييم الجودة'],
 'نختار نتيجة عمل واحدة ومصادر بياناتها الموثوقة. نختبر نقص السياق ومدخلات الأدوات غير الصحيحة وتعطل المزود قبل توسيع الصلاحيات. تكاملات الصوت تحدد بتجربة محدودة؛ اختيار المزود يعتمد على اللغة وزمن الاستجابة وقيود التشغيل.',
 'أرسل أمثلة لديك حق استخدامها والأنظمة الحالية وتعريف النتيجة الصحيحة. تساعد التجربة الأولية على تقدير الجدوى وتكلفة التشغيل المستمرة.']},
 {'slug':'filament-admin-development','project':'safeactions','en':[
 'Filament Admin Panels & Internal Tools','Operational screens with explicit permissions and safer high-impact actions.',
 'For businesses replacing spreadsheets or disconnected admin screens with a coherent internal workflow. The panel should reflect who can see, approve and execute an action, while preserving an understandable history.',
 ['Filament resources, forms, tables and role-aware navigation','Approval workflows, guarded actions and audit history','Imports, exports and integration with existing Laravel domains'],
 'We map operators, roles and action consequences. Validation lives on the server and applies beyond the visible button. Bulk changes and exports receive explicit permissions, previews where appropriate, and tests for accidental repeat execution.',
 'Share the current operational steps, roles, sample records and the integrations your team uses. Delivery is organized around workflows that operators can validate.'],
 'ar':[
 'تطوير لوحات Filament والأنظمة الداخلية','شاشات تشغيل بصلاحيات واضحة وضوابط للعمليات الحساسة.',
 'للشركات التي تريد تنظيم العمل بدل الجداول والشاشات المنفصلة. تعكس اللوحة من يستطيع رؤية البيانات والموافقة على الإجراء وتنفيذه، وتحفظ تاريخًا مفهومًا يستطيع فريق التشغيل مراجعته.',
 ['موارد Filament والنماذج والجداول والقوائم حسب الصلاحيات','مسارات موافقة وإجراءات محمية وسجل مراجعة','استيراد وتصدير وربط بوحدات Laravel الحالية'],
 'نحدد الموظفين والأدوار وآثار كل عملية. التحقق يكون على الخادم ولا يعتمد على إخفاء زر. تحصل التعديلات الجماعية والتصدير على صلاحيات صريحة ومعاينة عند الحاجة واختبارات لمنع التنفيذ المتكرر.',
 'أرسل خطوات التشغيل الحالية والأدوار وأمثلة للسجلات والتكاملات المستخدمة. نقسم التسليم إلى رحلات يستطيع الموظفون اختبارها واعتمادها.']},
]

def shell(lang, path, title, description, body, schema, head_metadata):
    ar = lang == 'ar'
    other = 'en' if ar else 'ar'
    otherpath = path.replace('/'+lang+'/', '/'+other+'/', 1)
    source = f'''<!doctype html><html lang="{lang}" dir="{'rtl' if ar else 'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/assets/css/blog.css"><link rel="stylesheet" href="/assets/css/profile-pages.css"></head><body><a class="skip" href="#main">{'تخطى إلى المحتوى' if ar else 'Skip to content'}</a><header class="blogbar"><div class="blogwrap blogrow"><a href="/{lang}/" class="logo">AHMED ELKHOLY<span> /</span></a><nav aria-label="{'التنقل' if ar else 'Navigation'}"><a href="/{lang}/services/">{'الخدمات' if ar else 'Services'}</a><a href="/{lang}/projects/">{'المشاريع' if ar else 'Projects'}</a><a href="/{lang}/blog/">{'المقالات' if ar else 'Insights'}</a><a lang="{other}" hreflang="{other}" href="{otherpath}">{'English' if ar else 'العربية'}</a></nav></div></header><main id="main" class="blogwrap profile-page">{body}</main><footer class="blogfooter"><div class="blogwrap footer-links">© 2026 Ahmed Elkholy · <a href="/{lang}/">{'البروفايل' if ar else 'Portfolio'}</a> · <a href="/privacy.html">{'الخصوصية' if ar else 'Privacy'}</a></div></footer><script src="/assets/js/analytics-config.js" defer></script><script src="/assets/js/analytics.js" defer></script><script src="/assets/js/blog.js" defer></script></body></html>'''
    return head_metadata(source,title+(' | أحمد الخولي' if ar else ' | Ahmed Elkholy'),description,ORIGIN+path,lang,'/assets/portfolio-social.jpg','website',schema)

def cta(lang):
    ar=lang=='ar'
    return '<section class="articlecta"><h2>'+('ناقش مشروعك' if ar else 'Discuss your project')+'</h2><p>'+('وضح المشكلة والأنظمة الحالية والنتيجة المطلوبة لنحدد خطوة البداية.' if ar else 'Describe the problem, current systems and desired outcome so we can define a useful first step.')+'</p><a class="blogbutton" href="mailto:mykholys30@gmail.com?subject=Project%20inquiry">'+('ابعتلي إيميل ↗' if ar else 'Email me ↗')+'</a> <a class="blogbutton outline" href="https://wa.me/201064754874?text=Hi%20Ahmed%2C%20I%20would%20like%20to%20discuss%20a%20project">WhatsApp ↗</a></section>'

def build(head_metadata, put):
    data=projects()
    routes=[]
    for lang in ('en','ar'):
        ar=lang=='ar'
        for service in SERVICES:
            title,desc,intro,deliverables,approach,brief=service[lang]
            path=f'/{lang}/services/{service["slug"]}/'
            body=f'<header class="articlehead"><span class="eyebrow">LARAVEL · BACKEND · INTEGRATIONS</span><h1>{e(title)}</h1><p class="lead">{e(desc)}</p></header><div class="profile-prose"><p>{e(intro)}</p><h2>{"نطاق التسليم" if ar else "What I can deliver"}</h2><ul>'+''.join(f'<li>{e(x)}</li>' for x in deliverables)+f'</ul><h2>{"أسلوب التنفيذ" if ar else "How we work"}</h2><p>{e(approach)}</p><h2>{"ماذا نحتاج للبدء؟" if ar else "What to bring to the first conversation"}</h2><p>{e(brief)}</p><p><a href="/{lang}/projects/{service["project"]}/">'+('مشروع مرتبط بالخبرة ↗' if ar else 'Explore related engineering work ↗')+'</a></p></div>'+cta(lang)
            schema={'@context':'https://schema.org','@type':'Service','name':title,'description':desc,'url':ORIGIN+path,'provider':{'@type':'Person','@id':ORIGIN+'/#person','name':'Ahmed Elkholy','url':ORIGIN+'/en/'},'serviceType':title}
            put(ROOT/path.lstrip('/')/'index.html',shell(lang,path,title,desc,body,schema,head_metadata))
        for p in data['projects']:
            title=p['title'];desc=p['arDescription' if ar else 'description'];path=f'/{lang}/projects/{p["id"]}/'
            image='/'+data['assets'][p['image']]
            body=f'<header class="articlehead"><span class="eyebrow">{e(p["label"])}</span><h1>{e(title)}</h1><p class="lead">{e(desc)}</p></header><figure class="article-hero-visual"><img src="{image}" width="1180" height="885" alt="{e(title)}" fetchpriority="high"><figcaption>'+('رسم توضيحي للمشروع.' if ar else 'Illustrative project artwork.')+'</figcaption></figure><div class="profile-prose">'
            for key,heading in [('role',('دوري','My role')),('challenge',('التحدي','The challenge')),('solution',('النهج الهندسي','Engineering approach')),('evidence',('نطاق العمل','Scope of work'))]:
                value=p[('ar'+key[0].upper()+key[1:]) if ar else key]
                body+=f'<section><h2>{heading[0 if ar else 1]}</h2><p>{e(value)}</p></section>'
            body+='<h2>'+('تفاصيل التنفيذ' if ar else 'Implementation highlights')+'</h2><ul>'+''.join('<li>'+e(x)+'</li>' for x in p['arHighlights' if ar else 'highlights'])+'</ul><p class="profile-tags">'+e(' · '.join(p['tags']))+'</p>'
            if p.get('link'):body+=f'<p><a href="{e(p["link"])}" rel="noopener noreferrer">'+('المصدر / الموقع ↗' if ar else 'Source / live website ↗')+'</a></p>'
            body+='</div>'+cta(lang)
            schema={'@context':'https://schema.org','@type':'CreativeWork','name':title,'description':desc,'url':ORIGIN+path,'inLanguage':lang,'author':{'@type':'Person','@id':ORIGIN+'/#person','name':'Ahmed Elkholy'},'image':ORIGIN+image}
            put(ROOT/path.lstrip('/')/'index.html',shell(lang,path,title,desc,body,schema,head_metadata))
        for kind,records in [('services',SERVICES),('projects',data['projects'])]:
            title=('الخدمات الهندسية' if ar else 'Backend Engineering Services') if kind=='services' else ('المشاريع ودراسات الحالة' if ar else 'Projects & Engineering Case Studies')
            desc=('تطوير Laravel وShopify والمدفوعات وأتمتة الأعمال.' if ar else 'Laravel, Shopify, payment integrations, operational tools and AI automation.') if kind=='services' else ('تحديات حقيقية والقرارات الهندسية وراء تنفيذ المشاريع.' if ar else 'Project constraints, implementation choices and scope of engineering work.')
            body=f'<header class="articlehead"><h1>{title}</h1><p class="lead">{desc}</p></header><div class="profile-grid">'
            for record in records:
                slug=record['slug'] if kind=='services' else record['id'];name=record[lang][0] if kind=='services' else record['title'];summary=record[lang][1] if kind=='services' else record['arBlurb' if ar else 'blurb']
                body+=f'<article><h2><a href="/{lang}/{kind}/{slug}/">{e(name)} ↗</a></h2><p>{e(summary)}</p></article>'
            body+='</div>'+cta(lang);path=f'/{lang}/{kind}/'
            schema={'@context':'https://schema.org','@type':'CollectionPage','name':title,'description':desc,'url':ORIGIN+path,'inLanguage':lang}
            put(ROOT/path.lstrip('/')/'index.html',shell(lang,path,title,desc,body,schema,head_metadata))
    for kind,slugs in [('services',[x['slug'] for x in SERVICES]),('projects',[x['id'] for x in data['projects']])]:
        for slug in ['']+slugs:
            routes.append((f'/en/{kind}/'+(slug+'/' if slug else ''),f'/ar/{kind}/'+(slug+'/' if slug else ''),REVISED))
    return routes
