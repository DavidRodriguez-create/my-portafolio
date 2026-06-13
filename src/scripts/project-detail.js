/**
 * Project detail page script
 * Clean architecture: Orchestrates modules with clear separation of concerns
 */

import { fetchProjects, findProjectById } from './services/api.js';
import { generateProjectDetail } from './templates/html-generators.js';
import { initThemeToggle, renderChrome } from './modules/layout.js';
import {
  getElementById,
  querySelector,
  updateHTML,
  updateTitle,
  updateMetaTag
} from './utils/dom.js';
import { GISCUS_DEFAULTS } from './config/constants.js';

/**
 * Extract project ID from current URL
 * @returns {string|null} Project ID or null
 */
function getProjectIdFromUrl() {
  const pathParts = window.location.pathname.split('/').filter(p => p);
  const projectsIndex = pathParts.indexOf('projects');
  
  return projectsIndex >= 0 ? pathParts[projectsIndex + 1] : null;
}

/**
 * Initialize Giscus comments
 * @param {Object} giscusConfig - Giscus configuration object
 */
function initGiscus(giscusConfig) {
  if (!giscusConfig || !giscusConfig.repoId || !giscusConfig.categoryId) {
    return;
  }
  
  const container = querySelector('.giscus');
  if (!container) return;
  
  const script = document.createElement('script');
  script.src = 'https://giscus.app/client.js';
  script.setAttribute('data-repo', giscusConfig.repo);
  script.setAttribute('data-repo-id', giscusConfig.repoId);
  
  if (giscusConfig.category) {
    script.setAttribute('data-category', giscusConfig.category);
  }
  
  script.setAttribute('data-category-id', giscusConfig.categoryId);
  script.setAttribute('data-mapping', giscusConfig.mapping || GISCUS_DEFAULTS.mapping);
  
  if (giscusConfig.term) {
    script.setAttribute('data-term', giscusConfig.term);
  }
  
  script.setAttribute('data-strict', giscusConfig.strict || GISCUS_DEFAULTS.strict);
  script.setAttribute('data-reactions-enabled', giscusConfig.reactionsEnabled || GISCUS_DEFAULTS.reactionsEnabled);
  script.setAttribute('data-emit-metadata', giscusConfig.emitMetadata || GISCUS_DEFAULTS.emitMetadata);
  script.setAttribute('data-input-position', giscusConfig.inputPosition || GISCUS_DEFAULTS.inputPosition);
  const siteTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  script.setAttribute('data-theme', siteTheme === 'dark' ? 'dark_dimmed' : 'light');
  script.setAttribute('data-lang', giscusConfig.lang || GISCUS_DEFAULTS.lang);
  script.setAttribute('data-loading', giscusConfig.loading || GISCUS_DEFAULTS.loading);
  script.setAttribute('crossorigin', 'anonymous');
  script.async = true;
  
  container.appendChild(script);
}

/**
 * Initialize Mermaid diagrams
 * @param {Object} diagram - Diagram configuration
 */
function initMermaidDiagram(diagram) {
  if (!diagram || diagram.type !== 'mermaid') return;
  
  if (typeof mermaid !== 'undefined') {
    mermaid.init(undefined, document.querySelectorAll('.mermaid'));
  }
}

/**
 * Initialize the gallery slider (prev/next + dots) and its lightbox
 */
