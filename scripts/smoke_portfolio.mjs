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
      const response = await page.goto(base + '/' + locale + '/', {waitUntil: 'networkidle2', timeout: 45000});
      assert([200, 304].includes(response?.status()), 'Profile HTTP error: /' + locale + '/ status=' + response?.status() + ' url=' + response?.url());
      const info = await page.evaluate(() => ({
        lang: document.documentElement.lang,
        hrefs: [...document.querySelectorAll('.home-insight-card a')].map(a => a.getAttribute('href')),
        svgCount: document.querySelectorAll('svg.lucide').length,
        unrendered: document.querySelectorAll('i[data-lucide]').length,
        xOverflow: document.documentElement.scrollWidth > innerWidth + 4,
        projects: document.querySelectorAll('#projectGrid .project-card').length,
        chatButton: Boolean(document.querySelector('#ae-chat-launcher')),
        tawkBeforeClick: Boolean(document.querySelector('script[src*="embed.tawk.to"]')),
        chatOnExpectedSide: (() => {const rect = document.querySelector('#ae-chat-launcher')?.getBoundingClientRect();return rect && (document.documentElement.lang === 'ar' ? rect.left > innerWidth/2 : rect.right < innerWidth/2);})(),
        chatClickable: (() => {const button=document.querySelector('#ae-chat-launcher');const r=button?.getBoundingClientRect();return r && document.elementFromPoint(r.left+r.width/2,r.top+r.height/2)===button;})(),
      }));
      assert(info.lang === locale, 'Wrong page language: ' + JSON.stringify(info));
      assert(info.hrefs.length === 6 && info.hrefs.every(url => url.startsWith('/' + locale + '/blog/')),
        'Wrong homepage article language: ' + JSON.stringify(info.hrefs));
      assert(info.svgCount >= 35 && info.unrendered === 0, 'Icons not rendered: ' + JSON.stringify(info));
      assert(info.projects >= 6, 'Dynamic project cards did not initialize: ' + JSON.stringify(info));
      assert(info.chatButton && !info.tawkBeforeClick && info.chatOnExpectedSide && info.chatClickable, 'Chat launcher should appear on the correct side without fetching third-party code: ' + JSON.stringify(info));
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
        assert(await page.$('#ae-chat-launcher'), 'Article chat launcher missing');
        assert(!(await page.$('script[src*="embed.tawk.to"]')), 'Tawk should not load before a visitor clicks');
        // Verify the exact outgoing request, regardless of browser CORS and remote availability.
        let requestedTawk = false;
        await page.setRequestInterception(true);
        page.on('request', request => {
          if (request.url() === 'https://embed.tawk.to/6adba7539cb48b346f87ea7e/default') {
            requestedTawk = true;
            return request.respond({
              status: 200,
              headers: {'access-control-allow-origin': '*', 'content-type': 'application/javascript'},
              body: '/* mocked third-party response */',
            });
          }
          return request.continue();
        });
        await page.click('#ae-chat-launcher');
        assert(await page.evaluate(() => window.Tawk_LoadStart instanceof Date), 'Chat click did not initialize the loader');
        await new Promise(resolve => setTimeout(resolve, 80));
        assert(requestedTawk, 'Click did not request the exact Tawk widget');
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
  const privacy = await browser.newPage();
  await privacy.goto(base + '/privacy.html', {waitUntil: 'networkidle2', timeout: 45000});
  assert(await privacy.$('#ae-chat-launcher'), 'Privacy page chat trigger missing');
  assert(!(await privacy.$('script[src*="embed.tawk.to"]')), 'Privacy page loaded the third-party widget before interaction');
  await privacy.close();
  console.log('PASS: ' + checked + ' real-browser bilingual desktop/mobile smoke checks, icons, article navigation, switches and no JS exceptions');
} finally {
  await browser.close();
}
