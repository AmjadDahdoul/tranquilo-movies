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

// ---
export type TmdbItemStatusResponse = {
  id: number;
  item_present: boolean;
};

// ---
export interface TmdbAddToWatchlistBody {
  media_type: "movie" | "tv";
  media_id: number;
  watchlist: boolean;
}

export interface TmdbAddToWatchlistResponse {
  status_code: number;
  status_message: string;
  success: boolean;
}

// ---

export type TmdbAccountStatesResponse = {
  id: number;
  favorite: boolean;
  watchlist: boolean;
  rated:
    | boolean
    | {
        value: number;
      };
};

// ---
export type TmdbMovieDetails = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: TmdbBelongsToCollection | null;
  budget: number;
  genres: TmdbGenre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: TmdbProductionCompany[];
  production_countries: TmdbProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: TmdbSpokenLanguage[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TmdbBelongsToCollection = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
};

export type TmdbGenre = {
  id: number;
  name: string;
};

export type TmdbProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

export type TmdbProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type TmdbSpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};
