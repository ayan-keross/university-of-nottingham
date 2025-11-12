"use client";

import { TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import TableComponent from "@/components/tableComponent";
import PipelineForm from "./pipelineForm";
import {
  getPipelineProjects,
  sendToDirectorApproval,
} from "@/utils/api/pipelineProjectApi";
import { DynamicToggleGroup } from "@/components/common/dynamicToggleGroup";
import TableSummaryToggle from "@/components/common/tableSummaryToggle";
import DynamicDashboard from "@/components/dashboard/dynamicDashboard";
import { dashboardConfig } from "./config/dashBoardConfig";
import { Badge } from "@/components/ui/badge";
import { ColumnFieldConfig } from "@/types/common/form";
import { ActionMenu } from "@/components/common/actionMenu";

export type PipelineProject = {
  projectIdentifier: string;
  projectId: string;
  projectName: string;
  oldProjectId: string;
  assetIdentifier: string;
  fundingSource: string;
  projectDescription: string;
  estimatedGrossBudget: number;
  requestedDate: Date;
  projectStatus: string;
};
const columns: ColumnFieldConfig<PipelineProject>[] = [
  // 👇 Action column
  {
    key: "actions",
    label: "",
    type: "custom",
    render: (_value: unknown, project: unknown) => {
      const p = project as PipelineProject;
      if (!p) return "";
      const projectActions = [
        {
          label: "View Details",
          onClick: (r: PipelineProject) =>
            console.log("View clicked", r.projectId),
        },
        {
          label: "Edit Project",
          onClick: (r: PipelineProject) =>
            console.log("Edit clicked", r.projectId),
        },
        {
          label: "Send to Director Approval",
          onClick: async (r: PipelineProject) => {
            const updatedProject = await sendToDirectorApproval(
              r?.projectIdentifier
            );
            if (
              updatedProject &&
              updatedProject?.projectStatus == "directorApproval"
            ) {
              alert("Project has been send for director approval.");
            }
          },
        },
      ];

      return <ActionMenu rowData={p} actions={projectActions} />;
    },
  },
  { key: "projectId", label: "Project ID", type: "text" },
  { key: "projectName", label: "Project Name", type: "text" },
  { key: "oldProjectId", label: "Old Project ID", type: "text" },
  { key: "projectDescription", label: "Project Description", type: "text" },
  { key: "requestedDate", label: "Date Request Received", type: "date" },
  { key: "fundingSource", label: "Funding Source", type: "text" },
  {
    key: "status",
    label: "Project Status",
    type: "custom",
    render: (value) => {
      const statusColors: { [key: string]: string } = {
        active: "bg-green-100 text-green-800",
        archive: "bg-gray-100 text-gray-800",
      };
      const classes =
        statusColors[String(value)] || "bg-gray-100 text-gray-800";
      return (
        <Badge className={`${classes} px-2 py-1 rounded-full text-sm`}>
          {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
        </Badge>
      );
    },
  },
  {
    key: "estimatedGrossBudget",
    label: "Estimated Gross Budget",
    type: "number",
  },
];
export default function PipelinePage() {
  const [data, setData] = useState<PipelineProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<PipelineProject[]>([]);
  const [view, setView] = useState("table");
  const toggleOptions = [
    { label: "Active", value: "active" },
    { label: "Archive", value: "archive" },
  ];

  const handleToggle = (val: string | string[]) => {
    console.log("Toggled value:", val);
    // Implement filtering logic based on toggled value
    if (val === "active") {
      setFilteredData(data.filter((project) => project.status == val));
    } else if (val === "archive") {
      setFilteredData(data.filter((project) => project.status == val));
    }
  };
  const fetchData = async () => {
    const projects = await getPipelineProjects();
    setData(projects);
    setFilteredData(
      projects.filter(
        (project) =>
          project.status == "active" && project.projectStatus == "pipeline"
      )
    );
    setLoading(false);
  };
  useEffect(() => {
    // Simulate data fetching
    fetchData();
  }, [data.length, setData]);

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 px-2 md:gap-6 md:py-6">
        <TabsContent key="pipeline" value="pipeline">
          {/* Header with Add button */}
          <div className="flex items-center justify-between border-b pb-3 mb-4 px-2">
            {/* Left actions */}
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold">Pipeline</h1>
              {/* Example future button / toggle */}
              {/* <ToggleGroup /> */}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <DynamicToggleGroup
                options={toggleOptions}
                value="active"
                onToggle={handleToggle}
              />
              <TableSummaryToggle onChange={setView} />
              <PipelineForm onSuccess={fetchData} />
            </div>
            {/* <DemandForm onSuccess={fetchData} /> */}
          </div>

          {/* Table or Summary */}
          {loading ? (
            <div className="mt-10">Loading.......</div>
          ) : view == "table" ? (
            <TableComponent columns={columns || []} data={filteredData} />
          ) : (
            <DynamicDashboard config={dashboardConfig} />
          )}
        </TabsContent>
      </div>
    </div>
  );
}
