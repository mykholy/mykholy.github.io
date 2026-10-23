/* Start live visitor presence on page view, not on chat click.
 * Tawk.to supplies the actual real-time visitor connection and messenger.
 */
(() => {
  'use strict';
  if (window.__aeChatInitialized) return;
  window.__aeChatInitialized = true;

  // An explicit browser privacy signal or site opt-out always wins.
  let optedOut = navigator.globalPrivacyControl === true;
  try { optedOut ||= localStorage.getItem('ae_tawk_visitor_optout_v1') === 'yes'; }
  catch (_) { /* Restricted storage must not prevent the page from rendering. */ }
  if (optedOut) return;

  const embed = 'https://embed.tawk.to/6adba7539cb48b346f87ea7e/default';
  const welcomeKey = 'ae_tawk_welcome_dismissed_v3';
  let welcome = null;
  let widgetReady = false;
  let openWhenReady = false;
  let chatFailed = false;

  const markWelcomeSeen = () => {
    try { sessionStorage.setItem(welcomeKey, '1'); } catch (_) { /* Storage can be disabled. */ }
  };
  const welcomeWasShown = () => {
    try { return sessionStorage.getItem(welcomeKey) === '1'; } catch (_) { return false; }
  };
  const removeWelcome = () => {
    if (welcome) { welcome.remove(); welcome = null; }
    markWelcomeSeen();
  };

  const css = document.createElement('style');
  css.textContent = [
    '#ae-chat-greeting{position:fixed;z-index:9999;right:max(20px,env(safe-area-inset-right));bottom:calc(max(104px,env(safe-area-inset-bottom) + 94px) + var(--chat-welcome-lift,0px));width:min(340px,calc(100vw - 32px));padding:19px 18px;background:#191715;color:#eee7dd;border:1px solid #e5a76e99;border-radius:17px;box-shadow:0 16px 52px #000a;font:14px/1.65 system-ui,-apple-system,Segoe UI,sans-serif;text-align:left;direction:ltr;overflow-wrap:anywhere}',
    '#ae-chat-greeting strong{display:block;padding-right:34px;color:#fff;font-size:16px;line-height:1.5}',
    '#ae-chat-greeting p{margin:8px 0 15px;color:#d1c5b7;font-size:13px}',
    '#ae-chat-greeting .ae-chat-start{border:1px solid #e5a76e;background:#e5a76e;color:#17100b;border-radius:9px;min-height:40px;padding:8px 15px;font:700 13px/1.4 inherit;cursor:pointer}',
    '#ae-chat-greeting .ae-chat-dismiss{position:absolute;right:10px;top:10px;width:32px;height:32px;display:grid;place-items:center;border:0;border-radius:8px;background:transparent;color:#d9c3af;cursor:pointer;font:20px/1 system-ui,sans-serif}',
    '#ae-chat-greeting button:focus-visible{outline:2px solid #fff;outline-offset:3px}',
    '@media(max-width:480px){#ae-chat-greeting{right:14px;padding:16px;bottom:calc(max(94px,env(safe-area-inset-bottom) + 84px) + var(--chat-welcome-lift,0px));width:min(310px,calc(100vw - 28px))}}',
    '@media print{#ae-chat-greeting{display:none!important}}'
  ].join('');
  document.head.appendChild(css);

  const positionAbovePrivacyPrompt = () => {
    if (!welcome) return;
    const privacyNotice = document.querySelector('.ae-consent');
    if (!privacyNotice) {
      welcome.style.removeProperty('--chat-welcome-lift');
      return;
    }
    const prompt = privacyNotice.getBoundingClientRect();
    const greeting = welcome.getBoundingClientRect();
    const overlapsHorizontally = greeting.left < prompt.right && greeting.right > prompt.left;
    const regularBottom = innerWidth <= 480 ? 94 : 104;
    const lift = overlapsHorizontally ? Math.max(0, innerHeight - prompt.top + 12 - regularBottom) : 0;
    welcome.style.setProperty('--chat-welcome-lift', Math.ceil(lift) + 'px');
  };

  const openChat = () => {
    const api = window.Tawk_API || {};
    if (typeof api.showWidget === 'function') api.showWidget();
    if (typeof api.maximize === 'function') api.maximize();
  };

  function showWelcome() {
    // Render the first-party greeting without waiting for external network calls.
    if (welcome || welcomeWasShown() || !document.body) return;
    welcome = document.createElement('aside');
    welcome.id = 'ae-chat-greeting';
    welcome.lang = 'en';
    welcome.dir = 'ltr';
    welcome.setAttribute('role', 'status');
    welcome.setAttribute('aria-label', 'Welcome to Ahmed Elkholy portfolio');
    welcome.innerHTML = '<button class="ae-chat-dismiss" type="button" aria-label="Dismiss welcome message">&times;</button><strong>Hi there! 👋</strong><p>Welcome to my portfolio. Have a question about Laravel, SaaS, or AI automation? I\'d be happy to help!</p><button class="ae-chat-start" type="button">Start a conversation</button>';
    document.body.appendChild(welcome);
    welcome.querySelector('.ae-chat-dismiss').addEventListener('click', removeWelcome);
    const startButton = welcome.querySelector('.ae-chat-start');
    startButton.addEventListener('click', () => {
      if (chatFailed) {
        window.location.href = 'mailto:mykholys30@gmail.com';
        return;
      }
      if (!widgetReady) {
        openWhenReady = true;
        startButton.textContent = 'Connecting to live chat…';
        startButton.disabled = true;
        return;
      }
      removeWelcome();
      openChat();
    });
    positionAbovePrivacyPrompt();
    if (typeof MutationObserver === 'function') {
      const observer = new MutationObserver(() => {
        if (!welcome) { observer.disconnect(); return; }
        positionAbovePrivacyPrompt();
      });
      observer.observe(document.body, { childList: true });
    }
  }

  window.addEventListener('resize', positionAbovePrivacyPrompt, { passive: true });
  window.Tawk_API = window.Tawk_API || {};
  // autoStart must remain enabled for anonymous visits to appear in Live Visitors.
  window.Tawk_API.autoStart = true;
  window.Tawk_LoadStart = new Date();
  window.Tawk_API.onLoad = () => {
    widgetReady = true;
    if (openWhenReady) {
      openWhenReady = false;
      removeWelcome();
      openChat();
    }
  };
  window.Tawk_API.onChatMaximized = removeWelcome;
  window.Tawk_API.onChatMessageSystem = removeWelcome;

  // Start anonymous live-visitor monitoring immediately, without waiting for
  // window.load, idle callbacks, large images, or a visitor click.
  const script = document.createElement('script');
  script.async = true;
  script.fetchPriority = 'low'; // Keep the critical hero image ahead of third-party work.
  script.src = embed;
  script.charset = 'UTF-8';
  script.setAttribute('crossorigin', '*');
  script.onerror = () => {
    widgetReady = false;
    chatFailed = true;
    openWhenReady = false;
    const button = welcome?.querySelector('.ae-chat-start');
    if (button) {
      button.disabled = false;
      button.textContent = 'Email me instead';
    }
  };
  document.head.appendChild(script);

  // The English greeting is first-party markup: show it as soon as body exists.
  // Only an intentional dismiss or chat opening suppresses it during this tab.
  if (document.body) showWelcome();
  else document.addEventListener('DOMContentLoaded', showWelcome, { once: true });
})();
