import { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { getMovieList } from "../api/tmdb";
import useFetch from "../hooks/useFetch";
import MovieGrid from "../components/MovieGrid";
import PageControls from "../components/PageControls";
import { ApiKeyWarning, EmptyState, ErrorMessage, Loader } from "../components/Status";

const CATEGORIES = [
  { key: "trending", label: "Trending" },
  { key: "popular", label: "Popular" },
  { key: "top_rated", label: "Top Rated" },
  { key: "now_playing", label: "In Theaters" },
  { key: "upcoming", label: "Upcoming" },
];

export default function Home() {
  const [category, setCategory] = useState("trending");
  const [page, setPage] = useState(1);

  const { data, loading, error } = useFetch(
    (signal) => getMovieList(category, page, signal),
    [category, page]
  );

  const selectCategory = (key) => {
    setCategory(key);
    setPage(1);
  };

  return (
    <Container className="py-4">
      <h1 className="h3 mb-1">Discover movies</h1>
      <p className="text-muted">Browse what's trending, popular and coming soon.</p>
      <ApiKeyWarning />

      <Nav variant="pills" className="mb-4 flex-nowrap overflow-auto category-pills" activeKey={category}>
        {CATEGORIES.map((c) => (
          <Nav.Item key={c.key}>
            <Nav.Link eventKey={c.key} onClick={() => selectCategory(c.key)} className="text-nowrap">
              {c.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {loading && <Loader label="Loading movies..." />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && data && (
        <>
          {data.results.length === 0 ? (
            <EmptyState title="No movies found" />
          ) : (
            <MovieGrid movies={data.results} />
          )}
          <PageControls
            page={page}
            totalPages={data.total_pages}
            onChange={(p) => {
              setPage(p);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </>
      )}
    </Container>
  );
}
