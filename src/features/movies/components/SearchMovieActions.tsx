import { useAddToWatchlist } from "../hooks/useAddToWatchlist";
import { useUpdateList } from "../hooks/useAddMovieToList";
import { useItemStatus } from "../hooks/useItemStatus";
import { useWatchlistStatus } from "../hooks/useWatchlistStatus";
import { ActionType } from "@/routes/enum/ActionType";
import { ListType } from "@/routes/enum/ListType";
import { ENV } from "@/config/env";
import { Button } from "@/components/ui/button";

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
        <Button
          onClick={handleAddToWatchlist}
          disabled={watchlistPending}
          variant="default"
          size="default"
        >
          {watchlistPending ? "Adding..." : "Add to Watchlist"}
        </Button>
      )}
      {!isInStashList && (
        <Button
          onClick={handleAddToStashList}
          disabled={addStashPending}
          variant="secondary"
          size="default"
        >
          {addStashPending ? "Adding..." : "Add to Stash"}
        </Button>
      )}
    </div>
  );
};
