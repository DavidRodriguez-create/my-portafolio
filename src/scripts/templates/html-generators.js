/**
 * HTML Template generators for project cards and details
 * Separation of concerns: Templates separate from logic
 */

import { BASE_PATH } from '../config/constants.js';

const STATUS_COLOR = {
  shipped: 'var(--success)',
  building: 'var(--warning)',
  archived: 'var(--text-faint)'
};

const ICONS = {
  arrowLeft: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
  chevronLeft: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
  close: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
};

/**
 * Generate HTML for a project card
 * @param {Object} project - Project data object
 * @param {number} index - Position of the project in the list (0-based)
 * @returns {string} HTML string
 */
export function generateProjectCard(project, index = 0) {
  const status = project.status || 'shipped';
  const statusColor = STATUS_COLOR[status] || STATUS_COLOR.shipped;
  const idx = String(index + 1).padStart(2, '0');
  const links = (project.details && project.details.links) || {};
  const tech = project.tech || [];
  const visibleTech = tech.slice(0, 4);
  const moreCount = tech.length - visibleTech.length;

  return `
    <article class="card kpc" data-year="${project.year}" data-type="${project.type}" data-tech="${tech.join(',')}">
      <span class="kpc__rule"></span>
      <div class="kpc__head">
        <span class="kpc__idx">${idx}</span>
        <span class="kpc__status"><span class="kpc__dot" style="background:${statusColor}"></span>${status}</span>
      </div>
      <h3 class="kpc__title">
        ${project.icon ? `<span class="kpc__emoji" aria-hidden="true">${project.icon}</span>` : ''}
        <a href="${project.url}" class="kpc__titletxt">${project.title}</a>
      </h3>
      <div class="kpc__meta">
        <span class="kmeta"><span class="kmeta__hash">#</span>${project.type}</span>
        <span class="kmeta kmeta--line">${project.year}</span>
      </div>
      <p class="kpc__desc card-description">${project.description}</p>
      <div class="kpc__tech">
        ${visibleTech.map(t => `<span class="ktag">${t}</span>`).join('')}
        ${moreCount > 0 ? `<span class="kpc__more">+${moreCount}</span>` : ''}
      </div>
      <div class="kpc__foot">
        <a href="${project.url}" class="kpc__cta">View project <span class="kpc__arrow" aria-hidden="true">→</span></a>
        <span class="kpc__lnks">
          ${links.github ? `<a class="kpc__lnk" href="${links.github}" target="_blank" rel="noopener" aria-label="Source">🔗</a>` : ''}
          ${links.demo ? `<a class="kpc__lnk" href="${links.demo}" target="_blank" rel="noopener" aria-label="Live demo">↗</a>` : ''}
        </span>
      </div>
    </article>
  `;
}

/**
 * Generate the about section, applying lead styling to the first paragraph
 * @param {string|string[]} content - HTML content block(s)
 * @returns {string} HTML string
 */
function generateAbout(content) {
  if (!content) return '';

  const parts = Array.isArray(content) ? content : [content];
  let leadApplied = false;

  const html = parts.map(part => {
    if (!leadApplied && part.trim().startsWith('<p>')) {
      leadApplied = true;
      return part.replace('<p>', '<p class="klead">');
    }
    return part;
  }).join('');

  return `
    <div class="kdetail__about">
      <div class="ds-eyebrow">// about</div>
      ${html}
    </div>
  `;
}

/**
 * Generate gallery + lightbox markup
 * @param {string[]} images - Array of image URLs
 * @param {string} projectTitle - Project title for alt text
 * @returns {string} HTML string
 */
