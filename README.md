# Maxim Lamoureux · Portfolio

Personal portfolio built with [Astro](https://astro.build), hosted free on GitHub Pages.

**Live site:** https://demmemes1234.github.io/Maxim_Lamoureux_Portfolio/

Every page is generated from plain text files in `src/content/`. You never need to touch
HTML or code to add a project, job, award or skill.

---

## Contents

1. [Run the site on your computer](#1-run-the-site-on-your-computer)
2. [Add a project in 3 steps](#2-add-a-project-in-3-steps)
3. [Photos and videos](#3-photos-and-videos)
4. [Add experience, an achievement or a skill](#4-add-experience-an-achievement-or-a-skill)
5. [Change your resume, photo, links or accent colour](#5-change-your-resume-photo-links-or-accent-colour)
6. [Publish your changes](#6-publish-your-changes)
7. [How deployment works and how to fix a failed deploy](#7-how-deployment-works-and-how-to-fix-a-failed-deploy)
8. [Add a custom domain (optional)](#8-add-a-custom-domain-optional)
9. [Where things are](#9-where-things-are)

---

## 1. Run the site on your computer

**One-time setup** (Windows):

1. Install **Node.js LTS** from https://nodejs.org (click Next through the installer).
2. Install **Git** from https://git-scm.com/download/win (click Next through the installer).
3. Install **VS Code** from https://code.visualstudio.com (to edit files).
4. Close and reopen Terminal, then check both work: `node -v` and `git --version` should print versions.
5. Download the project:
   ```bash
   cd $HOME\Documents
   git clone https://github.com/Demmemes1234/Maxim_Lamoureux_Portfolio.git
   cd Maxim_Lamoureux_Portfolio
   npm install
   ```

**Every time you want to work on the site:**

```bash
cd $HOME\Documents\Maxim_Lamoureux_Portfolio
git pull          # get any changes made on GitHub (e.g. from the web editor)
npm run dev       # start the preview
```

Open **http://localhost:4321/Maxim_Lamoureux_Portfolio/**. The page refreshes each time you
save a file. Stop the preview with **Ctrl + C**.

> Entries with `draft: true` show in this preview with a yellow **DRAFT** label, but they are
> **not** published on the live site. Use this to work on a project before it's ready.

| Command | What it does |
| --- | --- |
| `npm run dev` | Live preview while you edit |
| `npm run build` | Builds the real site into `dist/` (same as the live deploy). Run this to check for errors before pushing. |
| `npm run preview` | Serves the `dist/` build so you can click around it |

---

## 2. Add a project in 3 steps

1. **Copy a template folder** in `src/content/projects/` and rename the copy:
   - `drone-power-distribution-board/` → hardware example (all features)
   - `portfolio-website/` → coded / vibe-coded example (live demo embed)
   - `_blank-template/` → empty version

   The folder name becomes the web address, so use lowercase-with-dashes:
   `line-follower-robot` → `.../projects/line-follower-robot/`

2. **Put your photos, clips and PDFs in that folder** (see [Photos and videos](#3-photos-and-videos)).

3. **Edit `index.md`** in that folder: fill in the fields at the top between the `---` lines,
   write the story below them, and set `draft: false` when it's ready. Then
   [publish](#6-publish-your-changes).

That's it: the project card, the filter buttons, the detail page and the sitemap all update automatically.

### The fields

Only `title`, `date` and `summary` are required. Leave anything else empty (`""`, `[]`, or nothing) and that part of the page simply doesn't appear.

```yaml
title: "Drone Power Distribution Board"
date: 2026-03-01               # projects are sorted newest first
summary: "One sentence shown on the project card (max 200 characters)."
tags: [Hardware, Club (MAD)]   # filter buttons are built from these
featured: true                 # show on the home page (best 3–4)
draft: false                   # true = hidden on the live site

role: "Power team lead"
teamSize: 4                    # 1 shows as "Solo"
duration: "Sept 2025 – Mar 2026"
tools: [Altium Designer, Python]

highlights:                    # big numbers at the top of the page
  - value: "30 A"
    label: "continuous current"

cover: ./cover.jpg
coverAlt: "Assembled board on the test bench"     # required when cover is set

gallery:
  - src: ./pcb-front.jpg
    alt: "Front of the assembled PCB"             # required
    caption: "Rev B, assembled"                   # optional

videos:
  - youtube: "dQw4w9WgXcQ"     # the ID, or the whole YouTube link
    title: "Flight test"
  - vimeo: "123456789"
    title: "Demo"
  - file: ./bench-test.mp4     # short clip in this folder
    poster: ./bench-test.jpg   # image shown before it plays
    title: "Bench test"

links:
  github: "https://github.com/..."
  demo: "https://..."
  report: ./report.pdf         # PDF in this folder, or a https:// link
  other:
    - label: "Datasheet"
      url: "https://..."

embedDemo: false               # true = show the live demo inside the page
```

**Suggested tags:** `Hardware`, `Embedded`, `Software`, `AI-assisted / Vibe-coded`,
`Club (MAD)`, `Course`, `Personal`. You can invent new ones; spell them the same way every time.

**Skills ↔ projects:** if a project's `tools` contains a skill exactly as written on your Skills
page (e.g. `Altium Designer`), the Skills page links to that project automatically.

**Writing the story:** below the second `---`, use the headings from the template
(`## Overview`, `## My role`, `## Process`, `## Results`). It's normal
[Markdown](https://www.markdownguide.org/cheat-sheet/): `**bold**`, `- bullet`, `[link](https://...)`.

---

## 3. Photos and videos

### Photos

Drop full-size phone photos straight in. The site automatically makes small, fast versions
(AVIF/WebP, several sizes) and loads them lazily. Keep each original under ~10 MB so the
repo stays small. JPG, PNG and WebP work. iPhone **HEIC does not**: export as JPG first
(on iPhone: Settings → Camera → Formats → *Most Compatible*).

**Alt text is required** for every photo. The build stops if one is missing. Describe what the
photo shows for someone who can't see it: *"Oscilloscope trace of the 12 V rail during a load step"*.

### Videos: what goes where

| Video | Where | Why |
| --- | --- | --- |
| Short clip (≤ 15 s, no sound needed) | `.mp4` in the project folder | Autoplays, muted, looping, like a moving photo |
| Anything longer, or with sound | YouTube as **Unlisted** | Free hosting and streaming; keeps the repo small |

**Limits for local clips:** under **5 MB** each (GitHub rejects files over 100 MB, and big
clips make the page slow on phones). Aim for 720p, ≤ 15 s, no audio.

**Compress a clip** with [ffmpeg](https://ffmpeg.org) (Windows: `winget install ffmpeg`, then reopen Terminal):

```bash
ffmpeg -i input.mov -t 15 -vf "scale=-2:720" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart clip.mp4
```

Make the poster image (first frame) for the same clip:

```bash
ffmpeg -i clip.mp4 -frames:v 1 clip.jpg
```

No command line? Use [HandBrake](https://handbrake.fr) (free): preset *Fast 720p30*, tick
*Web Optimized*, remove the audio track.

**YouTube:** upload → Visibility: **Unlisted** → copy the link and paste it as `youtube: "..."`.

---

## 4. Add experience, an achievement or a skill

### Experience (jobs, internships, club roles, education)

Copy `src/content/experience/_template.md`, rename it (e.g. `hydro-quebec-2027.md`), fill it in,
set `draft: false`.

```yaml
role: "Electrical Engineering Intern"
organization: "Company"
type: Internship     # Job, Internship, Club, Leadership, Research, Volunteer, Education, Other
start: 2027-05-01
end: 2027-08-31      # leave empty while it's ongoing → shows "Present"
location: "Montréal, QC"
url: ""
summary: "One line."
draft: false
---
- Bullet points about what you did, with numbers.
```

Entries with `type: Education` go in their own "Education" section. Ongoing roles also appear on the home page under your name.

### Achievement (award, competition, scholarship, certification)

Copy `src/content/achievements/_template.md`, rename it, fill it in, set `draft: false`.
`category` is one of `Award`, `Competition`, `Scholarship`, `Certification`, `Other`.
Optional `image: ./photo.jpg` (put the photo next to the file) needs an `imageAlt`.

> Until you add your first achievement, the build prints a harmless warning:
> *"The collection achievements does not exist or is empty"*. You can ignore it.

### Skills

Each file in `src/content/skills/` is one group (Hardware, Programming, Tools, Languages).
Add a line to a list:

```yaml
items:
  - Python
  - name: Altium Designer          # optional detail under the skill
    detail: "4-layer boards, 2 fabricated"
```

New group: copy a file (e.g. `5-embedded.yaml`), change `group` and `order`.

> **Files and folders starting with `_` are ignored.** That's how the templates stay off the site.

---

## 5. Change your resume, photo, links or accent colour

| To change | Do this |
| --- | --- |
| **Resume** | Replace `public/resume.pdf` with your new PDF. **Keep the name `resume.pdf`.** |
| **Your photo** | Replace `public/profile.jpg` (square, ~800×800 px). Keep the name. |
| **LinkedIn preview image** | Replace `public/og-image.png` (1200×630 px). |
| **Name, pitch, email, links, "looking for" line** | Edit `src/site.config.ts` |
| **Accent colour** | In `src/site.config.ts`, change `accent: '#E9735F'` to any colour, e.g. `'#2563EB'`. Text and button shades are calculated from it. |
| **Browser tab icon** | `public/favicon.svg` (change `fill="#E9735F"` to match) |

After replacing a file, publish (next section). If you still see the old resume or photo, your browser has
the old copy saved: press **Ctrl + F5**.

---

## 6. Publish your changes

**From your computer (VS Code):**

1. Open the folder in VS Code (*File → Open Folder → Maxim_Lamoureux_Portfolio*).
2. Make your changes and save. Optionally check them with `npm run dev`.
3. Click the **Source Control** icon on the left (the branching icon).
4. Type a short message (e.g. *"Add line follower project"*), click **Commit**, then **Sync Changes**.

Or in Terminal:

```bash
git add .
git commit -m "Add line follower project"
git push
```

**From the browser (no install):** on the GitHub repo page, open a file → pencil icon → edit →
*Commit changes*. To upload photos: open the project folder → *Add file → Upload files*.

Either way, the live site updates **about 1–2 minutes** after the push.

---

## 7. How deployment works and how to fix a failed deploy

```
you push to main ──► GitHub Actions runs .github/workflows/deploy.yml
                       1. installs Node + Astro
                       2. npm run build  (checks every content file, optimises images)
                       3. publishes dist/ to GitHub Pages
                     ──► live at demmemes1234.github.io/Maxim_Lamoureux_Portfolio/
```

Check status: repo → **Actions** tab. Green ✓ = live. Red ✗ = failed. **The previous version stays online**, so a failed deploy never breaks the live site.

### Fixing a red ✗

1. Click the failed run → click the **build** job → open the red step (usually *Build the site*).
2. Look for the line that names a file. Common errors:

| Error message says… | Fix |
| --- | --- |
| `gallery.0.alt: Every image needs alt text` | Add `alt: "..."` to that photo in the named `index.md` |
| `coverAlt: You set a cover image…` | Add `coverAlt: "..."` |
| `Could not find requested image ./photo.jpg. Does it exist?` | File name typo, or the file isn't in that folder. **Names are case-sensitive**: `Photo.JPG` ≠ `photo.jpg` |
| `Can't find "./clip.mp4"` | Same as above, for videos or PDFs |
| an error mentioning `date` | Use the format `YYYY-MM-DD`, e.g. `2026-03-01` |
| `links.demo: Invalid URL` | Links must start with `https://`, or leave them `""` |
| `YAMLException` / `bad indentation` | A spacing problem in the `---` block. Use spaces, not tabs, and match the template's indentation. Put text containing `:` in quotes. |
| `summary: Keep the summary to one sentence` | Shorten it to 200 characters or less |

3. Fix the file, commit, push. A new run starts automatically.

**Tip:** run `npm run build` on your computer before pushing. It shows exactly the same errors.

**Other problems:**
- **Site shows a 404 / never appeared:** repo → *Settings → Pages* → *Source* must be **GitHub Actions**.
- **Page loads but has no styling / broken images:** the `base` in `astro.config.mjs` must match the repo name exactly (`/Maxim_Lamoureux_Portfolio`). If you rename the repo, update it.
- **Deploy step fails with "permission" or "environment" error:** *Settings → Environments → github-pages* → make sure `main` is allowed to deploy.
- **Re-run without changes:** *Actions → Deploy to GitHub Pages → Run workflow*.

### Keeping it working long-term

The site has a single dependency (Astro), pinned to an exact version in `package.json`, so it
builds the same way next year. You don't need to update anything. If you ever want to
upgrade, run `npx @astrojs/upgrade`, then `npm run build` to check, then push.

---

## 8. Add a custom domain (optional)

1. Buy a domain (~$15/year), e.g. `maximlamoureux.com` from Cloudflare, Porkbun or Namecheap.
2. GitHub repo → *Settings → Pages → Custom domain* → type it → *Save*.
3. At your domain provider, add DNS records (GitHub shows the exact values):
   - for `maximlamoureux.com`: four `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - for `www`: a `CNAME` record → `demmemes1234.github.io`
4. In `astro.config.mjs` change `site` to `'https://maximlamoureux.com'` and `base` to `'/'`. Push.
5. Back in *Settings → Pages*, tick **Enforce HTTPS** once it's available (can take up to a day).

---

## 9. Where things are

```
├─ .github/workflows/deploy.yml   automatic deploy to GitHub Pages
├─ astro.config.mjs               site address + base path
├─ public/                        files served as-is: resume.pdf, profile.jpg, og-image.png, favicon
└─ src/
   ├─ site.config.ts              ★ name, pitch, email, links, accent colour
   ├─ content/                    ★ ALL YOUR CONTENT
   │  ├─ projects/<name>/index.md   one folder per project (+ its images, clips, PDFs)
   │  ├─ experience/*.md            one file per role
   │  ├─ achievements/*.md          one file per award
   │  └─ skills/*.yaml              one file per skill group
   ├─ content.config.ts           the fields each content type allows (checks your files)
   ├─ pages/                      one file per page (home, projects, experience…)
   ├─ components/                 reusable pieces (project card, gallery, videos)
   ├─ layouts/BaseLayout.astro    header, footer, SEO tags
   ├─ lib/utils.ts                helpers (sorting, drafts, dates)
   └─ styles/global.css           all styling (colours, fonts, spacing)
```

You'll normally only touch the ★ items and `public/`.
