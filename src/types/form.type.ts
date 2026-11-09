/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export type EBInputType = {
  type: string;
  label: string;
  name: string;
  size?: number;
  icon?: ReactNode;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  readOnly?: any;
  rows?: number;
  tabIndex?: any;
};
