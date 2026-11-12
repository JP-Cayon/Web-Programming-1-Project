import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const STORAGE_KEY = "movie-explorer:favorites";
const FavoritesContext = createContext(null);

function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      /* storage unavailable: favorites just won't persist */
    }
  }, [favorites]);

  const isFavorite = useCallback(
    (id) => favorites.some((m) => m.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (movie) => {
      const exists = favorites.some((m) => m.id === movie.id);
      if (exists) {
        setFavorites((prev) => prev.filter((m) => m.id !== movie.id));
        toast.info(`Removed "${movie.title}" from favorites`);
      } else {
        // Store only what the cards need, to keep localStorage small.
        const slim = {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          overview: movie.overview,
        };
        setFavorites((prev) => [slim, ...prev]);
        toast.success(`Added "${movie.title}" to favorites`);
      }
    },
    [favorites]
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    toast.info("Favorites cleared");
  }, []);

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, clearFavorites }),
    [favorites, isFavorite, toggleFavorite, clearFavorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
