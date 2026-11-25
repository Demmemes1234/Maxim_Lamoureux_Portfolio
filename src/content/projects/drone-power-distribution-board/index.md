---
# ─────────────────────────────────────────────────────────────────────
# HARDWARE PROJECT TEMPLATE
# Copy this whole folder, rename it (lowercase-with-dashes), then edit.
# Lines starting with # are comments: they're ignored, delete them anytime.
# Optional fields can be left empty or deleted.
# ─────────────────────────────────────────────────────────────────────
title: "Drone Power Distribution Board"
date: 2026-03-01                 # used for sorting (newest first)
summary: "Custom power distribution board for McGill Aerial Design's competition aircraft."
tags: [Hardware, Club (MAD)]     # any tags; the Projects page filters are built from these
featured: true                   # true = shown on the home page (pick your best 3–4)
draft: true                      # true = hidden on the live site. Set to false to publish.

role: "Power team lead"
teamSize: 4                      # number of people, or leave empty
duration: "Sept 2025 – Mar 2026"
tools: [Altium Designer, LTspice, Oscilloscope, Electronic load]

# Big numbers shown at the top of the page. Recruiters love these.
highlights:
  - value: "[XX] A"
    label: "continuous current"
  - value: "[XX] g"
    label: "lighter than previous harness"
  - value: "[X]"
    label: "board revisions"

cover: ./cover.jpg
coverAlt: "Assembled power distribution board on a test bench"

gallery:
  - src: ./pcb-front.jpg
    alt: "Front of the assembled PCB showing the main power traces"
    caption: "Rev B, assembled and ready for bench testing"
  - src: ./pcb-back.jpg
    alt: "Back of the PCB with the current-sense resistors"
    caption: "Current-sense section"
  - src: ./schematic.png
    alt: "Top-level schematic of the power distribution board"
    caption: "Top-level schematic"

videos:
  # Long videos: upload to YouTube as "Unlisted" and paste the ID (the part after v=)
  # - youtube: "dQw4w9WgXcQ"
  #   title: "Flight test"
  # Short clips (under ~15 s, under ~5 MB): put the .mp4 in this folder
  - file: ./bench-test.mp4
    poster: ./bench-test.jpg
    title: "Bench test under load"
    caption: "Load step from 0 to [XX] A"

links:
  github: ""                     # e.g. https://github.com/Demmemes1234/pdb
  demo: ""
  report: ./report.pdf           # a PDF in this folder, or a full https:// link
  other: []                      # extra links, e.g.:
  # other:
  #   - label: "Datasheet"
  #     url: "https://example.com/datasheet.pdf"
---

## Overview

What problem did this solve? One short paragraph. *Example:* The aircraft's power wiring
was a hand-built harness that was heavy, hard to inspect, and failed twice during testing.
I led the design of a single PCB that distributes battery power to the motors, servos and
avionics, with current sensing for telemetry.

## My role

What **you** did, as opposed to the team. *Example:* Led a team of 4; owned the schematic,
the layout of the high-current section, and the test plan.

## Process

The interesting part for engineers. Talk about decisions and trade-offs:

- **Requirements:** voltage, current, weight and size budget.
- **Key design decisions:** e.g. copper weight, trace width calculations, connector choice, and why.
- **Iterations:** what changed between Rev A and Rev B.
- **What failed and why:** e.g. a connector overheated at 30 A, so we switched to…

## Results

Use numbers wherever you can: current rating, temperature rise, weight saved, flight hours,
competition placement.

## What I'd do differently

Optional, but shows maturity: one or two lessons learned.
