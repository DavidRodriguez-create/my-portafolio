/**
 * Data service for fetching and managing project data
 * Separation of concerns: API layer isolated from business logic
 */

import { API_ENDPOINTS } from '../config/constants.js';

/**
 * Fetch projects data from JSON endpoint
 * @returns {Promise<Object>} Project data object with config and projects
 * @throws {Error} If fetch fails or response is invalid
 */
export async function fetchProjects() {
  try {
    const response = await fetch(API_ENDPOINTS.projects);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format received');
    }
    
    return data;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw error;
  }
}

/**
 * Find a project by its ID
 * @param {Object[]} projects - Array of project objects
 * @param {string} projectId - Project ID to find
 * @returns {Object|null} Project object or null if not found
 */
export function findProjectById(projects, projectId) {
  if (!Array.isArray(projects) || !projectId) {
    return null;
  }
  
  return projects.find(p => p.id === projectId) || null;
}

/**
 * Extract unique years from projects
 * @param {Object[]} projects - Array of project objects
 * @returns {Array<string|number>} Sorted array of unique years (descending)
 */
export function getUniqueYears(projects) {
  if (!Array.isArray(projects)) return [];
  
  const years = [...new Set(projects.map(p => p.year))];
  return years.sort().reverse();
}

/**
 * Extract unique technologies from all projects
 * @param {Object[]} projects - Array of project objects
 * @returns {string[]} Sorted array of unique technologies
 */
export function getUniqueTechnologies(projects) {
  if (!Array.isArray(projects)) return [];
  
  const techs = [...new Set(projects.flatMap(p => p.tech || []))];
  return techs.sort();
}

/**
 * Extract unique project types
 * @param {Object[]} projects - Array of project objects
 * @returns {string[]} Sorted array of unique types
 */
export function getUniqueTypes(projects) {
  if (!Array.isArray(projects)) return [];
  
  const types = [...new Set(projects.map(p => p.type))];
  return types.sort();
}
