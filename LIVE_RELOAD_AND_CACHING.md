# Live Reload and Caching Features

This document describes the live-reload and caching features implemented in the Vite configuration.

## Features

### 1. JavaScript File Caching

The build system now tracks changes in JavaScript files and skips rebuilding when no changes are detected.

**How it works:**
- Calculates MD5 hashes of JavaScript files before build
- Compares with cached hashes from previous build
- Skips custom build scripts if no changes detected
- Saves cache to `.build-cache.json` (automatically excluded from git)

**Monitored files:**
- `./js/addpagemetadata.js`
- `./js/js-controlled-webrings.js`
- `./js/buildDEPdialogue.js`
- `./build-entry.js`

**Benefits:**
- Significantly faster subsequent builds when only non-JS files change
- Intelligent rebuilding only when necessary

### 2. Live Reload for Development

The development workflow now includes automatic file watching and live reloading.

**Usage:**
```bash
# Standard development with live reload
npm run dev-watch
```

**How it works:**
- Watches source directories: `html`, `js`, `scss`, `css`, `data`
- Automatically rebuilds when files change
- Vite development server automatically reloads pages
- Debounced rebuilds to avoid excessive building

**Features:**
- File change detection with 300ms debounce
- Automatic browser reload after rebuild
- Graceful error handling for network-dependent scripts

## Build Scripts

- `npm run dev` - Build once and start dev server
- `npm run dev-watch` - Build and start dev server with live reload
- `npm run build` - Standard build with caching
- `npm run watch-rebuild` - File watcher only (for debugging)

## Technical Details

### Caching Implementation
- Uses MD5 hashing for file change detection
- Cache stored in `.build-cache.json`
- Fallback to full build if cache is corrupted
- Individual file tracking for granular control

### Live Reload Implementation
- Uses `chokidar` for reliable file watching
- Watches source directories recursively
- Integration with Vite's hot module replacement
- Concurrent execution of file watcher and dev server

### Error Handling
- Network-dependent scripts (like `buildDEPdialogue.js`) fail gracefully
- Build continues even if individual scripts fail
- Warning messages for non-critical failures
- Proper cleanup on process termination