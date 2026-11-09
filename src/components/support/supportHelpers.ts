export const SUPPORT_CATEGORIES = [
  { value: "account", label: "Account" },
  { value: "deposit", label: "Deposit" },
  { value: "withdraw", label: "Withdraw" },
  { value: "transfer", label: "Transfer" },
  { value: "loan", label: "Loan" },
  { value: "card", label: "Card / payments" },
  { value: "technical", label: "Technical" },
  { value: "other", label: "Other" },
] as const;

export const SUPPORT_PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
] as const;

export const SUPPORT_STATUSES = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In progress" },
  { value: "waiting_customer", label: "Waiting on customer" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
] as const;

export const statusTone = (status?: string) => {
  switch (status) {
    case "open":
      return "bg-amber-100 text-amber-800";
    case "in_progress":
      return "bg-sky-100 text-sky-800";
    case "waiting_customer":
      return "bg-violet-100 text-violet-800";
    case "resolved":
      return "bg-emerald-100 text-emerald-800";
    case "closed":
      return "bg-slate-200 text-slate-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

export const priorityTone = (priority?: string) => {
  switch (priority) {
    case "urgent":
      return "bg-rose-100 text-rose-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "low":
      return "bg-slate-100 text-slate-600";
    default:
      return "bg-[#104042]/10 text-[#104042]";
  }
};
