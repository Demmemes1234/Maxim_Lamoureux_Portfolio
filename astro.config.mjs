// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Your live site address. Used for SEO, social previews and the sitemap.
  // If you add a custom domain later, change this to e.g. 'https://maximlamoureux.com'.
  site: 'https://demmemes1234.github.io',

  // The part of the address after the domain. On GitHub Pages this is the repo name:
  // https://demmemes1234.github.io/Maxim_Lamoureux_Portfolio/
  // If you add a custom domain later (or rename the repo to "Demmemes1234.github.io"),
  // change this to '/'.
  base: '/Maxim_Lamoureux_Portfolio',

  trailingSlash: 'ignore',
});
