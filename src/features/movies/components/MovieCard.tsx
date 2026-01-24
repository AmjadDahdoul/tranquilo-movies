import type {
  Movie,
  TmdbListItem,
  TmdbWatchlistMovie,
} from "@/services/tmdb/types";
import { getPosterUrl } from "@/services/tmdb/utils";
import { MovieActions } from "./MovieActions";
import { SearchMovieActions } from "./SearchMovieActions";
import { ListType } from "@/routes/enum/ListType";

interface MovieCard {
  movie: TmdbListItem | TmdbWatchlistMovie | Movie;
  listType?: string;
}
export const MovieCard = (props: MovieCard) => {
  const { movie, listType } = props;
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

  return (
    <div className="rounded-2xl border-2 overflow-hidden group hover:scale-110 duration-700 ease-in-out relative cursor-pointer">
      <img src={getPosterUrl(poster_path)} alt={title} />
      <div className="group-hover:flex hidden absolute bottom-0 bg-black/70 w-full h-full p-2 flex-col justify-end">
        <h1 className="text-white font-bold text-lg mb-2">{title}</h1>
        <h2 className="text-yellow-400 font-semibold mb-4">
          ⭐ {vote_average.toPrecision(2)}
        </h2>
        {(listType === ListType.STASHLIST ||
          listType === ListType.WATCHLIST) && (
          <MovieActions movieId={id} listType={listType} />
        )}
        {!listType && <SearchMovieActions movieId={id} />}
      </div>
    </div>
  );
};
