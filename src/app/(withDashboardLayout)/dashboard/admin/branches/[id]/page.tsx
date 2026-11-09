/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetEachBranchQuery } from "@/redux/api/branchApi";
import Loading from "@/shared/loading/Loading";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  DollarSign,
  Building2,
  User,
  Calendar,
  Wallet,
  PiggyBank,
} from "lucide-react";

const AdminSpecificBranchPage = () => {
  const params = useParams();
  const id = params?.id;
  const { data: branchData, isLoading } = useGetEachBranchQuery(id, {
    skip: !id,
  });

  const branch = branchData?.data;

  if (isLoading) {
    return <Loading />;
  }

  if (!branch) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Branch Not Found
              </h3>
              <p className="text-gray-600">
                The requested branch could not be found.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="px-4 md:px-6 pb-12">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#104042] to-[#1a6b6e] p-6 text-white">
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="h-8 w-8" />
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30"
                  >
                    Branch Code: {branch.code}
                  </Badge>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {branch.name}
                </h1>
                <p className="text-base opacity-90">
                  Serving the community since{" "}
                  {formatDate(branch.branchOpenedAt)}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-75 mb-1">Total Assets</div>
                <div className="text-2xl font-bold">
                  {formatCurrency(branch.reserevedBalance + branch.usedBalance)}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          {/* Contact Information */}
          <Card className="lg:col-span-2 bg-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#104042]">
                <MapPin className="h-5 w-5" />
                Branch Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#104042] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Address
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {branch.address}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {branch.city}, {branch.state} {branch.zipCode},{" "}
                        {branch.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#104042]" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Contact Number
                      </h4>
                      <p className="text-gray-600">{branch.contactNumber}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[#104042]" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Email
                      </h4>
                      <p className="text-gray-600">{branch.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[#104042] mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Operating Hours
                      </h4>
                      <div className="space-y-1">
                        <p className="text-gray-600">
                          {branch.openingSchedule.days.join(", ")}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatTime(branch.openingSchedule.openTime)} -{" "}
                          {formatTime(branch.openingSchedule.closeTime)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#104042]">
                <DollarSign className="h-5 w-5" />
                Financial Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiggyBank className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Reserved Balance
                    </span>
                  </div>
                  <span className="font-semibold text-green-700">
                    {formatCurrency(branch.reserevedBalance)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">
                      Used Balance
                    </span>
                  </div>
                  <span className="font-semibold text-blue-700">
                    {formatCurrency(branch.usedBalance)}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="p-3 bg-[#104042]/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#104042]">
                    Total Assets
                  </span>
                  <span className="font-bold text-[#104042]">
                    {formatCurrency(
                      branch.reserevedBalance +
                        branch.usedBalance +
                        branch.interestBalance
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Manager Information */}
        <Card className="bg-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#104042]">
              <User className="h-5 w-5" />
              Branch Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {branch.managers.map((manager: any) => (
                <div
                  key={manager._id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#104042] text-white rounded-full flex items-center justify-center font-semibold">
                      {manager.name.firstName?.[0]}
                      {manager.name.lastName?.[0]}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {manager.name.firstName} {manager.name.lastName}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {manager.role}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      <span>{manager.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>Joined: {formatDate(manager.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSpecificBranchPage;
