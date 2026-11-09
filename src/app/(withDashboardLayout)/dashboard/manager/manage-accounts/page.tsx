"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Search, X, EyeIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "@/hooks/debounce.hook";
import { useGetAccountsQuery } from "@/redux/api/accountApi";
import Loading from "@/shared/loading/Loading";
import SecondLoading from "@/shared/loading/SecondLoading";
import { TBankAccount } from "@/types/account.type";
import TableModal from "@/shared/modal/TableModal";
import UpdateAccount from "@/components/adminPages/UpdateAccount";
import AskDialog from "@/shared/askDialog/AskDialog";
import {
  useDeleteAccountMutation,
  useUpdateAccountStatusMutation,
} from "@/redux/api/adminApi";
import { toast } from "sonner";
import Link from "next/link";
import PaginationControls from "@/shared/paginate/PaginateControl";

const ManagerManageAccountsPage = () => {
  const [accountType, setAccountType] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [updateAccountStatus] = useUpdateAccountStatusMutation();
  const [deleteAccount] = useDeleteAccountMutation();
  const { register, watch, setValue } = useForm();

  const addParams = (id: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("account", id);
    window.history.pushState({}, "", url.toString());
  };

  const removeParams = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("account");
    window.history.pushState({}, "", url.toString());
  };

  const handleStatusUpdate = async (accountNumber: string, value: string) => {
    const toastId = toast.loading("Processing...");
    try {
      const statusData = {
        id: accountNumber,
        data: {
          status: value.toString(),
        },
      };
      const res = await updateAccountStatus(statusData);
      if (res?.data?.success) {
        toast.success("Account status updated", {
          id: toastId,
          duration: 3000,
        });
      } else {
        toast.error("Account status update failed!", {
          id: toastId,
          duration: 4000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteAccount(id);
      if (res?.data?.success) {
        toast.success("This account deleted successfully", { duration: 3000 });
      } else {
        toast.error("Account delete failed!", { duration: 4000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchTerm = useDebounce(watch("search"));

  const queryParams = [];
  if (searchTerm && searchTerm.trim() !== "") {
    queryParams.push({ name: "searchTerm", value: searchTerm.trim() });
  }
  if (accountType) {
    queryParams.push({ name: "accountType", value: accountType });
  }
  if (status) {
    queryParams.push({ name: "status", value: status });
  }
  if (currentPage) {
    queryParams.push({ name: "page", value: currentPage });
  }

  const resetFilter = () => {
    setAccountType("");
    setStatus("");
    setValue("search", "");
    setCurrentPage(1);
  };

  const {
    data: accounts,
    isLoading,
    isFetching,
  } = useGetAccountsQuery(queryParams.length ? queryParams : undefined);
  const totalPage = accounts?.meta.totalPage;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-3 px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1
          className="text-xl sm:text-2xl tracking-tight"
          style={{ color: "#104042" }}
        >
          Manage Accounts
        </h1>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between bg-gray-50 p-3 sm:p-4 rounded-lg border">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              {...register("search")}
              placeholder="Search accounts..."
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
              onValueChange={(value) =>
                setAccountType(value ? value : undefined)
              }
            >
              <SelectTrigger className="w-[120px] sm:w-[140px] border-gray-200 text-xs sm:text-sm">
                <SelectValue placeholder="Account Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="savings" className="text-xs sm:text-sm">
                  Savings
                </SelectItem>
                <SelectItem value="checking" className="text-xs sm:text-sm">
                  Checking
                </SelectItem>
                <SelectItem value="business" className="text-xs sm:text-sm">
                  Business
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => setStatus(value ? value : undefined)}
            >
              <SelectTrigger className="w-[100px] sm:w-[120px] border-gray-200 text-xs sm:text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending" className="text-xs sm:text-sm">
                  Pending
                </SelectItem>
                <SelectItem value="active" className="text-xs sm:text-sm">
                  Active
                </SelectItem>
                <SelectItem value="closed" className="text-xs sm:text-sm">
                  Closed
                </SelectItem>
                <SelectItem value="suspended" className="text-xs sm:text-sm">
                  Suspended
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

        <div className="text-xs text-gray-600 text-right">
          {accounts?.meta.total} of {accounts?.data.length} Accounts
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="text-gray-900 text-xs sm:text-sm">
                Account Details
              </TableHead>
              <TableHead className="text-gray-900 text-xs sm:text-sm">
                Type
              </TableHead>
              <TableHead className="text-gray-900 text-xs sm:text-sm">
                Balance
              </TableHead>
              <TableHead className="text-gray-900 text-xs sm:text-sm">
                Status
              </TableHead>
              <TableHead className="text-gray-900 text-xs sm:text-sm">
                Location
              </TableHead>
              <TableHead className="text-gray-900 text-xs sm:text-sm">
                Created
              </TableHead>
              <TableHead className="text-gray-900 text-xs sm:text-sm">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isFetching && (
              <TableRow>
                <TableCell colSpan={7} className="py-10">
                  <SecondLoading />
                </TableCell>
              </TableRow>
            )}

            {!isFetching && accounts?.data?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-500 text-sm sm:text-base"
                >
                  No accounts found.
                </TableCell>
              </TableRow>
            )}

            {!isFetching &&
              accounts?.data?.map((acc: TBankAccount) => (
                <TableRow key={acc.accountNumber}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-gray-900 text-sm sm:text-base">
                        {acc.accountHolderName}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 font-mono">
                        {acc.accountNumber}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="capitalize bg-green-100 text-green-800 hover:bg-green-100 text-xs sm:text-sm">
                      {acc.accountType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900 text-sm sm:text-base">
                      ৳ {acc.balance}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="default"
                      className="capitalize text-xs sm:text-sm"
                    >
                      {acc.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs sm:text-sm">
                      <div className="text-gray-900">{acc.city}</div>
                      <div className="text-gray-500">{acc.country}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm text-gray-600">
                    {acc?.createdAt?.split("T")[0]}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Link
                        href={`/portal/accounts/${acc._id}`}
                        className="hover:bg-[#104042a1] bg-[#104042] rounded-full p-1 text-white transition-colors cursor-pointer"
                      >
                        <EyeIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Link>
                      <Select
                        onValueChange={(value) =>
                          handleStatusUpdate(acc.accountNumber, value)
                        }
                        defaultValue="status update"
                      >
                        <SelectTrigger className="w-[80px] sm:w-[100px] h-7 sm:h-8 text-xs border-gray-200 cursor-pointer">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            className="cursor-pointer text-xs sm:text-sm"
                            value="status update"
                            disabled
                          >
                            Status Update
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer text-xs sm:text-sm"
                            value="pending"
                          >
                            Pending
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer text-xs sm:text-sm"
                            value="active"
                          >
                            Active
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer text-xs sm:text-sm"
                            value="closed"
                          >
                            Closed
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer text-xs sm:text-sm"
                            value="suspended"
                          >
                            Suspended
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <TableModal
                        open={open}
                        onOpenChange={(isOpen) => {
                          setOpen(isOpen);
                          if (!isOpen) {
                            setId(null);
                            removeParams();
                          }
                        }}
                        title="Edit Account"
                        description="Update Account here."
                        width="!w-full !max-w-3xl"
                        trigger={
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-[#104042] hover:text-white transition-colors cursor-pointer"
                            onClick={() => {
                              setId(acc._id);
                              setOpen(true);
                              addParams(acc._id);
                            }}
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        }
                      >
                        <UpdateAccount setOpen={setOpen} id={id} />
                      </TableModal>

                      <AskDialog
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                        title="Delete Account"
                        description="Do you want to delete this account?"
                        okText="Yes, delete"
                        buttonText={
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        }
                        handleSubmit={() => handleDelete(acc._id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPage={totalPage || 1}
        setPage={setCurrentPage} // this sets the state directly
      />
    </div>
  );
};

export default ManagerManageAccountsPage;
