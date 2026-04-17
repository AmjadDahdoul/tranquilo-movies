# Tranquilo — Full App Redesign

**Date:** 2026-04-17  
**Branch:** design/new-design-through-claude  
**Scope:** Full visual overhaul — Midnight Blue theme, new typography, icon refresh, improved MovieCardDetails modal, mobile-first layout.

---

## Design Decisions

| Decision       | Choice                               | Rationale                                                                 |
| -------------- | ------------------------------------ | ------------------------------------------------------------------------- |
| Aesthetic      | Midnight Blue                        | Deep navy/slate, blue accent, precise borders — technical and focused     |
| Typography     | IBM Plex Sans + IBM Plex Mono        | Clean, readable, technical; distinctive without being loud                |
| Section layout | Single scroll (keep collapse/expand) | All sections visible, current behavior preserved                          |
| Movie detail   | Centered modal (redesigned)          | Works on all screen sizes, closes on backdrop click                       |
| Light mode     | Removed — dark only                  | User's primary use is Midnight Blue dark; light mode adds double CSS work |

---

## Color System

Replace all existing CSS variables in `src/index.css`:

```css
:root {
  --background: #0d1117;
  --foreground: #e6edf3;
  --card: #161b22;
  --card-foreground: #e6edf3;
  --popover: #161b22;
  --popover-foreground: #e6edf3;
  --primary: #58a6ff;
  --primary-foreground: #0d1117;
  --secondary: #21262d;
  --secondary-foreground: #e6edf3;
  --muted: #21262d;
  --muted-foreground: #8b949e;
  --accent: #21262d;
  --accent-foreground: #e6edf3;
  --destructive: #f85149;
  --border: #30363d;
  --input: #21262d;
  --ring: rgba(88, 166, 255, 0.4);
  --radius: 0.5rem;
  /* semantic extras */
  --success: #3fb950;
  --success-bg: rgba(63, 185, 80, 0.1);
  --danger-bg: rgba(248, 81, 73, 0.1);
  --stash: #d29922;
  --stash-bg: rgba(210, 153, 34, 0.1);
  --accent-glow: rgba(88, 166, 255, 0.15);
}
```

Remove the `.dark {}` block entirely — single theme only.

---

## Typography

Replace `@fontsource-variable/roboto` with IBM Plex Sans + IBM Plex Mono:

```bash
npm install @fontsource/ibm-plex-sans @fontsource/ibm-plex-mono
```

In `src/index.css`:

```css
@import "@fontsource/ibm-plex-sans/400.css";
@import "@fontsource/ibm-plex-sans/500.css";
@import "@fontsource/ibm-plex-sans/600.css";
@import "@fontsource/ibm-plex-sans/700.css";
@import "@fontsource/ibm-plex-mono/500.css";
@import "@fontsource/ibm-plex-mono/600.css";
```

`--font-sans` → IBM Plex Sans  
`--font-mono` → IBM Plex Mono (used for logo brand name, stat values, meta chips)

Also update the `@theme inline` block in `src/index.css` to register new semantic tokens so Tailwind utility classes work:

```css
@theme inline {
  --font-sans: "IBM Plex Sans", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;
  /* add these alongside existing color mappings */
  --color-success: var(--success);
  --color-stash: var(--stash);
}
```

---

## Navbar (`src/layout/Navbar.tsx`)

- Keep `TRNQL.gif` logo image and `handleLogoClick` easter egg — no changes to behavior
- Keep `LayoutTextFlip` with words `["Movies", "Bovies", "أفلام", "Filme"]` — no changes
- **Remove** the `<Search>` icon from inside the search input — input has no left icon, just `padding: 8px 12px` all sides
- Search input: `rounded-lg border bg-card px-3 py-2 text-sm focus:ring-2 focus:ring-primary/40`
- **Remove** `ModeToggle` from the navbar. Set `forcedTheme="dark"` on `ThemeProvider` in `App.tsx` so next-themes always renders dark.
- Logo brand text: `font-mono font-semibold text-xs tracking-widest uppercase text-primary`

---

## Section Headers

Applied uniformly to `Watchlist.tsx`, `StashedList.tsx`, `WatchedList.tsx`:

```jsx
<button className="flex items-center justify-between w-full cursor-pointer mb-4 group">
  <div className="flex items-center gap-2.5">
    <div className="w-[3px] h-[16px] rounded-full bg-primary flex-shrink-0" />
    <span className="text-sm font-semibold tracking-tight">{title}</span>
    <span className="text-[10px] font-mono text-muted-foreground bg-card border border-border rounded-full px-2 py-0.5">
      {count}
    </span>
  </div>
  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:text-foreground" />
</button>
```

---

## Movie Cards (`MovieCard.tsx`)

**Grid:** keep `grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4`

**Card:**

```
rounded-lg overflow-hidden relative cursor-pointer border border-border
hover:scale-[1.07] duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
hover:shadow-[0_14px_36px_rgba(0,0,0,0.7),0_0_0_1px_hsl(var(--primary))]
hover:z-10
```

