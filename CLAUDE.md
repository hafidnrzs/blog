# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server at localhost:4321
pnpm build      # Build for production (runs type-check + static build)
pnpm preview    # Preview production build locally
```

## Architecture

**Astro 5 static site** deployed at `https://hafidnrzs.com`. No client-side JavaScript unless explicitly added.

### Content

Blog posts live in `src/content/blog/` as `.md` or `.mdx` files. The content collection schema (`src/content.config.ts`) requires `title`, `description`, `pubDate`, and accepts optional `updatedDate` and `heroImage` (absolute URL to external image host `media.hafidnrzs.com`).

### Data flow for blog posts

`src/pages/blog/[...slug].astro` → fetches collection → renders with `src/layouts/BlogPost.astro` → uses `src/components/BaseHead.astro` for all `<head>` meta (OG, Twitter, canonical).

### Key conventions

- `heroImage` is an absolute external URL — `BaseHead.astro` handles both absolute URLs and relative paths for OG image tags.
- Icons use `astro-icon` with the `mdi` iconify pack (`<Icon name="mdi:*" />`).
- Responsive breakpoints: mobile default → tablet `48rem` → desktop `64rem`.
- CSS spacing for prose: heading/paragraph margins are controlled with adjacent sibling selectors (`:is(h1…h6) + p`) — mobile and tablet values differ.
