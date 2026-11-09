export interface TBankAccount {
  _id: string;
  accountNumber: string;
  user: string;
  customer?: string;
  manager?: string;
  admin?: string;
  branch: string;
  accountType: "savings" | "checking" | "business";
  balance?: number;
  currency?: string;
  status: "pending" | "active" | "closed" | "suspended";
  branchCode?: string;
  accountHolderName?: string;
  interestRate?: number;
  transactions?: string[];
  minimumBalance?: number;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Other";
  address: string;
  city: string;
  postalCode: string;
  country: string;
  lastInterestDate: Date;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}
