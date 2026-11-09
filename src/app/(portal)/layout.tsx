import ManagerShell from "@/shared/portal/ManagerShell";
import { ReactNode } from "react";

const PortalLayout = ({ children }: { children: ReactNode }) => {
  return <ManagerShell>{children}</ManagerShell>;
};

export default PortalLayout;
