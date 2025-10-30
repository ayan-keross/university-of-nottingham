import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TableSummaryToggle({ onChange }: { onChange?: (view: string) => void }) {
  const [view, setView] = useState("table");

  const toggleView = () => {
    const newView = view === "table" ? "summary" : "table";
    setView(newView);
    if (onChange) onChange(newView);
  };

  return (
    <Button
      onClick={toggleView}
      className="px-4 py-2 shadow-sm"
      variant="outline"
    >
      {view === "table" ? "Summary" : "Table"}
    </Button>
  );
}
