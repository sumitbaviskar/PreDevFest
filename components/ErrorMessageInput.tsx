import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="border-b-2 border-[#141414] bg-[#EFF2FB] px-4 py-3 animate-in fade-in duration-200">
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor="error-input"
          className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#141414] flex items-center gap-1.5"
        >
          <span className="w-2 h-2 bg-[#D9503F] inline-block"></span>
          Attach Terminal Traceback / Compiler Error (Optional)
        </label>
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-mono font-bold text-[#66625B] hover:text-[#141414] hover:underline"
        >
          Dismiss ✕
        </button>
      </div>
      <textarea
        id="error-input"
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Traceback (most recent call last):\n  File "solution.py", line 7, in calculate_average\nTypeError: unsupported operand type(s) for +=: 'int' and 'list'`}
        className="w-full bg-[#FFFFFF] border-2 border-[#141414] p-2.5 font-mono text-xs text-[#141414] placeholder-[#827563] focus:outline-none focus:bg-[#FFFDE7] shadow-[2px_2px_0px_#141414] resize-y"
      />
    </div>
  );
}
