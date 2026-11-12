import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container className="py-5 text-center">
      <h1 className="display-4">404</h1>
      <p className="text-muted">That page doesn't exist.</p>
      <Button as={Link} to="/" variant="warning">Back to Discover</Button>
    </Container>
  );
}
