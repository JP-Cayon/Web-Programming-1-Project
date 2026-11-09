import { Badge, Button, Col, Container, Image, Ratio, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaClock, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { backdropUrl, getMovieDetails, posterUrl } from "../api/tmdb";
import useFetch from "../hooks/useFetch";
import { useFavorites } from "../context/FavoritesContext";
import MovieGrid from "../components/MovieGrid";
import { ErrorMessage, Loader } from "../components/Status";

const formatRuntime = (min) => (min ? `${Math.floor(min / 60)}h ${min % 60}m` : null);
const formatMoney = (n) => (n ? `$${n.toLocaleString()}` : "N/A");

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const { data: movie, loading, error } = useFetch(
    (signal) => getMovieDetails(id, signal),
    [id]
  );

  if (loading) return <Loader label="Loading movie..." />;
  if (error) {
    return (
      <Container className="py-4">
        <ErrorMessage message={error} />
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-2" />Go back
        </Button>
      </Container>
    );
  }
  if (!movie) return null;

  const fav = isFavorite(movie.id);
  const backdrop = backdropUrl(movie.backdrop_path);
  const poster = posterUrl(movie.poster_path, "w500");
  const trailer = movie.videos?.results?.find((v) => v.site === "YouTube" && v.type === "Trailer");
  const director = movie.credits?.crew?.find((p) => p.job === "Director");
  const cast = movie.credits?.cast?.slice(0, 8) ?? [];
  const similar = movie.similar?.results?.slice(0, 5) ?? [];

  return (
    <>
      <div className="hero" style={backdrop ? { backgroundImage: `url(${backdrop})` } : undefined}>
        <div className="hero-overlay">
          <Container className="py-4 py-md-5">
            <Button variant="light" size="sm" className="mb-4" onClick={() => navigate(-1)}>
              <FaArrowLeft className="me-2" />Back
            </Button>
            <Row className="g-4 align-items-center">
              <Col xs={8} sm={5} md={3} className="mx-auto mx-md-0">
                {poster ? (
                  <Image src={poster} alt={`${movie.title} poster`} rounded fluid className="shadow-lg" />
                ) : (
                  <div className="poster-fallback rounded">No poster</div>
                )}
              </Col>
              <Col md={9} className="text-white">
                <h1 className="h2">
                  {movie.title}{" "}
                  {movie.release_date && (
                    <span className="fw-light opacity-75">({movie.release_date.slice(0, 4)})</span>
                  )}
                </h1>
                {movie.tagline && <p className="fst-italic opacity-75">{movie.tagline}</p>}
                <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                  <span><FaStar className="text-warning me-1" />{movie.vote_average.toFixed(1)} / 10</span>
                  {formatRuntime(movie.runtime) && (
                    <span><FaClock className="me-1" />{formatRuntime(movie.runtime)}</span>
                  )}
                </div>
                <div className="mb-3 d-flex flex-wrap gap-2">
                  {movie.genres.map((g) => (
                    <Badge key={g.id} bg="warning" text="dark">{g.name}</Badge>
                  ))}
                </div>
                <h2 className="h6 text-uppercase opacity-75">Overview</h2>
                <p>{movie.overview || "No overview available."}</p>
                <Button
                  variant={fav ? "danger" : "outline-light"}
                  onClick={() => toggleFavorite(movie)}
                  className="d-inline-flex align-items-center gap-2"
                >
                  {fav ? <FaHeart /> : <FaRegHeart />}
                  {fav ? "In your favorites" : "Add to favorites"}
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <Container className="py-4">
        <Row className="g-4">
          <Col lg={8}>
            {trailer && (
              <section className="mb-4">
                <h2 className="h5">Trailer</h2>
                <Ratio aspectRatio="16x9">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
                    title={`${movie.title} trailer`}
                    allowFullScreen
                  />
                </Ratio>
              </section>
            )}
            {cast.length > 0 && (
              <section>
                <h2 className="h5">Top cast</h2>
                <Row xs={2} sm={4} className="g-3">
                  {cast.map((p) => (
                    <Col key={p.credit_id}>
                      <div className="cast-card text-center">
                        {p.profile_path ? (
                          <Image
                            src={posterUrl(p.profile_path, "w185")}
                            alt={p.name}
                            roundedCircle
                            className="cast-photo"
                            loading="lazy"
                          />
                        ) : (
                          <div className="cast-photo cast-fallback" />
                        )}
                        <div className="small fw-semibold mt-2">{p.name}</div>
                        <div className="small text-muted">{p.character}</div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </section>
            )}
          </Col>
          <Col lg={4}>
            <h2 className="h5">Facts</h2>
            <dl className="facts">
              <dt>Director</dt><dd>{director?.name ?? "N/A"}</dd>
              <dt>Release date</dt><dd>{movie.release_date || "N/A"}</dd>
              <dt>Status</dt><dd>{movie.status}</dd>
              <dt>Language</dt><dd>{movie.original_language?.toUpperCase()}</dd>
              <dt>Budget</dt><dd>{formatMoney(movie.budget)}</dd>
              <dt>Revenue</dt><dd>{formatMoney(movie.revenue)}</dd>
              <dt>Votes</dt><dd>{movie.vote_count.toLocaleString()}</dd>
            </dl>
          </Col>
        </Row>

        {similar.length > 0 && (
          <section className="mt-5">
            <h2 className="h5 mb-3">You might also like</h2>
            <MovieGrid movies={similar} />
          </section>
        )}

        <div className="mt-5">
          <Link to="/">&larr; Back to Discover</Link>
        </div>
      </Container>
    </>
  );
}
