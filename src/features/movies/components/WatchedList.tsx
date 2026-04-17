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
      <div className="my-8">
        <h2 className="text-xl font-bold mb-4 pl-3 border-l-4 border-primary">
          Watched Movies
        </h2>
        <p className="text-muted-foreground text-sm py-6 text-center">
          Loading...
        </p>
      </div>
    );

  if (isError)
    return (
      <div className="my-8">
        <h2 className="text-xl font-bold mb-4 pl-3 border-l-4 border-primary">
          Watched Movies
        </h2>
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
    totalDays > 0 ? `${totalHours}h (${totalDays} days)` : `${totalHours}h`;

  const avgRating =
    allMovies.length > 0
      ? (
          allMovies.reduce((sum, m) => sum + m.vote_average, 0) /
          allMovies.length
        ).toFixed(1)
      : null;

  return (
    <div className="my-8">
      <button
        className="flex items-center justify-between w-full cursor-pointer mb-4 group"
        onClick={handleOnClick}
      >
        <h2 className="text-xl font-bold pl-3 border-l-4 border-primary flex items-center gap-2">
          Watched Movies
          {totalCount > 0 && (
            <span className="text-sm font-normal text-muted-foreground">
              ({totalCount})
            </span>
          )}
        </h2>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform duration-200 group-hover:text-foreground ${isCollapsed ? "-rotate-90" : ""}`}
        />
      </button>

      {totalCount > 0 && !isCollapsed && (
        <div className="flex justify-center gap-4 mb-6">
          <div className="flex flex-col items-center gap-1 bg-muted/50 rounded-xl px-6 py-3 min-w-[100px]">
            <span className="text-2xl font-bold">{totalCount}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              {totalCount === 1 ? "Movie" : "Movies"}
            </span>
          </div>
          {avgRating && (
            <div className="flex flex-col items-center gap-1 bg-muted/50 rounded-xl px-6 py-3 min-w-[100px]">
              <span className="text-2xl font-bold">⭐ {avgRating}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                Avg Rating
              </span>
            </div>
          )}
          <div className="flex flex-col items-center gap-1 bg-muted/50 rounded-xl px-6 py-3 min-w-[100px]">
            <span className="text-2xl font-bold">{timeLabel}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Watch Time
            </span>
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
                  Loading more...
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
