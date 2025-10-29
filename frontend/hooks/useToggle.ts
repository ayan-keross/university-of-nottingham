// hooks/useToggle.ts
import { useState, useCallback } from "react";

export const useToggle = (initial = false): [boolean, () => void] => {
  const [state, setState] = useState(initial);
  const toggle = useCallback(() => setState((prev) => !prev), []);
  return [state, toggle];
};
// This custom hook provides a simple way to manage boolean state, such as toggling visibility or active states.