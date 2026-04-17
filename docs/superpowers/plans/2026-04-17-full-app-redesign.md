# Full App Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the Midnight Blue design system across the entire Tranquilo app — new colors, IBM Plex typography, refined icons, and a redesigned MovieCardDetails modal.

**Architecture:** Pure visual overhaul — no routing, data-fetching, or logic changes. All changes are Tailwind class updates, CSS variable replacements, and lucide icon swaps in existing components. Tasks flow from foundation (CSS tokens) outward to individual components.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Lucide React, @fontsource packages

**Spec:** `docs/superpowers/specs/2026-04-17-full-app-redesign-design.md`

---

## File Map

| File                                                    | Change                                                                            |
| ------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `package.json`                                          | Add `@fontsource/ibm-plex-sans`, `@fontsource/ibm-plex-mono`                      |
| `src/index.css`                                         | Replace CSS vars, swap font imports, remove `.dark` block, update `@theme inline` |
| `src/App.tsx`                                           | Add `defaultTheme="dark"` to ThemeProvider                                        |
| `src/layout/Navbar.tsx`                                 | Remove Search icon from input, remove ModeToggle                                  |
| `src/features/movies/components/Watchlist.tsx`          | Section header pattern                                                            |
| `src/features/movies/components/StashedList.tsx`        | Section header pattern                                                            |
| `src/features/movies/components/WatchedList.tsx`        | Section header pattern + stat cards                                               |
| `src/features/movies/components/MovieCard.tsx`          | Card + overlay Tailwind classes                                                   |
| `src/features/movies/components/MovieActions.tsx`       | Icon swaps: `Check→CircleCheck`, `FolderPlus→Layers`, `Trash2→X`                  |
| `src/features/movies/components/SearchMovieActions.tsx` | Icon swaps: `FolderPlus→Layers`, `Trash2→X`                                       |
| `src/features/movies/components/MovieCardDetails.tsx`   | Full modal redesign                                                               |

---

## Task 1: Install Fonts and Rewrite CSS Foundation

**Files:**

- Modify: `package.json`
- Modify: `src/index.css`

- [ ] **Step 1: Install IBM Plex font packages**

```bash
cd /Users/dahdoul/React/tranquilo-movies
npm install @fontsource/ibm-plex-sans @fontsource/ibm-plex-mono
```

Expected: packages added to `node_modules`, `package.json` updated.

- [ ] **Step 2: Replace the entire contents of `src/index.css`**

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource/ibm-plex-sans/400.css";
@import "@fontsource/ibm-plex-sans/500.css";
@import "@fontsource/ibm-plex-sans/600.css";
@import "@fontsource/ibm-plex-sans/700.css";
@import "@fontsource/ibm-plex-mono/500.css";
@import "@fontsource/ibm-plex-mono/600.css";

@custom-variant dark (&:is(.dark *));

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
  --success: #3fb950;
  --stash: #d29922;
  --sidebar: #161b22;
  --sidebar-foreground: #e6edf3;
  --sidebar-primary: #58a6ff;
  --sidebar-primary-foreground: #0d1117;
  --sidebar-accent: #21262d;
  --sidebar-accent-foreground: #e6edf3;
  --sidebar-border: #30363d;
  --sidebar-ring: rgba(88, 166, 255, 0.4);
}

@theme inline {
  --font-sans: "IBM Plex Sans", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-foreground: var(--foreground);
  --color-background: var(--background);
  --color-success: var(--success);
  --color-stash: var(--stash);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply font-sans bg-background text-foreground;
  }
  html {
    @apply font-sans;
  }
}
```

- [ ] **Step 3: Verify no TypeScript/lint errors**

```bash
npm run lint
```

Expected: no errors. If Prettier complains about CSS formatting, that's fine — it only lints TS/TSX.

- [ ] **Step 4: Start dev server and visually verify fonts loaded**

```bash
npm run dev
```

Open `http://localhost:5173`. Body text should be IBM Plex Sans (check in browser devtools: `computed` → `font-family`). Background should be `#0d1117` dark navy.

- [ ] **Step 5: Commit**

```bash
git add src/index.css package.json package-lock.json
git commit -m "feat: apply Midnight Blue color system and IBM Plex fonts"
```

---

## Task 2: Force Dark Theme and Remove ModeToggle

**Files:**

- Modify: `src/App.tsx`
- Modify: `src/layout/Navbar.tsx`

- [ ] **Step 1: Update `src/App.tsx` to lock theme to dark**

Replace the `<ThemeProvider>` line (line 19) — change:

```tsx
<ThemeProvider>
```

to:

```tsx
<ThemeProvider defaultTheme="dark" storageKey="trnql-theme">
```

Full `App.tsx` for reference:

```tsx
import { useSearchParams } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MovieSearch } from "./features/movies/components/MovieSearch";
import { StashedList } from "./features/movies/components/StashedList";
import { Navbar } from "./layout/Navbar";
import { Watchlist } from "./features/movies/components/Watchlist";
import { Container } from "./components/ui/container";
import { WatchedList } from "./features/movies/components/WatchedList";

const queryClient = new QueryClient();

export function App() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const hasSearchQuery = !!searchQuery && searchQuery.trim().length > 0;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="trnql-theme">
      <QueryClientProvider client={queryClient}>
        <Navbar />

        {hasSearchQuery ? (
          <MovieSearch />
        ) : (
          <>
            <Container>
              <Watchlist />
              <StashedList />
              <WatchedList />
            </Container>
          </>
        )}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
```

