import React, { useState, useRef, useEffect } from 'react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { DashboardPanel } from './DashboardPanel';
import { employmentDestinationsData, employmentRolesData, employmentRegionsData } from '../../data/cockpitMockData';
import { ChevronDown, Check } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#051025]/95 border border-[#1e3a8a] p-3 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.7)] backdrop-blur-md z-[9999] relative pointer-events-none">
        {label && <p className="text-slate-300 font-medium text-xs mb-2 border-b border-[#1e3a8a]/50 pb-1">{label}</p>}
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs font-bold flex justify-between items-center space-x-6 py-0.5" style={{ color: entry.color || entry.fill }}>
            <span>{entry.name}</span>
            <span className="font-mono text-slate-100 ml-4">
              {entry.value}{entry.unit || (entry.name && entry.name.includes('率') ? '%' : '')}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface PeriodSelectProps {
  value?: string;
  onChange?: (val: string) => void;
}

const periodOptions = [
  { label: '近6期', value: '6' },
  { label: '近3期', value: '3' },
  { label: '近12期', value: '12' },
];

const PeriodSelect = ({ value = '6', onChange }: PeriodSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentOption = periodOptions.find((opt) => opt.value === selected) || periodOptions[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    setSelected(val);
    setIsOpen(false);
    if (onChange) onChange(val);
  };

  return (
    <div ref={containerRef} className="relative z-30">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-[#071129] border transition-all duration-200 text-slate-200 text-[11px] px-2.5 py-1 rounded flex items-center space-x-1 shadow-sm outline-none cursor-pointer ${
          isOpen
            ? 'border-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.3)] bg-[#0d1b3e]'
            : 'border-[#1e3a8a] hover:border-cyan-500/60 hover:bg-[#0a1838]'
        }`}
      >
        <span className="font-medium text-slate-200">{currentOption.label}</span>
        <ChevronDown
          size={12}
          className={`text-cyan-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-300' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-24 z-50 bg-[#0a1738]/95 border border-cyan-500/50 shadow-[0_10px_25px_rgba(0,0,0,0.8)] rounded-md py-1 overflow-hidden backdrop-blur-md">
          {periodOptions.map((opt) => {
            const isSelected = opt.value === selected;
            return (
              <div
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`px-2.5 py-1 text-[11px] transition-colors flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#1e3a8a] text-cyan-300 font-semibold'
                    : 'text-slate-300 hover:bg-[#142858] hover:text-slate-100'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check size={11} className="text-cyan-400" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const EnrollmentTrendChart = ({ data }: { data: any[] }) => (
  <DashboardPanel 
    title="报名 / 在训人数趋势" 
    className="min-h-[300px] h-full"
    extra={
      <div className="flex space-x-2 items-center">
        <span className="text-xs text-slate-500">期次对比</span>
        <PeriodSelect />
      </div>
    }
  >
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" vertical={false} opacity={0.4} />
        <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
        <Tooltip wrapperStyle={{ zIndex: 9999, outline: 'none' }} content={<CustomTooltip />} />
        <Line type="linear" dataKey="报名人数" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 6 }} />
        <Line type="linear" dataKey="在训人数" stroke="#10b981" strokeWidth={2} dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  </DashboardPanel>
);

export const PassRateTrendChart = ({ data }: { data: any[] }) => (
  <DashboardPanel title="完课率 / 通过率趋势" extra={<PeriodSelect />} className="min-h-[300px] h-full">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" vertical={false} opacity={0.4} />
        <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
        <Tooltip wrapperStyle={{ zIndex: 9999, outline: 'none' }} content={<CustomTooltip />} />
        <Line type="linear" dataKey="完课率" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} />
        <Line type="linear" dataKey="通过率" stroke="#10b981" strokeWidth={2} dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }} />
      </LineChart>
    </ResponsiveContainer>
  </DashboardPanel>
);

export const EmploymentDestinationsChart = () => {
  const [activeTab, setActiveTab] = useState<'industry' | 'role' | 'region'>('industry');

  const getData = () => {
    switch (activeTab) {
      case 'role': return employmentRolesData;
      case 'region': return employmentRegionsData;
      default: return employmentDestinationsData;
    }
  };

  const data = getData();
  const tabButtonClasses = (isActive: boolean) => 
    `px-3 py-1 text-[11px] transition-colors rounded-sm cursor-pointer ${isActive 
      ? 'bg-[#1e3a8a]/60 text-cyan-300 font-semibold border border-cyan-500/50' 
      : 'bg-[#0a1532]/40 text-slate-400 border border-transparent hover:bg-[#1e3a8a]/20 hover:text-slate-200'
    }`;

  return (
    <DashboardPanel title="基础就业去向分布" extra={<PeriodSelect />} className="min-h-[300px] h-full">
      <div className="flex space-x-1.5 mt-1 px-1">
        <button className={tabButtonClasses(activeTab === 'industry')} onClick={() => setActiveTab('industry')}>行业分布</button>
        <button className={tabButtonClasses(activeTab === 'role')} onClick={() => setActiveTab('role')}>岗位分布</button>
        <button className={tabButtonClasses(activeTab === 'region')} onClick={() => setActiveTab('region')}>地区分布</button>
      </div>
      
      <div className="flex w-full h-full pb-10 pt-2 items-center">
        <div className="w-1/2 h-full relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none mt-1 z-0">
            <p className="text-[10px] text-slate-400 mb-0.5">就业人数</p>
            <p className="text-lg font-bold text-white tracking-tight">1,256<span className="text-[10px] font-normal ml-0.5 text-slate-300">人</span></p>
          </div>

          <ResponsiveContainer width="100%" height="100%" className="relative z-10">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="85%"
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip wrapperStyle={{ zIndex: 9999, outline: 'none' }} content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="w-1/2 flex flex-col justify-center space-y-3 pr-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center text-xs">
              <span 
                className="w-2.5 h-2.5 rounded-xs mr-2 flex-shrink-0" 
                style={{ backgroundColor: item.color }} 
              />
              <span className="text-slate-300 flex-1 truncate">{item.name}</span>
              <span className="text-slate-200 font-mono tracking-wide w-12 text-right font-bold">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardPanel>
  );
};

export const CourseEvaluationChart = ({ data }: { data: any[] }) => (
  <DashboardPanel title="课程评价分布" extra={<PeriodSelect />} className="min-h-[300px] h-full">
    <p className="text-[10px] text-slate-400 mb-2">课程数 (门)</p>
    <ResponsiveContainer width="100%" height="90%">
      <BarChart data={data} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" vertical={false} opacity={0.4} />
        <XAxis dataKey="subject" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
        <Tooltip wrapperStyle={{ zIndex: 9999, outline: 'none' }} cursor={{fill: '#1e3a8a', opacity: 0.2}} content={<CustomTooltip />} />
        <Bar dataKey="value" fill="#3b82f6" barSize={30}>
           {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill="url(#colorBar)" />
           ))}
        </Bar>
        <defs>
          <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>
            <stop offset="100%" stopColor="#2563eb" stopOpacity={0.2}/>
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  </DashboardPanel>
);

export const WorksTrendChart = ({ data }: { data: any[] }) => (
  <DashboardPanel title="作品数量趋势" extra={<PeriodSelect />} className="min-h-[300px] h-full">
    <p className="text-[10px] text-slate-400 mb-2">作品数量 (个)</p>
    <ResponsiveContainer width="100%" height="90%">
      <AreaChart data={data} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorWorks" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" vertical={false} opacity={0.4} />
        <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
        <Tooltip wrapperStyle={{ zIndex: 9999, outline: 'none' }} content={<CustomTooltip />} />
        <Area type="linear" dataKey="作品数量" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorWorks)" activeDot={{ r: 6 }} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} />
      </AreaChart>
    </ResponsiveContainer>
  </DashboardPanel>
);
