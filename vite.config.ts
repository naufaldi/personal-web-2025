import path from "path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeSlug from "rehype-slug";

/**
 * Wraps the MDX plugin to skip ?raw imports.
 * @mdx-js/rollup strips query strings before checking include/exclude,
 * which causes it to process ?raw imports and break the raw string pipeline.
 */
function mdxPlugin(): Plugin {
  const inner = mdx({
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: "frontmatter" }],
    ],
    rehypePlugins: [rehypeSlug],
  }) as Plugin;

  return {
    ...inner,
    name: "mdx-no-raw",
    transform(code, id) {
      // Skip ?raw imports — let Vite handle them as plain strings
      if (id.includes("?")) return null;
      // Only process blog .md files
      if (!/content\/blogs\/.*\.md$/.test(id)) return null;
      return (inner.transform as Function)?.call(this, code, id);
    },
  };
}

export default defineConfig(
  {
    plugins:
      [
        tailwindcss(),
        mdxPlugin(),
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
          "dist",
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
