import { FormTabConfig } from "@/types/common/form";

const demandFormFields: FormTabConfig[] = [
  {
    id: "general",
    label: "General Info",
    fields: [
      {
        name: "projectId",
        label: "Project ID",
        type: "text",
        placeholder: "Enter Project Id",
        required: true,
      },
      {
        name: "projectName",
        label: "Project Name",
        type: "text",
        placeholder: "Enter Project Name",
      },
      {
        name: "oldProjectId",
        label: "Old Project ID",
        type: "text",
        placeholder: "Enter Old Project ID",
      },
      {
        name: "requestedDate",
        label: "Date Request Received",
        type: "date",
        //colSpan: 3,
        placeholder: "Select date",
        onChange: (date: Date) => console.log("Selected date:", date),
      },
      {
        name: "estimatedGrossBudget",
        label: "Estimated Gross Budget(£)",
        type: "number",
        placeholder: "e.g- 10000",
      },
      {
        name: "fundingSource",
        label: "Funding Source",
        type: "text",
        placeholder: "Enter Funding Source",
      },
      {
        name: "assetIdentifier",
        label: "Asset Name",
        type: "select",
        colSpan: 2,
        options: [
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
        ],
      },
      {
        name: "projectDescription",
        label: "Project Description",
        type: "textarea",
        placeholder: "Enter Project Description",
        colSpan: 3,
      },
    ],
  },
  {
    id: "workBreakdownStr",
    label: "WBS",
    fields: [
      {
        name: "wbs1",
        label: "WBS 1",
        type: "select",
        //colSpan: 2,
        options: [
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
        ],
      },
      {
        name: "EFGrouping",
        label: "E&F Grouping",
        type: "select",
        //colSpan: 2,
        options: [
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
        ],
      },
    ],
  },
  {
    id: "prioritisation",
    label: "Prioritisation",
    fields: [
      {
        name: "primaryPerformanceOutcome",
        label: "Primary Performance Outcome",
        type: "select",
        options: [
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
        ],
      },
      {
        name: "EFParentProgramme",
        label: "E&F Parent Programme",
        type: "select",
        options: [
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
        ],
      },
      {
        name: "investmentCategory",
        label: "Investment Category",
        type: "select",
        options: [
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
        ],
      },
    ],
  },
  {
    id: "demandBoardReview",
    label: "Demand Board Review",
    fields: [
      {
        name: "demandReviewDate",
        label: "Demand Review Date",
        type: "date",
        placeholder: "Select date",
        onChange: (date: Date) => console.log("Selected date:", date),
      },
    ],
  },
];

export default demandFormFields;
