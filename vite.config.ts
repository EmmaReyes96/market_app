import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080",
  },
  resolve: {
    alias: {
      "@components": "/src/components",
      "@screens": "/src/screens",
      "@services": "/src/services",
      "@interfaces": "/src/interfaces",
      "@assets": "/src/assets",
      "@guard": "/src/guard",
      "@layout": "/src/layout",
    },
  },
});
