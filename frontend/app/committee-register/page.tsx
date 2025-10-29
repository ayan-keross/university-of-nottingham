// page.tsx
"use client"

import DynamicTabs from "@/components/common/dynamicTabs"

export default function Page() {
  const initialTabs = [
    {
      id: "dashboard",
      title: "Dashboard",
      content: <div>📊 Metrics and Charts</div>,
      closable: false,
    },
    {
      id: "users",
      title: "Users",
      content: (
        <div>
          <h2 className="text-lg font-semibold">👥 User Management</h2>
          <p>List, add, and manage users here.</p>
        </div>
      ),
      closable: true,
      editable: true,
    },
    {
      id: "settings",
      title: "Settings",
      content: <div>⚙️ Application Settings</div>,
      closable: true,
      editable: true,
    },
  ]

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Committe Register</h1>
      <DynamicTabs initialTabs={initialTabs} />
      
    </main>
  )
}
