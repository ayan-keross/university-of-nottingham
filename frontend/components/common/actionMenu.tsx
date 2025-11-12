"use client"
// components/common/ActionMenu.tsx
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionItem<T = unknown> {
  label: string;
  onClick: (row: T) => void;
  disabled?: boolean;
}

interface ActionMenuProps<T = unknown> {
  rowData: T;
  actions: ActionItem<T>[];
}

export function ActionMenu<T>({ rowData, actions }: ActionMenuProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            disabled={action.disabled}
            onClick={() => action.onClick(rowData)}
          >
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
