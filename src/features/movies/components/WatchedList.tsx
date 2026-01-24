import { useState, useEffect, useCallback } from "react";
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
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    localStorage.setItem(
      "watchedlist-collapsed",
      JSON.stringify(newCollapsedState),
    );
  };

  const handleScroll = useCallback(() => {
    if (isCollapsed) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 1000;

    if (isNearBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, isCollapsed]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (isLoading)
    return (
      <div className="my-6">
        <h2 className="text-2xl font-bold mb-4">Watched Movies</h2>
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="my-6">
        <h2 className="text-2xl font-bold mb-4">Watched Movies</h2>
        <div className="text-center py-8">
          <p className="text-red-600 dark:text-red-400">
            Error loading watched movies!
          </p>
        </div>
      </div>
    );

  if (!data) return null;

  const allMovies = data.pages?.flatMap((page) => page.items) || [];
  const totalCount = data.pages?.[0]?.total_results || 0;

  return (
    <div className="my-6">
      <div
        className="flex items-center justify-between cursor-pointer mb-4"
        onClick={handleOnClick}
      >
        <h2 className="text-2xl font-bold">
          Watched Movies {totalCount > 0 && `(${totalCount})`}
        </h2>
        <span className="text-2xl select-none">{isCollapsed ? "▶" : "▼"}</span>
      </div>

      {!isCollapsed && (
        <div className="transition-all duration-300 ease-in-out">
          {allMovies.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">
                No watched movies yet.
              </p>
            </div>
          ) : (
            <>
              <MoviesContainer
                movies={allMovies}
                listType={ListType.WATCHEDLIST}
              />

              {isFetchingNextPage && (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400">
                    Loading more movies...
                  </p>
                </div>
              )}

              {!hasNextPage && allMovies.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-500">
                    You've seen all {totalCount} watched movies!
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
