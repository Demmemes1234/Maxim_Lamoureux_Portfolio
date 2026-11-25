/**
 * CONTENT MODEL
 * Defines which fields each Markdown file may have, and checks them on every build.
 * A missing or misspelled required field (e.g. alt text) stops the build with a
 * message telling you which file and which field to fix.
 *
 * You normally never need to edit this file. To add content, add files in src/content/.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Treats an empty value ("" or nothing after the colon) as "not set". */
const blank = (v: unknown) => (v === '' || v === null ? undefined : v);
const optionalUrl = z.preprocess(blank, z.url().optional());
const optionalText = z.preprocess(blank, z.string().optional());
const optionalDate = z.preprocess(blank, z.coerce.date().optional());
const list = <T extends z.ZodType>(item: T) => z.preprocess((v) => blank(v) ?? [], z.array(item));

const altText = z
  .string({ error: 'Every image needs alt text: a short description of what it shows.' })
  .min(3, 'Alt text is too short. Describe what the image shows.');

/** Local video files or PDFs are written as paths next to the Markdown file, e.g. ./clip.mp4 */
const localFile = (exts: string[]) =>
  z
    .string()
    .refine((p) => p.startsWith('./') && exts.some((e) => p.toLowerCase().endsWith(e)), {
      message: `Must be a file next to index.md, starting with ./ and ending in ${exts.join(' or ')}`,
    });

// ─── PROJECTS ──────────────────────────────────────────────────────────────
// One folder per project: src/content/projects/<project-name>/index.md (+ images, clips)
const projects = defineCollection({
  loader: glob({ pattern: '[!_]*/index.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        date: z.coerce.date(),
        summary: z.string().max(200, 'Keep the summary to one sentence (200 characters max).'),
        tags: list(z.string()),
        featured: z.boolean().default(false),
        /** Hidden on the live site, visible when running locally. */
        draft: z.boolean().default(false),

        role: optionalText,
        teamSize: z.preprocess(blank, z.number().int().positive().optional()),
        /** e.g. "Sept 2025 – Mar 2026" or "4 weeks". */
        duration: optionalText,
        tools: list(z.string()),

        /** Key numbers shown as big stats at the top of the page. */
        highlights: list(z.object({ value: z.string(), label: z.string() })),

        cover: z.preprocess(blank, image().optional()),
        coverAlt: optionalText,

        gallery: list(
          z.object({
            src: image(),
            alt: altText,
            caption: optionalText,
          }),
        ),

        videos: list(
          z.union([
            z.object({ youtube: z.string().min(6), title: z.string() }),
            z.object({ vimeo: z.string().min(6), title: z.string() }),
            z.object({
              file: localFile(['.mp4', '.webm']),
              poster: image(),
              title: z.string(),
              caption: optionalText,
            }),
          ]),
        ),

        links: z
          .preprocess(
            (v) => blank(v) ?? {},
            z.object({
              github: optionalUrl,
              demo: optionalUrl,
              /** A PDF next to index.md (./report.pdf) or a full URL. */
              report: z.preprocess(blank, z.union([localFile(['.pdf']), z.url()]).optional()),
              /** Any other links: [{ label: "Datasheet", url: "https://..." }] */
              other: list(z.object({ label: z.string(), url: z.url() })),
            }),
          )
          .default({ other: [] }),

        /** Show the live demo inside the page (only works if the site allows embedding). */
        embedDemo: z.boolean().default(false),
      })
      .refine((p) => !p.cover || !!p.coverAlt, {
        message: 'You set a cover image, so coverAlt (its alt text) is required.',
        path: ['coverAlt'],
      }),
});

// ─── EXPERIENCE ────────────────────────────────────────────────────────────
// One file per job / role: src/content/experience/<name>.md
const experience = defineCollection({
  loader: glob({ pattern: '[!_]*.md', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    organization: z.string(),
    type: z.enum(['Job', 'Internship', 'Club', 'Leadership', 'Research', 'Volunteer', 'Education', 'Other']),
    start: z.coerce.date(),
    /** Leave empty if you're still doing it. Shows "Present". */
    end: optionalDate,
    location: optionalText,
    url: optionalUrl,
    summary: optionalText,
    draft: z.boolean().default(false),
  }),
});

// ─── ACHIEVEMENTS ──────────────────────────────────────────────────────────
// One file per award / competition / scholarship / certification.
const achievements = defineCollection({
  loader: glob({ pattern: '[!_]*.md', base: './src/content/achievements' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        category: z.enum(['Award', 'Competition', 'Scholarship', 'Certification', 'Other']),
        issuer: z.string(),
        date: z.coerce.date(),
        summary: optionalText,
        url: optionalUrl,
        image: z.preprocess(blank, image().optional()),
        imageAlt: optionalText,
        draft: z.boolean().default(false),
      })
      .refine((a) => !a.image || !!a.imageAlt, {
        message: 'You set an image, so imageAlt is required.',
        path: ['imageAlt'],
      }),
});

// ─── SKILLS ────────────────────────────────────────────────────────────────
// One YAML file per group: src/content/skills/<group>.yaml
const skills = defineCollection({
  loader: glob({ pattern: '[!_]*.{yaml,yml}', base: './src/content/skills' }),
  schema: z.object({
    group: z.string(),
    /** Lower numbers show first. */
    order: z.number().default(99),
    items: list(
      z.union([
        z.string(),
        /** Optional detail, e.g. { name: "Altium Designer", detail: "4-layer PCBs, 2 boards fabricated" } */
        z.object({ name: z.string(), detail: optionalText }),
      ]),
    ),
  }),
});

export const collections = { projects, experience, achievements, skills };