- [ ] **Step 2: Remove ModeToggle and Search icon from `src/layout/Navbar.tsx`**

Replace the entire file:

```tsx
import { useSearchParams } from "react-router-dom";
import { X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useRef } from "react";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const LINKS = [
  "https://youtu.be/aQkPcPqTq4M?si=hFlYn7SoWjDvb1TE",
  "https://youtu.be/gQtKJbptcns?si=5602Ydu2OeJVP3fi",
  "https://youtu.be/MPlkHxFA-Qg?si=ZtykX4rrnhxsVrAc",
  "https://youtu.be/88sARuFu-tc?si=kNf42iBM3OxHTOih",
  "https://youtu.be/Uj1AOKUPYTY?si=B_ED6bbBklaLHbLk",
  "https://youtu.be/tD5oQQ-CQ4E?si=cN_8JVvPaxAMijhm",
  "https://youtu.be/ho5YyCzRxS8?si=eS5iGoeWQbPZ_V4U",
] as const;

export const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const handleSearchChange = (value: string) => {
    if (value) {
      setSearchParams({ search: value }, { replace: true });
    } else {
      setSearchParams({});
    }
  };

  const logoClickCount = useRef<number>(
    Number(localStorage.getItem("logoClickCount")) || 0,
  );

  const handleLogoClick = () => {
    logoClickCount.current += 1;
    localStorage.setItem("logoClickCount", logoClickCount.current.toString());

    if (logoClickCount.current % 9 === 0) {
      const randomIndex = Math.floor(Math.random() * LINKS.length);
      window.open(LINKS[randomIndex], "_blank");
      toast("Total logo clicks: " + logoClickCount.current);
    }
  };

  const words = ["Movies", "Bovies", "أفلام", "Filme"];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <Container>
          <div className="flex h-14 items-center gap-4">
            <div
              className="flex items-center gap-2 cursor-pointer flex-shrink-0"
              onClick={handleLogoClick}
            >
              <img
                src="/TRNQL.gif"
                alt="Tranquilo"
                className="h-9 w-9 rounded-lg active:scale-125 duration-200 ease-in-out"
              />
              <div className="hidden sm:flex flex-col">
                <span className="font-mono font-semibold text-xs tracking-widest uppercase text-primary leading-none select-none">
                  Tranquilo
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight select-none">
                  <LayoutTextFlip text="Movies" words={words} duration={2500} />
                </span>
              </div>
            </div>

            <div className="flex-1 max-w-lg mx-auto">
              <div className="relative">
                <input
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  placeholder="Search movies…"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchParams({}, { replace: true })}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </header>
      <Toaster position="top-right" richColors duration={3000} />
    </>
  );
};
```

- [ ] **Step 3: Verify lint passes**

```bash
npm run lint
```

Expected: no errors (no unused imports — `Search` and `ModeToggle` are gone).

- [ ] **Step 4: Visually verify in browser**

Open `http://localhost:5173`. Check:

- Navbar has no search icon inside the input
- No theme toggle button on the right
- Logo gif + "Tranquilo" + rotating label visible on desktop
- Search input has blue ring on focus

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/layout/Navbar.tsx
git commit -m "feat: force dark theme, remove mode toggle, clean up navbar"
```

---

## Task 3: Redesign Section Headers

**Files:**

- Modify: `src/features/movies/components/Watchlist.tsx`
- Modify: `src/features/movies/components/StashedList.tsx`
- Modify: `src/features/movies/components/WatchedList.tsx`

The pattern for each section header button:

```tsx
<button
  className="flex items-center justify-between w-full cursor-pointer mb-4 group"
  onClick={handleOnClick}
>
  <div className="flex items-center gap-2.5">
    <div className="w-[3px] h-4 rounded-full bg-primary flex-shrink-0" />
    <span className="text-sm font-semibold tracking-tight">TITLE</span>
    <span className="font-mono text-[10px] text-muted-foreground bg-card border border-border rounded-full px-2 py-0.5">
      COUNT
    </span>
  </div>
  <ChevronDown
    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:text-foreground ${isCollapsed ? "-rotate-90" : ""}`}
  />
</button>
```

And the loading/error state headers use the same accent bar:

```tsx
<div className="flex items-center gap-2.5 mb-4">
  <div className="w-[3px] h-4 rounded-full bg-primary flex-shrink-0" />
  <span className="text-sm font-semibold tracking-tight">TITLE</span>
</div>
```

- [ ] **Step 1: Update `src/features/movies/components/Watchlist.tsx`**

Replace the entire file:

```tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useWatchList } from "../hooks/useWatchList";
import { ListType } from "@/routes/enum/ListType";
import { MoviesContainer } from "./MoviesContainer";

export const Watchlist = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("watchlist-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  const { data: movies, isLoading, isError } = useWatchList();

  const handleOnClick = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    localStorage.setItem("watchlist-collapsed", JSON.stringify(next));
  };

  if (isLoading)
    return (
      <div className="my-7">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-[3px] h-4 rounded-full bg-primary flex-shrink-0" />
          <span className="text-sm font-semibold tracking-tight">
            Watchlist
          </span>
        </div>
        <p className="text-muted-foreground text-sm py-6 text-center">
          Loading…
        </p>
      </div>
    );

  if (isError)
    return (
      <div className="my-7">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-[3px] h-4 rounded-full bg-primary flex-shrink-0" />
          <span className="text-sm font-semibold tracking-tight">
            Watchlist
          </span>
        </div>
        <p className="text-destructive text-sm py-6 text-center">
          Error loading watchlist.
        </p>
      </div>
    );

  if (!movies) return null;

  const movieCount = movies.results.length;

  return (
    <div className="my-7">
      <button
        className="flex items-center justify-between w-full cursor-pointer mb-4 group"
        onClick={handleOnClick}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-[3px] h-4 rounded-full bg-primary flex-shrink-0" />
          <span className="text-sm font-semibold tracking-tight">
            Watchlist
          </span>
          <span className="font-mono text-[10px] text-muted-foreground bg-card border border-border rounded-full px-2 py-0.5">
            {movieCount}
          </span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:text-foreground ${isCollapsed ? "-rotate-90" : ""}`}
        />
      </button>

      {!isCollapsed && (
        <div>
          {movieCount === 0 ? (
            <p className="text-muted-foreground text-sm py-8 text-center">
              Watchlist is empty.
            </p>
          ) : (
            <>
              <MoviesContainer
                movies={movies.results}
                listType={ListType.WATCHLIST}
              />
              <div className="border-b border-border mt-2" />
            </>
          )}
        </div>
      )}
    </div>
  );
};
```

- [ ] **Step 2: Update `src/features/movies/components/StashedList.tsx`**

Replace the entire file:

```tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ListType } from "@/routes/enum/ListType";
import { useStachedMovies } from "../hooks/useStashListMovies";
import { MoviesContainer } from "./MoviesContainer";

