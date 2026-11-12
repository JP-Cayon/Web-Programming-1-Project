import { useEffect, useState } from "react";

/**
 * Runs an async loader whenever `deps` change, with loading/error state and
 * automatic cancellation of stale requests (AbortController).
 * `loader` receives an AbortSignal and must return a promise.
 */
export default function useFetch(loader, deps) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function run() {
      setLoading(true);
      setError(null);
      try {
        const result = await loader(controller.signal);
        if (active) setData(result);
      } catch (err) {
        if (err.name !== "AbortError" && active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    run();
    return () => {
      active = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
