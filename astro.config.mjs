import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://nicolasmondain.github.io/ooo",
  base: "/ooo/",
  integrations: [tailwind(), sitemap()],
  markdown: {
    smartypants: true,
  },
});
