const IMAGE_BASE = "https://image.tmdb.org/t/p";

export function getPosterUrl(
  path: string | null,
  size: "w200" | "w300" | "w500" | "original" = "w500",
) {
  if (!path) return "/placeholder.jpg"; // to-do

  return `${IMAGE_BASE}/${size}${path}`;
}
