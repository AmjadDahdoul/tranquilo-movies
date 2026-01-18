import type { updateAction } from "@/services/tmdb/movies";
import { useUpdateList } from "../hooks/useAddMovieToList";
import { ENV } from "@/config/env";
import { useItemStatus } from "../hooks/useItemStatus";

interface UpdateMovieButtonProps {
  movieId: number;
  action?: updateAction;
  lable?: string;
}

export function UpdateMovieButton(props: UpdateMovieButtonProps) {
  const { movieId } = props;
  const LIST_ID = ENV.STASH_LIST_ID;

  const { data } = useItemStatus(LIST_ID, movieId);

  const movieInList: updateAction = data?.item_present
    ? "remove_item"
    : "add_item";

  const { mutate, isPending } = useUpdateList(LIST_ID, movieInList);

  return (
    <button onClick={() => mutate(movieId)} disabled={isPending}>
      {isPending
        ? data?.item_present
          ? "Removing..."
          : "Adding..."
        : data?.item_present
          ? "Remove from list"
          : "Add to list"}
    </button>
  );
}
