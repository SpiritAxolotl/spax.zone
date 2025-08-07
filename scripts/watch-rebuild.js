#!/usr/bin/env node

const chokidar = require('chokidar');
const { exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');

const execAsync = promisify(exec);

let rebuilding = false;

async function rebuild() {
  if (rebuilding) {
    console.log('⏳ Rebuild already in progress, skipping...');
    return;
  }
  
  rebuilding = true;
  console.log('🔨 Rebuilding...');
  
  try {
    await execAsync('npm run build');
    console.log('✅ Rebuild completed');
  } catch (error) {
    console.error('❌ Rebuild failed:', error.message);
  } finally {
    rebuilding = false;
  }
}

// Watch source files for changes
const filesToWatch = [
  'html',
  'js',
  'scss',
  'css',
  'data'
];

console.log('🔥 Starting file watcher for live reload...');
console.log('👀 Watching directories:', filesToWatch);

const watcher = chokidar.watch(filesToWatch, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true,
  recursive: true // watch subdirectories
});

// Debounce rebuilds to avoid too many rapid rebuilds
let rebuildTimeout;

watcher.on('change', (path) => {
  console.log(`📝 File changed: ${path}`);
  
  // Clear previous timeout
  if (rebuildTimeout) {
    clearTimeout(rebuildTimeout);
  }
  
  // Schedule rebuild with debounce
  rebuildTimeout = setTimeout(rebuild, 300);
});

watcher.on('add', (path) => {
  console.log(`➕ File added: ${path}`);
  
  if (rebuildTimeout) {
    clearTimeout(rebuildTimeout);
  }
  
  rebuildTimeout = setTimeout(rebuild, 300);
});

watcher.on('unlink', (path) => {
  console.log(`➖ File removed: ${path}`);
  
  if (rebuildTimeout) {
    clearTimeout(rebuildTimeout);
  }
  
  rebuildTimeout = setTimeout(rebuild, 300);
});

watcher.on('ready', () => {
  console.log('👀 Watching for changes...');
});

watcher.on('error', error => {
  console.error('❌ File watcher error:', error);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Stopping file watcher...');
  watcher.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Stopping file watcher...');
  watcher.close();
  process.exit(0);
});