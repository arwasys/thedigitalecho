// @ts-check
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Hybrid SSR: pages render on demand (always in sync with WordPress);
  // rarely-changing pages opt out with `export const prerender = true`.
  // cPanel runs the standalone server: node dist/server/entry.mjs
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  // One URL per page: /about → 308 → /about/ (matches sitemap + canonicals)
  trailingSlash: 'always',
  // Warm link targets on hover so ClientRouter navigations don't wait on a
  // server render after the click (dev SSR + WPGraphQL was a multi-second stall)
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react()]
});