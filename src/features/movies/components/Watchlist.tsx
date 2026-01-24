import { useState } from "react";
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
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    localStorage.setItem(
      "watchlist-collapsed",
      JSON.stringify(newCollapsedState),
    );
  };

  if (isLoading)
    return (
      <div className="my-6">
        <h2 className="text-2xl font-bold mb-4">Watchlist</h2>
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="my-6">
        <h2 className="text-2xl font-bold mb-4">Watchlist</h2>
        <div className="text-center py-8">
          <p className="text-red-600 dark:text-red-400">
            Error loading watchlist!
          </p>
        </div>
      </div>
    );

  if (!movies) return null;

  const movieCount = movies.results.length;

  return (
    <div className="my-6">
      <div
        className="flex items-center justify-between cursor-pointer mb-4"
        onClick={handleOnClick}
      >
        <h2 className="text-2xl font-bold">Watchlist {`(${movieCount})`}</h2>
        <span className="text-2xl select-none">{isCollapsed ? "▶" : "▼"}</span>
      </div>

      {!isCollapsed && (
        <div className="transition-all duration-300 ease-in-out">
          {movieCount === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">
                Watchlist is empty.
              </p>
            </div>
          ) : (
            <>
              <MoviesContainer
                movies={movies.results}
                listType={ListType.WATCHLIST}
              />
              <div className="border-b-2 border-accent" />
            </>
          )}
        </div>
      )}
    </div>
  );
};
