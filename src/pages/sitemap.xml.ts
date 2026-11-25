// Sitemap for search engines, generated at build time (no plugin needed).
import type { APIRoute } from 'astro';
import { getProjects, url } from '../lib/utils';

export const GET: APIRoute = async ({ site }) => {
  const pages = ['/', '/projects/', '/experience/', '/skills/', '/achievements/', '/resume/', '/contact/'];
  const projects = (await getProjects()).filter((p) => !p.data.draft).map((p) => `/projects/${p.id}/`);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...pages, ...projects].map((p) => `  <url><loc>${new URL(url(p), site)}</loc></url>`).join('\n')}
</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
