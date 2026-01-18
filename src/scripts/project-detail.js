/**
 * Project detail page script
 * Clean architecture: Orchestrates modules with clear separation of concerns
 */

import { fetchProjects, findProjectById } from './services/api.js';
import { generateProjectDetail } from './templates/html-generators.js';
import { 
  getElementById, 
  querySelector,
  updateHTML, 
  updateTitle, 
  updateMetaTag,
  updateTextContent,
  getCurrentYear 
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
  script.setAttribute('data-theme', giscusConfig.theme || GISCUS_DEFAULTS.theme);
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
 * @param {HTMLElement} container - Container element
 * @param {string} siteName - Site name
 */
function renderProjectDetail(project, container, siteName) {
  updatePageMetadata(project, siteName);
  
  const html = generateProjectDetail(project);
  updateHTML(container, html);
  
  // Initialize additional features
  initGiscus(project.details.giscus);
  initMermaidDiagram(project.details.diagram);
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
    
    renderProjectDetail(project, detailSection, data.config.siteName);
    
  } catch (error) {
    console.error('Failed to load project:', error);
    showProjectNotFound(detailSection);
  }
}

/**
 * Update footer with current year
 */
function updateFooter() {
  const yearNow = getElementById('yearNow');
  if (yearNow) {
    updateTextContent(yearNow, getCurrentYear());
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initProjectDetailPage();
    updateFooter();
  });
} else {
  initProjectDetailPage();
  updateFooter();
}
