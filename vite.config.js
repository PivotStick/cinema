import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: "./",
  resolve: {
    alias: {
      "@tabs": "/src/lib/tabs",
      "@stores": "/src/lib/stores",
      "@components": "/src/lib/components",
    },
  },
});
