// hooks/useFetch.ts
import { useState, useEffect } from "react";

export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => mounted && setData(data))
      .catch((err) => mounted && setError(err))
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [url]);

  return { data, loading, error };
};
// This custom hook simplifies data fetching by managing loading state and error handling.
// It can be used to fetch data from any API endpoint and returns the fetched data, loading state, and any errors encountered during the fetch operation.