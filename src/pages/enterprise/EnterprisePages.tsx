import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BellRing,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  FileCheck2,
  Filter,
  GraduationCap,
  MapPin,
  Plus,
  Search,
  Send,
  Sparkles,
  Target,
  UserCheck,
  UsersRound,
  Workflow,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ENTERPRISE_DEMANDS,
  ENTERPRISE_RECRUITMENT,
  ENTERPRISE_TALENTS,
  ENTERPRISE_TRAINING_PROGRAMS,
  type DemandStatus,
  type EnterpriseDemand,
  type EnterpriseTalent,
  type RecruitmentCandidate,
  type TrainingProgram,
} from "@/data/enterpriseData";
import { cn } from "@/lib/utils";

function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div aria-label={eyebrow}>
        <h1 className="text-xl font-bold leading-tight text-neutral-900">{title}</h1>
        <p className="mt-1 text-sm leading-6 text-neutral-500">{description}</p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone = status === "招聘中" || status === "已入职" || status === "已邀约"
    ? "bg-[#ecfdf3] text-[#027a48]"
    : status === "待发布" || status === "待沟通"
      ? "bg-[#fff7e8] text-[#b54708]"
      : status === "面试中"
        ? "bg-[#eef4ff] text-[#175cd3]"
        : "bg-[#f2f4f7] text-[#667085]";
  return <span className={cn("inline-flex rounded-md px-2 py-1 text-[11px] font-semibold", tone)}>{status}</span>;
}

const DASHBOARD_METRICS = [
  { label: "在招需求", value: "12", note: "3 个岗位本周截止", change: "+2", icon: BriefcaseBusiness, tone: "bg-[#eef4ff] text-[#2563eb]" },
  { label: "匹配人才", value: "86", note: "高匹配候选人 28 人", change: "+18", icon: UsersRound, tone: "bg-[#e8f8f5] text-[#008f83]" },
  { label: "本周面试", value: "24", note: "6 场待确认时间", change: "+5", icon: CalendarDays, tone: "bg-[#fff5e8] text-[#c66a05]" },
  { label: "Offer / 入职", value: "9 / 6", note: "Offer 接受率 81.8%", change: "81.8%", icon: UserCheck, tone: "bg-[#f1edff] text-[#6941c6]" },
] as const;

const TODO_ITEMS = [
  { title: "确认 6 名候选人的面试时间", meta: "招聘协同 · 今天", tone: "text-[#b54708]", icon: CalendarDays },
  { title: "审核 AI 定向班项目阶段成果", meta: "定向培养 · 明天", tone: "text-[#175cd3]", icon: FileCheck2 },
  { title: "云平台运维岗位需求待发布", meta: "人才需求 · 2 天后", tone: "text-[#475467]", icon: BriefcaseBusiness },
] as const;

