# CLAUDE.md/pl

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (vite --host)
npm run build    # tsc -b && vite build
npm run lint     # eslint .
npm run preview  # preview production build
```

Pre-commit hooks run ESLint + Prettier automatically via Husky/lint-staged.

## Architecture

**Stack:** React 19, TypeScript, Vite, React Router 7, TanStack Query 5, Tailwind CSS 4, shadcn/ui

**Feature-first layout:** `src/features/movies/` contains co-located components and hooks. Global utilities live in `src/services/`, `src/hooks/`, `src/lib/`, `src/layout/`.

**Routing:** No route definitions file. `App.tsx` uses a single `BrowserRouter` and conditionally renders views by reading URL search params (e.g. `?search=...`).

**Data fetching:** All server state is managed by TanStack Query. Pattern:

- `useQuery` for reads (search, lists)
- `useInfiniteQuery` for paginated data (watched movies)
- `useMutation` + `queryClient.invalidateQueries` for writes (add/remove from lists)
- Search queries use a `useDebouncedValue` hook before triggering

**API layer:** `src/services/tmdb/`

- `client.ts` — generic bearer-token fetch wrapper
- `movies.ts` — `moviesApi` object with all TMDB operations
- `endpoints.ts` — URL builders
- `types.ts` — TMDB response interfaces

**Path alias:** `@/*` maps to `src/*` (configured in both `tsconfig.json` and `vite.config.ts`).

## Environment Variables

All required, loaded from `.env`:

| Variable                    | Purpose                        |
| --------------------------- | ------------------------------ |
| `VITE_TMDB_API_KEY`         | TMDB bearer token              |
| `VITE_TMDB_ACCOUNT_ID`      | TMDB account ID                |
| `VITE_TMDB_WATCHED_LIST_ID` | ID of the watched movies list  |
| `VITE_TMDB_STASH_LIST_ID`   | ID of the stash list           |
| `VITE_TMDB_BASE_URL`        | `https://api.themoviedb.org/3` |

## Conventions

- ESLint disallows `console.log`; use `console.warn/error/info` instead
- Strict TypeScript — no unused variables or parameters
- Mutations always invalidate related queries to keep cache consistent
- Toast notifications via Sonner (wired in `Navbar`)
- Theme (dark/light) via next-themes
