/**
 * Main site script - Home/Index page
 * Clean architecture: Orchestrates modules with clear separation of concerns
 */

import { DOM_SELECTORS } from './config/constants.js';
import { 
  fetchProjects, 
  getUniqueYears, 
  getUniqueTechnologies, 
  getUniqueTypes 
} from './services/api.js';
import { generateProjectCard } from './templates/html-generators.js';
import { initializeFilters, updateFilterCount } from './modules/filters.js';
import { initThemeToggle, renderChrome } from './modules/layout.js';
import {
  getElementById,
  querySelector,
  querySelectorAll,
  updateTextContent,
  updateHTML,
  updateTitle
} from './utils/dom.js';

/**
 * Update site header with config data
 * @param {Object} config - Site configuration object
 */
function updateSiteHeader(config) {
  if (!config) return;

  updateTitle(`${config.siteName} — Portfolio`);

  const heroWhoami = getElementById('heroWhoami');
  if (heroWhoami) {
    updateTextContent(heroWhoami, `${config.siteName} — ${config.tagline}`);
  }

  const heroBlurb = getElementById('heroBlurb');
  if (heroBlurb && config.blurb) {
    updateTextContent(heroBlurb, config.blurb);
  }

  const heroSource = getElementById('heroSource');
  if (heroSource && config.social && config.social.github) {
    heroSource.href = config.social.github;
  }
}

/**
 * Fill in the hero terminal's "ls projects/ | stats" line
 * @param {Object[]} projects - Array of project objects
 */
function updateHeroStats(projects) {
  const heroStats = getElementById('heroStats');
  if (!heroStats || !Array.isArray(projects) || projects.length === 0) return;

  const count = (s) => projects.filter(p => p.status === s).length;
  const techCount = getUniqueTechnologies(projects).length;
  const since = Math.min(...projects.map(p => p.year));

  const stats = [
    { v: count('live'), k: 'live' },
    { v: count('building'), k: 'building' },
    { v: count('complete'), k: 'complete' },
    { v: techCount, k: 'technologies' },
    { v: since, k: 'since' }
  ].filter(s => s.v > 0);

  heroStats.innerHTML = stats
    .map((s, i) => `<span class="kterm__stat"><span class="kterm__sv">${s.v}</span> ${s.k}${i < stats.length - 1 ? '<span class="kterm__sep">·</span>' : ''}</span>`)
    .join('');
}

/**
 * Render projects to the DOM
 * @param {Object[]} projects - Array of project objects
 * @param {HTMLElement} container - Container element
 */
function renderProjects(projects, container) {
  if (!container || !Array.isArray(projects)) return;
  
  const html = projects.map((project, index) => generateProjectCard(project, index)).join('');
  updateHTML(container, html);
  
  // Update project count
  const countElement = getElementById('projectCount');
  if (countElement) {
    updateTextContent(countElement, `(${projects.length} total)`);
  }
}

/**
 * Setup filter system
 * @param {Object[]} projects - Array of project objects
 */
function setupFilters(projects) {
  const elements = {
    yearFilter: getElementById('yearFilter'),
    techFilter: getElementById('techFilter'),
    typeFilter: getElementById('typeFilter'),
    searchInput: getElementById('searchInput')
  };
  
  const listView = getElementById('listView');
  if (!listView) return;
  
  const cards = querySelectorAll('.card', listView);
  
  const data = {
    years: getUniqueYears(projects),
    technologies: getUniqueTechnologies(projects),
    types: getUniqueTypes(projects)
  };
  
  const filtersTitle = querySelector('.filters-title');
  
  // Initialize filters with callback
  initializeFilters(elements, cards, data, (visibleCount, totalCount) => {
    const countElement = querySelector('.filters-count', filtersTitle);
    updateFilterCount(countElement, visibleCount, totalCount);
  });
  
  // Update initial count
  if (filtersTitle) {
    updateHTML(filtersTitle, `🔍 Filter Projects <span class="filters-count" id="projectCount">(${cards.length} total)</span>`);
  }
}

/**
 * Initialize dynamic title animation
 * @param {string} siteName - Site name from config
 */
function initTitleAnimation(siteName = 'David Rodríguez Hernández') {
  const titles = [
    `${siteName} — Full Stack Developer`,
    `${siteName} — Data Engineer`,
    `${siteName} — Building Cool Stuff`,
    `${siteName} — Project Portfolio`
  ];
  
  let currentIndex = 0;
  
  setInterval(() => {
    currentIndex = (currentIndex + 1) % titles.length;
    updateTitle(titles[currentIndex]);
  }, 3000);
}

/**
 * Initialize the home page
 */
async function initHomePage() {
  const listView = getElementById('listView');
  if (!listView) {
    console.error('listView element not found');
    return;
  }
  
  try {
    console.log('Fetching projects...');
    const data = await fetchProjects();
    console.log('Projects data received:', data);
    
    // Update site configuration
    if (data.config) {
      updateSiteHeader(data.config);
      renderChrome(data.config);
      initTitleAnimation(data.config.siteName);
    }
    
    // Render projects
    if (data.projects && data.projects.length > 0) {
      console.log(`Rendering ${data.projects.length} projects`);
      renderProjects(data.projects, listView);
      setupFilters(data.projects);
      updateHeroStats(data.projects);
    } else {
      console.warn('No projects found in data');
    }
    
  } catch (error) {
    console.error('Failed to initialize home page:', error);
    updateHTML(listView, `
      <div style="text-align: center; padding: 4rem 2rem; color: #ff6b6b;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
        <p>Failed to load projects. Please try again later.</p>
        <p style="font-size: 0.875rem; opacity: 0.7;">Error: ${error.message}</p>
      </div>
    `);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initHomePage();
    initThemeToggle();
  });
} else {
  initHomePage();
  initThemeToggle();
}
