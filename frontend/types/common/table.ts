import { JSX } from "react";

export interface Column<T> {
  key: keyof T;
  label: string;
  type: "text" | "number" | "date" | "boolean";
  sortable?: boolean;
  editable?: boolean;
  width?: number | string;
  render?: (value: T[keyof T], row: T) => JSX.Element; // custom renderer for React
}