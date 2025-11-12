import { ReactNode } from "react";


// ✅ All supported field types
export type FieldType =
  | "text"
  | "email"
  | "number"
  | "textarea"
  | "select"
  | "date"
  | "table"
  | "boolean"
  | "custom"; // fallback for future widgets

// ✅ Base interface (common props for all fields)
export interface BaseFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  colSpan?: number; // how many grid columns this field spans
  disabled?: boolean;
  required?: boolean;
}

// ✅ Specialized field types
export interface TextFieldConfig extends BaseFieldConfig {
  type: "text" | "email" | "number" | "textarea";
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: "select";
  options: { label: string; value: string | number | undefined;}[];
}

export interface DateFieldConfig extends BaseFieldConfig {
  type: "date";
  value?: Date | undefined;
  onChange?: (date: Date) => void;
}
export interface ColumnFieldConfig<T> {
   key: string;
  label: string;
  type: FieldType;
  render?: (value: unknown, row?: T) => React.ReactNode;
}

export interface RowDataConfig {
  [key: string]: string | number | boolean | null;
}
export interface TableFieldConfig<T> extends BaseFieldConfig {
  type: "table";
  columns: ColumnFieldConfig<T>[];
  data: RowDataConfig[]; // each row is an object {col: value}
}

export interface CustomFieldConfig extends BaseFieldConfig {
  type: "custom";
  render: () => ReactNode; // developer can pass a custom renderer
}

// ✅ Union type of all field configs
export type FieldConfig<T> =
  | TextFieldConfig
  | SelectFieldConfig
  | DateFieldConfig
  | TableFieldConfig<T>
  | CustomFieldConfig;

// ✅ Tab configuration
export interface FormTabConfig<T = unknown> {
  id: string;
  label: string;
  fields: FieldConfig<T>[];

}

