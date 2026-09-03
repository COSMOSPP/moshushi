import React from "react";
import { cn } from "@/lib/utils";

interface DashboardPanelProps {
  title: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function DashboardPanel({ title, children, extra, className, contentClassName }: DashboardPanelProps) {
  return (
    <div className={cn(
      "bg-[#06122d]/90 border border-[#1e3a8a]/60 rounded-md relative flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-md overflow-hidden h-full min-h-0",
      className
    )}>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3b82f6]/40 to-transparent" />

      <div className="flex justify-between items-center px-4 py-2 border-b border-[#1e3a8a]/50 bg-[#08183c]/80 rounded-t-md flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-1 h-3.5 bg-cyan-400 rounded-full shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
          <h3 className="text-slate-100 font-bold text-sm tracking-wide">
            {title}
          </h3>
        </div>
        {extra && <div className="flex items-center">{extra}</div>}
      </div>

      <div className={cn("p-3 flex-1 overflow-hidden relative min-h-0 flex flex-col", contentClassName)}>
        {children}
      </div>
    </div>
  );
}
