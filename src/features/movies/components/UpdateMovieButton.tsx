import type { updateAction } from "@/services/tmdb/movies";
import { useUpdateList } from "../hooks/useAddMovieToList";
import { ENV } from "@/config/env";
import { useItemStatus } from "../hooks/useItemStatus";
import { ActionType } from "@/routes/enum/ActionType";
import { ListType } from "@/routes/enum/ListType";

interface UpdateMovieButtonProps {
  movieId: number;
  action?: updateAction;
  lable?: string;
  listType?: string;
}

export function UpdateMovieButton(props: UpdateMovieButtonProps) {
  const { movieId, listType } = props;
  const LIST_ID = ENV.STASH_LIST_ID;

  const type =
    listType !== ListType.WATCHLIST ? ListType.WATCHLIST : ListType.STASHLIST;

  const { data } = useItemStatus(LIST_ID, movieId);

  const movieInList: updateAction = data?.item_present
    ? ActionType.REMOVE
    : ActionType.ADD;

  const { mutate, isPending } = useUpdateList(LIST_ID, movieInList, type);

  return (
    <button
      onClick={() => mutate(movieId)}
      disabled={isPending}
      className="rounded-lg bg-primary p-2 cursor-pointer"
    >
      {isPending
        ? data?.item_present
          ? "Removing..."
          : "Adding..."
        : data?.item_present
          ? "Remove from list"
          : `Add to ${type}`}
    </button>
  );
}
