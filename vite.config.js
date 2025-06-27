import { defineConfig } from "vite";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execAsync = promisify(exec);

// Plugin to compile SCSS files
function scssCompilePlugin() {
  return {
    name: "scss-compile",
    async buildStart() {
      console.log("Compiling SCSS files...");
      
      // Create css directory if it doesn't exist
      if (!fs.existsSync("css")) {
        fs.mkdirSync("css", { recursive: true });
      }
      
      try {
        // Compile SCSS files using sass command
        await execAsync("sass scss/experimental.scss:css/experimental.css --silence-deprecation=mixed-decls");
        console.log("✓ experimental.scss compiled");
        
        await execAsync("sass scss/depfont.scss:css/depfont.css --silence-deprecation=mixed-decls");
        console.log("✓ depfont.scss compiled");
        
        await execAsync("sass scss/customfaces.scss:css/customfaces.css --silence-deprecation=mixed-decls");
        console.log("✓ customfaces.scss compiled");
        
        await execAsync("sass scss/depfaces.scss:css/depfaces.css --silence-deprecation=mixed-decls");
        console.log("✓ depfaces.scss compiled");
        
        await execAsync("sass scss/yugoslavia.scss:css/yugoslavia.css --silence-deprecation=mixed-decls");
        console.log("✓ yugoslavia.scss compiled");
        
      } catch (error) {
        console.error("Error compiling SCSS:", error);
        throw error;
      }
    }
  };
}

// Plugin to run your custom Node.js scripts on the build directory
function customBuildPlugin() {
  return {
    name: "custom-build",
    async writeBundle() {
      console.log("Running custom build scripts on .build directory...");
      
      try {
        // Change to .build directory and run scripts
        process.chdir(".build");
        
        // Run your Node.js scripts from the build directory
        await execAsync("node ../js/addpagemetadata.js");
        console.log("✓ addpagemetadata.js completed");
        
        await execAsync("node ../js/buildDEPdialogue.js");
        console.log("✓ buildDEPdialogue.js completed");
        
        await execAsync("node ../js/js-controlled-webrings.js");
        console.log("✓ js-controlled-webrings.js completed");
        
        /*
        await execAsync("node ../tests/djmax/build.js");
        console.log("✓ djmax/build.js completed");
        */
        
        // Change back to original directory
        process.chdir("..");
        
      } catch (error) {
        console.error("Error running build scripts:", error);
        // Make sure to change back to original directory even if there's an error
        try {
          process.chdir("..");
        } catch (chdirError) {
          console.error("Error changing back to original directory:", chdirError);
        }
        throw error;
      }
    }
  };
}

// Plugin to copy files that Vite doesn't handle automatically
function copyFilesPlugin() {
  return {
    name: "copy-files",
    async generateBundle() {
      console.log("Copying files to .build directory...");
      
      const copyDir = (src, dest) => {
        if (!fs.existsSync(src)) {
          console.log(`Source directory ${src} does not exist, skipping...`);
          return;
        }
        
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest, { recursive: true });
        }
        
        const files = fs.readdirSync(src);
        files.forEach(file => {
          const srcPath = path.join(src, file);
          const destPath = path.join(dest, file);
          
          if (fs.statSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath);
          } else {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied: ${srcPath} → ${destPath}`);
          }
        });
      };
      
      const copyFile = (src, dest) => {
        if (!fs.existsSync(src)) {
          console.log(`Source file ${src} does not exist, skipping...`);
          return;
        }
        
        const destDir = path.dirname(dest);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        
        fs.copyFileSync(src, dest);
        console.log(`Copied: ${src} → ${dest}`);
      };
      
      // Create .build directory
      if (!fs.existsSync(".build")) {
        fs.mkdirSync(".build", { recursive: true });
      }
      
      // Copy HTML and test files to root directory
      if (fs.existsSync("./html")) {
        copyDir("./html", "./.build");
      }
      if (fs.existsSync("./tests")) {
        copyDir("./tests", "./.build");
      }
      
      // Copy all other root directories and files
      const rootItems = [
        "css",
        "images",
        "buttons",
        "audio",
        "scss",
        "data",
        "fonts",
        "js"
      ];
      rootItems.forEach(item => {
        const srcPath = `./${item}`;
        const destPath = `./.build/${item}`;
        
        if (fs.existsSync(srcPath)) {
          if (fs.statSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath);
          } else {
            copyFile(srcPath, destPath);
          }
        }
      });
      
      // Copy any other files in root (like .htaccess, robots.txt, etc.)
      const rootFiles = fs.readdirSync(".");
      rootFiles.forEach(file => {
        const srcPath = `./${file}`;
        const destPath = `./.build/${file}`;
        
        // Skip directories we've already handled and build artifacts
        if (
          fs.statSync(srcPath).isFile() &&
          !file.startsWith(".") &&
          ![
            "package.json",
            "package-lock.json",
            "vite.config.js",
            "vite.dev.config.js",
            "build-entry.js"
          ].includes(file) &&
          !file.endsWith(".md")
        ) {
          copyFile(srcPath, destPath);
        }
      });
      
      console.log("✓ File copying completed");
    }
  };
}

// Create a dummy entry file if it doesn't exist
function createDummyEntry() {
  const entryContent = `// Dummy entry file for Vite build
console.log("Build completed successfully");
`;
  
  if (!fs.existsSync("build-entry.js")) {
    fs.writeFileSync("build-entry.js", entryContent);
  }
}

// Create the dummy entry file
createDummyEntry();

export default defineConfig({
  // Set root to current directory
  root: ".",
  
  // Build configuration
  build: {
    outDir: ".build",
    emptyOutDir: true,
    
    // Use our dummy entry file
    rollupOptions: {
      input: "./build-entry.js",
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name][extname]"
      }
    }
  },
  
  // Development server configuration
  server: {
    port: 3000,
    open: true,
    // Serve from .build directory for development
    root: ".build",
    fs: {
      // Allow serving files from parent directory (for dev server)
      allow: [".."]
    }
  },
  
  // Preview server also serves from .build
  preview: {
    port: 4173,
    open: true,
    // Serve from .build directory
    outDir: ".build"
  },
  
  // Use our custom plugins
  plugins: [
    scssCompilePlugin(),
    customBuildPlugin(),
    copyFilesPlugin()
  ]
});