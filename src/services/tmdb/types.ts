// ---
export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

export type MovieListResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
};

// ---
export type TmdbListDetails = {
  id: number;
  name: string;
  description: string;
  iso_639_1: string;
  iso_3166_1: string;
  created_by: string;
  favorite_count: number;
  item_count: number;
  poster_path: string | null;
  backdrop_path: string | null;

  items: TmdbListItem[];

  page: number;
  total_pages: number;
  total_results: number;
};

export type TmdbListItem = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  media_type: "movie";

  release_date: string;
  vote_average: number;
  vote_count: number;

  popularity: number;
  adult: boolean;
  original_language: string;

  genre_ids: number[];
};

// ---
export type TmdbWatchlistMoviesResponse = {
  page: number;
  results: TmdbWatchlistMovie[];
  total_pages: number;
  total_results: number;
};

export type TmdbWatchlistMovie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
