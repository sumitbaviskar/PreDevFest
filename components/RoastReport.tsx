import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { FixedCode } from "@/components/FixedCode";
import { IssueCard } from "@/components/IssueCard";
import { LoadingState } from "@/components/LoadingState";
import { SectionHeader } from "@/components/SectionHeader";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import React from "react";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg: string | null;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
}

export function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  const issueCount = result?.issues?.length ?? 0;
  const issueLabel = issueCount === 1 ? "1 ISSUE" : `${issueCount} ISSUES`;

  return (
    <div className="flex flex-col flex-1 bg-[#FFFFFF] min-h-[460px] md:min-h-0 overflow-hidden font-mono select-none">
      {/* 40px Header Strip */}
      <div className="h-10 px-4 border-b-2 border-[#141414] bg-[#F8F4EC] flex items-center justify-between text-xs">
        <span className="text-[#66625B] font-bold tracking-wider uppercase text-[10px]">
          AUDIT // REPORT
        </span>

        <span className="font-sans font-bold text-sm tracking-wide text-[#141414] uppercase">
          Roast Report
        </span>

        {/* Empty spacer to balance center alignment */}
        <div className="w-16"></div>
      </div>

      {/* Body States */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {state === "empty" && <EmptyState />}
        {state === "loading" && <LoadingState />}
        {state === "error" && (
          <ErrorState error={errorMsg} onRetry={onRetry} />
        )}

        {state === "results" && result && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 select-text">
            {/* Section 1: Roast */}
            <div className="mb-5">
              <SectionHeader number={1} title="Roast">
                <span className="text-[10px] font-mono font-bold text-[#141414] bg-[#F7E3A8] px-2 py-0.5 border border-[#141414] uppercase tracking-wider">
                  STYLE: {roastLevel.toUpperCase()}
                </span>
              </SectionHeader>

              <blockquote className="p-4 border-2 border-[#141414] bg-[#EFF2FB] text-[#141414] text-sm leading-relaxed font-sans font-semibold italic shadow-[3px_3px_0px_#141414] relative">
                <span className="text-2xl font-serif text-[#EDB13E] mr-1 select-none">“</span>
                {result.roast}
                <span className="text-2xl font-serif text-[#EDB13E] ml-1 select-none">”</span>
              </blockquote>
            </div>

            {/* Section 2: What's Wrong */}
            <div className="mb-5">
              <SectionHeader number={2} title="What's Wrong">
                <span className="text-[10px] font-mono font-bold text-[#141414] bg-white px-2 py-0.5 border border-[#141414] uppercase tracking-wider">
                  {issueLabel}
                </span>
              </SectionHeader>

              {issueCount === 0 ? (
                <div className="text-xs font-mono font-bold text-[#4FA35A] bg-[#E0F2E9] p-3 border-2 border-[#4FA35A] shadow-[2px_2px_0px_#4FA35A]">
                  No issues found. Suspiciously clean.
                </div>
              ) : (
                <div className="space-y-3">
                  {result.issues.map((issue, idx) => (
                    <IssueCard key={idx} index={idx + 1} issue={issue} />
                  ))}
                </div>
              )}
            </div>

            {/* Section 3: Fix (Only when correctedCode is non-empty) */}
            {result.correctedCode && result.correctedCode.trim() && (
              <FixedCode
                sectionNumber={3}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            )}

            {/* Takeaway Section (Dynamic section number: 4 if correctedCode exists, else 3) */}
            {result.takeaway && result.takeaway.trim() && (
              <div className="mt-5 mb-2">
                <SectionHeader
                  number={result.correctedCode?.trim() ? 4 : 3}
                  title="Takeaway"
                />
                <div className="p-3.5 border-2 border-[#141414] bg-[#FFFDE7] text-xs font-mono text-[#141414] leading-relaxed shadow-[2px_2px_0px_#141414]">
                  {result.takeaway}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
