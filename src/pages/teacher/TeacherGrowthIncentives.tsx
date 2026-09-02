import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Award,
  Trophy,
  Flame,
  Star,
  CheckCircle2,
  BookOpen,
  FileCheck,
  Send,
  MessageSquare,
  Shield,
  Layers,
  Settings,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Edit3,
  Trash2,
  ChevronRight,
  TrendingUp,
  Crown,
  Medal,
  Zap,
  Users,
  Calendar,
  AlertCircle,
  XCircle,
  HelpCircle,
  Copy,
  ArrowUpRight,
  Gift,
  Check,
  Sliders,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// ==================== Types ====================

export type BehaviorCategory = '签到打卡' | '课程学习' | '考试考核' | '评价互动';

export interface GrowthRule {
  id: string;
  name: string;
  category: BehaviorCategory;
  triggerEvent: string;
  pointsReward: number; // 积分奖励
  growthReward: number; // 成长值奖励
  dailyLimitTimes: number; // 0 表示无限制，>0 表示每日最多触发次数
  cooldownHours: number; // 冷却间隔
  scope: '全平台' | '指定班级' | '指定课程';
  scopeTarget?: string;
  status: '启用' | '禁用';
  updatedAt: string;
  description: string;
}

export interface LevelTier {
  id: string;
  level: number;
  name: string;
  minGrowth: number;
  iconColor: string;
  badgeBg: string;
  privileges: string[];
  studentsCount: number;
}

export interface AchievementBadge {
  id: string;
  title: string;
  category: BehaviorCategory | '综合成就';
  rarity: '普通' | '稀有' | '史诗' | '传说' | '限定';
  icon: string;
  iconBg: string;
  conditionDesc: string;
  growthBonus: number;
  pointsBonus: number;
  unlockedCount: number;
  status: '已上架' | '草稿';
}

export interface StudentPointsLog {
  id: string;
  studentNo: string;
  studentName: string;
  avatarColor: string;
  className: string;
  category: BehaviorCategory | '教师奖惩';
  actionName: string;
  pointsChange: number;
  growthChange: number;
  balanceAfter: number;
  currentLevel: number;
  operator: string;
  timestamp: string;
  remark?: string;
}

// ==================== Initial Mock Data ====================

const INITIAL_RULES: GrowthRule[] = [
  {
    id: 'RUL-001',
    name: '每日登录与实验签到',
    category: '签到打卡',
    triggerEvent: '每日首次进入实训平台或开启沙箱实验',
    pointsReward: 10,
    growthReward: 15,
    dailyLimitTimes: 1,
    cooldownHours: 24,
    scope: '全平台',
    status: '启用',
    updatedAt: '2026-05-20 10:00',
    description: '鼓励学员保持每日学习连续性与习惯养成。'
  },
  {
    id: 'RUL-002',
    name: '连续7天签到周度礼包',
    category: '签到打卡',
    triggerEvent: '连续完成7天签到打卡无中断',
    pointsReward: 50,
    growthReward: 100,
    dailyLimitTimes: 1,
    cooldownHours: 168,
    scope: '全平台',
    status: '启用',
    updatedAt: '2026-05-20 10:00',
    description: '达成连续打卡周期阶梯奖励，额外赠送GPU加速积分。'
  },
  {
    id: 'RUL-003',
    name: '微课视频完整观看',
    category: '课程学习',
    triggerEvent: '课程理论微课视频观看进度达到100%',
    pointsReward: 15,
    growthReward: 20,
    dailyLimitTimes: 5,
    cooldownHours: 0,
    scope: '全平台',
    status: '启用',
    updatedAt: '2026-05-22 14:30',
    description: '学员认真观看课程章节视频，杜绝倍速快进跳过。'
  },
  {
    id: 'RUL-004',
    name: '整门数字化课程通关结课',
    category: '课程学习',
    triggerEvent: '一门精品实训课程所有章节进度全部完成',
    pointsReward: 200,
    growthReward: 500,
    dailyLimitTimes: 0,
    cooldownHours: 0,
    scope: '全平台',
    status: '启用',
    updatedAt: '2026-05-22 15:00',
    description: '完成整门课的学练测全部教学任务。'
  },
  {
    id: 'RUL-005',
    name: '期中/期末考试成绩优秀 (≥90分)',
    category: '考试考核',
    triggerEvent: '在正式理论或在线考试中取得90分及以上',
    pointsReward: 150,
    growthReward: 300,
    dailyLimitTimes: 0,
    cooldownHours: 0,
    scope: '全平台',
    status: '启用',
    updatedAt: '2026-05-23 09:10',
    description: '高分通过阶段性考核，激发拔尖学术竞争力。'
  },
  {
    id: 'RUL-008',
    name: '完成高质量课程评价与反馈',
    category: '评价互动',
    triggerEvent: '对结课课程提交≥50字的真实教学评价与星级打分',
    pointsReward: 20,
    growthReward: 40,
    dailyLimitTimes: 2,
    cooldownHours: 0,
    scope: '全平台',
    status: '启用',
    updatedAt: '2026-05-26 08:30',
    description: '鼓励学员积极提供教学反馈，助力教学质量闭环迭代。'
  }
];

