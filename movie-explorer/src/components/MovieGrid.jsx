import { Col, Row } from "react-bootstrap";
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies }) {
  return (
    <Row xs={2} sm={3} md={4} lg={5} className="g-3 g-md-4">
      {movies.map((movie) => (
        <Col key={movie.id}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );
}
