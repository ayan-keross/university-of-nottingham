"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import { format } from "date-fns";

interface DatePickerProps {
  label: string;
  value?: Date;
  onDateChange?: (date: Date | undefined) => void;
}

export function DatePicker({ label,value, onDateChange }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col gap-3">
      {/* <Label htmlFor="date" className="px-1">
        {label}
      </Label> */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-60">
            <Input
              id="date"
              readOnly
              value={value ? format(value, "PPP") : ""}
              onChange={(e) => {
                const parsedDate = new Date(e.target.value);
                if (!isNaN(parsedDate.getTime())) {
                  setDate(parsedDate);
                  onDateChange?.(parsedDate); // call parent handler
                } else {
                  setDate(undefined);
                  onDateChange?.(undefined); // call parent handler
                }
              }}
              placeholder="Select date"
              className="cursor-pointer pr-10"
              onClick={() => setOpen(true)}
            />
            <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              onDateChange?.(date) // call parent handler
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
