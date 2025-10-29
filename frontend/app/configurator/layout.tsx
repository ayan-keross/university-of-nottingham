"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import tabsData from "./tab-data.json";
import { useRouter, useParams } from "next/navigation";

export default function ConfiguratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();

  return (
    <Tabs
      className="w-[400px] m-2"
      value={params.viewId || tabsData[0]?.viewId}
      onValueChange={(value) => router.push(`/configurator/${value}`)}
    >
      {/* Common Tab Headers */}
      <TabsList>
        {tabsData.map((tab) => (
          <TabsTrigger key={tab.viewId} value={tab.viewId}>
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 px-2 md:gap-6 md:py-6">
          {/* Tab Content from child pages */}
          {/* Render the children components based on the current tab */}
          {children}
        </div>
      </div>
    </Tabs>
  );
}
