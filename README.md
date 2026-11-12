# Movie Explorer

Search movies, browse what's trending, read details (cast, trailer, facts) and save favorites. Built with React and the TMDB REST API.

## Screens

| Route | Purpose |
| --- | --- |
| `/` Discover | Browse Trending / Popular / Top Rated / In Theaters / Upcoming with pagination |
| `/search` | Debounced live search; the query is kept in the URL (`?q=`) |
| `/movie/:id` | Details: backdrop, genres, runtime, cast, trailer, facts, similar movies |
| `/favorites` | Saved movies (localStorage) with filter, sort and clear-all |

## Tech

- **React 18** (components, hooks, context) built with **Vite**
- **react-router-dom** for navigation (HashRouter, so deep links work on GitHub Pages)
- **Style libraries:** Bootstrap 5 + React-Bootstrap, react-icons
- **Functionality libraries:** react-router-dom, use-debounce (search), react-toastify (notifications)
- **API:** [TMDB](https://www.themoviedb.org/documentation/api) REST API via `fetch` and `async/await`, with `AbortController` to cancel stale requests




## Project structure

```
src/
  api/tmdb.js            fetch wrapper + endpoints
  context/               FavoritesContext (localStorage persistence)
  hooks/useFetch.js      async loading/error state with cancellation
  components/            NavBar, MovieCard, MovieGrid, PageControls, Status
  pages/                 Home, Search, MovieDetails, Favorites, NotFound
```
