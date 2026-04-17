import { BookmarkPlus, Layers, Loader2, BookmarkX, X } from "lucide-react";
import { useAddToWatchlist } from "../hooks/useAddToWatchlist";
import { useUpdateList } from "../hooks/useAddMovieToList";
import { useItemStatus } from "../hooks/useItemStatus";
import { useWatchlistStatus } from "../hooks/useWatchlistStatus";
import { ActionType } from "@/routes/enum/ActionType";
import { ListType } from "@/routes/enum/ListType";
import { ENV } from "@/config/env";
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

  const handleToggleWatchlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    updateWatchlist({ movieId, watchlist: !isInWatchlist });
  };

  const handleToggleStashList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    updateStashList(movieId);
  };

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex items-center gap-1">
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <button
              onClick={handleToggleWatchlist}
              disabled={watchlistPending}
              aria-label={
                isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"
              }
              className={`h-[26px] flex-1 rounded-[5px] border flex items-center justify-center cursor-pointer transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed ${
                isInWatchlist
                  ? "bg-destructive/10 text-destructive border-destructive/30"
                  : "bg-primary/10 text-primary border-primary/30"
              }`}
            >
              {watchlistPending ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : isInWatchlist ? (
                <BookmarkX className="h-3 w-3" />
              ) : (
                <BookmarkPlus className="h-3 w-3" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <button
              onClick={handleToggleStashList}
              disabled={addStashPending}
              aria-label={isInStashList ? "Remove from Stash" : "Add to Stash"}
              className={`h-[26px] flex-1 rounded-[5px] border flex items-center justify-center cursor-pointer transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed ${
                isInStashList
                  ? "bg-destructive/10 text-destructive border-destructive/30"
                  : "bg-[color:var(--stash)]/10 text-[color:var(--stash)] border-[color:var(--stash)]/30"
              }`}
            >
              {addStashPending ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : isInStashList ? (
                <X className="h-3 w-3" />
              ) : (
                <Layers className="h-3 w-3" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            {isInStashList ? "Remove from Stash" : "Add to Stash"}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
