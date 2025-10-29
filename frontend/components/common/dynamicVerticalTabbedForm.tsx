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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { FormTabConfig, FieldConfig } from "@/types/common/form";
import TableComponent from "../tableComponent";

const gridColClassMap: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

const spanClassMap: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
};

interface DynamicTabbedFormProps {
  tabs: FormTabConfig[];
  onSubmit?: (data: Record<string, string | number>) => void;
  onCancel?: () => void;
  columns?: number;
}

export default function DynamicVerticalTabbedForm({
  tabs,
  onSubmit,
  onCancel,
  columns = 2,
}: DynamicTabbedFormProps) {
  const [form, setForm] = useState<Record<string, string | number>>({});

  const handleChange = (name: string, value: string | number) => {
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
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );
      case "select":
        return (
          <Select
            value={
              form[field.name] !== undefined ? String(form[field.name]) : ""
            }
            onValueChange={(val) => handleChange(field.name, val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent className="w-full">
              {field.options?.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt?.value !== undefined ? String(opt.value) : ""}
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "table":
        return (
          <TableComponent
            columns={field.columns}
            data={field.data}
            type={"table"}
            name={field.name}
            label={field.label}
          />
        );
      case "custom":
        return field.render();
      default:
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            value={form[field.name] ?? ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            disabled={field.disabled}
          />
        );
    }
  };

  return (
    <div>
      {/* Vertical layout for tabs */}
      <Tabs
        defaultValue={tabs[0]?.id}
        className="flex flex-col md:flex-row gap-6"
      >
        {/* Left side tab list — 20% width on desktop */}
        <TabsList className="flex md:flex-col w-full md:w-1/5 border rounded-lg h-fit">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="justify-start w-full text-left"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Right side tab content — 80% width on desktop */}
        <div className="flex-1 md:w-4/5 h-[500px]">
          {tabs.map((tab) => {
            const mdColumnClass = columns
              ? gridColClassMap[columns]
              : `md:grid-cols-1`;
            return (
              <TabsContent key={tab.id} value={tab.id}>
                <div className={`grid gap-4 grid-cols-1 ${mdColumnClass}`}>
                  {tab.fields.map((field) => {
                    const span = Math.min(field.colSpan ?? 1, columns);
                    const spanClass = span
                      ? spanClassMap[span]
                      : "md:col-span-1";
                    return (
                      <div
                        key={field.name}
                        className={`flex flex-col gap-2 ${spanClass}`}
                      >
                        <Label>
                          {field.label}
                          {field.required && <span className="text-red-500">*</span>}
                        </Label>
                        {renderField(field)}
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            );
          })}
        </div>
      </Tabs>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
}
