"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import TicketThread from "@/components/support/TicketThread";

const AdminSupportDetailPage = () => {
  const params = useParams();
  const id = String(params?.id || "");

  return (
    <div className="space-y-4 px-2">
      <Link
        href="/dashboard/admin/support"
        className="inline-flex items-center gap-1 text-sm font-medium text-[#104042] hover:underline"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to support desk
      </Link>
      {id ? <TicketThread ticketId={id} staffMode /> : null}
    </div>
  );
};

export default AdminSupportDetailPage;
