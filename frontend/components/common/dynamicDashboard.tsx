"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { widgetMap } from "@/app/strategic-planning/demand/config/widgetMap";

export default function DynamicDashboard({ config }) {
  const [widgetState, setWidgetState] = useState({});

  useEffect(() => {
    // Initialize filter default values
    const defaults = {};
    config.forEach(w => {
      if (w.filters?.default) defaults[w.id] = w.filters.default;
    });
    setWidgetState(defaults);
  }, [config]);

  const handleFilterChange = (id, val) => {
    setWidgetState(prev => ({ ...prev, [id]: val }));
  };

  const widthClasses = {
    "1/1": "col-span-12",
    "1/2": "col-span-12 md:col-span-6",
    "1/3": "col-span-12 md:col-span-4",
    "2/3": "col-span-12 md:col-span-8",
  };

  const heightClasses = {
    sm: "h-48",
    md: "h-72",
    lg: "h-96",
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      {config.map(widget => {
        const Component = widgetMap[widget.type];
        const activeFilter = widgetState[widget.id];
        const widgetQuery = widget.filters
          ? `?${widget.filters.key}=${activeFilter}`
          : "";

        return (
          <Card
            key={widget.id}
            className={`${widthClasses[widget.width]} ${heightClasses[widget.height]} p-4 flex flex-col`}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg">{widget.title}</h2>

              {widget.filters && (
                <ToggleGroup
                  type="single"
                  value={activeFilter}
                  onValueChange={(val) => handleFilterChange(widget.id, val)}
                  className="gap-1"
                >
                  {widget.filters.options.map(o => (
                    <ToggleGroupItem key={o.value} value={o.value} className="px-2 py-1 border">
                      {o.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              )}
            </div>

            <div className="flex-1 overflow-hidden">
              <Component api={widget.api + widgetQuery} />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