const INITIAL_LEVELS: LevelTier[] = [
  {
    id: 'LV-1',
    level: 1,
    name: '初窥门径 (Novice)',
    minGrowth: 0,
    iconColor: 'text-neutral-500',
    badgeBg: 'bg-gradient-to-r from-neutral-200 to-neutral-300',
    privileges: ['基础云沙箱每月 20h 机时', '通用公共大模型 API 调用', '标准题库练习权限'],
    studentsCount: 142
  },
  {
    id: 'LV-2',
    level: 2,
    name: '潜心研习 (Apprentice)',
    minGrowth: 500,
    iconColor: 'text-emerald-600',
    badgeBg: 'bg-gradient-to-r from-emerald-400 to-teal-500',
    privileges: ['云沙箱提升至每月 40h 机时', 'AI问答助手每日额度 +50%', '专属绿色等级勋章'],
    studentsCount: 88
  },
  {
    id: 'LV-3',
    level: 3,
    name: '融会贯通 (Specialist)',
    minGrowth: 1500,
    iconColor: 'text-blue-600',
    badgeBg: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    privileges: ['云沙箱提升至每月 80h 机时', '解锁 GPU 算力卡时优先排队', '开放进阶实训沙箱模版库'],
    studentsCount: 56
  },
  {
    id: 'LV-4',
    level: 4,
    name: '登堂入室 (Expert)',
    minGrowth: 3500,
    iconColor: 'text-purple-600',
    badgeBg: 'bg-gradient-to-r from-purple-500 to-pink-600',
    privileges: ['云沙箱提升至每月 150h 机时', '专属高性能 A100/H800 微调通道', '尊贵紫色星钻铭牌', '助教答疑绿色通道'],
    studentsCount: 29
  },
  {
    id: 'LV-5',
    level: 5,
    name: '炉火纯青 (Master)',
    minGrowth: 7000,
    iconColor: 'text-amber-500',
    badgeBg: 'bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600',
    privileges: ['无限量云沙箱机时', '作品直接置顶租户最佳实践首页', '专属金色至尊徽章', '校企合作名企提前批直推名额'],
    studentsCount: 12
  },
  {
    id: 'LV-6',
    level: 6,
    name: '大师领航 (Grandmaster)',
    minGrowth: 12000,
    iconColor: 'text-rose-600',
    badgeBg: 'bg-gradient-to-r from-rose-500 via-red-600 to-pink-700',
    privileges: ['终身荣誉导师特权', '租户自定义大模型算力池支配权', '国家级竞赛重点战队保送扶持'],
    studentsCount: 3
  }
];

const INITIAL_BADGES: AchievementBadge[] = [
  {
    id: 'BDG-001',
    title: '全勤先锋官',
    category: '签到打卡',
    rarity: '稀有',
    icon: '⚡',
    iconBg: 'from-amber-400 to-orange-500',
    conditionDesc: '累计完成连续 30 天实训打卡无中断',
    growthBonus: 300,
    pointsBonus: 150,
    unlockedCount: 34,
    status: '已上架'
  },
  {
    id: 'BDG-002',
    title: '大模型极客',
    category: '课程学习',
    rarity: '史诗',
    icon: '🧠',
    iconBg: 'from-blue-600 to-indigo-700',
    conditionDesc: '独立完成全套大模型微调与 RAG 课程体系通关',
    growthBonus: 600,
    pointsBonus: 300,
    unlockedCount: 18,
    status: '已上架'
  },
  {
    id: 'BDG-003',
    title: '考霸宗师',
    category: '考试考核',
    rarity: '史诗',
    icon: '🏆',
    iconBg: 'from-purple-500 to-pink-600',
    conditionDesc: '连续 3 次专业核心考核成绩达到 95 分及以上',
    growthBonus: 800,
    pointsBonus: 400,
    unlockedCount: 9,
    status: '已上架'
  },
  {
    id: 'BDG-004',
    title: '开源领航员',
    category: '综合成就',
    rarity: '传说',
    icon: '👑',
    iconBg: 'from-yellow-400 via-amber-500 to-red-500',
    conditionDesc: '在平台综合技能演练与互评中累计获得好评超过 100 次',
    growthBonus: 1200,
    pointsBonus: 800,
    unlockedCount: 4,
    status: '已上架'
  },
  {
    id: 'BDG-005',
    title: '敏而好学',
    category: '课程学习',
    rarity: '普通',
    icon: '📖',
    iconBg: 'from-emerald-400 to-teal-600',
    conditionDesc: '累计完成 3 门必修数字化实训课程全部通关',
    growthBonus: 200,
    pointsBonus: 100,
    unlockedCount: 92,
    status: '已上架'
  },
  {
    id: 'BDG-006',
    title: '金牌评价官',
    category: '评价互动',
    rarity: '稀有',
    icon: '💬',
    iconBg: 'from-cyan-400 to-blue-500',
    conditionDesc: '累计撰写 10 篇高价值实训课程评测并被教师采纳',
    growthBonus: 250,
    pointsBonus: 120,
    unlockedCount: 26,
    status: '已上架'
  }
];

