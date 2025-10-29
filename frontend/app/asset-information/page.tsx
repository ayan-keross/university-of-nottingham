"use client";
import TableComponent from "@/components/tableComponent";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DynamicForm from "@/components/common/dynamicForm";
import React, { useEffect, useState } from "react";
import assetFormFields from "./assetFormFields";
import { Column } from "@/types/common/table";
import { get } from "http";
import { getAssets } from "@/utils/api/assetApi";

type Asset = {
  assetId: string;
  assetName: string;
  assetType: string;
  campus: string;
  assetArea: number;
  assetConstructionYear: number;
  latitude: number;
  longitude: number;
  what3words: string;
  isActive: boolean;
};

const columns: Column<Asset>[] = [
  {key: "assetId", label: "Asset ID", type: "text"},
  {key: "assetName", label: "Asset Name", type: "text"},
  {key: "assetType", label: "Asset Type", type: "text"},
  {key: "campus", label: "Campus", type: "text"},
  {key: "assetArea", label: "Asset Area", type: "number"},
  {key: "assetConstructionYear", label: "Construction Year", type: "number"},
  {key: "latitude", label: "Latitude", type: "number"},
  {key: "longitude", label: "Longitude", type: "number"},
  {key: "what3words", label: "What3Words", type: "text"},
  {key: "isActive", label: "Status", type: "boolean"},
];


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AssetPage() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [data, setData] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  const resetForm = () => {
    setForm({});
  }
  const handleSubmit = (data: Asset) => {
    // Handle form submission logic here
    console.log("Form submitted:", data);
    addAsset(data);
    setOpen(false);
    setForm({});// Reset form
  };
  const handleCancel = () => {
    setOpen(false);
    setForm({}); // Reset form
  }
  // Define fetchData function
  const fetchData = async () => {
    try {
      /*const response = await fetch(`${BASE_URL}/assets/`); // replace with your API
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }*/
      const result = await getAssets();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // send data to backend when form is submitted
  const addAsset = async (data: Asset) => {
    try {
      const response = await fetch(`${BASE_URL}/assets/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Data posted successfully:", result);
      // Refresh data after posting
      fetchData();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  useEffect(() => {
    // Fetch initial data here and set it to state
    fetchData();
  }, [setData]);
  
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6">
            {/* Header with Add button */}
      <div className="flex items-center justify-between border-b pb-3 mb-4 px-2">
        <h1 className="text-xl font-semibold">Asset Information</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">+ Add</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Asset</DialogTitle>
              <DialogDescription>Fill in the details</DialogDescription>
            </DialogHeader>

            <DynamicForm
                fields={assetFormFields}
                columns={2}
                onSubmit={(data) => handleSubmit(data)}
                onCancel={() => handleCancel()}
              />
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <TableComponent columns = {columns} data={data} /> {/* Pass the data state to the TableComponent */}
        </div>
    </div>
  );;
}
