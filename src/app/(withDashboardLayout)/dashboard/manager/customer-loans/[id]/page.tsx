/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Loading from "@/shared/loading/Loading";
import { useGetLoanQuery } from "@/redux/api/loanApi";

const ManagerSpecificCustomerLoan = () => {
  const params = useParams();
  const id = params?.id;
  const { data: loanData, isLoading } = useGetLoanQuery(id, { skip: !id });
  const loan = loanData?.data;

  if (isLoading) {
    return <Loading />;
  }

  if (!loan) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loan not found</p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const paidInstallments = loan.repaymentSchedule.filter(
    (payment: any) => payment.paid
  ).length;
  const totalInstallments = loan.repaymentSchedule.length;
  const loanProgress = (paidInstallments / totalInstallments) * 100;

  return (
    <div className="container mx-auto px-6 space-y-4 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Loan Details</h1>
          <p className="text-muted-foreground">Account: {loan.accountNumber}</p>
        </div>
        <Badge
          variant={loan.status === "active" ? "default" : "secondary"}
          className="text-sm px-3 py-1"
        >
          {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
        </Badge>
      </div>

      {/* Loan Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="h-32 bg-gray-200">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Loan Amount
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(loan.loanAmount)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="h-32 bg-gray-200">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Loan Balance(+Int)
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(loan.remainingBalance)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="h-32 bg-gray-200">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Interest Rate
                </p>
                <p className="text-2xl font-bold">
                  {(loan.interestRate * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="h-32 bg-gray-200">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Term
                </p>
                <p className="text-2xl font-bold">{loan.term} months</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Repayment Progress</span>
              <span>{loanProgress.toFixed(3)}% Complete</span>
            </div>
            <Progress value={loanProgress} className="h-2" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Start Date: </span>
              <span className="font-medium">{formatDate(loan.startDate)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">End Date: </span>
              <span className="font-medium">{formatDate(loan.endDate)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Repayment Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Repayment Schedule</CardTitle>
            <p className="text-sm text-muted-foreground">
              {paidInstallments} of {totalInstallments} installments paid
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {loan.repaymentSchedule.map((payment: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {payment.paid ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-gray-400" />
                    )}
                    <div>
                      <p className="font-medium">Installment {index + 1}</p>
                      <p className="text-sm text-muted-foreground">
                        Due: {formatDate(payment.dueDate)}
                      </p>
                      {payment.paid && payment.paidDate && (
                        <p className="text-sm text-green-600">
                          Paid: {formatDate(payment.paidDate)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {formatCurrency(payment.amountDue)}
                    </p>
                    <Badge
                      variant={payment.paid ? "default" : "outline"}
                      className="text-xs"
                    >
                      {payment.paid ? "Paid" : "Pending"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Branch Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Branch Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{loan.branch.name}</h3>
              <p className="text-sm text-muted-foreground">
                Branch Code: {loan.branch.code}
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                <div className="text-sm">
                  <p>{loan.branch.address}</p>
                  <p>
                    {loan.branch.city}, {loan.branch.state}
                  </p>
                  <p>
                    {loan.branch.country} - {loan.branch.zipCode}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{loan.branch.contactNumber}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{loan.branch.email}</span>
              </div>

              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                <div className="text-sm">
                  <p>Operating Hours:</p>
                  <p>
                    {loan.branch.openingSchedule.openTime} -{" "}
                    {loan.branch.openingSchedule.closeTime}
                  </p>
                  <p className="text-muted-foreground">
                    {loan.branch.openingSchedule.days.join(", ")}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Used Balance:</span>
                <span className="font-medium">
                  {formatCurrency(loan.branch.usedBalance)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reserved Balance:</span>
                <span className="font-medium">
                  {formatCurrency(loan.branch.reserevedBalance)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerSpecificCustomerLoan;
