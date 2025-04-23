import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  publicDir: "resources",
});

const audioFiles = {
  1: {
    1: "/resources/1/1.m4a",
    2: "/resources/1/2.m4a",
  },
  2: {
    1: "/resources/2/1.m4a",
  },
};
