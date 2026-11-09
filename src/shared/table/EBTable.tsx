/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SecondLoading from "../loading/SecondLoading";
import Link from "next/link";

// Generic column definition
export interface ColumnDef<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

// Action definition
export interface ActionConfig<T> {
  type: "select" | "button" | "link";
  // For select actions
  selectOptions?: Array<{ value: string; label: string }>;
  defaultValue?: string;
  onSelectChange?: (value: string, item: T) => void;
  selectClassName?: string;
  // For button actions
  icon?: ReactNode;
  onClick?: (item: T) => void;
  variant?: "ghost" | "default" | "destructive" | "outline" | "secondary";
  className?: string;
  hoverClassName?: string;
  href?: string | ((item: T) => string);
  label?: ReactNode;
  placeholder?: string;
}

export interface ReusableDataTableProps<T> {
  data?: T[];
  columns: ColumnDef<T>[];
  actions?: ActionConfig<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  loadingComponent?: ReactNode;
  getRowKey: (item: T) => string | number;
  className?: string;
}

// Default loading component
const DefaultLoading = () => <SecondLoading />;

export function EBTable<T>({
  data = [],
  columns,
  actions = [],
  isLoading = false,
  emptyMessage = "No data found.",
  loadingComponent = <DefaultLoading />,
  getRowKey,
  className = "",
}: ReusableDataTableProps<T>) {
  const totalColumns = columns.length + (actions.length > 0 ? 1 : 0);

  return (
    <div
      className={`mb-12 border rounded-lg overflow-hidden bg-gray-100 ${className}`}
    >
      <Table>
        <TableHeader>
          <TableRow className="">
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={` text-gray-900 ${column.className || ""}`}
              >
                {column.header}
              </TableHead>
            ))}
            {actions.length > 0 && (
              <TableHead className=" text-gray-900">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={totalColumns} className="py-10">
                {loadingComponent}
              </TableCell>
            </TableRow>
          )}

          {!isLoading && data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={totalColumns}
                className="text-center py-8 text-gray-500"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            data.map((item) => (
              <TableRow key={getRowKey(item)}>
                {columns.map((column) => (
                  <TableCell key={column.key} className={column.className}>
                    {column.render ? (
                      column.render(item)
                    ) : (
                      <span>{String((item as any)[column.key] || "")}</span>
                    )}
                  </TableCell>
                ))}

                {actions.length > 0 && (
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {actions.map((action, index) => {
                        if (action.type === "select") {
                          return (
                            <Select
                              key={index}
                              onValueChange={(value) =>
                                action.onSelectChange?.(value, item)
                              }
                            >
                              <SelectTrigger
                                className={`w-[100px] h-8 text-xs border-gray-200 ${
                                  action.selectClassName || ""
                                }`}
                              >
                                <SelectValue placeholder={action.placeholder} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem
                                  disabled
                                  value={action.placeholder as string}
                                >
                                  {action.placeholder}
                                </SelectItem>
                                {action.selectOptions?.map((option) => (
                                  <SelectItem
                                    className="cursor-pointer"
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          );
                        }

                        if (action.type === "button") {
                          return (
                            <Button
                              key={index}
                              variant={action.variant || "ghost"}
                              size="sm"
                              className={`cursor-pointer h-8 w-8 p-0 transition-colors ${
                                action.className || ""
                              } ${action.hoverClassName || ""}`}
                              onClick={() => action.onClick?.(item)}
                            >
                              {action.icon}
                            </Button>
                          );
                        }
                        if (action.type === "link") {
                          return (
                            <Link
                              key={index}
                              href={
                                typeof action.href === "function"
                                  ? action.href(item)
                                  : action.href || "#"
                              }
                              className={`cursor-pointer hover:bg-[#104042] py-1 px-1 rounded-lg transition-colors hover:text-white`}
                            >
                              {action.label || action.icon || "View"}
                            </Link>
                          );
                        }

                        return null;
                      })}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
