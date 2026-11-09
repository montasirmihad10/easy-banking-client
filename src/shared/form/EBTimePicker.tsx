import { Label } from "@/components/ui/label";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import { ReactNode } from "react";
import { Controller } from "react-hook-form";

type TTimePickerProps = {
  type?: string;
  name: string;
  label?: string;
  className?: string;
  icon?: ReactNode;
  defaultValue?: string | dayjs.Dayjs;
};

const EBTimePicker = ({
  name,
  label,
  className,
  icon,
  defaultValue,
}: TTimePickerProps) => {
  const format = "hh:mm";

  return (
    <div>
      <Controller
        name={name}
        defaultValue={defaultValue ? dayjs(defaultValue, format) : undefined}
        render={({ field, fieldState: { error } }) => (
          <div>
            <Label className="flex gap-2 items-center pb-2">
              {icon}
              {label}
            </Label>
            <TimePicker
              className={`custom-ant-select ${className ?? ""}`}
              format={format}
              size="large"
              style={{ width: "100%" }}
              {...field}
              placeholder={`Enter your ${label ? label : null}`}
            />
            <small style={{ color: "red" }}>
              {error ? error.message : null}
            </small>
          </div>
        )}
      />
    </div>
  );
};

export default EBTimePicker;
