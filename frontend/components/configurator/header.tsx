"use client";

import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  onAdd: () => void;
}

export function Header({ title, onAdd }: HeaderProps) {
  return (
    <div className="flex items-center justify-between border-b pb-3 mb-4">
      <h1 className="text-xl font-semibold">{title}</h1>
      <Button onClick={onAdd}>+ Add</Button>
    </div>
  );
}
