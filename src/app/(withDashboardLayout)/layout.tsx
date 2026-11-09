import DashboardNavbar from "@/shared/sidebar/DashboardNavbar";
import Sidebar from "@/shared/sidebar/Sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen">
      <div className="overflow-y-auto hide-scrollbar h-full w-72 bg-gray-200 hidden lg:block border-r border-gray-300/60">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-y-auto h-full bg-slate-50/60">
        <DashboardNavbar />
        <div className="mt-5 px-1 sm:px-2 pb-6">{children}</div>
      </div>
    </div>
  );
};

export default layout;
