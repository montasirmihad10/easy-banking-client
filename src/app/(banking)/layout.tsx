import BankingShell from "@/shared/banking/BankingShell";
import { ReactNode } from "react";

const BankingLayout = ({ children }: { children: ReactNode }) => {
  return <BankingShell>{children}</BankingShell>;
};

export default BankingLayout;
