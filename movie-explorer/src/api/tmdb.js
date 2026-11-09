// Thin wrapper around The Movie Database (TMDB) REST API.
// All calls use fetch + async/await and return parsed JSON.

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const IMG_BASE = "https://image.tmdb.org/t/p";

export const posterUrl = (path, size = "w342") =>
  path ? `${IMG_BASE}/${size}${path}` : null;

export const backdropUrl = (path, size = "w1280") =>
  path ? `${IMG_BASE}/${size}${path}` : null;

export const hasApiKey = Boolean(API_KEY);

async function request(endpoint, params = {}, signal) {
  if (!API_KEY) {
    throw new Error(
      "Missing TMDB API key. Set VITE_TMDB_API_KEY (see README)."
    );
  }

  const query = new URLSearchParams({
    api_key: API_KEY,
    language: "en-US",
    ...params,
  });

  const response = await fetch(`${BASE_URL}${endpoint}?${query}`, { signal });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Invalid TMDB API key.");
    }
    if (response.status === 404) {
      throw new Error("We couldn't find what you were looking for.");
    }
    throw new Error(`Request failed (${response.status}). Please try again.`);
  }

  return response.json();
}

export const getMovieList = (category = "popular", page = 1, signal) =>
  category === "trending"
    ? request("/trending/movie/week", { page }, signal)
    : request(`/movie/${category}`, { page }, signal);

export const searchMovies = (query, page = 1, signal) =>
  request("/search/movie", { query, page, include_adult: false }, signal);

export const getMovieDetails = (id, signal) =>
  request(`/movie/${id}`, { append_to_response: "credits,videos,similar" }, signal);

export const getGenres = (signal) => request("/genre/movie/list", {}, signal);

export const discoverMovies = (params, signal) =>
  request("/discover/movie", params, signal);
