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

  const {
    id,
    title,
    vote_average,
    poster_path,
    // media_type,
    // original_language,
    // original_title,
    // overview,
    // vote_count,
    // release_date,
    // popularity,
    // backdrop_path
  } = movie;

  const hasActions =
    listType === ListType.STASHLIST ||
    listType === ListType.WATCHLIST ||
    listType === ListType.WATCHEDLIST ||
    !listType;

  // refactor or remove this
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
        className="rounded-xl overflow-hidden group hover:scale-110 duration-700 ease-in-out relative cursor-pointer shadow-md hover:shadow-xl transition-all"
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
            className="w-full aspect-[2/3] bg-muted flex flex-col items-center justify-center gap-2 sm:pointer-events-none"
          >
            <Film className="h-10 w-10 text-muted-foreground/40" />
            <span className="text-muted-foreground/60 text-xs text-center px-2 line-clamp-2">
              {title}
            </span>
          </div>
        )}
        <div
          className={`${isActive ? "flex" : "hidden"} sm:hidden sm:group-hover:flex absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent w-full h-full p-3 flex-col justify-end`}
        >
          <h1 className="text-white font-semibold text-sm leading-tight mb-1 line-clamp-2">
            {title}
          </h1>
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-yellow-500/30">
              ⭐ {vote_average.toPrecision(2)}
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
