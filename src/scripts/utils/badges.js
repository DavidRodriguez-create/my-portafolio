/**
 * Utility functions for generating badges and UI elements
 * Separation of concerns: Pure functions for rendering logic
 */

import { TECH_COLOR_MAP, DEFAULT_TECH_COLOR } from '../config/constants.js';

/**
 * Get the color for a technology badge
 * @param {string} tech - Technology name
 * @returns {string} Hex color code
 */
export function getTechColor(tech) {
  const normalized = tech.toLowerCase().replace(/\s+/g, '');
  return TECH_COLOR_MAP[normalized] || DEFAULT_TECH_COLOR;
}

/**
 * Get logo color for tech badge (handles special cases)
 * @param {string} tech - Technology name
 * @returns {string} 'black' or 'white'
 */
export function getTechLogoColor(tech) {
  const normalized = tech.toLowerCase().replace(/\s+/g, '');
  return (normalized === 'javascript' || normalized === 'js') ? 'black' : 'white';
}

/**
 * Generate a technology badge image URL
 * @param {string} tech - Technology name
 * @param {boolean} isSmall - Whether to use small badge style
 * @returns {string} Shield.io badge URL
 */
export function generateTechBadge(tech, isSmall = false) {
  const color = getTechColor(tech);
  const logoColor = getTechLogoColor(tech);
  const className = isSmall ? 'tech-badge-small' : 'tech-badge-img';
  const normalized = tech.toLowerCase().replace(/\s+/g, '');
  
  return `<img src="https://img.shields.io/badge/-${encodeURIComponent(tech)}-${color}?style=flat-square&logo=${encodeURIComponent(normalized)}&logoColor=${logoColor}" alt="${tech}" class="${className}" />`;
}

/**
 * Generate all tech badges for a project
 * @param {string[]} techArray - Array of technology names
 * @param {boolean} isSmall - Whether to use small badge style
 * @returns {string} HTML string of badges
 */
export function generateTechBadges(techArray, isSmall = false) {
  return techArray.map(tech => generateTechBadge(tech, isSmall)).join('');
}

/**
 * Generate a year badge
 * @param {number|string} year - Year value
 * @returns {string} HTML img tag
 */
export function generateYearBadge(year) {
  return `<img src="https://img.shields.io/badge/${year}-2563EB?style=flat-square" alt="${year}" class="card-badge" />`;
}

/**
 * Generate a type/category badge
 * @param {string} type - Project type
 * @returns {string} HTML img tag
 */
export function generateTypeBadge(type) {
  return `<img src="https://img.shields.io/badge/${encodeURIComponent(type)}-10B981?style=flat-square" alt="${type}" class="card-badge" />`;
}

/**
 * Generate year badge for detail page
 * @param {number|string} year - Year value
 * @returns {string} HTML img tag
 */
export function generateYearBadgeDetail(year) {
  return `<img src="https://img.shields.io/badge/Year-${year}-2563EB?style=flat-square&logoColor=white" alt="Year: ${year}" class="badge-img" />`;
}

/**
 * Generate type badge for detail page
 * @param {string} type - Project type
 * @returns {string} HTML img tag
 */
export function generateTypeBadgeDetail(type) {
  return `<img src="https://img.shields.io/badge/Type-${encodeURIComponent(type)}-10B981?style=flat-square&logoColor=white" alt="Type: ${type}" class="badge-img" />`;
}
