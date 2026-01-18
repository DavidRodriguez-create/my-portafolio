#!/usr/bin/env node

/**
 * Build Script
 * Generates static site from source files
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  srcDir: 'src',
  publicDir: 'public',
  distDir: 'dist',
  templatesDir: 'src/templates',
  dataDir: 'src/data',
  stylesDir: 'src/styles',
  scriptsDir: 'src/scripts'
};

// Utilities
const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  error: (msg) => console.error(`❌ ${msg}`)
};

/**
 * Recursively copy directory
 */
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      // Overwrite existing files instead of failing
      try {
        fs.copyFileSync(srcPath, destPath);
      } catch (err) {
        log.error(`Failed to copy ${srcPath}: ${err.message}`);
      }
    }
  }
}

/**
 * Clean dist directory (with Windows retry logic)
 */
function cleanDist() {
  log.info('Preparing dist directory...');
  
  // Don't delete, just ensure it exists
  // This avoids Windows file locking issues
  if (!fs.existsSync(CONFIG.distDir)) {
    fs.mkdirSync(CONFIG.distDir, { recursive: true });
  }
  
  log.success('Dist directory ready');
}

/**
 * Copy static assets
 */
function copyStaticAssets() {
  log.info('Copying static assets...');
  
  try {
    // Copy public assets
    if (fs.existsSync(CONFIG.publicDir)) {
      copyDir(CONFIG.publicDir, CONFIG.distDir);
      log.success('Public assets copied');
    }
    
    // Copy styles
    const stylesSourceDir = CONFIG.stylesDir;
    const stylesDestDir = path.join(CONFIG.distDir, 'css');
    if (fs.existsSync(stylesSourceDir)) {
      fs.mkdirSync(stylesDestDir, { recursive: true });
      const cssFiles = fs.readdirSync(stylesSourceDir).filter(f => f.endsWith('.css'));
      cssFiles.forEach(file => {
        fs.copyFileSync(
          path.join(stylesSourceDir, file),
          path.join(stylesDestDir, file)
        );
      });
      log.success(`Styles copied (${cssFiles.length} files)`);
    }
    
    // Copy scripts
    const scriptsSource = CONFIG.scriptsDir;
    const scriptsDest = path.join(CONFIG.distDir, 'js');
    if (fs.existsSync(scriptsSource)) {
      copyDir(scriptsSource, scriptsDest);
      log.success('Scripts copied');
    }
    
    // Copy projects.json to dist root
    const projectsJsonSource = path.join(CONFIG.dataDir, 'projects.json');
    const projectsJsonDest = path.join(CONFIG.distDir, 'projects.json');
    if (fs.existsSync(projectsJsonSource)) {
      fs.copyFileSync(projectsJsonSource, projectsJsonDest);
      log.success('Projects data copied');
    }
  } catch (error) {
    log.error(`Failed copying assets: ${error.message}`);
    // Continue anyway - files might just be locked
  }
}

/**
 * Build HTML pages
 */
function buildPages() {
  log.info('Building HTML pages...');
  
  // Copy index.html
  const indexSource = path.join(CONFIG.templatesDir, 'index.html');
  const indexDest = path.join(CONFIG.distDir, 'index.html');
  
  if (fs.existsSync(indexSource)) {
    fs.copyFileSync(indexSource, indexDest);
    log.success('Index page built');
  }
  
  // Generate project pages
  const projectsData = JSON.parse(
    fs.readFileSync(path.join(CONFIG.dataDir, 'projects.json'), 'utf-8')
  );
  
  const projectTemplate = fs.readFileSync(
    path.join(CONFIG.templatesDir, 'project.html'),
    'utf-8'
  );
  
  // Create catch-all /projects/index.html for non-existent projects
  const projectsDir = path.join(CONFIG.distDir, 'projects');
  fs.mkdirSync(projectsDir, { recursive: true });
  fs.writeFileSync(path.join(projectsDir, 'index.html'), projectTemplate);
  
  // Generate individual project pages
  projectsData.projects.forEach(project => {
    const projectDir = path.join(CONFIG.distDir, 'projects', project.id);
    fs.mkdirSync(projectDir, { recursive: true });
    fs.writeFileSync(path.join(projectDir, 'index.html'), projectTemplate);
  });
  
  log.success(`Generated ${projectsData.projects.length} project pages`);
}

/**
 * Main build process
 */
function build() {
  console.log('\n🚀 Starting build process...\n');
  
  try {
    cleanDist();
    copyStaticAssets();
    buildPages();
    
    console.log('\n✨ Build completed successfully!\n');
  } catch (error) {
    log.error(`Build failed: ${error.message}`);
    process.exit(1);
  }
}

// Run build
build();
