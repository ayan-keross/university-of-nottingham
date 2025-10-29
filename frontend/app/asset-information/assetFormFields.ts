import { FieldConfig } from "@/components/common/dynamicForm";

const assetFormFields: FieldConfig[] = [
{
    name: "assetId",
    label: "Asset ID",
    type: "number",
    placeholder: "Enter Asset ID",
  },
  {
    name: "assetName",
    label: "Asset Name",
    type: "text",
    placeholder: "Enter Asset Name",
  },
  {
    name: "assetType",
    label: "Asset Type",
    type: "text",
    placeholder: "Enter Asset Type",
  },
  {
    name: "campus",
    label: "Campus",
    type: "text",
    placeholder: "Enter Campus Name",
  },
  {
    name: "assetArea",
    label: "Asset Area",
    type: "number",
    placeholder: "Enter Asset Area",
  },
  {
    name: "assetConstructionYear",
    label: "Construction Year",
    type: "number",
    placeholder: "Enter Construction Year (e.g. 2001)",
  },
  {
    name: "latitude",
    label: "Latitude",
    type: "number",
    placeholder: "Enter Latitude",
  },
  {
    name: "longitude",
    label: "Longitude",
    type: "number",
    placeholder: "Enter Longitude",
  },
  {
    name: "what3words",
    label: "What3Words",
    type: "text",
    placeholder: "Enter What3Words",
  }
];

export default assetFormFields;
