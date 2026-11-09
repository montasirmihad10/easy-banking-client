/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetAccountQuery } from "@/redux/api/adminApi";
import Loading from "@/shared/loading/Loading";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  Banknote,
  CreditCard,
  User,
} from "lucide-react";
import { useGetMyTransactionsQuery } from "@/redux/api/multipleApi";
import dayjs from "dayjs";

const SpecificAccount = () => {
  const params = useParams();
  const id = params?.id;
  const { data: transactionData } = useGetMyTransactionsQuery(undefined);
  const { data: accountData, isLoading } = useGetAccountQuery(id);
  const account = accountData?.data;
  const transactions = transactionData?.data;

  if (isLoading) {
    return <Loading />;
  }

  if (!account) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Account not found</p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: account.currency || "BDT",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="pb-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-[#104042] to-[#1a5a5d] p-6 text-white">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <Avatar className="h-16 w-16 border-4 border-white/20">
                <AvatarImage
                  src={account.user?.profilePhotoUrl || "/placeholder.svg"}
                  alt={account.accountHolderName}
                />
                <AvatarFallback className="bg-white/20 text-white text-lg font-semibold">
                  {account.accountHolderName
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {account.accountHolderName}
                </h1>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="flex items-center gap-1">
                    <CreditCard className="h-4 w-4" />
                    {account.accountNumber}
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white hover:bg-white/30"
                  >
                    {account.accountType?.toUpperCase()}
                  </Badge>
                  <Badge
                    variant={
                      account.status === "active" ? "default" : "destructive"
                    }
                    className={
                      account.status === "active"
                        ? "bg-green-500 hover:bg-green-600"
                        : ""
                    }
                  >
                    {account.status?.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-[#104042]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Current Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#104042]">
                {formatCurrency(account.balance)}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Minimum Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(account.minimumBalance || 0)}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Interest Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {dayjs(account.lastInterestDate).format("YYYY-MM-DD")}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Account Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#104042]">
                <User className="h-5 w-5" />
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Account Type
                  </p>
                  <p className="font-semibold capitalize">
                    {account.accountType}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Currency
                  </p>
                  <p className="font-semibold">{account.currency}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Minimum Balance
                  </p>
                  <p className="font-semibold">
                    {formatCurrency(account.minimumBalance)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Branch Code
                  </p>
                  <p className="font-semibold">{account.branchCode}</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Personal Information
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Date of Birth: {formatDate(account.dateOfBirth)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Gender: {account.gender}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{account.user?.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{account.user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {account.address}, {account.city}, {account.postalCode}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Branch Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#104042]">
                <Building2 className="h-5 w-5" />
                Branch Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">
                  {account.branch?.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Code: {account.branch?.code}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="text-sm">
                    <p>{account.branch?.address}</p>
                    <p>
                      {account.branch?.city}, {account.branch?.state}
                    </p>
                    <p>
                      {account.branch?.country} - {account.branch?.zipCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {account.branch?.contactNumber}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{account.branch?.email}</span>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Operating Hours
                </p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {account.branch?.openingSchedule?.openTime} -{" "}
                    {account.branch?.openingSchedule?.closeTime}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {account.branch?.openingSchedule?.days?.join(", ")}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Branch Opened
                </p>
                <p className="text-sm">
                  {formatDate(account.branch?.branchOpenedAt)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#104042]">
              <Calendar className="h-5 w-5" />
              Account Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">
                  Account Created
                </p>
                <p className="font-semibold">{formatDate(account.createdAt)}</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </p>
                <p className="font-semibold">{formatDate(account.updatedAt)}</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">
                  Last Interest Date
                </p>
                <p className="font-semibold">
                  {formatDate(account.lastInterestDate)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#104042]">
              <Banknote className="h-5 w-5" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {transactions?.length > 0 ? (
              <div className="space-y-2">
                {transactions?.map((transaction: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                    <div
                      className={`font-semibold ${
                        transaction.type === "credit"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "credit" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Banknote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No transactions found</p>
                <p className="text-sm text-muted-foreground">
                  Transaction history will appear here
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpecificAccount;
