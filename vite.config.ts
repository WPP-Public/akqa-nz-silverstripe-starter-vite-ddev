import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./app/client/src/"),
        },
    },
    server: {
        https: false,
        host: true,
    },
    build: {
        manifest: true,
        emptyOutDir: false,
        outDir: "./app/client/dist",
        sourcemap: true,
        copyPublicDir: false,
        rollupOptions: {
            input: {
                index: "app/client/src/index.js",
            },
        },
    },
});
