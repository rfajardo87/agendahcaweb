import { defineConfig } from "vite";
import path from "path";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      $lib: path.resolve(__dirname, "./src/lib/"),
      $app: path.resolve(__dirname, "./src/apps/"),
      $store: path.resolve(__dirname, "./src/stores/"),
      $api: path.resolve(__dirname, "./src/api/"),
      $shared: path.resolve(__dirname, "./src/shared/"),
    },
  },
});
