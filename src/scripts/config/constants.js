/**
 * Application-wide constants and configuration
 * Centralizes all magic strings and configuration values
 */

export const TECH_COLOR_MAP = {
  'html5': 'E34F26',
  'html': 'E34F26',
  'javascript': 'f7df1c',
  'js': 'f7df1c',
  'bootstrap': '7953b3',
  'typescript': '007ACC',
  'ts': '007ACC',
  'react': '45b8d8',
  'reactjs': '45b8d8',
  'angular': 'DD0031',
  'jest': 'be3d19',
  'adobephotoshop': '30a8ff',
  'photoshop': '30a8ff',
  'adobexd': 'ff62f6',
  'xd': 'ff62f6',
  'nodejs': '43853d',
  'node.js': '43853d',
  'node': '43853d',
  'webpack': '8DD6F9',
  'docker': '46a2f1',
  'githubactions': '2088FF',
  'github-actions': '2088FF',
  'googlecloudplatform': '1a73e8',
  'gcp': '1a73e8',
  'insomnia': '5849BE',
  'apollo': '311C87',
  'apollographql': '311C87',
  'redux': '764ABC',
  'graphql': 'E10098',
  'sass': 'CC6699',
  'scss': 'CC6699',
  'styledcomponents': 'db7092',
  'styled-components': 'db7092',
  'git': 'F05032',
  'nestjs': 'ea2845',
  'nest': 'ea2845',
  'npm': 'CB3837',
  'd3js': 'F9A03C',
  'd3.js': 'F9A03C',
  'd3': 'F9A03C',
  'prettier': 'F7B93E',
  'mongodb': '13aa52',
  'mongo': '13aa52',
  'vite': '646CFF',
  'pwa': '5A0FC8',
  'scala': 'DC322F',
  'apachespark': 'E25A1C',
  'spark': 'E25A1C',
  'apachesparks': 'E25A1C',
  'databricks': 'FF3621',
  'deltalake': '00ADD4',
  'delta': '00ADD4',
  'apachekafka': '231F20',
  'kafka': '231F20',
  'python': '3776AB',
  'java': '007396',
  'spring': '6DB33F',
  'springboot': '6DB33F',
  'postgresql': '4169E1',
  'postgres': '4169E1',
  'mysql': '4479A1',
  'aws': 'FF9900',
  'amazon': 'FF9900',
  'azure': '0089D6',
  'kubernetes': '326CE5',
  'k8s': '326CE5',
  'terraform': '7B42BC',
  'jenkins': 'D24939',
  'gitlab': 'FCA121',
  'pandas': '150458',
  'airflow': '017CEE',
  'apacheairflow': '017CEE'
};

export const DEFAULT_TECH_COLOR = '0D1117';

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
