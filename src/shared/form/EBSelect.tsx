"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { ReactNode } from "react";
import { useFormContext, Controller } from "react-hook-form";

type TSelectOption = {
  label: string;
  value: string;
};

type TEBSelect = {
  options: TSelectOption[];
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
  defaultValue?: string;
};

const EBSelect = ({
  options,
  name,
  label,
  disabled,
  placeholder,
  icon,
  className,
  defaultValue,
}: TEBSelect) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-1">
      <Label className="flex gap-2 items-center pb-2">
        {icon}
        {label}
      </Label>
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={disabled}
          >
            <SelectTrigger className={className}>
              <SelectValue placeholder={placeholder || "Select"} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.label} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};

export default EBSelect;
