"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { Eye, Search, X } from "lucide-react";
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
import Loading from "@/shared/loading/Loading";
import {
  type ActionConfig,
  type ColumnDef,
  EBTable,
} from "@/shared/table/EBTable";
import SecondLoading from "@/shared/loading/SecondLoading";
import { useDebounce } from "@/hooks/debounce.hook";
import { useGetCustomerLoansQuery } from "@/redux/api/loanApi";
import { TLoan } from "@/types/global.type";
import { useUpdateLoanStatusMutation } from "@/redux/api/multipleApi";
import { toast } from "sonner";
import PaginationControls from "@/shared/paginate/PaginateControl";

const AdminCustomerLoansPage = () => {
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [updateLoanStatus] = useUpdateLoanStatusMutation();
  const { register, watch, setValue } = useForm();
  const searchTerm = useDebounce(watch("search"));

  const queryParams = [];
  if (searchTerm && searchTerm.trim() !== "") {
    queryParams.push({ name: "searchTerm", value: searchTerm.trim() });
  }
  if (statusFilter) {
    queryParams.push({ name: "status", value: statusFilter });
  }
  if (currentPage) {
    queryParams.push({ name: "page", value: currentPage });
  }

  const resetFilter = () => {
    setStatusFilter(undefined);
    setValue("search", "");
    setCurrentPage(1)
  };

  const {
    data: allLoans,
    isLoading,
    isFetching,
  } = useGetCustomerLoansQuery(queryParams.length ? queryParams : undefined);
  const loans: TLoan[] = allLoans?.data || [];
  const totalPage = allLoans?.meta.totalPage;

  const handleStatusUpdate = async (value: string, id: string | undefined) => {
    const toastId = toast.loading("Processing...");
    try {
      const statusData = {
        id: id,
        data: {
          status: value.toString(),
        },
      };
      const res = await updateLoanStatus(statusData);
      console.log(res);
      if (res?.data?.success) {
        toast.success("Loan status updated", {
          id: toastId,
          duration: 3000,
        });
      } else {
        toast.error("Loan status update failed!", {
          id: toastId,
          duration: 4000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns: ColumnDef<TLoan>[] = [
    {
      key: "accountNumber",
      header: "Account Number",
      render: (item) => (
        <div className="font-medium text-gray-900">
          {item.account?.accountNumber || item.accountNumber || "N/A"}
        </div>
      ),
    },
    {
      key: "accountHolderName",
      header: "Account Holder",
      render: (item) => (
        <div className="space-y-1">
          <div className="font-medium text-gray-900">
            {item.account?.accountHolderName ||
              `${item.user?.name?.firstName || ""} ${
                item.user?.name?.lastName || ""
              }`.trim() ||
              "N/A"}
          </div>
          <div className="text-xs text-gray-500">
            {item.user?.email || "N/A"}
          </div>
        </div>
      ),
    },
    {
      key: "loanAmount",
      header: "Loan Amount",
      render: (item) => (
        <div className="font-semibold text-gray-900">
          {item.account?.currency || "BDT"}{" "}
          {item.loanAmount?.toLocaleString() || "0"}
        </div>
      ),
    },
    {
      key: "remainingBalance",
      header: "Remaining Balance",
      render: (item) => (
        <div className="text-gray-700">
          {item.account?.currency || "BDT"}{" "}
          {item.remainingBalance?.toLocaleString() || "0"}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item) => {
        const badgeVariant:
          | "default"
          | "secondary"
          | "destructive"
          | "outline" = "default";
        let badgeColorClass = "";

        switch (item.status) {
          case "approved":
          case "active":
            badgeColorClass = "bg-green-100 text-green-800 hover:bg-green-100";
            break;
          case "pending":
            badgeColorClass =
              "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
            break;
          case "rejected":
            badgeColorClass = "bg-red-100 text-red-800 hover:bg-red-100";
            break;
          case "paid":
            badgeColorClass = "bg-blue-100 text-blue-800 hover:bg-blue-100";
            break;
          default:
            badgeColorClass = "bg-gray-100 text-gray-800 hover:bg-gray-100";
            break;
        }

        return (
          <Badge
            variant={badgeVariant}
            className={`capitalize ${badgeColorClass}`}
          >
            {item.status || "pending"}
          </Badge>
        );
      },
    },
    {
      key: "createdAt",
      header: "Created Date",
      render: (item) => (
        <div className="text-xs text-gray-600">
          {item.createdAt
            ? dayjs(item.createdAt).format("MMM DD, YYYY")
            : "N/A"}
        </div>
      ),
    },
  ];

  const actions: ActionConfig<TLoan>[] = [
    {
      type: "link",
      icon: <Eye />,
      href: (item) => `/dashboard/admin/customer-loans/${item._id}`,
      className: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    },
    {
      type: "select",
      placeholder: "Status Update",
      selectOptions: [
        { value: "approved", label: "Approve & Disburse" },
        { value: "rejected", label: "Reject" },
      ],
      onSelectChange: (value, item) => handleStatusUpdate(value, item?._id),
      selectClassName: "cursor-pointer", // optional
    },
  ];

  if (isLoading && !loans.length) {
    return <Loading />;
  }

  return (
    <div className="space-y-3 px-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ color: "#104042" }}
        >
          Manage Customer Loans
        </h1>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-gray-50 p-4 rounded-lg border">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              {...register("search")}
              placeholder="Search by account number, name, email..."
              className="pl-10 pr-8 border-gray-200 focus:border-[#104042] focus:ring-[#104042]"
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
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value === "all" ? undefined : value)
              }
            >
              <SelectTrigger className="w-[140px] border-gray-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>

            <Button
              className="bg-rose-500 cursor-pointer hover:bg-rose-600"
              onClick={resetFilter}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-xs text-gray-600">
          {loans.length} of {allLoans?.meta?.total || loans.length} loans
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <EBTable
          data={loans}
          columns={columns}
          actions={actions}
          isLoading={isFetching}
          emptyMessage="No loans found."
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

export default AdminCustomerLoansPage;
