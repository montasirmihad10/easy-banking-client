export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const states = [
  "Barisal",
  "Chattogram",
  "Dhaka",
  "Khulna",
  "Mymensingh",
  "Rajshahi",
  "Rangpur",
  "Sylhet",
];

export type TError = {
  error: {
    data?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      errorMessages: any;
      message: string;
      statusCode: number;
    };
    status?: boolean;
  };
};

export type TGlobalResponse = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  success?: boolean;
  message?: string;
  error?: {
    data?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      errorMessages: any;
      message: string;
      statusCode: number;
    };
    status?: boolean;
  };
};

export interface User {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  role: "admin" | "customer" | "manager";
  isDeleted: boolean;
  profilePhotoUrl: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  data: User[];
}

export interface TUser {
  otp: string;
  expiresAt: Date;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  role: string;
  isDeleted: boolean;
  profilePhotoUrl?: string;
  phoneNumber: string;
}

export interface TLoan {
  _id: string;
  account?: {
    _id: string;
    accountHolderName: string;
    accountNumber: string;
    accountType: string;
    balance: number;
    branch: string;
    status: string;
    currency: string;
    address: string;
    city: string;
    country: string;
    dateOfBirth: string;
    gender: string;
    createdAt: string;
  };
  accountNumber?: string;
  user?: {
    _id: string;
    name: {
      firstName: string;
      lastName: string;
    };
    email: string;
    phoneNumber: string;
    profilePhotoUrl?: string;
    role: string;
    createdAt: string;
  };
  branch: {
    _id: string;
    name: string;
    code: string;
    address: string;
    city: string;
    country: string;
    contactNumber: string;
    email: string;
  };
  loanAmount: number;
  interestRate?: number;
  term?: number;
  startDate?: string;
  endDate?: string;
  remainingBalance?: number;
  status?: "pending" | "approved" | "rejected" | "active" | "paid";
  repaymentSchedule?: Array<{
    dueDate: string;
    amountDue: number;
    paid: boolean;
    paidDate?: string;
  }>;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
