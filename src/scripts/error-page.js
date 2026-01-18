/**
 * Matrix-style error page module
 * Separation of concerns: Matrix effect isolated and configurable
 */

import { MATRIX_CONFIG } from './config/constants.js';

/**
 * Generate Matrix effect HTML structure
 * @returns {string} HTML string
 */
function getMatrixHTML() {
  return `
    <div class="matrix-wrap">
      <canvas id="matrix-canvas"></canvas>
      <div class="matrix-content">
        <h1 id="neon-title" data-text="PROJECT VANISHED">PROJECT VANISHED</h1>
        <p>Signal drowned in the data stream. No retrievable record.</p>
      </div>
    </div>
  `;
}

/**
 * Initialize Matrix digital rain animation
 */
function initMatrixCanvas() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const chars = MATRIX_CONFIG.characters.split('');
  let drops = [];
  let columns = 0;

  /**
   * Resize canvas to fit container
   */
  const resizeCanvas = () => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    columns = Math.floor(canvas.width / MATRIX_CONFIG.fontSize);
    drops = new Array(columns).fill(1);
  };

  /**
   * Draw Matrix rain effect
   */
  const drawMatrix = () => {
    // Fade effect
    ctx.fillStyle = `rgba(0, 0, 0, ${MATRIX_CONFIG.fadeAlpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${MATRIX_CONFIG.fontSize}px monospace`;

    // Draw characters
    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const hueJitter = (Math.random() * 8) - 4;
      const brightness = 55 + Math.random() * 20;
      
      ctx.fillStyle = `hsl(${MATRIX_CONFIG.hue + hueJitter}, 100%, ${brightness}%)`;
      ctx.shadowColor = `hsl(${MATRIX_CONFIG.hue}, 100%, 50%)`;
      ctx.shadowBlur = 8;
      ctx.fillText(char, i * MATRIX_CONFIG.fontSize, drops[i] * MATRIX_CONFIG.fontSize);

      // Reset drop to top randomly
      if (drops[i] * MATRIX_CONFIG.fontSize > canvas.height && 
          Math.random() > MATRIX_CONFIG.resetProbability) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    requestAnimationFrame(drawMatrix);
  };

  // Setup and start
  window.addEventListener('resize', resizeCanvas, { passive: true });
  resizeCanvas();
  drawMatrix();
}

/**
 * Public API: Show Matrix error page for non-existent projects
 * @param {HTMLElement} targetElement - Container element to render into
 */
export function showProjectNotFound(targetElement) {
  if (!targetElement) return;
  
  targetElement.innerHTML = getMatrixHTML();
  
  // Initialize canvas after DOM update
  setTimeout(initMatrixCanvas, 0);
}

// Expose to window for legacy compatibility
window.showProjectNotFound = showProjectNotFound;
