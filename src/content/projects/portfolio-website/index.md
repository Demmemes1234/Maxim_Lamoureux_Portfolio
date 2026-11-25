---
# ─────────────────────────────────────────────────────────────────────
# SOFTWARE / VIBE-CODED PROJECT TEMPLATE
# Copy this whole folder, rename it (lowercase-with-dashes), then edit.
# ─────────────────────────────────────────────────────────────────────
title: "This Portfolio Website"
date: 2026-11-25
summary: "Static portfolio site built with Astro, where each project is a single Markdown file."
tags: [Software, AI-assisted / Vibe-coded, Personal]
featured: true
draft: true                      # set to false to publish

role: "Solo project"
teamSize: 1
duration: "1 week"
tools: [Astro, TypeScript, HTML/CSS, GitHub Actions, Claude Code]

highlights:
  - value: "1"
    label: "dependency"
  - value: "0 $"
    label: "hosting cost"

cover: ./cover.png
coverAlt: "Screenshot of the portfolio home page"

gallery:
  - src: ./mobile.png
    alt: "Portfolio home page on a phone screen"
    caption: "Mobile layout"

videos: []

links:
  github: "https://github.com/Demmemes1234/Maxim_Lamoureux_Portfolio"
  demo: "https://demmemes1234.github.io/Maxim_Lamoureux_Portfolio/"
  report: ""

# true = show the live demo inside the page (an iframe), with a link to open it full-screen.
# Some sites block being embedded; if the box stays blank, set this back to false.
embedDemo: true
---

## Overview

What does it do, and who is it for? *Example:* A personal portfolio for internship
applications. Recruiters should understand what I do within 30 seconds, while engineers
who click into a project can see the full design process.

## My role

Solo project. Be honest about AI assistance: say what you specified, reviewed, debugged
and changed yourself. Recruiters value candidates who use AI tools well.

## Process

- **Stack choice:** why Astro (static, fast, Markdown content) over a site builder.
- **Content model:** every project is one Markdown file with typed fields, so adding work
  takes minutes.
- **What went wrong:** e.g. images broke when the site moved to a sub-folder URL; fixed by…

## Results

Load time, Lighthouse score, number of projects published, interviews it helped land.
