// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["WebSdk"],
  },
  resolve: {
    alias: {
      WebSdk: "/src/core/modules/WebSdk",
    },
  },
});
