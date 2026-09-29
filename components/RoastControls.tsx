import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";
import React from "react";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs font-mono w-full justify-between md:justify-end">
      {/* 1. Roast Level Segmented / Custom Radio Group */}
      <div className="flex items-center gap-2 bg-[#F8F4EC] border border-[#141414] p-1 shadow-[2px_2px_0px_#141414]">
        <span className="text-[10px] font-bold text-[#66625B] uppercase pl-1 hidden lg:inline">
          Roast Level:
        </span>
        <div className="flex items-center gap-1" role="radiogroup" aria-label="Roast Level">
          {ROAST_LEVELS.map((level) => {
            const isSelected = roastLevel === level.id;
            return (
              <label
                key={level.id}
                title={level.description}
                className={`relative flex items-center gap-1.5 px-2.5 py-1 cursor-pointer transition-all border ${
                  isSelected
                    ? "bg-[#EDB13E] text-[#141414] border-[#141414] font-bold shadow-[1px_1px_0px_#141414]"
                    : "bg-[#FFFFFF] text-[#66625B] border-transparent hover:border-[#141414] hover:text-[#141414]"
                }`}
              >
                <input
                  type="radio"
                  name="roastLevel"
                  value={level.id}
                  checked={isSelected}
                  onChange={() => onRoastLevelChange(level.id)}
                  className="sr-only"
                />
                {/* Custom circular indicator */}
                <span
                  className={`w-2.5 h-2.5 rounded-full border border-[#141414] flex items-center justify-center ${
                    isSelected ? "bg-[#141414]" : "bg-white"
                  }`}
                >
                  {isSelected && <span className="w-1 h-1 rounded-full bg-[#EDB13E]" />}
                </span>
                <span className="text-xs uppercase">{level.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Custom styled native select for Languages */}
      <div className="relative flex items-center">
        <label htmlFor="language-select" className="sr-only">
          Language
        </label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
          className="appearance-none bg-[#FFFFFF] border-2 border-[#141414] px-3 py-1.5 pr-7 font-mono text-xs uppercase font-bold text-[#141414] shadow-[2px_2px_0px_#141414] cursor-pointer focus:outline-none focus:bg-[#F7E3A8]"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.label} ({lang.extension})
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2 text-[10px] text-[#141414] font-bold">
          ▼
        </span>
      </div>

      {/* 3. Error Drawer Toggle Button */}
      <button
        type="button"
        onClick={onToggleErrorDrawer}
        className={`px-3 py-1.5 border-2 border-dashed border-[#141414] font-mono text-xs font-bold transition-all ${
          errorDrawerOpen
            ? "bg-[#141414] text-[#FFFFFF]"
            : "bg-[#FFFFFF] text-[#141414] hover:bg-[#EFF2FB]"
        }`}
      >
        {errorDrawerOpen ? "− ERROR MESSAGE" : "+ ERROR MESSAGE"}
      </button>

      {/* 4. Primary CTA Button */}
      <button
        type="button"
        disabled={isRoasting}
        onClick={onRoast}
        className={`relative px-4 py-2 border-2 border-[#141414] font-mono text-xs font-bold uppercase transition-all shadow-[3px_3px_0px_#141414] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center gap-2 ${
          isRoasting
            ? "bg-[#66625B] text-white opacity-80 cursor-not-allowed animate-pulse"
            : "bg-[#141414] text-white hover:bg-[#EDB13E] hover:text-[#141414]"
        }`}
      >
        {isRoasting ? (
          <>
            <span className="inline-block animate-spin">/</span>
            <span>ANALYZING...</span>
          </>
        ) : (
          <>
            <span>ROAST MY CODE 🔥</span>
            <span className="px-1.5 py-0.5 text-[9px] font-mono bg-white/20 border border-white/40 text-current rounded-sm hidden sm:inline">
              Ctrl ⏎
            </span>
          </>
        )}
      </button>
    </div>
  );
}