const INITIAL_STUDENT_LOGS: StudentPointsLog[] = [
  {
    id: 'LOG-001',
    studentNo: '2026900101',
    studentName: '林若曦',
    avatarColor: 'from-pink-500 to-rose-400',
    className: '2026春季大模型1班',
    category: '课程学习',
    actionName: '精品数字化课程全优结课',
    pointsChange: 300,
    growthChange: 600,
    balanceAfter: 2840,
    currentLevel: 5,
    operator: '张老师 (考评确认)',
    timestamp: '2026-05-26 10:30',
    remark: '《基于智谱GLM的多智能体客服实战》结课考评成绩 98 分。'
  },
  {
    id: 'LOG-002',
    studentNo: '2026900102',
    studentName: '周逸轩',
    avatarColor: 'from-blue-600 to-cyan-500',
    className: '2026春季大模型1班',
    category: '考试考核',
    actionName: '期末实操考试成绩满分',
    pointsChange: 150,
    growthChange: 300,
    balanceAfter: 2150,
    currentLevel: 4,
    operator: '系统自动结算',
    timestamp: '2026-05-26 09:15',
    remark: '大模型微调考核总分 100 分。'
  },
  {
    id: 'LOG-003',
    studentNo: '2026900106',
    studentName: '郭雨萌',
    avatarColor: 'from-purple-500 to-pink-500',
    className: '2026春季大模型1班',
    category: '签到打卡',
    actionName: '连续7天签到周度礼包',
    pointsChange: 50,
    growthChange: 100,
    balanceAfter: 1980,
    currentLevel: 4,
    operator: '系统打卡引擎',
    timestamp: '2026-05-25 18:20'
  },
  {
    id: 'LOG-004',
    studentNo: '2026900103',
    studentName: '宋佳明',
    avatarColor: 'from-amber-500 to-yellow-400',
    className: '2026云计算架构二期',
    category: '课程学习',
    actionName: '整门数字化课程通关结课',
    pointsChange: 200,
    growthChange: 500,
    balanceAfter: 1420,
    currentLevel: 3,
    operator: '系统自动结算',
    timestamp: '2026-05-25 14:00',
    remark: '《Kubernetes容器化云架构实战》结课。'
  },
  {
    id: 'LOG-005',
    studentNo: '2026900104',
    studentName: '韩依依',
    avatarColor: 'from-emerald-500 to-teal-400',
    className: '2026春季大模型2班',
    category: '教师奖惩',
    actionName: '教师手动授予积极创新奖励',
    pointsChange: 100,
    growthChange: 200,
    balanceAfter: 980,
    currentLevel: 2,
    operator: '张老师',
    timestamp: '2026-05-24 16:40',
    remark: '在课堂上主动分享Prompt优化案例。'
  }
];

