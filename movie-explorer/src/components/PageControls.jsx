import { Button } from "react-bootstrap";

export default function PageControls({ page, totalPages, onChange }) {
  // TMDB caps results at 500 pages.
  const last = Math.min(totalPages || 1, 500);
  if (last <= 1) return null;

  return (
    <div className="d-flex justify-content-center align-items-center gap-3 my-4">
      <Button variant="outline-secondary" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        &larr; Previous
      </Button>
      <span className="text-muted">
        Page {page} of {last}
      </span>
      <Button variant="outline-secondary" disabled={page >= last} onClick={() => onChange(page + 1)}>
        Next &rarr;
      </Button>
    </div>
  );
}
