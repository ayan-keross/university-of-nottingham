"use client";

import { TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import TableComponent from "@/components/tableComponent";
import DemandForm from "./demandForm";
import {
  getDemandProjects,
  sendToPipeline,
} from "@/utils/api/demandProjectApi";
import { DynamicToggleGroup } from "@/components/common/dynamicToggleGroup";
import TableSummaryToggle from "@/components/common/tableSummaryToggle";
import DynamicDashboard from "@/components/dashboard/dynamicDashboard";
import { dashboardConfig } from "./config/dashBoardConfig";
import { Badge } from "@/components/ui/badge";
import { ColumnFieldConfig } from "@/types/common/form";
import { ActionMenu } from "@/components/common/actionMenu";
import { Button } from "@/components/ui/button";

export type DemandProject = {
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
  status: string;
};
const columns: ColumnFieldConfig<DemandProject>[] = [
  // 👇 Action column
  {
    key: "actions",
    label: "",
    type: "custom",
    render: (_value: unknown, project: unknown) => {
      const p = project as DemandProject;
      if (!p) return "";
      const projectActions = [
        {
          label: "View Details",
          onClick: (r: DemandProject) =>
            console.log("View clicked", r.projectId),
        },
        {
          label: "Edit Project",
          onClick: (r: DemandProject) => {
            handleEdit(r);
          },
        },
        {
          label: "Send to Pipeline",
          onClick: async (r: DemandProject) => {
            const updatedProject = await sendToPipeline(r?.projectIdentifier);
            if (updatedProject && updatedProject?.projectStatus == "pipeline") {
              alert("Project has been send to pipeline.");
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
    label: "Status",
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
export default function DemandPage() {
  const [data, setData] = useState<DemandProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<DemandProject[]>([]);
  const [view, setView] = useState("table");
  // 🧠 for Edit Mode
  const [selectedProject, setSelectedProject] = useState<DemandProject | null>(
    null
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const toggleOptions = [
    { label: "Active", value: "active" },
    { label: "Archive", value: "archive" },
  ];

  const handleToggle = (val: string | string[]) => {
    console.log("Toggled value:", val);
    // Implement filtering logic based on toggled value
    if (val === "active") {
      setFilteredData(
        data.filter(
          (project) =>
            project.status == val && project.projectStatus == "demand"
        )
      );
    } else if (val === "archive") {
      setFilteredData(
        data.filter(
          (project) =>
            project.status == val && project.projectStatus == "demand"
        )
      );
    }
  };
  const fetchData = async () => {
    const projects = await getDemandProjects();
    setData(projects);
    setFilteredData(
      projects.filter(
        (project) =>
          project.status == "active" && project.projectStatus == "demand"
      )
    );
    setLoading(false);
  };
  // 🧱 Handle Edit Click
  const handleEdit = (project: DemandProject) => {
    setSelectedProject(project);
    setIsEditMode(true);
    setOpen(true);
  };

  // 🧱 Handle Add Click
  const handleAdd = () => {
    setSelectedProject(null);
    setIsEditMode(false);
    setOpen(true);
  };

  useEffect(() => {
    // Simulate data fetching
    fetchData();
    setOpen(false);
  }, []);

  const columns: ColumnFieldConfig<DemandProject>[] = [
    // 👇 Action column
    {
      key: "actions",
      label: "",
      type: "custom",
      render: (_value: unknown, project: unknown) => {
        const p = project as DemandProject;
        if (!p) return "";
        const projectActions = [
          {
            label: "View Details",
            onClick: (r: DemandProject) =>
              console.log("View clicked", r.projectId),
          },
          {
            label: "Edit Project",
            onClick: (r: DemandProject) => {
              handleEdit(r);
            },
          },
          {
            label: "Send to Pipeline",
            onClick: async (r: DemandProject) => {
              const updatedProject = await sendToPipeline(r?.projectIdentifier);
              if (
                updatedProject &&
                updatedProject?.projectStatus == "pipeline"
              ) {
                alert("Project has been send to pipeline.");
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
      label: "Status",
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

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 px-2 md:gap-6 md:py-6">
        <TabsContent key="demand" value="demand">
          {/* Header with Add button */}
          <div className="flex items-center justify-between border-b pb-3 mb-4 px-2">
            {/* Left actions */}
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold">Demand</h1>
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
              <Button variant="outline" onClick={handleAdd}>
                + Add
              </Button>
              <DemandForm
                onSuccess={fetchData}
                open={open}
                setOpen={setOpen}
                editMode={isEditMode}
                existingData={selectedProject}
              />
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
