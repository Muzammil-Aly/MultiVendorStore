import { defineConfig } from "vite";

import tailwindcss from "@tailwindcss/vite";

import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": "http://localhost:8001",
    },
  },
  plugins: [react(), tailwindcss()],
});
