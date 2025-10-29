// hooks/useOutsideClick.ts
import { useEffect } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, callback]);
};
// This custom hook detects clicks outside of a specified element and triggers a callback function.
// It is useful for closing dropdowns, modals, or any UI component that should close when the user clicks outside of it.
// The hook takes a React ref to the element and a callback function to execute when an outside