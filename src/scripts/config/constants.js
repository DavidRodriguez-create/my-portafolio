/**
 * Application-wide constants and configuration
 * Centralizes all magic strings and configuration values
 */

export const MATRIX_CONFIG = {
  fontSize: 16,
  hue: 160,
  fadeAlpha: 0.08,
  resetProbability: 0.975,
  characters: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロ0123456789"
};

export const GISCUS_DEFAULTS = {
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top',
  theme: 'preferred_color_scheme',
  lang: 'en',
  loading: 'lazy'
};

// Base path for GitHub Pages deployment
// Use '' for root domain or '/my-portafolio' for GitHub Pages subpath
const getBasePath = () => {
  if (typeof window === 'undefined') return '';
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? '' 
    : '/my-portafolio';
};

export const BASE_PATH = getBasePath();

export const API_ENDPOINTS = {
  get projects() {
    return `${getBasePath()}/projects.json`;
  }
};

export const DOM_SELECTORS = {
  listView: '#listView',
  projectDetail: '#projectDetail',
  yearFilter: '#yearFilter',
  techFilter: '#techFilter',
  typeFilter: '#typeFilter',
  searchInput: '#searchInput',
  projectCount: '#projectCount',
  filtersTitle: '.filters-title',
  yearNow: '#yearNow'
};
