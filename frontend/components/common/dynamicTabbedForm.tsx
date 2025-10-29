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
import { Calendar } from "../ui/calendar";
import TableComponent from "../tableComponent";
import { DatePicker } from "./datePicker";

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
  columns?: number; // number of fields per row
}

export default function DynamicTabbedForm({
  tabs,
  onSubmit,
  onCancel,
  columns = 2, // default 2 per row
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
              {field &&
                field.options?.map((opt) => (
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
      // case "date":
      //   return (
      //     <DatePicker
      //       label={field.label}
      //       value={field.value ? new Date(field.value) : undefined}
      //       onDateChange={(date) => {
      //         if (date) {
      //           handleChange(field.name, date.toISOString());
      //         } else {
      //           handleChange(field.name, "");
      //         }
      //       }}
      //     />
      //   );

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
          />
        );
    }
  };

  return (
    <div>
      <Tabs defaultValue={tabs[0]?.id}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => {
          //const smColumnClass = columns ? `sm:grid-cols-${columns-1}`:`sm:grid-cols-1`;
          const mdColumnClass = columns ? gridColClassMap[columns]:`md:grid-cols-1`;
          return(
          <TabsContent key={tab.id} value={tab.id}>
            <div
              className={`grid gap-4 py-4 grid-cols-1 ${mdColumnClass}`}
            >
              {tab.fields.map((field) => {
                // Clamp colSpan so it never exceeds total columns
                const span = Math.min(field.colSpan ?? 1, columns);
                const spanClass = span ? spanClassMap[span] : "md:col-span-1";
                return (
                  <div
                    key={field.name}
                    className={`flex flex-col gap-2 ${spanClass}`}
                  
                  >
                    <Label>{field.label}</Label>
                    {renderField(field)}
                  </div>
                );
              })}
            </div>
          </TabsContent>
        )})}
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
