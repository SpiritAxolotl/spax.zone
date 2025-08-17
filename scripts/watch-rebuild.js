#!/usr/bin/env node

const chokidar = require("chokidar");
const { exec } = require("child_process");
const { promisify } = require("util");

const execAsync = promisify(exec);

let rebuilding = false;
let rebuildTimeout;

async function rebuild() {
  if (rebuilding) {
    console.log("Rebuild already in progress, skipping...");
    return;
  }

  rebuilding = true;
  console.log("Rebuilding...");

  try {
    await execAsync("npm run build");
    console.log("Rebuild completed");
  } catch (error) {
    console.error("Rebuild failed:", error.message);
  } finally {
    rebuilding = false;
  }
}

// Only watch source directories; do NOT watch generated output
const filesToWatch = [
  "html",
  "js",
  "scss",
  "data"
];

console.log("Starting file watcher for live reload...");
console.log("Watching directories:", filesToWatch);

const watcher = chokidar.watch(filesToWatch, {
  // Ignore dotfiles and common non-source/output paths
  ignored: [
    /(^|[\/\\])\../,        // dotfiles
    "**/.build/**",         // build output
    "**/css/**",            // generated CSS output
    "**/node_modules/**",
    "**/.git/**"
  ],
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 400,
    pollInterval: 50
  }
});

function scheduleRebuild() {
  if (rebuildTimeout) clearTimeout(rebuildTimeout);
  // Slightly higher debounce to absorb editor/save bursts
  rebuildTimeout = setTimeout(rebuild, 600);
}

watcher.on("add", (path) => {
  console.log(`File added: ${path}`);
  scheduleRebuild();
});

watcher.on("change", (path) => {
  console.log(`File changed: ${path}`);
  scheduleRebuild();
});

watcher.on("unlink", (path) => {
  console.log(`File removed: ${path}`);
  scheduleRebuild();
});

watcher.on("ready", () => {
  console.log("Watching for changes...");
});

watcher.on("error", (error) => {
  console.error("File watcher error:", error);
});

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log('\nStopping file watcher...');
  watcher.close();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log('\nStopping file watcher...');
  watcher.close();
  process.exit(0);
});