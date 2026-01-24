import { useAddToWatchlist } from "../hooks/useAddToWatchlist";
import { useWatchlistStatus } from "../hooks/useWatchlistStatus";

interface AddToWatchlistButtonProps {
  movieId: number;
}

export const AddToWatchlistButton = (props: AddToWatchlistButtonProps) => {
  const { movieId } = props;

  const { mutate, isPending } = useAddToWatchlist();

  const { data } = useWatchlistStatus(movieId);

  const isInWatchlist = data?.watchlist;

  const handleMovieClick = () => {
    mutate({ movieId, watchlist: !isInWatchlist });
  };

  return (
    <button
      className="rounded-lg bg-primary p-2 cursor-pointer"
      onClick={handleMovieClick}
    >
      {isPending
        ? "loading..."
        : isInWatchlist
          ? "Remove from watchlist"
          : "Add to watchlist"}
    </button>
  );
};
