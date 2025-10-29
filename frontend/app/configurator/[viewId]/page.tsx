"use client";

import { useEffect, useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import TableComponent from "@/components/tableComponent";
import { useParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import tabsData from "../tab-data.json";
import DynamicForm from "@/components/common/dynamicForm";
import configuratorFormFields from "./configuratorFormFields";
import {
  ConfiguratorItem,
  createConfigurator,
  getConfigurators,
} from "@/utils/api/configuratorApi";

type TabType = { viewId: string; name: string };

type ConfiguratorItemType = {
  order?: number;
  itemId?: string;
  itemName?: string;
  configType: string;
  updatedBy: string;
  updatedAt: string;
  active?: boolean;
};

const columns = [
  { key: "order", label: "Order", type: "number" },
  { key: "itemId", label: "Item ID", type: "text" },
  { key: "itemName", label: "Item Name", type: "text" },
  { key: "configType", label: "Dropdown Type", type: "text" },
  { key: "updatedBy", label: "Modified By", type: "text" },
  { key: "updatedAt", label: "Modified On", type: "date" },
  { key: "active", label: "Status", type: "text" },
  {
    key: "actions",
    label: "Actions",
    type: "custom",
    render: (_: any, row: any) => (
      <button
        className="text-blue-600 hover:underline"
        onClick={() => {
          alert(`Edit action for ${row.itemName}`);
        }}
      >
        Edit {row.itemName}
      </button>
    ),
  },
];

export default function ItemsPage() {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<TabType | null>(null);
  const [data, setData] = useState<ConfiguratorItem[]>([]);
  const [form, setForm] = useState({});

  const handleSubmit = (data: ConfiguratorItem) => {
    // Handle form submission logic here
    console.log("Form submitted:", data);
    createConfigurator(selectedTab?.viewId, data);
    setOpen(false);
    setForm({}); // Reset form
  };
  const handleCancel = () => {
    setOpen(false);
    setForm({}); // Reset form
  };
  const fetchData = async () => {
    try {
      const jsonData = await getConfigurators(params.viewId);
      setData(Object.values(jsonData?.configuratorItemDetails || {}));
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };
  useEffect(() => {
    // Reset data when viewId changes
    const selectedTabData = tabsData.filter(
      (tab: TabType) => tab.viewId === params.viewId
    );
    if (selectedTabData.length > 0) {
      setSelectedTab(selectedTabData[0]);
      // Fetch data for the selected tab
      // Here you would typically make an API call to fetch the data
      // For demonstration, we'll use static data
      fetchData();
    } else {
      setSelectedTab(null);
      setData([]);
    }
  }, [params.viewId,data]);

  return (
    <TabsContent key={params.viewId} value={params.viewId}>
      {/* Header with Add button */}
      <div className="flex items-center justify-between border-b pb-3 mb-4 px-2">
        <h1 className="text-xl font-semibold">{selectedTab?.name}</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">+ Add</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New {selectedTab?.name}</DialogTitle>
              <DialogDescription>Fill in the details</DialogDescription>
            </DialogHeader>

            <DynamicForm
              fields={configuratorFormFields}
              columns={2}
              onSubmit={(data) => handleSubmit(data)}
              onCancel={() => handleCancel()}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <TableComponent columns={columns} data={data} />
    </TabsContent>
  );
}