function generateGallery(images, projectTitle) {
  if (!images || images.length === 0) return '';

  const multi = images.length > 1;

  return `
    <div class="kgal">
      <div class="ds-eyebrow">// gallery</div>
      <div class="kgal__viewer">
        <div class="kgal__track">
          ${images.map((src, index) => `
            <button class="kgal__item" type="button" data-index="${index}">
              <img src="${src}" alt="${projectTitle} screenshot ${index + 1}" loading="lazy" />
            </button>
          `).join('')}
        </div>
        ${multi ? `
          <button class="kibtn kgal__nav kgal__prev" type="button" aria-label="Previous image">${ICONS.chevronLeft}</button>
          <button class="kibtn kgal__nav kgal__next" type="button" aria-label="Next image">${ICONS.chevronRight}</button>
        ` : ''}
      </div>
      ${multi ? `<div class="kgal__dots"></div>` : ''}
    </div>
    <div class="klightbox">
      <button class="kibtn klb__close" type="button" aria-label="Close">${ICONS.close}</button>
      ${multi ? `<button class="kibtn klb__nav klb__prev" type="button" aria-label="Previous">${ICONS.chevronLeft}</button>` : ''}
      <figure class="klb__stage">
        <img class="klb__img" src="" alt="" />
        <figcaption class="klb__count"></figcaption>
      </figure>
      ${multi ? `<button class="kibtn klb__nav klb__next" type="button" aria-label="Next">${ICONS.chevronRight}</button>` : ''}
    </div>
  `;
}

/**
 * Generate architecture diagram section
 * @param {Object} diagram - Diagram configuration object
 * @returns {string} HTML string
 */
function generateDiagram(diagram) {
  if (!diagram) return '';

  return `
    <div class="karch">
      <div class="ds-eyebrow">// architecture</div>
      <div class="karch__well ds-well">
        <pre class="mermaid">${diagram.code}</pre>
      </div>
    </div>
  `;
}

/**
 * Generate discussion section placeholder
 * @param {Object} giscusConfig - Giscus configuration
 * @returns {string} HTML string
 */
function generateDiscussions(giscusConfig) {
  if (!giscusConfig) return '';

  return `
    <div class="kdiscuss">
      <div class="ds-eyebrow">// discussion</div>
      <div class="giscus"></div>
    </div>
  `;
}

/**
 * Generate prev/next project navigation
 * @param {Object|null} prev - Previous project (or null)
 * @param {Object|null} next - Next project (or null)
 * @param {string} variant - 'top' or 'bottom', controls layout
 * @returns {string} HTML string
 */
function generateProjectNav(prev, next, variant = 'bottom') {
  if (!prev && !next) return '';

  return `
    <nav class="kpnav kpnav--${variant}">
      ${prev ? `
        <a href="${BASE_PATH}/${prev.url}" class="kpnav__btn kpnav__prev" aria-label="Previous project: ${prev.title}">
          ${ICONS.arrowLeft}
          <span class="kpnav__title">${prev.icon ? `${prev.icon} ` : ''}${prev.title}</span>
        </a>
      ` : '<span></span>'}
      ${next ? `
        <a href="${BASE_PATH}/${next.url}" class="kpnav__btn kpnav__next" aria-label="Next project: ${next.title}">
          <span class="kpnav__title">${next.icon ? `${next.icon} ` : ''}${next.title}</span>
          ${ICONS.arrowRight}
        </a>
      ` : '<span></span>'}
    </nav>
  `;
}

/**
 * Generate complete project detail page HTML
 * @param {Object} project - Project data object
 * @param {Object|null} prev - Previous project in listing order
 * @param {Object|null} next - Next project in listing order
 * @param {number} index - Position of the project in the list (0-based)
 * @returns {string} HTML string
 */
