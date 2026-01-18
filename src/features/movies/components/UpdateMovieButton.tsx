import type { updateAction } from "@/services/tmdb/movies";
import { useUpdateList } from "../hooks/useAddMovieToList";
import { ENV } from "@/config/env";

interface UpdateMovieButtonProps {
  movieId: number;
  action: updateAction;
  lable: string;
}

export function UpdateMovieButton(props: UpdateMovieButtonProps) {
  const { movieId, action, lable } = props;
  const LIST_ID = ENV.STASH_LIST_ID;

  const { mutate, isPending } = useUpdateList(LIST_ID, action);

  return (
    <button onClick={() => mutate(movieId)} disabled={isPending}>
      {isPending ? "Adding..." : `${lable}`}
    </button>
  );
}
