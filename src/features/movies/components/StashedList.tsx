import { getPosterUrl } from "@/services/tmdb/utils";
import { useStachedMovies } from "../hooks/useStashListMovies";
import { UpdateMovieButton } from "./UpdateMovieButton";

export const StashedList = () => {
  const { data, isLoading, isError } = useStachedMovies();

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error!</>;
  if (data?.total_results === 0) return <>Empty..</>;

  return (
    <div className="grid grid-cols-4 gap-4">
      {data?.items.map((movie) => (
        <div key={movie.id}>
          <img src={getPosterUrl(movie.poster_path)} alt={movie.title} />
          <UpdateMovieButton
            action="remove_item"
            movieId={movie.id}
            lable="Remove"
          />
        </div>
      ))}
    </div>
  );
};
