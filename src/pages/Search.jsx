import { useState } from "react";
import { Container, Form, InputGroup } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { FaSearch } from "react-icons/fa";
import { searchMovies } from "../api/tmdb";
import useFetch from "../hooks/useFetch";
import MovieGrid from "../components/MovieGrid";
import PageControls from "../components/PageControls";
import { ApiKeyWarning, EmptyState, ErrorMessage, Loader } from "../components/Status";

export default function Search() {
  // The query lives in the URL (?q=...) so searches can be shared/bookmarked.
  const [params, setParams] = useSearchParams();
  const [text, setText] = useState(params.get("q") ?? "");
  const [page, setPage] = useState(1);
  const [query] = useDebounce(text.trim(), 500);

  const { data, loading, error } = useFetch(
    async (signal) => (query ? searchMovies(query, page, signal) : null),
    [query, page]
  );

  const onChange = (e) => {
    const value = e.target.value;
    setText(value);
    setPage(1);
    setParams(value.trim() ? { q: value.trim() } : {}, { replace: true });
  };

  return (
    <Container className="py-4">
      <h1 className="h3 mb-3">Search</h1>
      <ApiKeyWarning />

      <Form onSubmit={(e) => e.preventDefault()} className="mb-4">
        <InputGroup size="lg">
          <InputGroup.Text><FaSearch /></InputGroup.Text>
          <Form.Control
            type="search"
            placeholder="Search for a movie title..."
            value={text}
            onChange={onChange}
            aria-label="Search movies"
            autoFocus
          />
        </InputGroup>
      </Form>

      {!query && (
        <EmptyState title="Start typing to search">
          Try "Inception", "Spirited Away" or "Alien".
        </EmptyState>
      )}
      {query && loading && <Loader label={`Searching for "${query}"...`} />}
      {error && <ErrorMessage message={error} />}
      {query && !loading && !error && data && (
        <>
          <p className="text-muted">
            {data.total_results.toLocaleString()} result{data.total_results === 1 ? "" : "s"} for "{query}"
          </p>
          {data.results.length === 0 ? (
            <EmptyState title="No matches">Check the spelling or try a different title.</EmptyState>
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
