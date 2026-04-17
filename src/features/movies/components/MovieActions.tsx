import { useState } from "react";
import { BookmarkPlus, Layers, Loader2, CircleCheck, X } from "lucide-react";
import { useAddToWatchlist } from "../hooks/useAddToWatchlist";
import { useUpdateList } from "../hooks/useAddMovieToList";
import { useItemStatus } from "../hooks/useItemStatus";
import { useWatchlistStatus } from "../hooks/useWatchlistStatus";
import { useMoveMovie } from "../hooks/useMoveMovie";
import { useAddToWatchedList } from "../hooks/useAddToWatchedList";
import { useRemoveFromWatchedList } from "../hooks/useRemoveFromWatchedList";
import { canRemoveWatched } from "../hooks/watchedTimestamps";
import { ActionType } from "@/routes/enum/ActionType";
import { ListType } from "@/routes/enum/ListType";
import { ENV } from "@/config/env";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MovieActionsProps {
  movieId: number;
  listType: string;
  showLabels?: boolean;
}

const ActionBtn = ({
  onClick,
  disabled,
  className,
  label,
  children,
  showLabel,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className: string;
  label: string;
  children: React.ReactNode;
  showLabel?: boolean;
}) => (
  <Tooltip delayDuration={300}>
    <TooltipTrigger asChild>
      <button
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        className={
          showLabel
            ? `h-7 w-7 sm:h-auto sm:w-full sm:px-2.5 sm:py-1 rounded-full border flex items-center justify-center sm:justify-start sm:gap-1.5 cursor-pointer transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed ${className}`
            : `h-[26px] flex-1 rounded-[5px] border flex items-center justify-center cursor-pointer transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed ${className}`
        }
      >
        {children}
        {showLabel && (
          <span className="hidden sm:inline text-[11px] font-medium leading-none whitespace-nowrap">
            {label}
          </span>
        )}
      </button>
    </TooltipTrigger>
    {!showLabel && <TooltipContent>{label}</TooltipContent>}
  </Tooltip>
);

export const MovieActions = ({
  movieId,
  listType,
  showLabels,
}: MovieActionsProps) => {
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
  const { mutate: removeFromWatchedList, isPending: removePending } =
    useRemoveFromWatchedList();

  const isInStashList = stashListStatus?.item_present;
  const isInWatchlist = watchlistStatus?.watchlist;
  const canRemove = canRemoveWatched(movieId);

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

  const handleMarkAsWatched = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addToWatchedList(movieId);
  };

  const handleRemoveFromWatched = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeFromWatchedList(movieId);
  };

  const spinnerOrIcon = (pending: boolean, Icon: React.ElementType) =>
    pending ? (
      <Loader2 className="h-3 w-3 animate-spin" />
    ) : (
      <Icon className="h-3 w-3" />
    );

  return (
    <TooltipProvider delayDuration={150}>
      <div
        className={
          showLabels
            ? "flex gap-1 sm:flex-col sm:gap-1.5"
            : "flex items-center gap-1"
        }
      >
        {listType === ListType.STASHLIST && (
          <>
            <ActionBtn
              onClick={handleMarkAsWatched}
              disabled={addToWatchedPending}
              className="bg-success/10 text-success border-success/30"
              label="Mark as Watched"
              showLabel={showLabels}
            >
              {spinnerOrIcon(addToWatchedPending, CircleCheck)}
            </ActionBtn>
            {!isInWatchlist && (
              <ActionBtn
                onClick={handleMoveToWatchlist}
                disabled={isMoving || removeStashPending}
                className="bg-primary/10 text-primary border-primary/30"
                label="Move to Watchlist"
                showLabel={showLabels}
              >
                {spinnerOrIcon(isMoving, BookmarkPlus)}
              </ActionBtn>
            )}
            <ActionBtn
              onClick={(e) => {
                e.stopPropagation();
                removeFromStashList(movieId);
              }}
              disabled={removeStashPending}
              className="bg-destructive/10 text-destructive border-destructive/30"
              label="Remove from Stash"
              showLabel={showLabels}
            >
              {spinnerOrIcon(removeStashPending, X)}
            </ActionBtn>
          </>
        )}

        {listType === ListType.WATCHLIST && (
          <>
            <ActionBtn
              onClick={handleMarkAsWatched}
              disabled={addToWatchedPending}
              className="bg-success/10 text-success border-success/30"
              label="Mark as Watched"
              showLabel={showLabels}
            >
              {spinnerOrIcon(addToWatchedPending, CircleCheck)}
            </ActionBtn>
            {!isInStashList && (
              <ActionBtn
                onClick={handleMoveToStashList}
                disabled={isMoving || watchlistPending}
                className="bg-[color:var(--stash)]/10 text-[color:var(--stash)] border-[color:var(--stash)]/30"
                label="Move to Stash"
                showLabel={showLabels}
              >
                {spinnerOrIcon(isMoving, Layers)}
              </ActionBtn>
            )}
            <ActionBtn
              onClick={(e) => {
                e.stopPropagation();
                updateWatchlist({ movieId, watchlist: false });
              }}
              disabled={watchlistPending}
              className="bg-destructive/10 text-destructive border-destructive/30"
              label="Remove from Watchlist"
              showLabel={showLabels}
            >
              {spinnerOrIcon(watchlistPending, X)}
            </ActionBtn>
          </>
        )}

        {listType === ListType.WATCHEDLIST && canRemove && (
          <ActionBtn
            onClick={handleRemoveFromWatched}
            disabled={removePending}
            className="bg-destructive/10 text-destructive border-destructive/30"
            label="Remove from Watched"
            showLabel={showLabels}
          >
            {spinnerOrIcon(removePending, X)}
          </ActionBtn>
        )}
      </div>
    </TooltipProvider>
  );
};
