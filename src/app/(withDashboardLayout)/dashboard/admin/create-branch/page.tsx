"use client";

import { Button } from "@/components/ui/button";
import {
  useCreateBranchMutation,
  useGetManagersQuery,
} from "@/redux/api/adminApi";
import EBForm from "@/shared/form/EBForm";
import EBInput from "@/shared/form/EBInput";
import EBSelect from "@/shared/form/EBSelect";
import EBSelectMultiple from "@/shared/form/EBSelectMultiple";
import EBTimePicker from "@/shared/form/EBTimePicker";
import { days, TGlobalResponse } from "@/types/global.type";
import { selectBranchManagerOptions } from "@/utils/selectOptions/useSelectOptions";
import { allDistict } from "@bangladeshi/bangladesh-address";
import dayjs from "dayjs";
import {
  Building2,
  Calendar,
  Clock,
  Mail,
  MapPin,
  Phone,
  Users,
  Users2,
} from "lucide-react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const daysOptions = days.map((day) => ({
  label: day,
  value: day,
}));

const cityOptions = allDistict()
  .sort()
  .map((dis: string) => ({
    label: dis,
    value: dis,
  }));

const CreateBranch = () => {
  const { data: managerData } = useGetManagersQuery(undefined);
  const managers = managerData?.data;
  const [createBranch] = useCreateBranchMutation();
  const managerOptions = selectBranchManagerOptions(managers);

  const onSubmit = async (data: FieldValues) => {
    try {
      const branchData = {
        ...data,
        openingSchedule: {
          ...data.openingSchedule,
          openTime: dayjs(data?.openingSchedule?.openTime).format("HH:mm"),
          closeTime: dayjs(data?.openingSchedule?.closeTime).format("HH:mm"),
        },
      };
      const res = (await createBranch(branchData)) as TGlobalResponse;
      if (res?.data?.success) {
        toast.success(res?.data?.message, { duration: 3000 });
      } else {
        toast.error(res?.error?.data?.message || "Something went wrong", {
          duration: 4000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
      <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold text-[#104042] mb-2">
            Create New Branch
          </h1>
          <p className="text-gray-600 mb-3">
            Fill in the details to create a new branch
          </p>
          <div className="w-20 h-1 bg-[#104042] mx-auto rounded-full"></div>
        </div>

        <EBForm onSubmit={onSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Basic Information */}
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                <div className="p-2 bg-[#104042] rounded-lg">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-base font-semibold text-[#104042]">
                  Basic Information
                </h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <EBInput
                  label="Branch Name"
                  name="name"
                  type="text"
                  icon={<Building2 className="text-gray-400" />}
                  className="rounded-lg focus:ring-2 focus:ring-[#104042]/20 transition-all duration-200 px-4 py-2.5 text-sm bg-white"
                  placeholder="Enter branch name"
                />
                <EBInput
                  label="Branch Code"
                  name="code"
                  type="text"
                  icon={<Building2 className="text-gray-400" />}
                  className="rounded-lg focus:ring-2 focus:ring-[#104042]/20 transition-all duration-200 px-4 py-2.5 text-sm bg-white"
                  placeholder="e.g. 01, 02"
                />
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                <div className="p-2 bg-[#104042] rounded-lg">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-base font-semibold text-[#104042]">
                  Location Information
                </h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <EBInput
                  label="Address"
                  name="address"
                  type="text"
                  icon={<MapPin className="text-gray-400" />}
                  className="rounded-lg focus:ring-2 focus:ring-[#104042]/20 transition-all duration-200 px-4 py-2.5 text-sm bg-white"
                  placeholder="Enter complete address"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <EBSelect
                    options={cityOptions}
                    label="City"
                    name="city"
                    icon={<MapPin className="text-gray-400" />}
                    className="rounded-lg focus:ring-2 focus:ring-[#104042]/20 transition-all duration-200 px-4 py-2.5 text-sm w-full bg-white"
                    placeholder="Select city"
                  />
                  <EBInput
                    label="State"
                    name="state"
                    type="text"
                    icon={<MapPin className="text-gray-400" />}
                    className="rounded-lg focus:ring-2 focus:ring-[#104042]/20 transition-all duration-200 px-4 py-2.5 text-sm bg-white"
                    placeholder="Enter state"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <EBInput
                    label="Country"
                    name="country"
                    type="text"
                    icon={<MapPin className="text-gray-400" />}
                    className="rounded-lg focus:ring-2 focus:ring-[#104042]/20 transition-all duration-200 px-4 py-2.5 text-sm bg-white"
                    defaultValue="Bangladesh"
                  />
                  <EBInput
                    label="Zip Code"
                    name="zipCode"
                    type="text"
                    icon={<MapPin className="text-gray-400" />}
                    className="rounded-lg focus:ring-2 focus:ring-[#104042]/20 transition-all duration-200 px-4 py-2.5 text-sm bg-white"
                    placeholder="Enter zip code"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                <div className="p-2 bg-[#104042] rounded-lg">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-base font-semibold text-[#104042]">
                  Contact Information
                </h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <EBInput
                  label="Contact Number"
                  name="contactNumber"
                  type="text"
                  icon={<Phone className="text-gray-400" />}
                  className="rounded-lg focus:ring-2 focus:ring-[#104042]/20 transition-all duration-200 px-4 py-2.5 text-sm bg-white"
                  placeholder="Enter contact number"
                />
                <EBInput
                  label="Email"
                  name="email"
                  type="email"
                  icon={<Mail className="text-gray-400" />}
                  className="rounded-lg focus:ring-2 focus:ring-[#104042]/20 transition-all duration-200 px-4 py-2.5 text-sm bg-white"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            {/* Management */}
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                <div className="p-2 bg-[#104042] rounded-lg">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-base font-semibold text-[#104042]">
                  Management
                </h2>
              </div>
              <EBSelectMultiple
                mode="multiple"
                options={managerOptions}
                label="Managers"
                name="managers"
                icon={<Users2 className="text-gray-400" />}
                className="rounded-lg focus:ring-2 focus:ring-[#104042]/20 transition-all duration-200 bg-white"
              />
            </div>
          </div>

          {/* Schedule Section - Full Width */}
          <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
              <div className="p-2 bg-[#104042] rounded-lg">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-[#104042]">
                Operating Schedule
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <EBTimePicker
                label="Open Time"
                name="openingSchedule.openTime"
                icon={<Clock className="text-gray-400" />}
                className="rounded-lg focus:ring-2 focus:ring-[#104042]/20 transition-all duration-200 px-4 py-2.5 text-sm bg-white"
              />
              <EBTimePicker
                label="Close Time"
                name="openingSchedule.closeTime"
                icon={<Clock className="text-gray-400" />}
                className="rounded-lg focus:ring-2 focus:ring-[#104042]/20 transition-all duration-200 px-4 py-2.5 text-sm bg-white"
              />
              <div className="sm:col-span-2">
                <EBSelectMultiple
                  mode="multiple"
                  options={daysOptions}
                  label="Opening Days"
                  name="openingSchedule.days"
                  icon={<Calendar className="text-gray-400" />}
                  placeholder="Select operating days"
                  className="rounded-lg focus:ring-2 focus:ring-[#104042]/20 transition-all duration-200 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6 sm:pt-8">
            <Button
              type="submit"
              className="group relative bg-[#104042] hover:bg-[#104042] text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#104042] focus-visible:ring-offset-2 active:scale-[0.98] w-full sm:w-auto cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#AEFF1C] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-[#104042] transition-colors duration-300">
                <Building2 className="w-4 h-4" />
                Create Branch
              </span>
            </Button>
          </div>
        </EBForm>
      </div>
    </div>
  );
};

export default CreateBranch;
