import { useMemo, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import MovieGrid from "../components/MovieGrid";
import { EmptyState } from "../components/Status";

const SORTS = {
  added: { label: "Recently added", fn: () => 0 }, // array is already newest-first
  title: { label: "Title (A-Z)", fn: (a, b) => a.title.localeCompare(b.title) },
  rating: { label: "Rating (high to low)", fn: (a, b) => b.vote_average - a.vote_average },
  year: { label: "Release date (newest)", fn: (a, b) => (b.release_date || "").localeCompare(a.release_date || "") },
};

export default function Favorites() {
  const { favorites, clearFavorites } = useFavorites();
  const [sort, setSort] = useState("added");
  const [filter, setFilter] = useState("");
  const [confirm, setConfirm] = useState(false);

  const visible = useMemo(() => {
    const term = filter.trim().toLowerCase();
    return favorites
      .filter((m) => m.title.toLowerCase().includes(term))
      .sort(SORTS[sort].fn);
  }, [favorites, sort, filter]);

  return (
    <Container className="py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
        <div>
          <h1 className="h3 mb-1">My favorites</h1>
          <p className="text-muted mb-0">
            {favorites.length} saved movie{favorites.length === 1 ? "" : "s"} (stored in this browser)
          </p>
        </div>
        {favorites.length > 0 && (
          <div className="d-flex flex-wrap gap-2">
            <Form.Control
              type="search"
              placeholder="Filter by title"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label="Filter favorites"
              style={{ width: 180 }}
            />
            <Form.Select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort favorites" style={{ width: 210 }}>
              {Object.entries(SORTS).map(([key, s]) => (
                <option key={key} value={key}>{s.label}</option>
              ))}
            </Form.Select>
            <Button variant="outline-danger" onClick={() => setConfirm(true)}>Clear all</Button>
          </div>
        )}
      </div>

      {favorites.length === 0 ? (
        <EmptyState title="No favorites yet">
          Find something you like on <Link to="/">Discover</Link> or <Link to="/search">Search</Link> and hit Save.
        </EmptyState>
      ) : visible.length === 0 ? (
        <EmptyState title="No favorites match that filter" />
      ) : (
        <MovieGrid movies={visible} />
      )}

      <Modal show={confirm} onHide={() => setConfirm(false)} centered>
        <Modal.Header closeButton><Modal.Title>Clear all favorites?</Modal.Title></Modal.Header>
        <Modal.Body>This removes all {favorites.length} saved movies. It can't be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirm(false)}>Cancel</Button>
          <Button
            variant="danger"
            onClick={() => {
              clearFavorites();
              setConfirm(false);
            }}
          >
            Clear all
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
