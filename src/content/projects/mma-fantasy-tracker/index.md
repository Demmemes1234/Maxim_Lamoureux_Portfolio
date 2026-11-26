---
title: "MMA Fantasy Tracker"
date: 2026-11-21
summary: "Free-to-play UFC fantasy app where friends compete in private groups, betting fake credits on real fights at live Kalshi prices."
tags: [Software, Personal]
featured: true
draft: false

role: "Solo project"
teamSize: 1
duration: ""
tools: [Next.js, React, TypeScript, PostgreSQL, Drizzle ORM, Auth.js, Kalshi API, Vitest, Render, Neon]

highlights:
  - value: "30 s"
    label: "live odds refresh from Kalshi"
  - value: "14"
    label: "unit tests on the bet math"
  - value: "~3,900"
    label: "lines of TypeScript"
  - value: "$0"
    label: "hosting cost"

cover: ./cover.png
coverAlt: "Fight card page for UFC Fight Night: Prochazka vs Stirling, showing graded fight-winner and method-of-victory markets"

# Screenshots: the app running with real Kalshi data from the Nov 21, 2026 card, using demo accounts.
gallery:
  - src: ./my-groups.png
    alt: "My groups page with a form to create a group and the Saturday Night Fights group in its lobby"
    caption: "Home: create a group or open one you're in"
  - src: ./group-lobby-phone.png
    alt: "Group lobby on a phone, listing three members, a pending invite and the leader's Start group button"
    caption: "Group lobby on a phone: the leader invites friends, then starts the group"
  - src: ./leaderboard-phone.png
    alt: "Active group leaderboard on a phone with points, credits left and win rate for each member"
    caption: "Once started: the group leaderboard"
  - src: ./events.png
    alt: "UFC events page listing the UFC Fight Night: Prochazka vs Stirling card as locked"
    caption: "Cards are built automatically from Kalshi's market data"
  - src: ./card-phone.png
    alt: "Fight card on a phone showing the main event's fight-winner market with Navajo Stirling marked as the winner"
    caption: "After the card: every market is graded automatically from Kalshi's results"
videos: []

links:
  github: ""          # repo is private; add the link here if you make it public
  demo: "https://mma-fantasy-tracker.onrender.com"
  report: ""
  other: []

embedDemo: false
---

## Overview

A web app for watching UFC cards with friends. Instead of betting real money, everyone in a
private **Fantasy Group** gets 1,000 credits per card and places fake bets at the real market
prices from [Kalshi](https://kalshi.com). Winning bets earn points, and the group leaderboard
shows who actually reads fights best over a season.

**No real money; for entertainment only. Not affiliated with Kalshi or the UFC.**

> The live demo runs on a free server that sleeps when unused: the first load can take about a minute.

## My role

Solo project: design, back end, front end, database, testing and deployment.

## How it works

- **Live odds:** a Kalshi client pulls every UFC market Kalshi lists (fight winner, method of
  victory, round, goes the distance…) with a 30-second cache, request de-duplication, retries,
  and a fallback to the last good data if the API errors.
- **Fight cards:** Kalshi lists each bout separately, so the app groups bouts into cards by date
  and event name, and names generic events after the main event
  (e.g. *"UFC Fight Night: Prochazka vs Stirling"*).
- **Bet math that mirrors a real exchange:** contracts = stake ÷ price; a parlay's price is the
  product of its legs. 100 credits at 40¢ pays 250 points.
- **Groups:** a leader creates a group, invites friends, then starts it. Credits and points are
  tracked separately per group, so the same pick in two groups is two separate bets.
  Leaders can rename, transfer leadership, reset a season (standings archived) or end the group.
- **Background jobs** every 30 s: sync new cards, grant credits, lock betting at the first
  bout, and settle bets when Kalshi grades the markets.

## Design decisions

- **No bet at a price you didn't see:** the price is re-read from Kalshi at confirmation; if it
  moved, the bet is refused and the slip shows the new price to confirm.
- **No overspending:** the balance check and the credit debit happen in one atomic database
  statement, so two quick taps can't spend the same credits twice.
- **Contradictory parlays are blocked**, e.g. *Fighter A to win* + *Fighter B by KO*, or a
  finish + "goes the distance".
- **Hidden picks:** you only see friends' bets once that card has locked, so nobody can copy.
- **Edge cases:** cancelled markets and no-contests refund the stake; in a parlay, a voided leg
  is dropped and the price recalculated from the remaining legs.

## Testing

- **Unit tests** (Vitest) on the pure bet math: payouts, parlay grading, contradiction checks,
  and Kalshi data parsing.
- **End-to-end acceptance script** that runs against a real PostgreSQL database with Kalshi
  swapped for an in-memory copy of its API. It checks friend requests, group lifecycle,
  per-group credit isolation, payouts, hidden picks, resets and leadership transfer.

## Results

Deployed on Render with a Neon PostgreSQL database, both on free tiers, and auto-deploys on
every push to `main`.

*Screenshots show the app running with real Kalshi data from UFC Fight Night: Prochazka vs
Stirling (Nov 21, 2026), using demo accounts.*
