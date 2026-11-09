"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Download, Search, X } from "lucide-react";
import { useGetMyTransactionsQuery } from "@/redux/api/multipleApi";
import { useDownloadTransactionMutation } from "@/redux/api/transactionApi";
import { EBTable } from "@/shared/table/EBTable";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { ColumnDef, ActionConfig } from "@/shared/table/EBTable";
import Loading from "@/shared/loading/Loading";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/debounce.hook";
import type { TUser } from "@/types/global.type";
import PaginationControls from "@/shared/paginate/PaginateControl";

// Your transaction type
export type TTransaction = {
  _id: string;
  account?: string;
  user?: TUser;
  transaction_Id?: string;
  transactionType:
    | "deposit"
    | "withdraw"
    | "transfer"
    | "interest"
    | "loan"
    | "deposit-loan";
  amount: number;
  fromAccount?: string;
  toAccount?: string;
  status?: "pending" | "completed" | "failed";
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const CustomerTransactionPage = () => {
  const [transactionTypeFilter, setTransactionTypeFilter] = useState<
    string | undefined
  >(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [downloadTransaction] = useDownloadTransactionMutation();
  const { register, watch, setValue } = useForm();
  const searchTerm = useDebounce(watch("search"));

  const queryParams = [];
  if (searchTerm && searchTerm.trim() !== "") {
    queryParams.push({ name: "searchTerm", value: searchTerm.trim() });
  }
  if (transactionTypeFilter) {
    queryParams.push({ name: "transactionType", value: transactionTypeFilter });
  }
  if (statusFilter) {
    queryParams.push({ name: "status", value: statusFilter });
  }
  if (currentPage) {
    queryParams.push({ name: "page", value: currentPage });
  }

  const resetFilter = () => {
    setTransactionTypeFilter(undefined);
    setStatusFilter(undefined);
    setValue("search", "");
    setCurrentPage(1)
  };

  const {
    data: myTransactions,
    isLoading,
    isFetching,
  } = useGetMyTransactionsQuery(queryParams.length ? queryParams : undefined);
  const transactions = myTransactions?.data;
  const totalPage = myTransactions?.meta.totalPage;

  const handleDownloadTransaction = async (transaction: TTransaction) => {
    try {
      const res = await downloadTransaction(transaction?._id);
      if (res?.data?.data?.data) {
        const pdfArray = new Uint8Array(res.data.data.data);
        const blob = new Blob([pdfArray], { type: "application/pdf" });
        // Create a download URL
        const url = window.URL.createObjectURL(blob);
        // Create a temporary anchor element
        const a = document.createElement("a");
        a.href = url;
        a.download = `transaction-${transaction?.transaction_Id}.pdf`;
        document.body.appendChild(a);
        a.click();
        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        toast.error("Something went wrong", { duration: 4000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Define columns for transaction table
  const columns: ColumnDef<TTransaction>[] = [
    {
      key: "transaction_details",
      header: "Transaction Details",
      render: (transaction) => (
        <div>
          <div className=" text-gray-900">
            {transaction.transaction_Id || "N/A"}
          </div>
        </div>
      ),
    },
    {
      key: "transactionType",
      header: "Type",
      render: (transaction) => {
        const typeColors = {
          deposit: "bg-green-100 text-green-800",
          withdraw: "bg-red-100 text-red-800",
          transfer: "bg-blue-100 text-blue-800",
          interest: "bg-purple-100 text-purple-800",
          loan: "bg-orange-100 text-orange-800",
          "deposit-loan": "bg-yellow-100 text-yellow-800",
        };
        return (
          <Badge
            className={`capitalize ${
              typeColors[transaction.transactionType]
            } hover:${typeColors[transaction.transactionType]}`}
          >
            {transaction.transactionType.replace("-", " ")}
          </Badge>
        );
      },
    },
    {
      key: "amount",
      header: "Amount",
      render: (transaction) => {
        const isDebit = ["withdraw", "transfer"].includes(
          transaction.transactionType
        );
        return (
          <div
            className={`font-medium ${
              isDebit ? "text-red-600" : "text-green-600"
            }`}
          >
            {isDebit ? "-" : "+"}৳{transaction.amount.toLocaleString()}
          </div>
        );
      },
    },
    {
      key: "accounts",
      header: "Account Info",
      render: (transaction) => (
        <div className="text-xs">
          {transaction.transactionType === "transfer" ? (
            <>
              <div className="text-gray-900">
                From: {transaction.fromAccount || "N/A"}
              </div>
              <div className="text-gray-500">
                To: {transaction.toAccount || "N/A"}
              </div>
            </>
          ) : (
            <div className="text-gray-900">{transaction.account || "N/A"}</div>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (transaction) => {
        const statusColors = {
          pending: "bg-yellow-100 text-yellow-800",
          completed: "bg-green-100 text-green-800",
          failed: "bg-red-100 text-red-800",
        };
        const status = transaction.status || "pending";
        return (
          <Badge
            className={`capitalize ${statusColors[status]} hover:${statusColors[status]}`}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      key: "createdAt",
      header: "Date",
      render: (transaction) => (
        <div className="text-sm">
          <div className="text-gray-900">
            {transaction.createdAt
              ? new Date(transaction.createdAt).toLocaleDateString()
              : "N/A"}
          </div>
          <div className="text-gray-500">
            {transaction.createdAt
              ? new Date(transaction.createdAt).toLocaleTimeString()
              : ""}
          </div>
        </div>
      ),
    },
  ];

  // Define actions for transaction table
  const actions: ActionConfig<TTransaction>[] = [
    {
      type: "button",
      icon: <Download className="h-4 w-4" />,
      className: "cursor-pointer text-white bg-[#104042] hover:bg-gray-300",
      onClick: (transaction) => handleDownloadTransaction(transaction),
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-6 space-y-4 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#104042]">My Transactions</h1>
          <p className="text-gray-600 mt-1">
            View and manage your transaction history
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-gray-50 p-4 rounded-lg border">
        {/* Search + Selects */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
          {/* Search */}
          <div className="relative flex-1 max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              {...register("search")}
              placeholder="Search transactions..."
              className="pl-10 pr-8 border-gray-200 focus:border-[#104042] focus:ring-[#104042] w-full"
            />
            {searchTerm && (
              <X
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 cursor-pointer hover:text-red-500"
                onClick={() => setValue("search", "")}
              />
            )}
          </div>

          {/* Select Filters */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Select
              value={transactionTypeFilter ?? "all"}
              onValueChange={(value) =>
                setTransactionTypeFilter(value === "all" ? undefined : value)
              }
            >
              <SelectTrigger className="w-full sm:w-[160px] border-gray-200">
                <SelectValue placeholder="Types filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="withdraw">Withdraw</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
                <SelectItem value="loan">Loan</SelectItem>
                <SelectItem value="deposit-loan">Deposit Loan</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={statusFilter ?? "all"}
              onValueChange={(value) =>
                setStatusFilter(value === "all" ? undefined : value)
              }
            >
              <SelectTrigger className="w-full sm:w-[120px] border-gray-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            {/* Reset Button */}
            <Button
              variant="ghost"
              className="text-rose-500 border border-gray-200 hover:bg-rose-50"
              onClick={resetFilter}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="text-sm text-gray-600 w-full sm:w-auto text-right">
          {transactions.length} of{" "}
          {myTransactions?.meta?.total || transactions.length} transactions
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <EBTable
          data={transactions}
          columns={columns}
          actions={actions}
          isLoading={isFetching}
          emptyMessage="No transactions found. Your transaction history will appear here."
          getRowKey={(transaction) =>
            transaction.transaction_Id ||
            transaction.createdAt?.toString() ||
            Math.random().toString()
          }
          className="bg-white"
        />
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPage={totalPage || 1}
        setPage={setCurrentPage} // this sets the state directly
      />
    </div>
  );
};

export default CustomerTransactionPage;
