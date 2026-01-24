import { useState } from "react";
import { useAddToWatchlist } from "../hooks/useAddToWatchlist";
import { useUpdateList } from "../hooks/useAddMovieToList";
import { useItemStatus } from "../hooks/useItemStatus";
import { useWatchlistStatus } from "../hooks/useWatchlistStatus";
import { useMoveMovie } from "../hooks/useMoveMovie";
import { ActionType } from "@/routes/enum/ActionType";
import { ListType } from "@/routes/enum/ListType";
import { ENV } from "@/config/env";

interface MovieActionsProps {
  movieId: number;
  listType: string;
}

export const MovieActions = ({ movieId, listType }: MovieActionsProps) => {
  const [isMoving, setIsMoving] = useState(false);
  const { data: stashListStatus } = useItemStatus(ENV.STASH_LIST_ID, movieId);
  const { data: watchlistStatus } = useWatchlistStatus(movieId);
  const { mutate: updateWatchlist, isPending: watchlistPending } =
    useAddToWatchlist();
  const { moveToWatchlist, moveToStashList } = useMoveMovie();

  const { mutate: removeFromStashList, isPending: removeStashPending } =
    useUpdateList(ENV.STASH_LIST_ID, ActionType.REMOVE, ListType.STASHLIST);

  const isInStashList = stashListStatus?.item_present;
  const isInWatchlist = watchlistStatus?.watchlist;

  const handleMoveToWatchlist = async () => {
    setIsMoving(true);
    try {
      await moveToWatchlist(movieId, isInStashList || false);
    } catch (error) {
      console.error("Error moving to watchlist:", error);
    } finally {
      setIsMoving(false);
    }
  };

  const handleMoveToStashList = async () => {
    setIsMoving(true);
    try {
      await moveToStashList(movieId);
    } catch (error) {
      console.error("Error moving to stash list:", error);
    } finally {
      setIsMoving(false);
    }
  };

  const handleRemoveFromStashList = () => {
    removeFromStashList(movieId);
  };

  const handleRemoveFromWatchlist = () => {
    updateWatchlist({ movieId, watchlist: false });
  };

  if (listType === ListType.STASHLIST) {
    return (
      <div className="flex flex-col gap-2">
        {!isInWatchlist && (
          <button
            onClick={handleMoveToWatchlist}
            disabled={isMoving || removeStashPending}
            className="rounded-lg bg-blue-600 hover:bg-blue-700 p-2 cursor-pointer text-white text-sm disabled:opacity-50"
          >
            {isMoving || removeStashPending ? "Moving..." : "Move to Watchlist"}
          </button>
        )}
        <button
          onClick={handleRemoveFromStashList}
          disabled={removeStashPending}
          className="rounded-lg bg-red-600 hover:bg-red-700 p-2 cursor-pointer text-white text-sm disabled:opacity-50"
        >
          {removeStashPending ? "Removing..." : "Remove from Stash"}
        </button>
      </div>
    );
  }

  if (listType === ListType.WATCHLIST) {
    return (
      <div className="flex flex-col gap-2">
        {!isInStashList && (
          <button
            onClick={handleMoveToStashList}
            disabled={isMoving || watchlistPending}
            className="rounded-lg bg-orange-600 hover:bg-orange-700 p-2 cursor-pointer text-white text-sm disabled:opacity-50"
          >
            {isMoving || watchlistPending ? "Moving..." : "Move to Stash"}
          </button>
        )}
        <button
          onClick={handleRemoveFromWatchlist}
          disabled={watchlistPending}
          className="rounded-lg bg-red-600 hover:bg-red-700 p-2 cursor-pointer text-white text-sm disabled:opacity-50"
        >
          {watchlistPending ? "Removing..." : "Remove from Watchlist"}
        </button>
      </div>
    );
  }

  return null;
};
