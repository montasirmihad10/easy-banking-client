"use client";
import {
  useGetEachBranchQuery,
  useUpdateBranchMutation,
} from "@/redux/api/branchApi";
import EBForm from "@/shared/form/EBForm";
import EBInput from "@/shared/form/EBInput";
import EBSelect from "@/shared/form/EBSelect";
import EBSelectMultiple from "@/shared/form/EBSelectMultiple";
import EBTimePicker from "@/shared/form/EBTimePicker";
import Loading from "@/shared/loading/Loading";
import { days, states } from "@/types/global.type";
import { allDistict } from "@bangladeshi/bangladesh-address";
import React from "react";
import { FieldValues } from "react-hook-form";
import { Button } from "../ui/button";
import dayjs from "dayjs";
import { toast } from "sonner";
import AuthLoading from "@/shared/loader/AuthLoading";

const cityOptions = allDistict()
  .sort()
  .map((dis: string) => ({
    label: dis,
    value: dis,
  }));
const stateOptions = states.map((item) => ({
  label: item,
  value: item,
}));
const daysOptions = days.map((day) => ({
  label: day,
  value: day,
}));

const UpdateBranch = ({
  id2,
  setOpen2,
}: {
  id2: string | null;
  setOpen2: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [updateBranch, { isLoading: updateLoading }] =
    useUpdateBranchMutation();
  const { data: branchData, isLoading } = useGetEachBranchQuery(id2, {
    skip: !id2,
  });
  const branch = branchData?.data;

  const onSubmit = async (data: FieldValues) => {
    try {
      const branchInfo = {
        id: id2?.toString(),
        data: {
          ...data,
          reserevedBalance: Number(data?.reserevedBalance),
          usedBalance: Number(data?.usedBalance),
          openingSchedule: {
            ...data.openingSchedule,
            openTime: dayjs(data?.openingSchedule?.openTime).format("HH:mm"),
            closeTime: dayjs(data?.openingSchedule?.closeTime).format("HH:mm"),
          },
        },
      };
      console.log(branchInfo);
      const res = await updateBranch(branchInfo);
      console.log(res);
      if (res?.data?.success) {
        toast.success("Branch updated successfully", { duration: 3000 });
        setOpen2(false);
      } else {
        toast.error("Branch update failed!", { duration: 3000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <EBForm onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <EBInput
            name="name"
            label="Branch Name"
            type="text"
            defaultValue={branch.name}
          />
          <EBInput
            name="code"
            label="Branch code"
            type="text"
            defaultValue={branch.code}
          />
          <EBInput
            name="reserevedBalance"
            label="Resereved Balance"
            type="number"
            defaultValue={branch.reserevedBalance}
          />
          <EBInput
            name="usedBalance"
            label="Used Balance"
            type="number"
            defaultValue={branch.usedBalance}
          />
          <EBInput
            name="email"
            label="Contact Email"
            type="text"
            defaultValue={branch.email}
          />
          <EBInput
            name="contactNumber"
            label="Contact Number"
            type="text"
            defaultValue={branch.contactNumber}
          />
          <EBInput
            name="address"
            label="Address"
            type="text"
            defaultValue={branch.address}
          />
          <EBSelect
            name="city"
            label="City"
            defaultValue={branch.city}
            options={cityOptions}
            className="w-full"
          />
          <EBSelect
            name="state"
            label="State"
            defaultValue={branch.state}
            options={stateOptions}
            className="w-full"
          />
          <EBInput
            name="country"
            label="Country"
            type="text"
            defaultValue={branch.country}
          />
          <EBInput
            name="zipCode"
            label="Zip code"
            type="text"
            defaultValue={branch.zipCode}
          />
          <div>
            <EBSelectMultiple
              mode="multiple"
              label="Opening days"
              name="openingSchedule.days"
              options={daysOptions}
              defaultValue={branch.openingSchedule.days}
            />
          </div>
          <EBTimePicker
            name="openingSchedule.openTime"
            label="Opening Time"
            type="text"
            defaultValue={branch.openingSchedule.openTime}
          />
          <EBTimePicker
            name="openingSchedule.closeTime"
            label="Closing Time"
            type="text"
            defaultValue={branch.openingSchedule.closeTime}
          />
        </div>
        <div className="text-right mt-3">
          <Button className="w-40 bg-[#104042] cursor-pointer" type="submit">
            {updateLoading ? <AuthLoading /> : "Submit"}
          </Button>
        </div>
      </EBForm>
    </div>
  );
};

export default UpdateBranch;
