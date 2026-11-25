// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Your live site address. Used for SEO, social previews and the sitemap.
  // If you add a custom domain later, change this to e.g. 'https://maximlamoureux.com'.
  site: 'https://demmemes1234.github.io',

  // Leave as '/' when the GitHub repo is named "Demmemes1234.github.io".
  // If the repo has any other name (e.g. "portfolio"), set this to '/portfolio'.
  base: '/',

  trailingSlash: 'ignore',
});
