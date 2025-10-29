import { FieldConfig } from "@/components/common/dynamicForm";

const configuratorFormFields: FieldConfig[] = [
  {
    name: "order",
    label: "Order",
    type: "number",
    placeholder: "",
  },
  {
    name: "itemName",
    label: "Name",
    type: "text",
    placeholder: "",
  },
];

export default configuratorFormFields;
