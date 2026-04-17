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