export function EnterpriseDashboard() {
  const navigate = useNavigate();
  const funnel = [
    { label: "智能推荐", value: 86, color: "bg-[#2563eb]" },
    { label: "企业初选", value: 52, color: "bg-[#3478f6]" },
    { label: "进入面试", value: 24, color: "bg-[#00a6a6]" },
    { label: "发放 Offer", value: 9, color: "bg-[#f79009]" },
    { label: "成功入职", value: 6, color: "bg-[#12b76a]" },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="企业工作台"
        title="上午好，陈经理"
        description="统一查看人才需求、定向培养与招聘进展。"
        action={(
          <Button className="h-9 rounded-[4px] bg-[#3b82f6] px-4 shadow-sm hover:bg-[#2563eb]" onClick={() => navigate("/enterprise/demands")}>
            <Plus className="h-4 w-4" /> 发布人才需求
          </Button>
        )}
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {DASHBOARD_METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="rounded border border-neutral-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between">
                <span className={cn("flex h-10 w-10 items-center justify-center rounded-md", metric.tone)}><Icon className="h-5 w-5" /></span>
                <span className="text-xs font-semibold text-[#027a48]">{metric.change}</span>
              </div>
              <strong className="mt-5 block text-[28px] font-bold tabular-nums text-[#101828]">{metric.value}</strong>
              <p className="mt-1 text-sm font-semibold text-[#344054]">{metric.label}</p>
              <p className="mt-1 text-xs text-[#98a2b3]">{metric.note}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_0.85fr]">
        <section className="rounded border border-neutral-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[#101828]">本月招聘转化</h2>
              <p className="mt-1 text-xs text-[#98a2b3]">从人才推荐到成功入职的转化进展</p>
            </div>
            <button type="button" onClick={() => navigate("/enterprise/recruitment")} className="inline-flex min-h-10 items-center gap-1 text-xs font-semibold text-[#2563eb]">
              查看招聘看板 <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-5 sm:gap-3">
            {funnel.map((item, index) => (
              <div key={item.label} className="relative">
                <div className="flex items-center gap-2">
                  <span className={cn("h-2.5 w-2.5 rounded-sm", item.color)} />
                  <span className="text-xs text-[#667085]">{item.label}</span>
                </div>
                <strong className="mt-3 block text-2xl font-bold tabular-nums text-[#101828]">{item.value}</strong>
                {index < funnel.length - 1 && <ArrowRight className="absolute -right-2 top-8 hidden h-4 w-4 text-[#d0d5dd] sm:block" />}
              </div>
            ))}
          </div>
          <div className="mt-6 flex h-2 overflow-hidden rounded-full bg-[#eef1f5]">
            <span className="w-[40%] bg-[#2563eb]" />
            <span className="w-[25%] bg-[#3478f6]" />
            <span className="w-[16%] bg-[#00a6a6]" />
            <span className="w-[11%] bg-[#f79009]" />
            <span className="w-[8%] bg-[#12b76a]" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#eef0f3] pt-5 sm:grid-cols-3">
            <div><p className="text-xs text-[#98a2b3]">初选转化率</p><strong className="mt-1 block text-lg">60.5%</strong></div>
            <div><p className="text-xs text-[#98a2b3]">面试通过率</p><strong className="mt-1 block text-lg">37.5%</strong></div>
            <div><p className="text-xs text-[#98a2b3]">Offer 接受率</p><strong className="mt-1 block text-lg">66.7%</strong></div>
          </div>
        </section>

        <section className="rounded border border-neutral-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#101828]">待办事项</h2>
              <p className="mt-1 text-xs text-[#98a2b3]">3 项需要您处理</p>
            </div>
            <BellRing className="h-5 w-5 text-[#f79009]" />
          </div>
          <div className="mt-4 divide-y divide-[#eef0f3]">
            {TODO_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.title} type="button" className="flex w-full items-start gap-3 py-4 text-left hover:bg-[#fafbfc]">
                  <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", item.tone)} />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium leading-5 text-[#344054]">{item.title}</span>
                    <span className="mt-1 block text-[11px] text-[#98a2b3]">{item.meta}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_1fr]">
        <section className="min-w-0 rounded border border-neutral-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#eef0f3] px-5 py-4">
            <div><h2 className="text-base font-bold">定向培养进展</h2><p className="mt-1 text-xs text-[#98a2b3]">共 78 名学员参与培养</p></div>
            <button type="button" onClick={() => navigate("/enterprise/training")} className="text-xs font-semibold text-[#2563eb]">全部项目</button>
          </div>
          <div className="divide-y divide-[#eef0f3] px-5">
            {ENTERPRISE_TRAINING_PROGRAMS.slice(0, 2).map((program) => (
              <div key={program.id} className="py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div><p className="text-sm font-semibold text-[#344054]">{program.name}</p><p className="mt-1 text-xs text-[#98a2b3]">{program.stage} · {program.learners} 人</p></div>
                  <strong className="text-sm tabular-nums text-[#175cd3]">{program.progress}%</strong>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#eef1f5]"><div className="h-full rounded-full bg-[#3478f6]" style={{ width: `${program.progress}%` }} /></div>
              </div>
            ))}
          </div>
        </section>

        <section className="min-w-0 rounded border border-neutral-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#eef0f3] px-5 py-4">
            <div><h2 className="text-base font-bold">最新推荐人才</h2><p className="mt-1 text-xs text-[#98a2b3]">基于当前岗位能力模型</p></div>
            <Sparkles className="h-5 w-5 text-[#6941c6]" />
          </div>
          <div className="divide-y divide-[#eef0f3] px-5">
            {ENTERPRISE_TALENTS.slice(0, 3).map((talent) => (
              <div key={talent.id} className="flex items-center gap-3 py-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#eef4ff] text-xs font-bold text-[#175cd3]">{talent.name.slice(0, 1)}</span>
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-[#344054]">{talent.name} · {talent.direction}</p><p className="mt-1 truncate text-[11px] text-[#98a2b3]">{talent.school}</p></div>
                <span className="text-sm font-bold tabular-nums text-[#027a48]">{talent.match}%</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function EnterpriseDemands() {
  const [demands, setDemands] = useState<EnterpriseDemand[]>(ENTERPRISE_DEMANDS);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | DemandStatus>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [created, setCreated] = useState(false);
  const [form, setForm] = useState({ title: "", city: "南京", salary: "", headcount: "", skills: "" });

  const filteredDemands = useMemo(() => demands.filter((item) => {
    const matchesKeyword = item.title.includes(search) || item.department.includes(search) || item.skills.some((skill) => skill.toLowerCase().includes(search.toLowerCase()));
    return matchesKeyword && (status === "all" || item.status === status);
  }), [demands, search, status]);

  const createDemand = (event: FormEvent) => {
    event.preventDefault();
    if (!form.title.trim() || !form.salary.trim()) return;
    setDemands((items) => [{
      id: Date.now(),
      title: form.title,
      department: "待分配部门",
      city: form.city,
      salary: form.salary,
      headcount: Number(form.headcount) || 1,
      matched: 0,
      applicants: 0,
      status: "待发布",
      deadline: "2026.11.30",
      skills: form.skills.split(/[,，]/).map((item) => item.trim()).filter(Boolean),
    }, ...items]);
    setModalOpen(false);
    setCreated(true);
    setForm({ title: "", city: "南京", salary: "", headcount: "", skills: "" });
    window.setTimeout(() => setCreated(false), 2500);
  };

  return (
    <div>
      {created && <div className="fixed right-6 top-20 z-[70] flex items-center gap-2 rounded-md border border-[#abefc6] bg-white px-4 py-3 text-sm font-medium text-[#027a48] shadow-lg"><CheckCircle2 className="h-4 w-4" />人才需求已创建</div>}
      <PageHeader
        eyebrow="人才需求"
        title="岗位需求管理"
        description="将业务用人需求转化为可匹配、可培养的岗位能力标准。"
        action={<Button className="h-9 rounded-[4px] bg-[#3b82f6] shadow-sm hover:bg-[#2563eb]" onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" />新建需求</Button>}
      />

      <div className="rounded border border-neutral-100 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-[#e5e9f0] p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex overflow-x-auto rounded-md bg-[#f2f4f7] p-1">
            {(["all", "招聘中", "待发布", "已暂停"] as const).map((item) => (
              <button key={item} type="button" onClick={() => setStatus(item)} className={cn("min-h-9 whitespace-nowrap rounded px-3 text-xs font-medium", status === item ? "bg-white text-[#175cd3] shadow-sm" : "text-[#667085]")}>
                {item === "all" ? "全部需求" : item}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-[280px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" />
            <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="搜索岗位、部门或技能" className="h-10 rounded-md pl-9" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead className="bg-[#fafbfc] text-xs text-[#667085]"><tr><th className="px-5 py-3 font-medium">岗位需求</th><th className="px-4 py-3 font-medium">核心技能</th><th className="px-4 py-3 font-medium">招聘数据</th><th className="px-4 py-3 font-medium">状态</th><th className="px-4 py-3 font-medium">截止日期</th><th className="px-5 py-3 text-right font-medium">操作</th></tr></thead>
            <tbody className="divide-y divide-[#eef0f3]">
              {filteredDemands.map((item) => (
                <tr key={item.id} className="hover:bg-[#fafcff]">
                  <td className="px-5 py-4"><p className="text-sm font-semibold text-[#344054]">{item.title}</p><p className="mt-1 text-xs text-[#98a2b3]">{item.department} · {item.city} · {item.salary}</p></td>
                  <td className="px-4 py-4"><div className="flex flex-wrap gap-1.5">{item.skills.map((skill) => <span key={skill} className="rounded bg-[#f2f4f7] px-2 py-1 text-[11px] text-[#475467]">{skill}</span>)}</div></td>
                  <td className="px-4 py-4"><p className="text-xs text-[#667085]">需求 <strong className="text-[#344054]">{item.headcount}</strong> 人</p><p className="mt-1 text-xs text-[#667085]">匹配 {item.matched} · 投递 {item.applicants}</p></td>
                  <td className="px-4 py-4"><StatusBadge status={item.status} /></td>
                  <td className="px-4 py-4 text-xs tabular-nums text-[#667085]">{item.deadline}</td>
                  <td className="px-5 py-4 text-right"><button type="button" className="min-h-9 px-2 text-xs font-semibold text-[#2563eb]">查看匹配</button><button type="button" className="min-h-9 px-2 text-xs text-[#667085]">编辑</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-[#eef0f3] px-5 py-3 text-xs text-[#98a2b3]">共 {filteredDemands.length} 条需求</div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#101828]/45 p-4" onMouseDown={(event) => event.currentTarget === event.target && setModalOpen(false)}>
          <form onSubmit={createDemand} className="w-full max-w-[560px] rounded-lg bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e5e9f0] px-6 py-4"><div><h2 className="text-lg font-bold">新建人才需求</h2><p className="mt-1 text-xs text-[#98a2b3]">发布前可继续完善岗位能力模型</p></div><button type="button" onClick={() => setModalOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-[#f2f4f7]" title="关闭"><X className="h-5 w-5" /></button></div>
            <div className="grid gap-4 p-6 sm:grid-cols-2">
              <label className="sm:col-span-2"><span className="mb-1.5 block text-xs font-medium text-[#344054]">岗位名称</span><Input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="例如：AI 应用开发工程师" className="rounded-md" /></label>
              <label><span className="mb-1.5 block text-xs font-medium text-[#344054]">工作城市</span><Input value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} className="rounded-md" /></label>
              <label><span className="mb-1.5 block text-xs font-medium text-[#344054]">需求人数</span><Input type="number" min="1" value={form.headcount} onChange={(event) => setForm({ ...form, headcount: event.target.value })} placeholder="1" className="rounded-md" /></label>
              <label className="sm:col-span-2"><span className="mb-1.5 block text-xs font-medium text-[#344054]">薪资区间</span><Input required value={form.salary} onChange={(event) => setForm({ ...form, salary: event.target.value })} placeholder="例如：15K–20K" className="rounded-md" /></label>
              <label className="sm:col-span-2"><span className="mb-1.5 block text-xs font-medium text-[#344054]">核心技能</span><Textarea value={form.skills} onChange={(event) => setForm({ ...form, skills: event.target.value })} placeholder="使用逗号分隔，例如：Python、RAG、Agent" className="min-h-20 rounded-md" /></label>
            </div>
            <div className="flex justify-end gap-3 border-t border-[#e5e9f0] px-6 py-4"><Button type="button" variant="outline" className="rounded-md" onClick={() => setModalOpen(false)}>取消</Button><Button type="submit" className="rounded-md bg-[#2563eb]">创建草稿</Button></div>
          </form>
        </div>
      )}
    </div>
  );
}

export function EnterpriseTalents() {
  const [search, setSearch] = useState("");
  const [direction, setDirection] = useState("全部方向");
  const [selectedTalent, setSelectedTalent] = useState<EnterpriseTalent | null>(null);
  const [invitedIds, setInvitedIds] = useState<number[]>([]);

  const talents = useMemo(() => ENTERPRISE_TALENTS.filter((talent) => {
    const matchesSearch = talent.name.includes(search) || talent.school.includes(search) || talent.skills.some((skill) => skill.toLowerCase().includes(search.toLowerCase()));
    return matchesSearch && (direction === "全部方向" || talent.direction.includes(direction));
  }), [search, direction]);

  return (
    <div>
      <PageHeader eyebrow="智能人才库" title="搜索与发现合适人才" description="根据岗位能力模型，综合学习、项目、认证和求职意向进行匹配。" />

      <div className="mb-4 flex flex-col gap-3 rounded-lg border border-[#e5e9f0] bg-white p-4 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="搜索姓名、学校或技能" className="h-10 rounded-md pl-9" /></div>
        <select value={direction} onChange={(event) => setDirection(event.target.value)} className="h-10 rounded-md border border-[#e2e8f0] bg-white px-3 text-sm text-[#475467] outline-none focus:border-[#2563eb]">
          <option>全部方向</option><option>AI 智能体</option><option>大模型应用</option><option>数据分析</option><option>Java 云原生</option><option>网络安全</option>
        </select>
        <Button variant="outline" className="h-10 rounded-md"><Filter className="h-4 w-4" />更多筛选</Button>
      </div>

      <div className="rounded-lg border border-[#e5e9f0] bg-white">
        <div className="flex items-center justify-between border-b border-[#eef0f3] px-5 py-4"><p className="text-sm font-semibold text-[#344054]">匹配到 <strong className="text-[#2563eb]">{talents.length}</strong> 名人才</p><span className="text-xs text-[#98a2b3]">默认按人岗匹配度排序</span></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead className="bg-[#fafbfc] text-xs text-[#667085]"><tr><th className="px-5 py-3 font-medium">人才档案</th><th className="px-4 py-3 font-medium">能力标签</th><th className="px-4 py-3 font-medium">成果证明</th><th className="px-4 py-3 font-medium">人岗匹配</th><th className="px-4 py-3 font-medium">状态</th><th className="px-5 py-3 text-right font-medium">操作</th></tr></thead>
            <tbody className="divide-y divide-[#eef0f3]">
              {talents.map((talent) => (
                <tr key={talent.id} className="hover:bg-[#fafcff]">
                  <td className="px-5 py-4"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#edf3ff] text-sm font-bold text-[#175cd3]">{talent.name.slice(0, 1)}</span><div><p className="text-sm font-semibold text-[#344054]">{talent.name}</p><p className="mt-1 text-xs text-[#98a2b3]">{talent.school} · {talent.city}</p><p className="mt-1 text-[11px] font-medium text-[#175cd3]">{talent.level}</p></div></div></td>
                  <td className="px-4 py-4"><div className="flex max-w-[260px] flex-wrap gap-1.5">{talent.skills.map((skill) => <span key={skill} className="rounded bg-[#f2f4f7] px-2 py-1 text-[11px] text-[#475467]">{skill}</span>)}</div></td>
                  <td className="px-4 py-4 text-xs text-[#667085]"><p>{talent.projects} 个项目 · {talent.certificates} 项认证</p><p className="mt-1 max-w-[220px] truncate text-[11px] text-[#98a2b3]">{talent.highlight}</p></td>
                  <td className="px-4 py-4"><strong className="text-lg tabular-nums text-[#027a48]">{talent.match}%</strong><div className="mt-2 h-1.5 w-20 rounded-full bg-[#e8edf3]"><div className="h-full rounded-full bg-[#12b76a]" style={{ width: `${talent.match}%` }} /></div></td>
                  <td className="px-4 py-4"><StatusBadge status={invitedIds.includes(talent.id) ? "已邀约" : talent.status} /></td>
                  <td className="px-5 py-4 text-right"><button type="button" onClick={() => setSelectedTalent(talent)} className="min-h-9 px-2 text-xs font-semibold text-[#2563eb]">查看档案</button><button type="button" onClick={() => setInvitedIds((ids) => ids.includes(talent.id) ? ids : [...ids, talent.id])} className="min-h-9 px-2 text-xs text-[#475467]">发起邀约</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTalent && (
        <div className="fixed inset-0 z-[80] flex justify-end bg-[#101828]/35" onMouseDown={(event) => event.currentTarget === event.target && setSelectedTalent(null)}>
          <aside className="h-full w-full max-w-[480px] overflow-y-auto bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-[#e5e9f0] bg-white px-6 py-4"><h2 className="text-lg font-bold">人才详情</h2><button type="button" onClick={() => setSelectedTalent(null)} className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-[#f2f4f7]" title="关闭"><X className="h-5 w-5" /></button></div>
            <div className="p-6">
              <div className="flex items-start gap-4"><span className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#edf3ff] text-xl font-bold text-[#175cd3]">{selectedTalent.name.slice(0, 1)}</span><div><h3 className="text-xl font-bold">{selectedTalent.name}</h3><p className="mt-1 text-sm text-[#667085]">{selectedTalent.direction}</p><p className="mt-2 text-xs text-[#98a2b3]">{selectedTalent.school} · {selectedTalent.city}</p></div><strong className="ml-auto text-xl text-[#027a48]">{selectedTalent.match}%</strong></div>
              <div className="mt-6 grid grid-cols-3 divide-x divide-[#e5e9f0] border-y border-[#e5e9f0] py-4 text-center"><div><strong className="text-lg">{selectedTalent.level.slice(0, 2)}</strong><p className="mt-1 text-[11px] text-[#98a2b3]">成长等级</p></div><div><strong className="text-lg">{selectedTalent.projects}</strong><p className="mt-1 text-[11px] text-[#98a2b3]">项目成果</p></div><div><strong className="text-lg">{selectedTalent.certificates}</strong><p className="mt-1 text-[11px] text-[#98a2b3]">能力认证</p></div></div>
              <section className="mt-6"><h4 className="text-sm font-bold">核心能力</h4><div className="mt-3 flex flex-wrap gap-2">{selectedTalent.skills.map((skill) => <span key={skill} className="rounded-md border border-[#d8e3fa] bg-[#f5f8ff] px-3 py-1.5 text-xs font-medium text-[#175cd3]">{skill}</span>)}</div></section>
              <section className="mt-6"><h4 className="text-sm font-bold">项目亮点</h4><p className="mt-3 rounded-lg bg-[#f8fafc] p-4 text-sm leading-6 text-[#475467]">{selectedTalent.highlight}</p></section>
              <section className="mt-6"><h4 className="text-sm font-bold">档案核验</h4><div className="mt-3 space-y-3 text-sm text-[#475467]">{["学习成绩已核验", "项目成果已验收", "能力证书已认证"].map((item) => <p key={item} className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-[#12b76a]" />{item}</p>)}</div></section>
            </div>
            <div className="sticky bottom-0 flex gap-3 border-t border-[#e5e9f0] bg-white p-5"><Button variant="outline" className="flex-1 rounded-md" onClick={() => setSelectedTalent(null)}>关闭</Button><Button className="flex-1 rounded-md bg-[#2563eb]" onClick={() => { setInvitedIds((ids) => ids.includes(selectedTalent.id) ? ids : [...ids, selectedTalent.id]); setSelectedTalent(null); }}><Send className="h-4 w-4" />发起邀约</Button></div>
          </aside>
        </div>
      )}
    </div>
  );
}

export function EnterpriseTraining() {
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram>(ENTERPRISE_TRAINING_PROGRAMS[0]);
  return (
    <div>
      <PageHeader eyebrow="定向培养" title="企业人才共育项目" description="企业参与岗位标准、课程、项目和阶段评审，实时查看人才成长。" action={<Button className="h-9 rounded-[4px] bg-[#3b82f6] shadow-sm hover:bg-[#2563eb]"><Plus className="h-4 w-4" />发起共育项目</Button>} />

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded border border-neutral-100 bg-white p-5 shadow-sm"><p className="text-xs text-[#667085]">在进行项目</p><strong className="mt-3 block text-2xl">3</strong><p className="mt-1 text-xs text-[#027a48]">78 名学员在培</p></div>
        <div className="rounded border border-neutral-100 bg-white p-5 shadow-sm"><p className="text-xs text-[#667085]">平均培养进度</p><strong className="mt-3 block text-2xl">51%</strong><p className="mt-1 text-xs text-[#3b82f6]">计划内推进</p></div>
        <div className="rounded border border-neutral-100 bg-white p-5 shadow-sm"><p className="text-xs text-[#667085]">阶段合格人数</p><strong className="mt-3 block text-2xl">53</strong><p className="mt-1 text-xs text-[#667085]">阶段合格率 67.9%</p></div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="rounded-lg border border-[#e5e9f0] bg-white">
          <div className="border-b border-[#eef0f3] px-5 py-4"><h2 className="text-base font-bold">培养项目</h2><p className="mt-1 text-xs text-[#98a2b3]">选择项目查看学习与评价进展</p></div>
          <div className="divide-y divide-[#eef0f3]">
            {ENTERPRISE_TRAINING_PROGRAMS.map((program) => (
              <button key={program.id} type="button" onClick={() => setSelectedProgram(program)} className={cn("w-full px-5 py-5 text-left transition", selectedProgram.id === program.id ? "bg-[#f5f8ff]" : "hover:bg-[#fafbfc]")}>
                <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="text-sm font-bold text-[#344054]">{program.name}</h3><p className="mt-1.5 text-xs text-[#667085]">目标岗位：{program.targetRole}</p></div><span className="text-xs font-semibold text-[#175cd3]">{program.stage}</span></div>
                <div className="mt-4 flex items-center gap-4"><div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-[#e8edf3]"><div className="h-full rounded-full bg-[#3478f6]" style={{ width: `${program.progress}%` }} /></div><strong className="text-sm tabular-nums text-[#175cd3]">{program.progress}%</strong></div>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-[#98a2b3]"><span>{program.learners} 名学员</span><span>{program.qualified} 人阶段合格</span><span>企业导师：{program.mentor}</span></div>
              </button>
            ))}
          </div>
        </section>

        <aside className="rounded-lg border border-[#e5e9f0] bg-white p-5">
          <p className="text-xs font-semibold text-[#2563eb]">项目概览</p>
          <h2 className="mt-2 text-lg font-bold leading-7">{selectedProgram.name}</h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-md bg-[#f6f8fb] p-3"><p className="text-[11px] text-[#98a2b3]">当前阶段</p><p className="mt-1 text-sm font-semibold">{selectedProgram.stage}</p></div>
            <div className="rounded-md bg-[#f6f8fb] p-3"><p className="text-[11px] text-[#98a2b3]">计划结束</p><p className="mt-1 text-sm font-semibold">{selectedProgram.endDate}</p></div>
          </div>
          <h3 className="mt-6 text-sm font-bold">培养链路</h3>
          <div className="mt-4 space-y-0">
            {["岗位能力基线测评", "岗位核心课程", "企业项目实训", "企业导师评审", "人才推荐"].map((item, index) => {
              const done = index < Math.ceil(selectedProgram.progress / 22);
              return <div key={item} className="flex gap-3"><div className="flex flex-col items-center"><span className={cn("flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold", done ? "border-[#2563eb] bg-[#2563eb] text-white" : "border-[#d0d5dd] bg-white text-[#98a2b3]")}>{done ? <Check className="h-3.5 w-3.5" /> : index + 1}</span>{index < 4 && <span className="h-8 w-px bg-[#e5e9f0]" />}</div><p className={cn("pt-0.5 text-sm", done ? "font-medium text-[#344054]" : "text-[#98a2b3]")}>{item}</p></div>;
            })}
          </div>
          <Button variant="outline" className="mt-6 w-full rounded-md">查看项目详情 <ChevronRight className="h-4 w-4" /></Button>
        </aside>
      </div>
    </div>
  );
}

const RECRUITMENT_STAGES = [
  { key: "shortlist", label: "人才初选", hint: "待确认邀约", color: "border-t-[#3478f6]" },
  { key: "interview", label: "面试中", hint: "等待面试结论", color: "border-t-[#7f56d9]" },
  { key: "offer", label: "Offer 沟通", hint: "待确认接受", color: "border-t-[#f79009]" },
  { key: "onboard", label: "已入职", hint: "进入稳定性跟踪", color: "border-t-[#12b76a]" },
] as const;

export function EnterpriseRecruitment() {
  const [candidates, setCandidates] = useState<RecruitmentCandidate[]>(ENTERPRISE_RECRUITMENT);
  const [search, setSearch] = useState("");
  const moveNext = (candidate: RecruitmentCandidate) => {
    const index = RECRUITMENT_STAGES.findIndex((stage) => stage.key === candidate.stage);
    if (index === -1 || index === RECRUITMENT_STAGES.length - 1) return;
    setCandidates((items) => items.map((item) => item.id === candidate.id ? { ...item, stage: RECRUITMENT_STAGES[index + 1].key } : item));
  };
  const visibleCandidates = candidates.filter((candidate) => candidate.name.includes(search) || candidate.role.includes(search));

  return (
    <div>
      <PageHeader eyebrow="招聘协同" title="人才招聘进展看板" description="跨部门共享候选人进度，统一管理初选、面试、Offer 和入职跟踪。" action={<Button variant="outline" className="h-10 rounded-md"><CalendarDays className="h-4 w-4" />面试日程</Button>} />
      <div className="mb-4 flex flex-col gap-3 rounded-lg border border-[#e5e9f0] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-[340px]"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="搜索候选人或岗位" className="h-10 rounded-md pl-9" /></div>
        <div className="flex items-center gap-2 text-xs text-[#667085]"><CircleAlert className="h-4 w-4 text-[#f79009]" />今日 3 场面试，1 个 Offer 待确认</div>
      </div>

      <div className="overflow-x-auto pb-3">
        <div className="grid min-w-[1100px] grid-cols-4 gap-4">
          {RECRUITMENT_STAGES.map((stage) => {
            const stageCandidates = visibleCandidates.filter((candidate) => candidate.stage === stage.key);
            return (
              <section key={stage.key} className={cn("min-h-[520px] rounded-lg border border-[#e5e9f0] border-t-[3px] bg-[#f8fafc]", stage.color)}>
                <div className="flex items-start justify-between border-b border-[#e5e9f0] px-4 py-4"><div><h2 className="text-sm font-bold text-[#344054]">{stage.label}</h2><p className="mt-1 text-[11px] text-[#98a2b3]">{stage.hint}</p></div><span className="flex h-6 min-w-6 items-center justify-center rounded bg-white px-1.5 text-xs font-bold text-[#475467]">{stageCandidates.length}</span></div>
                <div className="space-y-3 p-3">
                  {stageCandidates.map((candidate) => (
                    <article key={candidate.id} className="rounded-lg border border-[#e5e9f0] bg-white p-4 shadow-[0_6px_16px_-14px_rgba(16,24,40,.35)]">
                      <div className="flex items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#eef4ff] text-xs font-bold text-[#175cd3]">{candidate.name.slice(0, 1)}</span><div className="min-w-0 flex-1"><h3 className="text-sm font-bold text-[#344054]">{candidate.name}</h3><p className="mt-1 truncate text-xs text-[#667085]">{candidate.role}</p></div><strong className="text-sm tabular-nums text-[#027a48]">{candidate.match}%</strong></div>
                      <p className="mt-3 truncate text-[11px] text-[#98a2b3]">{candidate.school}</p>
                      <div className="mt-4 flex items-center justify-between border-t border-[#eef0f3] pt-3"><span className="inline-flex items-center gap-1 text-[10px] text-[#98a2b3]"><Clock3 className="h-3 w-3" />{candidate.updatedAt}</span>{stage.key !== "onboard" ? <button type="button" onClick={() => moveNext(candidate)} className="inline-flex min-h-8 items-center gap-1 text-xs font-semibold text-[#2563eb]">推进 <ArrowRight className="h-3.5 w-3.5" /></button> : <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#027a48]"><CheckCircle2 className="h-3.5 w-3.5" />已完成</span>}</div>
                    </article>
                  ))}
                  {stageCandidates.length === 0 && <div className="flex min-h-28 items-center justify-center text-xs text-[#98a2b3]">暂无候选人</div>}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
