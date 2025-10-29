"use client";
import DynamicForm, { FieldConfig } from "@/components/common/dynamicForm";
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
import React, { useEffect, useState } from "react";

const userFormFields: FieldConfig[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter first name",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter last name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email",
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "Enter phone number",
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    options: [
      { label: "Admin", value: "admin" },
      { label: "Manager", value: "manager" },
      { label: "User", value: "user" },
    ],
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    placeholder: "Enter age",
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    placeholder: "Write something...",
    colSpan: 3, // 👈 spans across full row
  },
];

const columns = [
  { key: "assetId", label: "Asset ID", type: "text" },
  { key: "assetName", label: "Asset Name", type: "text" },
  { key: "assetType", label: "Asset Type", type: "text" },
  { key: "campus", label: "campus", type: "text" },
  { key: "assetArea", label: "Asset Area", type: "number" },
  { key: "constructionYear", label: "Construction Year", type: "number" },
  { key: "latitude", label: "Latitude", type: "number" },
  { key: "longitude", label: "Longitude", type: "number" },
  { key: "what3words", label: "What3Words", type: "text" },
  { key: "status", label: "Status", type: "text" },
];

type Asset = {
  assetId: string;
  assetName: string;
  assetType: string;
  campus: string;
  assetArea: number;
  constructionYear: number;
  latitude: number;
  longitude: number;
  what3words: string;
  status: string;
};

export default function PeopleDirectoryPage() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Asset[]>([]);

  useEffect(() => {
    // Fetch initial data here and set it to state
    setData([
      {
        assetId: "1",
        assetName: "Building A",
        assetType: "Building",
        campus: "Main",
        assetArea: 5000,
        constructionYear: 1990,
        latitude: 40.7128,
        longitude: -74.006,
        what3words: "index.home.raft",
        status: "Active",
      },
      {
        assetId: "2",
        assetName: "Building B",
        assetType: "Building",
        campus: "North",
        assetArea: 3000,
        constructionYear: 2000,
        latitude: 34.0522,
        longitude: -118.2437,
        what3words: "apple.banana.orange",
        status: "Inactive",
      },
    ]);
    // Example: setData(fetchedData);
  }, [setData]);
  const handleSubmit = (data:any) => {
    // Handle form submission logic here
    console.log("Form submitted:", data);

    setOpen(false);
    
  };
  const handleCancel = () => {
    // Handle form submission logic here
    console.log("Cancelled");
    setOpen(false);
    
  };
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6">
        {/* Header with Add button */}
        <div className="flex items-center justify-between border-b pb-3 mb-4 px-2">
          <h1 className="text-xl font-semibold">People Directory</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Add New User</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Fill in the details</DialogDescription>
              </DialogHeader>
              <DynamicForm
                fields={userFormFields}
                columns={3}
                onSubmit={(data) => handleSubmit(data)}
                onCancel={() => handleCancel()}
              />
            </DialogContent>
          </Dialog>
        </div>
        {/* Table */}
        <TableComponent columns={columns} data={data} />{" "}
        {/* Pass the data state to the TableComponent */}
      </div>
    </div>
  );
}
