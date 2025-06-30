import { defineConfig } from "vite";

export default defineConfig({
  root: ".build",
  appType: "mpa",
  server: {
    port: 2319,
    open: true,
  }
});