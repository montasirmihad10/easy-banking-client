import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
  label: string;
  done?: boolean;
  current?: boolean;
};

const BankingFlowHeader = ({
  title,
  subtitle,
  backHref = "/banking",
  backLabel = "Back to overview",
  steps,
}: {
  title: string;
  subtitle: string;
  backHref?: string;
  backLabel?: string;
  steps?: Step[];
}) => {
  return (
    <div className="mb-6 space-y-4">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-[#104042]"
      >
        <ChevronLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#104042]">
          {title}
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-600">{subtitle}</p>
      </div>

      {steps && steps.length > 0 && (
        <ol className="flex flex-wrap gap-2">
          {steps.map((step, index) => (
            <li
              key={step.label}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
                step.current
                  ? "border-[#104042] bg-[#104042] text-white"
                  : step.done
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-white text-slate-500",
              )}
            >
              <span className="opacity-70">{index + 1}</span>
              {step.label}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default BankingFlowHeader;
