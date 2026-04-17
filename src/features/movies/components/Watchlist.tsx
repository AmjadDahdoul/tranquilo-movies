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
      <div className="my-8">
        <h2 className="text-xl font-bold mb-4 pl-3 border-l-4 border-primary">
          Watchlist
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
          Watchlist
        </h2>
        <p className="text-destructive text-sm py-6 text-center">
          Error loading watchlist.
        </p>
      </div>
    );

  if (!movies) return null;

  const movieCount = movies.results.length;

  return (
    <div className="my-8">
      <button
        className="flex items-center justify-between w-full cursor-pointer mb-4 group"
        onClick={handleOnClick}
      >
        <h2 className="text-xl font-bold pl-3 border-l-4 border-primary flex items-center gap-2">
          Watchlist
          <span className="text-sm font-normal text-muted-foreground">
            ({movieCount})
          </span>
        </h2>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform duration-200 group-hover:text-foreground ${isCollapsed ? "-rotate-90" : ""}`}
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
