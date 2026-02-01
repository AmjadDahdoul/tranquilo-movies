import { useState } from "react";
import { BookmarkPlus, FolderPlus, Trash2, Loader2, Check } from "lucide-react";

import { useAddToWatchlist } from "../hooks/useAddToWatchlist";
import { useUpdateList } from "../hooks/useAddMovieToList";
import { useItemStatus } from "../hooks/useItemStatus";
import { useWatchlistStatus } from "../hooks/useWatchlistStatus";
import { useMoveMovie } from "../hooks/useMoveMovie";
import { useAddToWatchedList } from "../hooks/useAddToWatchedList";
import { ActionType } from "@/routes/enum/ActionType";
import { ListType } from "@/routes/enum/ListType";
import { ENV } from "@/config/env";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  const { mutate: addToWatchedList, isPending: addToWatchedPending } =
    useAddToWatchedList();

  const isInStashList = stashListStatus?.item_present;
  const isInWatchlist = watchlistStatus?.watchlist;

  const handleMoveToWatchlist = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    setIsMoving(true);
    try {
      await moveToWatchlist(movieId, isInStashList || false);
    } finally {
      setIsMoving(false);
    }
  };

  const handleMoveToStashList = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    setIsMoving(true);
    try {
      await moveToStashList(movieId);
    } finally {
      setIsMoving(false);
    }
  };

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex items-center gap-2">
        {listType === ListType.STASHLIST && (
          <>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="default"
                  onClick={() => addToWatchedList(movieId)}
                  disabled={addToWatchedPending}
                  aria-label="Mark as watched"
                >
                  {addToWatchedPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mark as Watched</TooltipContent>
            </Tooltip>
            {!isInWatchlist && (
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={handleMoveToWatchlist}
                    disabled={isMoving || removeStashPending}
                    aria-label="Move to watchlist"
                  >
                    {isMoving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <BookmarkPlus className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Move to Watchlist</TooltipContent>
              </Tooltip>
            )}

            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => removeFromStashList(movieId)}
                  disabled={removeStashPending}
                  aria-label="Remove from stash"
                >
                  {removeStashPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Remove from Stash</TooltipContent>
            </Tooltip>
          </>
        )}

        {listType === ListType.WATCHLIST && (
          <>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="default"
                  onClick={() => addToWatchedList(movieId)}
                  disabled={addToWatchedPending}
                  aria-label="Mark as watched"
                >
                  {addToWatchedPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mark as Watched</TooltipContent>
            </Tooltip>
            {!isInStashList && (
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={handleMoveToStashList}
                    disabled={isMoving || watchlistPending}
                    aria-label="Move to stash"
                  >
                    {isMoving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <FolderPlus className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Move to Stash</TooltipContent>
              </Tooltip>
            )}

            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => updateWatchlist({ movieId, watchlist: false })}
                  disabled={watchlistPending}
                  aria-label="Remove from watchlist"
                >
                  {watchlistPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Remove from Watchlist</TooltipContent>
            </Tooltip>
          </>
        )}
      </div>
    </TooltipProvider>
  );
};
