import type {
  Movie,
  TmdbListItem,
  TmdbWatchlistMovie,
} from "@/services/tmdb/types";
import { getPosterUrl } from "@/services/tmdb/utils";
import { UpdateMovieButton } from "./UpdateMovieButton";

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
    // genre_ids,
    // backdrop_path
  } = movie;

  return (
    <div className="rounded-2xl border-2 overflow-hidden group hover:scale-110 duration-700 ease-in-out relative cursor-pointer">
      <img src={getPosterUrl(poster_path)} alt={title} />
      <div className="group-hover:block hidden absolute bottom-0 bg-black/70 w-full h-full p-5">
        <h1>{title}</h1>
        <h1>{vote_average}</h1>
        <UpdateMovieButton movieId={id} listType={listType} />
      </div>
    </div>
  );
};
