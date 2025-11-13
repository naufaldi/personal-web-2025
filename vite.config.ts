import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(
  {
    plugins:
      [
        tailwindcss(),
        react(),
      ],
    resolve:
      {
        alias:
          {
            "@": path.resolve(
              __dirname,
              "./src",
            ),
          },
      },
    build:
      {
        outDir:
          "dist/client",
        rollupOptions:
          {
            input:
              {
                main: path.resolve(
                  __dirname,
                  "index.html",
                ),
              },
          },
        target:
          "esnext",
      },
    ssr: {
      noExternal:
        [
          "react",
          "react-dom",
          "react-router",
        ],
      resolve:
        {
          externalConditions:
            [
              "node",
            ],
        },
    },
    optimizeDeps:
      {
        include:
          [
            "front-matter",
            "@uiw/react-codemirror",
            "@codemirror/lang-javascript",
            "@codemirror/lang-html",
            "@codemirror/lang-css",
            "@codemirror/lang-json",
          ],
      },
  },
);
