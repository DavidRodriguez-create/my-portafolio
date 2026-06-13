/**
 * Shared layout chrome (header social links, footer, theme toggle).
 * Keeps the header/footer markup in a single place and driven by config,
 * so it is never duplicated across index.html and project.html.
 */

import { generateFooter, generateHeaderSocial } from '../templates/html-generators.js';
import { getElementById, updateHTML } from '../utils/dom.js';

/**
 * Wire up the light/dark theme toggle button.
 */
export function initThemeToggle() {
  const btn = getElementById('themeToggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('dr-theme', next); } catch (e) {}

    const giscusFrame = document.querySelector('iframe.giscus-frame');
    if (giscusFrame) {
      giscusFrame.contentWindow.postMessage(
        { giscus: { setConfig: { theme: next === 'dark' ? 'dark_dimmed' : 'light' } } },
        'https://giscus.app'
      );
    }
  });
}

/**
 * Render the shared footer from config into the `#siteFooter` slot.
 * @param {Object} config - Site config
 */
export function renderFooter(config) {
  const footer = getElementById('siteFooter');
  if (footer) updateHTML(footer, generateFooter(config));
}

/**
 * Render the header social links / contact button into `#headerSocial`.
 * @param {Object} config - Site config
 */
export function renderHeaderSocial(config) {
  const slot = getElementById('headerSocial');
  if (slot) updateHTML(slot, generateHeaderSocial(config));
}

/**
 * Render all config-driven chrome for a page.
 * @param {Object} config - Site config
 */
export function renderChrome(config) {
  renderFooter(config);
  renderHeaderSocial(config);
}
