"use client";
import DynamicTabbedForm from "@/components/common/dynamicTabbedForm";
import TableComponent from "@/components/tableComponent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormTabConfig } from "@/types/common/form";
import React, { useEffect, useState } from "react";

const userFormTabs: FormTabConfig[] = [
  {
    id: "general",
    label: "General Info",
    fields: [
      { name: "name", label: "Name", type: "text", placeholder: "Enter name" },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter email",
      },
      
    ],
  },
  {
    id: "project",
    label: "Project Info",
    fields: [
      { name: "name", label: "Name", type: "text", placeholder: "Enter name" },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter email",
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    fields: [
      {
        name: "date",
        label: "Date",
        type: "date",
        colSpan: 3,
        placeholder: "Select date",
        onChange: (date: Date) => console.log("Selected date:", date),
      },
      {
        name: "role",
        label: "Role",
        type: "select",
        colSpan: 2,
        options: [
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
        ],
      },
      
    ],
  },
  {
    id: "extra",
    label: "Extra Data",
    fields: [
      {
        name: "notes",
        label: "Notes",
        type: "textarea",
        placeholder: "Additional notes...",
        colSpan: 3,
      },
      {
        name: "role",
        label: "Role",
        type: "select",
        colSpan: 2,
        options: [
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
        ],
      },
      {
        name: "attendance",
        label: "Attendance",
        type: "table",
        colSpan: 3,
        onChange: (data: Record<string, string | number>[]) => {
          console.log("Table data changed:", data);
        },
        columns: [
          { key: "date", label: "Date", type: "text" },
          { key: "status", label: "Status", type: "text" },
        ],
        data: [
          { date: "2025-08-01", status: "Present" },
          { date: "2025-08-02", status: "Absent" },
        ],
      },
    ],
  },
];

const columns = [
  { key: "serviceRequestId", label: "Service Request ID", type: "text" },
];

type ServiceRequest = {
  serviceRequestId: string;
};

export default function ServiceRequestPage() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [data, setData] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    // Fetch initial data here and set it to state
    setData([{ serviceRequestId: "1" }, { serviceRequestId: "2" }]);
    // Example: setData(fetchedData);
  }, [setData]);
  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted:", form);
    setOpen(false);
    setForm({ name: "", email: "" }); // Reset form
  };
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6">
        {/* Header with Add button */}
        <div className="flex items-center justify-between border-b pb-3 mb-4 px-2">
          <h1 className="text-xl font-semibold">Service Request</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">+ Add</Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl w-full p-8">
              <DialogHeader>
                <DialogTitle>Add New Service Request</DialogTitle>
                <DialogDescription>Fill in the details</DialogDescription>
              </DialogHeader>
              <DynamicTabbedForm
                tabs={userFormTabs}
                onSubmit={(data) => handleSubmit}
                onCancel={() => console.log("Cancelled")}
                columns={3}
              />
            </DialogContent>
          </Dialog>
        </div>
        {/* Table */}
        <TableComponent columns={columns} data={data} />
        {/* Pass the data state to the TableComponent */}
      </div>
    </div>
  );
}
