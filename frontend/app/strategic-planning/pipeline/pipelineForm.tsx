import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DynamicVerticalTabbedForm from "@/components/common/dynamicVerticalTabbedForm";
import pipelineFormFields from "./pipelineFormFields";
import { getAssets } from "@/utils/api/assetApi";
import { updateFormFieldGeneric } from "@/utils/formUtil";
import { getConfigurators } from "@/utils/api/configuratorApi";
import { createPipelineProject } from "@/utils/api/pipelineProjectApi";

function PipelineForm({onSuccess}: { onSuccess: () => void }) {
  const [pipelineFormFieldArr, setPipelineFormFieldArr] = useState(pipelineFormFields);
  const [assets, setAssets] = useState([]);
  const [configurators, setConfigurators] = useState({});
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  const handleSubmit = (data) => {
    // Handle form submission logic here
    console.log("Form submitted:", data);
    createPipelineProject(data);
    setOpen(false);
    setForm({}); // Reset form
    onSuccess();
  };

  const fetchAssetData = async () => {
    try {
      const result = await getAssets();
      setAssets(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchConfiguratorData = async (configType: string) => {
    try {
      const result = await getConfigurators(configType);
      setConfigurators(prev => ({ ...prev, [configType]: result }) );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }  };
  
  useEffect(() => {
    // Fetch asset data on component mount
    fetchAssetData();

    updateFormFieldGeneric(setPipelineFormFieldArr, "general", "assetIdentifier", {
      options: assets?.map((asset:any) => ({
        label: asset.assetName,
        value: asset.assetIdentifier,
      })),
    });
  }, [assets.length]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">+ Add</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px] md:max-w-[900px] lg:max-w-[1000px]">
          <DialogHeader>
            <DialogTitle>Add New Pipeline Project</DialogTitle>
            <DialogDescription>Fill in the details</DialogDescription>
          </DialogHeader>

          <DynamicVerticalTabbedForm
            tabs={pipelineFormFieldArr}
            onSubmit={(data) => handleSubmit(data)}
            onCancel={() => console.log("Cancelled")}
            columns={2}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PipelineForm;
