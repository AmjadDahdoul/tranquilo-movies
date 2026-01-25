import { BookmarkPlus, FolderPlus, Loader2 } from "lucide-react";

import { useAddToWatchlist } from "../hooks/useAddToWatchlist";
import { useUpdateList } from "../hooks/useAddMovieToList";
import { useItemStatus } from "../hooks/useItemStatus";
import { useWatchlistStatus } from "../hooks/useWatchlistStatus";
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

  if (isInStashList && isInWatchlist) {
    return (
      <div className="p-2 text-center text-sm text-green-400">
        Already in both lists
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex items-center justify-center gap-2">
        {!isInWatchlist && (
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="default"
                onClick={() => updateWatchlist({ movieId, watchlist: true })}
                disabled={watchlistPending}
                aria-label="Add to watchlist"
              >
                {watchlistPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <BookmarkPlus className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add to Watchlist</TooltipContent>
          </Tooltip>
        )}

        {!isInStashList && (
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                onClick={() => addToStashList(movieId)}
                disabled={addStashPending}
                aria-label="Add to stash"
              >
                {addStashPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FolderPlus className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add to Stash</TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};
