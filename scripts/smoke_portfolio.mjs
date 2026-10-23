// Browser smoke tests for generated static pages, run with puppeteer-core and Chrome.
import puppeteer from 'puppeteer-core';

const base = process.env.SITE_TEST_ORIGIN || 'http://127.0.0.1:4173';
const executablePath = process.env.CHROME_PATH || '/usr/bin/google-chrome';
const browser = await puppeteer.launch({executablePath, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--no-proxy-server', '--proxy-bypass-list=<-loopback>']});
let checked = 0;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
try {
  for (const locale of ['en', 'ar']) {
    for (const viewport of [{width: 390, height: 844, isMobile: true, deviceScaleFactor: 1},
                            {width: 1440, height: 900, isMobile: false, deviceScaleFactor: 1}]) {
      const page = await browser.newPage();
      await page.setViewport(viewport);
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      const response = await page.goto(base + '/' + locale + '/', {waitUntil: 'networkidle2', timeout: 45000});
      assert(response?.status() === 200, 'Profile HTTP error: /' + locale + '/ status=' + response?.status() + ' url=' + response?.url());
      const info = await page.evaluate(() => ({
        lang: document.documentElement.lang,
        hrefs: [...document.querySelectorAll('.home-insight-card a')].map(a => a.getAttribute('href')),
        svgCount: document.querySelectorAll('svg.lucide').length,
        unrendered: document.querySelectorAll('i[data-lucide]').length,
        xOverflow: document.documentElement.scrollWidth > innerWidth + 4,
        projects: document.querySelectorAll('#projectGrid .project-card').length,
      }));
      assert(info.lang === locale, 'Wrong page language: ' + JSON.stringify(info));
      assert(info.hrefs.length === 6 && info.hrefs.every(url => url.startsWith('/' + locale + '/blog/')),
        'Wrong homepage article language: ' + JSON.stringify(info.hrefs));
      assert(info.svgCount >= 35 && info.unrendered === 0, 'Icons not rendered: ' + JSON.stringify(info));
      assert(info.projects >= 6, 'Dynamic project cards did not initialize: ' + JSON.stringify(info));
      assert(!info.xOverflow, 'Horizontal overflow on ' + locale + ' ' + viewport.width + 'px');
      assert(!errors.length, 'JavaScript errors: ' + errors.join(' | '));
      if (viewport.isMobile) {
        const firstLink = info.hrefs[0];
        const article = await page.goto(base + firstLink, {waitUntil: 'networkidle2', timeout: 45000});
        assert(article?.status() === 200, 'Article link returned ' + article?.status());
        assert(await page.evaluate(() => document.documentElement.lang) === locale, 'Article changed locale');
        assert((await page.title()).length > 15, 'Missing article title');
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
  console.log('PASS: ' + checked + ' real-browser bilingual desktop/mobile smoke checks, icons, article navigation, switches and no JS exceptions');
} finally {
  await browser.close();
}
