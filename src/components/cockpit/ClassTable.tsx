import React, { useState, useRef, useEffect } from 'react';
import { DashboardPanel } from './DashboardPanel';
import { ClassRow } from '../../types/cockpit';
import { 
  AlertTriangle, 
  User, 
  X
} from 'lucide-react';

export function ClassTable({ data }: { data: ClassRow[] }) {
  const [selectedClass, setSelectedClass] = useState<ClassRow | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    let isUserScrolling = false;
    let userScrollTimer: any;

    const handleWheel = () => {
      isUserScrolling = true;
      clearTimeout(userScrollTimer);
      userScrollTimer = setTimeout(() => {
        isUserScrolling = false;
      }, 1500);
    };

    el.addEventListener('wheel', handleWheel, { passive: true });

    const step = () => {
      if (!isPaused && !isUserScrolling && el) {
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 1) {
          el.scrollTop = 0;
        } else {
          el.scrollTop += 0.5;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener('wheel', handleWheel);
      clearTimeout(userScrollTimer);
    };
  }, [isPaused]);

  const totalItems = data.length;

  return (
    <DashboardPanel title="班级概览" className="col-span-1 lg:col-span-1 h-full min-h-0 flex flex-col relative">
      <div 
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex-1 overflow-x-auto overflow-y-auto no-scrollbar min-h-0 border border-[#1e3a8a]/40 rounded mt-0.5"
      >
        <table className="w-full min-w-[420px] text-left text-[11px] border-collapse">
          <thead className="bg-[#102347] text-slate-400 sticky top-0 z-10">
            <tr>
              <th className="py-2 px-3 font-medium whitespace-nowrap text-slate-400">班级名称</th>
              <th className="py-2 px-3 font-medium whitespace-nowrap text-slate-400">课程名称</th>
              <th className="py-2 px-3 font-medium whitespace-nowrap text-slate-400">在训人数</th>
              <th className="py-2 px-3 font-medium whitespace-nowrap text-slate-400">平均出勤率</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e3a8a]/30">
            {data.length > 0 ? (
              data.map((row) => {
                const isWarningRow = row.status === '需关注' || row.attendance < 90 || row.passRate < 85;
                return (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedClass(row)}
                    className="hover:bg-[#1e3a8a]/30 transition-colors cursor-pointer text-slate-200 group"
                  >
                    <td className="py-2.5 px-3 max-w-[170px] whitespace-nowrap">
                      <div className="font-medium truncate text-slate-100 group-hover:text-cyan-300 transition-colors flex items-center space-x-1.5">
                        {isWarningRow && <AlertTriangle size={11} className="text-amber-400 flex-shrink-0" />}
                        <span className="truncate">{row.className}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 truncate max-w-[150px] whitespace-nowrap text-slate-300">{row.courseName}</td>
                    <td className="py-2.5 px-3 font-mono whitespace-nowrap text-amber-400/90 font-medium">
                      {row.count}人
                    </td>
                    <td className="py-2.5 px-3 font-mono whitespace-nowrap text-cyan-400 font-medium">
                      {row.attendance}%
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-500 text-[12px] whitespace-nowrap">
                  未找到符合条件的班级数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-3 text-[11px] text-slate-400 pt-2 border-t border-[#1e3a8a]/30">
        <span>
          共 <strong className="text-cyan-400 font-mono">{totalItems}</strong> 个班级
        </span>
        <div className="flex items-center space-x-2 text-[10px] text-slate-400">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>悬停暂停 · 实时轮播滚动</span>
        </div>
      </div>

      {selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-[#0d1b3e] border border-cyan-500/40 shadow-2xl rounded-xl p-5 text-slate-200">
            <div className="flex justify-between items-start pb-3 border-b border-[#1e3a8a]">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-cyan-950 text-cyan-400 rounded border border-cyan-800">
                  {selectedClass.campus || '北京校区'}
                </span>
                <h3 className="text-base font-bold text-slate-100 mt-1 flex items-center space-x-2">
                  <span>{selectedClass.className}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedClass.courseName}</p>
              </div>
              <button
                onClick={() => setSelectedClass(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="bg-[#071129] p-2.5 rounded border border-[#1e3a8a]/50">
                <span className="text-[10px] text-slate-400">授课讲师</span>
                <div className="text-sm font-semibold text-slate-200 mt-0.5 flex items-center space-x-1">
                  <User size={13} className="text-cyan-400" />
                  <span>{selectedClass.instructor || '核心讲师团'}</span>
                </div>
              </div>
              <div className="bg-[#071129] p-2.5 rounded border border-[#1e3a8a]/50">
                <span className="text-[10px] text-slate-400">在训学员</span>
                <div className="text-sm font-semibold font-mono text-amber-400 mt-0.5">
                  {selectedClass.count} 人
                </div>
              </div>
              <div className="bg-[#071129] p-2.5 rounded border border-[#1e3a8a]/50">
                <span className="text-[10px] text-slate-400">出勤率</span>
                <div className="text-sm font-semibold font-mono text-cyan-400 mt-0.5">
                  {selectedClass.attendance}%
                </div>
              </div>
              <div className="bg-[#071129] p-2.5 rounded border border-[#1e3a8a]/50">
                <span className="text-[10px] text-slate-400">完课率 / 通过率</span>
                <div className="text-sm font-semibold font-mono text-emerald-400 mt-0.5">
                  {selectedClass.completion}% / {selectedClass.passRate}%
                </div>
              </div>
            </div>

            {selectedClass.alertReason && (
              <div className="p-3 bg-rose-950/40 border border-rose-500/50 rounded text-rose-300 text-xs flex items-start space-x-2 mb-3">
                <AlertTriangle size={15} className="text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">预警提示：</strong>
                  <span>{selectedClass.alertReason}。建议班主任跟进考勤与课后辅导。</span>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-[#1e3a8a]">
              <button
                onClick={() => setSelectedClass(null)}
                className="px-4 py-1.5 bg-[#1e3a8a] hover:bg-[#2563eb] text-white text-xs font-medium rounded transition-colors"
              >
                关闭面板
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardPanel>
  );
}
