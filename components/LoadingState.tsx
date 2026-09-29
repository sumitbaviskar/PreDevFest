import React from "react";

export function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center select-none font-mono">
      <div className="w-16 h-16 border-2 border-[#141414] bg-[#EDB13E] flex items-center justify-center text-2xl font-bold text-[#141414] mb-4 shadow-[4px_4px_0px_#141414] animate-bounce">
        <span className="inline-block animate-spin font-mono text-3xl">/</span>
      </div>

      <h3 className="font-sans font-bold text-sm tracking-wider uppercase text-[#141414] mb-2 animate-pulse">
        Analyzing Code
      </h3>

      <p className="text-xs text-[#66625B] max-w-sm leading-relaxed mb-4">
        Evaluating computational complexity and architectural purity...
      </p>

      {/* Rotating Hinglish humorous line */}
      <div className="px-3 py-1.5 border border-[#141414] bg-[#F8F4EC] text-[11px] text-[#141414] font-bold shadow-[2px_2px_0px_#141414]">
        Bhau, roast tayyar ho raha hai... ☕
      </div>
    </div>
  );
}
