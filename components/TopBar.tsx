import { APP } from "@/config/app.config";
import Image from "next/image";
import React from "react";

interface TopBarProps {
  children?: React.ReactNode;
}

export function TopBar({ children }: TopBarProps) {
  return (
    <header className="border-b-2 border-[#141414] bg-[#FFFFFF] px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm select-none">
      {/* Left: Branding & DevFest identity */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 flex items-center justify-center border-2 border-[#141414] bg-[#EDB13E] shadow-[2px_2px_0px_#141414]">
            <Image
              src="/assets/GDG_Logo.svg"
              alt="GDG Logo"
              width={20}
              height={20}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-sans font-bold text-lg tracking-wider uppercase text-[#141414]">
                {APP.name}
              </h1>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 border border-[#141414] bg-[#F7E3A8] uppercase tracking-wide">
                {APP.version}
              </span>
            </div>
            <div className="text-[10px] font-mono text-[#66625B] tracking-tight hidden sm:block">
              DESI EDITION // DEVFEST NASHIK 2026
            </div>
          </div>
        </div>

        {/* Mobile quick badge */}
        <div className="md:hidden flex items-center gap-1.5 px-2 py-1 border border-[#141414] bg-[#EFF2FB] text-[10px] font-bold">
          <span>GDG NASHIK</span>
        </div>
      </div>

      {/* Right: Controls passed as children */}
      <div className="w-full md:w-auto flex items-center justify-end">
        {children}
      </div>
    </header>
  );
}
