/**
 * Filter module for project list
 * Separation of concerns: Filter logic isolated and reusable
 */

/**
 * Check if a project matches all filter criteria
 * @param {HTMLElement} card - Card element with data attributes
 * @param {Object} filters - Filter criteria object
 * @returns {boolean} True if card matches all filters
 */
function matchesFilters(card, filters) {
  const { year, tech, type, searchQuery } = filters;
  
  const cardYear = card.dataset.year;
  const cardType = card.dataset.type;
  const cardTechs = card.dataset.tech ? card.dataset.tech.split(',') : [];
  const cardTitle = card.querySelector('h3')?.textContent.toLowerCase() || '';
  const cardDesc = card.querySelector('.card-description')?.textContent.toLowerCase() || '';
  
  // Year filter
  if (year && cardYear !== year) return false;
  
  // Tech filter
  if (tech && !cardTechs.includes(tech)) return false;
  
  // Type filter
  if (type && cardType !== type) return false;
  
  // Search query filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase().trim();
    if (!cardTitle.includes(query) && !cardDesc.includes(query)) {
      return false;
    }
  }
  
  return true;
}

/**
 * Apply filters to project cards
 * @param {HTMLElement[]} cards - Array of card elements
 * @param {Object} filters - Filter criteria object
 * @returns {number} Number of visible cards
 */
export function applyFilters(cards, filters) {
  let visibleCount = 0;
  
  cards.forEach(card => {
    const matches = matchesFilters(card, filters);
    card.style.display = matches ? '' : 'none';
    if (matches) visibleCount++;
  });
  
  return visibleCount;
}

/**
 * Populate a select dropdown with options
 * @param {HTMLSelectElement} selectElement - The select element to populate
 * @param {Array} options - Array of option values
 */
export function populateSelect(selectElement, options) {
  if (!selectElement || !Array.isArray(options)) return;
  
  options.forEach(value => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    selectElement.appendChild(option);
  });
}

/**
 * Update filter count display
 * @param {HTMLElement} element - Element to update
 * @param {number} visibleCount - Number of visible items
 * @param {number} totalCount - Total number of items
 */
export function updateFilterCount(element, visibleCount, totalCount) {
  if (!element) return;
  
  element.textContent = `(${visibleCount} of ${totalCount})`;
}

/**
 * Initialize filter system
 * @param {Object} elements - DOM elements for filters
 * @param {HTMLElement[]} cards - Array of card elements
 * @param {Object} data - Data containing years, techs, types
 * @param {Function} onFilterChange - Callback when filters change
 */
export function initializeFilters(elements, cards, data, onFilterChange) {
  const { yearFilter, techFilter, typeFilter, searchInput } = elements;
  
  if (!yearFilter || !techFilter || !typeFilter || !searchInput) {
    console.warn('Filter elements not found');
    return;
  }
  
  // Populate dropdowns
  populateSelect(yearFilter, data.years);
  populateSelect(techFilter, data.technologies);
  populateSelect(typeFilter, data.types);
  
  // Create filter function
  const handleFilterChange = () => {
    const filters = {
      year: yearFilter.value,
      tech: techFilter.value,
      type: typeFilter.value,
      searchQuery: searchInput.value
    };
    
    const visibleCount = applyFilters(cards, filters);
    
    if (onFilterChange) {
      onFilterChange(visibleCount, cards.length);
    }
  };
  
  // Attach event listeners
  yearFilter.addEventListener('change', handleFilterChange);
  techFilter.addEventListener('change', handleFilterChange);
  typeFilter.addEventListener('change', handleFilterChange);
  searchInput.addEventListener('input', handleFilterChange);
  
  // Return cleanup function
  return () => {
    yearFilter.removeEventListener('change', handleFilterChange);
    techFilter.removeEventListener('change', handleFilterChange);
    typeFilter.removeEventListener('change', handleFilterChange);
    searchInput.removeEventListener('input', handleFilterChange);
  };
}
