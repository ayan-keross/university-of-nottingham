'use client';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import tabsData from "./tab-data.json";
import { useRouter } from "next/navigation";

export default function ConfiguratorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Tabs
      className="w-[400px] m-2"
      defaultValue ={tabsData[0]?.viewId}
      onValueChange={(value) => router.push(`/reports/${value}`)}
    >
      {/* Common Tab Headers */}
      <TabsList>
        {tabsData.map((tab) => (
          <TabsTrigger key={tab?.viewId} value={tab?.viewId}>
            {tab?.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tab Content from child pages */}
      {children }
    </Tabs>
  );
}