**Overlay:** `bg-gradient-to-t from-background/97 via-background/50 to-transparent`

**Action buttons** (inside overlay):

- Height: `h-[26px]`, `rounded-[5px]`, icon size `h-3 w-3`
- Watched / Mark as watched: `CircleCheck` icon — green tinted (`bg-success/10 text-success border-success/30`)
- Move to Stash / Add to Stash: `Layers` icon — amber tinted (`bg-[--stash]/10 text-[--stash] border-[--stash]/30`)
- Add to Watchlist / Move to Watchlist: `BookmarkPlus` icon — blue tinted (`bg-primary/10 text-primary border-primary/30`)
- Remove (any list): `X` icon — red tinted (`bg-destructive/10 text-destructive border-destructive/30`)

**Icon changes summary:**

| Action                | Old icon       | New icon              |
| --------------------- | -------------- | --------------------- |
| Mark as watched       | `Check`        | `CircleCheck`         |
| Add/move to stash     | `FolderPlus`   | `Layers`              |
| Add/move to watchlist | `BookmarkPlus` | `BookmarkPlus` (keep) |
| Remove                | `Trash2`       | `X`                   |

---

## MovieCardDetails Modal (`MovieCardDetails.tsx`)

**Overlay:** `fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4`

**Modal box:**

```
relative max-w-2xl w-full max-h-[88vh] overflow-hidden rounded-2xl
border border-border bg-card shadow-[0_32px_80px_rgba(0,0,0,0.8)]
flex flex-col
```

**Structure:**

1. **Backdrop strip** — `h-40 relative overflow-hidden flex-shrink-0`. Image covers strip with `object-cover opacity-60`. Gradient overlay `from-transparent to-card`. Close button `absolute top-3 right-3` — `rounded-full bg-black/60 border border-border w-7 h-7 flex items-center justify-center` with `X` icon (12px).

2. **Body** — `flex gap-4 px-5 pb-5 overflow-y-auto` with `margin-top: -52px` to overlap backdrop
   - **Poster** — `w-20 aspect-[2/3] rounded-lg border-2 border-border shadow-lg flex-shrink-0 self-start`
   - **Info column:**
     - Title: `text-xl font-bold tracking-tight`
     - Tagline: `text-xs text-muted-foreground italic mt-0.5 mb-2`
     - Meta row: `flex flex-wrap gap-1.5 mb-2` — chips with `font-mono text-[10px] bg-secondary border border-border rounded-md px-1.5 py-0.5`. Rating chip gets `text-yellow-400`.
     - Genre chips: `rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] px-2.5 py-1`
     - Overview: `text-xs leading-relaxed text-muted-foreground mb-3`
     - **Financials (compact):** `flex flex-wrap gap-4 border-t border-border pt-3 text-[11px]`. Each item: label in `text-[9px] uppercase tracking-wide text-muted-foreground`, value in `font-mono text-muted-foreground`. Budget, Revenue, Languages all inline at this size.

---

## WatchedList Stats Strip

Keep the 3–4 stat cards but style them:

```jsx
<div className="flex gap-2 mb-4 flex-wrap">
  <div className="bg-card border border-border rounded-lg px-4 py-2 text-center min-w-[80px]">
    <p className="font-mono text-lg font-bold">{totalCount}</p>
    <p className="text-[9px] uppercase tracking-wide text-muted-foreground mt-0.5">
      Movies
    </p>
  </div>
  {/* repeat for avg rating, watch time */}
</div>
```

---

## Files to Change

| File                                                    | Change                                                         |
| ------------------------------------------------------- | -------------------------------------------------------------- |
| `src/index.css`                                         | Replace CSS variables, swap font imports, remove `.dark` block |
| `src/layout/Navbar.tsx`                                 | Remove search icon, update input/button classes                |
| `src/features/movies/components/MovieCard.tsx`          | Update card/overlay classes, new icon imports                  |
| `src/features/movies/components/MovieActions.tsx`       | Swap `Check→CircleCheck`, `FolderPlus→Layers`, `Trash2→X`      |
| `src/features/movies/components/SearchMovieActions.tsx` | Swap `FolderPlus→Layers`, `Trash2→X`                           |
| `src/features/movies/components/MovieCardDetails.tsx`   | Full modal redesign as spec'd above                            |
| `src/features/movies/components/WatchedList.tsx`        | Stat cards styling                                             |
| `src/features/movies/components/Watchlist.tsx`          | Section header pattern                                         |
| `src/features/movies/components/StashedList.tsx`        | Section header pattern                                         |
| `package.json`                                          | Add `@fontsource/ibm-plex-sans`, `@fontsource/ibm-plex-mono`   |

---

## Out of Scope

- Light mode (removed intentionally)
- Section navigation change (kept as single scroll)
- Routing or data fetching changes
- Any new features beyond visual redesign
