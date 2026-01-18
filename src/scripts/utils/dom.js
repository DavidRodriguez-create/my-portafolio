/**
 * DOM Utility functions
 * Separation of concerns: DOM operations isolated from business logic
 */

/**
 * Safely query a single element
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (defaults to document)
 * @returns {Element|null} Found element or null
 */
export function querySelector(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Safely query multiple elements
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (defaults to document)
 * @returns {Element[]} Array of elements
 */
export function querySelectorAll(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

/**
 * Safely get element by ID
 * @param {string} id - Element ID (without #)
 * @returns {Element|null} Found element or null
 */
export function getElementById(id) {
  return document.getElementById(id);
}

/**
 * Update element text content safely
 * @param {string} selector - CSS selector or element
 * @param {string} text - Text to set
 */
export function updateTextContent(selector, text) {
  const element = typeof selector === 'string' ? querySelector(selector) : selector;
  if (element) {
    element.textContent = text;
  }
}

/**
 * Update element HTML safely
 * @param {string} selector - CSS selector or element
 * @param {string} html - HTML to set
 */
export function updateHTML(selector, html) {
  const element = typeof selector === 'string' ? querySelector(selector) : selector;
  if (element) {
    element.innerHTML = html;
  }
}

/**
 * Update document title
 * @param {string} title - New title
 */
export function updateTitle(title) {
  document.title = title;
}

/**
 * Update or create meta tag
 * @param {string} property - Meta property name
 * @param {string} content - Meta content
 */
export function updateMetaTag(property, content) {
  let meta = querySelector(`meta[property="${property}"]`);
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
}

/**
 * Get current year
 * @returns {number} Current year
 */
export function getCurrentYear() {
  return new Date().getFullYear();
}
