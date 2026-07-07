# Project

Atlas Ops Dashboard / Tablero Atlas Ops

## Overview

Atlas Ops Dashboard is a polished internal-style operations interface built as the first, simplest project in the portfolio series.

Atlas Ops Dashboard es una interfaz operativa con estilo interno, creada como el primer proyecto simple de la serie de portafolio.

It demonstrates UI quality, clean structure, and realistic enterprise reporting without exposing private business data.

Demuestra calidad visual, estructura limpia y reportes empresariales realistas sin exponer información privada.

## Features

- Responsive dashboard shell with a premium dark visual style
- Responsive dashboard shell with a premium dark visual style / Estructura responsiva con estilo oscuro premium
- KPI cards for operations, SLA, escalations, and at-risk accounts
- Mock weekly trend panel / Panel de tendencia semanal
- Service health snapshot / Resumen de estado del servicio
- Recent activity stream / Flujo de actividad reciente
- Priority project tracking / Seguimiento de proyectos prioritarios
- Strict TypeScript-ready structure / Estructura preparada para TypeScript estricto

## Architecture

The app uses a lightweight Next.js App Router structure.

La app usa una estructura ligera con Next.js App Router.

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

Abre `http://localhost:3000`.

To generate the included preview images:

Para generar las imágenes incluidas:

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

Este proyecto inicia la serie de portafolio con un demo simple pero creíble que luego puede crecer hacia aplicaciones empresariales más complejas.

## License

MIT
