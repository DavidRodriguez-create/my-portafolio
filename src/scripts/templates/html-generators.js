/**
 * HTML Template generators for project cards and details
 * Separation of concerns: Templates separate from logic
 */

import { 
  generateTechBadges, 
  generateYearBadge, 
  generateTypeBadge,
  generateYearBadgeDetail,
  generateTypeBadgeDetail
} from '../utils/badges.js';

/**
 * Generate HTML for a project card
 * @param {Object} project - Project data object
 * @returns {string} HTML string
 */
export function generateProjectCard(project) {
  return `
    <article class="card" data-year="${project.year}" data-type="${project.type}" data-tech="${project.tech.join(',')}">
      <div class="card-icon">${project.icon}</div>
      <h3><a href="${project.url}">${project.title}</a></h3>
      <div class="card-badges">
        ${generateYearBadge(project.year)}
        ${generateTypeBadge(project.type)}
      </div>
      <p class="card-description">${project.description}</p>
      <div class="tech-stack">
        ${generateTechBadges(project.tech, true)}
      </div>
      <a class="view-btn" href="${project.url}">
        <span class="btn-icon">👉</span> View Project
      </a>
    </article>
  `;
}

/**
 * Generate GitHub link button
 * @param {string} url - GitHub URL
 * @returns {string} HTML string
 */
function generateGithubLink(url) {
  if (!url) return '';
  
  return `
    <a href="${url}" class="project-link-btn" target="_blank" rel="noopener">
      <svg class="link-icon" viewBox="0 0 16 16" width="16" height="16">
        <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
      </svg>
      GitHub
    </a>
  `;
}

/**
 * Generate Demo link button
 * @param {string} url - Demo URL
 * @returns {string} HTML string
 */
function generateDemoLink(url) {
  if (!url) return '';
  
  return `
    <a href="${url}" class="project-link-btn primary" target="_blank" rel="noopener">
      <svg class="link-icon" viewBox="0 0 16 16" width="16" height="16">
        <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3.5 11.5l-3.5-2.5-3.5 2.5V4h7v7.5z"></path>
      </svg>
      Live Demo
    </a>
  `;
}

/**
 * Generate gallery section
 * @param {string[]} images - Array of image URLs
 * @param {string} projectTitle - Project title for alt text
 * @returns {string} HTML string
 */
function generateGallery(images, projectTitle) {
  if (!images || images.length === 0) return '';
  
  return `
    <div class="project-gallery">
      <h3 class="section-label">Gallery</h3>
      <div class="gallery-grid">
        ${images.map(img => `
          <div class="gallery-item">
            <img src="${img}" alt="${projectTitle}" loading="lazy" />
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Generate diagram section
 * @param {Object} diagram - Diagram configuration object
 * @returns {string} HTML string
 */
function generateDiagram(diagram) {
  if (!diagram) return '';
  
  return `
    <div class="project-diagram">
      <h3 class="section-label">Architecture</h3>
      <div class="diagram-container">
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
    <div class="project-discussions">
      <div class="giscus"></div>
    </div>
  `;
}

/**
 * Generate complete project detail page HTML
 * @param {Object} project - Project data object
 * @returns {string} HTML string
 */
export function generateProjectDetail(project) {
  return `
    <div class="project-hero">
      <div class="project-header-row">
        <div class="project-title-section">
          <div class="project-icon-large">${project.icon}</div>
          <div class="project-title-wrapper">
            <h1 class="project-title">${project.title}</h1>
            <p class="project-summary">${project.details.summary}</p>
          </div>
        </div>
        <div class="project-links">
          ${generateGithubLink(project.details.links.github)}
          ${generateDemoLink(project.details.links.demo)}
        </div>
      </div>
      
      <div class="project-meta-section">
        <div class="project-meta-badges">
          ${generateYearBadgeDetail(project.year)}
          ${generateTypeBadgeDetail(project.type)}
        </div>
        <div class="tech-badges-grid">
          ${generateTechBadges(project.tech, false)}
        </div>
      </div>
    </div>

    <div class="project-content">
      <h3 class="section-label">About</h3>
      <p>${project.details.content}</p>
    </div>

    ${generateGallery(project.details.images, project.title)}
    ${generateDiagram(project.details.diagram)}
    ${generateDiscussions(project.details.giscus)}
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
