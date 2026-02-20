// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import node from '@astrojs/node';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://hafidnrzs.com',
  integrations: [mdx(), sitemap(), icon()],

  adapter: node({
    mode: 'standalone',
  }),
});