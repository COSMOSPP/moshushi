import React, { useState } from "react";
import { Link } from "react-router-dom";
import ExamResult from "@/components/ExamResult";
import { 
  ChevronRight, MonitorPlay, FolderKanban, Database, Plus, Play, Download, Search,
  BookOpen, Clock, Bot, TrendingUp, Calendar as CalendarIcon, Target, Flame, Trash2, ArrowRight, ChevronLeft, Sparkles,
  Award, Trophy, Medal, Share2, ShieldCheck, Eye, Printer, X, CheckCircle2, Zap, Star, Crown
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Cell } from "recharts";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function MyLearning() {
  const [activeTab, setActiveTab] = useState<'learning' | 'duration' | 'ai-path' | 'scores' | 'certificates'>('learning');
  const [isViewingExamResult, setIsViewingExamResult] = useState(false);
  const [selectedExamForResult, setSelectedExamForResult] = useState<any>(null);
  const [scoresSubTab, setScoresSubTab] = useState<'exam' | 'homework'>('exam');
  const [previewCert, setPreviewCert] = useState<any | null>(null);
  const [certSearch, setCertSearch] = useState('');
  const [certFilter, setCertFilter] = useState('all');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2000);
  };

  const certificatesList = [
    {
      id: 'CERT-001',
      name: '大模型微调与工程化开发结业证书',
      category: '大模型AI',
      issueDate: '2026-05-20',
      certNo: 'XW-2026-LLM-08912',
      score: 98,
      level: '优秀 (Outstanding)',
      issuer: '玄武定制实训平台 & 数字化人才认证中心',
      skills: ['Llama-3微调', 'LoRA / QLoRA', 'RAG知识库检索', '多智能体协作'],
      bgGradient: 'from-blue-600 via-indigo-600 to-blue-800',
      sealColor: 'text-rose-600'
    },
    {
      id: 'CERT-002',
      name: 'AI全栈智能体开发工程师能力证书',
      category: '大模型AI',
      issueDate: '2026-04-15',
      certNo: 'XW-2026-AGT-04226',
      score: 95,
      level: '优秀 (Outstanding)',
      issuer: '工信人工智能产教融合实训基地',
      skills: ['LangChain', 'Prompt工程', 'Function Calling', '向量数据库'],
      bgGradient: 'from-indigo-600 via-purple-600 to-indigo-800',
      sealColor: 'text-rose-600'
    },
    {
      id: 'CERT-003',
      name: '云计算架构与微服务实训认证证书',
      category: '云计算',
      issueDate: '2026-03-10',
      certNo: 'XW-2026-CLD-11083',
      score: 92,
      level: '良好 (Distinction)',
      issuer: '玄武定制实训平台技能认证委员会',
      skills: ['Docker容器化', 'Kubernetes编排', '微服务网关', 'CI/CD流水线'],
      bgGradient: 'from-cyan-600 via-blue-600 to-teal-700',
      sealColor: 'text-rose-600'
    },
    {
      id: 'CERT-004',
      name: 'Python高级数据分析与AI实战结业证书',
      category: '数据智能',
      issueDate: '2025-12-28',
      certNo: 'XW-2025-PY-07319',
      score: 96,
      level: '优秀 (Outstanding)',
      issuer: '全国高校数字化实训联合教学组',
      skills: ['Pandas数据清洗', 'Scikit-Learn', '统计分析建模', 'ECharts可视化'],
      bgGradient: 'from-amber-600 via-orange-600 to-amber-800',
      sealColor: 'text-rose-600'
    }
  ];

  const [trendRange, setTrendRange] = useState<'week' | 'month'>('week');

  const monthData = React.useMemo(() => Array.from({ length: 30 }).map((_, i) => {
    const val = 2 + Math.sin(i / 3) * 1.5 + Math.random() * 1.5;
    return { name: `4/${i + 1}`, hours: Number(val.toFixed(1)) };
  }), []);

  if (isViewingExamResult && selectedExamForResult) {
    return (
      <ExamResult 
        exam={selectedExamForResult} 
        directPreview={true}
        onBack={() => {
          setIsViewingExamResult(false);
          setSelectedExamForResult(null);
        }} 
      />
    );
  }

  const renderLearningTab = () => (
    <div className="space-y-8 animation-fade-in">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <MonitorPlay className="w-5 h-5 text-[#3b82f6]" />
            最近学习的课程
          </h2>
          <button className="text-sm text-neutral-500 hover:text-[#3b82f6] flex items-center transition-colors">
            进入全部课程 <ChevronRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>
        
        <div className="border border-neutral-200 rounded-2xl shadow-sm hover:border-blue-200 transition-colors bg-white">
          <div className="p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="w-48 h-32 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 object-cover overflow-hidden relative group">
              <MonitorPlay className="w-10 h-10 text-orange-200" />
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-[2px]">
                <Play className="w-10 h-10 text-white opacity-90" />
              </div>
            </div>
            <div className="flex-1 space-y-4 w-full">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">Python高级数据处理与可视化</h3>
                <p className="text-sm text-neutral-500 mt-1">正在学习：第4章 复杂数据清洗与异常处理 - 小节 4.2</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">课程总进度</span>
                  <span className="text-[#3b82f6] font-bold">65%</span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#3b82f6] rounded-full transition-all" style={{ width: '65%' }} />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                  继续学习
                </button>
                <button className="bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-600 px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                  查看课程详情
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. 成长进度 (Growth Progress & Level Ladder) ================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-neutral-900">成长进度与能力矩阵</h2>
          </div>
          <span className="text-xs text-neutral-400">
            经验值每日自动结算 · 距离升级仅差 <strong className="text-amber-600 font-mono">3,150 EXP</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Level Progress Card */}
          <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-indigo-950 rounded-2xl p-6 text-white shadow-md flex flex-col justify-between relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center font-black text-sm shadow-md">
                    Lv.4
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-white text-base">登堂入室 (Expert)</h3>
                      <Crown className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    </div>
                    <div className="text-[11px] text-white/60">当前全平台综合排名前 8%</div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/10 border border-white/15 text-purple-200">
                  尊贵星钻
                </span>
              </div>

              {/* Progress Track */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/70">成长值进度 (55%)</span>
                  <span className="text-amber-300 font-bold">3,850 / 7,000 EXP</span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 rounded-full transition-all duration-500" style={{ width: '55%' }} />
                </div>
              </div>

              {/* Privileges unlocked */}
              <div className="pt-3 border-t border-white/10 space-y-1 text-xs">
                <span className="text-[11px] font-semibold text-white/60">当前已享特权:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-white/90">⚡ 150h GPU算力/月</span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-white/90">🚀 A100微调通道</span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-white/90">🌟 助教答疑特快通道</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/70 relative z-10">
              <span>拥有积分: <strong className="text-yellow-300 font-mono text-sm">2,840 pts</strong></span>
              <button 
                onClick={() => showToast('已前往积分商城兑换实训算力包')}
                className="text-xs text-cyan-300 hover:text-cyan-200 font-bold flex items-center gap-0.5 cursor-pointer"
              >
                兑换权益 <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 4D Skill Competency Progress Bars */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-neutral-900 text-sm flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#3b82f6]" />
                  核心实训素养评估
                </h3>
                <span className="text-[11px] text-neutral-400">综合能力评级: <strong>A+</strong></span>
              </div>
              <p className="text-[11px] text-neutral-500">基于多轮实训沙箱、代码工程与在线考核智能量化</p>
            </div>

            <div className="space-y-3">
              {[
                { label: '大模型与微调开发', score: 95, color: 'bg-[#3b82f6]', tag: '拔尖' },
                { label: '算法设计与代码实战', score: 92, color: 'bg-emerald-500', tag: '精通' },
                { label: '云原生架构与部署', score: 88, color: 'bg-indigo-500', tag: '良好' },
                { label: '团队协同与同行评审', score: 85, color: 'bg-purple-500', tag: '良好' }
              ].map((skill, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-700 font-medium">{skill.label}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-neutral-400 font-mono">得分: {skill.score}</span>
                      <span className="px-1.5 py-0.2 bg-blue-50 text-blue-700 rounded text-[10px] font-bold">{skill.tag}</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all duration-500", skill.color)} style={{ width: `${skill.score}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-neutral-400 flex items-center justify-between border-t border-neutral-100">
              <span>数据来源: 玄武AI学情诊断模型</span>
              <span className="text-[#3b82f6] font-bold">查看完整画像 →</span>
            </div>
          </div>

          {/* Growth Daily Acceleration Tasks */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-neutral-900 text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  成长加速任务
                </h3>
                <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
                  今日可得 +65 EXP
                </span>
              </div>
              <p className="text-[11px] text-neutral-500">完成日常实训打卡与学习任务，快速冲刺下一等级</p>
            </div>

            <div className="space-y-2.5">
              {[
                { title: '每日登录与实验签到', exp: 15, pts: 10, status: 'done', desc: '已连续打卡 12 天' },
                { title: '完成章节微课视频 (3/5)', exp: 20, pts: 15, status: 'doing', desc: '观看时长已达标' },
                { title: '完成课程阶段测试', exp: 30, pts: 25, status: 'todo', desc: '通过即可获得大量经验' }
              ].map((task, tIdx) => (
                <div key={tIdx} className="p-2.5 rounded-xl border border-neutral-100 bg-neutral-50/70 flex items-center justify-between gap-3 hover:bg-neutral-50 transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800">
                      <span>{task.title}</span>
                      <span className="text-[10px] font-mono text-amber-600">+{task.exp}EXP</span>
                    </div>
                    <div className="text-[10px] text-neutral-400">{task.desc}</div>
                  </div>

                  {task.status === 'done' ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 shrink-0">
                      <CheckCircle2 className="w-4 h-4" /> 已完成
                    </span>
                  ) : task.status === 'doing' ? (
                    <button 
                      onClick={() => showToast('正在继续完成视频学习任务')}
                      className="px-2.5 py-1 bg-blue-50 text-[#3b82f6] border border-blue-200 rounded-lg text-xs font-bold shrink-0 hover:bg-blue-100 transition-colors"
                    >
                      去学习
                    </button>
                  ) : (
                    <button 
                      onClick={() => showToast('正在进入章节测验环节')}
                      className="px-2.5 py-1 bg-[#3b82f6] text-white rounded-lg text-xs font-bold shrink-0 hover:bg-[#2563eb] transition-colors"
                    >
                      去测验
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-neutral-400 flex items-center justify-between border-t border-neutral-100">
              <span>每日 00:00 任务自动刷新</span>
              <span className="text-emerald-600 font-bold">全勤奖励进行中</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. 阶段成果 (Milestones & Stage Achievements) ================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-neutral-900">阶段实训里程碑与通关成果</h2>
          </div>
          <button 
            onClick={() => setActiveTab('certificates')}
            className="text-xs text-[#3b82f6] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
          >
            查看我的全部证书 ({certificatesList.length}) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Milestone Steps progression */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {[
              {
                stage: '阶段一',
                title: 'Python与AI数据科学筑基',
                status: 'completed',
                score: '96分 · 全优通关',
                cert: '已获《Python实战证书》',
                icon: CheckCircle2,
                color: 'text-emerald-600',
                border: 'border-emerald-200 bg-emerald-50/40',
                badgeBg: 'bg-emerald-500'
              },
              {
                stage: '阶段二',
                title: '大模型微调与Prompt工程',
                status: 'completed',
                score: '98分 · 拔尖通关',
                cert: '已获《大模型微调证书》',
                icon: CheckCircle2,
                color: 'text-emerald-600',
                border: 'border-emerald-200 bg-emerald-50/40',
                badgeBg: 'bg-emerald-500'
              },
              {
                stage: '阶段三',
                title: '企业级AI多智能体实战',
                status: 'in-progress',
                score: '进行中 (当前进度 65%)',
                cert: '目标结业考评 ≥90分',
                icon: Clock,
                color: 'text-[#3b82f6]',
                border: 'border-blue-300 bg-blue-50/50 shadow-sm shadow-blue-500/10 ring-2 ring-blue-500/20',
                badgeBg: 'bg-[#3b82f6]'
              },
              {
                stage: '阶段四',
                title: '云原生高可用架构部署',
                status: 'locked',
                score: '待解锁',
                cert: '需完成阶段三综合考核',
                icon: ShieldCheck,
                color: 'text-neutral-400',
                border: 'border-neutral-200 bg-neutral-50/40 opacity-70',
                badgeBg: 'bg-neutral-300'
              }
            ].map((milestone, mIdx) => (
              <div
                key={mIdx}
                className={cn("p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all relative", milestone.border)}
              >
                <div className="flex items-center justify-between">
                  <span className={cn("text-[11px] font-black text-white px-2 py-0.5 rounded", milestone.badgeBg)}>
                    {milestone.stage}
                  </span>
                  <milestone.icon className={cn("w-4 h-4", milestone.color)} />
                </div>

                <div className="space-y-1">
                  <h4 className="font-extrabold text-neutral-900 text-sm leading-snug">{milestone.title}</h4>
                  <div className="text-xs font-bold text-neutral-700 mt-1">{milestone.score}</div>
                  <div className="text-[11px] text-neutral-500 leading-tight">{milestone.cert}</div>
                </div>

                {milestone.status === 'completed' && (
                  <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-[10px] font-bold text-emerald-700">
                    <span>100% 达成</span>
                    <span>已上链认证</span>
                  </div>
                )}
                {milestone.status === 'in-progress' && (
                  <div className="pt-2 border-t border-blue-200 flex items-center justify-between text-[10px] font-bold text-[#3b82f6]">
                    <span>正在进行中</span>
                    <span className="animate-pulse">实时追踪中...</span>
                  </div>
                )}
                {milestone.status === 'locked' && (
                  <div className="pt-2 border-t border-neutral-200 text-[10px] text-neutral-400">
                    完成前序课程后自动开启
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Badges Gallery Quick View */}
          <div className="pt-4 border-t border-neutral-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Medal className="w-4 h-4 text-amber-500" />
              <span className="font-bold text-xs text-neutral-800">阶段解锁荣誉成就勋章 (4枚):</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {[
                { name: '考霸宗师', icon: '🏆', rarity: '史诗', color: 'from-purple-500 to-pink-500' },
                { name: '全勤先锋官', icon: '⚡', rarity: '稀有', color: 'from-amber-400 to-orange-500' },
                { name: '大模型极客', icon: '🧠', rarity: '史诗', color: 'from-blue-600 to-indigo-600' },
                { name: '敏而好学', icon: '📖', rarity: '普通', color: 'from-emerald-400 to-teal-500' }
              ].map((badge, bIdx) => (
                <div
                  key={bIdx}
                  className="flex items-center gap-2 px-3 py-1.5 bg-neutral-50 rounded-xl border border-neutral-200 hover:border-neutral-300 transition-colors shadow-sm"
                  title={`${badge.name} (${badge.rarity})`}
                >
                  <div className={cn("w-6 h-6 rounded-full bg-gradient-to-tr text-white flex items-center justify-center text-xs shadow-sm", badge.color)}>
                    {badge.icon}
                  </div>
                  <span className="text-xs font-bold text-neutral-800">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. 我的工作台 ================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between mt-8">
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-indigo-500" />
            我的工作台
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-neutral-200 rounded-2xl shadow-sm flex flex-col h-[400px] bg-white">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between shrink-0">
              <span className="text-base font-bold text-neutral-900">项目 (2)</span>
            </div>
            <div className="p-4 flex-1 overflow-y-auto space-y-4 custom-scrollbar">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4 p-4 border border-neutral-100 rounded-xl hover:border-indigo-200 transition-colors bg-neutral-50/50">
                  <div className="w-16 h-16 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-center shrink-0">
                    <FolderKanban className="w-6 h-6 text-indigo-300" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2">
                    <div>
                      <h4 className="font-bold text-neutral-900 truncate text-[14px]">电商用户行为预测</h4>
                      <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">使用深度学习模型预测用户购买转化率的实战开发项目。</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-white border border-neutral-200 text-neutral-500 text-[10px] rounded-md">分类模型</span>
                      <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">开始开发</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-neutral-200 rounded-2xl shadow-sm flex flex-col h-[400px] bg-white">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between shrink-0">
              <span className="text-base font-bold text-neutral-900">数据集 (3)</span>
            </div>
            <div className="p-4 flex-1 overflow-y-auto space-y-4 custom-scrollbar">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 p-4 border border-neutral-100 rounded-xl hover:border-blue-200 transition-colors bg-neutral-50/50">
                  <div className="w-16 h-16 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-center shrink-0">
                    <Database className="w-6 h-6 text-blue-300" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2">
                    <div>
                      <h4 className="font-bold text-neutral-900 truncate text-[14px]">淘宝用户行为日志 2025</h4>
                      <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">包含数百万用户浏览、加购、购买数据的结构化特征表。</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-neutral-400">更新于昨天</span>
                      <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">查看详情</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderDurationTab = () => {
    const weekData = [
      { name: '05-01', hours: 2.5 },
      { name: '05-02', hours: 4.0 },
      { name: '05-03', hours: 3.2 },
      { name: '05-04', hours: 5.1 },
      { name: '05-05', hours: 2.8 },
      { name: '05-06', hours: 4.5 },
      { name: '05-07', hours: 3.5 },
    ];

    const calendarDays = [];
    for (let i = 0; i < 5; i++) calendarDays.push(null);
    for (let i = 1; i <= 31; i++) {
      let status = 'future';
      if (i < 10) status = 'missed';
      if (i === 11 || i === 12) status = 'makeup';
      if (i >= 13 && i <= 31) status = 'done';
      if (i === 13) status = 'today-done';
      if (i === 14) status = 'tomorrow';
      calendarDays.push({ date: i, status });
    }

    return (
      <div className="flex gap-6 h-full animation-fade-in items-start overflow-hidden">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2 h-full pb-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-4 gap-4 shrink-0">
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm hover:border-blue-200 transition-colors">
              <div className="text-[13px] font-bold text-neutral-500 mb-2 flex items-center justify-between">
                今日学习 <Clock className="w-4 h-4 text-orange-400" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-neutral-900 tracking-tight">2.5</span>
                <span className="text-xs text-neutral-500 font-medium">小时</span>
              </div>
            </div>
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm hover:border-blue-200 transition-colors">
              <div className="text-[13px] font-bold text-neutral-500 mb-2 flex items-center justify-between">
                本周学习 <CalendarIcon className="w-4 h-4 text-orange-400" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-neutral-900 tracking-tight">12.8</span>
                <span className="text-xs text-neutral-500 font-medium">小时</span>
              </div>
            </div>
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm hover:border-blue-200 transition-colors">
              <div className="text-[13px] font-bold text-neutral-500 mb-2 flex items-center justify-between">
                本月学习 <TrendingUp className="w-4 h-4 text-orange-400" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-neutral-900 tracking-tight">45.2</span>
                <span className="text-xs text-neutral-500 font-medium">小时</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#3b82f6] to-[#60a5fa] rounded-2xl p-5 shadow-md shadow-blue-500/20 text-white relative overflow-hidden group">
              <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                <Clock className="w-24 h-24 -mr-4 -mb-4" />
              </div>
              <div className="text-[13px] font-bold text-orange-100 mb-2 relative z-10 flex items-center justify-between">
                累计学习时长
              </div>
              <div className="flex items-baseline gap-1 relative z-10 mt-1">
                <span className="text-3xl font-black tracking-tight">328</span>
                <span className="text-xs text-orange-100 font-medium">小时</span>
              </div>
            </div>
          </div>

          {/* Trend Chart */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm shrink-0 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-neutral-900">学习趋势</h3>
              <div className="flex bg-neutral-100 p-1 rounded-lg">
                <button 
                  onClick={() => setTrendRange('week')}
                  className={cn("px-4 py-1.5 text-[13px] font-bold rounded-md transition-all", trendRange === 'week' ? "bg-white text-[#3b82f6] shadow-sm" : "text-neutral-500 hover:text-neutral-700")}
                >
                  近一周
                </button>
                <button 
                  onClick={() => setTrendRange('month')}
                  className={cn("px-4 py-1.5 text-[13px] font-bold rounded-md transition-all", trendRange === 'month' ? "bg-white text-[#3b82f6] shadow-sm" : "text-neutral-500 hover:text-neutral-700")}
                >
                  近一月
                </button>
              </div>
            </div>
            
            <div className="h-[280px] w-full">
              {trendRange === 'week' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weekData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                    <RechartsTooltip 
                      cursor={{ fill: '#eff6ff' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '13px', fontWeight: 'bold' }}
                      itemStyle={{ color: '#3b82f6' }}
                    />
                    <Bar dataKey="hours" name="学习时长(小时)" radius={[6, 6, 0, 0]} maxBarSize={40}>
                      {weekData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === weekData.length - 1 ? '#3b82f6' : '#ffc0a9'} className="transition-all duration-300 hover:opacity-80" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} dy={10} minTickGap={20} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                    <RechartsTooltip 
                      cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '13px', fontWeight: 'bold' }}
                      itemStyle={{ color: '#3b82f6' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="hours" 
                      name="学习时长(小时)" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Reminders & Streak - Rich Glassmorphism Design */}
          <div className="grid grid-cols-2 gap-4 shrink-0">
            <div className="relative overflow-hidden rounded-2xl p-6 shadow-sm border border-orange-100/60 bg-gradient-to-br from-white/90 to-orange-50/50 backdrop-blur-xl flex items-center gap-6 hover:shadow-md transition-all group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-orange-300/30 to-transparent rounded-full blur-2xl"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-white rounded-2xl flex items-center justify-center shrink-0 shadow-inner border border-white relative z-10">
                <Target className="w-8 h-8 text-[#3b82f6]" />
              </div>
              <div className="flex-1 relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[16px] font-extrabold text-neutral-800 tracking-wide">每日学习目标</h4>
                  <div className="flex items-baseline gap-1 bg-white/60 px-2 py-1 rounded-lg border border-white shadow-sm">
                    <span className="text-[14px] font-black text-[#3b82f6]">2.5</span>
                    <span className="text-[12px] text-neutral-500 font-bold">/ 3.0h</span>
                  </div>
                </div>
                <div className="w-full bg-blue-100/50 rounded-full h-2.5 mb-2.5 shadow-inner overflow-hidden border border-blue-200/30">
                  <div className="bg-gradient-to-r from-blue-400 to-[#3b82f6] h-full rounded-full transition-all duration-1000 relative" style={{ width: '83%' }}>
                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                  </div>
                </div>
                <span className="text-[11px] text-orange-600 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> 还差半小时，继续加油！
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl p-6 shadow-sm border border-red-100/60 bg-gradient-to-br from-white/90 to-red-50/50 backdrop-blur-xl flex items-center gap-6 hover:shadow-md transition-all group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-red-300/30 to-transparent rounded-full blur-2xl"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-white rounded-2xl flex items-center justify-center shrink-0 shadow-inner border border-white relative z-10">
                <Flame className="w-8 h-8 text-red-500" />
              </div>
              <div className="flex-1 relative z-10">
                <h4 className="text-[16px] font-extrabold text-neutral-800 mb-1 tracking-wide">连续学习打卡</h4>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-blue-600 leading-none drop-shadow-sm">12</span>
                  <span className="text-sm text-red-800/60 font-bold mb-1">天</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/50 w-max px-2.5 py-1.5 rounded-md border border-white shadow-sm">
                  <TrendingUp className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-[11px] text-red-600 font-bold">超过了 85% 的同学，保持势头！</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Calendar */}
        <div className="w-[340px] shrink-0 bg-white rounded-2xl shadow-sm border border-neutral-200 h-full flex flex-col overflow-hidden">
          <div className="bg-gradient-to-br from-orange-50/60 to-white p-5 flex flex-col items-center flex-1 overflow-y-auto custom-scrollbar">
            <div className="w-full flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#3b82f6]">
                  <CalendarIcon className="w-4 h-4" />
                </div>
                <span className="font-bold text-[17px] text-neutral-900 tracking-wide">打卡日历</span>
              </div>
              <div className="flex items-center bg-[#3b82f6] text-white rounded-full px-1.5 py-1.5 shadow-md shadow-blue-500/20">
                <button className="p-0.5 hover:bg-white/20 rounded-full transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                <span className="text-[12px] font-bold px-2 tracking-wider">2026年05月</span>
                <button className="p-0.5 hover:bg-white/20 rounded-full transition-colors"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="w-full grid grid-cols-7 gap-y-5 gap-x-2 text-center pb-4">
              {['日', '一', '二', '三', '四', '五', '六'].map(d => (
                <div key={d} className="text-[12px] font-bold text-neutral-500 mb-2">{d}</div>
              ))}
              
              {calendarDays.map((day, i) => {
                if (!day) return <div key={`empty-${i}`} />;
                
                return (
                  <div key={i} className="flex flex-col items-center gap-2">
                    {day.status === 'done' || day.status === 'today-done' || day.status === 'tomorrow' ? (
                      <div className={cn(
                        "w-9 h-9 rounded-[10px] flex flex-col items-center justify-center relative cursor-pointer hover:scale-105 transition-transform",
                        day.status === 'today-done' 
                          ? "bg-white border-2 border-[#3b82f6] shadow-sm" 
                          : "bg-[#fff8eb] border border-[#ffe0ad]"
                      )}>
                        <span className="text-[10px] font-black text-orange-500 leading-none mt-1">+3</span>
                        <div className="w-[14px] h-[14px] rounded-full bg-[#ffd43b] flex items-center justify-center mt-0.5 shadow-sm">
                          <div className="w-2 h-2 rounded-full border-[1.5px] border-orange-500/80"></div>
                        </div>
                      </div>
                    ) : day.status === 'missed' ? (
                      <div className="w-9 h-9 rounded-[10px] flex flex-col items-center justify-center bg-[#f4f5f7] border border-neutral-200 cursor-pointer hover:bg-neutral-200 transition-colors">
                        <span className="text-[9px] text-neutral-400 font-bold scale-90">未打卡</span>
                      </div>
                    ) : day.status === 'makeup' ? (
                      <div className="w-9 h-9 rounded-[10px] flex flex-col items-center justify-center bg-blue-50 border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors">
                        <span className="text-[9px] text-[#3b82f6] font-bold scale-90">补卡</span>
                      </div>
                    ) : null}
                    
                    <span className={cn(
                      "text-[10px] font-bold",
                      day.status === 'today-done' ? "text-[#3b82f6]" : "text-neutral-400"
                    )}>
                      {day.status === 'today-done' ? '今天' : day.status === 'tomorrow' ? '明天' : day.date}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAIPathTab = () => {
    const paths = [
      { id: 1, title: 'AI数据分析师成长路线', progress: 45, currentCourse: 'Pandas进阶数据清洗', totalCourses: 12, completedCourses: 5 },
      { id: 2, title: '大语言模型微调实战', progress: 80, currentCourse: 'RLHF原理与实践', totalCourses: 8, completedCourses: 6 },
      { id: 3, title: '计算机视觉工程师', progress: 15, currentCourse: 'CNN网络结构解析', totalCourses: 15, completedCourses: 2 },
    ];

    return (
      <div className="space-y-6 animation-fade-in">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-neutral-900">AI学习路径记录</h2>
          <button className="text-sm text-neutral-400 hover:text-red-500 flex items-center transition-colors">
            <Trash2 className="w-4 h-4 mr-1" /> 清除历史记录
          </button>
        </div>

        <div className="grid gap-4">
          {paths.map(path => (
            <div key={path.id} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:border-blue-200 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4 flex-1 w-full">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-orange-100">
                  <Bot className="w-7 h-7 text-[#3b82f6]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-[16px] font-bold text-neutral-900">{path.title}</h3>
                    <span className="px-2 py-0.5 bg-neutral-100 text-neutral-500 text-[11px] rounded-md font-medium">
                      {path.completedCourses} / {path.totalCourses} 课程
                    </span>
                  </div>
                  <p className="text-[13px] text-neutral-500 mb-3">当前学习: <span className="text-neutral-700 font-medium">{path.currentCourse}</span></p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-400 to-[#3b82f6] rounded-full" style={{ width: `${path.progress}%` }} />
                    </div>
                    <span className="text-[13px] font-bold text-[#3b82f6] w-10">{path.progress}%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                <button className="flex-1 md:flex-none bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-600 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
                  查看详情
                </button>
                <button className="flex-1 md:flex-none bg-[#3b82f6] hover:bg-[#2563eb] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5">
                  <Play className="w-4 h-4 fill-white" /> 继续学习
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderScoresTab = () => {
    const mockExams = [
      { name: 'Python高级数据处理与可视化期末考', time: '2026-05-04 10:00', score: 95 },
      { name: '电商用户行为预测实战考评', time: '2026-04-28 14:00', score: 88 },
      { name: '机器学习基础期中测试', time: '2026-04-15 09:00', score: 55 },
    ];

    const mockHomeworks = [
      { name: 'Pandas高级清洗与过滤作业', time: '2026-05-05 18:20', score: 92, status: '合格', feedback: '数据清洗逻辑非常清晰，Lambda 函数应用得很好！', canRedo: false },
      { name: 'Matplotlib 数据流可视化设计', time: '2026-05-02 14:30', score: 45, status: '打回重做', feedback: '图表未添加图例且X轴标签重叠。作业不合格，已被打回，请按要求修改后重做。', canRedo: true },
      { name: '基础线性回归模型搭建', time: '2026-04-20 11:15', score: 80, status: '合格', feedback: '基础指标计算正确，Loss 收敛正常。', canRedo: false },
      { name: '神经网络前向传播手写实现', time: '2026-05-06 09:40', score: null, status: '待批改', feedback: '暂无评语，请等待老师批阅。', canRedo: false }
    ];

    return (
      <div className="space-y-6 animation-fade-in text-left">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#3b82f6]" />
            学习成绩与作业看板
          </h2>
        </div>

        {/* Optimized Sub Tabs Switcher with Bottom Underline styling */}
        <div className="border-b border-neutral-200 flex gap-6 select-none mb-6">
          {[
            { key: 'exam', name: '考试成绩' },
            { key: 'homework', name: '作业成绩' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setScoresSubTab(tab.key as any)}
              className={cn(
                "pb-2.5 text-[14px] font-bold transition-all relative whitespace-nowrap cursor-pointer -mb-[1px] border-b-2 bg-transparent border-t-0 border-x-0 outline-none",
                scoresSubTab === tab.key 
                  ? "text-[#3b82f6] border-[#3b82f6]" 
                  : "text-neutral-500 hover:text-[#3b82f6] border-transparent"
              )}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {scoresSubTab === 'exam' ? (
          <div className="border border-neutral-200 rounded-[12px] overflow-hidden bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs select-none">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold text-[13px]">
                  <th className="p-4 w-2/5">考试名称</th>
                  <th className="p-4 w-1/4">考试时间</th>
                  <th className="p-4 w-1/5 text-center">考卷得分</th>
                  <th className="p-4 text-center w-3/20">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-[13px] text-neutral-700">
                {mockExams.map((exam, index) => (
                  <tr key={index} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="p-4 font-bold text-neutral-900">{exam.name}</td>
                    <td className="p-4 text-neutral-500 font-mono">{exam.time}</td>
                    <td className={cn(
                      "p-4 text-center font-extrabold font-mono text-[15px]",
                      exam.score >= 60 ? "text-[#3b82f6]" : "text-red-500"
                    )}>
                      {exam.score} 分
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => {
                          setSelectedExamForResult({
                            title: exam.name,
                            score: exam.score,
                            startTime: exam.time,
                            attempts: 1
                          });
                          setIsViewingExamResult(true);
                        }}
                        className="text-[#3b82f6] hover:text-[#2563eb] hover:underline font-bold cursor-pointer bg-transparent border-0"
                      >
                        预览
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="border border-neutral-200 rounded-[12px] overflow-hidden bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs select-none">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold text-[13px]">
                  <th className="p-4 w-1/4">作业名称</th>
                  <th className="p-4 w-[15%]">提交时间</th>
                  <th className="p-4 w-[10%] text-center">批阅得分</th>
                  <th className="p-4 w-[15%] text-center">作业状态</th>
                  <th className="p-4 w-1/4">老师评语</th>
                  <th className="p-4 text-center w-[10%]">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-[13px] text-neutral-700">
                {mockHomeworks.map((hw, index) => (
                  <tr key={index} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="p-4 font-bold text-neutral-900">{hw.name}</td>
                    <td className="p-4 text-neutral-500 font-mono">{hw.time}</td>
                    <td className="p-4 text-center font-extrabold font-mono text-[14px]">
                      {hw.score !== null ? (
                        <span className={hw.score >= 60 ? "text-[#3b82f6]" : "text-red-500"}>
                          {hw.score} <span className="text-[11px] font-normal text-neutral-400">分</span>
                        </span>
                      ) : (
                        <span className="text-neutral-400 font-normal">--</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {hw.status === '合格' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold inline-block border text-emerald-600 bg-emerald-50 border-emerald-100">
                          合格
                        </span>
                      )}
                      {hw.status === '待批改' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold inline-block border text-neutral-500 bg-neutral-50 border-neutral-200">
                          待批改
                        </span>
                      )}
                      {hw.status === '打回重做' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold inline-block border text-red-600 bg-red-50 border-red-200">
                          打回重做
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-neutral-500 leading-relaxed text-[12px]">
                      {hw.feedback}
                    </td>
                    <td className="p-4 text-center">
                      {hw.canRedo ? (
                        <button
                          onClick={() => showToast('正在进入作业重做环境，请按要求提交作业')}
                          className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer border-0"
                        >
                          去重做
                        </button>
                      ) : hw.score !== null ? (
                        <button 
                          onClick={() => {
                            setSelectedExamForResult({
                              title: hw.name,
                              score: hw.score,
                              startTime: hw.time,
                              attempts: 1
                            });
                            setIsViewingExamResult(true);
                          }}
                          className="text-[#3b82f6] hover:text-[#2563eb] hover:underline font-semibold cursor-pointer bg-transparent border-0"
                        >
                          预览
                        </button>
                      ) : (
                        <span className="text-neutral-300">--</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const renderCertificatesTab = () => {
    const filteredCertificates = certificatesList.filter(cert => {
      if (certFilter !== 'all' && cert.category !== certFilter) return false;
      if (certSearch.trim()) {
        const kw = certSearch.toLowerCase();
        return cert.name.toLowerCase().includes(kw) || cert.certNo.toLowerCase().includes(kw);
      }
      return true;
    });

    return (
      <div className="space-y-6 animation-fade-in">
        {/* Top Summary Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold backdrop-blur-sm">
                <Trophy className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                个人数字化专业技能荣誉档案
              </div>
              <h2 className="text-2xl font-black tracking-tight">我的结业与技能认证证书</h2>
              <p className="text-white/80 text-xs max-w-xl">
                已通过理论考评、沙箱工程实操与阶段综合考核，所有证书具备全网唯一防伪认证编号，支持在线查验与高清 PDF 下载。
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/15 text-center">
                <div className="text-[11px] text-white/70">已获得证书</div>
                <div className="text-2xl font-black text-yellow-200 mt-0.5">{certificatesList.length} <span className="text-xs font-normal text-white/70">本</span></div>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/15 text-center">
                <div className="text-[11px] text-white/70">优秀结业评级</div>
                <div className="text-2xl font-black text-emerald-200 mt-0.5">3 <span className="text-xs font-normal text-white/70">本</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm text-xs">
          <div className="relative min-w-[260px] flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <Input
              value={certSearch}
              onChange={e => setCertSearch(e.target.value)}
              placeholder="搜索获得的证书名称、认证编号..."
              className="pl-9 h-9 text-xs rounded-xl bg-neutral-50 border-neutral-200"
            />
          </div>

          <div className="flex items-center gap-1.5">
            {['all', '大模型AI', '云计算', '数据智能'].map(cat => (
              <button
                key={cat}
                onClick={() => setCertFilter(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-lg font-bold transition-colors",
                  certFilter === cat
                    ? "bg-blue-50 text-[#2563eb] border border-blue-200"
                    : "text-neutral-600 hover:bg-neutral-100 border border-transparent"
                )}
              >
                {cat === 'all' ? '全部证书' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCertificates.map(cert => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Header Decorative Banner */}
              <div className={cn("p-5 text-white bg-gradient-to-r relative overflow-hidden", cert.bgGradient)}>
                <div className="absolute -right-4 -bottom-6 opacity-15 pointer-events-none">
                  <Trophy className="w-28 h-28 text-white" />
                </div>
                
                <div className="flex items-center justify-between gap-2 relative z-10">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/20 border border-white/25 backdrop-blur-sm">
                    {cert.category}
                  </span>
                  <span className="text-xs font-bold text-yellow-300 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> 官方防伪认证
                  </span>
                </div>

                <div className="mt-3 relative z-10">
                  <div className="text-[11px] text-white/70 uppercase tracking-widest font-mono">CERTIFICATE OF COMPLETION</div>
                  {/* Prominent Certificate Name */}
                  <h3 className="text-lg font-extrabold text-white mt-1 group-hover:text-yellow-100 transition-colors drop-shadow-sm">
                    {cert.name}
                  </h3>
                </div>
              </div>

              {/* Body Info */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between text-xs">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                    <div>
                      <span className="text-[11px] text-neutral-400 block">综合考评成绩</span>
                      <strong className="text-sm font-black text-blue-600 font-mono">{cert.score} 分</strong>
                      <span className="text-[10px] text-neutral-500 ml-1">({cert.level.split(' ')[0]})</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-neutral-400 block">获得时间</span>
                      <strong className="text-xs font-bold text-neutral-700 font-mono">{cert.issueDate}</strong>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[11px] text-neutral-400">认证与颁发机构:</div>
                    <div className="text-neutral-800 font-medium text-xs">{cert.issuer}</div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[11px] text-neutral-400">掌握核心技术栈:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 bg-blue-50/80 text-blue-700 border border-blue-100 rounded text-[11px] font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                  <div className="text-[10px] text-neutral-400 font-mono truncate max-w-[140px]" title={cert.certNo}>
                    NO: {cert.certNo}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewCert(cert)}
                      className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold rounded-lg text-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> 预览证书
                    </button>
                    <button
                      onClick={() => showToast(`已启动【${cert.name}】高清防伪 PDF 下载`)}
                      className="px-3.5 py-1.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1 shadow-sm shadow-blue-500/20 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> 下载证书
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full bg-white overflow-hidden shadow-sm font-sans relative">
      {/* Left Sidebar */}
      <div className="w-[200px] border-r border-neutral-200 flex-shrink-0 flex flex-col bg-white">
        <div className="p-5 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900">学习中心</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('learning')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-[14px] font-medium transition-colors text-left",
              activeTab === 'learning' 
                ? "bg-[#eff6ff] text-[#3b82f6]" 
                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
            )}
          >
            <BookOpen className="w-5 h-5" />
            我的学习
          </button>
          
          <button 
            onClick={() => setActiveTab('duration')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-[14px] font-medium transition-colors text-left",
              activeTab === 'duration' 
                ? "bg-[#eff6ff] text-[#3b82f6]" 
                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
            )}
          >
            <Clock className="w-5 h-5" />
            学习时长
          </button>

          <button 
            onClick={() => setActiveTab('ai-path')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-[14px] font-medium transition-colors text-left",
              activeTab === 'ai-path' 
                ? "bg-[#eff6ff] text-[#3b82f6]" 
                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
            )}
          >
            <Bot className="w-5 h-5" />
            AI学习路径记录
          </button>

          <button 
            onClick={() => setActiveTab('scores')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-[14px] font-medium transition-colors text-left",
              activeTab === 'scores' 
                ? "bg-[#eff6ff] text-[#3b82f6]" 
                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
            )}
          >
            <Award className="w-5 h-5" />
            查看成绩
          </button>

          <button 
            onClick={() => setActiveTab('certificates')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-[14px] font-medium transition-colors text-left",
              activeTab === 'certificates' 
                ? "bg-[#eff6ff] text-[#3b82f6]" 
                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
            )}
          >
            <Trophy className="w-5 h-5" />
            我的证书
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-[#f5f6f8] p-6">
        <div className="flex items-center text-sm text-neutral-500 mb-6 shrink-0">
          <Link to="/user" className="hover:text-[#3b82f6] transition-colors">首页</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-neutral-900 font-bold">
            {activeTab === 'scores' 
              ? '查看成绩' 
              : activeTab === 'certificates' 
              ? '我的证书' 
              : activeTab === 'duration' 
              ? '学习时长' 
              : activeTab === 'ai-path' 
              ? 'AI学习路径记录' 
              : '我的学习'}
          </span>
        </div>
        
        {activeTab === 'learning' && renderLearningTab()}
        {activeTab === 'duration' && renderDurationTab()}
        {activeTab === 'ai-path' && renderAIPathTab()}
        {activeTab === 'scores' && renderScoresTab()}
        {activeTab === 'certificates' && renderCertificatesTab()}
      </div>

      {/* Certificate Preview Modal */}
      {previewCert && (
        <div className="fixed inset-0 z-[400] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-[700px] rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 animate-in zoom-in-95">
            {/* Modal Top Bar */}
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-sm text-neutral-800">官方结业证书在线预览</span>
              </div>
              <button 
                onClick={() => setPreviewCert(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Frame Render */}
            <div className="p-8 bg-[#fdfbf7] relative">
              <div className="border-4 border-double border-amber-600/60 rounded-xl p-8 bg-white shadow-inner relative text-center space-y-6 overflow-hidden">
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                  <Trophy className="w-80 h-80 text-amber-900" />
                </div>

                <div className="space-y-1">
                  <div className="text-amber-800 text-xs font-bold tracking-[0.3em] uppercase">
                    XUANWU DIGITAL TALENT CERTIFICATION
                  </div>
                  <h2 className="text-2xl font-serif font-black text-amber-950 tracking-wider">
                    结 业 认 证 证 书
                  </h2>
                  <div className="text-[11px] text-amber-700 font-serif italic">
                    Certificate of Course Completion
                  </div>
                </div>

                <div className="py-2 text-neutral-700 text-sm leading-relaxed space-y-3">
                  <p>
                    兹证明学员 <strong className="text-lg text-neutral-950 font-bold border-b-2 border-amber-600 px-2 pb-0.5">李明同学</strong> （学号：2026900101）
                  </p>
                  <p className="text-xs text-neutral-600 max-w-lg mx-auto leading-relaxed">
                    已顺利修完并全优通过以下实训课程体系的理论考评、动手实践与综合实训项目考核，成绩合格，特发此证。
                  </p>
                  
                  {/* Prominent Certificate Name inside Certificate */}
                  <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl max-w-md mx-auto">
                    <div className="text-xs text-amber-800/80 font-medium">所获荣誉证书名称</div>
                    <div className="text-base font-black text-amber-950 mt-0.5">{previewCert.name}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-amber-100 text-left">
                  <div className="space-y-1">
                    <div className="text-neutral-500">综合考评成绩: <strong className="text-neutral-900 font-mono">{previewCert.score} 分 ({previewCert.level.split(' ')[0]})</strong></div>
                    <div className="text-neutral-500">证书编号: <span className="font-mono text-neutral-700">{previewCert.certNo}</span></div>
                    <div className="text-neutral-500">颁发日期: <span className="font-mono text-neutral-700">{previewCert.issueDate}</span></div>
                  </div>

                  <div className="flex flex-col items-end justify-center relative">
                    {/* Stamp */}
                    <div className="w-24 h-24 rounded-full border-2 border-red-600 text-red-600 flex flex-col items-center justify-center rotate-[-12deg] opacity-85 select-none shadow-sm">
                      <div className="text-[9px] font-bold">玄武实训认证</div>
                      <div className="text-[12px] font-black my-0.5">★ 专用章 ★</div>
                      <div className="text-[8px] font-mono">2026.05.20</div>
                    </div>
                    <div className="text-[10px] text-neutral-400 mt-1">{previewCert.issuer}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 border-t border-neutral-100 flex items-center justify-between bg-neutral-50">
              <div className="text-xs text-neutral-500 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                国家信创人才实训体系官方防伪数据已上链
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    showToast('正在调起浏览器打印组件...');
                    window.print();
                  }}
                  className="px-4 py-2 bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> 打印
                </button>
                <button
                  onClick={() => {
                    showToast(`已开始下载【${previewCert.name}】PDF 证书`);
                    setPreviewCert(null);
                  }}
                  className="px-5 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-sm shadow-blue-500/20 cursor-pointer"
                >
                  <Download className="w-4 h-4" /> 下载高清 PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast alert notification */}
      {toastMsg && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[500] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white px-6 py-3 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-neutral-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#3b82f6] shrink-0" />
            <span className="text-sm font-bold text-neutral-800">{toastMsg}</span>
          </div>
        </div>
      )}
    </div>
  );
}

