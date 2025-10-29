// hooks/useLocalStorage.ts
import { useState, useEffect } from "react";

export const useLocalStorage = <T>(key: string, initial: T) => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};
// This custom hook provides a way to manage state that is persisted in local storage.
// It initializes the state from local storage if available, and updates local storage whenever the state changes.
// It returns the current value and a setter function to update the value, making it easy to use in components that need to maintain state across page reloads or sessions.