export function generateProjectDetail(project, prev, next, index) {
  const status = project.status || 'shipped';
  const statusColor = STATUS_COLOR[status] || STATUS_COLOR.shipped;
  const idx = String(index + 1).padStart(2, '0');
  const links = project.details.links || {};
  const tech = project.tech || [];

  return `
    <div class="kdetail">
      <div class="kwrap">
        <div class="kdetail__topnav">
          <a href="${BASE_PATH}/" class="kback">${ICONS.arrowLeft} All projects</a>
          ${generateProjectNav(prev, next, 'top')}
        </div>

        <div class="kdetail__hero">
          <div class="kdetail__top">
            <div style="flex:1">
              <div class="kdetail__idrow">
                <span class="kdetail__idx">${idx}</span>
                <span class="kpc__status"><span class="kpc__dot" style="background:${statusColor}"></span>${status}</span>
              </div>
              <h1 class="kdetail__title">${project.icon ? `<span aria-hidden="true" style="margin-right:10px">${project.icon}</span>` : ''}${project.title}</h1>
              <p class="kdetail__summary">${project.details.summary}</p>
            </div>
            <div class="kdetail__actions">
              ${links.demo ? `<a href="${links.demo}" class="kbtn kbtn--primary" target="_blank" rel="noopener">Live demo ↗</a>` : ''}
              ${links.github ? `<a href="${links.github}" class="kbtn kbtn--secondary" target="_blank" rel="noopener">🔗 Source</a>` : ''}
            </div>
          </div>
          <div class="kdetail__metarow">
            <span class="kmeta"><span class="kmeta__hash">#</span>${project.type}</span>
            <span class="kmeta kmeta--line">${project.year}</span>
            <span class="kdetail__tech">${tech.map(t => `<span class="ktag">${t}</span>`).join('')}</span>
          </div>
        </div>

        <div class="kdetail__body">
          ${generateAbout(project.details.content)}
          ${generateGallery(project.details.images, project.title)}
          ${generateDiagram(project.details.diagram)}
          ${generateDiscussions(project.details.giscus)}
          ${generateProjectNav(prev, next, 'bottom')}
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate the header social links / contact button from config.
 * Rendered into the `#headerSocial` slot so links live in one place (config).
 * @param {Object} config - Site config (expects `social`)
 * @returns {string} HTML string
 */
export function generateHeaderSocial(config = {}) {
  const s = config.social || {};
  if (!s.github && !s.linkedin && !s.email) return '';

  return `
    <span class="khead__sep"></span>
    ${s.github ? `<a href="${s.github}" target="_blank" rel="noopener" class="kibtn" aria-label="GitHub">🔗</a>` : ''}
    ${s.linkedin ? `<a href="${s.linkedin}" target="_blank" rel="noopener" class="kibtn" aria-label="LinkedIn">💼</a>` : ''}
    ${s.email ? `<a href="mailto:${s.email}" class="kbtn kbtn--secondary">📧 Contact</a>` : ''}
  `;
}

/**
 * Generate the site footer from config. Single source of truth shared by
 * every page, rendered into the `#siteFooter` slot.
 * @param {Object} config - Site config (expects `siteName`, `social`, `footer`)
 * @returns {string} HTML string
 */
export function generateFooter(config = {}) {
  const s = config.social || {};
  const footer = config.footer || {};
  const year = new Date().getFullYear();
  const prompt = footer.prompt || 'echo "thanks for visiting"';
  const note = footer.note || '';

  const links = [];
  if (s.github) links.push(`<a href="${s.github}" target="_blank" rel="noopener">🔗 GitHub</a>`);
  if (s.linkedin) links.push(`<a href="${s.linkedin}" target="_blank" rel="noopener">💼 LinkedIn</a>`);
  if (s.email) links.push(`<a href="mailto:${s.email}">📧 Email</a>`);

  return `
    <div class="kwrap kfoot__in">
      <div class="kfoot__brand">
        <span class="kfoot__prompt"><span style="color:var(--accent)">david</span>@<span style="color:var(--data)">portfolio</span>:~$ <span style="color:var(--text-primary)">${prompt}</span></span>
        <span class="kfoot__copy">© ${year} ${config.siteName || ''}${note ? ` · ${note}` : ''}</span>
      </div>
      <div class="kfoot__links">${links.join('')}</div>
    </div>
  `;
}

/**
 * Generate loading state HTML
 * @returns {string} HTML string
 */
export function generateLoadingState() {
  return `
    <div style="text-align: center; padding: 4rem 2rem; color: var(--text-muted);">
      <div style="font-size: 3rem; margin-bottom: 1rem;">⏳</div>
      <p>Loading projects...</p>
    </div>
  `;
}
