"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormDialogConfig, FieldConfig } from "./types";

export function DynamicFormDialog({
  open,
  setOpen,
  config,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  config: FormDialogConfig;
}) {
  const [formData, setFormData] = React.useState<Record<string, any>>(() => {
    const defaults: Record<string, any> = {};
    config.fields.forEach((f) => {
      if (f.defaultValue !== undefined) defaults[f.name] = f.defaultValue;
    });
    return defaults;
  });

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    config.onSubmit(formData);
    setOpen(false);
    setFormData({});
  };

  const renderField = (field: FieldConfig) => {
    if (field.hidden) return null;

    switch (field.type) {
      case "text":
      case "number":
      case "email":
      case "date":
        return (
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="border p-2 rounded w-full"
          />
        );
      case "textarea":
        return (
          <textarea
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="border p-2 rounded w-full"
          />
        );
      case "select":
        return (
          <select
            name={field.name}
            required={field.required}
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select...</option>
            {"options" in field &&
              field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
          </select>
        );
      case "custom":
        if ("render" in field) {
          return field.render(formData[field.name], (val) =>
            handleChange(field.name, val)
          );
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
          {config.description && (
            <DialogDescription>{config.description}</DialogDescription>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div
            className={`grid gap-4`}
            style={{ gridTemplateColumns: `repeat(${config.columns || 2}, 1fr)` }}
          >
            {config.fields.map((field) => (
              <div
                key={field.name}
                className={`flex flex-col gap-1 col-span-${field.span || 1}`}
              >
                {field.label && <label className="font-medium">{field.label}</label>}
                {renderField(field)}
              </div>
            ))}
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              {config.cancelLabel || "Cancel"}
            </Button>
            <Button type="submit">{config.submitLabel || "Submit"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
