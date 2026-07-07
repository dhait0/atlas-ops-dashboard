# Project

Atlas Ops Dashboard

## Overview

Atlas Ops Dashboard is a polished internal-style operations interface built as the first, simplest project in the portfolio series. It demonstrates UI quality, clean structure, and realistic enterprise reporting without exposing private business data.

## Features

- Responsive dashboard shell with a premium dark visual style
- KPI cards for operations, SLA, escalations, and at-risk accounts
- Mock weekly trend panel
- Service health snapshot
- Recent activity stream
- Priority project tracking
- Strict TypeScript-ready structure

## Architecture

The app uses a lightweight Next.js App Router structure:

- `app/` for routing, layout, and global styles
- `components/` for reusable UI blocks
- `lib/` for typed mock data
- `docs/` for architecture and implementation notes

## Tech Stack

- Next.js
- React
- TypeScript
- ESLint
- Prettier
- Husky

## Installation

```bash
npm install
```

## Running locally

```bash
npm run dev
```

Open `http://localhost:3000`.

To generate the included preview images:

```bash
npm run screenshots
```

## Folder structure

```text
app/
components/
docs/
lib/
scripts/
public/
public/screenshots/
README.md
AGENTS.md
package.json
```

## Screenshots

- [Desktop preview](public/screenshots/atlas-ops-dashboard-home-desktop.png)
- [Mobile preview](public/screenshots/atlas-ops-dashboard-home-mobile.png)

## Why this project exists

This project starts the portfolio series with a simple but credible demo that can later be expanded into more complex enterprise-style applications.

## License

MIT
