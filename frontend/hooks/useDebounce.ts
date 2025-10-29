// hooks/useDebounce.ts
import { useState, useEffect } from "react";

export const useDebounce = <T>(value: T, delay = 500): T => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
};
// This custom hook provides a way to debounce a value, which is useful for optimizing performance in scenarios like search inputs or API calls.
// It delays the update of the value until after a specified delay period, preventing unnecessary updates and improving responsiveness in user interfaces.