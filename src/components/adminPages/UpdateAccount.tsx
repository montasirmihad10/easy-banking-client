"use client";
import { Button } from "../ui/button";
import {
  useGetAccountQuery,
  useUpdateAccountMutation,
} from "@/redux/api/adminApi";
import SecondLoading from "@/shared/loading/SecondLoading";
import { allDistict } from "@bangladeshi/bangladesh-address";
import EBInput from "@/shared/form/EBInput";
import EBForm from "@/shared/form/EBForm";
import EBDatePicker from "@/shared/form/EBDatePicker";
import EBSelect from "@/shared/form/EBSelect";
import { FieldValues } from "react-hook-form";
import dayjs from "dayjs";
import { toast } from "sonner";
import React from "react";
import AuthLoading from "@/shared/loader/AuthLoading";

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];
const cityOptions = allDistict()
  .sort()
  .map((dis: string) => ({
    label: dis,
    value: dis,
  }));

const UpdateAccount = ({
  id,
  setOpen,
}: {
  id: string | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: accountData, isLoading } = useGetAccountQuery(id);
  const [updateAccount, { isLoading: updateLoading }] =
    useUpdateAccountMutation();
  const account = accountData?.data;

  const onSubmit = async (data: FieldValues) => {
    try {
      const updateInfo = {
        id: account?._id,
        data: {
          accountHolderName: data.accountHolderName,
          dateOfBirth: dayjs(data?.dateOfBirth).format("YYYY-MM-DD"),
          minimumBalance: data?.minimumBalance
            ? Number(data.minimumBalance)
            : undefined,
          gender: data.gender,
          address: data.address,
          city: data.city,
          postalCode: data.postalCode,
          country: data.country,
          phoneNumber: data.phoneNumber,
        },
      };
      const res = await updateAccount(updateInfo);
      if (res?.data?.success) {
        toast.success("Account updated successfully", { duration: 3000 });
        setOpen(false);
      } else {
        toast.error("Account update failed", { duration: 4000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <SecondLoading />;
  }

  if (!account) {
    return (
      <div>
        <p>Something went wrong!</p>
      </div>
    );
  }

  return (
    <div>
      <EBForm onSubmit={onSubmit}>
        <div className="space-y-3">
          {/* Full Width EBInputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div>
                <EBInput
                  label="Account Holder Name"
                  name="accountHolderName"
                  className="w-full"
                  defaultValue={account?.accountHolderName}
                  type="text"
                />
              </div>

              <div className="pt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                <p className="text-xs font-medium text-slate-500">
                  Current Balance (read-only)
                </p>
                <p className="text-lg font-semibold text-[#104042]">
                  ৳{Number(account?.balance || 0).toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Balance changes only via deposits, transfers, loans, or interest.
                </p>
              </div>
            </div>

            <div>
              {/* Date of Birth */}
              <div>
                <EBDatePicker
                  label="Date Of Birth"
                  name="dateOfBirth"
                  defaultValue={account?.dateOfBirth}
                />
              </div>

              <div className="pt-3">
                <EBInput
                  className="w-full"
                  label="Minimum Balance"
                  name="minimumBalance"
                  type="number"
                  defaultValue={account?.minimumBalance}
                />
              </div>
            </div>
          </div>

          {/* Flex Grid EBInputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Gender */}
            <div>
              <EBSelect
                className="w-full"
                name="gender"
                label="Gender"
                options={genderOptions}
                defaultValue={account?.gender}
              ></EBSelect>
            </div>

            <div>
              <EBInput
                label="Country"
                name="country"
                type="text"
                defaultValue={account?.country}
              />
            </div>

            {/* City */}
            <div>
              <EBSelect
                className="w-full"
                options={cityOptions}
                label="City"
                name="city"
                defaultValue={account?.city}
              ></EBSelect>
            </div>

            {/* Postal Code */}
            <div>
              <EBInput
                name="postalCode"
                label="Postal Code"
                type="text"
                defaultValue={account?.postalCode}
              />
            </div>
          </div>
          {/* Address */}
          <div className="">
            <EBInput
              label="Address"
              name="address"
              type="text"
              defaultValue={account?.address}
            />
          </div>
        </div>
        <div className="text-right">
          <Button
            className="mt-3 w-40 bg-[#104042] cursor-pointer"
            type="submit"
          >
            {updateLoading ? <AuthLoading /> : "Update"}
          </Button>
        </div>
      </EBForm>
    </div>
  );
};

export default UpdateAccount;
