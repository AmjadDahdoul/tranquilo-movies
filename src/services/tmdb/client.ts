import { ENV } from "@/config/env";

export async function tmdbClient<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${ENV.BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ENV.API_KEY}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`TMDB Error: ${res.status}`);
  }

  return res.json();
}
