"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Download, Search, X } from "lucide-react";
import {
  useDownloadTransactionMutation,
  useGetTransactionsQuery,
  useReviewWithdrawMutation,
} from "@/redux/api/transactionApi";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TTransaction } from "../../customer/transactions/page";
import Loading from "@/shared/loading/Loading";
import { ActionConfig, ColumnDef, EBTable } from "@/shared/table/EBTable";
import SecondLoading from "@/shared/loading/SecondLoading";
import { useDebounce } from "@/hooks/debounce.hook";
import { toast } from "sonner";
import PaginationControls from "@/shared/paginate/PaginateControl";

const ManagerCustomerTransactionPage = () => {
  const [transactionTypeFilter, setTransactionTypeFilter] = useState<
    string | undefined
  >(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [downloadTransaction] = useDownloadTransactionMutation();
  const [reviewWithdraw] = useReviewWithdrawMutation();
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
    setCurrentPage(1);
  };

  const {
    data: allTransactions,
    isLoading,
    isFetching,
  } = useGetTransactionsQuery(queryParams.length ? queryParams : undefined);

  const transactions: TTransaction[] = allTransactions?.data || [];
  const totalPage = allTransactions?.meta.totalPage;

  const handleDownload = async (transaction: TTransaction) => {
    try {
      const res = await downloadTransaction(transaction?._id);
      const blobData = res?.data;
      if (blobData instanceof Blob || blobData) {
        const blob =
          blobData instanceof Blob
            ? blobData
            : new Blob([blobData], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `transaction-${transaction?.transaction_Id}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        toast.error("Something went wrong", { duration: 4000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns: ColumnDef<TTransaction>[] = [
    {
      key: "transaction_Id",
      header: "Transaction ID",
      className: "text-black text-xs sm:text-sm",
      render: (item) => (
        <>
          <h1>{item.transaction_Id}</h1>
        </>
      ),
    },
    {
      key: "transactionType",
      header: "Type",
      render: (item) => (
        <Badge className="capitalize bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs sm:text-sm">
          {item.transactionType}
        </Badge>
      ),
    },
    {
      key: "transaction_account",
      header: "Transaction Account",
      className: "text-gray-900 text-xs sm:text-sm",
      render: (item) => (
        <>
          <h1>{item.account ? item.account : `From: ${item.fromAccount}`}</h1>
          <p className="text-xs">{item.toAccount && `To: ${item.toAccount}`}</p>
        </>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (item) => (
        <div className="text-gray-900 text-xs sm:text-sm">৳{item.amount}</div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item) => {
        let badgeColorClass = "";
        switch (item.status) {
          case "completed":
            badgeColorClass = "bg-green-100 text-green-800 hover:bg-green-100";
            break;
          case "pending":
            badgeColorClass =
              "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
            break;
          case "failed":
            badgeColorClass = "bg-red-100 text-red-800 hover:bg-red-100";
            break;
          default:
            badgeColorClass = "bg-gray-100 text-gray-800 hover:bg-gray-100";
            break;
        }
        return (
          <Badge className={`capitalize ${badgeColorClass} text-xs sm:text-sm`}>
            {item.status}
          </Badge>
        );
      },
    },
    {
      key: "userEmail",
      header: "User Email",
      render: (item) => (
        <div className="text-xs text-gray-500">
          {item?.user?.email || "N/A"}
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Date",
      render: (item) => (
        <div className="text-xs text-gray-600">
          {item.createdAt
            ? format(new Date(item.createdAt), "MMM dd, yyyy")
            : "N/A"}
        </div>
      ),
    },
  ];

  const handleReviewWithdraw = async (
    item: TTransaction,
    action: "approve" | "reject",
  ) => {
    if (item.transactionType !== "withdraw" || item.status !== "pending") {
      toast.error("Only pending withdrawals can be reviewed");
      return;
    }
    try {
      const res = await reviewWithdraw({ id: item._id, action });
      if (res?.data?.success) {
        toast.success(res.data.message || `Withdrawal ${action}d`);
      } else {
        toast.error(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (res as any)?.error?.data?.message || `Failed to ${action} withdrawal`,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const actions: ActionConfig<TTransaction>[] = [
    {
      type: "select",
      placeholder: "Review",
      selectOptions: [
        { value: "approve", label: "Approve" },
        { value: "reject", label: "Reject" },
      ],
      onSelectChange: (value, item) => {
        if (value === "approve" || value === "reject") {
          handleReviewWithdraw(item, value);
        }
      },
    },
    {
      type: "button",
      icon: <Download className="h-3 w-3 sm:h-4 sm:w-4" />,
      onClick: (item) => {
        handleDownload(item);
      },
      hoverClassName: "hover:bg-[#104042] hover:text-white",
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-3 px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1
          className="text-xl sm:text-2xl font-bold tracking-tight"
          style={{ color: "#104042" }}
        >
          Manage Customer Transactions
        </h1>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between bg-gray-50 p-3 sm:p-4 rounded-lg border">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              {...register("search")}
              placeholder="Search transactions..."
              className="pl-10 pr-8 border-gray-200 focus:border-[#104042] focus:ring-[#104042] text-sm sm:text-base"
            />
            {searchTerm && (
              <X
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 cursor-pointer hover:text-red-500"
                onClick={() => setValue("search", "")}
              />
            )}
          </div>
          <div className="flex gap-2">
            <Select
              value={transactionTypeFilter}
              onValueChange={(value) =>
                setTransactionTypeFilter(value === "all" ? undefined : value)
              }
            >
              <SelectTrigger className="w-[120px] sm:w-[160px] border-gray-200 text-xs sm:text-sm">
                <SelectValue placeholder="Types filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs sm:text-sm">
                  All Types
                </SelectItem>
                <SelectItem value="deposit" className="text-xs sm:text-sm">
                  Deposit
                </SelectItem>
                <SelectItem value="withdraw" className="text-xs sm:text-sm">
                  Withdraw
                </SelectItem>
                <SelectItem value="transfer" className="text-xs sm:text-sm">
                  Transfer
                </SelectItem>
                <SelectItem value="loan" className="text-xs sm:text-sm">
                  Loan
                </SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value === "all" ? undefined : value)
              }
            >
              <SelectTrigger className="w-[100px] sm:w-[120px] border-gray-200 text-xs sm:text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs sm:text-sm">
                  All Status
                </SelectItem>
                <SelectItem value="pending" className="text-xs sm:text-sm">
                  Pending
                </SelectItem>
                <SelectItem value="completed" className="text-xs sm:text-sm">
                  Completed
                </SelectItem>
                <SelectItem value="failed" className="text-xs sm:text-sm">
                  Failed
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="bg-rose-500 cursor-pointer h-9 sm:h-10 w-9 sm:w-10 p-0 sm:p-2"
              onClick={resetFilter}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-xs text-gray-600 ml-auto sm:ml-0">
          {transactions.length} of{" "}
          {allTransactions?.meta?.total || transactions.length} transactions
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <EBTable
          data={transactions}
          columns={columns}
          actions={actions}
          isLoading={isFetching}
          emptyMessage="No transactions found."
          loadingComponent={<SecondLoading />}
          getRowKey={(item) => item._id}
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

export default ManagerCustomerTransactionPage;
