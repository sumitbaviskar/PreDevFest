import React from "react";

export function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center select-none font-mono">
      <div className="w-16 h-16 border-2 border-dashed border-[#141414] bg-[#FFFFFF] flex items-center justify-center text-2xl font-bold text-[#888880] mb-4 shadow-[2px_2px_0px_#141414]">
        {"{}"}
      </div>

      <h3 className="font-sans font-bold text-sm tracking-wider uppercase text-[#141414] mb-2">
        Awaiting Code Submission
      </h3>

      <p className="text-xs text-[#66625B] max-w-sm leading-relaxed">
        Paste your code on the left, then click{" "}
        <span className="font-bold text-[#141414] bg-[#F7E3A8] px-1">
          &quot;ROAST MY CODE&quot;
        </span>{" "}
        or press Ctrl+Enter (⌘+Enter on Mac).
      </p>

      {/* Subtle DevFest Desi accent line */}
      <div className="mt-6 text-[10px] text-[#A0A09B] uppercase tracking-widest">
        DEV FEST NASHIK 2026 // CODE CRITIQUE ENGINE
      </div>
    </div>
  );
}
