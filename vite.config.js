import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#outputmanualchunks
      output: {
        manualChunks: {
          gestion: [
            "./src/layout/AppLayout",
            "./src/pages/LoginView",
            "./src/pages/AreasView",
            "./src/pages/CarrerasView",
            "./src/pages/DashboardView",
          ],
        },
      },
    },
  },
  plugins: [vue()],
});
