import React from "react";
import { MetricData } from "../../types/cockpit";
import { cn } from "@/lib/utils";
import {
  Users,
  UserCheck,
  LayoutGrid,
  Award,
  BookOpenCheck,
  CalendarCheck2,
  Trophy,
  Star,
  Flame,
  Activity
} from "lucide-react";
import { motion } from "motion/react";

interface MetricCardProps {
  data: MetricData;
  index: number;
}

const iconMap: Record<string, { component: any; bgGradient: string; borderColor: string; glowColor: string; textColor: string }> = {
  enrollment: {
    component: Users,
    bgGradient: "from-[#0284c7]/30 to-[#06b6d4]/10",
    borderColor: "border-cyan-400/60",
    glowColor: "shadow-[0_0_12px_rgba(6,182,212,0.6)]",
    textColor: "text-cyan-300",
  },
  training: {
    component: UserCheck,
    bgGradient: "from-[#2563eb]/30 to-[#3b82f6]/10",
    borderColor: "border-blue-400/60",
    glowColor: "shadow-[0_0_12px_rgba(59,130,246,0.6)]",
    textColor: "text-blue-300",
  },
  classes: {
    component: LayoutGrid,
    bgGradient: "from-[#7c3aed]/30 to-[#8b5cf6]/10",
    borderColor: "border-purple-400/60",
    glowColor: "shadow-[0_0_12px_rgba(139,92,246,0.6)]",
    textColor: "text-purple-300",
  },
  teachers: {
    component: Award,
    bgGradient: "from-[#d97706]/30 to-[#f59e0b]/10",
    borderColor: "border-amber-400/60",
    glowColor: "shadow-[0_0_12px_rgba(245,158,11,0.6)]",
    textColor: "text-amber-300",
  },
  courses: {
    component: BookOpenCheck,
    bgGradient: "from-[#4f46e5]/30 to-[#6366f1]/10",
    borderColor: "border-indigo-400/60",
    glowColor: "shadow-[0_0_12px_rgba(99,102,241,0.6)]",
    textColor: "text-indigo-300",
  },
  attendance: {
    component: CalendarCheck2,
    bgGradient: "from-[#0d9488]/30 to-[#14b8a6]/10",
    borderColor: "border-teal-400/60",
    glowColor: "shadow-[0_0_12px_rgba(20,184,166,0.6)]",
    textColor: "text-teal-300",
  },
  completion: {
    component: Trophy,
    bgGradient: "from-[#059669]/30 to-[#10b981]/10",
    borderColor: "border-emerald-400/60",
    glowColor: "shadow-[0_0_12px_rgba(16,185,129,0.6)]",
    textColor: "text-emerald-300",
  },
  evaluation: {
    component: Star,
    bgGradient: "from-[#e11d48]/30 to-[#f43f5e]/10",
    borderColor: "border-rose-400/60",
    glowColor: "shadow-[0_0_12px_rgba(244,63,94,0.6)]",
    textColor: "text-rose-300",
  },
  works: {
    component: Flame,
    bgGradient: "from-[#ea580c]/30 to-[#f97316]/10",
    borderColor: "border-blue-400/60",
    glowColor: "shadow-[0_0_12px_rgba(249,115,22,0.6)]",
    textColor: "text-orange-300",
  },
};

export function MetricCard({ data, index }: MetricCardProps) {
  const theme = iconMap[data.id] || {
    component: Activity,
    bgGradient: "from-[#0284c7]/30 to-[#06b6d4]/10",
    borderColor: "border-cyan-400/60",
    glowColor: "shadow-[0_0_12px_rgba(6,182,212,0.6)]",
    textColor: "text-cyan-300",
  };

  const IconComponent = theme.component;
  const isPositive = data.trend >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className="relative flex items-center p-3 bg-[#051333]/90 border border-[#1e3a8a]/60 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.5)] group hover:border-cyan-500/80 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all duration-300 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent group-hover:via-cyan-400 transition-colors" />

      {/* Cyber Corner Brackets */}
      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-400/60" />
      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-cyan-400/60" />
      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-cyan-400/60" />
      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-400/60" />

      <div className="mr-3 relative flex-shrink-0 flex items-center justify-center">
        <div className={cn(
          "w-10 h-10 rounded-lg bg-gradient-to-br border flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 backdrop-blur-xs relative",
          theme.bgGradient,
          theme.borderColor,
          theme.glowColor
        )}>
          <div className="absolute inset-0 bg-white/5 rounded-lg" />
          <IconComponent size={19} className={cn("stroke-[2.2]", theme.textColor)} />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center min-w-0 relative z-10">
        <div className="mb-0.5">
          <h3 className="text-slate-300 text-xs font-semibold tracking-wider truncate">
            {data.title}
          </h3>
        </div>

        <div className="flex items-baseline space-x-1 leading-tight">
          <span className="text-lg sm:text-xl font-extrabold text-white tabular-nums tracking-tight font-mono text-shadow-glow">
            {data.value}
          </span>
          {data.unit && (
            <span className="text-slate-400 text-[10px] font-sans font-medium">{data.unit}</span>
          )}
        </div>

        <div className="text-[10px] text-slate-400 flex items-center font-sans mt-0.5">
          <span className="mr-1 scale-95 origin-left">较上期</span>
          <span className={cn(
            "flex items-center font-bold font-mono text-[10px]",
            isPositive ? "text-[#10b981]" : "text-[#ef4444]"
          )}>
            {isPositive ? '▲' : '▼'}{Math.abs(data.trend)}{data.trendIsPercent ? '%' : ''}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
