import { Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { posterUrl } from "../api/tmdb";
import { useFavorites } from "../context/FavoritesContext";

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(movie.id);
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";
  const poster = posterUrl(movie.poster_path);

  return (
    <Card className="h-100 movie-card shadow-sm border-0">
      <Link to={`/movie/${movie.id}`} className="poster-wrap">
        {poster ? (
          <Card.Img variant="top" src={poster} alt={`${movie.title} poster`} loading="lazy" />
        ) : (
          <div className="poster-fallback">No poster</div>
        )}
        {movie.vote_average > 0 && (
          <Badge bg="dark" className="rating-badge">
            <FaStar className="text-warning me-1" />
            {movie.vote_average.toFixed(1)}
          </Badge>
        )}
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h6" className="mb-1">
          <Link to={`/movie/${movie.id}`} className="text-decoration-none text-reset stretched-title">
            {movie.title}
          </Link>
        </Card.Title>
        <Card.Subtitle className="text-muted small mb-3">{year}</Card.Subtitle>
        <Button
          variant={fav ? "danger" : "outline-danger"}
          size="sm"
          className="mt-auto d-flex align-items-center justify-content-center gap-2"
          onClick={() => toggleFavorite(movie)}
          aria-pressed={fav}
        >
          {fav ? <FaHeart /> : <FaRegHeart />}
          {fav ? "Saved" : "Save"}
        </Button>
      </Card.Body>
    </Card>
  );
}
