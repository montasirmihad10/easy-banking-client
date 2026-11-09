"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import TicketThread from "@/components/support/TicketThread";

const BankingSupportDetailPage = () => {
  const params = useParams();
  const id = String(params?.id || "");

  return (
    <div className="space-y-4">
      <Link
        href="/banking/support"
        className="inline-flex items-center gap-1 text-sm font-medium text-[#104042] hover:underline"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to support
      </Link>
      {id ? <TicketThread ticketId={id} /> : null}
    </div>
  );
};

export default BankingSupportDetailPage;
