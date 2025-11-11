import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // allow connections from anywhere
    port: 5173,
    strictPort: true,
    allowedHosts: [".ngrok-free.app"], // ✅ allow all ngrok subdomains
  },
});
