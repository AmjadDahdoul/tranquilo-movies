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
