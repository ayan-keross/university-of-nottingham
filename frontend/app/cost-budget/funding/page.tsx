import { TabsContent } from "@/components/ui/tabs";


export default function FundingPage() {
  
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 px-2 md:gap-6 md:py-6">
        <TabsContent key="funding" value="funding">
          <h2 className="text-lg font-semibold mb-4">Funding Page</h2>
          {/* You can add more content here related to Asset Information */}
        </TabsContent>
      </div>
    </div>
  );
}