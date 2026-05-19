import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig(({ command }) => ({
  plugins: [
    viteTsConfigPaths({ projects: ["./tsconfig.json"] }),

    tanstackStart({
      server: { entry: "server" },
    }),
    viteReact(),
    tailwindcss(),
    ...(command === 'build' ? [cloudflare()] : [])
  ],
}));
