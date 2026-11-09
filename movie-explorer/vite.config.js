import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" makes the build work under any GitHub Pages sub-path
// (https://<user>.github.io/<repo>/). HashRouter is used in the app so
// page refreshes on deep links never 404 on GitHub Pages.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
