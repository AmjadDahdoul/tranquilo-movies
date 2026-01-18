import type { updateAction } from "@/services/tmdb/movies";
import { useUpdateList } from "../hooks/useAddMovieToList";

interface UpdateMovieButtonProps {
  movieId: number;
  action: updateAction;
  lable: string;
}

export function UpdateMovieButton(props: UpdateMovieButtonProps) {
  const { movieId, action, lable } = props;
  const LIST_ID = Number(import.meta.env.VITE_TMDB_STASH_LIST_ID);

  const { mutate, isPending } = useUpdateList(LIST_ID, action);

  return (
    <button onClick={() => mutate(movieId)} disabled={isPending}>
      {isPending ? "Adding..." : `${lable}`}
    </button>
  );
}
