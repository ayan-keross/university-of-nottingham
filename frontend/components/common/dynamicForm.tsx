"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RowDataConfig } from "@/types/common/form";

export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "email" | "number" | "textarea" | "select";
  placeholder?: string;
  options?: { label: string; value: string }[];
  colSpan?: number; // 👈 for fields like textarea (full width)
};

interface DynamicFormProps {
  fields: FieldConfig[];
  onSubmit?: (data: RowDataConfig) => void;
  onCancel?: () => void;
  columns?: number; // default grid columns
}

export default function DynamicForm({
  fields,
  onSubmit,
  onCancel,
  columns = 2,
}: DynamicFormProps) {
  const [form, setForm] = useState<Record<string, any>>({});

  const handleChange = (name: string, value: string | number, type?: string) => {
    // Automatically cast numeric fields to number
    if (type === "number" && value !== "") {
      value = Number(value);
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(form);
  };

  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            placeholder={field.placeholder}
            value={form[field.name] ?? ""}
            onChange={(e) => handleChange(field.name, e.target.value, field.type)}
          />
        );
      case "select":
        return (
          <Select
            value={form[field.name] ?? ""}
            onValueChange={(val) => handleChange(field.name, val,field.type)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent className="w-full">
              {field.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            value={form[field.name] ?? ""}
            onChange={(e) => handleChange(field.name, e.target.value, field.type)}
          />
        );
    }
  };

  return (
    <div>
      <div className={`grid gap-4 py-4 grid-cols-1 md:grid-cols-${columns}`}>
        {fields.map((field) => {
          // Clamp colSpan so it never exceeds total columns
          const span = Math.min(field.colSpan ?? 1, columns);

          return (
            <div
              key={field.name}
              className={`flex flex-col gap-2 ${
                span ? `md:col-span-${span}` : ""
              }`}
            >
              <Label>{field.label}</Label>
              {renderField(field)}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
}
