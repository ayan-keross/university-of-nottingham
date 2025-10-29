"use client";

import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ToggleOption {
  label: string;
  value: string;
}

interface DynamicToggleGroupProps {
  options: ToggleOption[];
  type?: "single" | "multiple"; // mode
  value: string | string[];     // controlled value
  onToggle: (val: string | string[]) => void; // callback to parent
}

export function DynamicToggleGroup({
  options,
  type = "single",
  value,
  onToggle,
}: DynamicToggleGroupProps) {
  return (
    <ToggleGroup
      type={type}
      value={value}
      onValueChange={onToggle}
      className="gap-0.5"
    >
      {options.map((opt) => (
        <ToggleGroupItem
          key={opt.value}
          value={opt.value}
          className="px-4 py-2 border shadow-sm"
        >
          {opt.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
