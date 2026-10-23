// Browser smoke tests for generated static pages, run with puppeteer-core and Chrome.
import puppeteer from 'puppeteer-core';

const base = process.env.SITE_TEST_ORIGIN || 'http://127.0.0.1:4173';
const executablePath = process.env.CHROME_PATH || '/usr/bin/google-chrome';
const browser = await puppeteer.launch({executablePath, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--no-proxy-server', '--proxy-bypass-list=<-loopback>']});
let checked = 0;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
try {
  for (const locale of ['en', 'ar']) {
    for (const viewport of [{width: 320, height: 700, isMobile: true, deviceScaleFactor: 1},
                            {width: 390, height: 844, isMobile: true, deviceScaleFactor: 1},
                            {width: 768, height: 1024, isMobile: true, deviceScaleFactor: 1},
                            {width: 1440, height: 900, isMobile: false, deviceScaleFactor: 1}]) {
      const page = await browser.newPage();
      await page.setViewport(viewport);
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      let externalChatRequests = 0;
      await page.setRequestInterception(true);
      page.on('request', request => {
        if (request.url() === 'https://embed.tawk.to/6adba7539cb48b346f87ea7e/default') {
          externalChatRequests += 1;
          return request.respond({
            status: 200,
            headers: {'access-control-allow-origin': '*', 'content-type': 'application/javascript'},
            body: 'window.Tawk_API.maximize = function(){window.__tawkMockMaximized=true}; window.Tawk_API.showWidget = function(){}; window.Tawk_API.onLoad?.();',
          });
        }
        return request.continue();
      });
      const response = await page.goto(base + '/' + locale + '/', {waitUntil: 'networkidle2', timeout: 45000});
      assert([200, 304].includes(response?.status()), 'Profile HTTP error: /' + locale + '/ status=' + response?.status() + ' url=' + response?.url());
      const info = await page.evaluate(() => ({
        lang: document.documentElement.lang,
        hrefs: [...document.querySelectorAll('.home-insight-card a')].map(a => a.getAttribute('href')),
        svgCount: document.querySelectorAll('svg.lucide').length,
        unrendered: document.querySelectorAll('i[data-lucide]').length,
        xOverflow: document.documentElement.scrollWidth > innerWidth + 4,
        projects: document.querySelectorAll('#projectGrid .project-card').length,
        tawkAutoStart: window.Tawk_API?.autoStart === true,
        tawkScript: Boolean(document.querySelector('script[src="https://embed.tawk.to/6adba7539cb48b346f87ea7e/default"]')),
        noLegacyLauncher: !document.querySelector('#ae-chat-launcher'),
      }));
      assert(info.lang === locale, 'Wrong page language: ' + JSON.stringify(info));
      assert(info.hrefs.length === 6 && info.hrefs.every(url => url.startsWith('/' + locale + '/blog/')),
        'Wrong homepage article language: ' + JSON.stringify(info.hrefs));
      assert(info.svgCount >= 35 && info.unrendered === 0, 'Icons not rendered: ' + JSON.stringify(info));
      assert(info.projects >= 6, 'Dynamic project cards did not initialize: ' + JSON.stringify(info));
      assert(info.tawkAutoStart && info.tawkScript && info.noLegacyLauncher && externalChatRequests > 0,
        'Tawk must connect on page view without visitor click: ' + JSON.stringify({info, externalChatRequests}));
      await page.waitForSelector('#ae-chat-greeting', {timeout: 5000});
      const greeting = await page.evaluate(() => ({
        english: document.querySelector('#ae-chat-greeting')?.getAttribute('lang') === 'en',
        ltr: document.querySelector('#ae-chat-greeting')?.getAttribute('dir') === 'ltr',
        message: document.querySelector('#ae-chat-greeting')?.textContent || '',
      }));
      assert(greeting.english && greeting.ltr && greeting.message.includes('Hi there!'),
        'English welcome must appear automatically without opening chat: ' + JSON.stringify(greeting));
      await page.click('.ae-chat-start');
      assert(await page.evaluate(() => window.__tawkMockMaximized === true), 'Welcome action did not open native Tawk chat');
      assert(!info.xOverflow, 'Horizontal overflow on ' + locale + ' ' + viewport.width + 'px');
      assert(!errors.length, 'JavaScript errors: ' + errors.join(' | '));
      // Icons injected when a project modal opens must render as real SVGs as well.
      await page.click('#projectGrid .project-card');
      const modal = await page.evaluate(() => ({
        open: document.querySelector('#projectDialog')?.open,
        icons: document.querySelectorAll('#projectDialog svg.lucide').length,
        placeholders: document.querySelectorAll('#projectDialog i[data-lucide]').length,
      }));
      assert(modal.open && modal.icons >= 2 && modal.placeholders === 0,
        'Project modal icons are broken: ' + JSON.stringify(modal));
      await page.click('#closeDialog');
      if (viewport.isMobile) {
        await page.click('#menuToggle');
        assert(await page.evaluate(() => document.querySelector('#menuToggle').getAttribute('aria-expanded')) === 'true',
          'Mobile menu failed to open');
        await page.click('#menuToggle');
      }
      assert(!errors.length, 'JavaScript errors after interactions: ' + errors.join(' | '));
      if (viewport.isMobile) {
        const firstLink = info.hrefs[0];
        const article = await page.goto(base + firstLink, {waitUntil: 'networkidle2', timeout: 45000});
        assert([200, 304].includes(article?.status()), 'Article link returned ' + article?.status());
        assert(await page.evaluate(() => document.documentElement.lang) === locale, 'Article changed locale');
        assert((await page.title()).length > 15, 'Missing article title');
        assert(await page.evaluate(() => window.Tawk_API?.autoStart === true), 'Article did not initialize Tawk live tracking');
        assert(externalChatRequests >= 2, 'Navigating to article did not trigger Tawk automatically');
        assert(!(await page.$('#ae-chat-launcher')), 'Old on-click launcher should be removed');
      }
      if (viewport.isMobile && viewport.width === 390) {
        await page.goto(base + '/' + locale + '/blog/', {waitUntil: 'networkidle2', timeout:45000});
        await page.waitForSelector('.publication-controls button', {timeout:10000});
        const initial = await page.evaluate(() => ({
          shown:document.querySelectorAll('#blogList .blogcard:not([hidden])').length,
          published:[...document.querySelectorAll('#blogList .blogcard')].filter(c=>c.dataset.review==='published').length,
          note:document.querySelector('.publication-note')?.textContent || '',
        }));
        assert(initial.shown === 24 && initial.published > 24 && initial.note.includes(String(initial.published)),
          'Blog catalog must start with 24 reviewed articles and accurate editorial disclosure: ' + JSON.stringify(initial));
        await page.click('.blog-load-more');
        assert(await page.evaluate(() => document.querySelectorAll('#blogList .blogcard:not([hidden])').length) === 48,
          'Load-more should expose the next 24 published articles');
        await page.click('.publication-controls button:nth-child(2)');
        const withPreviews = await page.evaluate(() => ({
          shown:document.querySelectorAll('#blogList .blogcard:not([hidden])').length,
          previews:document.querySelectorAll('#blogList .blogcard[data-review="review"]:not([hidden])').length,
          all:document.querySelectorAll('#blogList .blogcard').length,
        }));
        assert(withPreviews.shown === 24 && withPreviews.all === 200,
          'All-topics mode must retain the entire reviewed and preview library: ' + JSON.stringify(withPreviews));
        // The real catalog orders reviewed articles first. Exercise pagination
        // until preview cards become visible rather than assuming draft order.
        await page.click('.blog-load-more');
        await page.click('.blog-load-more');
        await page.click('.blog-load-more');
        assert(await page.evaluate(() => document.querySelectorAll('#blogList .blogcard[data-review="review"]:not([hidden])').length) > 0,
          'Editorial previews must become accessible via Load more');
        await page.click('.publication-controls button:first-child');
        assert(await page.evaluate(() => document.querySelectorAll('#blogList .blogcard[data-review="review"]:not([hidden])').length) === 0,
          'Published-only selection should hide drafts');
      }
      if (!viewport.isMobile && locale === 'ar') {
        await page.click('#langSwitch');
        await page.waitForFunction(() => location.pathname === '/en/', {timeout: 15000});
        assert((await page.evaluate(() => [...document.querySelectorAll('.home-insight-card a')].every(a => a.pathname.startsWith('/en/blog/')))), 'Switcher failed');
      }
      checked += 1;
      await page.close();
    }
  }
  // The greeting must be immediately visible even when Tawk's external script
  // is still downloading. Clicking it should queue the chat until Tawk is ready.
  const early = await browser.newPage();
  await early.setViewport({width:390, height:844, isMobile:true});
  await early.setRequestInterception(true);
  let heldTawk = null;
  early.on('request', request => {
    if (request.url() === 'https://embed.tawk.to/6adba7539cb48b346f87ea7e/default') {
      heldTawk = request;
      return;
    }
    return request.continue();
  });
  await early.goto(base + '/en/', {waitUntil:'domcontentloaded', timeout:45000});
  await early.waitForSelector('#ae-chat-greeting', {timeout:3000});
  await early.waitForFunction(() => !!document.querySelector('script[src*="embed.tawk.to"]'), {timeout:3000});
  assert(heldTawk !== null, 'Tawk network request was not started while the page loaded');
  assert(await early.evaluate(() => document.querySelector('#ae-chat-greeting')?.textContent.includes('Welcome to my portfolio')),
    'Greeting should not wait for Tawk onLoad');
  await early.click('.ae-chat-start');
  assert(await early.evaluate(() => document.querySelector('.ae-chat-start')?.disabled === true),
    'Chat click before widget ready should show a pending state');
  await heldTawk.respond({
    status:200,
    headers:{'access-control-allow-origin':'*','content-type':'application/javascript'},
    body:'window.Tawk_API.maximize = function(){window.__tawkMockMaximized = true}; window.Tawk_API.showWidget = function(){}; window.Tawk_API.onLoad?.();',
  });
  await early.waitForFunction(() => window.__tawkMockMaximized === true, {timeout:3000});
  assert(!(await early.$('#ae-chat-greeting')), 'Queued chat opening should hide greeting');
  await early.close();

  const privacy = await browser.newPage();
  let privacyChatRequests = 0;
  await privacy.setRequestInterception(true);
  privacy.on('request', request => {
    if (request.url() === 'https://embed.tawk.to/6adba7539cb48b346f87ea7e/default') {
      privacyChatRequests += 1;
      return request.respond({status:200, headers:{'access-control-allow-origin':'*','content-type':'application/javascript'}, body:'window.Tawk_API.onLoad?.();'});
    }
    return request.continue();
  });
  await privacy.goto(base + '/privacy.html', {waitUntil: 'networkidle2', timeout: 45000});
  assert(privacyChatRequests === 1, 'Privacy page must also initialize live visitor monitoring');
  await privacy.evaluate(() => localStorage.setItem('ae_tawk_visitor_optout_v1', 'yes'));
  await privacy.reload({waitUntil:'networkidle2', timeout:45000});
  assert(privacyChatRequests === 1, 'Explicit chat opt-out should suppress third-party requests on reload');
  assert(!(await privacy.$('#ae-chat-greeting')), 'Explicit chat opt-out should suppress greeting');
  await privacy.close();
  console.log('PASS: ' + checked + ' real-browser bilingual desktop/mobile smoke checks, icons, article navigation, switches and no JS exceptions');
} finally {
  await browser.close();
}
