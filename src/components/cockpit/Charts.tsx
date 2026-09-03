import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { DashboardPanel } from './DashboardPanel';
import { 
  employmentDestinationsData, 
  employmentRolesData, 
  employmentRegionsData,
  studentLevelData,
  courseRankingData,
  teacherRankingData
} from '../../data/cockpitMockData';
import { Star, Medal } from 'lucide-react';

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

// Auto scroll hook for dashboard lists
function useAutoScroll(isPaused: boolean, speed = 0.5) {
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
          el.scrollTop += speed;
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
  }, [isPaused, speed]);

  return scrollRef;
}

export const EnrollmentTrendChart = ({ data }: { data: any[] }) => (
  <DashboardPanel 
    title="报名 / 在训人数趋势" 
    className="h-full min-h-0 flex flex-col"
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

/**
 * 学员等级分布详情模块
 */
export const StudentLevelDistributionChart = ({ data = studentLevelData }: { data?: typeof studentLevelData }) => {
  const [activeTab, setActiveTab] = useState<'ratio' | 'passRate'>('ratio');
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveTab(prev => (prev === 'ratio' ? 'passRate' : 'ratio'));
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const totalCount = useMemo(() => data.reduce((acc, item) => acc + item.count, 0), [data]);
  const expertPlusCount = useMemo(() => {
    const expert = data.find(d => d.code === 'L5')?.count || 0;
    const advanced = data.find(d => d.code === 'L4')?.count || 0;
    return expert + advanced;
  }, [data]);
  const highTierRatio = totalCount > 0 ? ((expertPlusCount / totalCount) * 100).toFixed(1) : '0';

  const tabButtonClasses = (isActive: boolean) => 
    `px-2.5 py-1 text-[11px] transition-all duration-300 rounded-sm cursor-pointer ${isActive 
      ? 'bg-[#1e3a8a]/80 text-cyan-300 font-semibold border border-cyan-500/60 shadow-[0_0_8px_rgba(6,182,212,0.3)]' 
      : 'bg-[#0a1532]/40 text-slate-400 border border-transparent hover:bg-[#1e3a8a]/20 hover:text-slate-200'
    }`;

  const pieData = data.map(item => ({
    name: item.level,
    value: item.percentage,
    count: item.count,
    color: item.color,
  }));

  return (
    <DashboardPanel 
      title="学员等级分布详情" 
      className="h-full min-h-0 flex flex-col"
    >
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex items-center justify-between mt-1 px-1 mb-1"
      >
        <div className="flex space-x-1.5">
          <button className={tabButtonClasses(activeTab === 'ratio')} onClick={() => setActiveTab('ratio')}>
            等级占比
          </button>
          <button className={tabButtonClasses(activeTab === 'passRate')} onClick={() => setActiveTab('passRate')}>
            考核达标率
          </button>
        </div>
        <div className="flex items-center space-x-2 text-[10px] text-slate-400">
          <span>高阶(L4/L5): <strong className="text-cyan-400 font-mono font-bold">{highTierRatio}%</strong></span>
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-slate-500' : 'bg-cyan-400 animate-pulse'}`} />
          <span>{isPaused ? '已暂停' : '自动切换中'}</span>
        </div>
      </div>

      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex-1 w-full h-full flex flex-col justify-center"
      >
        {activeTab === 'ratio' ? (
          <div className="flex w-full h-full pb-4 pt-1 items-center gap-6 px-2 flex-1">
            <div className="w-[43%] h-full relative flex items-center justify-center flex-shrink-0">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-0">
                <p className="text-[10px] text-slate-400 mb-0.5">在训学员</p>
                <p className="text-base font-bold text-white tracking-tight font-mono">
                  {totalCount.toLocaleString()}
                  <span className="text-[10px] font-normal ml-0.5 text-slate-400">人</span>
                </p>
              </div>

              <ResponsiveContainer width="100%" height="100%" className="relative z-10">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius="56%"
                    outerRadius="86%"
                    paddingAngle={1.5}
                    dataKey="value"
                    stroke="#051025"
                    strokeWidth={2}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`level-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    wrapperStyle={{ zIndex: 9999, outline: 'none' }} 
                    content={({ active, payload }: any) => {
                      if (active && payload && payload.length) {
                        const item = payload[0].payload;
                        return (
                          <div className="bg-[#051025]/95 border border-cyan-500/50 p-2.5 rounded-lg shadow-xl backdrop-blur-md text-xs">
                            <p className="font-bold text-slate-100 flex items-center space-x-1 mb-1">
                              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: item.color }} />
                              <span>{item.name}</span>
                            </p>
                            <p className="text-slate-300">人数: <span className="text-cyan-300 font-mono font-semibold">{item.count}人</span></p>
                            <p className="text-slate-300">占比: <span className="text-cyan-300 font-mono font-semibold">{item.value}%</span></p>
                          </div>
                        );
                      }
                      return null;
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-2 pr-1 pl-3 border-l border-[#1e3a8a]/40">
              {data.map((item, index) => (
                <div key={index} className="flex flex-col space-y-0.5 group">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1.5 min-w-0">
                      <span 
                        className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold text-white"
                        style={{ backgroundColor: `${item.color}33`, borderColor: `${item.color}88`, borderWidth: 1 }}
                      >
                        {item.code}
                      </span>
                      <span className="text-slate-200 text-[11px] font-medium truncate">{item.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 font-mono text-xs">
                      <span className="text-slate-400 text-[11px]">{item.count}人</span>
                      <span className="text-slate-200 font-bold w-11 text-right">{item.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#081738] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${item.percentage * 2.2}%`, 
                        backgroundColor: item.color,
                        boxShadow: `0 0 6px ${item.color}66`
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-between h-full pb-3 pt-2 px-2 space-y-2">
            {data.map((item, index) => (
              <div key={index} className="bg-[#071330]/80 border border-[#1e3a8a]/60 rounded-md p-2 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <span 
                    className="w-7 h-7 rounded-md flex items-center justify-center font-mono font-bold text-xs text-white"
                    style={{ backgroundColor: `${item.color}44`, border: `1px solid ${item.color}` }}
                  >
                    {item.code}
                  </span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-slate-100">{item.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({item.count}人)</span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate max-w-[190px]">{item.desc}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-400">考核达标率</div>
                  <div className="text-xs font-bold font-mono text-emerald-400">
                    {item.passRate}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardPanel>
  );
};

export const EmploymentDestinationsChart = () => {
  const [activeTab, setActiveTab] = useState<'industry' | 'role' | 'region'>('industry');
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const tabs: ('industry' | 'role' | 'region')[] = ['industry', 'role', 'region'];
    const timer = setInterval(() => {
      setActiveTab((prev) => {
        const nextIndex = (tabs.indexOf(prev) + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const getData = () => {
    switch (activeTab) {
      case 'role': return employmentRolesData;
      case 'region': return employmentRegionsData;
      default: return employmentDestinationsData;
    }
  };

  const data = getData();
  const tabButtonClasses = (isActive: boolean) => 
    `px-2.5 py-1 text-[11px] transition-all duration-300 rounded-sm cursor-pointer ${isActive 
      ? 'bg-[#1e3a8a]/80 text-cyan-300 font-semibold border border-cyan-500/60 shadow-[0_0_8px_rgba(6,182,212,0.3)]' 
      : 'bg-[#0a1532]/40 text-slate-400 border border-transparent hover:bg-[#1e3a8a]/20 hover:text-slate-200'
    }`;

  return (
    <DashboardPanel title="基础就业去向分布" className="h-full min-h-0 flex flex-col">
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex items-center justify-between mt-1 px-1 mb-1"
      >
        <div className="flex space-x-1.5">
          <button className={tabButtonClasses(activeTab === 'industry')} onClick={() => setActiveTab('industry')}>行业分布</button>
          <button className={tabButtonClasses(activeTab === 'role')} onClick={() => setActiveTab('role')}>岗位分布</button>
          <button className={tabButtonClasses(activeTab === 'region')} onClick={() => setActiveTab('region')}>地区分布</button>
        </div>
        <div className="flex items-center space-x-1.5 text-[10px] text-slate-400">
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-slate-500' : 'bg-cyan-400 animate-pulse'}`} />
          <span>{isPaused ? '已暂停' : '自动切换中'}</span>
        </div>
      </div>
      
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex w-full h-full pb-4 pt-1 items-center flex-1 gap-6 px-2"
      >
        <div className="w-[43%] h-full relative flex-shrink-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none mt-0.5 z-0">
            <p className="text-[10px] text-slate-400 mb-0.5">就业人数</p>
            <p className="text-base font-bold text-white tracking-tight font-mono">
              1,256<span className="text-[10px] font-normal ml-0.5 text-slate-300">人</span>
            </p>
          </div>

          <ResponsiveContainer width="100%" height="100%" className="relative z-10">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="56%"
                outerRadius="86%"
                paddingAngle={1.5}
                dataKey="value"
                stroke="#051025"
                strokeWidth={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                wrapperStyle={{ zIndex: 9999, outline: 'none' }} 
                content={({ active, payload }: any) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    return (
                      <div className="bg-[#051025]/95 border border-cyan-500/50 p-2.5 rounded-lg shadow-xl backdrop-blur-md text-xs">
                        <p className="font-bold text-slate-100 flex items-center space-x-1 mb-1">
                          <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: item.color }} />
                          <span>{item.name}</span>
                        </p>
                        <p className="text-slate-300">人数: <span className="text-cyan-300 font-mono font-semibold">{item.count}人</span></p>
                        <p className="text-slate-300">占比: <span className="text-cyan-300 font-mono font-semibold">{item.value}%</span></p>
                      </div>
                    );
                  }
                  return null;
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex-1 flex flex-col justify-center space-y-2 pr-1 pl-3 border-l border-[#1e3a8a]/40">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs group">
              <div className="flex items-center space-x-2 min-w-0 flex-1 mr-2">
                <span 
                  className="w-2.5 h-2.5 rounded-xs flex-shrink-0" 
                  style={{ backgroundColor: item.color }} 
                />
                <span className="text-slate-300 text-[11px] truncate group-hover:text-cyan-300 transition-colors">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center space-x-3 font-mono text-[11px] flex-shrink-0">
                <span className="text-cyan-400 font-semibold">{item.count}人</span>
                <span className="text-slate-200 font-bold w-12 text-right">{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardPanel>
  );
};

/**
 * 课程评价排名模块 (TOP 10 滚动展示)
 */
export const CourseEvaluationRankingChart = ({ data = courseRankingData }: { data?: typeof courseRankingData }) => {
  const [isPaused, setIsPaused] = useState(false);

  const scrollRef = useAutoScroll(isPaused, 0.6);

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <span className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-mono font-extrabold text-[11px] flex items-center justify-center shadow-[0_0_8px_rgba(245,158,11,0.6)] flex-shrink-0">
          1
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="w-5 h-5 rounded-full bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 font-mono font-extrabold text-[11px] flex items-center justify-center shadow-[0_0_8px_rgba(203,213,225,0.4)] flex-shrink-0">
          2
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-mono font-extrabold text-[11px] flex items-center justify-center shadow-[0_0_8px_rgba(217,119,6,0.3)] flex-shrink-0">
          3
        </span>
      );
    }
    if (rank <= 10) {
      return (
        <span className="w-5 h-5 rounded-full bg-[#0d2252] border border-cyan-500/60 text-cyan-300 font-mono font-bold text-[10px] flex items-center justify-center flex-shrink-0 shadow-[0_0_6px_rgba(6,182,212,0.2)]">
          {rank}
        </span>
      );
    }
    return (
      <span className="w-5 h-5 rounded-full bg-[#0d1f47] border border-[#1e3a8a] text-slate-400 font-mono font-bold text-[10px] flex items-center justify-center flex-shrink-0">
        {rank}
      </span>
    );
  };

  return (
    <DashboardPanel 
      title="课程评价排名" 
      className="h-full min-h-0 flex flex-col"
    >
      <div 
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex-1 overflow-y-auto no-scrollbar space-y-1.5 pr-1 min-h-0 mt-0.5"
      >
        {data.map((course, idx) => (
          <div 
            key={`${course.id}-${idx}`} 
            className="p-2 bg-[#071330]/70 hover:bg-[#0c1f4d]/90 border border-[#1e3a8a]/50 hover:border-cyan-500/40 rounded-lg transition-all duration-200 group flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center space-x-2.5 min-w-0 flex-1 mr-2">
              {getRankBadge(course.rank)}
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-1.5">
                  <h4 className="text-xs font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors truncate">
                    {course.title}
                  </h4>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 flex-shrink-0">
                    {course.category}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-[10px] text-slate-400 mt-0.5">
                  <span>讲师: {course.teacher}</span>
                  <span>评价: {course.reviews}条</span>
                  <span className="text-emerald-400 font-mono">好评率: {course.satisfaction}%</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end flex-shrink-0">
              <div className="flex items-center space-x-1 text-amber-400 font-mono font-bold text-sm">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span>{course.score.toFixed(2)}</span>
              </div>
              <span className="text-[9px] text-emerald-400 font-mono mt-0.5">
                {course.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
    </DashboardPanel>
  );
};

/**
 * 优秀教师排行榜模块 (支持滚动展示更多数据)
 */
export const TeacherRankingChart = ({ data = teacherRankingData }: { data?: typeof teacherRankingData }) => {
  const [isPaused, setIsPaused] = useState(false);

  const scrollRef = useAutoScroll(isPaused, 0.6);

  const getRankIndicator = (index: number) => {
    const rank = index + 1;
    if (rank === 1) {
      return (
        <span className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-mono font-extrabold text-[11px] flex items-center justify-center shadow-[0_0_8px_rgba(245,158,11,0.6)] flex-shrink-0">
          1
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="w-5 h-5 rounded-full bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 font-mono font-extrabold text-[11px] flex items-center justify-center shadow-[0_0_8px_rgba(203,213,225,0.4)] flex-shrink-0">
          2
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-mono font-extrabold text-[11px] flex items-center justify-center shadow-[0_0_8px_rgba(217,119,6,0.3)] flex-shrink-0">
          3
        </span>
      );
    }
    return (
      <span className="w-5 h-5 rounded-full bg-[#0d1f47] border border-[#1e3a8a] text-slate-400 font-mono font-bold text-[10px] flex items-center justify-center flex-shrink-0">
        {rank}
      </span>
    );
  };

  return (
    <DashboardPanel 
      title="优秀教师排行榜" 
      className="h-full min-h-0 flex flex-col"
    >
      <div 
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex-1 overflow-x-auto overflow-y-auto no-scrollbar min-h-0 border border-[#1e3a8a]/40 rounded mt-0.5"
      >
        <table className="w-full min-w-[360px] text-left text-[11px] border-collapse">
          <thead className="bg-[#102347] text-slate-400 sticky top-0 z-10">
            <tr>
              <th className="py-2 px-3 font-medium whitespace-nowrap text-slate-400 w-14 text-center">排名</th>
              <th className="py-2 px-2.5 font-medium whitespace-nowrap text-slate-400">教师名称</th>
              <th className="py-2 px-2.5 font-medium whitespace-nowrap text-slate-400">教师职称</th>
              <th className="py-2 px-3 font-medium whitespace-nowrap text-slate-400 text-right">已教学员</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e3a8a]/30">
            {data.map((teacher, idx) => (
              <tr 
                key={`${teacher.id}-${idx}`}
                className="hover:bg-[#1e3a8a]/30 transition-colors cursor-pointer text-slate-200 group"
              >
                <td className="py-2.5 px-3 whitespace-nowrap text-center">
                  <div className="flex justify-center items-center">
                    {getRankIndicator(idx)}
                  </div>
                </td>
                <td className="py-2.5 px-2.5 whitespace-nowrap">
                  <span className="font-medium text-slate-100 group-hover:text-amber-300 transition-colors truncate">
                    {teacher.name}
                  </span>
                </td>
                <td className="py-2.5 px-2.5 whitespace-nowrap">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-700/50 font-medium inline-block">
                    {teacher.title}
                  </span>
                </td>
                <td className="py-2.5 px-3 font-mono whitespace-nowrap text-right text-cyan-400 font-semibold">
                  {teacher.students}人
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardPanel>
  );
};

// For backward compatibility
export const PassRateTrendChart = StudentLevelDistributionChart;
export const CourseEvaluationChart = CourseEvaluationRankingChart;
export const WorksTrendChart = TeacherRankingChart;


