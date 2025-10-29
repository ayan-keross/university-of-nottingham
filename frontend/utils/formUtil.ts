import { FieldConfig, FormTabConfig } from "@/types/common/form";

export function updateFormFieldGeneric(
  setFormFields: React.Dispatch<React.SetStateAction<FormTabConfig[]>>,
  tabId: string,
  fieldName: string,
  updates: Partial<FieldConfig>
) {
  setFormFields(prev =>
    prev.map(tab =>
      tab.id === tabId
        ? {
            ...tab,
            fields: tab.fields.map(field =>
              field.name === fieldName ? { ...field, ...updates } : field
            ),
          }
        : tab
    )
  );
}