"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Search, X, Users, Trash2 } from "lucide-react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/api/adminApi";
import type { TGlobalResponse, User } from "@/types/global.type";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import type { ColumnDef, ActionConfig } from "@/shared/table/EBTable";
import Loading from "@/shared/loading/Loading";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/debounce.hook";
import PaginationControls from "@/shared/paginate/PaginateControl";

const ManageUsers = () => {
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [updateUserRole] = useUpdateUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();

  const { register, watch, setValue } = useForm();
  const searchTerm = useDebounce(watch("search"));

  // Build query parameters
  const queryParams = [];
  if (searchTerm && searchTerm.trim() !== "") {
    queryParams.push({ name: "searchTerm", value: searchTerm.trim() });
  }
  if (roleFilter) {
    queryParams.push({ name: "role", value: roleFilter });
  }
  if (statusFilter) {
    queryParams.push({ name: "status", value: statusFilter });
  }
  if (currentPage) {
    queryParams.push({ name: "page", value: currentPage });
  }

  const resetFilter = () => {
    setRoleFilter(undefined);
    setStatusFilter(undefined);
    setValue("search", "");
    setCurrentPage(1)
  };

  const {
    data: users,
    isLoading,
    isFetching,
  } = useGetUsersQuery(queryParams.length ? queryParams : undefined);
  const userData = users?.data;
  const totalPage = users?.meta.totalPage;

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const data = {
        id: userId,
        userRole: { role: newRole.toString() },
      };
      const res = await updateUserRole(data);
      if (res?.data?.success) {
        toast.success(res?.data?.message, { duration: 3000 });
      } else {
        toast.error("Role Update failed", { duration: 4000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update role", { duration: 4000 });
    }
  };

  const handleRemoveUser = async (userId: string) => {
    try {
      const res = (await deleteUser(userId)) as TGlobalResponse;
      if (res?.data?.success) {
        toast.success(res?.data?.message || "User deleted successfully", {
          duration: 3000,
        });
      } else {
        toast.error(res?.error?.data?.message || "User Delete Failed", {
          duration: 4000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user", { duration: 4000 });
    }
  };

  // Define columns for user table
  const columns: ColumnDef<User>[] = [
    {
      key: "profile",
      header: "Profile",
      render: (user) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={user?.profilePhotoUrl || "/placeholder.svg"}
              alt={`${user.name.firstName} ${user.name.lastName}`}
            />
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">{`${user.name.firstName} ${user.name.lastName}`}</div>
          </div>
        </div>
      ),
    },
    {
      key: "contact",
      header: "Contact Info",
      render: (user) => (
        <div className="text-sm">
          <div className="text-gray-900">{user.email}</div>
          <div className="text-gray-500">{user.phoneNumber}</div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (user) => {
        const roleColors = {
          admin: "bg-purple-100 text-purple-800",
          user: "bg-blue-100 text-blue-800",
          manager: "bg-green-100 text-green-800",
          moderator: "bg-orange-100 text-orange-800",
        };
        const role = user.role || "user";
        return (
          <Badge
            className={`capitalize ${
              roleColors[role as keyof typeof roleColors] ||
              "bg-gray-100 text-gray-800"
            } hover:${
              roleColors[role as keyof typeof roleColors] ||
              "bg-gray-100 text-gray-800"
            }`}
          >
            {role}
          </Badge>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      render: (user) => {
        const isBlocked = user.isDeleted;
        return (
          <Badge
            className={`capitalize ${
              isBlocked
                ? "bg-red-100 text-red-800 hover:bg-red-100"
                : "bg-green-100 text-green-800 hover:bg-green-100"
            }`}
          >
            {isBlocked ? "Blocked" : "Active"}
          </Badge>
        );
      },
    },
    {
      key: "createdAt",
      header: "Joined Date",
      render: (user) => (
        <div className="text-sm">
          <div className="text-gray-900">
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "N/A"}
          </div>
          <div className="text-gray-500">
            {user.createdAt
              ? new Date(user.createdAt).toLocaleTimeString()
              : ""}
          </div>
        </div>
      ),
    },
  ];

  // Define actions for user table
  const actions: ActionConfig<User>[] = [
    {
      type: "select",
      placeholder: "Change Role",
      selectOptions: [
        { value: "customer", label: "Customer" },
        { value: "admin", label: "Admin" },
        { value: "manager", label: "Manager" },
      ],
      onSelectChange: (newRole, user) => handleRoleChange(user._id, newRole),
      selectClassName: "w-[120px]",
    },
    {
      type: "button",
      icon: <Trash2 className="h-4 w-4" />,
      variant: "outline",
      className: "bg-red-500 text-white hover:bg-red-600",
      onClick: (user) => {
        // We need to handle the alert dialog differently since EBTable doesn't support custom renders
        // Let's create a state to manage the dialog
        setUserToDelete(user);
        setShowDeleteDialog(true);
      },
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-6 space-y-4 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#104042] flex items-center gap-2">
            <Users className="h-6 w-6" />
            Manage Users
          </h1>
          <p className="text-gray-600 mt-1">
            View and manage user accounts and permissions
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-gray-50 p-4 rounded-lg border">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              {...register("search")}
              placeholder="Search users..."
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
              value={roleFilter}
              onValueChange={(value) =>
                setRoleFilter(value === "all" ? undefined : value)
              }
            >
              <SelectTrigger className="w-[140px] border-gray-200">
                <SelectValue placeholder="Role filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="bg-rose-500 hover:bg-rose-600 cursor-pointer"
              onClick={resetFilter}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-xs text-gray-600">
          {userData?.length} of {users?.meta?.total || userData?.length} users
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <EBTable
          data={userData}
          columns={columns}
          actions={actions}
          isLoading={isFetching}
          emptyMessage="No users found. User accounts will appear here."
          getRowKey={(user) => user._id || Math.random().toString()}
          className="bg-white"
        />
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPage={totalPage || 1}
        setPage={setCurrentPage} // this sets the state directly
      />
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will block this user. They will no longer be able to access
              the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (userToDelete) {
                  handleRemoveUser(userToDelete._id);
                  setShowDeleteDialog(false);
                  setUserToDelete(null);
                }
              }}
              className="cursor-pointer bg-red-500 hover:bg-red-600"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageUsers;
