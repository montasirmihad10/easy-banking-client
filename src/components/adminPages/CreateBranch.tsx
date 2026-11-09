// "use client";
// import EBForm from "@/shared/form/EBForm";
// import EBInput from "@/shared/form/EBInput";
// import type { FieldValues } from "react-hook-form";
// import { type TGlobalResponse } from "@/types/global.type";
// import EBSelectMultiple from "@/shared/form/EBSelectMultiple";
// import { Button } from "../ui/button";
// import EBTimePicker from "@/shared/form/EBTimePicker";
// import {
//   Building2,
//   MapPin,
//   Phone,
//   Mail,
//   Users,
//   Clock,
//   Calendar,
// } from "lucide-react";
// import { useCreateBranchMutation } from "@/redux/api/adminApi";
// import dayjs from "dayjs";
// import { toast } from "sonner";
// import EBSelect from "@/shared/form/EBSelect";
// import { cityOptions, daysOptions } from "@/utils/selectOptions/useSelectOptions";

// const CreateBranch = () => {
//   const [createBranch] = useCreateBranchMutation();

//   const onSubmit = async (data: FieldValues) => {
//     try {
//       const branchData = {
//         ...data,
//         openingSchedule: {
//           ...data.openingSchedule,
//           openTime: dayjs(data?.openingSchedule?.openTime).format("HH:mm"),
//           closeTime: dayjs(data?.openingSchedule?.closeTime).format("HH:mm"),
//         },
//       };
//       const res = (await createBranch(branchData)) as TGlobalResponse;
//       console.log(res);
//       if (res?.data?.success) {
//         toast.success(res?.data?.message, { duration: 3000 });
//       } else {
//         toast.error(res?.error?.data?.message || "Something went wrong", {
//           duration: 4000,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-4">
//   <div className="bg-gray-200 rounded-2xl shadow-lg border border-gray-200 p-4">
//     {/* Header */}
//     <div className="text-center mb-8">
//       <h1 className="text-2xl font-bold text-[#104042] mb-2">Create New Branch</h1>
//       <div className="w-20 h-1 bg-[#104042] mx-auto mt-3 rounded-full"></div>
//     </div>

//     <EBForm onSubmit={onSubmit}>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Basic Information */}
//         <div className="space-y-5">
//           <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
//             <div className="p-2 bg-[#104042] rounded-lg">
//               <Building2 className="w-4 h-4 text-white" />
//             </div>
//             <h2 className="text-base font-semibold text-[#104042]">Basic Information</h2>
//           </div>
//           <div className="space-y-4">
//             <EBInput
//               label="Branch Name"
//               name="name"
//               type="text"
//               icon={<Building2 />}
//               className="border-0"
//               placeholder="Enter branch name"
//             />
//             <EBInput
//               label="Branch Code"
//               name="code"
//               type="text"
//               icon={<Building2 />}
//               className=""
//               placeholder="e.g. 01, 02"
//             />
//           </div>
//         </div>

//         {/* Location Information */}
//         <div className="space-y-5">
//           <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
//             <div className="p-2 bg-[#104042] rounded-lg">
//               <MapPin className="w-4 h-4 text-white" />
//             </div>
//             <h2 className="text-base font-semibold text-[#104042]">Location Information</h2>
//           </div>
//           <div className="space-y-4">
//             <EBInput
//               label="Address"
//               name="address"
//               type="text"
//               icon={<MapPin />}
//               className=""
//               placeholder="Enter complete address"
//             />
//             <div className="grid grid-cols-2 gap-4">
//               <EBSelect
//                 options={cityOptions}
//                 label="City"
//                 name="city"
//                 icon={<MapPin />}
//                 className=""
//                 placeholder="Select city"
//               />
//               <EBInput
//                 label="State"
//                 name="state"
//                 type="text"
//                 icon={<MapPin />}
//                 className=""
//                 placeholder="Enter state"
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <EBInput
//                 label="Country"
//                 name="country"
//                 type="text"
//                 icon={<MapPin />}
//                 className=""
//                 defaultValue="Bangladesh"
//               />
//               <EBInput
//                 label="Zip Code"
//                 name="zipCode"
//                 type="text"
//                 icon={<MapPin />}
//                 className=""
//                 placeholder="Enter zip code"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Contact Information */}
//         <div className="space-y-5">
//           <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
//             <div className="p-2 bg-[#104042] rounded-lg">
//               <Phone className="w-4 h-4 text-white" />
//             </div>
//             <h2 className="text-base font-semibold text-[#104042]">Contact Information</h2>
//           </div>
//           <div className="space-y-4">
//             <EBInput
//               label="Contact Number"
//               name="contactNumber"
//               type="text"
//               icon={<Phone />}
//               className=""
//               placeholder="Enter contact number"
//             />
//             <EBInput
//               label="Email"
//               name="email"
//               type="email"
//               icon={<Mail />}
//               className=""
//               placeholder="Enter email address"
//             />
//           </div>
//         </div>

//         {/* Management */}
//         <div className="space-y-5">
//           <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
//             <div className="p-2 bg-[#104042] rounded-lg">
//               <Users className="w-4 h-4 text-white" />
//             </div>
//             <h2 className="text-base font-semibold text-[#104042]">Management</h2>
//           </div>
//           <EBSelectMultiple
//             mode="multiple"
//             options={daysOptions}
//             label="Managers"
//             name="managers"
//             icon={<Users />}
//             className=""
//           />
//         </div>
//       </div>

//       {/* Schedule Section - Full Width */}
//       <div className="mt-8 space-y-5">
//         <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
//           <div className="p-2 bg-[#104042] rounded-lg">
//             <Clock className="w-4 h-4 text-white" />
//           </div>
//           <h2 className="text-base font-semibold text-[#104042]">Operating Schedule</h2>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <EBTimePicker
//             label="Open Time"
//             name="openingSchedule.openTime"
//             icon={<Clock />}
//             className=""
//           />
//           <EBTimePicker
//             label="Close Time"
//             name="openingSchedule.closeTime"
//             icon={<Clock />}
//             className=""
//           />
//           <div className="lg:col-span-2">
//             <EBSelectMultiple
//               mode="multiple"
//               options={daysOptions}
//               label="Opening Days"
//               name="openingSchedule.days"
//               icon={<Calendar />}
//               placeholder="Select operating days"
//               className=""
//             />
//           </div>
//         </div>
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-center pt-8">
//         <Button
//           type="submit"
//           className="group relative bg-[#104042] hover:bg-[#104042] text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#104042] focus-visible:ring-offset-2 active:scale-[0.98] w-full sm:w-auto cursor-pointer overflow-hidden border-2 border-[#104042]"
//         >
//           <div className="absolute inset-0 bg-[#AEFF1C] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
//           <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-[#104042] transition-colors duration-500">
//             <Building2 className="w-4 h-4" />
//             Create Branch
//           </span>
//         </Button>
//       </div>
//     </EBForm>
//   </div>
// </div>

//   );
// };

// export default CreateBranch;
