import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

export default defineConfig({
  root: ".build",
  
  server: {
    port: 3000,
    open: true,
    
    // Custom middleware to handle 404s properly
    middlewares: [
      (req, res, next) => {
        // If it's a request for a file that doesn't exist and it's not an API call
        if (!req.url.includes(".") && !req.url.startsWith("/api")) {
          const filePath = path.join(".build", req.url, "index.html");
          const directFilePath = path.join(".build", req.url.slice(1));
          
          // Check if the requested path exists as a file or has an index.html
          if (fs.existsSync(filePath)) {
            // Serve the index.html from that directory
            return next();
          } else if (fs.existsSync(directFilePath) && fs.statSync(directFilePath).isFile()) {
            // Serve the direct file
            return next();
          } else if (fs.existsSync(path.join(".build", "404.html"))) {
            // Serve custom 404 page
            const content404 = fs.readFileSync(path.join(".build", "404.html"), "utf-8");
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(content404);
            return;
          }
        }
        next();
      }
    ]
  }
});