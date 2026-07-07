# Architecture

Atlas Ops Dashboard uses a minimal App Router structure to keep the repository easy to reason about while still reflecting a production workflow.

## Layers

- `app/` contains the route, metadata, and global styles.
- `components/` holds reusable presentational building blocks.
- `lib/` stores mock dashboard data and feature constants.

## Design goals

- Keep the codebase small and readable.
- Separate content from layout.
- Use typed data models for the dashboard sections.
- Leave room for future API integration without rewriting the UI.

## Rendering model

The first version is fully server-rendered. That keeps the initial footprint small and avoids unnecessary client-side complexity for a static operations view.

## Mock data strategy

All metrics, activity items, and project summaries are synthetic. They are intentionally structured like enterprise telemetry while remaining safe for public publishing.
