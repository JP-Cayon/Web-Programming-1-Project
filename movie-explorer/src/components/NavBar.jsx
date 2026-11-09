import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaFilm, FaHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";

export default function NavBar() {
  const { favorites } = useFavorites();

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="md" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center gap-2">
          <FaFilm className="text-warning" /> Movie Explorer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Discover</Nav.Link>
            <Nav.Link as={NavLink} to="/search">Search</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/favorites" className="d-flex align-items-center gap-2">
              <FaHeart className="text-danger" /> Favorites
              <Badge bg="danger" pill>{favorites.length}</Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
