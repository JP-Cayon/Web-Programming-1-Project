import { Alert, Spinner } from "react-bootstrap";
import { hasApiKey } from "../api/tmdb";

export function Loader({ label = "Loading..." }) {
  return (
    <div className="text-center py-5" role="status">
      <Spinner animation="border" variant="warning" />
      <div className="mt-2 text-muted">{label}</div>
    </div>
  );
}

export function ErrorMessage({ message }) {
  return (
    <Alert variant="danger" className="my-4">
      <Alert.Heading as="h6">Something went wrong</Alert.Heading>
      {message}
    </Alert>
  );
}

export function EmptyState({ title, children }) {
  return (
    <div className="text-center text-muted py-5">
      <h5>{title}</h5>
      <div>{children}</div>
    </div>
  );
}

export function ApiKeyWarning() {
  if (hasApiKey) return null;
  return (
    <Alert variant="warning" className="my-3">
      No TMDB API key found. Add <code>VITE_TMDB_API_KEY</code> to a <code>.env</code> file
      (local) or a GitHub Actions secret (deployed). See the README.
    </Alert>
  );
}
