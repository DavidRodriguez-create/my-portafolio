/**
 * HTML Template generators for project cards and details
 * Separation of concerns: Templates separate from logic
 */

import { BASE_PATH } from '../config/constants.js';

const STATUS_COLOR = {
  live: 'var(--success)',
  building: 'var(--warning)',
  complete: 'var(--text-faint)'
};

const ICONS = {
  arrowLeft: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
  chevronLeft: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
  close: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  github: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  externalLink: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  typeGame: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="11" x2="10" y2="11"/><line x1="8" y1="9" x2="8" y2="13"/><line x1="15" y1="12" x2="15.01" y2="12"/><line x1="18" y1="10" x2="18.01" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>`,
  typeBackend: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
  typeFullstack: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  typeDefault: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
};

const TYPE_ICONS = {
  game: ICONS.typeGame,
  backend: ICONS.typeBackend,
  fullstack: ICONS.typeFullstack
};

function getTypeIcon(type) {
  return TYPE_ICONS[type] || ICONS.typeDefault;
}

/**
 * Generate HTML for a project card
 * @param {Object} project - Project data object
 * @param {number} index - Position of the project in the list (0-based)
 * @returns {string} HTML string
 */
export function generateProjectCard(project, index = 0) {
  const status = project.status || 'live';
  const statusColor = STATUS_COLOR[status] || STATUS_COLOR.live;
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
        <span class="kpc__icon" aria-hidden="true">${getTypeIcon(project.type)}</span>
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
          ${links.github ? `<a class="kpc__lnk" href="${links.github}" target="_blank" rel="noopener" aria-label="Source">${ICONS.github}</a>` : ''}
          ${links.demo ? `<a class="kpc__lnk" href="${links.demo}" target="_blank" rel="noopener" aria-label="Live demo">${ICONS.externalLink}</a>` : ''}
        </span>
      </div>
    </article>
  `;
}

/**
 * Generate HTML for a project row (list view)
 * @param {Object} project - Project data object
 * @param {number} index - Position of the project in the list (0-based)
 * @returns {string} HTML string
 */
export function generateProjectRow(project, index = 0) {
  const status = project.status || 'live';
  const statusColor = STATUS_COLOR[status] || STATUS_COLOR.live;
  const idx = String(index + 1).padStart(2, '0');
  const tech = project.tech || [];
  const visibleTech = tech.slice(0, 2);
  const moreCount = tech.length - visibleTech.length;

  return `
    <a href="${project.url}" class="krow card" data-year="${project.year}" data-type="${project.type}" data-tech="${tech.join(',')}">
      <span class="krow__idx">${idx}</span>
      <span class="krow__status"><span class="kpc__dot" style="background:${statusColor}"></span></span>
      <div class="krow__main">
        <h3 class="krow__title">
          <span class="krow__icon" aria-hidden="true">${getTypeIcon(project.type)}</span>
          <span class="krow__titletxt">${project.title}</span>
        </h3>
        <p class="krow__desc">${project.details?.summary || project.description}</p>
      </div>
      <span class="krow__meta"><span style="color:var(--accent)">#</span>${project.type}</span>
      <span class="krow__tech">${visibleTech.map(t => `<span class="ktag">${t}</span>`).join('')}${moreCount > 0 ? `<span class="kpc__more">+${moreCount}</span>` : ''}</span>
      <span class="krow__year">${project.year}</span>
      <span class="krow__arrow">${ICONS.arrowRight}</span>
    </a>
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
          <span class="kpnav__title"><span class="kpnav__icon" aria-hidden="true">${getTypeIcon(prev.type)}</span>${prev.title}</span>
        </a>
      ` : '<span></span>'}
      ${next ? `
        <a href="${BASE_PATH}/${next.url}" class="kpnav__btn kpnav__next" aria-label="Next project: ${next.title}">
          <span class="kpnav__title"><span class="kpnav__icon" aria-hidden="true">${getTypeIcon(next.type)}</span>${next.title}</span>
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
  const status = project.status || 'live';
  const statusColor = STATUS_COLOR[status] || STATUS_COLOR.live;
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
              <h1 class="kdetail__title"><span class="kdetail__icon" aria-hidden="true">${getTypeIcon(project.type)}</span>${project.title}</h1>
              <p class="kdetail__summary">${project.details.summary}</p>
            </div>
            <div class="kdetail__actions">
              ${links.demo ? `<a href="${links.demo}" class="kbtn kbtn--primary" target="_blank" rel="noopener">Live demo ${ICONS.externalLink}</a>` : ''}
              ${links.docs ? `<a href="${links.docs}" class="kbtn kbtn--primary" target="_blank" rel="noopener">Docs ${ICONS.externalLink}</a>` : ''}
              ${links.github ? `<a href="${links.github}" class="kbtn kbtn--secondary" target="_blank" rel="noopener">${ICONS.github} Source</a>` : ''}
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
    ${s.github ? `<a href="${s.github}" target="_blank" rel="noopener" class="kibtn" aria-label="GitHub">${ICONS.github}</a>` : ''}
    ${s.linkedin ? `<a href="${s.linkedin}" target="_blank" rel="noopener" class="kibtn" aria-label="LinkedIn">${ICONS.linkedin}</a>` : ''}
    ${s.email ? `<a href="mailto:${s.email}" class="kbtn kbtn--secondary">${ICONS.mail} Contact</a>` : ''}
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
  if (s.github) links.push(`<a href="${s.github}" target="_blank" rel="noopener">${ICONS.github} GitHub</a>`);
  if (s.linkedin) links.push(`<a href="${s.linkedin}" target="_blank" rel="noopener">${ICONS.linkedin} LinkedIn</a>`);
  if (s.email) links.push(`<a href="mailto:${s.email}">${ICONS.mail} Email</a>`);

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
      <div style="margin-bottom: 1rem;"><svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
      <p>Loading projects...</p>
    </div>
  `;
}