export const StashedList = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("stashlist-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  const { data, isLoading, isError } = useStachedMovies();

  const handleOnClick = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    localStorage.setItem("stashlist-collapsed", JSON.stringify(next));
  };

  if (isLoading)
    return (
      <div className="my-7">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-[3px] h-4 rounded-full bg-primary flex-shrink-0" />
          <span className="text-sm font-semibold tracking-tight">Stash</span>
        </div>
        <p className="text-muted-foreground text-sm py-6 text-center">
          Loading…
        </p>
      </div>
    );

  if (isError)
    return (
      <div className="my-7">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-[3px] h-4 rounded-full bg-primary flex-shrink-0" />
          <span className="text-sm font-semibold tracking-tight">Stash</span>
        </div>
        <p className="text-destructive text-sm py-6 text-center">
          Error loading stash.
        </p>
      </div>
    );

  if (!data) return null;

  const movieCount = data.items.length;

  return (
    <div className="my-7">
      <button
        className="flex items-center justify-between w-full cursor-pointer mb-4 group"
        onClick={handleOnClick}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-[3px] h-4 rounded-full bg-primary flex-shrink-0" />
          <span className="text-sm font-semibold tracking-tight">Stash</span>
          <span className="font-mono text-[10px] text-muted-foreground bg-card border border-border rounded-full px-2 py-0.5">
            {movieCount}
          </span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:text-foreground ${isCollapsed ? "-rotate-90" : ""}`}
        />
      </button>

      {!isCollapsed && (
        <div>
          {movieCount === 0 ? (
            <p className="text-muted-foreground text-sm py-8 text-center">
              Stash is empty.
            </p>
          ) : (
            <>
              <MoviesContainer
                movies={data.items}
                listType={ListType.STASHLIST}
              />
              <div className="border-b border-border mt-2" />
            </>
          )}
        </div>
      )}
    </div>
  );
};
```

- [ ] **Step 3: Update the header + stat cards in `src/features/movies/components/WatchedList.tsx`**

Replace the entire file:

```tsx
import { useState, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { ListType } from "@/routes/enum/ListType";
import { useInfiniteWatchedMovies } from "../hooks/useInfiniteWatchedMovies";
import { MoviesContainer } from "./MoviesContainer";

export const WatchedList = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("watchedlist-collapsed");
    return saved ? JSON.parse(saved) : false;
  });

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteWatchedMovies();

  const handleOnClick = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    localStorage.setItem("watchedlist-collapsed", JSON.stringify(next));
  };

  const handleScroll = useCallback(() => {
    if (isCollapsed) return;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight - 1000 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, isCollapsed]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (isLoading)
    return (
      <div className="my-7">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-[3px] h-4 rounded-full bg-primary flex-shrink-0" />
          <span className="text-sm font-semibold tracking-tight">Watched</span>
        </div>
        <p className="text-muted-foreground text-sm py-6 text-center">
          Loading…
        </p>
      </div>
    );

  if (isError)
    return (
      <div className="my-7">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-[3px] h-4 rounded-full bg-primary flex-shrink-0" />
          <span className="text-sm font-semibold tracking-tight">Watched</span>
        </div>
        <p className="text-destructive text-sm py-6 text-center">
          Error loading watched movies.
        </p>
      </div>
    );

  if (!data) return null;

  const allMovies = data.pages?.flatMap((page) => page.items) ?? [];
  const totalCount = data.pages?.[0]?.total_results ?? 0;

  const AVG_RUNTIME = 110;
  const totalHours = Math.floor((totalCount * AVG_RUNTIME) / 60);
  const totalDays = Math.floor(totalHours / 24);
  const timeLabel =
    totalDays > 0 ? `${totalHours}h (${totalDays}d)` : `${totalHours}h`;

  const avgRating =
    allMovies.length > 0
      ? (
          allMovies.reduce((sum, m) => sum + m.vote_average, 0) /
          allMovies.length
        ).toFixed(1)
      : null;

  return (
    <div className="my-7">
      <button
        className="flex items-center justify-between w-full cursor-pointer mb-4 group"
        onClick={handleOnClick}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-[3px] h-4 rounded-full bg-primary flex-shrink-0" />
          <span className="text-sm font-semibold tracking-tight">Watched</span>
          {totalCount > 0 && (
            <span className="font-mono text-[10px] text-muted-foreground bg-card border border-border rounded-full px-2 py-0.5">
              {totalCount}
            </span>
          )}
        </div>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:text-foreground ${isCollapsed ? "-rotate-90" : ""}`}
        />
      </button>

      {totalCount > 0 && !isCollapsed && (
        <div className="flex gap-2 mb-5 flex-wrap">
          <div className="bg-card border border-border rounded-lg px-4 py-2 text-center min-w-[80px]">
            <p className="font-mono text-lg font-bold leading-none">
              {totalCount}
            </p>
            <p className="text-[9px] uppercase tracking-wide text-muted-foreground mt-1">
              Movies
            </p>
          </div>
          {avgRating && (
            <div className="bg-card border border-border rounded-lg px-4 py-2 text-center min-w-[80px]">
              <p className="font-mono text-lg font-bold leading-none text-yellow-400">
                ★ {avgRating}
              </p>
              <p className="text-[9px] uppercase tracking-wide text-muted-foreground mt-1">
                Avg Rating
              </p>
            </div>
          )}
          <div className="bg-card border border-border rounded-lg px-4 py-2 text-center min-w-[80px]">
            <p className="font-mono text-lg font-bold leading-none">
              {timeLabel}
            </p>
            <p className="text-[9px] uppercase tracking-wide text-muted-foreground mt-1">
              Watch Time
            </p>
          </div>
        </div>
      )}

      {!isCollapsed && (
        <div>
          {allMovies.length === 0 ? (
            <p className="text-muted-foreground text-sm py-8 text-center">
              No watched movies yet.
            </p>
          ) : (
            <>
              <MoviesContainer
                movies={allMovies}
                listType={ListType.WATCHEDLIST}
              />
              {isFetchingNextPage && (
                <p className="text-muted-foreground text-sm py-6 text-center">
                  Loading more…
                </p>
              )}
              {!hasNextPage && allMovies.length > 0 && (
                <p className="text-muted-foreground text-sm py-6 text-center">
                  All {totalCount} watched movies loaded.
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
```

- [ ] **Step 4: Verify lint passes**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 5: Visually verify in browser**

Check all three section headers show: blue accent bar · bold title · monospace count badge · chevron. Stat cards in Watched section use monospace numerals.

- [ ] **Step 6: Commit**

```bash
git add src/features/movies/components/Watchlist.tsx src/features/movies/components/StashedList.tsx src/features/movies/components/WatchedList.tsx
git commit -m "feat: redesign section headers and watched stats strip"
```

---

## Task 4: Restyle MovieCard

**Files:**

- Modify: `src/features/movies/components/MovieCard.tsx`

- [ ] **Step 1: Replace the entire `src/features/movies/components/MovieCard.tsx`**

```tsx
import type {
  Movie,
  TmdbListItem,
  TmdbWatchlistMovie,
} from "@/services/tmdb/types";
import { getPosterUrl } from "@/services/tmdb/utils";
import { MovieActions } from "./MovieActions";
import { SearchMovieActions } from "./SearchMovieActions";
import { ListType } from "@/routes/enum/ListType";
import { useState, useEffect, useRef } from "react";
import { MovieCardDetails } from "./MovieCardDetails";
import { Film } from "lucide-react";

interface MovieCard {
  movie: TmdbListItem | TmdbWatchlistMovie | Movie;
  listType?: string;
}

export const MovieCard = (props: MovieCard) => {
  const { movie, listType } = props;
  const [isActive, setIsActive] = useState(false);
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { id, title, vote_average, poster_path } = movie;

  const hasActions =
    listType === ListType.STASHLIST ||
    listType === ListType.WATCHLIST ||
    listType === ListType.WATCHEDLIST ||
    !listType;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };
    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    setIsActive((prev) => !prev);
  };

  const handleMovieCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDetailsOpen(true);
  };

  return (
    <>
      <div
        ref={cardRef}
        className="rounded-lg overflow-hidden group relative cursor-pointer border border-border
          hover:scale-[1.07] transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
          hover:shadow-[0_14px_36px_rgba(0,0,0,0.7),0_0_0_1px_hsl(var(--primary))]
          hover:z-10"
        onClick={handleMovieCardClick}
      >
        {!imgError && poster_path ? (
          <img
            src={getPosterUrl(poster_path)}
            alt={title}
            onClick={handleImageClick}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover sm:pointer-events-none"
          />
        ) : (
          <div
            onClick={handleImageClick}
            className="w-full aspect-[2/3] bg-card flex flex-col items-center justify-center gap-2 sm:pointer-events-none"
          >
            <Film className="h-8 w-8 text-muted-foreground/40" />
            <span className="text-muted-foreground/60 text-xs text-center px-2 line-clamp-2">
              {title}
            </span>
          </div>
        )}

        <div
          className={`${isActive ? "flex" : "hidden"} sm:hidden sm:group-hover:flex
            absolute bottom-0 left-0 right-0
            bg-gradient-to-t from-background/97 via-background/50 to-transparent
            w-full h-full p-3 flex-col justify-end`}
        >
          <h1 className="text-white font-semibold text-[10px] leading-tight mb-1 line-clamp-2">
            {title}
          </h1>
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[9px] text-yellow-400">
              ★ {vote_average.toPrecision(2)}
            </span>
          </div>
          {hasActions && (
            <>
              {(listType === ListType.STASHLIST ||
                listType === ListType.WATCHLIST ||
                listType === ListType.WATCHEDLIST) && (
                <MovieActions movieId={id} listType={listType} />
              )}
              {!listType && <SearchMovieActions movieId={id} />}
            </>
          )}
        </div>
      </div>

      {isDetailsOpen && (
        <MovieCardDetails
          movieId={id}
          onClose={() => setIsDetailsOpen(false)}
        />
      )}
    </>
  );
};
```

- [ ] **Step 2: Verify lint passes**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Visually verify hover animation in browser**

Hover a movie card. It should scale up with a spring-like bounce (`cubic-bezier(0.34,1.56,0.64,1)`), have a blue outline ring, and show the gradient overlay with title + rating.

- [ ] **Step 4: Commit**

```bash
git add src/features/movies/components/MovieCard.tsx
git commit -m "feat: restyle movie cards with Midnight Blue overlay and spring animation"
```

---

## Task 5: Update Action Icons

**Files:**

- Modify: `src/features/movies/components/MovieActions.tsx`
- Modify: `src/features/movies/components/SearchMovieActions.tsx`

Icon mapping:

- `Check` → `CircleCheck` (mark as watched — green)
- `FolderPlus` → `Layers` (stash — amber)
- `BookmarkPlus` → `BookmarkPlus` (watchlist — blue, unchanged)
- `Trash2` → `X` (remove — red)

Button size classes: `size="icon"` replaced by explicit `className="h-[26px] flex-1 rounded-[5px] border flex items-center justify-center cursor-pointer transition-opacity hover:opacity-80"` — and remove the shadcn `Button` wrapper from these small overlay buttons in favour of plain `<button>` elements with inline colour classes. (The `Button` component from shadcn resets sizes; plain buttons give us tighter control here.)

Colour class pattern:

- Watched: `bg-success/10 text-success border-success/30`
- Stash: `bg-[color:var(--stash)]/10 text-[color:var(--stash)] border-[color:var(--stash)]/30`
- Watchlist/Add: `bg-primary/10 text-primary border-primary/30`
- Remove: `bg-destructive/10 text-destructive border-destructive/30`

- [ ] **Step 1: Replace `src/features/movies/components/MovieActions.tsx`**

```tsx
import { useState } from "react";
import { BookmarkPlus, Layers, Loader2, CircleCheck, X } from "lucide-react";
import { useAddToWatchlist } from "../hooks/useAddToWatchlist";
import { useUpdateList } from "../hooks/useAddMovieToList";
import { useItemStatus } from "../hooks/useItemStatus";
import { useWatchlistStatus } from "../hooks/useWatchlistStatus";
import { useMoveMovie } from "../hooks/useMoveMovie";
import { useAddToWatchedList } from "../hooks/useAddToWatchedList";
import { useRemoveFromWatchedList } from "../hooks/useRemoveFromWatchedList";
import { canRemoveWatched } from "../hooks/watchedTimestamps";
import { ActionType } from "@/routes/enum/ActionType";
import { ListType } from "@/routes/enum/ListType";
import { ENV } from "@/config/env";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MovieActionsProps {
  movieId: number;
  listType: string;
}

const ActionBtn = ({
  onClick,
  disabled,
  className,
  label,
  children,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className: string;
  label: string;
  children: React.ReactNode;
}) => (
  <Tooltip delayDuration={300}>
    <TooltipTrigger asChild>
      <button
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        className={`h-[26px] flex-1 rounded-[5px] border flex items-center justify-center cursor-pointer transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      >
        {children}
      </button>
    </TooltipTrigger>
    <TooltipContent>{label}</TooltipContent>
  </Tooltip>
);

export const MovieActions = ({ movieId, listType }: MovieActionsProps) => {
  const [isMoving, setIsMoving] = useState(false);

  const { data: stashListStatus } = useItemStatus(ENV.STASH_LIST_ID, movieId);
  const { data: watchlistStatus } = useWatchlistStatus(movieId);

  const { mutate: updateWatchlist, isPending: watchlistPending } =
    useAddToWatchlist();
  const { moveToWatchlist, moveToStashList } = useMoveMovie();
  const { mutate: removeFromStashList, isPending: removeStashPending } =
    useUpdateList(ENV.STASH_LIST_ID, ActionType.REMOVE, ListType.STASHLIST);
  const { mutate: addToWatchedList, isPending: addToWatchedPending } =
    useAddToWatchedList();
  const { mutate: removeFromWatchedList, isPending: removePending } =
    useRemoveFromWatchedList();

  const isInStashList = stashListStatus?.item_present;
  const isInWatchlist = watchlistStatus?.watchlist;
  const canRemove = canRemoveWatched(movieId);

  const handleMoveToWatchlist = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    setIsMoving(true);
    try {
      await moveToWatchlist(movieId, isInStashList || false);
    } finally {
      setIsMoving(false);
    }
  };

  const handleMoveToStashList = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    setIsMoving(true);
    try {
      await moveToStashList(movieId);
    } finally {
      setIsMoving(false);
    }
  };

  const handleMarkAsWatched = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addToWatchedList(movieId);
  };

  const handleRemoveFromWatched = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeFromWatchedList(movieId);
  };

  const spinnerOrIcon = (pending: boolean, Icon: React.ElementType) =>
    pending ? (
      <Loader2 className="h-3 w-3 animate-spin" />
    ) : (
      <Icon className="h-3 w-3" />
    );

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex items-center gap-1">
        {listType === ListType.STASHLIST && (
          <>
            <ActionBtn
              onClick={handleMarkAsWatched}
              disabled={addToWatchedPending}
              className="bg-success/10 text-success border-success/30"
              label="Mark as Watched"
            >
              {spinnerOrIcon(addToWatchedPending, CircleCheck)}
            </ActionBtn>
            {!isInWatchlist && (
              <ActionBtn
                onClick={handleMoveToWatchlist}
                disabled={isMoving || removeStashPending}
                className="bg-primary/10 text-primary border-primary/30"
                label="Move to Watchlist"
              >
                {spinnerOrIcon(isMoving, BookmarkPlus)}
              </ActionBtn>
            )}
            <ActionBtn
              onClick={(e) => {
                e.stopPropagation();
                removeFromStashList(movieId);
              }}
              disabled={removeStashPending}
              className="bg-destructive/10 text-destructive border-destructive/30"
              label="Remove from Stash"
            >
              {spinnerOrIcon(removeStashPending, X)}
            </ActionBtn>
          </>
        )}

        {listType === ListType.WATCHLIST && (
          <>
            <ActionBtn
              onClick={handleMarkAsWatched}
              disabled={addToWatchedPending}
              className="bg-success/10 text-success border-success/30"
              label="Mark as Watched"
            >
              {spinnerOrIcon(addToWatchedPending, CircleCheck)}
            </ActionBtn>
            {!isInStashList && (
              <ActionBtn
                onClick={handleMoveToStashList}
                disabled={isMoving || watchlistPending}
                className="bg-[color:var(--stash)]/10 text-[color:var(--stash)] border-[color:var(--stash)]/30"
                label="Move to Stash"
              >
                {spinnerOrIcon(isMoving, Layers)}
              </ActionBtn>
            )}
            <ActionBtn
              onClick={(e) => {
                e.stopPropagation();
                updateWatchlist({ movieId, watchlist: false });
              }}
              disabled={watchlistPending}
              className="bg-destructive/10 text-destructive border-destructive/30"
              label="Remove from Watchlist"
            >
              {spinnerOrIcon(watchlistPending, X)}
            </ActionBtn>
          </>
        )}

        {listType === ListType.WATCHEDLIST && canRemove && (
          <ActionBtn
            onClick={handleRemoveFromWatched}
            disabled={removePending}
            className="bg-destructive/10 text-destructive border-destructive/30"
            label="Remove from Watched"
          >
            {spinnerOrIcon(removePending, X)}
          </ActionBtn>
        )}
      </div>
    </TooltipProvider>
  );
};
```

- [ ] **Step 2: Replace `src/features/movies/components/SearchMovieActions.tsx`**

```tsx
import { BookmarkPlus, Layers, Loader2, BookmarkX, X } from "lucide-react";
import { useAddToWatchlist } from "../hooks/useAddToWatchlist";
import { useUpdateList } from "../hooks/useAddMovieToList";
import { useItemStatus } from "../hooks/useItemStatus";
import { useWatchlistStatus } from "../hooks/useWatchlistStatus";
import { ActionType } from "@/routes/enum/ActionType";
import { ListType } from "@/routes/enum/ListType";
import { ENV } from "@/config/env";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SearchMovieActionsProps {
  movieId: number;
}

export const SearchMovieActions = ({ movieId }: SearchMovieActionsProps) => {
  const { data: stashListStatus } = useItemStatus(ENV.STASH_LIST_ID, movieId);
  const { data: watchlistStatus } = useWatchlistStatus(movieId);

  const isInStashList = stashListStatus?.item_present;
  const isInWatchlist = watchlistStatus?.watchlist;

  const { mutate: updateWatchlist, isPending: watchlistPending } =
    useAddToWatchlist();
  const { mutate: updateStashList, isPending: addStashPending } = useUpdateList(
    ENV.STASH_LIST_ID,
    !isInStashList ? ActionType.ADD : ActionType.REMOVE,
    ListType.STASHLIST,
  );

  const handleToggleWatchlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    updateWatchlist({ movieId, watchlist: !isInWatchlist });
  };

  const handleToggleStashList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    updateStashList(movieId);
  };

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex items-center gap-1">
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <button
              onClick={handleToggleWatchlist}
              disabled={watchlistPending}
              aria-label={
                isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"
              }
              className={`h-[26px] flex-1 rounded-[5px] border flex items-center justify-center cursor-pointer transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed ${
                isInWatchlist
                  ? "bg-destructive/10 text-destructive border-destructive/30"
                  : "bg-primary/10 text-primary border-primary/30"
              }`}
            >
              {watchlistPending ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : isInWatchlist ? (
                <BookmarkX className="h-3 w-3" />
              ) : (
                <BookmarkPlus className="h-3 w-3" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <button
              onClick={handleToggleStashList}
              disabled={addStashPending}
              aria-label={isInStashList ? "Remove from Stash" : "Add to Stash"}
              className={`h-[26px] flex-1 rounded-[5px] border flex items-center justify-center cursor-pointer transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed ${
                isInStashList
                  ? "bg-destructive/10 text-destructive border-destructive/30"
                  : "bg-[color:var(--stash)]/10 text-[color:var(--stash)] border-[color:var(--stash)]/30"
              }`}
            >
              {addStashPending ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : isInStashList ? (
                <X className="h-3 w-3" />
              ) : (
                <Layers className="h-3 w-3" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            {isInStashList ? "Remove from Stash" : "Add to Stash"}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
```

- [ ] **Step 3: Verify lint passes**

```bash
npm run lint
```

Expected: no errors. If `BookmarkX` is not available in the installed version of lucide-react, replace it with `Bookmark` (the solid bookmark icon Lucide exports). Check with: `grep -r "BookmarkX" node_modules/lucide-react/dist/esm/icons/ | head -1`

- [ ] **Step 4: Visually verify icons in browser**

Hover a card from the Watchlist — should see `CircleCheck` (green) and `X` (red). Stash card should show `CircleCheck` (green), `BookmarkPlus` (blue), `X` (red). Search result card should show `BookmarkPlus` (blue) and `Layers` (amber).

- [ ] **Step 5: Commit**

```bash
git add src/features/movies/components/MovieActions.tsx src/features/movies/components/SearchMovieActions.tsx
git commit -m "feat: replace action icons with CircleCheck, Layers, BookmarkPlus, X"
```

---

## Task 6: Redesign MovieCardDetails Modal

**Files:**

- Modify: `src/features/movies/components/MovieCardDetails.tsx`

- [ ] **Step 1: Replace the entire `src/features/movies/components/MovieCardDetails.tsx`**

```tsx
import { getPosterUrl } from "@/services/tmdb/utils";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { useEffect } from "react";
import { X } from "lucide-react";

interface MovieCardDetailsProps {
  movieId: number;
  onClose?: () => void;
}

export function MovieCardDetails({ movieId, onClose }: MovieCardDetailsProps) {
  const { data, isLoading } = useMovieDetails(movieId);

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
        <div className="text-muted-foreground text-sm">Loading…</div>
      </div>
    );
  }

  if (!data) return null;

  const {
    backdrop_path,
    poster_path,
    title,
    original_title,
    overview,
    vote_average,
    vote_count,
    runtime,
    release_date,
    genres,
    tagline,
    status,
    spoken_languages,
    original_language,
    budget,
    revenue,
  } = data;

  const showOriginalTitle = original_title && original_title !== title;

  const formattedRuntime = () => {
    if (!runtime) return null;
    const h = Math.floor(runtime / 60);
    const m = runtime % 60;
    return `${h}h ${m}m`;
  };

  const formattedBudget =
    budget && budget > 0 ? `$${budget.toLocaleString()}` : null;
  const formattedRevenue =
    revenue && revenue > 0 ? `$${revenue.toLocaleString()}` : null;
  const releaseYear = release_date
    ? new Date(release_date).getFullYear()
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full max-h-[88vh] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_32px_80px_rgba(0,0,0,0.8)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Backdrop strip */}
        <div className="h-40 relative overflow-hidden flex-shrink-0">
          {backdrop_path ? (
            <img
              src={getPosterUrl(backdrop_path, "original")}
              alt={title}
              className="w-full h-full object-cover opacity-60"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-secondary to-background" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 border border-border text-muted-foreground hover:text-foreground hover:bg-black/80 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>

        {/* Body — overlaps backdrop by 52px */}
        <div
          className="flex gap-4 px-5 pb-5 overflow-y-auto"
          style={{ marginTop: "-52px" }}
        >
          {/* Poster */}
          {poster_path && (
            <img
              src={getPosterUrl(poster_path, "w342")}
              alt={title}
              className="w-20 aspect-[2/3] rounded-lg border-2 border-border shadow-lg flex-shrink-0 self-start object-cover"
            />
          )}

          {/* Info */}
          <div className="flex flex-col gap-2 min-w-0 flex-1 pt-14">
            <div>
              <h2 className="text-xl font-bold tracking-tight leading-tight">
                {title}
                {showOriginalTitle && (
                  <span className="text-sm font-normal text-muted-foreground ml-1.5">
                    ({original_title})
                  </span>
                )}
              </h2>
              {tagline && (
                <p className="text-xs text-muted-foreground italic mt-0.5">
                  {tagline}
                </p>
              )}
            </div>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-1.5">
              <span className="font-mono text-[10px] bg-secondary border border-border rounded-md px-1.5 py-0.5 text-yellow-400">
                ★ {vote_average.toFixed(1)}
              </span>
              <span className="font-mono text-[10px] bg-secondary border border-border rounded-md px-1.5 py-0.5 text-muted-foreground">
                {vote_count.toLocaleString()} votes
              </span>
              {formattedRuntime() && (
                <span className="font-mono text-[10px] bg-secondary border border-border rounded-md px-1.5 py-0.5 text-muted-foreground">
                  {formattedRuntime()}
                </span>
              )}
              {releaseYear && (
                <span className="font-mono text-[10px] bg-secondary border border-border rounded-md px-1.5 py-0.5 text-muted-foreground">
                  {releaseYear}
                </span>
              )}
              <span className="font-mono text-[10px] bg-secondary border border-border rounded-md px-1.5 py-0.5 text-muted-foreground uppercase">
                {original_language}
              </span>
              <span className="font-mono text-[10px] bg-secondary border border-border rounded-md px-1.5 py-0.5 text-muted-foreground">
                {status}
              </span>
            </div>

            {/* Genre chips */}
            {genres.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {genres.map((g) => (
                  <span
                    key={g.id}
                    className="rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] px-2.5 py-0.5"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            {overview && (
              <p className="text-xs leading-relaxed text-muted-foreground">
                {overview}
              </p>
            )}

            {/* Financials — compact */}
            {(formattedBudget ||
              formattedRevenue ||
              spoken_languages.length > 0) && (
              <div className="flex flex-wrap gap-4 border-t border-border pt-3">
                {formattedBudget && (
                  <div>
                    <p className="text-[9px] uppercase tracking-wide text-muted-foreground">
                      Budget
                    </p>
                    <p className="font-mono text-[11px] text-muted-foreground mt-0.5">
                      {formattedBudget}
                    </p>
                  </div>
                )}
                {formattedRevenue && (
                  <div>
                    <p className="text-[9px] uppercase tracking-wide text-muted-foreground">
                      Revenue
                    </p>
                    <p className="font-mono text-[11px] text-muted-foreground mt-0.5">
                      {formattedRevenue}
                    </p>
                  </div>
                )}
                {spoken_languages.length > 0 && (
                  <div>
                    <p className="text-[9px] uppercase tracking-wide text-muted-foreground">
                      Languages
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {spoken_languages.map((l) => l.english_name).join(", ")}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify lint passes**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Visually verify modal in browser**

Click any movie card. The modal should:

- Show a backdrop image strip at the top, fading to the card background
- Poster overlapping the backdrop (positioned bottom-left of the strip)
- Title, tagline, meta chips (rating, runtime, year, language, status)
- Blue genre chips
- Overview text
- Compact budget/revenue/languages row at the bottom
- X button top-right to close; also closes on backdrop click

Test with a movie that has no backdrop image to confirm the gradient fallback renders correctly.

- [ ] **Step 4: Commit**

```bash
git add src/features/movies/components/MovieCardDetails.tsx
git commit -m "feat: redesign movie detail modal with backdrop strip and compact financials"
```

---

## Self-Review Checklist

- [x] **Spec coverage**
  - Color system → Task 1
  - Typography → Task 1
  - Dark-only → Task 2
  - Navbar (no search icon, no ModeToggle) → Task 2
  - Section headers → Task 3
  - WatchedList stat cards → Task 3
  - MovieCard hover animation + overlay → Task 4
  - Icon swaps (CircleCheck, Layers, BookmarkPlus, X) → Task 5
  - MovieCardDetails modal redesign → Task 6
  - Compact financials in modal → Task 6

- [x] **No placeholders** — all steps have exact code

- [x] **Type consistency** — `ActionBtn` helper defined in Task 5 and used only in Task 5. `spinnerOrIcon` helper defined and used only in `MovieActions.tsx`. No cross-task type dependencies.
