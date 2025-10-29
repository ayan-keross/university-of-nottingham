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
import demandFormFields from "./demandFormFields";
import { getAssets } from "@/utils/api/assetApi";
import { updateFormFieldGeneric } from "@/utils/formUtil";

function DemandForm() {
  const [demandFormFieldArr, setDemandFormFieldArr] = useState(demandFormFields);
  const [assets, setAssets] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const handleSubmit = (data) => {
    // Handle form submission logic here
    console.log("Form submitted:", data);
    setOpen(false);
    setForm({}); // Reset form
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
  useEffect(() => {
    // Fetch asset data on component mount
    fetchAssetData();

    updateFormFieldGeneric(setDemandFormFieldArr, "general", "assetName", {
      options: assets?.map((asset) => ({
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
            <DialogTitle>Add New Demand Project</DialogTitle>
            <DialogDescription>Fill in the details</DialogDescription>
          </DialogHeader>

          <DynamicVerticalTabbedForm
            tabs={demandFormFieldArr}
            onSubmit={(data) => handleSubmit(data)}
            onCancel={() => console.log("Cancelled")}
            columns={2}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DemandForm;
