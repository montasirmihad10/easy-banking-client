/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";

type EBDatePickerProps = {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
};

const EBDatePicker = ({
  name,
  label,
  required,
  defaultValue,
}: EBDatePickerProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium mb-1">{label}</label>
      <Controller
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value
                  ? dayjs(field.value).format("YYYY-MM-DD")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                captionLayout="dropdown"
                fromYear={1950}
                toYear={new Date().getFullYear()}
              />
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  );
};

export default EBDatePicker;
