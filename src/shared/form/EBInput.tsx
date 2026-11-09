"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EBInputType } from "@/types/form.type";
import { useFormContext } from "react-hook-form";

const EBInput = ({
  type,
  label,
  name,
  size,
  icon,
  placeholder,
  className,
  defaultValue,
  readOnly,
  tabIndex,
  rows,
}: EBInputType) => {
  const { register } = useFormContext();
  return (
    <div className="grid w-full items-center gap-3">
      <Label className="flex gap-2 items-center">
        {icon}
        {label}
      </Label>
      {type === "textarea" ? (
        <textarea
          {...register(name)}
          rows={rows || 4}
          placeholder={placeholder}
          defaultValue={defaultValue}
          readOnly={readOnly}
          tabIndex={tabIndex}
          className={`resize-none border border-input bg-background px-3 py-2 rounded-md text-sm shadow-sm ${
            className || ""
          }`}
        />
      ) : (
        <Input
          {...register(name)}
          type={type}
          size={size}
          placeholder={placeholder}
          defaultValue={defaultValue}
          readOnly={readOnly}
          tabIndex={tabIndex}
          className={className || ""}
        />
      )}
    </div>
  );
};

export default EBInput;