function initGallery() {
  const viewer = querySelector('.kgal__viewer');
  const track = querySelector('.kgal__track');
  const items = viewer ? Array.from(document.querySelectorAll('.kgal__item')) : [];
  const lightbox = querySelector('.klightbox');
  if (!viewer || !track || !items.length || !lightbox) return;

  const images = items.map(item => item.querySelector('img'));
  const dotsContainer = querySelector('.kgal__dots');
  const prevBtn = querySelector('.kgal__prev');
  const nextBtn = querySelector('.kgal__next');

  const stageImage = lightbox.querySelector('.klb__img');
  const counter = lightbox.querySelector('.klb__count');
  const closeBtn = lightbox.querySelector('.klb__close');
  const lbPrevBtn = lightbox.querySelector('.klb__prev');
  const lbNextBtn = lightbox.querySelector('.klb__next');

  let itemsPerPage = 2;
  let currentIndex = 0;
  let lightboxIndex = 0;

  function updateItemsPerPage() {
    const target = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    itemsPerPage = Math.min(target, images.length);
  }

  function maxIndex() {
    return Math.max(0, images.length - itemsPerPage);
  }

  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const totalPages = Math.ceil(images.length / itemsPerPage);
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'kgal__dot';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i * itemsPerPage));
      dotsContainer.appendChild(dot);
    }
  }

  function update() {
    currentIndex = Math.min(currentIndex, maxIndex());
    const itemWidth = items[0].getBoundingClientRect().width;
    const gap = 16;
    track.style.transform = `translateX(-${currentIndex * (itemWidth + gap)}px)`;

    if (dotsContainer) {
      const currentPage = Math.round(currentIndex / itemsPerPage);
      dotsContainer.querySelectorAll('.kgal__dot').forEach((dot, i) => {
        dot.classList.toggle('is-active', i === currentPage);
      });
    }

    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex();
  }

  function goTo(index) {
    currentIndex = Math.min(Math.max(0, index), maxIndex());
    update();
  }

  function next() { goTo(currentIndex + 1); }
  function prev() { goTo(currentIndex - 1); }

  function showLightboxImage(index) {
    lightboxIndex = index;
    const img = images[index];
    stageImage.src = img.src;
    stageImage.alt = img.alt;
    counter.textContent = `${index + 1} / ${images.length}`;
  }

  function nextLightboxImage() { showLightboxImage((lightboxIndex + 1) % images.length); }
  function prevLightboxImage() { showLightboxImage((lightboxIndex - 1 + images.length) % images.length); }

  function openLightbox(index) {
    showLightboxImage(index);
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  items.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  if (prevBtn) prevBtn.addEventListener('click', prev);
  if (nextBtn) nextBtn.addEventListener('click', next);

  closeBtn.addEventListener('click', closeLightbox);
  if (lbPrevBtn) lbPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevLightboxImage(); });
  if (lbNextBtn) lbNextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextLightboxImage(); });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('is-open')) {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') prevLightboxImage();
      else if (e.key === 'ArrowRight') nextLightboxImage();
    } else if (viewer.matches(':hover')) {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    }
  });

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const previous = itemsPerPage;
      updateItemsPerPage();
      if (previous !== itemsPerPage) {
        currentIndex = 0;
        createDots();
      }
      update();
    }, 200);
  });

  updateItemsPerPage();
  createDots();
  update();
}

/**
 * Update page metadata for project
 * @param {Object} project - Project object
 * @param {string} siteName - Site name
 */
function updatePageMetadata(project, siteName) {
  updateTitle(`${project.title} — ${siteName}`);
  updateMetaTag('og:title', `[WebApp] ${project.title}`);
  
  // Clear meta header (legacy)
  const metaHeader = getElementById('projectMetaHeader');
  if (metaHeader) {
    updateHTML(metaHeader, '');
  }
}

/**
 * Show error page for non-existent projects
 * @param {HTMLElement} container - Container element
 */
function showProjectNotFound(container) {
  if (typeof window.showProjectNotFound === 'function') {
    window.showProjectNotFound(container);
  } else {
    updateHTML(container, '<p style="color: #ff6b6b;">Error: Project not found</p>');
  }
}

/**
 * Render project details
 * @param {Object} project - Project object
 * @param {Object[]} projects - Full list of projects (for prev/next navigation)
 * @param {HTMLElement} container - Container element
 * @param {string} siteName - Site name
 */
function renderProjectDetail(project, projects, container, siteName) {
  updatePageMetadata(project, siteName);

  const index = projects.findIndex(p => p.id === project.id);
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index >= 0 && index < projects.length - 1 ? projects[index + 1] : null;

  const html = generateProjectDetail(project, prev, next, index);
  updateHTML(container, html);

  // Initialize additional features
  initGiscus(project.details.giscus);
  initMermaidDiagram(project.details.diagram);
  initGallery();
}

/**
 * Initialize project detail page
 */
async function initProjectDetailPage() {
  const detailSection = getElementById('projectDetail');
  if (!detailSection) return;
  
  const projectId = getProjectIdFromUrl();
  
  if (!projectId) {
    showProjectNotFound(detailSection);
    return;
  }
  
  try {
    const data = await fetchProjects();
    const project = findProjectById(data.projects, projectId);
    
    if (!project) {
      throw new Error('Project not found');
    }
    
    renderProjectDetail(project, data.projects, detailSection, data.config.siteName);
    renderChrome(data.config);

  } catch (error) {
    console.error('Failed to load project:', error);
    showProjectNotFound(detailSection);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initProjectDetailPage();
    initThemeToggle();
  });
} else {
  initProjectDetailPage();
  initThemeToggle();
}