export default function TeacherGrowthIncentives() {
  const [activeTab, setActiveTab] = useState<'rules' | 'levels' | 'badges' | 'records'>('rules');

  // Rules State
  const [rules, setRules] = useState<GrowthRule[]>(INITIAL_RULES);
  const [ruleSearch, setRuleSearch] = useState('');
  const [selectedRuleCategory, setSelectedRuleCategory] = useState<string>('all');
  
  // Levels State
  const [levels, setLevels] = useState<LevelTier[]>(INITIAL_LEVELS);

  // Badges State
  const [badges, setBadges] = useState<AchievementBadge[]>(INITIAL_BADGES);
  const [badgeFilter, setBadgeFilter] = useState<string>('all');

  // Logs State
  const [logs, setLogs] = useState<StudentPointsLog[]>(INITIAL_STUDENT_LOGS);
  const [logSearch, setLogSearch] = useState('');

  // Modals
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<GrowthRule | null>(null);
  const [ruleForm, setRuleForm] = useState<Partial<GrowthRule>>({
    name: '',
    category: '课程学习',
    triggerEvent: '',
    pointsReward: 30,
    growthReward: 50,
    dailyLimitTimes: 1,
    cooldownHours: 0,
    scope: '全平台',
    description: ''
  });

  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
  const [editingLevel, setEditingLevel] = useState<LevelTier | null>(null);
  const [levelForm, setLevelForm] = useState<Partial<LevelTier>>({
    level: 1,
    name: '',
    minGrowth: 0,
    privileges: []
  });
  const [privilegeInput, setPrivilegeInput] = useState('');

  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [editingBadge, setEditingBadge] = useState<AchievementBadge | null>(null);
  const [badgeForm, setBadgeForm] = useState<Partial<AchievementBadge>>({
    title: '',
    category: '综合成就',
    rarity: '稀有',
    icon: '🌟',
    conditionDesc: '',
    growthBonus: 300,
    pointsBonus: 150
  });

  const [isManualRewardOpen, setIsManualRewardOpen] = useState(false);
  const [rewardStudentName, setRewardStudentName] = useState('');
  const [rewardPoints, setRewardPoints] = useState(50);
  const [rewardGrowth, setRewardGrowth] = useState(100);
  const [rewardReason, setRewardReason] = useState('课堂积极表现突出');

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Filtered Rules
  const filteredRules = useMemo(() => {
    return rules.filter(r => {
      if (selectedRuleCategory !== 'all' && r.category !== selectedRuleCategory) return false;
      if (ruleSearch.trim()) {
        const kw = ruleSearch.toLowerCase();
        return r.name.toLowerCase().includes(kw) || r.triggerEvent.toLowerCase().includes(kw);
      }
      return true;
    });
  }, [rules, selectedRuleCategory, ruleSearch]);

  // Filtered Badges
  const filteredBadges = useMemo(() => {
    return badges.filter(b => {
      if (badgeFilter !== 'all' && b.rarity !== badgeFilter) return false;
      return true;
    });
  }, [badges, badgeFilter]);

  // Filtered Logs
  const filteredLogs = useMemo(() => {
    return logs.filter(l => {
      if (logSearch.trim()) {
        const kw = logSearch.toLowerCase();
        return (
          l.studentName.toLowerCase().includes(kw) ||
          l.studentNo.includes(kw) ||
          l.actionName.toLowerCase().includes(kw)
        );
      }
      return true;
    });
  }, [logs, logSearch]);

  // Total summary stats
  const summaryStats = useMemo(() => {
    const totalRules = rules.filter(r => r.status === '启用').length;
    const totalBadges = badges.length;
    const totalStudents = levels.reduce((acc, l) => acc + l.studentsCount, 0);
    const totalPointsDistributed = logs.reduce((acc, l) => acc + l.pointsChange, 0) * 12 + 128500;
    return {
      totalRules,
      totalBadges,
      totalStudents,
      totalPointsDistributed
    };
  }, [rules, badges, levels, logs]);

  // Save Rule
  const handleSaveRule = () => {
    if (!ruleForm.name || !ruleForm.triggerEvent) {
      showToast('请完整填写规则名称与触发行为', 'error');
      return;
    }

    if (editingRule) {
      setRules(prev =>
        prev.map(r =>
          r.id === editingRule.id
            ? {
                ...r,
                ...ruleForm,
                updatedAt: new Date().toLocaleString('zh-CN', { hour12: false })
              } as GrowthRule
            : r
        )
      );
      showToast(`已更新规则【${ruleForm.name}】`);
    } else {
      const newRule: GrowthRule = {
        id: `RUL-${Date.now().toString().slice(-4)}`,
        name: ruleForm.name || '',
        category: (ruleForm.category as BehaviorCategory) || '课程学习',
        triggerEvent: ruleForm.triggerEvent || '',
        pointsReward: Number(ruleForm.pointsReward) || 20,
        growthReward: Number(ruleForm.growthReward) || 30,
        dailyLimitTimes: Number(ruleForm.dailyLimitTimes) || 0,
        cooldownHours: Number(ruleForm.cooldownHours) || 0,
        scope: (ruleForm.scope as any) || '全平台',
        status: '启用',
        updatedAt: new Date().toLocaleString('zh-CN', { hour12: false }),
        description: ruleForm.description || ''
      };
      setRules([newRule, ...rules]);
      showToast(`新建行为激励规则【${newRule.name}】成功！`);
    }
    setIsRuleModalOpen(false);
  };

  // Toggle Rule Status
  const handleToggleRuleStatus = (id: string) => {
    setRules(prev =>
      prev.map(r =>
        r.id === id ? { ...r, status: r.status === '启用' ? '禁用' : '启用' } : r
      )
    );
    showToast('规则启停状态已更新');
  };

  // Save Badge
  const handleSaveBadge = () => {
    if (!badgeForm.title || !badgeForm.conditionDesc) {
      showToast('请完整填写勋章名称与达成条件', 'error');
      return;
    }

    const newBadge: AchievementBadge = {
      id: `BDG-${Date.now().toString().slice(-4)}`,
      title: badgeForm.title || '',
      category: badgeForm.category as any || '综合成就',
      rarity: badgeForm.rarity as any || '稀有',
      icon: badgeForm.icon || '🌟',
      iconBg:
        badgeForm.rarity === '传说'
          ? 'from-amber-400 to-rose-600'
          : badgeForm.rarity === '史诗'
          ? 'from-purple-500 to-indigo-600'
          : 'from-blue-500 to-cyan-500',
      conditionDesc: badgeForm.conditionDesc || '',
      growthBonus: Number(badgeForm.growthBonus) || 300,
      pointsBonus: Number(badgeForm.pointsBonus) || 150,
      unlockedCount: 0,
      status: '已上架'
    };

    setBadges([newBadge, ...badges]);
    showToast(`成功发布新成就勋章【${newBadge.title}】！`);
    setIsBadgeModalOpen(false);
  };

  // Manual Reward
  const handleManualReward = () => {
    if (!rewardStudentName.trim()) {
      showToast('请输入学员姓名或学号', 'error');
      return;
    }

    const newLog: StudentPointsLog = {
      id: `LOG-${Date.now()}`,
      studentNo: '2026900101',
      studentName: rewardStudentName,
      avatarColor: 'from-blue-600 to-cyan-500',
      className: '2026春季大模型1班',
      category: '教师奖惩',
      actionName: '教师手动奖惩调整',
      pointsChange: rewardPoints,
      growthChange: rewardGrowth,
      balanceAfter: 2840 + rewardPoints,
      currentLevel: 5,
      operator: '张老师 (当前登录)',
      timestamp: new Date().toLocaleString('zh-CN', { hour12: false }),
      remark: rewardReason
    };

    setLogs([newLog, ...logs]);
    showToast(`已成功为【${rewardStudentName}】手动核发 ${rewardPoints} 积分与 ${rewardGrowth} 成长值！`);
    setIsManualRewardOpen(false);
    setRewardStudentName('');
  };

  return (
    <div className="-m-6 p-6 min-h-full space-y-6 pb-16 bg-[#f5f7fa] text-neutral-800">
      {/* Toast */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2.5 px-5 py-2.5 bg-neutral-900/90 text-white backdrop-blur-md rounded-xl shadow-xl animate-in slide-in-from-top-3 border border-white/10 text-xs font-bold">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* ================= Header Banner ================= */}
      <div className="relative bg-gradient-to-r from-[#1e3a8a] via-[#2563eb] to-[#38bdf8] rounded-2xl overflow-hidden shadow-lg p-6 md:p-8 text-white">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 backdrop-blur-sm text-xs font-semibold text-white tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              学员成长驱动与荣誉激励引擎
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              成长激励与积分荣誉中心
            </h1>
            <p className="text-white/80 text-xs md:text-sm max-w-2xl leading-relaxed">
              支持灵活配置<strong>成长值/积分规则</strong>、<strong>等级成长阶梯</strong>与<strong>成就徽章机制</strong>，深度关联学员日常签到、课程完课、考试通关、沙箱作品与教学评价等行为。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => {
                setEditingRule(null);
                setRuleForm({
                  name: '',
                  category: '课程学习',
                  triggerEvent: '',
                  pointsReward: 30,
                  growthReward: 50,
                  dailyLimitTimes: 1,
                  cooldownHours: 0,
                  scope: '全平台',
                  description: ''
                });
                setIsRuleModalOpen(true);
              }}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md gap-2 font-medium shadow-sm"
            >
              <Plus className="w-4 h-4 text-white" />
              新建激励规则
            </Button>
            <Button
              onClick={() => {
                setBadgeForm({
                  title: '',
                  category: '综合成就',
                  rarity: '稀有',
                  icon: '🌟',
                  conditionDesc: '',
                  growthBonus: 300,
                  pointsBonus: 150
                });
                setIsBadgeModalOpen(true);
              }}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md gap-2 font-medium shadow-sm"
            >
              <Award className="w-4 h-4 text-yellow-300" />
              设计荣誉勋章
            </Button>
            <Button
              onClick={() => setIsManualRewardOpen(true)}
              className="bg-white text-[#2563eb] hover:bg-blue-50 font-bold gap-1.5 shadow-md"
            >
              <Gift className="w-4 h-4 text-[#2563eb]" />
              手动发放奖励
            </Button>
          </div>
        </div>

        {/* Top Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15">
            <div className="text-xs text-white/70 font-medium">启用中的行为规则</div>
            <div className="text-2xl font-black mt-1">{summaryStats.totalRules} <span className="text-xs font-normal text-white/70">条</span></div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15">
            <div className="text-xs text-white/70 font-medium">上架荣誉成就徽章</div>
            <div className="text-2xl font-black mt-1 text-yellow-200">{summaryStats.totalBadges} <span className="text-xs font-normal text-white/70">枚</span></div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15">
            <div className="text-xs text-white/70 font-medium">成长激励覆盖学员</div>
            <div className="text-2xl font-black mt-1 text-cyan-200">{summaryStats.totalStudents} <span className="text-xs font-normal text-white/70">人</span></div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15">
            <div className="text-xs text-white/70 font-medium">累计发放积分资产</div>
            <div className="text-2xl font-black mt-1 text-emerald-200 font-mono">{summaryStats.totalPointsDistributed.toLocaleString()} <span className="text-xs font-normal text-white/70">pts</span></div>
          </div>
        </div>
      </div>

      {/* ================= Main Sub-Navigation Tabs ================= */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-2 flex flex-wrap items-center gap-2 select-none">
        {[
          { key: 'rules', label: '行为积分与成长规则库', icon: Sliders, count: rules.length },
          { key: 'levels', label: '学员等级与晋升阶梯体系', icon: Crown, count: levels.length },
          { key: 'badges', label: '荣誉勋章与成就徽章工坊', icon: Medal, count: badges.length },
          { key: 'records', label: '积分成长明细与排行榜流水', icon: TrendingUp, count: logs.length }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all",
              activeTab === tab.key
                ? "bg-[#3b82f6] text-white shadow-md shadow-blue-500/20"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            )}
          >
            <tab.icon className={cn("w-4 h-4", activeTab === tab.key ? "text-white" : "text-neutral-500")} />
            <span>{tab.label}</span>
            <span className={cn(
              "px-1.5 py-0.2 rounded-full text-[11px] font-extrabold",
              activeTab === tab.key ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-600"
            )}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* ================= TAB 1: 行为积分规则库 ================= */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm text-xs">
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <div className="relative min-w-[240px] flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <Input
                  value={ruleSearch}
                  onChange={e => setRuleSearch(e.target.value)}
                  placeholder="搜索规则名称、触发行为..."
                  className="pl-9 h-9 text-xs rounded-xl bg-neutral-50 border-neutral-200"
                />
              </div>

              <div className="flex items-center gap-1.5">
                {['all', '签到打卡', '课程学习', '考试考核', '评价互动'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedRuleCategory(cat)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg font-bold transition-colors",
                      selectedRuleCategory === cat
                        ? "bg-blue-50 text-[#2563eb] border border-blue-200"
                        : "text-neutral-600 hover:bg-neutral-100 border border-transparent"
                    )}
                  >
                    {cat === 'all' ? '全部分类' : cat}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={() => {
                setEditingRule(null);
                setRuleForm({
                  name: '',
                  category: '课程学习',
                  triggerEvent: '',
                  pointsReward: 30,
                  growthReward: 50,
                  dailyLimitTimes: 1,
                  cooldownHours: 0,
                  scope: '全平台',
                  description: ''
                });
                setIsRuleModalOpen(true);
              }}
              size="sm"
              className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold h-9 rounded-xl shadow-sm gap-1.5"
            >
              <Plus className="w-4 h-4" />
              添加行为规则
            </Button>
          </div>

          {/* Rules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRules.map(rule => (
              <div
                key={rule.id}
                className={cn(
                  "bg-white rounded-2xl border p-5 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group",
                  rule.status === '启用' ? "border-neutral-200/80" : "border-neutral-200 opacity-60 bg-neutral-50/50"
                )}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-full text-[11px] font-bold border",
                      rule.category === '签到打卡' && "bg-amber-50 text-amber-700 border-amber-200",
                      rule.category === '课程学习' && "bg-blue-50 text-blue-700 border-blue-200",
                      rule.category === '考试考核' && "bg-purple-50 text-purple-700 border-purple-200",
                      rule.category === '评价互动' && "bg-cyan-50 text-cyan-700 border-cyan-200"
                    )}>
                      {rule.category}
                    </span>

                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-extrabold",
                      rule.status === '启用' ? "bg-emerald-50 text-emerald-600" : "bg-neutral-200 text-neutral-600"
                    )}>
                      {rule.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-neutral-900 text-sm group-hover:text-[#3b82f6] transition-colors">
                      {rule.name}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed line-clamp-2">
                      {rule.triggerEvent}
                    </p>
                  </div>

                  {/* Rewards Badge Pill */}
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-xs">
                    <div className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-neutral-500">成长值:</span>
                      <strong className="text-amber-700 font-mono">+{rule.growthReward}</strong>
                    </div>
                    <div className="h-3 w-px bg-neutral-200"></div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-[#3b82f6]" />
                      <span className="text-neutral-500">实训积分:</span>
                      <strong className="text-[#2563eb] font-mono">+{rule.pointsReward}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>
                    每日上限: <strong className="text-neutral-700">{rule.dailyLimitTimes === 0 ? '无限制' : `${rule.dailyLimitTimes} 次/天`}</strong>
                  </span>
                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleRuleStatus(rule.id)}
                      className="px-2 py-1 text-xs text-neutral-600 hover:text-neutral-900 font-medium"
                    >
                      {rule.status === '启用' ? '停用' : '启用'}
                    </button>
                    <button
                      onClick={() => {
                        setEditingRule(rule);
                        setRuleForm(rule);
                        setIsRuleModalOpen(true);
                      }}
                      className="px-2 py-1 text-xs text-[#3b82f6] hover:underline font-bold"
                    >
                      编辑
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 2: 等级阶梯体系 ================= */}
      {activeTab === 'levels' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-neutral-900">学员成长等级晋升矩阵</h3>
                <p className="text-xs text-neutral-500 mt-0.5">成长值累计达到指定阈值自动晋级，解锁对应的算力机时加成与特权待遇</p>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  showToast('等级晋升阶梯已自动同步至全校实训沙箱引擎');
                }}
                className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold text-xs rounded-xl"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1" />
                同步等级配置
              </Button>
            </div>

            {/* Level Stepper Progression */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
              {levels.map(tier => (
                <div
                  key={tier.id}
                  className="bg-neutral-50/70 border border-neutral-200/80 rounded-2xl p-5 space-y-4 hover:bg-white hover:shadow-md transition-all relative overflow-hidden group"
                >
                  {/* Decorative Corner Glow */}
                  <div className={cn("absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none", tier.badgeBg)}></div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md", tier.badgeBg)}>
                        Lv.{tier.level}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-neutral-900 text-sm">{tier.name}</h4>
                        <div className="text-[11px] text-neutral-400 font-mono">
                          门槛: ≥{tier.minGrowth.toLocaleString()} 成长值
                        </div>
                      </div>
                    </div>

                    <span className="text-xs bg-white px-2 py-0.5 rounded-full border border-neutral-200 text-neutral-600 font-bold">
                      {tier.studentsCount} 人在榜
                    </span>
                  </div>

                  {/* Privileges */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">解锁特权与权益</span>
                    {tier.privileges.map((p, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-neutral-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: 成就徽章工坊 ================= */}
      {activeTab === 'badges' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-neutral-700">稀有度筛选:</span>
              {['all', '普通', '稀有', '史诗', '传说'].map(rarity => (
                <button
                  key={rarity}
                  onClick={() => setBadgeFilter(rarity)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg font-bold transition-colors",
                    badgeFilter === rarity
                      ? "bg-blue-50 text-[#2563eb] border border-blue-200"
                      : "text-neutral-600 hover:bg-neutral-100 border border-transparent"
                  )}
                >
                  {rarity === 'all' ? '全部稀有度' : rarity}
                </button>
              ))}
            </div>

            <Button
              size="sm"
              onClick={() => {
                setBadgeForm({
                  title: '',
                  category: '综合成就',
                  rarity: '稀有',
                  icon: '🌟',
                  conditionDesc: '',
                  growthBonus: 300,
                  pointsBonus: 150
                });
                setIsBadgeModalOpen(true);
              }}
              className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold h-9 rounded-xl shadow-sm gap-1.5"
            >
              <Plus className="w-4 h-4" />
              设计新成就勋章
            </Button>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBadges.map(badge => (
              <div
                key={badge.id}
                className="bg-white rounded-2xl border border-neutral-200/80 p-6 space-y-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-center flex flex-col items-center justify-between group relative overflow-hidden"
              >
                {/* Rarity Ribbon */}
                <div className="absolute top-3 right-3">
                  <span className={cn(
                    "px-2.5 py-0.5 rounded-full text-[10px] font-black border uppercase tracking-wider",
                    badge.rarity === '传说' && "bg-amber-50 text-amber-700 border-amber-300 shadow-sm shadow-amber-100",
                    badge.rarity === '史诗' && "bg-purple-50 text-purple-700 border-purple-300",
                    badge.rarity === '稀有' && "bg-blue-50 text-blue-700 border-blue-300",
                    badge.rarity === '普通' && "bg-neutral-100 text-neutral-600 border-neutral-200"
                  )}>
                    {badge.rarity}
                  </span>
                </div>

                {/* Badge Visual Sphere */}
                <div className={cn(
                  "w-20 h-20 rounded-full bg-gradient-to-tr flex items-center justify-center text-3xl shadow-lg border-2 border-white transform group-hover:scale-110 transition-transform duration-300 mt-2",
                  badge.iconBg
                )}>
                  {badge.icon}
                </div>

                <div className="space-y-1">
                  <h3 className="font-black text-neutral-900 text-base">{badge.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed px-4">
                    {badge.conditionDesc}
                  </p>
                </div>

                {/* Unlocked stats */}
                <div className="w-full pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                  <span>已解锁: <strong className="text-neutral-800">{badge.unlockedCount} 人</strong></span>
                  <div className="flex items-center gap-1 font-bold text-amber-600">
                    <Zap className="w-3 h-3 fill-amber-500 text-amber-500" />
                    +{badge.growthBonus}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 4: 积分流水与排行榜 ================= */}
      {activeTab === 'records' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm text-xs">
            <div className="relative min-w-[280px] flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <Input
                value={logSearch}
                onChange={e => setLogSearch(e.target.value)}
                placeholder="搜索学员姓名、学号、触发行为..."
                className="pl-9 h-9 text-xs rounded-xl bg-neutral-50 border-neutral-200"
              />
            </div>

            <Button
              onClick={() => setIsManualRewardOpen(true)}
              size="sm"
              className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold h-9 rounded-xl shadow-sm gap-1.5"
            >
              <Gift className="w-4 h-4" />
              手动发放积分奖惩
            </Button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50/80 border-b border-neutral-200 font-bold text-neutral-600">
                  <th className="p-3.5 min-w-[160px]">学员信息</th>
                  <th className="p-3.5 min-w-[130px]">班级期次</th>
                  <th className="p-3.5 min-w-[120px]">行为分类</th>
                  <th className="p-3.5 min-w-[200px]">激励行为与说明</th>
                  <th className="p-3.5 min-w-[110px]">成长值变动</th>
                  <th className="p-3.5 min-w-[110px]">积分变动</th>
                  <th className="p-3.5 min-w-[130px]">操作人 / 时间</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={cn("w-8 h-8 rounded-full bg-gradient-to-tr text-white flex items-center justify-center font-bold shadow-sm", log.avatarColor)}>
                          {log.studentName.slice(0, 1)}
                        </div>
                        <div>
                          <div className="font-bold text-neutral-900">{log.studentName}</div>
                          <div className="text-[10px] text-neutral-400 font-mono">NO: {log.studentNo}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 font-medium text-neutral-700">
                      {log.className}
                    </td>

                    <td className="p-3.5">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold border",
                        log.category === '考试考核' && "bg-purple-50 text-purple-700 border-purple-200",
                        log.category === '签到打卡' && "bg-amber-50 text-amber-700 border-amber-200",
                        log.category === '课程学习' && "bg-blue-50 text-blue-700 border-blue-200",
                        log.category === '教师奖惩' && "bg-rose-50 text-rose-700 border-rose-200"
                      )}>
                        {log.category}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <div className="font-bold text-neutral-800">{log.actionName}</div>
                      {log.remark && (
                        <div className="text-[11px] text-neutral-400 mt-0.5">{log.remark}</div>
                      )}
                    </td>

                    <td className="p-3.5">
                      <span className="font-bold font-mono text-amber-600">
                        +{log.growthChange} EXP
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className="font-bold font-mono text-[#2563eb]">
                        +{log.pointsChange} pts
                      </span>
                    </td>

                    <td className="p-3.5 text-neutral-500">
                      <div>{log.operator}</div>
                      <div className="text-[10px] text-neutral-400 font-mono mt-0.5">{log.timestamp}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: 新增/编辑行为激励规则 */}
      {/* ========================================================================= */}
      {isRuleModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in text-xs">
          <div className="bg-white w-full max-w-[560px] rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-[#2563eb]">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    {editingRule ? '编辑行为激励规则' : '创建行为激励规则'}
                  </h3>
                  <p className="text-[11px] text-neutral-500">关联学员学习/签到/考核行为与积分成长奖励</p>
                </div>
              </div>
              <button onClick={() => setIsRuleModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="font-bold text-neutral-800 block mb-1">规则名称 *</label>
                  <Input
                    value={ruleForm.name}
                    onChange={e => setRuleForm({ ...ruleForm, name: e.target.value })}
                    placeholder="如：完成微课视频观看"
                    className="text-xs h-9"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">行为分类</label>
                  <select
                    value={ruleForm.category}
                    onChange={e => setRuleForm({ ...ruleForm, category: e.target.value as any })}
                    className="w-full h-9 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-xl"
                  >
                    <option value="签到打卡">签到打卡 (Check-in)</option>
                    <option value="课程学习">课程学习 (Course Study)</option>
                    <option value="考试考核">考试考核 (Exams)</option>
                    <option value="评价互动">评价互动 (Evaluations)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">适用范围</label>
                  <select
                    value={ruleForm.scope}
                    onChange={e => setRuleForm({ ...ruleForm, scope: e.target.value as any })}
                    className="w-full h-9 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-xl"
                  >
                    <option value="全平台">全平台师生通用</option>
                    <option value="指定班级">特定班级期次</option>
                    <option value="指定课程">特定实训课程</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="font-bold text-neutral-800 block mb-1">触发事件与判定条件 *</label>
                  <Input
                    value={ruleForm.triggerEvent}
                    onChange={e => setRuleForm({ ...ruleForm, triggerEvent: e.target.value })}
                    placeholder="如：课程理论微课视频观看进度达到100%"
                    className="text-xs h-9"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">奖励成长值 (EXP)</label>
                  <Input
                    type="number"
                    value={ruleForm.growthReward}
                    onChange={e => setRuleForm({ ...ruleForm, growthReward: Number(e.target.value) })}
                    className="text-xs h-9 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">奖励实训积分 (Points)</label>
                  <Input
                    type="number"
                    value={ruleForm.pointsReward}
                    onChange={e => setRuleForm({ ...ruleForm, pointsReward: Number(e.target.value) })}
                    className="text-xs h-9 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">每日最高触发次数限制 (0=不限)</label>
                  <Input
                    type="number"
                    value={ruleForm.dailyLimitTimes}
                    onChange={e => setRuleForm({ ...ruleForm, dailyLimitTimes: Number(e.target.value) })}
                    className="text-xs h-9"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">触发冷却间隔 (小时)</label>
                  <Input
                    type="number"
                    value={ruleForm.cooldownHours}
                    onChange={e => setRuleForm({ ...ruleForm, cooldownHours: Number(e.target.value) })}
                    className="text-xs h-9"
                  />
                </div>

                <div className="col-span-2">
                  <label className="font-bold text-neutral-800 block mb-1">规则描述说明</label>
                  <Textarea
                    value={ruleForm.description}
                    onChange={e => setRuleForm({ ...ruleForm, description: e.target.value })}
                    placeholder="请输入对学员展示的规则文案..."
                    className="text-xs min-h-[60px]"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-neutral-100 flex justify-end gap-2 bg-neutral-50">
              <Button variant="outline" onClick={() => setIsRuleModalOpen(false)}>
                取消
              </Button>
              <Button
                onClick={handleSaveRule}
                className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold"
              >
                保存规则
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: 设计荣誉勋章 */}
      {/* ========================================================================= */}
      {isBadgeModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in text-xs">
          <div className="bg-white w-full max-w-[500px] rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-700">
                  <Medal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">设计新成就勋章</h3>
                  <p className="text-[11px] text-neutral-500">创建平台专属荣誉勋章与解锁条件</p>
                </div>
              </div>
              <button onClick={() => setIsBadgeModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-neutral-800 block mb-1">勋章名称 *</label>
                  <Input
                    value={badgeForm.title}
                    onChange={e => setBadgeForm({ ...badgeForm, title: e.target.value })}
                    placeholder="如：全栈黑客宗师"
                    className="text-xs h-9"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">勋章图标 (Emoji/字符)</label>
                  <Input
                    value={badgeForm.icon}
                    onChange={e => setBadgeForm({ ...badgeForm, icon: e.target.value })}
                    placeholder="如：🚀、🏆、💎"
                    className="text-xs h-9 text-center text-lg"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">稀有度评级</label>
                  <select
                    value={badgeForm.rarity}
                    onChange={e => setBadgeForm({ ...badgeForm, rarity: e.target.value as any })}
                    className="w-full h-9 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-xl"
                  >
                    <option value="普通">普通 (Common)</option>
                    <option value="稀有">稀有 (Rare)</option>
                    <option value="史诗">史诗 (Epic)</option>
                    <option value="传说">传说 (Legendary)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">所属成就类别</label>
                  <select
                    value={badgeForm.category}
                    onChange={e => setBadgeForm({ ...badgeForm, category: e.target.value as any })}
                    className="w-full h-9 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-xl"
                  >
                    <option value="综合成就">综合成就</option>
                    <option value="签到打卡">签到打卡</option>
                    <option value="课程学习">课程学习</option>
                    <option value="考试考核">考试考核</option>
                    <option value="评价互动">评价互动</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="font-bold text-neutral-800 block mb-1">达成解锁条件说明 *</label>
                  <Textarea
                    value={badgeForm.conditionDesc}
                    onChange={e => setBadgeForm({ ...badgeForm, conditionDesc: e.target.value })}
                    placeholder="如：在云沙箱内独立完成50个实训实验并通过考核"
                    className="text-xs min-h-[60px]"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">解锁附赠成长值</label>
                  <Input
                    type="number"
                    value={badgeForm.growthBonus}
                    onChange={e => setBadgeForm({ ...badgeForm, growthBonus: Number(e.target.value) })}
                    className="text-xs h-9 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">解锁附赠积分</label>
                  <Input
                    type="number"
                    value={badgeForm.pointsBonus}
                    onChange={e => setBadgeForm({ ...badgeForm, pointsBonus: Number(e.target.value) })}
                    className="text-xs h-9 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-neutral-100 flex justify-end gap-2 bg-neutral-50">
              <Button variant="outline" onClick={() => setIsBadgeModalOpen(false)}>
                取消
              </Button>
              <Button
                onClick={handleSaveBadge}
                className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold"
              >
                发布勋章
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: 教师手动奖惩积分 */}
      {/* ========================================================================= */}
      {isManualRewardOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in text-xs">
          <div className="bg-white w-full max-w-[460px] rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">教师手动核发激励</h3>
                  <p className="text-[11px] text-neutral-500">对优秀学员表现实施针对性积分/成长值奖励</p>
                </div>
              </div>
              <button onClick={() => setIsManualRewardOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="font-bold text-neutral-800 block mb-1">目标学员姓名 / 学号 *</label>
                <Input
                  value={rewardStudentName}
                  onChange={e => setRewardStudentName(e.target.value)}
                  placeholder="请输入如：林若曦 / 2026900101"
                  className="text-xs h-9"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-neutral-800 block mb-1">奖励实训积分 (分)</label>
                  <Input
                    type="number"
                    value={rewardPoints}
                    onChange={e => setRewardPoints(Number(e.target.value))}
                    className="text-xs h-9 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-800 block mb-1">奖励成长值 (EXP)</label>
                  <Input
                    type="number"
                    value={rewardGrowth}
                    onChange={e => setRewardGrowth(Number(e.target.value))}
                    className="text-xs h-9 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-neutral-800 block mb-1">奖励原因与依据 (留痕审计)</label>
                <Textarea
                  value={rewardReason}
                  onChange={e => setRewardReason(e.target.value)}
                  placeholder="如：课堂主动协助他人调试大模型沙箱，表现优异"
                  className="text-xs min-h-[60px]"
                />
              </div>
            </div>

            <div className="p-4 border-t border-neutral-100 flex justify-end gap-2 bg-neutral-50">
              <Button variant="outline" onClick={() => setIsManualRewardOpen(false)}>
                取消
              </Button>
              <Button
                onClick={handleManualReward}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              >
                确认核发奖励
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
