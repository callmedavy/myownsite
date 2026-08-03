import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://callmedavy.netlify.app',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    assets: 'assets'
  },
});
