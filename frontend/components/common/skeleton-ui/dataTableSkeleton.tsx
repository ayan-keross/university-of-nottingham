import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";

// NOTE: shadcn doesn't ship a built-in Table component in the base kit —
// the `Table*` components above assume you've created small wrappers
// following shadcn examples. If you don't have them, replace with standard
// <table> / <thead> / <tbody> markup and Tailwind classes.

export type Column<T> = {
  key: string;
  title: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
};

type Props<T> = {
  columns: Column<T>[];
  data?: T[];
  loading?: boolean;
  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
};

/**
 * A lightweight, reusable data-table skeleton built with shadcn UI patterns.
 * - shows a search bar, page size select, simple actions area
 * - renders a table with skeleton rows while `loading` is true
 */
export default function DataTableSkeleton<T extends { id?: string | number }>(props: Props<T>) {
  const {
    columns,
    data = [],
    loading = false,
    page = 1,
    pageSize = 10,
    total = 0,
    onPageChange,
    onRowClick,
    emptyMessage = "No results",
  } = props;

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  function renderCell(col: Column<T>, row: T) {
    if (col.render) return col.render(row);

    return (row as any)[col.key];
  }

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-2">
          <Input placeholder="Search..." className="w-64" />
          <Select>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Page size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost">Export</Button>
          <Button>New</Button>
        </div>
      </div>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader className="w-12">
                  <Checkbox />
                </TableHeader>
                {columns.map((c) => (
                  <TableHeader key={c.key} className={c.className}>
                    <div className="flex items-center gap-2">
                      <span>{c.title}</span>
                      <ChevronDown className="h-4 w-4 opacity-60" />
                    </div>
                  </TableHeader>
                ))}
                <TableHeader className="w-24">Actions</TableHeader>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading
                ? // show 6 skeleton rows while loading
                  Array.from({ length: 6 }).map((_, i) => (
                    <TableRow key={`skeleton-${i}`} className="animate-pulse">
                      <TableCell>
                        <div className="h-4 w-4 rounded bg-gray-200" />
                      </TableCell>
                      {columns.map((c) => (
                        <TableCell key={c.key} className={c.className}>
                          <div className="h-4 rounded bg-gray-200" style={{ width: "80%" }} />
                        </TableCell>
                      ))}
                      <TableCell>
                        <div className="h-6 w-16 rounded bg-gray-200" />
                      </TableCell>
                    </TableRow>
                  ))
                : data.length > 0
                ? data.map((row) => (
                    <TableRow key={(row as any).id ?? JSON.stringify(row)}
                      className="hover:bg-muted/50 cursor-pointer"
                      onClick={() => onRowClick?.(row)}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      {columns.map((c) => (
                        <TableCell key={c.key} className={c.className}>
                          {renderCell(c, row)}
                        </TableCell>
                      ))}
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">Edit</Button>
                          <Button size="sm" variant="ghost">Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                : (
                  <TableRow>
                    <TableCell colSpan={columns.length + 2}>
                      <div className="p-6 text-center text-sm text-muted-foreground">{emptyMessage}</div>
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </div>

        {/* simple pagination */}
        <div className="flex items-center justify-between p-4">
          <div className="text-sm text-muted-foreground">Page {page} of {totalPages}</div>
          <div className="flex items-center gap-2">
            <Button disabled={page <= 1} onClick={() => onPageChange?.(Math.max(1, page - 1))}>Prev</Button>
            <Button disabled={page >= totalPages} onClick={() => onPageChange?.(Math.min(totalPages, page + 1))}>Next</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// -------------------------
// Usage example (copy into a page):
// -------------------------
// import DataTableSkeleton, { Column } from './shadcn-data-table-skeleton';
//
// type Row = { id: number; name: string; status: string; createdAt: string };
// const columns: Column<Row>[] = [
//   { key: 'name', title: 'Name' },
//   { key: 'status', title: 'Status' },
//   { key: 'createdAt', title: 'Created' },
// ];
//
// export default function Page() {
//   const [loading, setLoading] = React.useState(true);
//   const [data, setData] = React.useState<Row[]>([]);
//
//   React.useEffect(() => {
//     setTimeout(() => {
//       setData([{ id: 1, name: 'Project X', status: 'Active', createdAt: '2025-11-01' }]);
//       setLoading(false);
//     }, 1200);
//   }, []);
//
//   return <DataTableSkeleton columns={columns} data={data} loading={loading} total={1} page={1} pageSize={10} />;
// }
