import { getCollection, type CollectionEntry } from 'astro:content';

/** Prefix an internal path with the site's base folder (needed on GitHub Pages). */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  return `${base}/${path.replace(/^\//, '')}`;
}

/** Drafts are shown while running locally (npm run dev) and hidden on the live site. */
const visible = ({ data }: { data: { draft?: boolean } }) => import.meta.env.DEV || !data.draft;

export async function getProjects() {
  const all = await getCollection('projects', visible);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getFeaturedProjects(max = 4) {
  const all = await getProjects();
  const featured = all.filter((p) => p.data.featured);
  return (featured.length ? featured : all).slice(0, max);
}

export async function getExperience() {
  const all = await getCollection('experience', visible);
  // Current roles first, then most recent start date.
  return all.sort((a, b) => {
    const ae = a.data.end?.valueOf() ?? Infinity;
    const be = b.data.end?.valueOf() ?? Infinity;
    return be - ae || b.data.start.valueOf() - a.data.start.valueOf();
  });
}

export async function getAchievements() {
  const all = await getCollection('achievements', visible);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getSkills() {
  const all = await getCollection('skills');
  return all.sort((a, b) => a.data.order - b.data.order || a.data.group.localeCompare(b.data.group));
}

const monthYear = new Intl.DateTimeFormat('en-CA', { month: 'short', year: 'numeric', timeZone: 'UTC' });
const yearOnly = new Intl.DateTimeFormat('en-CA', { year: 'numeric', timeZone: 'UTC' });
export const formatMonth = (d: Date) => monthYear.format(d);
export const formatYear = (d: Date) => yearOnly.format(d);
export const formatRange = (start: Date, end?: Date) =>
  `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`;

/** Stable, URL-safe version of a tag, e.g. "Club (MAD)" → "club-mad". */
export const slugify = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Local videos and PDFs inside project folders, bundled at build time.
const projectFiles = import.meta.glob<string>('/src/content/projects/**/*.{mp4,webm,pdf,MP4,WEBM,PDF}', {
  query: '?url',
  import: 'default',
  eager: true,
});

/** Turns "./clip.mp4" in a project's index.md into a real URL, or explains what's wrong. */
export function projectFile(entry: CollectionEntry<'projects'>, relative: string): string {
  const folder = entry.filePath!.replace(/\/[^/]+$/, '');
  const key = `/${folder}/${relative.replace(/^\.\//, '')}`;
  const found = projectFiles[key];
  if (!found) {
    throw new Error(
      `[${entry.id}] Can't find "${relative}". Put the file in ${folder}/ and check the spelling (it's case-sensitive).`,
    );
  }
  return found;
}

/** Accepts a YouTube ID or any YouTube link and returns the ID. */
export function youtubeId(input: string): string {
  const m = input.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : input.trim();
}
export function vimeoId(input: string): string {
  const m = input.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : input.trim();
}

export type Project = CollectionEntry<'projects'>;
