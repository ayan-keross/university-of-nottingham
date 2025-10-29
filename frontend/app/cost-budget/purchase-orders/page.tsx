import { TabsContent } from "@/components/ui/tabs";


export default function PurchaseOrdersPage() {
  
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 px-2 md:gap-6 md:py-6">
        <TabsContent key="purchase-orders" value="purchase-orders">
          <h2 className="text-lg font-semibold mb-4">Purchase Orders Page</h2>
          {/* You can add more content here related to Asset Information */}
        </TabsContent>
      </div>
    </div>
  );
}