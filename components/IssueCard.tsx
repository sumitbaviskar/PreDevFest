import { RoastIssue, Severity } from "@/types/roast";
import React from "react";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const severityConfig: Record<
  Severity,
  {
    bg: string;
    text: string;
    border: string;
    stripe: string;
  }
> = {
  "FATAL BUG": {
    bg: "bg-[#FFDAD6]",
    text: "text-[#93000A]",
    border: "border-[#D9503F]",
    stripe: "border-l-[#D9503F]",
  },
  "CODE SMELL": {
    bg: "bg-[#F7E3A8]",
    text: "text-[#5F4100]",
    border: "border-[#EDB13E]",
    stripe: "border-l-[#EDB13E]",
  },
  OPTIMIZATION: {
    bg: "bg-[#E0F2E9]",
    text: "text-[#1B5E20]",
    border: "border-[#4FA35A]",
    stripe: "border-l-[#4FA35A]",
  },
};

export function IssueCard({ index, issue }: IssueCardProps) {
  const paddedIndex = String(index).padStart(2, "0");
  const styling = severityConfig[issue.severity] || severityConfig["CODE SMELL"];

  return (
    <div className="border-2 border-[#141414] bg-white p-3.5 mb-3 shadow-[3px_3px_0px_#141414] font-mono text-xs">
      {/* Top Row: Index Chip, Line, Severity Badge, Title */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-[#E6E6E2]">
        <div className="flex items-center gap-2">
          {/* Black Index Chip */}
          <span className="px-1.5 py-0.5 bg-[#141414] text-white font-bold text-[10px] rounded-xs">
            #{paddedIndex}
          </span>

          {/* Line number */}
          <span className="font-bold text-[#141414]">
            LINE {issue.line}
          </span>

          {/* Severity Badge */}
          <span
            className={`px-2 py-0.5 text-[10px] font-bold border ${styling.border} ${styling.bg} ${styling.text} uppercase tracking-wider`}
          >
            {issue.severity}
          </span>
        </div>

        {/* Issue Title (wraps, never clips) */}
        <div className="text-right flex-1 min-w-[120px] text-[#66625B] text-[11px] font-medium leading-tight">
          {issue.title}
        </div>
      </div>

      {/* Code Snippet */}
      {issue.codeSnippet && (
        <pre
          className={`p-2.5 mb-2.5 bg-[#171717] text-[#F7F3EA] border border-[#2C2C2C] border-l-4 ${styling.stripe} text-xs font-mono overflow-x-auto whitespace-pre`}
        >
          <code>{issue.codeSnippet}</code>
        </pre>
      )}

      {/* Diagnosis & Expected */}
      <div className="space-y-1.5 text-xs leading-relaxed">
        <div className="text-[#D9503F]">
          <span className="font-bold mr-1">✕ Diagnosis:</span>
          <span className="text-[#141414]">{issue.diagnosis}</span>
        </div>
        <div className="text-[#4FA35A]">
          <span className="font-bold mr-1">✓ Expected:</span>
          <span className="text-[#141414]">{issue.expected}</span>
        </div>
      </div>
    </div>
  );
}
