"use client";

import { DEFAULTS, SAMPLE } from "@/config/app.config";
import { CodeEditor } from "@/components/CodeEditor";
import { ErrorMessageInput } from "@/components/ErrorMessageInput";
import { RoastControls } from "@/components/RoastControls";
import { RoastReport } from "@/components/RoastReport";
import { StatusBar } from "@/components/StatusBar";
import { TopBar } from "@/components/TopBar";
import { requestRoast } from "@/lib/api";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import React, { useCallback, useEffect, useState } from "react";

export function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [code, setCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState<boolean>(false);

  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string>("");
  const [apiError, setApiError] = useState<string | null>(null);

  const isRoasting = reportState === "loading";

  const handleRoast = useCallback(async () => {
    if (isRoasting) return;

    if (!code || !code.trim()) {
      setApiError("No code provided. I can't roast the void.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setApiError(null);
    setRoastResult(null);

    try {
      const result = await requestRoast({
        code,
        language,
        roastLevel,
        errorMessage: errorMessage.trim() || undefined,
      });

      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while roasting your code.";
      setApiError(message);
      setReportState("error");
    }
  }, [code, errorMessage, isRoasting, language, roastLevel]);

  const handleLoadSample = () => {
    setLanguage(SAMPLE.language);
    setCode(SAMPLE.code);
  };

  const handleApplyFix = (fixedCode: string) => {
    setCode(fixedCode);
    // Applies fix without re-roasting
  };

  // Keyboard shortcut: Ctrl+Enter or Cmd+Enter from anywhere
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleRoast]);

  // Error line is only highlighted when current code matches exactly what was roasted
  const errorLine =
    reportState === "results" && code === roastedCode
      ? roastResult?.issues?.[0]?.line
      : undefined;

  return (
    <div className="w-full max-w-[1400px] mx-auto p-2 sm:p-4 md:p-6 flex flex-col items-center">
      {/* DevFest Nashik Header Eyebrow */}
      <div className="w-full flex items-center justify-between mb-3 text-xs font-mono px-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#141414] bg-[#EDB13E] px-2 py-0.5 border border-[#141414] uppercase text-[10px] shadow-[1px_1px_0px_#141414]">
            DEVFEST NASHIK 2026
          </span>
          <span className="text-[#66625B] text-[11px] font-semibold hidden sm:inline">
            CODE BOL RAHA HAI · मला वाचवा!
          </span>
        </div>
        <div className="text-[11px] text-[#66625B] font-bold">
          AI CODE CRITIQUE // GEMINI 3.5 FLASH
        </div>
      </div>

      {/* Main Workstation Card */}
      <main className="w-full border-2 border-[#141414] bg-[#FFFFFF] shadow-[6px_6px_0px_#141414] flex flex-col overflow-hidden min-h-[calc(100vh-6rem)] md:min-h-[820px]">
        {/* TopBar with Roast Controls */}
        <TopBar>
          <RoastControls
            roastLevel={roastLevel}
            onRoastLevelChange={setRoastLevel}
            language={language}
            onLanguageChange={setLanguage}
            onRoast={handleRoast}
            isRoasting={isRoasting}
            errorDrawerOpen={errorDrawerOpen}
            onToggleErrorDrawer={() => setErrorDrawerOpen((prev) => !prev)}
          />
        </TopBar>

        {/* Collapsible Error Drawer */}
        {errorDrawerOpen && (
          <ErrorMessageInput
            value={errorMessage}
            onChange={setErrorMessage}
            onClose={() => setErrorDrawerOpen(false)}
          />
        )}

        {/* Workstation Split Body: Editor (~54-55%) + Report (~46-45%) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left: Code Editor Pane */}
          <div className="w-full md:w-[54%] flex flex-col">
            <CodeEditor
              code={code}
              onChange={setCode}
              language={language}
              errorLine={errorLine}
              onLoadSample={handleLoadSample}
            />
          </div>

          {/* Right: Roast Report Pane */}
          <div className="w-full md:w-[46%] flex flex-col">
            <RoastReport
              state={reportState}
              roastLevel={roastLevel}
              language={language}
              result={roastResult}
              errorMsg={apiError}
              onRetry={handleRoast}
              onApplyFix={handleApplyFix}
            />
          </div>
        </div>

        {/* Rangoli / Warli decorative strip accent */}
        <div className="h-2 bg-[#F8F4EC] border-t border-[#141414] flex items-center justify-around overflow-hidden text-[8px] text-[#A0A09B] select-none">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="tracking-widest">▲ ▼</span>
          ))}
        </div>

        {/* Bottom Status Bar */}
        <StatusBar isRoasting={isRoasting} />
      </main>
    </div>
  );
}
