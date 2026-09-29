// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
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