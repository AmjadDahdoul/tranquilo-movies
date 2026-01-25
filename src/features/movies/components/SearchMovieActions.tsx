import { BookmarkPlus, FolderPlus, Loader2, Trash2 } from "lucide-react";

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

  const isInStashList = stashListStatus?.item_present;
  const isInWatchlist = watchlistStatus?.watchlist;

  const { mutate: updateWatchlist, isPending: watchlistPending } =
    useAddToWatchlist();

  const { mutate: updateStashList, isPending: addStashPending } = useUpdateList(
    ENV.STASH_LIST_ID,
    !isInStashList ? ActionType.ADD : ActionType.REMOVE,
    ListType.STASHLIST,
  );

  const handleToggleWatchlist = () => {
    updateWatchlist({
      movieId,
      watchlist: !isInWatchlist,
    });
  };

  const handleToggleStashList = () => {
    updateStashList(movieId);
  };

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex items-center justify-center gap-2">
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant={!isInWatchlist ? "default" : "destructive"}
              onClick={handleToggleWatchlist}
              disabled={watchlistPending}
              aria-label="Add to watchlist"
            >
              {watchlistPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {!isInWatchlist ? (
                    <BookmarkPlus className="h-4 w-4" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {!isInWatchlist ? "Add to Watchlist" : "Remove from Watchlist"}
          </TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant={!isInStashList ? "secondary" : "destructive"}
              onClick={handleToggleStashList}
              disabled={addStashPending}
              aria-label="Add to stash"
            >
              {addStashPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {!isInStashList ? (
                    <FolderPlus className="h-4 w-4" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {!isInStashList ? "Add to Stash" : "Remove from Stash"}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
