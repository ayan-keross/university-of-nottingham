import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DynamicVerticalTabbedForm from "@/components/common/dynamicVerticalTabbedForm";
import demandFormFields from "./demandFormFields";
import { getAssets } from "@/utils/api/assetApi";
import { updateFormFieldGeneric } from "@/utils/formUtil";
import { getConfigurators } from "@/utils/api/configuratorApi";
import {
  createDemandProject,
  updateDemandProject,
} from "@/utils/api/demandProjectApi";

function DemandForm({
  onSuccess,
  open,
  setOpen,
  editMode = false,
  existingData = null,
}: {
  onSuccess: () => void;
  open?: boolean;
  setOpen: any;
  editMode?: boolean;
  existingData?: any;
}) {
  const [demandFormFieldArr, setDemandFormFieldArr] =
    useState(demandFormFields);
  const [assets, setAssets] = useState([]);
  const [configurators, setConfigurators] = useState({});
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (data: any) => {
    console.log("Form submitted:", data);

    try {
      if (editMode) {
        await updateDemandProject(existingData.projectIdentifier, data);
      } else {
        await createDemandProject(data);
      }
      setOpen(false);
      setForm({});
      onSuccess();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const fetchAssetData = async () => {
    try {
      const result = await getAssets();
      setAssets(result);
      updateFormFieldGeneric(setDemandFormFieldArr, "general", "assetIdentifier", {
        options: result?.map((asset) => ({
          label: asset.assetName,
          value: asset.assetIdentifier,
        })),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssetData();
  }, []);

  useEffect(() => {
    if (editMode && existingData) {
      setForm(existingData);

      // Disable projectIdentifier
      updateFormFieldGeneric(setDemandFormFieldArr, "general", "projectIdentifier", {
        disabled: true,
      });

      // Populate asset dropdown once assets are loaded
      updateFormFieldGeneric(setDemandFormFieldArr, "general", "assetIdentifier", {
        options: assets?.map((asset) => ({
          label: asset.assetName,
          value: asset.assetIdentifier,
        })),
        defaultValue: existingData.assetIdentifier,
      });
    }
  }, [editMode, existingData, assets]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setForm({});
      setDemandFormFieldArr(demandFormFields);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {open && ( // unmounts form on close
        <DialogContent
          className="sm:max-w-[700px] md:max-w-[900px] lg:max-w-[1000px]"
          key={editMode ? existingData?.projectIdentifier ?? "edit" : "new"}
        >
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Edit Demand Project" : "Add New Demand Project"}
            </DialogTitle>
            <DialogDescription>
              {editMode
                ? "Update the project details below"
                : "Fill in the details"}
            </DialogDescription>
          </DialogHeader>

          <DynamicVerticalTabbedForm
            key={editMode ? existingData?.projectIdentifier ?? "edit" : "new"} // force remount
            tabs={demandFormFieldArr}
            defaultValues={editMode ? existingData : {}}
            disabledFields={editMode ? ["projectId"] : []}
            onSubmit={(data) => handleSubmit(data)}
            onCancel={() => setOpen(false)}
            columns={2}
          />
        </DialogContent>
      )}
    </Dialog>
  );
}

export default DemandForm;
