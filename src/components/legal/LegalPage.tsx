"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loading from "@/shared/loading/Loading";
import { cn } from "@/lib/utils";

type LegalSection = {
  id: string;
  title: string;
  html: string;
};

const LEGAL_TABS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/about", label: "About Us" },
];

const stripTags = (value: string) =>
  value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const splitLegalSections = (html: string): LegalSection[] => {
  const source = html.trim();
  if (!source) return [];

  const headingRegex = /<h2\b[^>]*>[\s\S]*?<\/h2>/gi;
  const headings = Array.from(source.matchAll(headingRegex));

  if (!headings.length) {
    return [{ id: "overview", title: "Overview", html: source }];
  }

  return headings.map((match, index) => {
    const start = match.index ?? 0;
    const end =
      index + 1 < headings.length
        ? (headings[index + 1].index ?? source.length)
        : source.length;
    const sectionHtml = source.slice(start, end).trim();
    const titleMatch = match[0].match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/i);
    const title =
      stripTags(titleMatch?.[1] || "") || `Section ${index + 1}`;

    return {
      id: `section-${index + 1}`,
      title,
      html: sectionHtml,
    };
  });
};

const contentClassName =
  "legal-content max-w-none text-[15px] leading-7 text-slate-700 [&_a]:font-medium [&_a]:text-[#104042] [&_a]:underline [&_h2]:mb-3 [&_h2]:border-b [&_h2]:border-slate-100 [&_h2]:pb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#104042] [&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[#104042] [&_li]:my-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_p]:my-3 [&_strong]:text-slate-900 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5";

const LegalPage = ({
  title,
  html,
  isLoading,
  subtitle,
}: {
  title: string;
  html?: string;
  isLoading?: boolean;
  subtitle?: string;
}) => {
  const pathname = usePathname();
  const sections = useMemo(
    () => (html?.trim() ? splitLegalSections(html) : []),
    [html],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [html, pathname]);

  if (isLoading) return <Loading />;

  const activeSection = sections[activeIndex];
  const hasSections = sections.length > 0;

  return (
    <div className="min-h-[75vh] bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="border-b border-[#104042]/10 bg-[#104042] text-white">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-white/70">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{title}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-white/80 sm:text-base">
            {subtitle ||
              "Please review this page carefully. EasyBank keeps these documents up to date as products and policies evolve."}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {LEGAL_TABS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    active
                      ? "bg-white text-[#104042]"
                      : "bg-white/10 text-white hover:bg-white/20",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {!hasSections ? (
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <p className="text-slate-600">
              Content is not published yet. An admin can update this from
              Platform settings → Privacy & legal.
            </p>
          </article>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50/80 px-3 py-3 sm:px-4">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "shrink-0 rounded-full px-3.5 py-2 text-left text-sm font-medium transition",
                      index === activeIndex
                        ? "bg-[#104042] text-white shadow-sm"
                        : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-[#104042]",
                    )}
                  >
                    {section.title.replace(/^\d+\.\s*/, "")}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 sm:p-8">
              <div className="mb-4 flex items-center justify-between gap-3 text-xs text-slate-500">
                <span>
                  Section {activeIndex + 1} of {sections.length}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={activeIndex === 0}
                    onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    Prev
                  </button>
                  <button
                    type="button"
                    disabled={activeIndex >= sections.length - 1}
                    onClick={() =>
                      setActiveIndex((i) =>
                        Math.min(sections.length - 1, i + 1),
                      )
                    }
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {activeSection ? (
                <div
                  className={contentClassName}
                  dangerouslySetInnerHTML={{ __html: activeSection.html }}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalPage;
