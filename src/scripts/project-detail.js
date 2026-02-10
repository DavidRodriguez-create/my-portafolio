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
 * Initialize image slider
 */
function initImageSlider() {
  const sliderContainer = querySelector('.gallery-slider');
  if (!sliderContainer) return;
  
  const track = sliderContainer.querySelector('.slider-track');
  const items = sliderContainer.querySelectorAll('.slider-item');
  const dotsContainer = sliderContainer.querySelector('.slider-dots');
  const prevBtn = sliderContainer.querySelector('.slider-btn.prev');
  const nextBtn = sliderContainer.querySelector('.slider-btn.next');
  
  if (!track || items.length <= 1) return;
  
  let currentIndex = 0;
  let autoPlayInterval;
  let itemsPerPage = 2;
  
  // Calculate items per page based on viewport
  function updateItemsPerPage() {
    const width = window.innerWidth;
    if (width < 768) {
      itemsPerPage = 1;
    } else {
      itemsPerPage = 2;
    }
    // Update slider item flex basis
    items.forEach(item => {
      if (itemsPerPage === 1) {
        item.style.flex = '0 0 100%';
      } else {
        item.style.flex = '0 0 calc(50% - 0.5rem)';
      }
    });
  }
  
  function getTotalPages() {
    return Math.ceil(items.length / itemsPerPage);
  }
  
  function createDots() {
    if (!dotsContainer) return;
    const totalPages = getTotalPages();
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('data-index', i);
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => {
        stopAutoPlay();
        goToPage(i);
        startAutoPlay();
      });
      dotsContainer.appendChild(dot);
    }
  }
  
  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    const currentPage = Math.floor(currentIndex / itemsPerPage);
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentPage);
    });
  }
  
  function updateButtons() {
    if (prevBtn) {
      prevBtn.disabled = currentIndex === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = currentIndex >= items.length - itemsPerPage;
    }
  }
  
  function goToPage(pageIndex) {
    currentIndex = Math.min(pageIndex * itemsPerPage, items.length - itemsPerPage);
    updateSlider();
  }
  
  function updateSlider() {
    const itemWidth = items[0].offsetWidth;
    const gap = 16; // 1rem gap
    const offset = currentIndex * (itemWidth + gap);
    
    track.style.transform = `translateX(-${offset}px)`;
    updateDots();
    updateButtons();
  }
  
  function nextSlide() {
    if (currentIndex < items.length - itemsPerPage) {
      currentIndex += 1;
    } else {
      currentIndex = 0; // Loop back to start
    }
    updateSlider();
  }
  
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex -= 1;
    } else {
      currentIndex = Math.max(0, items.length - itemsPerPage); // Loop to end
    }
    updateSlider();
  }
  
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 7000);
  }
  
  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
  }
  
  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });
  }
  
  // Keyboard navigation
  let keydownListener = (e) => {
    if (!sliderContainer.matches(':hover')) return;
    if (e.key === 'ArrowLeft') {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
      e.preventDefault();
    }
  };
  document.addEventListener('keydown', keydownListener);
  
  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  
  sliderContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  sliderContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      stopAutoPlay();
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      startAutoPlay();
    }
  }
  
  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const oldItemsPerPage = itemsPerPage;
      updateItemsPerPage();
      if (oldItemsPerPage !== itemsPerPage) {
        currentIndex = 0;
        createDots();
      }
      updateSlider();
    }, 250);
  });
  
  // Initialize
  updateItemsPerPage();
  createDots();
  updateSlider();
  startAutoPlay();
  
  // Pause on hover
  sliderContainer.addEventListener('mouseenter', stopAutoPlay);
  sliderContainer.addEventListener('mouseleave', startAutoPlay);
  
  // Add click event to images for lightbox
  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });
}

/**
 * Initialize lightbox for image viewing
 */
function initLightbox() {
  const gallerySlider = querySelector('.gallery-slider');
  if (!gallerySlider) return;
  
  const images = Array.from(gallerySlider.querySelectorAll('.slider-item img'));
  if (images.length === 0) return;
  
  // Create lightbox HTML
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close lightbox">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    <button class="lightbox-nav prev" aria-label="Previous image">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    <div class="lightbox-content">
      <img class="lightbox-image" src="" alt="" />
    </div>
    <button class="lightbox-nav next" aria-label="Next image">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
    <div class="lightbox-counter"></div>
  `;
  
  document.body.appendChild(lightbox);
  
  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const lightboxPrev = lightbox.querySelector('.lightbox-nav.prev');
  const lightboxNext = lightbox.querySelector('.lightbox-nav.next');
  const lightboxCounter = lightbox.querySelector('.lightbox-counter');
  
  let currentLightboxIndex = 0;
  
  function showLightboxImage(index) {
    currentLightboxIndex = index;
    const img = images[index];
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCounter.textContent = `${index + 1} / ${images.length}`;
    
    // Update navigation button states
    if (images.length <= 1) {
      lightboxPrev.style.display = 'none';
      lightboxNext.style.display = 'none';
    } else {
      lightboxPrev.style.display = 'flex';
      lightboxNext.style.display = 'flex';
    }
  }
  
  function openLightboxAt(index) {
    showLightboxImage(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  function nextLightboxImage() {
    const nextIndex = (currentLightboxIndex + 1) % images.length;
    showLightboxImage(nextIndex);
  }
  
  function prevLightboxImage() {
    const prevIndex = (currentLightboxIndex - 1 + images.length) % images.length;
    showLightboxImage(prevIndex);
  }
  
  // Event listeners
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', nextLightboxImage);
  lightboxPrev.addEventListener('click', prevLightboxImage);
  
  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      prevLightboxImage();
    } else if (e.key === 'ArrowRight') {
      nextLightboxImage();
    }
  });
  
  // Store the open function globally so slider can call it
  window.openLightbox = openLightboxAt;
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
  initLightbox();
  initImageSlider();
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
