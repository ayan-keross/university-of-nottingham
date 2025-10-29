"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { DynamicFormDialog } from "../../components/common/dynamicFormDialog";
import { DynamicToggleGroup } from "@/components/common/dynamicToggleGroup";

export default function Page() {
  const [open, setOpen] = React.useState(false);
const [selected, setSelected] = React.useState("a");
const [multiselected, setMultiSelected] = React.useState<string[]>(["a"]);

  const handleToggle = (val: string | string[]) => {
    if (typeof val === "string") {
      setSelected(val);
    } else {
      setMultiSelected(val);
    }
    console.log("Selected:", val);
  };
  return (
    <div className="p-6">
      <div className="p-6">
      <DynamicToggleGroup
        type="single"
        options={[
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" },
          { label: "Option C", value: "c" },
        ]}
        value={selected}
        onToggle={handleToggle}
      />
      <p className="mt-4">Selected: {selected}</p>
    </div>
    <div className="p-6">
      <DynamicToggleGroup
        type="multiple"
        options={[
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" },
          { label: "Option C", value: "c" },
        ]}
        value={multiselected}
        onToggle={handleToggle}
      />
      <p className="mt-4">Selected: {multiselected}</p>
    </div>
      <Button onClick={() => setOpen(true)}>Open Dynamic Form</Button>

      <DynamicFormDialog
        open={open}
        setOpen={setOpen}
        config={{
          title: "Create User",
          description: "Fill the form below to add a new user.",
          submitLabel: "Save",
          cancelLabel: "Close",
          columns: 3, // 3-column layout
          fields: [
            {
              name: "username",
              label: "Username",
              type: "text",
              span: 1,
              required: true,
              placeholder: "Enter username",
            },
            {
              name: "email",
              label: "Email",
              type: "email",
              span: 2,
              required: true,
            },
            {
              name: "role",
              label: "Role",
              type: "select",
              span: 1,
              options: [
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
              ],
              defaultValue: "user",
            },
            {
              name: "bio",
              label: "Bio",
              type: "textarea",
              span: 3,
            },
            {
              name: "customField",
              label: "Custom Component",
              type: "custom",
              span: 3,
              render: (value, onChange) => (
                <Button
                  type="button"
                  onClick={() => onChange("clicked")}
                  variant="secondary"
                >
                  Click Me ({value || "not clicked"})
                </Button>
              ),
            },
          ],
          onSubmit: (data) => {
            console.log("Submitted:", data);
          },
        }}
      />
    </div>
  );
}
