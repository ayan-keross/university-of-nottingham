import { TabsContent } from "@/components/ui/tabs";


export default function CashflowForecastPage() {
  
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 px-2 md:gap-6 md:py-6">
        <TabsContent key="cashflow-forecast" value="cashflow-forecast">
          <h2 className="text-lg font-semibold mb-4">Cashflow-forecast Page</h2>
          {/* You can add more content here related to Asset Information */}
        </TabsContent>
      </div>
    </div>
  );
}