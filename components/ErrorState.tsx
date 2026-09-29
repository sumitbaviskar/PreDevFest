import React from "react";

interface ErrorStateProps {
  error?: string | null;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const displayError =
    error && error.trim()
      ? error
      : "An unknown error occurred during code evaluation.";

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center select-none font-mono">
      <div className="w-16 h-16 border-2 border-[#D9503F] bg-[#FFDAD6] text-[#D9503F] flex items-center justify-center text-3xl font-bold mb-4 shadow-[3px_3px_0px_#141414]">
        !
      </div>

      <h3 className="font-sans font-bold text-sm tracking-wider uppercase text-[#D9503F] mb-2">
        Analysis Failed
      </h3>

      <div className="text-xs text-[#66625B] max-w-md leading-relaxed mb-6 bg-white p-3 border border-[#E6E6E2] text-left break-words">
        {displayError}
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="px-4 py-2 border-2 border-[#141414] bg-[#EDB13E] text-[#141414] font-mono text-xs font-bold uppercase shadow-[3px_3px_0px_#141414] hover:bg-[#141414] hover:text-[#EDB13E] transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
