"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { X, Plus, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Define tab structure
interface Tab {
  id: string;
  title: string;
  content: React.ReactNode;
  closable?: boolean;
  editable?: boolean;
  icon?: React.ReactNode;
}

// Draggable Tab Trigger
function DraggableTab({
  tab,
  activeTab,
  setActiveTab,
  deleteTab,
  editingTab,
  setEditingTab,
  handleRename,
}: {
  tab: Tab;
  activeTab: string;
  setActiveTab: (id: string) => void;
  deleteTab: (id: string) => void;
  editingTab: string | null;
  setEditingTab: React.Dispatch<React.SetStateAction<string | null>>;
  handleRename: (id: string, newTitle: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: tab.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (editingTab === tab.id && inputRef.current) {
      const input = inputRef.current;
      input.focus();
      const len = input.value.length;
      input.setSelectionRange(0, len);
    }
  }, [editingTab,tab.id]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center"
    >
      <TabsTrigger value={tab.id} onClick={() => setActiveTab(tab.id)}>
        {editingTab === tab.id ? (
          <Input
            ref={inputRef}
            autoFocus
            defaultValue={tab.title}
            className="h-6 w-24 text-sm"
            onBlur={(e) => {
              setTimeout(() => {
                console.log("onBlur triggered", e.target.value); // Debugging
                handleRename(tab.id, e.target.value);
                setEditingTab(null);
              }, 100);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                //console.log("onKeyDown triggered", e.target.value); // Debugging
                handleRename(tab.id, (e.target as HTMLInputElement).value);
                setEditingTab(null);
                e.preventDefault(); // Prevent form submission
              }
            }}
          />
        ) : (
          <span
            onDoubleClick={() => (tab.editable ? setEditingTab(tab.id) : null)}
            className="flex items-center gap-1"
          >
            {tab.icon}
            {tab.title}
            {tab.editable && (
              <Pencil className="h-3 w-3 text-muted-foreground" />
            )}
          </span>
        )}
      </TabsTrigger>

      {tab.closable && (
        <Button
          variant="ghost"
          size="sm"
          className="ml-1 h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
          onClick={() => deleteTab(tab.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

export default function DynamicTabs({ initialTabs }: { initialTabs?: Tab[] }) {
  const [tabs, setTabs] = React.useState<Tab[]>(
    initialTabs ?? [
      {
        id: "tab1",
        title: "Overview",
        content: <div>📊 Dashboard Overview</div>,
        closable: false,
      },
    ]
  );

  const [activeTab, setActiveTab] = React.useState("tab1");
  const [editingTab, setEditingTab] = React.useState<string | null>(null);

  // DnD sensors
  const sensors = useSensors(useSensor(PointerSensor));

  // Add new tab
  const addTab = () => {
    const newId = `tab-${Date.now()}`;
    const newTab: Tab = {
      id: newId,
      title: "New Tab",
      content: <div>🆕 Content for {newId}</div>,
      closable: true,
      editable: true,
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTab(newId);
  };

  // Delete tab
  const deleteTab = (id: string) => {
    setTabs((prev) => prev.filter((tab) => tab.id !== id));
    if (activeTab === id && tabs.length > 1) {
      const remaining = tabs.filter((t) => t.id !== id);
      setActiveTab(remaining[0].id);
    }
  };

  // Rename tab
  const handleRename = (id: string, newTitle: string) => {
    setTabs((prev) =>
      prev.map((tab) => (tab.id === id ? { ...tab, title: newTitle } : tab))
    );
  };

  // Handle reorder
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = tabs.findIndex((t) => t.id === active.id);
      const newIndex = tabs.findIndex((t) => t.id === over?.id);
      setTabs((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="w-full p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          {/* Drag & Drop Tabs List */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={tabs.map((t) => t.id)}
              strategy={horizontalListSortingStrategy}
            >
              <TabsList className="flex gap-2 overflow-x-auto max-w-[80%]">
                {tabs.map((tab) => (
                  <DraggableTab
                    key={tab.id}
                    tab={tab}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    deleteTab={deleteTab}
                    editingTab={editingTab}
                    setEditingTab={setEditingTab}
                    handleRename={handleRename}
                  />
                ))}
              </TabsList>
            </SortableContext>
          </DndContext>

          {/* Add Tab Button */}
          <Button variant="outline" size="sm" onClick={addTab}>
            <Plus className="h-4 w-4 mr-1" /> Add Tab
          </Button>
        </div>

        {/* Tabs Content */}
        {tabs.map((tab) => (
          <TabsContent
            key={tab.id}
            value={tab.id}
            className="p-4 border rounded-md mt-4 min-h-[200px]"
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
