"use client";

import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const gutterRef = useRef<HTMLDivElement | null>(null);

  const [cursor, setCursor] = useState({ line: 1, col: 1 });

  const languageLabel =
    LANGUAGES.find((l) => l.id === language)?.label ?? language;

  const updateCursor = useCallback(() => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const textBefore = textareaRef.current.value.slice(0, start);
    const lines = textBefore.split("\n");
    const currentLine = lines.length;
    const currentCol = lines[lines.length - 1].length + 1;
    setCursor({ line: currentLine, col: currentCol });
  }, []);

  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      textarea.setRangeText("    ", start, end, "end");
      onChange(textarea.value);
      updateCursor();
    }
  };

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 10);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="flex flex-col flex-1 border-r-0 md:border-r-2 border-[#141414] bg-[#171717] text-[#F7F3EA] min-h-[460px] md:min-h-0 relative select-none">
      {/* 40px Header Strip */}
      <div className="h-10 px-4 border-b-2 border-[#141414] bg-[#222222] flex items-center justify-between font-mono text-xs text-[#A0A09B]">
        <div className="flex items-center gap-2">
          <span className="text-[#66625B] font-bold tracking-wider uppercase text-[10px]">
            INPUT // SRC
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4FA35A]"></span>
        </div>

        <div className="font-sans font-bold text-sm tracking-wide text-[#FFFFFF] uppercase">
          Your Code
        </div>

        <div className="flex items-center gap-3 text-[11px] font-bold">
          <button
            type="button"
            onClick={onLoadSample}
            className="text-[#EDB13E] hover:underline cursor-pointer tracking-wider uppercase"
          >
            SAMPLE BUG
          </button>
          <span className="text-[#444444]">|</span>
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-[#D9503F] hover:underline cursor-pointer tracking-wider uppercase"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Editor Body: Gutter + Textarea */}
      <div className="flex-1 flex overflow-hidden relative font-mono text-sm leading-6">
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="w-12 py-3 bg-[#1B1B1B] border-r border-[#2C2C2C] select-none overflow-hidden text-right pr-3 text-[#555550]"
        >
          {lineNumbers.map((num) => {
            const isError = errorLine === num;
            return (
              <div
                key={num}
                className={`h-6 leading-6 transition-colors ${
                  isError
                    ? "bg-[#D9503F]/30 text-[#EDB13E] font-bold px-1 rounded-sm border-r-2 border-[#EDB13E]"
                    : ""
                }`}
              >
                {String(num).padStart(2, "0")}
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onSelect={updateCursor}
          onKeyUp={updateCursor}
          onClick={updateCursor}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          placeholder="// Paste your code here or click SAMPLE BUG..."
          className="flex-1 py-3 px-4 bg-transparent text-[#F7F3EA] font-mono text-sm leading-6 resize-none focus:outline-none whitespace-pre overflow-auto scrollbar-thin"
          style={{ tabSize: 4 }}
        />
      </div>

      {/* Bottom Status Strip */}
      <div className="h-7 px-4 border-t border-[#2C2C2C] bg-[#1E1E1E] flex items-center justify-between text-[11px] font-mono text-[#888880]">
        <div>
          Ln {cursor.line}, Col {cursor.col} · {languageLabel}
        </div>
        <div className="hidden sm:block">
          UTF-8 · Tab Size: 4 · {code.length.toLocaleString()} chars
        </div>
      </div>
    </div>
  );
}
