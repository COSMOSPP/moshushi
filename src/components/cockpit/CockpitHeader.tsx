import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CloudSun, Maximize2, Minimize2, RefreshCw, Home } from 'lucide-react';

interface CockpitHeaderProps {
  onRefresh?: () => void;
}

export function CockpitHeader({ onRefresh }: CockpitHeaderProps) {
  const [time, setTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    const secs = String(d.getSeconds()).padStart(2, '0');
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return `${year}-${month}-${day} ${hours}:${mins}:${secs} ${days[d.getDay()]}`;
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

  const subTabs = ['综合总览', '资源管理', '教学管理', '实训管理', '就业管理', '运营分析', '系统管理'];

  return (
    <header className="relative w-full z-30 bg-[#020716]/95 border-b border-[#1e3a8a]/70 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-3 bg-[#05112c]/80 gap-3">
        {/* Left Side: Badge & Title & Sub Navigation */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-6 h-6 bg-cyan-500 rounded-xs transform rotate-45 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.8)] flex-shrink-0">
              <div className="w-2.5 h-2.5 bg-[#020716] rounded-full" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-extrabold text-white tracking-wide text-shadow-cyan">教育培训领导驾驶舱</span>
              <span className="text-slate-600 font-thin text-sm">|</span>
              <span className="text-xs font-bold text-cyan-400 font-mono tracking-wider">模数师数字平台控制台</span>
            </div>
          </div>

          <nav className="hidden xl:flex items-center space-x-1 pl-4 border-l border-[#1e3a8a]/60">
            {subTabs.map((item, idx) => (
              <button
                key={item}
                onClick={() => setActiveSubTab(idx)}
                className={`px-3 py-1 text-xs font-medium transition-all duration-200 rounded-xs relative cursor-pointer ${
                  activeSubTab === idx
                    ? 'text-cyan-300 font-bold bg-[#1e3a8a]/60 border border-cyan-500/60 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#1e3a8a]/30'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Side: Date, Weather, Controls */}
        <div className="flex items-center space-x-4 text-xs text-slate-300">
          <div className="text-cyan-400 font-mono tracking-wide tabular-nums hidden sm:block">
            {formatDate(time)}
          </div>

          <div className="hidden lg:flex items-center text-slate-300">
            <CloudSun size={15} className="mr-1.5 text-cyan-300" />
            <span>多云 26°C</span>
          </div>

          <div className="flex items-center space-x-2 border-l border-[#1e3a8a] pl-3">
            {onRefresh && (
              <button
                onClick={onRefresh}
                title="刷新数据"
                className="p-1.5 text-slate-400 hover:text-white transition-colors rounded bg-[#09183d] border border-[#1e3a8a] hover:border-cyan-500/60 cursor-pointer"
              >
                <RefreshCw size={13} />
              </button>
            )}

            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? "退出全屏" : "全屏大屏模式"}
              className="p-1.5 text-slate-400 hover:text-white transition-colors rounded bg-[#09183d] border border-[#1e3a8a] hover:border-cyan-500/60 cursor-pointer flex items-center gap-1"
            >
              {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
              <span className="hidden sm:inline text-[11px] font-medium">{isFullscreen ? "退出全屏" : "全屏"}</span>
            </button>

            <Link
              to="/"
              title="返回平台首页"
              className="p-1.5 px-2.5 text-slate-300 hover:text-white transition-colors rounded bg-[#09183d] border border-[#1e3a8a] hover:border-cyan-500/60 cursor-pointer flex items-center gap-1 text-[11px] font-medium"
            >
              <Home size={13} />
              <span className="hidden sm:inline">返回首页</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
