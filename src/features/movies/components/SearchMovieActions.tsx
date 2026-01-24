import { useAddToWatchlist } from "../hooks/useAddToWatchlist";
import { useUpdateList } from "../hooks/useAddMovieToList";
import { useItemStatus } from "../hooks/useItemStatus";
import { useWatchlistStatus } from "../hooks/useWatchlistStatus";
import { ActionType } from "@/routes/enum/ActionType";
import { ListType } from "@/routes/enum/ListType";
import { ENV } from "@/config/env";

interface SearchMovieActionsProps {
  movieId: number;
}

export const SearchMovieActions = ({ movieId }: SearchMovieActionsProps) => {
  const { data: stashListStatus } = useItemStatus(ENV.STASH_LIST_ID, movieId);
  const { data: watchlistStatus } = useWatchlistStatus(movieId);
  const { mutate: updateWatchlist, isPending: watchlistPending } =
    useAddToWatchlist();

  const { mutate: addToStashList, isPending: addStashPending } = useUpdateList(
    ENV.STASH_LIST_ID,
    ActionType.ADD,
    ListType.STASHLIST,
  );

  const isInStashList = stashListStatus?.item_present;
  const isInWatchlist = watchlistStatus?.watchlist;

  const handleAddToWatchlist = () => {
    updateWatchlist({ movieId, watchlist: true });
  };

  const handleAddToStashList = () => {
    addToStashList(movieId);
  };

  if (isInStashList && isInWatchlist) {
    return (
      <div className="p-2 text-center text-sm text-green-400">
        Already in both lists
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {!isInWatchlist && (
        <button
          onClick={handleAddToWatchlist}
          disabled={watchlistPending}
          className="rounded-lg bg-blue-600 hover:bg-blue-700 p-2 cursor-pointer text-white text-sm disabled:opacity-50"
        >
          {watchlistPending ? "Adding..." : "Add to Watchlist"}
        </button>
      )}
      {!isInStashList && (
        <button
          onClick={handleAddToStashList}
          disabled={addStashPending}
          className="rounded-lg bg-orange-600 hover:bg-orange-700 p-2 cursor-pointer text-white text-sm disabled:opacity-50"
        >
          {addStashPending ? "Adding..." : "Add to Stash"}
        </button>
      )}
    </div>
  );
};
