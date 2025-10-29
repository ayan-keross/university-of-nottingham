"use client";

import { TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import TableComponent from "@/components/tableComponent";
import { Column } from "@/types/common/table";
import DemandForm from "./demandForm";

type DemandProject = {
  projectId: string;
  projectName: string;
  oldProjectId: string;
  projectDescription: string;
  estimatedGrossBudget: number;
};
const columns : Column<DemandProject>[] = [
  { key: "projectId", label: "Project ID", type: "text" },
  { key: "projectName", label: "Project Name", type: "text" },
  { key: "oldProjectId", label: "Old Project ID", type: "text" },
  { key: "projectDescription", label: "Project Description", type: "text" },
  { key: "estimatedGrossBudget", label: "Estimated Gross Budget", type: "text" },
]
export default function DemandPage() {
  const [data, setData] = useState<DemandProject[]>([]);
  
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 px-2 md:gap-6 md:py-6">
        <TabsContent key="demand" value="demand">
          {/* Header with Add button */}
          <div className="flex items-center justify-between border-b pb-3 mb-4 px-2">
            <h1 className="text-xl font-semibold">Demand</h1>
            <DemandForm />
          </div>

          {/* Table */}
          <TableComponent columns={columns || []} data={data} />
        </TabsContent>
      </div>
    </div>
  );
}
