import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import trEntry from "./build/tr-entry.js";
import docPdfs from "./build/doc-pdfs.js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), trEntry(), docPdfs()],
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
