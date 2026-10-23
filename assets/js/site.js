// Ahmed Elkholy — project interactions and bilingual UI

  (() => {
    'use strict';
    const assets={hero:'assets/images/abstract-241c6b20e090.webp',security:'assets/images/abstract-82e162a0701a.webp',ecosystem:'assets/images/abstract-ab0ecec08761.webp'};
    const contact='mailto:mykholys30@gmail.com?subject=Project%20inquiry';
    Object.assign(assets,{shopify:'assets/images/project-shopify.webp',aiVideo:'assets/images/project-ai-video.webp',devtools:'assets/images/project-devtools.webp',securitySuite:'assets/images/project-security.webp',culturePlatform:'assets/images/project-culture.webp',commercePlatform:'assets/images/project-commerce.webp',operationsSuite:'assets/images/project-operations.webp'});
    const projects=[
    {
        "id": "vericatalog",
        "title": "VeriCatalog for Shopify",
        "category": "saas",
        "label": "SHOPIFY APP · SAAS",
        "image": "shopify",
        "featured": true,
        "year": "PRODUCT",
        "blurb": "Embedded Shopify catalog QA with 100+ deterministic checks, operational scans and guarded bulk fixes.",
        "arBlurb": "تطبيق Shopify لفحص جودة الكتالوج بأكثر من 100 تحقق وفحوصات تشغيلية وإصلاحات جماعية آمنة.",
        "description": "An embedded Shopify SaaS to detect catalog issues, schedule recurring scans and safely propose fixes without compromising merchant data.",
        "arDescription": "منصة SaaS مدمجة في Shopify لفحص أخطاء الكتالوج، وجدولة الفحص الدوري، واقتراح إصلاحات موثوقة تحافظ على بيانات المتجر.",
        "highlights": [
            "100+ quality rules for pricing, identifiers, imagery and localization",
            "Incremental scans with dedicated queues, locks, retries and stalled-run recovery",
            "Guarded remediation with preflight, verification scans and audit trails"
        ],
        "arHighlights": [
            "أكثر من 100 قاعدة جودة للأسعار والمعرّفات والصور والترجمة",
            "فحص تدريجي مع طوابير وأقفال وإعادة محاولات واستعادة المهام المتعثرة",
            "إصلاحات محمية بفحص مسبق وسجل تدقيق وإعادة تحقق"
        ],
        "tags": [
            "Laravel",
            "Shopify GraphQL",
            "Redis",
            "SaaS"
        ],
        "link": null,
        "role": "Founder / Lead Backend Engineer",
        "challenge": "Merchant catalogs accumulate problems in pricing, identifiers, images and translations. At scale, manual checks and bulk edits introduce risk.",
        "solution": "Designed 100+ deterministic quality checks, incremental Shopify GraphQL scans, controlled remediation with preflight checks and verification, and queue-based recovery.",
        "evidence": "100+ catalog-quality checks; incremental scanning and auditable change flows.",
        "arRole": "مؤسس المشروع والمهندس المسؤول عن الـBackend",
        "arChallenge": "جودة بيانات منتجات Shopify بتتأثر بأخطاء الأسعار والمعرّفات والصور والترجمات، والتعديل الجماعي غير المحسوب ممكن يسبب مشكلات.",
        "arSolution": "طورت أكثر من 100 قاعدة تحقق، وفحصًا تدريجيًا عبر Shopify GraphQL، وآليات تصحيح محمية بمراجعة مسبقة وإعادة تحقق وطوابير قابلة للاستعادة.",
        "arEvidence": "أكثر من 100 فحص لجودة الكتالوج، مع مسار تصحيح قابل للمراجعة.",
        "imageAlt": "Conceptual artwork representing VeriCatalog for Shopify; not a product screenshot"
    },
    {
        "id": "tikvideo",
        "title": "Tik Video",
        "category": "saas",
        "label": "AI VIDEO GENERATION",
        "image": "aiVideo",
        "year": "PRODUCT",
        "blurb": "AI video-generation platform with queued media pipelines, billing and resilient provider integrations.",
        "arBlurb": "منصة لتوليد الفيديو بالذكاء الاصطناعي مع معالجة غير متزامنة وتكاملات دفع ومزوّدي محتوى.",
        "description": "An AI-powered media platform built around modular Laravel backends, async generation workflows, subscriptions, payments and credit settlement.",
        "arDescription": "منصة لإنشاء الوسائط بالذكاء الاصطناعي مبنية بوحدات Laravel مستقلة، ومعالجة غير متزامنة، واشتراكات ومدفوعات وتسوية رصيد.",
        "highlights": [
            "11 backend domains across identity, subscriptions, orders, content and media",
            "Integration layer for 8+ AI and media providers with replaceable contracts",
            "Queue orchestration, webhook and polling completion, credits and refund recovery"
        ],
        "arHighlights": [
            "11 نطاقًا في الخادم للحسابات والاشتراكات والطلبات والمحتوى",
            "طبقة تكامل لأكثر من 8 مزودي ذكاء اصطناعي ووسائط",
            "تنسيق المهام والاستدعاءات والرصيد واسترداد العمليات الفاشلة"
        ],
        "tags": [
            "Laravel 12",
            "Nuxt 4",
            "Queues",
            "AI APIs"
        ],
        "link": null,
        "role": "Backend lead · AI media SaaS",
        "challenge": "AI creation workflows depend on slow and sometimes unreliable external providers; billing must match actual processing outcomes.",
        "solution": "Architected 11 Laravel domains, 8+ provider integrations, asynchronous stages, status callbacks, credit reservation, settlement and refunds.",
        "evidence": "11 backend domains and 8+ AI/media provider integrations.",
        "arRole": "المسؤول التقني عن الـBackend",
        "arChallenge": "إنشاء الفيديو بالذكاء الاصطناعي بيعتمد على مزودين خارجيين بزمن تنفيذ طويل واحتمال فشل، مع ضرورة اتساق الرصيد والدفع.",
        "arSolution": "صممت 11 وحدة Laravel ودمجت أكثر من 8 مزودين، مع طوابير مراحل التنفيذ وحالات الـWebhook وحجز وتسوية واسترداد الرصيد.",
        "arEvidence": "11 وحدة Backend وتكاملات مع أكثر من 8 مزودين للوسائط.",
        "imageAlt": "Conceptual artwork representing Tik Video; not a product screenshot"
    },
    {
        "id": "safeactions",
        "title": "Mavvix Safe Actions",
        "category": "open-source",
        "label": "FILAMENT PACKAGE · OPEN SOURCE",
        "image": "devtools",
        "year": "GITHUB",
        "blurb": "Reusable tooling for safer high-impact admin operations inside Laravel and Filament.",
        "arBlurb": "أدوات قابلة لإعادة الاستخدام لحماية العمليات الحساسة في Laravel وFilament.",
        "description": "An open-source Filament-focused package that helps teams put clearer, safer boundaries around powerful administrative actions and bulk operations.",
        "arDescription": "باكدج مفتوح المصدر موجه لـ Filament يساعد الفرق على وضع ضوابط أوضح وأكثر أمانًا حول الإجراءات الإدارية والعمليات الحساسة.",
        "highlights": [
            "Safer patterns for consequential application actions",
            "Laravel / Filament ecosystem integration",
            "Developer-oriented documentation and examples"
        ],
        "arHighlights": [
            "أنماط أكثر أمانًا للإجراءات المؤثرة في التطبيق",
            "تكامل مع بيئة Laravel وFilament",
            "وثائق وأمثلة موجهة للمطورين"
        ],
        "tags": [
            "Laravel",
            "Filament",
            "Admin UX"
        ],
        "link": "https://github.com/mykholy/mavvix-safe-actions",
        "role": "Package author · Laravel / Filament",
        "challenge": "Administrative actions can have a wide blast radius: a mistaken bulk operation or poorly scoped permission check can damage data.",
        "solution": "Created reusable patterns for guarding consequential Filament actions, with clear operational boundaries and documentation for integration.",
        "evidence": "Public source code and documentation on GitHub.",
        "arRole": "مطور الباكدج · Laravel / Filament",
        "arChallenge": "أوامر لوحة الإدارة قد تؤثر على بيانات كثيرة، وأي خطأ في الصلاحيات أو العمليات الجماعية مكلف.",
        "arSolution": "بنيت أنماطًا قابلة لإعادة الاستخدام لحماية الإجراءات الحساسة في Filament وتوضيح حدود التنفيذ وتوثيقها.",
        "arEvidence": "كود مفتوح المصدر مع التوثيق على GitHub.",
        "imageAlt": "Conceptual artwork representing Mavvix Safe Actions; not a product screenshot"
    },
    {
        "id": "jomlakwt",
        "title": "Jomlakwt Commerce",
        "category": "platform",
        "label": "MULTI-VENDOR COMMERCE",
        "image": "commercePlatform",
        "year": "PLATFORM",
        "blurb": "High-volume Kuwait marketplace backend covering sellers, checkout, delivery and wallets.",
        "arBlurb": "خلفية تقنية لسوق كويتي متعدد البائعين تشمل السلة والدفع والتوصيل والمحافظ.",
        "description": "Backend architecture and production reliability for a multi-vendor commerce platform with high API volumes and complex financial workflows.",
        "arDescription": "هندسة خلفية تقنية واستقرار تشغيلي لمنصة تجارة متعددة البائعين بأحجام طلبات كبيرة وعمليات مالية متداخلة.",
        "highlights": [
            "Production platform serving approximately 100K requests/day",
            "260+ documented APIs across commerce and finance flows",
            "Performance and incident remediation across MySQL, PHP-FPM, Nginx and queues"
        ],
        "arHighlights": [
            "منصة تخدم قرابة 100 ألف طلب يوميًا",
            "أكثر من 260 واجهة API للتجارة والمدفوعات",
            "تحسين الأداء ومعالجة أعطال MySQL وPHP-FPM وNginx والمهام"
        ],
        "tags": [
            "Laravel",
            "MySQL",
            "API",
            "Payments"
        ],
        "link": "https://jomlakwt.com",
        "role": "Senior Backend Engineer · Commerce",
        "challenge": "Marketplace checkout, seller operations, payouts and delivery rely on high-volume APIs and consistent financial state.",
        "solution": "Led and maintained Laravel API architecture, investigated MySQL, PHP-FPM and queue bottlenecks, and supported wallets, refunds and order workflows.",
        "evidence": "~100K daily requests and 260+ APIs in the platform, as described in CV.",
        "arRole": "مهندس Backend أول · تجارة إلكترونية",
        "arChallenge": "منصة متعددة التجار بتحتاج أداء ثابتًا مع ضغط الطلبات وتداخل حالات الدفع والتوصيل والمحافظ.",
        "arSolution": "قدت تطوير ومتابعة الـAPIs وحل اختناقات MySQL وPHP-FPM والطوابير ودعمت مسارات الطلبات والمحافظ والاسترداد.",
        "arEvidence": "حوالي 100 ألف طلب يوميًا وأكثر من 260 API وفق السيرة الذاتية.",
        "imageAlt": "Conceptual artwork representing Jomlakwt Commerce; not a product screenshot"
    },
    {
        "id": "flowguard",
        "title": "Laravel FlowGuard",
        "category": "open-source",
        "label": "OPEN SOURCE · RELIABILITY",
        "image": "devtools",
        "year": "GITHUB",
        "blurb": "Primitives for guarded operations, idempotency and reliable transaction boundaries.",
        "arBlurb": "أدوات لضبط العمليات الحساسة ومنع التكرار وتحسين موثوقية حدود المعاملات.",
        "description": "An open-source Laravel package focused on explicit operation boundaries and reliable flow control in failure-prone workflows.",
        "arDescription": "حزمة Laravel مفتوحة المصدر لتنظيم حدود العمليات بوضوح والتحكم في تدفقات العمل المعرضة للأعطال.",
        "highlights": [
            "Guarded operation claims and reconciliation-aware workflows",
            "Transaction-aware reliability building blocks",
            "Examples and documentation for practical integration"
        ],
        "arHighlights": [
            "عمليات محمية ومسارات واضحة لتسوية الحالات غير المعروفة",
            "مكوّنات موثوقية تراعي حدود معاملات قواعد البيانات",
            "أمثلة ووثائق للتكامل داخل المشاريع"
        ],
        "tags": [
            "Laravel",
            "Idempotency",
            "Reliability"
        ],
        "link": "https://github.com/mykholy/laravel-flowguard",
        "role": "Open-source author",
        "challenge": "Retries, timeouts and partial failures make external side effects difficult to reason about.",
        "solution": "Developed guarded operation claims, explicit reconciliation boundaries and practical integration examples for Laravel services.",
        "evidence": "Public repository with integration guidance.",
        "arRole": "مطور الحزمة مفتوحة المصدر",
        "arChallenge": "الـRetries والـTimeouts وفشل جزء من العملية ممكن يؤدي لتكرار التأثيرات أو نتائج غير معروفة.",
        "arSolution": "بنيت واجهات لضبط العمليات الحساسة، وحدود واضحة للتسوية بعد الفشل، وأمثلة تكامل مناسبة لـLaravel.",
        "arEvidence": "مستودع عام وأمثلة توضح التكامل.",
        "imageAlt": "Conceptual artwork representing Laravel FlowGuard; not a product screenshot"
    },
    {
        "id": "culturebridge",
        "title": "Culture Bridges",
        "category": "platform",
        "label": "EVENTS & TICKETING",
        "image": "culturePlatform",
        "year": "PLATFORM",
        "blurb": "Operational portals and APIs for registrations, events, QR check-in and payment workflows.",
        "arBlurb": "بوابات تشغيل وواجهات API للتسجيل في الفعاليات وتذاكر الدخول والدفع.",
        "description": "Coordinated attendee, organizer and administration experiences for event management, registration, check-in and payment operations.",
        "arDescription": "تجربة متكاملة للحضور والمنظمين والإدارة تشمل الفعاليات والتسجيل والدخول والمدفوعات.",
        "highlights": [
            "Registration and event-management API design",
            "QR-based check-in and operational dashboards",
            "Payment integrations and verified callback states"
        ],
        "arHighlights": [
            "تصميم APIs للتسجيل وإدارة الفعاليات",
            "تسجيل حضور باستخدام QR ولوحات تشغيل",
            "تكاملات دفع والتحقق من حالة الاستدعاءات"
        ],
        "tags": [
            "Laravel",
            "Nuxt",
            "Payments",
            "QR"
        ],
        "link": "https://culturebridgesa.com",
        "role": "Backend engineering · Events platform",
        "challenge": "Event operations must coordinate sign-up, ticket state, payment and on-site check-in across multiple roles.",
        "solution": "Built REST APIs and operational flows covering registration, organizer management, QR validation and verified payment callbacks.",
        "evidence": "Organizer, admin and attendee workflows delivered.",
        "arRole": "هندسة الـBackend · منصة فعاليات",
        "arChallenge": "إدارة الفعاليات محتاجة ربط التسجيل والتذاكر والمدفوعات وتسجيل الدخول بين فرق مختلفة.",
        "arSolution": "نفذت APIs ومسارات تشغيل للتسجيل والمنظمين والتحقق من QR والـPayment callbacks.",
        "arEvidence": "تدفقات للحضور والمنظمين والإدارة ضمن المنصة.",
        "imageAlt": "Conceptual artwork representing Culture Bridges; not a product screenshot"
    },
    {
        "id": "triplestock",
        "title": "TrippleStock — POS & Inventory",
        "category": "platform",
        "label": "POS · MULTI-WAREHOUSE",
        "image": "commercePlatform",
        "year": "PLATFORM",
        "blurb": "Stock, purchasing, invoices and accounting workflows designed for multi-warehouse operations.",
        "arBlurb": "تطوير عمليات المخزون والمشتريات والفواتير والحسابات عبر أكثر من مخزن.",
        "description": "Inventory and financial operations for POS environments with warehouse transfers, purchasing, sales and payment reconciliation.",
        "arDescription": "نظام للمخزون والمبيعات والمشتريات والتحويلات بين المخازن مع معالجة حالات الفواتير والمدفوعات.",
        "highlights": [
            "Multi-warehouse stock and POS workflows",
            "Duplicate-transaction handling and stock restoration",
            "Financial reconciliation for operational consistency"
        ],
        "arHighlights": [
            "مسارات نقاط بيع ومخزون متعدد المخازن",
            "معالجة التكرار واستعادة أرصدة الأصناف",
            "تسوية العمليات المالية والتشغيلية"
        ],
        "tags": [
            "Laravel",
            "Vue 2",
            "Inventory",
            "Accounting"
        ],
        "link": null,
        "role": "Backend engineering · Retail systems",
        "challenge": "Stock and accounting drift when orders, returns and payments are processed concurrently or retried.",
        "solution": "Worked on multi-warehouse purchases, sales, invoices and financial flows, repairing duplicate transactions and stock restoration edge cases.",
        "evidence": "Warehouse, POS and reconciliation workflows documented in CV.",
        "arRole": "هندسة الـBackend · أنظمة نقاط بيع",
        "arChallenge": "رصيد المخزون والحسابات ممكن يختلف بعد التكرار أو إلغاء المبيعات أو التزامن.",
        "arSolution": "اشتغلت على عمليات المخازن والمشتريات والمبيعات والفواتير وأصلحت حالات تكرار المعاملات واستعادة المخزون.",
        "arEvidence": "مسارات نقاط البيع والمخزون والتسوية ضمن خبراتي في السيرة الذاتية.",
        "imageAlt": "Conceptual artwork representing TrippleStock — POS & Inventory; not a product screenshot"
    },
    {
        "id": "accessproof",
        "title": "Laravel AccessProof",
        "category": "open-source",
        "label": "OPEN SOURCE · AUTHORIZATION",
        "image": "securitySuite",
        "year": "GITHUB",
        "blurb": "Authorization and tenant-isolation regression checks for Laravel applications.",
        "arBlurb": "اختبارات تراجع للصلاحيات والعزل بين العملاء في تطبيقات Laravel.",
        "description": "A developer-oriented package for detecting authorization regressions and checking isolation between tenants and roles.",
        "arDescription": "حزمة للمطورين تساعد في اكتشاف أخطاء تراجع الصلاحيات والتحقق من الفصل بين المستأجرين والأدوار.",
        "highlights": [
            "Test-oriented authorization safety checks",
            "Tenant isolation and regression coverage",
            "Designed for practical Laravel test suites"
        ],
        "arHighlights": [
            "فحوصات أمان الصلاحيات موجهة للاختبارات",
            "تغطية عزل العملاء ومنع أخطاء التراجع",
            "تكامل عملي مع اختبارات Laravel"
        ],
        "tags": [
            "Laravel",
            "Security",
            "Testing"
        ],
        "link": "https://github.com/mykholy/laravel-accessproof",
        "role": "Open-source author",
        "challenge": "Authorization changes can accidentally expose tenant data or weaken access checks across roles.",
        "solution": "Created test-oriented checks to surface role and tenant-isolation regressions before production changes.",
        "evidence": "Public Laravel testing package.",
        "arRole": "مطور باكدج مفتوح المصدر",
        "arChallenge": "تعديلات الصلاحيات ممكن تتسبب في كشف بيانات بين العملاء أو إعطاء أدوار وصولًا غير مقصود.",
        "arSolution": "طورت اختبارات تراجع للصلاحيات والعزل بين الـTenants قبل طرح التغييرات.",
        "arEvidence": "حزمة اختبارات Laravel مفتوحة المصدر.",
        "imageAlt": "Conceptual artwork representing Laravel AccessProof; not a product screenshot"
    },
    {
        "id": "omnichannel",
        "title": "Omnichannel CRM",
        "category": "saas",
        "label": "MESSAGING · MULTI-TENANT",
        "image": "operationsSuite",
        "year": "SAAS",
        "blurb": "Tenant-aware messaging architecture connecting WhatsApp, email and social channels.",
        "arBlurb": "بنية رسائل متعددة العملاء تربط واتساب والبريد الإلكتروني وقنوات التواصل.",
        "description": "A multi-tenant messaging backend for inbound and outbound conversation delivery and unified contact resolution across channels.",
        "arDescription": "بنية خلفية متعددة المستأجرين لتوحيد المحادثات وجهات الاتصال والإرسال والاستقبال عبر قنوات مختلفة.",
        "highlights": [
            "Nine channel types across email, WhatsApp, social and SMS",
            "Webhook signatures, idempotent writes and tenant-aware routing",
            "Asynchronous delivery, contact resolution and failure recovery"
        ],
        "arHighlights": [
            "تسعة أنواع قنوات تشمل البريد وواتساب والسوشيال وSMS",
            "التحقق من الويب هوك والكتابة دون تكرار وفصل العملاء",
            "إرسال غير متزامن وتوحيد جهات الاتصال ومعالجة الفشل"
        ],
        "tags": [
            "Laravel",
            "Webhooks",
            "Redis",
            "Messaging"
        ],
        "link": null,
        "role": "Backend architecture · Messaging SaaS",
        "challenge": "Teams need consistent conversations across channels while preserving tenant separation and message delivery status.",
        "solution": "Designed tenant-aware routing, signed webhooks, contact identity resolution and asynchronous messaging across nine channel types.",
        "evidence": "Nine channel types covered in the system design.",
        "arRole": "هندسة الـBackend · منصة رسائل",
        "arChallenge": "فرق العمل محتاجة توحيد المحادثات عبر القنوات من غير خلط البيانات بين العملاء.",
        "arSolution": "صممت توجيهًا متعدد المستأجرين، والتحقق من الـWebhooks، وتوحيد جهات الاتصال والإرسال غير المتزامن عبر تسعة أنواع قنوات.",
        "arEvidence": "تغطية تسعة أنواع من قنوات الرسائل.",
        "imageAlt": "Conceptual artwork representing Omnichannel CRM; not a product screenshot"
    },
    {
        "id": "dorosak",
        "title": "Dorosak & IBAL Learning Platforms",
        "category": "platform",
        "label": "EDTECH · MULTI-ROLE",
        "image": "culturePlatform",
        "year": "PLATFORM",
        "blurb": "Student, teacher and parent experiences built on role-aware learning APIs and subscriptions.",
        "arBlurb": "تجارب تعليمية للطالب والمعلم وولي الأمر عبر APIs وصلاحيات واشتراكات.",
        "description": "Learning backends integrating lessons, subscriptions, assessments, reporting and legacy systems for schools and training.",
        "arDescription": "أنظمة تعليمية تربط الدروس والاشتراكات والاختبارات والتقارير والتكامل مع خدمات قديمة.",
        "highlights": [
            "Learning access, permissions and assessment APIs",
            "Legacy compatibility and external data synchronization",
            "Transactional imports and reporting improvements"
        ],
        "arHighlights": [
            "واجهات للصلاحيات والمحتوى والاختبارات",
            "توافق مع الأنظمة القديمة ومزامنة بيانات خارجية",
            "استيراد بيانات آمن وتحسين التقارير"
        ],
        "tags": [
            "Laravel",
            "API",
            "Subscriptions",
            "EdTech"
        ],
        "link": null,
        "role": "Senior Backend Engineer · Education",
        "challenge": "Learning experiences must respect multiple roles, subscriptions and assessment states across legacy services.",
        "solution": "Delivered APIs and integration paths for learning plans, exams, reporting and external synchronization; improved permissions and transactional imports.",
        "evidence": "Multi-role learning and legacy integrations noted in CV.",
        "arRole": "مهندس Backend أول · منصات تعليمية",
        "arChallenge": "تعدد المستخدمين والاشتراكات والاختبارات مع ربط خدمات قديمة يخلق تعقيدًا في الصلاحيات والبيانات.",
        "arSolution": "نفذت APIs للخطط والاختبارات والتقارير والمزامنة الخارجية مع تحسين الصلاحيات وعمليات الاستيراد.",
        "arEvidence": "خبرة موثقة في منصات تعليمية متعددة الأدوار.",
        "imageAlt": "Conceptual artwork representing Dorosak & IBAL Learning Platforms; not a product screenshot"
    },
    {
        "id": "failurelab",
        "title": "Laravel FailureLab",
        "category": "open-source",
        "label": "OPEN SOURCE · TESTING",
        "image": "devtools",
        "year": "GITHUB",
        "blurb": "Failure-oriented development tooling for exploring how systems behave under stress.",
        "arBlurb": "أدوات تطوير واختبارات لفهم سلوك الأنظمة تحت الأعطال والضغط.",
        "description": "An open-source Laravel project centered on failure scenarios and making reliability problems easier to reproduce and reason about.",
        "arDescription": "مشروع Laravel مفتوح المصدر يركز على سيناريوهات الفشل ويسهّل إعادة إنتاج مشاكل الموثوقية وتحليلها.",
        "highlights": [
            "Failure-focused engineering workflows",
            "Repeatable tests for uncomfortable edge cases",
            "Built for the Laravel development ecosystem"
        ],
        "arHighlights": [
            "تدفقات عمل هندسية تركز على الأعطال",
            "اختبارات متكررة للحالات الطرفية المعقدة",
            "مصمم لبيئة تطوير Laravel"
        ],
        "tags": [
            "Laravel",
            "Testing",
            "Resilience"
        ],
        "link": "https://github.com/mykholy/laravel-failurelab",
        "role": "Open-source author",
        "challenge": "Happy-path tests miss outages, duplicate deliveries, race conditions and recovery scenarios.",
        "solution": "Focused test tooling on controlled failure scenarios that make reliability behavior easier to reproduce and inspect.",
        "evidence": "Public repository centered on failure testing.",
        "arRole": "مطور باكدج مفتوح المصدر",
        "arChallenge": "اختبارات النجاح وحدها لا تكشف مشاكل الأعطال والتسابق والتكرار والاستعادة.",
        "arSolution": "ركزت الحزمة على سيناريوهات فشل قابلة لإعادة الإنتاج والتحليل.",
        "arEvidence": "مستودع عام لاختبارات الأعطال.",
        "imageAlt": "Conceptual artwork representing Laravel FailureLab; not a product screenshot"
    },
    {
        "id": "leakproof",
        "title": "Laravel LeakProof",
        "category": "open-source",
        "label": "OPEN SOURCE · SECURITY",
        "image": "securitySuite",
        "year": "GITHUB",
        "blurb": "Developer-first package focused on reducing accidental disclosure of secrets.",
        "arBlurb": "حزمة للمطورين تركز على تقليل تسريب الأسرار والبيانات الحساسة بطريق الخطأ.",
        "description": "A Laravel-oriented open-source tool for improving secret detection hygiene and reducing accidental exposure of sensitive values.",
        "arDescription": "حزمة Laravel مفتوحة المصدر تساعد على اكتشاف الأسرار وتقليل التسريب غير المقصود للقيم الحساسة.",
        "highlights": [
            "Focus on detection of potentially sensitive values",
            "Practical safeguards for application development",
            "Shareable developer guidance and reusable tooling"
        ],
        "arHighlights": [
            "التركيز على اكتشاف القيم الحساسة",
            "حماية عملية خلال تطوير التطبيقات",
            "وثائق وأدوات قابلة لإعادة الاستخدام"
        ],
        "tags": [
            "Laravel",
            "Security",
            "Secrets"
        ],
        "link": "https://github.com/mykholy/laravel-leakproof",
        "role": "Open-source author",
        "challenge": "Secrets can leak through logs, error reports and accidental output during development.",
        "solution": "Built safeguards and detection patterns for sensitive values, emphasizing practical developer integration.",
        "evidence": "Public repository and setup guidance.",
        "arRole": "مطور باكدج مفتوح المصدر",
        "arChallenge": "مفاتيح الـAPI وأسرار الأنظمة ممكن تظهر في الـLogs أو رسائل الخطأ أو البيانات المعروضة.",
        "arSolution": "بنيت فحوصات وتقنيات لكشف القيم الحساسة وتقليل التسريب غير المقصود.",
        "arEvidence": "مستودع عام وتوثيق للاستخدام.",
        "imageAlt": "Conceptual artwork representing Laravel LeakProof; not a product screenshot"
    },
    {
        "id": "emicrolearn",
        "title": "eMicroLearn & EdTech",
        "category": "platform",
        "label": "EDTECH · APIS",
        "image": "culturePlatform",
        "year": "PLATFORM",
        "blurb": "Multi-role learning APIs, subscriptions, reporting and external service integrations.",
        "arBlurb": "واجهات تعليمية متعددة الأدوار والاشتراكات والتقارير والتكاملات الخارجية.",
        "description": "Production EdTech systems serving students, teachers and parents with subscriptions, exams, data synchronization and administration.",
        "arDescription": "أنظمة تعليمية تشغيلية للطلاب والمعلمين وأولياء الأمور تشمل الاشتراكات والاختبارات والمزامنة والإدارة.",
        "highlights": [
            "Multi-role permissions, learning plans and exam workflows",
            "Transactional imports and legacy integrations",
            "Reporting performance and administrative experience improvements"
        ],
        "arHighlights": [
            "صلاحيات متعددة الأدوار والاشتراكات ومسارات الاختبارات",
            "استيراد بيانات آمن وتكاملات مع أنظمة قديمة",
            "تحسين أداء التقارير وتجربة الإدارة"
        ],
        "tags": [
            "Laravel",
            "EdTech",
            "Integrations"
        ],
        "link": null,
        "role": "Backend engineering · EdTech",
        "challenge": "Different users and legacy services require correct permissions, reliable imports and responsive reporting.",
        "solution": "Built role-aware educational APIs, subscriptions and exam flows, with transactional imports, integration and query tuning.",
        "evidence": "Student, teacher, parent and admin journeys.",
        "arRole": "هندسة الـBackend · التعليم",
        "arChallenge": "تعدد صلاحيات الطلاب والمدرسين وأولياء الأمور وتكامل الأنظمة القديمة بيحتاج دقة في البيانات والتقارير.",
        "arSolution": "نفذت APIs وصلاحيات واشتراكات واختبارات وتكاملات واستيراد بيانات داخل Transactions مع تحسين الاستعلامات.",
        "arEvidence": "تجارب للطالب والمعلم وولي الأمر والإدارة.",
        "imageAlt": "Conceptual artwork representing eMicroLearn & EdTech; not a product screenshot"
    },
    {
        "id": "paymentgateway",
        "title": "Laravel PaymentGateway",
        "category": "open-source",
        "label": "OPEN SOURCE · FINTECH",
        "image": "securitySuite",
        "year": "GITHUB",
        "blurb": "Laravel payment integration toolkit spanning 30+ payment providers.",
        "arBlurb": "مجموعة تكاملات دفع لـLaravel تشمل أكثر من 30 مزود خدمة.",
        "description": "A reusable payment integration library for Laravel developers working with multiple payment providers and payment methods.",
        "arDescription": "مكتبة تكاملات دفع قابلة لإعادة الاستخدام لمطوري Laravel مع بوابات ووسائل دفع متنوعة.",
        "highlights": [
            "Support for 30+ payment provider integrations",
            "Reusable interfaces for gateway-facing workflows",
            "Public repository for integration and contribution"
        ],
        "arHighlights": [
            "تكاملات لأكثر من 30 مزود دفع",
            "واجهات برمجية قابلة لإعادة الاستخدام",
            "مستودع مفتوح للتكامل والمساهمة"
        ],
        "tags": [
            "Laravel",
            "Payments",
            "FinTech"
        ],
        "link": "https://github.com/mykholy/paymentgateway",
        "role": "Open-source maintainer · Payments",
        "challenge": "Integrating payment providers individually leads to repeated implementations and inconsistent request and callback flows.",
        "solution": "Maintained reusable gateway-facing interfaces and integrations for cards, wallets and regional payment services.",
        "evidence": "30+ provider integrations noted in CV.",
        "arRole": "مطور مكتبة مدفوعات مفتوحة المصدر",
        "arChallenge": "كل بوابة دفع لها API واستدعاءات وحالات مختلفة، ودمجها بشكل منفصل يكرر العمل ويزيد أخطاء التكامل.",
        "arSolution": "طورت واجهات قابلة لإعادة الاستخدام لبوابات الدفع بالبطاقات والمحافظ ووسائل الدفع الإقليمية.",
        "arEvidence": "أكثر من 30 تكاملًا حسب السيرة الذاتية.",
        "imageAlt": "Conceptual artwork representing Laravel PaymentGateway; not a product screenshot"
    },
    {
        "id": "paymob",
        "title": "Laravel Paymob Integration",
        "category": "open-source",
        "label": "OPEN SOURCE · PAYMENTS",
        "image": "securitySuite",
        "year": "GITHUB",
        "blurb": "Payment flows with callbacks, HMAC verification and support for cards and wallets.",
        "arBlurb": "تكامل Paymob للبطاقات والمحافظ مع التحقق من الـCallbacks وتوقيع HMAC.",
        "description": "Reusable Laravel integration workflows for Paymob transaction states, callback verification and payment methods.",
        "arDescription": "باكدج Laravel لتكامل Paymob وحالات الدفع والتحقق من الاستدعاءات وتوقيع HMAC.",
        "highlights": [
            "Card and wallet payment integration patterns",
            "HMAC callback verification",
            "Reusable Laravel payment workflows"
        ],
        "arHighlights": [
            "أنماط تكامل للبطاقات والمحافظ",
            "التحقق من توقيع HMAC للاستدعاءات",
            "تدفقات دفع قابلة لإعادة الاستخدام في Laravel"
        ],
        "tags": [
            "Laravel",
            "Paymob",
            "HMAC",
            "Payments"
        ],
        "link": "https://github.com/mykholy/laravel-paymob",
        "role": "Open-source author · Payment integrations",
        "challenge": "Payment callbacks can be spoofed or delivered out of order; each integration needs explicit verification.",
        "solution": "Packaged common Paymob payment flow concerns, including authenticated callbacks and card/wallet integration.",
        "evidence": "Public GitHub repository and CV reference.",
        "arRole": "مطور باكدج مفتوح المصدر · المدفوعات",
        "arChallenge": "الـCallbacks تحتاج تحققًا واضحًا وقد تصل بترتيب غير متوقع، وده مهم لتأكيد عمليات الدفع بأمان.",
        "arSolution": "قدمت تكاملًا قابلًا لإعادة الاستخدام يتضمن التحقق من الاستدعاءات ودعم البطاقات والمحافظ.",
        "arEvidence": "مستودع عام ومذكور في السيرة الذاتية.",
        "imageAlt": "Conceptual artwork representing Laravel Paymob Integration; not a product screenshot"
    },
    {
        "id": "sajah",
        "title": "Sajah — Event Operations",
        "category": "platform",
        "label": "EVENTS · CHECK-IN",
        "image": "culturePlatform",
        "year": "PLATFORM",
        "blurb": "Registration, schedules, ticket validation and payment-oriented operational workflows.",
        "arBlurb": "تسجيل الفعاليات والجداول والتحقق من التذاكر ومسارات الدفع.",
        "description": "Event operations including registration, scheduling, QR check-in and payment coordination for the Saudi market.",
        "arDescription": "نظام عمليات فعاليات يشمل التسجيل والجدولة ودخول QR وتنسيق عمليات الدفع.",
        "highlights": [
            "Role-specific event management APIs",
            "QR check-in and operational state",
            "Payment state validation and integration"
        ],
        "arHighlights": [
            "واجهات إدارة فعاليات بصلاحيات متعددة",
            "مسارات QR وتأكيد الدخول",
            "التحقق من حالات الدفع والتكامل"
        ],
        "tags": [
            "Laravel",
            "Events",
            "QR",
            "Payments"
        ],
        "link": null,
        "role": "Backend engineering · Events",
        "challenge": "Attendee registration, schedules, tickets and paid entry must remain coordinated across teams.",
        "solution": "Implemented APIs and operational paths for organizers and attendees, including QR check-in and payment state handling.",
        "evidence": "Events/ticketing platform work referenced in CV.",
        "arRole": "هندسة الـBackend · الفعاليات",
        "arChallenge": "تحتاج عمليات التسجيل والجداول والتذاكر والدخول المدفوع لمزامنة واضحة بين الفرق.",
        "arSolution": "نفذت APIs للمنظمين والحضور مع QR والتحقق من حالات الدفع.",
        "arEvidence": "مذكور ضمن خبرتي في أنظمة الفعاليات والتذاكر.",
        "imageAlt": "Conceptual artwork representing Sajah — Event Operations; not a product screenshot"
    },
    {
        "id": "gym",
        "title": "Gym Management",
        "category": "platform",
        "label": "OPERATIONS · ATTENDANCE",
        "image": "operationsSuite",
        "year": "PLATFORM",
        "blurb": "Attendance, subscription and biometric reconciliation workflows for gyms.",
        "arBlurb": "نظام للحضور والاشتراكات والتسوية مع أجهزة البصمة للصالات الرياضية.",
        "description": "Operational backend reconciling biometric check-ins, schedules, remaining entries and subscription balances.",
        "arDescription": "نظام تشغيلي يطابق تسجيلات البصمة بالجداول وعدد الزيارات المتبقية وأرصدة الاشتراكات.",
        "highlights": [
            "Biometric attendance and membership accounting",
            "Resilience against duplicated entries and stale balances",
            "Test coverage for recovery and concurrency edge cases"
        ],
        "arHighlights": [
            "حضور بالبصمة وحسابات العضويات",
            "منع تسجيلات الحضور المكررة والأرصدة غير المتزامنة",
            "اختبارات للاستعادة وحالات التزامن"
        ],
        "tags": [
            "Laravel",
            "Operations",
            "Testing"
        ],
        "link": null,
        "role": "Backend engineering · Operations",
        "challenge": "Biometric check-ins and subscription balances can drift after duplicate events, concurrency and partial failures.",
        "solution": "Implemented evidence-based reconciliation between attendance, plans and visits, with tests for duplicates, deadlocks and recovery.",
        "evidence": "Accounting and attendance reconciliation flows.",
        "arRole": "هندسة الـBackend · نظام تشغيل",
        "arChallenge": "تسجيل الحضور بالبصمة وأرصدة الاشتراكات ممكن يختلفوا بسبب تكرار الأحداث والتزامن والأعطال.",
        "arSolution": "نفذت مطابقة مبنية على سجلات الحضور والاشتراكات واختبارات للتكرار والتعطل والاستعادة.",
        "arEvidence": "مسارات تسوية أرصدة وحضور.",
        "imageAlt": "Conceptual artwork representing Gym Management; not a product screenshot"
    }
];
    const i18n={
      en:{"navServices":"Services","servicesEyebrow":"03 / WHAT I DO","servicesHeading":"Engineering that <em>moves products.</em>","servicesSub":"From architecture decisions to production constraints, I work where backend reliability meets business-critical workflows.","serviceOneTitle":"Laravel & SaaS architecture","serviceOneBody":"Modular backends, multi-tenancy, permissions, subscriptions and API contracts that grow with your product.","serviceTwoTitle":"Shopify & payment systems","serviceTwoBody":"Shopify Admin GraphQL, webhooks, checkout integrations, wallet flows and safe transaction state handling.","serviceThreeTitle":"Production audits & recovery","serviceThreeBody":"Query bottlenecks, queues, idempotency, race conditions and failure recovery in systems that cannot afford surprises.","serviceFourTitle":"Filament & business operations","serviceFourBody":"Admin panels, internal tools, approval workflows and integrations designed for the people running them.","impactEyebrow":"02 / ENGINEERING IN PRACTICE","impactHeading":"Beyond the <em>feature list.</em>","impactSub":"Three examples of the constraints, architecture and operational thinking behind my work.","impactOneTitle":"Keeping a marketplace responsive","impactOneText":"At Jomlakwt, I worked across 260+ commerce APIs and investigated production bottlenecks in MySQL, Nginx, PHP-FPM and queues.","impactTwoTitle":"Preventing risky bulk edits","impactTwoText":"VeriCatalog combines deterministic checks, incremental scans and guarded fixes with preflight checks, verification and audit trails.","impactThreeTitle":"Making asynchronous work predictable","impactThreeText":"Tik Video spans multi-provider AI generation, queue orchestration, callbacks and credit settlement with explicit failure handling.","impactView":"Explore case","impactFoot":"Figures describe specific platforms and work scope, not projected gains or guarantees.","methodEyebrow":"07 / HOW I DELIVER","methodHeading":"Clarity from day <em>one.</em>","methodSub":"From requirements to a system your team can own, support and extend.","methodOneTitle":"Understand the constraints","methodOneBody":"Business flows, existing architecture, security boundaries and measurable acceptance criteria.","methodTwoTitle":"Design for failure","methodTwoBody":"Contracts, state transitions, idempotency, observability and safe recovery.","methodThreeTitle":"Ship in reviewable increments","methodThreeBody":"Clean code, automated tests, focused code review and production-ready deployment.","methodFourTitle":"Hand over confidently","methodFourBody":"Documentation, monitoring, trade-offs and a practical support path.","modalRole":"MY ROLE","modalChallenge":"THE CHALLENGE","modalSolution":"ENGINEERING APPROACH","modalEvidence":"SCOPE & EVIDENCE","projectCount":"projects","workSub":"Explore selected production systems, Laravel packages, Shopify work and payment integrations. Open a project for the problem, approach and technical scope.","feedbackSub":"The engineering principles collaborators can expect in technical planning, implementation and handoff.","heroDescription":"Senior Backend Engineer with 5+ years in <strong>Laravel, Shopify, SaaS, payments and high-traffic APIs.</strong> I take ownership of the difficult backend work: architecture, integrations, reliability and the path to production.","aboutSub":"Reliable software is shaped by the edge cases and trade-offs that users rarely see.",navWork:'Selected Work',navAbout:'About',navStack:'Tech Stack',navExperience:'Experience',navContact:'Contact',letsTalk:"Let's Talk",availability:'Available for Freelance Projects',heroKicker:"HELLO, I'M AHMED ELKHOLY",heroLine1:'BUILDING',heroLine2:"WHAT'S",heroLine3:'NEXT.',heroDescription:'Senior Backend Engineer specializing in <strong>Laravel, SaaS architecture, payments & reliable APIs.</strong> I turn complex systems into elegant, production-ready software.',exploreWork:'Explore my work',downloadCv:'Download CV',location:'Based in Egypt · Working worldwide',scroll:'SCROLL TO DISCOVER',statYears:'Years of backend experience',statApis:'API endpoints in a production platform',statRequests:'Approx. daily requests on commerce platform',statPayments:'Payment integrations in open-source toolkit',workEyebrow:'01 / A SELECTION OF WORK',workHeading:'Work that <em>speaks.</em>',workSub:"A curated look at SaaS products, Shopify systems, commerce platforms, AI tools and open-source packages I engineered or led technically.",filterAll:'All projects',filterSaas:'SaaS & AI',filterOpen:'Open source',filterPlatforms:'Platforms',showMore:'Show more projects',showLess:'Show fewer projects',aboutEyebrow:'02 / BEHIND THE CODE',aboutHeading:'More than <em>code.</em>',aboutSub:'I care about how systems behave on their worst day, not just how they look on a successful demo.',aboutMainTag:'THE PERSON BEHIND THE PRODUCT',aboutTitle:'I build the systems that make ambitious products possible.',aboutText:'From multi-vendor commerce and EdTech to AI-powered SaaS and payment orchestration, my focus is the engineering foundation: clean boundaries, resilience, maintainability and measurable outcomes.',aboutSign:'Senior Backend Engineer · Egypt',bentoReliability:'Reliability first',bentoReliabilityText:'Transactions, idempotency, queues, reconciliation and failure recovery designed as product features.',bentoArchitecture:'Designed to evolve',bentoArchitectureText:'Modular APIs, clear contracts, testable boundaries and architecture that survives growing teams and requirements.',stackEyebrow:'03 / TOOLBOX',stackHeading:'My technical <em>DNA.</em>',stackSub:'The stack is broad, but the goal stays the same: clean architecture, stable operations, maintainable code and fast product delivery.',stackCoreTag:'BUILD / CORE',stackCore:'Backend & architecture',stackCoreSub:'Production PHP, API contracts and maintainable systems.',stackDataTag:'PERFORMANCE / DATA',stackData:'Databases & reliability',stackDataSub:'High-volume workloads, transactions and recovery.',stackDeployTag:'SHIP / OPERATE',stackDeploy:'Cloud & developer tooling',stackDeploySub:'Build, test, deploy and operate with confidence.',stackFoot:'Also comfortable collaborating with Nuxt, Vue, Livewire & frontend teams.',experienceEyebrow:'04 / THE JOURNEY',experienceHeading:'Experience <em>in motion.</em>',experienceSub:'Engineering ownership across real platforms, production constraints and multidisciplinary teams.',expGrids:'Backend ownership across enterprise learning, SaaS and operational systems: architecture, integrations, migrations, production support and technical reviews.',expArrays:'Designed Laravel domains and recoverable integrations for Saudi-facing AI/media and event products, including payments and asynchronous workloads.',expJomla:'Led high-volume commerce APIs, reliability and performance across seller operations, checkout, delivery, wallets and refunds.',experiencePanelTag:"LET'S MAKE IT WORK",experiencePanelTitle:'Need a hands-on technical partner?',experiencePanelText:'I can help with system architecture, backend delivery, Shopify and payment workflows, technical audits, integrations and hard production problems.',discussProject:'Discuss your project',feedbackEyebrow:'05 / HOW I WORK',feedbackHeading:'The work. <em>The trust.</em>',feedbackSub:'What collaborators can expect from me — without fabricated client quotes or endorsements.',feedbackOne:'Clear communication, ownership and honest technical trade-offs — from first architecture call to launch.',feedbackOneNote:'WORKING PRINCIPLE / COLLABORATION',feedbackTwo:'A bias for testing critical flows, not just celebrating the happy path.',feedbackTwoNote:'WORKING PRINCIPLE / QUALITY',feedbackThree:'Systems that are understandable, supportable and built for the next engineer.',feedbackThreeNote:'WORKING PRINCIPLE / HANDOFF',feedbackNote:'Verified client references can be discussed privately on request. No public testimonials are attributed without permission.',contactEyebrow:'06 / READY WHEN YOU ARE',contactHeading:'LET\'S BUILD<br /><span>SOMETHING REAL.</span>',contactSub:"Have a product to launch, a platform to scale or an integration to untangle? Let's talk about the problem and find a clean way forward.",emailMe:'Send me an email',whatsappMe:'WhatsApp me',footerCopy:'© 2026 Ahmed Elkholy. Engineered with purpose.',modalHighlights:'Engineering highlights',modalLive:'Visit website',modalSource:'View on GitHub',modalAsk:'Discuss similar work',view:'Explore',projectDetails:'View project details',noProject:'No projects in this category.'},
      ar:{"navServices":"الخدمات","servicesEyebrow":"03 / أقدر أساعدك في إيه","servicesHeading":"هندسة <em>بتحرك المنتج.</em>","servicesSub":"من اختيار البنية إلى تعقيدات التشغيل، بشتغل عند نقطة التقاء استقرار الـBackend مع احتياجات البيزنس.","serviceOneTitle":"هندسة Laravel وSaaS","serviceOneBody":"وحدات واضحة، فصل العملاء، الصلاحيات، الاشتراكات، وواجهات API قابلة للتوسع.","serviceTwoTitle":"Shopify وأنظمة الدفع","serviceTwoBody":"Shopify GraphQL وWebhooks ووسائل الدفع والمحافظ وإدارة حالات المعاملات بأمان.","serviceThreeTitle":"مراجعة الأنظمة وحل الأعطال","serviceThreeBody":"بطء قواعد البيانات والطوابير ومنع التكرار والتزامن والاستعادة بعد الفشل.","serviceFourTitle":"Filament وأنظمة التشغيل","serviceFourBody":"لوحات إدارة وأدوات داخلية وموافقات وتكاملات مصممة للفرق التي تستخدمها يوميًا.","impactEyebrow":"02 / أمثلة هندسية حقيقية","impactHeading":"أكتر من <em>مجرد مميزات.</em>","impactSub":"3 أمثلة للتحديات والقرارات الهندسية اللي بتوضح طبيعة شغلي.","impactOneTitle":"الحفاظ على أداء منصة تجارة","impactOneText":"في Jomlakwt اشتغلت على أكثر من 260 API وحل اختناقات إنتاجية في MySQL وNginx وPHP-FPM والطوابير.","impactTwoTitle":"تقليل مخاطر التعديل الجماعي","impactTwoText":"VeriCatalog بيجمع فحصًا قائمًا على قواعد، ومسحًا تدريجيًا، وإصلاحات محمية بمراجعة مسبقة وتحقق وسجل تدقيق.","impactThreeTitle":"تنظيم المهام غير المتزامنة","impactThreeText":"Tik Video بيتعامل مع عدة مزودين ذكاء اصطناعي وطوابير ومعالجة Webhooks وتسوية الرصيد عند الفشل.","impactView":"تفاصيل المشروع","impactFoot":"الأرقام مرتبطة بنطاق أنظمة محددة، وليست وعودًا بنتائج أو أرقام تسويقية.","methodEyebrow":"07 / طريقة تنفيذ المشاريع","methodHeading":"وضوح من <em>أول يوم.</em>","methodSub":"من المتطلبات لحد نظام يقدر فريقك يصونه ويطوره.","methodOneTitle":"أفهم القيود والمتطلبات","methodOneBody":"رحلة المستخدم والبنية الحالية والصلاحيات ومعايير النجاح القابلة للقياس.","methodTwoTitle":"أصمم مع وضع الأعطال في الاعتبار","methodTwoBody":"عقود واضحة وحالات تنفيذ ومنع تكرار ومراقبة واستعادة آمنة.","methodThreeTitle":"أسلم على مراحل قابلة للمراجعة","methodThreeBody":"كود نظيف واختبارات آلية ومراجعات مركزة ومسار نشر واضح.","methodFourTitle":"أسلم النظام بشكل مفهوم","methodFourBody":"توثيق ومراقبة وشرح قرارات تقنية وخطة دعم عملية.","modalRole":"دوري في المشروع","modalChallenge":"التحدي","modalSolution":"الحل الهندسي","modalEvidence":"نطاق العمل والدليل","projectCount":"مشروع","workSub":"مشاريع إنتاجية وباكدجات Laravel وتطبيقات Shopify وتكاملات الدفع. افتح المشروع لتشوف التحدي والحل ودوري والتقنيات.","feedbackSub":"المبادئ الهندسية اللي تقدر تتوقعها في التخطيط والتنفيذ والتسليم.","heroDescription":"مهندس Backend بخبرة أكثر من 5 سنوات في <strong>Laravel وShopify وSaaS والمدفوعات والـAPIs عالية الاستخدام.</strong> بتولى المسؤولية عن أصعب أجزاء الـBackend: التصميم والتكاملات والاعتمادية والتشغيل.","aboutSub":"استقرار البرامج بيتحدد بالحالات الصعبة والقرارات الهندسية اللي المستخدم غالبًا مش بيشوفها.",navWork:'الأعمال',navAbout:'نبذة عني',navStack:'المهارات',navExperience:'الخبرات',navContact:'تواصل معي',letsTalk:'خلينا نتكلم',availability:'متاح لمشاريع العمل الحر',heroKicker:'أهلاً، أنا أحمد الخولي',heroLine1:'بنبني',heroLine2:'اللي جاي',heroLine3:'بثقة.',heroDescription:'مهندس Backend متخصص في <strong>Laravel ومنصات SaaS وأنظمة Shopify وتكاملات الدفع وواجهات API الموثوقة.</strong> ببني الأساس التقني اللي يساعد المنتج يطلق، يكبر، ويشتغل بثبات في الإنتاج.',exploreWork:'شوف شغلي',downloadCv:'تحميل السيرة الذاتية',location:'مقيم في مصر · أعمل مع عملاء حول العالم',scroll:'اكتشف المزيد',statYears:'سنوات خبرة في Backend',statApis:'واجهة API في منصة إنتاجية',statRequests:'طلب يوميًا تقريبًا في منصة تجارة',statPayments:'تكامل دفع في مكتبة مفتوحة المصدر',workEyebrow:'01 / أعمال مختارة',workHeading:'أعمال <em>بتتكلم عن نفسها.</em>',workSub:'مجموعة من منتجات SaaS وأنظمة Shopify ومنصات تجارة وذكاء اصطناعي وباكدجات Laravel طورتها أو قدت تنفيذها تقنيًا.',filterAll:'كل المشاريع',filterSaas:'SaaS والذكاء الاصطناعي',filterOpen:'مفتوح المصدر',filterPlatforms:'منصات وأنظمة',showMore:'عرض مشاريع أكثر',showLess:'عرض عدد أقل',aboutEyebrow:'02 / ما وراء الكود',aboutHeading:'أكتر من <em>مجرد كود.</em>',aboutSub:'اللي يهمني سلوك النظام وقت الأعطال، مش بس شكل الديمو لما كل حاجة شغالة.',aboutMainTag:'الشخص وراء المنتج',aboutTitle:'ببني الأنظمة اللي بتحوّل الأفكار الطموحة لمنتجات حقيقية.',aboutText:'من التجارة الإلكترونية والتعليم إلى منصات الذكاء الاصطناعي والمدفوعات، تركيزي على الأساس التقني: تنظيم واضح، اعتمادية، سهولة صيانة ونتائج قابلة للقياس.',aboutSign:'مهندس Backend أول · مصر',bentoReliability:'الموثوقية أولاً',bentoReliabilityText:'معاملات، منع التكرار، طوابير، تسوية أخطاء، واستعادة العمليات الفاشلة.',bentoArchitecture:'تصميم قابل للتطور',bentoArchitectureText:'واجهات منظمة وعقود واضحة واختبارات وبنية تناسب نمو الفريق والمنتج.',stackEyebrow:'03 / الأدوات والمهارات',stackHeading:'الـ <em>Tech Stack.</em>',stackSub:'الأدوات كثيرة، لكن الهدف واحد: هندسة واضحة، تشغيل مستقر، كود قابل للصيانة، وتنفيذ سريع للمنتج.',stackCoreTag:'البناء / الأساس',stackCore:'الخلفية التقنية والهندسة',stackCoreSub:'PHP وواجهات API وأنظمة سهلة الصيانة.',stackDataTag:'الأداء / البيانات',stackData:'قواعد البيانات والموثوقية',stackDataSub:'أحمال تشغيل كبيرة ومعاملات واستعادة عند الفشل.',stackDeployTag:'النشر / التشغيل',stackDeploy:'السحابة وأدوات التطوير',stackDeploySub:'تطوير واختبار ونشر وتشغيل بثقة.',stackFoot:'بتعاون بسهولة مع فرق Nuxt وVue وLivewire والـFrontend.',experienceEyebrow:'04 / رحلتي المهنية',experienceHeading:'خبرة <em>على أرض الواقع.</em>',experienceSub:'مسؤوليات هندسية عبر منصات حقيقية وقيود تشغيلية وفرق مختلفة التخصصات.',expGrids:'مسؤولية تطوير الخلفيات التقنية في أنظمة تعليمية وتشغيلية ومنصات SaaS: تصميم وتكاملات وترحيل بيانات ودعم ومراجعات تقنية.',expArrays:'تصميم وحدات Laravel وتكاملات قابلة للاستعادة في منتجات ذكاء اصطناعي وفعاليات للسوق السعودي.',expJomla:'قيادة واجهات التجارة الإلكترونية عالية الاستخدام وتحسين الأداء والثبات في البائعين والدفع والتوصيل والمحافظ.',experiencePanelTag:'نحوّل فكرتك لحقيقة',experiencePanelTitle:'محتاج شريك تقني عملي؟',experiencePanelText:'أقدر أساعدك في هندسة الأنظمة، تطوير الـBackend، تدفقات Shopify والدفع، المراجعات التقنية، التكاملات الخارجية، وحل مشاكل التشغيل المعقدة.',discussProject:'ناقش مشروعك',feedbackEyebrow:'05 / أسلوب الشغل',feedbackHeading:'الشغل. <em>والثقة.</em>',feedbackSub:'دي المبادئ اللي بشتغل بيها، من غير اختلاق تقييمات أو شهادات عملاء.',feedbackOne:'تواصل واضح وتحمل المسؤولية وقرارات تقنية صريحة من أول اجتماع لحد الإطلاق.',feedbackOneNote:'مبدأ عمل / التعاون',feedbackTwo:'اختبار المسارات الحرجة والسيناريوهات الصعبة، مش النجاح في الحالة المثالية فقط.',feedbackTwoNote:'مبدأ عمل / الجودة',feedbackThree:'أنظمة واضحة قابلة للصيانة وسهلة التسليم للمطور اللي هيكمل بعدي.',feedbackThreeNote:'مبدأ عمل / التسليم',feedbackNote:'ممكن مناقشة مراجع عملاء موثقة بشكل خاص عند الطلب، من غير نشر شهادات منسوبة لأي شخص دون إذنه.',contactEyebrow:'06 / مستعد نبدأ',contactHeading:'خلينا نبني<br /><span>حاجة تستاهل.</span>',contactSub:'عندك منتج عاوز تطلقه، منصة تكبرها، أو تكامل معقد؟ ابعتلي نتكلم عن المشكلة ونوصل لحل هندسي عملي.',emailMe:'ابعتلي إيميل',whatsappMe:'كلمني واتساب',footerCopy:'© 2026 أحمد الخولي. صنع بإتقان.',modalHighlights:'أبرز الجوانب التقنية',modalLive:'زيارة الموقع',modalSource:'عرض على GitHub',modalAsk:'ناقش مشروع مشابه',view:'التفاصيل',projectDetails:'عرض تفاصيل المشروع',noProject:'لا توجد مشاريع في التصنيف.'}
    };
    // The language dictionaries contain legacy and newer editorial strings. Override
    // critical labels once so English, Arabic, and initial markup stay in sync.
    Object.assign(i18n.en,{
      heroKicker:'AHMED ELKHOLY · SENIOR BACKEND ENGINEER',
      heroLine1:'BACKENDS',heroLine2:'BUILT TO',heroLine3:'SCALE.',
      heroDescription:"I build <strong>reliable Laravel backends and AI-powered workflows</strong> for SaaS platforms, Shopify systems, media generation, voice/audio integrations and payments. From system design to production reliability.",
      impactEyebrow:'02 / ENGINEERING IN PRACTICE',
      servicesEyebrow:'03 / HOW I CAN HELP',
      aboutEyebrow:'04 / BEHIND THE CODE',
      stackEyebrow:'05 / TOOLBOX',
      experienceEyebrow:'06 / EXPERIENCE',
      methodEyebrow:'07 / HOW I DELIVER',
      feedbackEyebrow:'08 / PRINCIPLES',
      contactEyebrow:'09 / CONTACT'
    });
    Object.assign(i18n.ar,{
      heroKicker:'أحمد الخولي · مهندس Backend أول',
      heroLine1:'أنظمة',heroLine2:'تعتمد',heroLine3:'عليها.',
      heroDescription:'أبني <strong>أنظمة Laravel موثوقة وتكاملات AI وأتمتة ذكية</strong> لمنصات SaaS وShopify والميديا والصوت والمدفوعات، من التصميم لحد التشغيل واستعادة الأعطال.',
      impactEyebrow:'02 / الهندسة في التطبيق',
      servicesEyebrow:'03 / خدماتي',
      aboutEyebrow:'04 / ما وراء الكود',
      stackEyebrow:'05 / الأدوات والمهارات',
      experienceEyebrow:'06 / الخبرة المهنية',
      methodEyebrow:'07 / أسلوب التنفيذ',
      feedbackEyebrow:'08 / مبادئ العمل',
      contactEyebrow:'09 / تواصل معي'
    });
    let lang=location.pathname.startsWith('/ar/')?'ar':'en',activeFilter='all',expanded=false;
    let revealObserver;
    const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
    const safe=(v)=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    // Self-contained Lucide-style inline-SVG fallback for offline use.
    // The official Lucide UMD CDN is also loaded above when network access is available.
    const iconPaths={
      'arrow-up-right':'<path d="M7 17 17 7M7 7h10v10"/>',
      'arrow-up':'<path d="m18 15-6-6-6 6M12 9v12"/>',
      'arrow-down':'<path d="m6 9 6 6 6-6M12 15V3"/>',
      'download':'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
      'github':'<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-7 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 18.13V22"/>',
      'linkedin':'<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
      'menu':'<path d="M4 6h16M4 12h16M4 18h16"/>',
      'shield-check':'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
      'workflow':'<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/><path d="M7 11v4h6M11 7h4v6"/>',
      'code-2':'<path d="m16 18 6-6-6-6M8 6l-6 6 6 6M14 4l-4 16"/>',
      'layers':'<path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5"/>',
      'network':'<rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M12 8v5M5 16v-3h14v3"/>',
      'blocks':'<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>',
      'git-branch':'<circle cx="6" cy="3" r="2"/><path d="M6 5v12"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="6" r="2"/><path d="M18 8a6 6 0 0 1-6 6H6"/>',
      'database':'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5M3 12a9 3 0 0 0 18 0"/>',
      'zap':'<path d="m13 2-3 8h8l-7 12 1-9H5l8-11Z"/>',
      'repeat':'<path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4m14-1v2a3 3 0 0 1-3 3H3"/>',
      'lock':'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
      'activity':'<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
      'container':'<path d="M3 7h18v13H3zM7 7v13M12 7v13M17 7v13M3 3h18v4"/>',
      'cloud':'<path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 16.25 4 4 0 0 0 8 21h10a4 4 0 0 0 2-4.42Z"/>',
      'server':'<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/>',
      'git-pull-request':'<circle cx="6" cy="3" r="2"/><circle cx="6" cy="21" r="2"/><circle cx="18" cy="19" r="2"/><path d="M6 5v14M18 17V9a4 4 0 0 0-4-4h-3m3-3-3 3 3 3"/>',
      'flask-conical':'<path d="M10 2v7l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V2M8 2h8M7 16h10"/>',
      'bot':'<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8V4M9 4h6M8 14h.01M16 14h.01M9 18h6"/>',
      'message-square-quote':'<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/><path d="M9 10h.01M15 10h.01M8 13h8"/>',
      'check-check':'<path d="m18 6 4 4-7 7M2 12l5 5 4-4M7 7l5 5 4-4"/>',
      'heart-handshake':'<path d="M12 21s-9-5.5-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-9 12-9 12Z"/><path d="m8 13 3 2 5-4"/>',
      'mail':'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/>',
      'message-circle':'<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8A8.5 8.5 0 0 1 12.5 20a8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8A8.5 8.5 0 0 1 12.5 3H13a8.48 8.48 0 0 1 8 8v.5Z"/>',
      'at-sign':'<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 1 0 3 3V12a7 7 0 1 0-7 7"/>',
      'phone':'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.7-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8L7 10a16 16 0 0 0 7 7l1.5-1.9a2 2 0 0 1 1.8-.6l3 .5a2 2 0 0 1 1.7 1.9Z"/>',
      'message-square-more':'<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H8l-5 2 2-5v-5.5A8.5 8.5 0 0 1 13.5 3h0A8.5 8.5 0 0 1 22 11.5Z"/><path d="M8 12h.01M13 12h.01M18 12h.01"/>',
      'file-down':'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M12 11v7m-3-3 3 3 3-3"/>',
      'x':'<path d="M18 6 6 18M6 6l12 12"/>',
      'check-circle-2':'<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>',
      'external-link':'<path d="M15 3h6v6M10 14 21 3M21 13v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7"/>'
    };
    const icons=()=>{
      $$('i[data-lucide]').forEach(el=>{
        const name=el.dataset.lucide;
        el.outerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${name}" aria-hidden="true">${iconPaths[name]||'<circle cx="12" cy="12" r="8"/>'}</svg>`;
      });
    };
    const imageFor=(p)=>assets[p.image]||'';
    const previewFor=(p)=>imageFor(p).replace(/\.webp$/, '-thumb.webp');
    const cardMarkup=(p,i)=>{
      const name=safe(p.title),sub=safe(lang==='ar'?p.arBlurb:p.blurb);
      const visual=p.image==='grid'?'visual-grid':p.image==='blue'?'visual-blue':p.image==='code'?'visual-code':'';
      const image=assets[p.image]?`<img src="${previewFor(p)}" loading="lazy" decoding="async" alt="Conceptual project artwork for ${name}; not an actual UI screenshot" />`:'';
      return `<article class="project-card reveal ${p.featured?'wide':''}" role="button" tabindex="0" data-id="${p.id}" aria-label="${safe(i18n[lang].projectDetails)}: ${name}"><div class="project-cover ${visual}">${image}<span class="project-number">${String(i+1).padStart(2,'0')} / PROJECT</span><span class="cover-icon"><i data-lucide="arrow-up-right"></i></span><span class="cover-word">${name.toUpperCase()}</span></div><div class="project-body"><div class="project-meta"><span>${safe(p.label)}</span><span class="year">${safe(p.year)}</span></div><h3>${name}</h3><p>${sub}</p><div class="tag-row">${p.tags.slice(0,3).map(t=>`<span class="tag">${safe(t)}</span>`).join('')}<span class="card-view">${i18n[lang].view} <i data-lucide="arrow-up-right"></i></span></div></div></article>`;
    };
    function renderProjects(){
      let filtered=projects.filter(p=>activeFilter==='all'||p.category===activeFilter);
      const limit=expanded?filtered.length:6;
      $('#projectGrid').innerHTML=filtered.slice(0,limit).map(cardMarkup).join('')||`<p>${safe(i18n[lang].noProject)}</p>`;
      const count=$('#projectCount'); if(count) count.textContent=`${filtered.length} ${i18n[lang].projectCount}${lang==='en' && filtered.length!==1?'':''}`;
      const more=$('#loadMore'); more.hidden=filtered.length<=6;more.querySelector('span').textContent=expanded?i18n[lang].showLess:i18n[lang].showMore;
      $$('#projectGrid .project-card').forEach(el=>{
        el.addEventListener('click',()=>openProject(el.dataset.id));
        el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProject(el.dataset.id);}});
      });
      icons();observeReveal();
    }
    $$('.impact-card [data-project-link]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();openProject(a.dataset.projectLink);}));
    const dialog=$('#projectDialog');
    const projectHash=id=>'#project/'+encodeURIComponent(id);
    function openProject(id){
      const p=projects.find(x=>x.id===id);if(!p)return;
      if(location.hash!==projectHash(id))history.pushState({project:id},'',projectHash(id));
      const isAR=lang==='ar';
      $('#modalImage').src=imageFor(p)||assets.security;
      $('#modalImage').alt=p.imageAlt;
      $('#modalType').textContent=p.label;
      $('#modalTitle').textContent=p.title;
      $('#modalDescription').textContent=isAR?p.arDescription:p.description;
      $('#modalRole').textContent=isAR?p.arRole:p.role;
      $('#modalChallengeText').textContent=isAR?p.arChallenge:p.challenge;
      $('#modalSolutionText').textContent=isAR?p.arSolution:p.solution;
      $('#modalEvidenceText').textContent=isAR?p.arEvidence:p.evidence;
      $('#modalHighlightsList').innerHTML=(isAR?p.arHighlights:p.highlights).map(x=>`<li><i data-lucide="check-circle-2"></i><span>${safe(x)}</span></li>`).join('');
      $('#modalTags').innerHTML=p.tags.map(t=>`<span class="tag">${safe(t)}</span>`).join('');
      const link=p.link;
      let actions='';
      if(link){const source=link.includes('github.com');actions+=`<a href="${link}" class="primary" target="_blank" rel="noopener noreferrer"><i data-lucide="${source?'github':'external-link'}"></i>${isAR?(source?i18n.ar.modalSource:i18n.ar.modalLive):(source?i18n.en.modalSource:i18n.en.modalLive)} <i data-lucide="arrow-up-right"></i></a>`;}
      actions+=`<a href="${contact}"><i data-lucide="mail"></i>${i18n[lang].modalAsk}</a>`;
      $('#modalActions').innerHTML=actions;
      icons();if(typeof dialog.showModal==='function'){dialog.showModal();document.body.classList.add('modal-open');}else{dialog.setAttribute('open','');}
    }
    function closeModal(){if(dialog.open && dialog.close)dialog.close();else dialog.removeAttribute('open');document.body.classList.remove('modal-open');}
    $('#closeDialog').addEventListener('click',closeModal);
    dialog.addEventListener('click',e=>{if(e.target===dialog)closeModal();});
    dialog.addEventListener('close',()=>{
      document.body.classList.remove('modal-open');
      if(location.hash.startsWith('#project/'))history.replaceState(null,'',location.pathname+location.search+'#work');
    });
    window.addEventListener('popstate',()=>{
      if(location.hash.startsWith('#project/')){
        const id=decodeURIComponent(location.hash.slice(9));
        if(projects.some(p=>p.id===id)&&!dialog.open)openProject(id);
      }else if(dialog.open)dialog.close();
    });
    $$('.filter-nav button').forEach(btn=>btn.addEventListener('click',()=>{
      activeFilter=btn.dataset.filter;expanded=false;
      $$('.filter-nav button').forEach(b=>{const sel=b===btn;b.classList.toggle('active',sel);b.setAttribute('aria-pressed',String(sel));});
      renderProjects();
    }));
    $('#loadMore').addEventListener('click',()=>{expanded=!expanded;renderProjects();if(!expanded)$('#work').scrollIntoView({behavior:'smooth'});});
    function translate(next){lang=next;const isAR=lang==='ar';document.documentElement.lang=lang;document.documentElement.dir=isAR?'rtl':'ltr';$('#langSwitch').textContent=isAR?'EN':'عربي';$('#langSwitch').setAttribute('aria-label',isAR?'Switch to English':'التحويل إلى العربية');
      $$('[data-i18n]').forEach(el=>{const t=i18n[lang][el.dataset.i18n];if(t!==undefined)el.textContent=t;});
      $$('[data-i18n-html]').forEach(el=>{const t=i18n[lang][el.dataset.i18nHtml];if(t!==undefined)el.innerHTML=t;});

      $$('.home-insight-card a').forEach(a=>{
        const parts=a.getAttribute('href').split('/').filter(Boolean);
        const slug=parts[parts.length-1];
        if(slug)a.setAttribute('href','/'+lang+'/blog/'+slug+'/');
      });
      const insightsLink=$('#insights .insights-foot a');
      if(insightsLink)insightsLink.href='/'+lang+'/blog/';
      renderProjects();icons();
    }
    $('#langSwitch').addEventListener('click',()=>{const next=lang==='en'?'ar':'en';location.assign('/'+next+'/'+location.search+location.hash);});
    const navToggle=$('#menuToggle'),mobile=$('#mobilePanel');
    function closeMenu(){mobile.classList.remove('open');navToggle.setAttribute('aria-expanded','false');navToggle.setAttribute('aria-label','Open menu');}
    navToggle.addEventListener('click',()=>{const open=mobile.classList.toggle('open');navToggle.setAttribute('aria-expanded',String(open));navToggle.setAttribute('aria-label',open?'Close menu':'Open menu');});
    $$('#mobilePanel a').forEach(a=>a.addEventListener('click',closeMenu));
    const quick=$('#quickMenu'),quickTrigger=$('#quickTrigger');
    function hideQuick(){quick.classList.remove('open');quickTrigger.setAttribute('aria-expanded','false');}
    quickTrigger.addEventListener('click',()=>{const open=quick.classList.toggle('open');quickTrigger.setAttribute('aria-expanded',String(open));});
    document.addEventListener('click',e=>{if(!e.target.closest('.quick-contact'))hideQuick();if(!e.target.closest('.nav-wrap')&&!e.target.closest('#mobilePanel'))closeMenu();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){hideQuick();closeMenu();}});
    // CV links use native HTML download, without JavaScript or pop-up dependencies.
    function observeReveal(){if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){$$('.reveal').forEach(x=>x.classList.add('visible'));return;}if(!('IntersectionObserver'in window)){$$('.reveal').forEach(x=>x.classList.add('visible'));return;}if(!revealObserver)revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.09,rootMargin:'0px 0px 60px 0px'});$$('.reveal:not(.visible)').forEach(el=>revealObserver.observe(el));}
    let ticking=false;
    window.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{$('#header').classList.toggle('scrolled',window.scrollY>28);const max=document.documentElement.scrollHeight-innerHeight;$('#readingProgress').style.transform=`scaleX(${max>0?window.scrollY/max:0})`;ticking=false;});},{passive:true});
    if(window.matchMedia('(pointer:fine)').matches)window.addEventListener('pointermove',e=>{document.body.style.setProperty('--mx',e.clientX+'px');document.body.style.setProperty('--my',e.clientY+'px');},{passive:true});
    // URL language and article links are initialized after all event handlers are ready.
    translate(lang);observeReveal();
    if(location.hash.startsWith('#project/')){
      const id=decodeURIComponent(location.hash.slice(9));
      if(projects.some(p=>p.id===id))requestAnimationFrame(()=>openProject(id));
    }
    if(document.readyState!=='loading'){icons();}else{document.addEventListener('DOMContentLoaded',icons,{once:true});}
    window.addEventListener('load',icons,{once:true});
  })();

// Initialize native Tawk.to visitor monitoring on page view; greeting is non-blocking.
(function(){var chat=document.createElement('script');chat.src='/assets/js/chat.js';chat.async=true;document.head.appendChild(chat);})();
