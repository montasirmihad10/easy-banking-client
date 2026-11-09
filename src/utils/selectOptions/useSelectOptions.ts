import { days } from "@/types/global.type";
import { allDistict } from "@bangladeshi/bangladesh-address";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const selectBranchOptions = (data: any) => {
  return data?.map((item: any) => ({
    label: item.name,
    value: item._id,
  }));
};

export const selectBranchManagerOptions = (data: any) => {
  return data?.map((item: any) => ({
    label: `${item.name.firstName} ${item.name.lastName}`,
    value: item._id,
  }));
};

export const daysOptions = days.map((day) => ({
  label: day,
  value: day,
}));

export const cityOptions = allDistict()
  .sort()
  .map((dis: string) => ({
    label: dis,
    value: dis,
  }));
