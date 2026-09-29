"use client";

import { LANGUAGES } from "@/config/app.config";
import { SectionHeader } from "@/components/SectionHeader";
import { LanguageId } from "@/types/roast";
import React, { useState } from "react";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (code: string) => void;
}

export function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  const ext = LANGUAGES.find((l) => l.id === language)?.extension ?? "txt";
  const fakeFilename = `solution.${ext}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    } finally {
      setTimeout(() => {
        setCopyStatus("idle");
      }, 2000);
    }
  };

  const copyLabel =
    copyStatus === "copied"
      ? "✓ COPIED TO CLIPBOARD"
      : copyStatus === "failed"
      ? "✕ COPY BLOCKED, SELECT MANUALLY"
      : "📋 COPY FIXED CODE";

  return (
    <div className="mt-4 mb-4">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="text-[10px] font-mono font-bold text-[#4FA35A] bg-[#E0F2E9] px-2 py-0.5 border border-[#4FA35A] uppercase tracking-wider">
          CORRECTED CODE
        </span>
      </SectionHeader>

      {/* Code Block Container */}
      <div className="border-2 border-[#141414] bg-[#171717] shadow-[3px_3px_0px_#141414]">
        {/* Header Strip */}
        <div className="h-8 px-3 bg-[#242424] border-b border-[#333333] flex items-center justify-between font-mono text-xs">
          <span className="text-[#C4C4BD] font-bold">{fakeFilename}</span>
          <span className="text-[10px] font-bold text-[#4FA35A] uppercase tracking-wider">
            READY TO APPLY
          </span>
        </div>

        {/* Code Content */}
        <pre className="p-3 text-xs font-mono text-[#F7F3EA] overflow-x-auto whitespace-pre leading-5">
          <code>{code}</code>
        </pre>
      </div>

      {/* Actions: Copy & Apply */}
      <div className="flex flex-wrap items-center gap-3 mt-3">
        <button
          type="button"
          onClick={handleCopy}
          className="flex-1 py-2 px-3 border-2 border-[#141414] bg-white text-[#141414] font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_#141414] hover:bg-[#141414] hover:text-white transition-colors active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
        >
          {copyLabel}
        </button>

        <button
          type="button"
          onClick={() => onApply(code)}
          className="flex-1 py-2 px-3 border-2 border-[#141414] bg-[#EDB13E] text-[#141414] font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_#141414] hover:bg-[#141414] hover:text-[#EDB13E] transition-colors active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </div>
  );
}
