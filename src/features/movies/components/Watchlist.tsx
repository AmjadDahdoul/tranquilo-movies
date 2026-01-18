import { getPosterUrl } from "@/services/tmdb/utils";
import { useWatchList } from "../hooks/useWatchList";

export const Watchlist = () => {
  const { data, isLoading, isError } = useWatchList();

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error!</>;

  return (
    <div className="grid grid-cols-4 gap-4">
      {data?.results.map((movie) => (
        <div key={movie.id}>
          <img src={getPosterUrl(movie.poster_path)} alt={movie.title} />
        </div>
      ))}
    </div>
  );
};
