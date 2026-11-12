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

## Run locally

1. Get a free API key at https://www.themoviedb.org/settings/api (the "API Key (v3 auth)" value).
2. Copy `.env.example` to `.env` and paste the key.
3. ```bash
   npm install
   npm run dev
   ```

## Deploy to GitHub Pages

1. Create a GitHub repo and push this project to its `main` branch.
2. In the repo go to **Settings > Secrets and variables > Actions > New repository secret**. Name it `VITE_TMDB_API_KEY` and paste your TMDB key.
3. Go to **Settings > Pages** and set **Source** to **GitHub Actions**.
4. Push to `main` (or run the workflow manually from the Actions tab). The site will be live at `https://<your-username>.github.io/<repo-name>/`.

Note: a TMDB v3 key used in a client-side app is visible in the built JavaScript. That is normal for TMDB (keys are free and rate-limited), but don't reuse a key that matters elsewhere.

## Project structure

```
src/
  api/tmdb.js            fetch wrapper + endpoints
  context/               FavoritesContext (localStorage persistence)
  hooks/useFetch.js      async loading/error state with cancellation
  components/            NavBar, MovieCard, MovieGrid, PageControls, Status
  pages/                 Home, Search, MovieDetails, Favorites, NotFound
```
