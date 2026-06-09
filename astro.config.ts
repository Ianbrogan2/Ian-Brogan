import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://ianbrogan.com',
  // NOTE: do NOT set `base` — it breaks internal links on an apex custom domain
  integrations: [
    sitemap(),
    mdx(),
  ],
  vite: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plugins: [tailwindcss() as any],
  },
  image: {
    // sharp is auto-detected; this enables optimization for astro:assets
    remotePatterns: [],
  },
});
