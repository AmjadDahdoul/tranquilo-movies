const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export async function tmdbClient<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`TMDB Error: ${res.status}`);
  }

  return res.json();
}
