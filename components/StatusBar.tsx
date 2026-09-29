import { AI, APP } from "@/config/app.config";
import React from "react";

interface StatusBarProps {
  isRoasting: boolean;
}

export function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="border-t-2 border-[#141414] bg-[#FFFFFF] px-4 py-2 text-[11px] font-mono text-[#66625B] select-none flex flex-col gap-1">
      {/* Main Status Row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Left: Status Indicator */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#141414]">STATUS:</span>
          {isRoasting ? (
            <span className="flex items-center gap-1.5 text-[#EDB13E] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#EDB13E] animate-ping" />
              PROCESSING...
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[#4FA35A] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#4FA35A]" />
              ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}
          <span className="hidden sm:inline text-[#A0A09B]">|</span>
          <span className="hidden sm:inline text-[#66625B]">
            ENGINE: GOOGLE GEMINI
          </span>
        </div>

        {/* Right: App Live Label */}
        <div className="font-bold tracking-widest uppercase text-[#141414]">
          {APP.name} {APP.version} // LIVE
        </div>
      </div>

      {/* Second Line: Workshop Attribution */}
      <div className="text-[10px] text-center text-[#888880] tracking-wider pt-0.5 border-t border-[#F0EDEC]">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
