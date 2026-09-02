import React, { useState, useMemo, useRef, useEffect } from 'react';
import { DashboardPanel } from './DashboardPanel';
import { ClassRow } from '../../types/cockpit';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  Check,
  Search, 
  AlertTriangle, 
  User, 
  X
} from 'lucide-react';

type TabKey = 'attendance' | 'completion' | 'passRate' | 'count' | 'warning';

function PageSizeSelect({ value, onChange }: { value: number; onChange: (val: number) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const options = [
    { label: '5条/页', value: 5 },
    { label: '10条/页', value: 10 },
    { label: '15条/页', value: 15 },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div ref={containerRef} className="relative ml-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-[#071129] border transition-all duration-200 text-slate-300 text-[10px] px-2 py-0.5 rounded flex items-center space-x-1 outline-none cursor-pointer ${
          isOpen ? 'border-cyan-500 bg-[#0d1b3e]' : 'border-[#1e3a8a] hover:border-cyan-500/60'
        }`}
      >
        <span>{currentOption.label}</span>
        <ChevronDown size={11} className={`text-cyan-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-1 w-20 z-50 bg-[#0a1738]/95 border border-cyan-500/50 shadow-[0_10px_25px_rgba(0,0,0,0.8)] rounded py-1 overflow-hidden backdrop-blur-md">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`px-2 py-1 text-[10px] flex items-center justify-between cursor-pointer ${
                  isSelected ? 'bg-[#1e3a8a] text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-[#142858] hover:text-slate-100'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check size={10} className="text-cyan-400" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ClassTable({ data }: { data: ClassRow[] }) {
  const [activeTab, setActiveTab] = useState<TabKey>('attendance');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedClass, setSelectedClass] = useState<ClassRow | null>(null);

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'attendance', label: '按出勤率' },
    { key: 'completion', label: '按完课率' },
    { key: 'passRate', label: '按通过率' },
    { key: 'count', label: '按在训人数' },
    { key: 'warning', label: '需预警班级' },
  ];

  const warningCount = useMemo(() => {
    return data.filter(
      (item) => item.status === '需关注' || item.attendance < 90 || item.passRate < 85
    ).length;
  }, [data]);

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.className.toLowerCase().includes(term) ||
          item.courseName.toLowerCase().includes(term) ||
          (item.instructor && item.instructor.toLowerCase().includes(term))
      );
    }

    if (activeTab === 'attendance') {
      result.sort((a, b) => b.attendance - a.attendance);
    } else if (activeTab === 'completion') {
      result.sort((a, b) => b.completion - a.completion);
    } else if (activeTab === 'passRate') {
      result.sort((a, b) => b.passRate - a.passRate);
    } else if (activeTab === 'count') {
      result.sort((a, b) => b.count - a.count);
    } else if (activeTab === 'warning') {
      result = result.filter(
        (item) => item.status === '需关注' || item.attendance < 90 || item.passRate < 85
      );
      result.sort((a, b) => a.attendance - b.attendance);
    }

    return result;
  }, [data, activeTab, searchTerm]);

  const totalItems = filteredAndSortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const handleTabChange = (key: TabKey) => {
    setActiveTab(key);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const currentPageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAndSortedData.slice(start, start + pageSize);
  }, [filteredAndSortedData, currentPage, pageSize]);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <DashboardPanel title="班级概览" className="col-span-1 lg:col-span-1 min-h-[300px] h-full flex flex-col relative">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex flex-wrap gap-1.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            const isWarningTab = tab.key === 'warning';
            return (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`relative px-2.5 py-1 text-[11px] font-medium transition-all duration-200 border rounded cursor-pointer ${
                  isActive
                    ? isWarningTab
                      ? 'bg-rose-950/60 text-rose-300 border-rose-500/80 shadow-[0_0_12px_rgba(244,63,94,0.3)] font-semibold'
                      : 'bg-[#1e3a8a] text-cyan-300 border-cyan-500/60 shadow-[0_0_10px_rgba(6,182,212,0.3)] font-semibold'
                    : 'bg-[#0a1532]/60 text-slate-400 border-[#1e3a8a]/70 hover:bg-[#1e3a8a]/40 hover:text-slate-200'
                }`}
              >
                <span className="flex items-center space-x-1">
                  {isWarningTab && <AlertTriangle size={12} className={isActive ? 'text-rose-400' : 'text-amber-400'} />}
                  <span>{tab.label}</span>
                  {isWarningTab && warningCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-rose-500 text-white">
                      {warningCount}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="搜索班级/课程..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-32 sm:w-36 bg-[#070f24] border border-[#1e3a8a] focus:border-cyan-500/80 text-slate-200 placeholder-slate-500 text-[10px] rounded px-2 py-1 pl-6 outline-none transition-colors"
          />
          <Search size={11} className="absolute left-2 text-slate-400" />
          {searchTerm && (
            <button
              onClick={() => { setSearchTerm(''); setCurrentPage(1); }}
              className="absolute right-1.5 text-slate-400 hover:text-slate-200"
            >
              <X size={10} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar min-h-0 border border-[#1e3a8a]/40 rounded">
        <table className="w-full min-w-[620px] text-left text-[11px] border-collapse">
          <thead className="bg-[#102347] text-slate-400 sticky top-0 z-10">
            <tr>
              <th className="py-2 px-3 font-medium whitespace-nowrap text-slate-400">班级名称</th>
              <th className="py-2 px-2 font-medium whitespace-nowrap text-slate-400">课程名称</th>
              <th className="py-2 px-2 font-medium whitespace-nowrap text-slate-400">在训人数</th>
              <th className="py-2 px-2 font-medium whitespace-nowrap text-slate-400">平均出勤率</th>
              <th className="py-2 px-2 font-medium whitespace-nowrap text-slate-400">完课率</th>
              <th className="py-2 px-2 font-medium whitespace-nowrap text-slate-400">通过率</th>
              <th className="py-2 px-2 font-medium whitespace-nowrap text-slate-400">状态/评价</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e3a8a]/30">
            {currentPageData.length > 0 ? (
              currentPageData.map((row) => {
                const isWarningRow = row.status === '需关注' || row.attendance < 90 || row.passRate < 85;
                return (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedClass(row)}
                    className={`hover:bg-[#1e3a8a]/30 transition-colors cursor-pointer text-slate-200 group ${
                      isWarningRow && activeTab === 'warning' ? 'bg-rose-950/15 hover:bg-rose-900/30' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 max-w-[140px] whitespace-nowrap">
                      <div className="font-medium truncate text-slate-100 group-hover:text-cyan-300 transition-colors flex items-center space-x-1">
                        {isWarningRow && <AlertTriangle size={11} className="text-amber-400 flex-shrink-0" />}
                        <span className="truncate">{row.className}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-2 truncate max-w-[110px] whitespace-nowrap text-slate-300">{row.courseName}</td>
                    <td className={`py-2.5 px-2 font-mono whitespace-nowrap ${activeTab === 'count' ? 'text-amber-400 font-semibold bg-amber-950/10' : ''}`}>
                      {row.count}人
                    </td>
                    <td className={`py-2.5 px-2 font-mono whitespace-nowrap ${activeTab === 'attendance' ? 'text-cyan-400 font-bold bg-cyan-950/10' : 'text-cyan-400/90'}`}>
                      {row.attendance}%
                    </td>
                    <td className={`py-2.5 px-2 font-mono whitespace-nowrap ${activeTab === 'completion' ? 'text-emerald-400 font-bold bg-emerald-950/10' : 'text-slate-300'}`}>
                      {row.completion}%
                    </td>
                    <td className={`py-2.5 px-2 font-mono whitespace-nowrap ${activeTab === 'passRate' ? 'text-blue-400 font-bold bg-blue-950/10' : 'text-slate-300'}`}>
                      {row.passRate}%
                    </td>
                    <td className="py-2.5 px-2 font-sans whitespace-nowrap">
                      {row.status === '需关注' || isWarningRow ? (
                        <span className="text-rose-400 font-medium">
                          需关注
                        </span>
                      ) : row.status === '优秀' ? (
                        <span className="text-emerald-400 font-medium">
                          优秀 ({row.eval}分)
                        </span>
                      ) : (
                        <span className="text-slate-300 font-medium">
                          {row.eval}分
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500 text-[12px] whitespace-nowrap">
                  未找到符合条件的班级数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-3 text-[11px] text-slate-400 pt-2 border-t border-[#1e3a8a]/30">
        <span>
          共 <strong className="text-cyan-400 font-mono">{totalItems}</strong> 条班级
        </span>
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 hover:text-white disabled:opacity-40 disabled:hover:text-slate-400 transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          
          {getPageNumbers().map((p, idx) => (
            typeof p === 'number' ? (
              <button
                key={idx}
                onClick={() => setCurrentPage(p)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  currentPage === p
                    ? 'text-cyan-300 font-bold border border-cyan-500/60 bg-[#1e3a8a]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#1e3a8a]/40'
                }`}
              >
                {p}
              </button>
            ) : (
              <span key={idx} className="px-1 text-slate-600">...</span>
            )
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1 hover:text-white disabled:opacity-40 disabled:hover:text-slate-400 transition-colors"
          >
            <ChevronRight size={14} />
          </button>

          <PageSizeSelect
            value={pageSize}
            onChange={(val) => {
              setPageSize(val);
              setCurrentPage(1);
            }}
          />
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
