function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing env variable: ${name}`);
  }
  return value;
}

export const ENV = {
  API_KEY: required(import.meta.env.VITE_TMDB_API_KEY, "VITE_TMDB_API_KEY"),

  BASE_URL: required(import.meta.env.VITE_TMDB_BASE_URL, "VITE_TMDB_BASE_URL"),

  WATCHED_LIST_ID: Number(
    required(
      import.meta.env.VITE_TMDB_WATCHED_LIST_ID,
      "VITE_TMDB_WATCHED_LIST_ID",
    ),
  ),

  STASH_LIST_ID: Number(
    required(
      import.meta.env.VITE_TMDB_STASH_LIST_ID,
      "VITE_TMDB_STASH_LIST_ID",
    ),
  ),

  ACCOUNT_ID: Number(
    required(import.meta.env.VITE_TMDB_ACCOUNT_ID, "VITE_TMDB_ACCOUNT_ID"),
  ),
} as const;
