import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CloudSun, 
  Maximize2, 
  Minimize2, 
  RefreshCw, 
  Home, 
  LayoutDashboard
} from 'lucide-react';

interface CockpitHeaderProps {
  onRefresh?: () => void;
}

export function CockpitHeader({ onRefresh }: CockpitHeaderProps) {
  const [time, setTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTime = (d: Date) => {
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    const secs = String(d.getSeconds()).padStart(2, '0');
    return `${hours}:${mins}:${secs}`;
  };

  const getWeekDay = (d: Date) => {
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return days[d.getDay()];
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const handleRefreshClick = () => {
    if (onRefresh) {
      setIsRefreshing(true);
      onRefresh();
      setTimeout(() => setIsRefreshing(false), 800);
    }
  };

  return (
    <header className="relative w-full z-40 bg-[#020718]/95 select-none overflow-hidden">
      {/* Top Ambient Glow Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />

      {/* Main Bar with Center-Symmetric Layout */}
      <div className="relative w-full px-5 py-2.5 flex items-center justify-between min-h-[64px]">
        {/* Left Wing: Real-time Date/Time & Weather */}
        <div className="flex-1 flex items-center space-x-3 text-xs z-10 min-w-0">
          <div className="flex items-baseline space-x-2 font-mono">
            <span className="text-cyan-300 font-bold tracking-wider text-sm text-shadow-cyan">
              {formatTime(time)}
            </span>
            <span className="text-slate-400 text-[11px]">
              {formatDate(time)}
            </span>
            <span className="text-slate-400 text-[11px]">
              {getWeekDay(time)}
            </span>
          </div>

          <div className="hidden xl:flex items-center text-slate-300 space-x-1 bg-[#09183d]/70 px-2.5 py-0.5 rounded border border-[#1e3a8a]/40 text-[11px]">
            <CloudSun size={13} className="text-cyan-400" />
            <span>多云 26°C</span>
          </div>
        </div>

        {/* Center Wing: High-Tech Cyber Canopy Title */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center relative px-6 z-20">
          {/* Cyber Decorative Wing Lines (Left & Right) */}
          <div className="flex items-center space-x-3">
            {/* Left Wing SVG Circuit */}
            <svg className="hidden md:block w-16 lg:w-28 h-4 text-cyan-500/60" viewBox="0 0 100 12" fill="none">
              <path d="M0 6 L70 6 L80 11 L100 11" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="95" cy="11" r="2.5" fill="#06b6d4" />
              <circle cx="20" cy="6" r="1.5" fill="#06b6d4" opacity="0.6" />
            </svg>

            {/* Title Text */}
            <div className="text-center relative">
              <h1 className="text-xl sm:text-2xl lg:text-[26px] font-black tracking-wider font-sans bg-clip-text text-transparent bg-gradient-to-b from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.85)] uppercase">
                模数师数字平台驾驶舱
              </h1>
            </div>

            {/* Right Wing SVG Circuit */}
            <svg className="hidden md:block w-16 lg:w-28 h-4 text-cyan-500/60" viewBox="0 0 100 12" fill="none">
              <path d="M100 6 L30 6 L20 11 L0 11" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="5" cy="11" r="2.5" fill="#06b6d4" />
              <circle cx="80" cy="6" r="1.5" fill="#06b6d4" opacity="0.6" />
            </svg>
          </div>

          {/* Subtitle Cyber Tagline */}
          <div className="flex items-center space-x-2 mt-0.5">
            <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-cyan-400/80" />
            <p className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-cyan-300/80 uppercase font-semibold text-shadow-glow">
              DIGITAL TRAINING INTELLIGENCE COCKPIT
            </p>
            <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-cyan-400/80" />
          </div>
        </div>

        {/* Right Wing: Quick Action & Control Panel */}
        <div className="flex-1 flex items-center justify-end space-x-2.5 z-10 min-w-0">
          {onRefresh && (
            <button
              onClick={handleRefreshClick}
              title="刷新实时数据"
              className="px-2.5 py-1.5 text-slate-300 hover:text-cyan-300 transition-all duration-200 rounded-md bg-[#081738]/80 border border-[#1e3a8a] hover:border-cyan-500/80 hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] cursor-pointer flex items-center space-x-1.5 text-xs group"
            >
              <RefreshCw size={13} className={`text-cyan-400 transition-transform ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'}`} />
              <span className="hidden md:inline font-medium">刷新</span>
            </button>
          )}

          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "退出全屏" : "全屏大屏模式"}
            className="px-2.5 py-1.5 text-slate-300 hover:text-cyan-300 transition-all duration-200 rounded-md bg-[#081738]/80 border border-[#1e3a8a] hover:border-cyan-500/80 hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] cursor-pointer flex items-center space-x-1.5 text-xs group"
          >
            {isFullscreen ? (
              <>
                <Minimize2 size={13} className="text-cyan-400" />
                <span className="hidden sm:inline font-medium">退出全屏</span>
              </>
            ) : (
              <>
                <Maximize2 size={13} className="text-cyan-400" />
                <span className="hidden sm:inline font-medium">全屏模式</span>
              </>
            )}
          </button>

          <Link
            to="/admin/ai"
            title="进入运营管理后台"
            className="px-3 py-1.5 text-slate-200 hover:text-white transition-all duration-200 rounded-md bg-gradient-to-r from-[#1e3a8a]/80 to-[#2563eb]/80 hover:from-[#1e3a8a] hover:to-[#3b82f6] border border-blue-400/60 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] cursor-pointer flex items-center space-x-1.5 text-xs font-medium"
          >
            <LayoutDashboard size={13} className="text-cyan-300" />
            <span className="hidden sm:inline">运营后台</span>
          </Link>

          <Link
            to="/"
            title="返回实训平台首页"
            className="p-1.5 px-2.5 text-slate-400 hover:text-slate-200 transition-colors rounded-md bg-[#06122d]/60 border border-[#1e3a8a]/60 hover:bg-[#0c1f4d] cursor-pointer flex items-center space-x-1 text-xs"
          >
            <Home size={13} />
            <span className="hidden xl:inline">首页</span>
          </Link>
        </div>
      </div>

      {/* Bottom Futuristic Cyber Border Beam */}
      <div className="relative w-full h-[2px] bg-gradient-to-r from-transparent via-[#1e3a8a] to-transparent">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 max-w-[900px] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
        {/* Center Bottom Accent Trapezoid Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-400 to-cyan-500/0 blur-[1px]" />
      </div>
    </header>
  );
}
