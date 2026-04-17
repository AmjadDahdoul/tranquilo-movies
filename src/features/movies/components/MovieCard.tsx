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
import { Check, Film } from "lucide-react";

interface MovieCard {
  movie: TmdbListItem | TmdbWatchlistMovie | Movie;
  listType?: string;
  isSelected?: boolean;
  onToggleSelect?: (id: number) => void;
}

export const MovieCard = (props: MovieCard) => {
  const { movie, listType, isSelected, onToggleSelect } = props;
  const [isActive, setIsActive] = useState(false);
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { id, title, vote_average, poster_path } = movie;
  const lang = "original_language" in movie ? movie.original_language : null;
  const showLang = lang && lang !== "en";

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
    if (onToggleSelect) return;
    e.stopPropagation();
    setIsActive((prev) => !prev);
  };

  const handleMovieCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (onToggleSelect) {
      onToggleSelect(id);
    } else {
      setIsDetailsOpen(true);
    }
  };

  return (
    <>
      <div
        ref={cardRef}
        className={`rounded-lg overflow-hidden group relative cursor-pointer border transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
          hover:scale-[1.07] hover:z-10
          hover:shadow-[0_14px_36px_rgba(0,0,0,0.7),0_0_0_1px_hsl(var(--primary))]
          ${isSelected ? "border-primary" : "border-border"}`}
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
          className={`${isActive && !onToggleSelect ? "flex" : "hidden"} sm:hidden ${onToggleSelect ? "" : "sm:group-hover:flex"}
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
            {showLang && (
              <span className="font-mono text-[8px] uppercase text-muted-foreground bg-background/60 border border-border/50 rounded px-1 py-0.5 leading-none">
                {lang}
              </span>
            )}
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

        {isSelected && (
          <div className="absolute inset-0 bg-primary/20 pointer-events-none" />
        )}
        {isSelected && (
          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center pointer-events-none">
            <Check className="h-3 w-3 text-primary-foreground" />
          </div>
        )}
      </div>

      {isDetailsOpen && (
        <MovieCardDetails
          movieId={id}
          listType={listType}
          onClose={() => setIsDetailsOpen(false)}
        />
      )}
    </>
  );
};
