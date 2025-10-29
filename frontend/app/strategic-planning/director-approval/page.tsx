import { TabsContent } from "@radix-ui/react-tabs";

export default function DirectorApprovalPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6">
        <TabsContent key="director-approval" value="director-approval">
          <h2 className="text-lg font-semibold mb-4">Director Approval</h2>
          {/* You can add more content here related to Asset Information */}
        </TabsContent>

        {/* You can add more content here related to Asset Information */}
      </div>
    </div>
  );
}
