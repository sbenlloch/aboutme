import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://serg1o.dev",
  markdown: {
    shikiConfig: {
      theme: "github-light"
    }
  }
});
