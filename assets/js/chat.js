/* Lightweight, on-demand contact entry point for every portfolio locale.
 * No tawk.to requests, cookies or iframe until a visitor opens chat.
 */
(() => {
  'use strict';
  if (window.__aeChatInitialized || !document.body) return;
  window.__aeChatInitialized = true;

  const isArabic = document.documentElement.lang.toLowerCase().startsWith('ar');
  const copy = isArabic
    ? { label: 'تحدث معي', open: 'افتح المحادثة', loading: 'جارٍ فتح المحادثة', retry: 'تعذر فتح المحادثة، حاول مجددًا' }
    : { label: 'Chat with me', open: 'Open live chat', loading: 'Opening chat', retry: 'Unable to connect. Try again' };

  const styles = document.createElement('style');
  styles.textContent = [
    '#ae-chat-launcher{position:fixed;z-index:95;inset-inline-start:max(18px,env(safe-area-inset-left));bottom:calc(max(22px,env(safe-area-inset-bottom)) + var(--ae-chat-lift,0px));display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:0 18px;border:1px solid #d6a370;border-radius:15px;background:#e5a76e;color:#17110c;box-shadow:0 12px 32px #0008;font:700 13px/1.3 system-ui,-apple-system,Segoe UI,sans-serif;cursor:pointer;transition:transform .2s ease,box-shadow .2s ease;max-width:calc(100vw - 36px)}',
    'html[dir="rtl"] #ae-chat-launcher{inset-inline-start:auto;right:max(18px,env(safe-area-inset-right));font-family:Cairo,system-ui,sans-serif}',
    '#ae-chat-launcher:hover{transform:translateY(-2px);box-shadow:0 16px 36px #000a}',
    '#ae-chat-launcher:focus-visible{outline:3px solid #fff;outline-offset:4px}',
    '#ae-chat-launcher svg{width:22px;height:22px;flex-shrink:0;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}',
    '#ae-chat-launcher[aria-busy="true"]{cursor:progress;opacity:.85}',
    '@media(max-width:580px){#ae-chat-launcher{width:52px;height:52px;min-height:52px;padding:0;border-radius:16px;inset-inline-start:max(14px,env(safe-area-inset-left));bottom:calc(max(16px,env(safe-area-inset-bottom)) + var(--ae-chat-lift,0px))}html[dir="rtl"] #ae-chat-launcher{right:max(14px,env(safe-area-inset-right))}#ae-chat-launcher .ae-chat-text{display:none}}',
    '@media(prefers-reduced-motion:reduce){#ae-chat-launcher{transition:none}#ae-chat-launcher:hover{transform:none}}',
    '@media print{#ae-chat-launcher{display:none!important}}'
  ].join('');
  document.head.appendChild(styles);

  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'ae-chat-launcher';
  button.setAttribute('aria-label', copy.open);
  button.setAttribute('aria-busy', 'false');
  button.setAttribute('title', copy.open);
  button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.3 9.3 0 0 1-4-.9L3 21l1.9-4.6A8.6 8.6 0 0 1 3 11.5a9 9 0 0 1 18 0Z"/><path d="M8 11.5h8M8 14.5h5"/></svg><span class="ae-chat-text"></span>';
  const label = button.querySelector('.ae-chat-text');
  label.textContent = copy.label;
  document.body.appendChild(button);

  // The optional analytics consent card occupies the lower viewport on narrow
  // screens. Keep both choices accessible without covering either control.
  const repositionForConsent = () => {
    const consent = document.querySelector('.ae-consent');
    if (!consent) {
      button.style.removeProperty('--ae-chat-lift');
      return;
    }
    const chatBounds = button.getBoundingClientRect();
    const consentBounds = consent.getBoundingClientRect();
    const horizontallyOverlapping = chatBounds.left < consentBounds.right &&
      chatBounds.right > consentBounds.left;
    button.style.setProperty(
      '--ae-chat-lift',
      horizontallyOverlapping ? (Math.ceil(innerHeight - consentBounds.top + 12) + 'px') : '0px'
    );
  };
  repositionForConsent();
  if (typeof MutationObserver !== 'undefined') {
    new MutationObserver(repositionForConsent).observe(document.body, { childList: true });
  }
  window.addEventListener('resize', repositionForConsent, { passive: true });

  let loading = false;
  let ready = false;
  let openWhenReady = false;

  const reset = () => {
    button.setAttribute('aria-busy', 'false');
    button.setAttribute('aria-label', copy.open);
    button.setAttribute('title', copy.open);
    label.textContent = copy.label;
  };
  const showChat = () => {
    if (!ready) return;
    openWhenReady = false;
    reset();
    const api = window.Tawk_API || {};
    if (typeof api.showWidget === 'function') api.showWidget();
    if (typeof api.maximize === 'function') api.maximize();
  };
  const loadChat = () => {
    if (loading) return;
    loading = true;
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    window.Tawk_API.onLoad = () => {
      ready = true;
      const api = window.Tawk_API;
      if (typeof api.hideWidget === 'function') api.hideWidget();
      if (openWhenReady) showChat();
    };
    window.Tawk_API.onChatMinimized = () => {
      const api = window.Tawk_API;
      if (typeof api.hideWidget === 'function') api.hideWidget();
      reset();
    };
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/6adba7539cb48b346f87ea7e/default';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    script.onerror = () => {
      loading = false;
      openWhenReady = false;
      button.setAttribute('aria-busy', 'false');
      button.setAttribute('aria-label', copy.retry);
      button.setAttribute('title', copy.retry);
      label.textContent = copy.label;
      script.remove();
    };
    document.head.appendChild(script);
  };
  button.addEventListener('click', () => {
    openWhenReady = true;
    if (ready) { showChat(); return; }
    button.setAttribute('aria-busy', 'true');
    button.setAttribute('aria-label', copy.loading);
    label.textContent = copy.loading;
    loadChat();
  });
})();