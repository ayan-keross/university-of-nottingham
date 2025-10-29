
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableFieldConfig } from "@/types/common/form";


export default function TableComponent<T extends object>({
  columns,
  data,
}: TableFieldConfig<T>) {
  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={String(col.key)}>{col.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col) => {
                  const value = row[col.key];
                  let cellContent: React.ReactNode = value as React.ReactNode;

                  // Handle basic types
                  if (col.type === "date" && value) {
                    cellContent = new Date(value as string).toLocaleDateString();
                  } else if (col.type === "number" && value !== undefined) {
                    cellContent = Number(value).toLocaleString();
                  } else if (col.type === "custom" && col.render) {
                    cellContent = col.render(value, row as T);
                  }

                  return (
                    <TableCell key={String(col.key)}>{cellContent}</TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
