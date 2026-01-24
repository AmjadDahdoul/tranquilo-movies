import { useState } from "react";
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
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    localStorage.setItem(
      "stashlist-collapsed",
      JSON.stringify(newCollapsedState),
    );
  };

  if (isLoading)
    return (
      <div className="my-6">
        <h2 className="text-2xl font-bold mb-4">Stash List</h2>
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="my-6">
        <h2 className="text-2xl font-bold mb-4">Stash List</h2>
        <div className="text-center py-8">
          <p className="text-red-600 dark:text-red-400">
            Error loading stash list!
          </p>
        </div>
      </div>
    );

  if (!data) return null;

  const movieCount = data.items.length;

  return (
    <div className="my-6">
      <div
        className="flex items-center justify-between cursor-pointer mb-4"
        onClick={handleOnClick}
      >
        <h2 className="text-2xl font-bold">
          Stash List {movieCount > 0 && `(${movieCount})`}
        </h2>
        <span className="text-2xl select-none">{isCollapsed ? "▶" : "▼"}</span>
      </div>

      {!isCollapsed && (
        <div className="transition-all duration-300 ease-in-out">
          {movieCount === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">
                Stash list is empty.
              </p>
            </div>
          ) : (
            <MoviesContainer
              movies={data.items}
              listType={ListType.STASHLIST}
            />
          )}
        </div>
      )}
    </div>
  );
};
