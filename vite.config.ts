import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://localhost:7160", // 🚀 Assure-toi que l'URL est correcte
        changeOrigin: true,
        secure: false, // ❗ Désactive la vérification SSL si l'API utilise un certificat auto-signé
      },
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
