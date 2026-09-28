import { useMemo, useState } from "react";
import {
  BadgeCheck,
  BellRing,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  Filter,
  GraduationCap,
  Heart,
  MapPin,
  MessageSquareText,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  EMPLOYMENT_JOBS,
  INITIAL_APPLICATIONS,
  type ApplicationStage,
  type EmploymentApplication,
  type EmploymentJob,
} from "@/data/employmentData";
import { cn } from "@/lib/utils";

type HallTab = "jobs" | "applications" | "invites" | "feedback";

const stageTone: Record<ApplicationStage, string> = {
  已投递: "bg-blue-50 text-blue-700",
  企业筛选: "bg-amber-50 text-amber-700",
  面试中: "bg-violet-50 text-violet-700",
  Offer: "bg-orange-50 text-orange-700",
  已入职: "bg-emerald-50 text-emerald-700",
  不合适: "bg-neutral-100 text-neutral-500",
};

export default function StudentDemandHall() {
  const [activeTab, setActiveTab] = useState<HallTab>("jobs");
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("全部城市");
  const [jobType, setJobType] = useState("全部类型");
  const [matchFilter, setMatchFilter] = useState("全部匹配度");
  const [applications, setApplications] = useState<EmploymentApplication[]>(INITIAL_APPLICATIONS);
  const [selectedJob, setSelectedJob] = useState<EmploymentJob | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([2]);
  const [acceptedInvites, setAcceptedInvites] = useState<number[]>([]);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    match: "85",
    satisfaction: "4",
    salaryConsistent: "是",
    courseUsefulness: "较大帮助",
    skillGap: "生产环境部署、监控告警与跨部门需求沟通",
    needsHelp: "否",
    comment: "课程项目与当前工作内容比较匹配，希望平台补充更多生产环境部署案例。",
  });
  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const filteredJobs = useMemo(() => EMPLOYMENT_JOBS.filter((job) => {
    const keyword = search.trim().toLowerCase();
    const matchesKeyword = !keyword || [job.title, job.company, job.city, ...job.skills]
      .some((value) => value.toLowerCase().includes(keyword));
    const matchesCity = city === "全部城市" || job.city === city;
    const matchesType = jobType === "全部类型" || job.jobType === jobType;
    const matchesScore = matchFilter === "全部匹配度"
      || (matchFilter === "90%以上" && job.match >= 90)
      || (matchFilter === "75%–89%" && job.match >= 75 && job.match < 90)
      || (matchFilter === "75%以下" && job.match < 75);
    return matchesKeyword && matchesCity && matchesType && matchesScore;
  }), [city, jobType, matchFilter, search]);

  const hasApplied = (jobId: number) => applications.some((item) => item.jobId === jobId);

  const applyToJob = (job: EmploymentJob, source: EmploymentApplication["source"] = "自主投递") => {
    if (hasApplied(job.id)) {
      showToast("该岗位已经进入你的求职记录");
      return;
    }
    setApplications((items) => [{
      id: Date.now(),
      jobId: job.id,
      studentName: "李明",
      source,
      stage: "已投递",
      appliedAt: "2026.09.28",
      nextAction: "等待企业查看人才档案",
    }, ...items]);
    setSelectedJob(null);
    showToast(`已成功投递「${job.title}」，企业将收到你的授权档案`);
  };

  const inviteJobs = [EMPLOYMENT_JOBS[0], EMPLOYMENT_JOBS[2]];

  return (
    <div className="min-h-full bg-[#f5f6f8] p-4 text-[#1f2937] md:p-6">
      {toast && (
        <div className="fixed left-1/2 top-20 z-[500] flex -translate-x-1/2 items-center gap-2 rounded-[4px] bg-[#1f2937] px-4 py-2.5 text-xs font-medium text-white shadow-xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />{toast}
        </div>
      )}

      <div className="mx-auto max-w-[1440px] space-y-5">
        <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2563eb]"><BriefcaseBusiness className="h-4 w-4" />产教协同就业服务</div>
            <h1 className="mt-2 text-2xl font-bold text-[#111827]">需求大厅</h1>
            <p className="mt-1 text-sm text-[#6b7280]">发现真实企业岗位，查看人岗匹配依据，并使用学习成果完成可信投递。</p>
          </div>
          <div className="flex items-center gap-2 rounded-[4px] border border-blue-100 bg-blue-50 px-3 py-2 text-xs text-blue-700">
            <Sparkles className="h-4 w-4" />你的能力档案本周新增匹配岗位 3 个
          </div>
        </header>

        <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {[
            { label: "在招岗位", value: EMPLOYMENT_JOBS.length, note: "全部为认证企业", icon: BriefcaseBusiness, tone: "bg-blue-50 text-blue-600" },
            { label: "高匹配岗位", value: EMPLOYMENT_JOBS.filter((job) => job.match >= 85).length, note: "匹配度 85% 以上", icon: Target, tone: "bg-emerald-50 text-emerald-600" },
            { label: "我的投递", value: applications.length, note: "1 个进入面试", icon: Send, tone: "bg-violet-50 text-violet-600" },
            { label: "企业邀约", value: inviteJobs.length, note: "待确认 2 个", icon: BellRing, tone: "bg-amber-50 text-amber-600" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-[4px] border border-[#e5e7eb] bg-white p-4 shadow-sm">
              <div><div className="text-xs text-[#6b7280]">{item.label}</div><div className="mt-1.5 text-2xl font-bold text-[#111827]">{item.value}</div><div className="mt-1 text-[10px] text-[#9ca3af]">{item.note}</div></div>
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-[4px]", item.tone)}><item.icon className="h-5 w-5" /></div>
            </div>
          ))}
        </section>

        <section className="overflow-hidden rounded-[4px] border border-[#e5e7eb] bg-white shadow-sm">
          <div className="flex overflow-x-auto border-b border-[#e5e7eb] px-3">
            {[
              { key: "jobs" as const, label: "岗位大厅", icon: BriefcaseBusiness, count: EMPLOYMENT_JOBS.length },
              { key: "applications" as const, label: "我的投递", icon: FileCheck2, count: applications.length },
              { key: "invites" as const, label: "企业邀约", icon: BellRing, count: inviteJobs.length },
              { key: "feedback" as const, label: "入职反馈", icon: MessageSquareText, count: feedbackSubmitted ? 0 : 1 },
            ].map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={cn("relative flex h-12 shrink-0 items-center gap-2 px-4 text-sm font-medium", activeTab === tab.key ? "text-[#2563eb]" : "text-[#6b7280] hover:text-[#111827]")}>
                <tab.icon className="h-4 w-4" />{tab.label}<span className={cn("rounded-full px-1.5 py-0.5 text-[10px]", activeTab === tab.key ? "bg-blue-50 text-blue-600" : "bg-[#f3f4f6]")}>{tab.count}</span>
                {activeTab === tab.key && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-[#3b82f6]" />}
              </button>
            ))}
          </div>

          {activeTab === "jobs" && (
            <div className="bg-[#f8f9fb] p-4">
              <div className="mb-4 flex flex-col gap-2 rounded-[4px] border border-[#e5e7eb] bg-white p-3 lg:flex-row lg:items-center">
                <div className="relative min-w-[260px] flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="搜索岗位、企业、城市或技能" className="h-9 rounded-[4px] pl-9 text-xs" /></div>
                {[{ value: city, set: setCity, options: ["全部城市", "南京", "上海", "苏州", "杭州"] }, { value: jobType, set: setJobType, options: ["全部类型", "校招", "实习", "社招"] }, { value: matchFilter, set: setMatchFilter, options: ["全部匹配度", "90%以上", "75%–89%", "75%以下"] }].map((select, index) => (
                  <select key={index} value={select.value} onChange={(event) => select.set(event.target.value)} className="h-9 rounded-[4px] border border-[#dfe3e8] bg-white px-3 text-xs text-[#4b5563] outline-none focus:border-[#3b82f6]">{select.options.map((option) => <option key={option}>{option}</option>)}</select>
                ))}
                <Button variant="outline" className="h-9 rounded-[4px] text-xs"><Filter className="h-4 w-4" />更多筛选</Button>
              </div>

              <div className="mb-3 flex items-center justify-between text-xs"><span className="text-[#6b7280]">共找到 <strong className="text-[#2563eb]">{filteredJobs.length}</strong> 个岗位</span><span className="text-[#9ca3af]">默认按人岗匹配度排序</span></div>
              <div className="grid gap-4 xl:grid-cols-2">
                {filteredJobs.map((job) => (
                  <article key={job.id} className="rounded-[4px] border border-[#e5e7eb] bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] bg-[#edf3ff] text-sm font-bold text-[#2563eb]">{job.companyShort.slice(0, 2)}</div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2"><h2 className="text-base font-bold text-[#111827]">{job.title}</h2><span className="rounded-[3px] bg-blue-50 px-1.5 py-0.5 text-[10px] text-blue-700">{job.jobType}</span></div>
                        <div className="mt-1 flex items-center gap-1 text-xs text-[#6b7280]">{job.company}<BadgeCheck className="h-3.5 w-3.5 text-[#3b82f6]" /></div>
                      </div>
                      <button onClick={() => setFavoriteIds((ids) => ids.includes(job.id) ? ids.filter((id) => id !== job.id) : [...ids, job.id])} className="p-1 text-[#9ca3af] hover:text-rose-500" aria-label="收藏岗位"><Heart className={cn("h-4.5 w-4.5", favoriteIds.includes(job.id) && "fill-rose-500 text-rose-500")} /></button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#4b5563]"><span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-[#9ca3af]" />{job.city}</span><strong className="text-[#f04438]">{job.salary}</strong><span>{job.education}</span><span>招聘 {job.headcount} 人</span></div>
                    <p className="mt-3 line-clamp-2 text-xs leading-5 text-[#6b7280]">{job.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">{job.skills.map((skill) => <span key={skill} className={cn("rounded-[3px] border px-2 py-1 text-[10px]", job.matchedSkills.includes(skill) ? "border-emerald-100 bg-emerald-50 text-emerald-700" : "border-[#e5e7eb] bg-[#f9fafb] text-[#6b7280]")}>{skill}</span>)}</div>

                    <div className="mt-4 flex flex-col gap-3 border-t border-[#eef0f3] pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2"><span className={cn("text-xl font-bold", job.match >= 85 ? "text-emerald-600" : job.match >= 75 ? "text-blue-600" : "text-amber-600")}>{job.match}%</span><span className="text-xs font-medium text-[#4b5563]">人岗匹配</span></div>
                        <div className="mt-1 text-[10px] text-[#9ca3af]">{job.applicants} 人已投递 · {job.deadline} 截止</div>
                      </div>
                      <div className="flex gap-2"><Button variant="outline" onClick={() => setSelectedJob(job)} className="h-8 rounded-[4px] text-xs">查看详情</Button><Button disabled={hasApplied(job.id)} onClick={() => applyToJob(job)} className="h-8 rounded-[4px] bg-[#3b82f6] text-xs text-white hover:bg-[#2563eb]">{hasApplied(job.id) ? "已进入流程" : "立即投递"}</Button></div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === "applications" && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-xs">
                <thead className="border-b border-[#e5e7eb] bg-[#fafafa] text-[#6b7280]"><tr><th className="px-5 py-3 font-medium">岗位与企业</th><th className="px-4 py-3 font-medium">投递方式</th><th className="px-4 py-3 font-medium">投递时间</th><th className="px-4 py-3 font-medium">当前进度</th><th className="px-4 py-3 font-medium">下一步</th><th className="px-5 py-3 text-right font-medium">操作</th></tr></thead>
                <tbody className="divide-y divide-[#eef0f3]">{applications.map((application) => { const job = EMPLOYMENT_JOBS.find((item) => item.id === application.jobId); return job ? <tr key={application.id} className="hover:bg-[#fafcff]"><td className="px-5 py-4"><div className="font-semibold text-[#111827]">{job.title}</div><div className="mt-1 text-[11px] text-[#9ca3af]">{job.company} · {job.city}</div></td><td className="px-4 py-4 text-[#4b5563]">{application.source}</td><td className="px-4 py-4 font-mono text-[#6b7280]">{application.appliedAt}</td><td className="px-4 py-4"><span className={cn("rounded-[3px] px-2 py-1 text-[11px] font-medium", stageTone[application.stage])}>{application.stage}</span></td><td className="px-4 py-4 text-[#4b5563]">{application.nextAction}</td><td className="px-5 py-4 text-right"><button onClick={() => setSelectedJob(job)} className="font-medium text-[#2563eb] hover:underline">查看岗位</button></td></tr> : null; })}</tbody>
              </table>
            </div>
          )}

          {activeTab === "invites" && (
            <div className="grid gap-4 bg-[#f8f9fb] p-4 lg:grid-cols-2">
              {inviteJobs.map((job, index) => {
                const accepted = acceptedInvites.includes(job.id);
                return <article key={job.id} className="rounded-[4px] border border-[#e5e7eb] bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className="rounded-[3px] bg-violet-50 px-2 py-1 text-[10px] font-medium text-violet-700">{index === 0 ? "企业主动邀约" : "教师推荐邀约"}</span><span className="text-[10px] text-[#9ca3af]">{index === 0 ? "今天 10:24" : "昨天 16:10"}</span></div><h3 className="mt-4 text-base font-bold text-[#111827]">{job.title}</h3><div className="mt-1 flex items-center gap-1 text-xs text-[#6b7280]">{job.company}<BadgeCheck className="h-3.5 w-3.5 text-blue-500" /></div><div className="mt-4 rounded-[4px] bg-[#f8fafc] p-3 text-xs leading-5 text-[#4b5563]">{index === 0 ? "你的RAG项目成果与岗位要求高度一致，企业希望与你进一步沟通。" : "张老师推荐：云原生技能覆盖完整，实训项目表现稳定。"}</div><div className="mt-4 flex items-center justify-between"><span className="text-xs"><strong className="text-emerald-600">{job.match}%</strong><span className="ml-1 text-[#6b7280]">匹配</span></span>{accepted ? <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600"><CheckCircle2 className="h-4 w-4" />已接受并授权档案</span> : <div className="flex gap-2"><Button variant="outline" className="h-8 rounded-[4px] text-xs" onClick={() => showToast("已婉拒该岗位邀约")}>暂不考虑</Button><Button className="h-8 rounded-[4px] bg-[#3b82f6] text-xs text-white" onClick={() => { setAcceptedInvites((ids) => [...ids, job.id]); applyToJob(job, index === 0 ? "企业邀约" : "教师推荐"); }}>接受邀约</Button></div>}</div></article>;
              })}
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="bg-[#f8f9fb] p-4">
              <div className="grid gap-4 lg:grid-cols-[1.45fr_0.75fr]">
                <section className="rounded-[4px] border border-[#e5e7eb] bg-white p-5">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><div className="flex items-center gap-2"><span className={cn("rounded-[3px] px-2 py-1 text-[10px] font-medium", feedbackSubmitted ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700")}>{feedbackSubmitted ? "已完成" : "待反馈"}</span><span className="text-[10px] text-[#9ca3af]">入职满一个月</span></div><h2 className="mt-3 text-lg font-bold text-[#111827]">AI 应用开发工程师</h2><p className="mt-1 text-sm text-[#6b7280]">华启数字科技有限公司 · 南京</p></div><div className="text-left sm:text-right"><div className="text-[10px] text-[#9ca3af]">反馈截止日期</div><div className="mt-1 font-mono text-sm font-semibold text-[#111827]">2026.10.05</div></div></div>
                  <div className="mt-5 grid grid-cols-2 gap-3 border-y border-[#eef0f3] py-4 text-xs sm:grid-cols-4"><div><span className="block text-[#9ca3af]">入职日期</span><strong className="mt-1 block text-[#374151]">2026.08.29</strong></div><div><span className="block text-[#9ca3af]">实际薪资</span><strong className="mt-1 block text-[#374151]">18K–22K</strong></div><div><span className="block text-[#9ca3af]">学生反馈</span><strong className={cn("mt-1 block", feedbackSubmitted ? "text-emerald-600" : "text-amber-600")}>{feedbackSubmitted ? "已提交" : "待提交"}</strong></div><div><span className="block text-[#9ca3af]">企业评价</span><strong className="mt-1 block text-emerald-600">已提交</strong></div></div>
                  {feedbackSubmitted ? <div className="mt-5 rounded-[4px] border border-emerald-100 bg-emerald-50 p-4"><div className="flex items-center gap-2 text-sm font-semibold text-emerald-800"><CheckCircle2 className="h-4 w-4" />一个月入职反馈已完成</div><p className="mt-2 text-xs leading-5 text-emerald-700">你的反馈已同步给跟进教师，并将用于改进课程培养和岗位匹配。</p></div> : <div className="mt-5 flex items-center justify-between gap-4 rounded-[4px] border border-blue-100 bg-blue-50 p-4"><div><div className="text-sm font-semibold text-blue-900">请完成入职一个月反馈</div><p className="mt-1 text-xs text-blue-700">预计用时 3 分钟，反馈仅向授权教师和企业管理员开放。</p></div><Button onClick={() => setFeedbackOpen(true)} className="h-9 shrink-0 rounded-[4px] bg-[#3b82f6] text-xs text-white">填写反馈</Button></div>}
                </section>
                <aside className="rounded-[4px] border border-[#e5e7eb] bg-white p-5"><h3 className="text-sm font-bold text-[#111827]">反馈说明</h3><div className="mt-4 space-y-4">{[{ icon: ShieldCheck, title: "隐私保护", text: "薪资与个人评价仅用于就业服务，不在公开页面展示。" }, { icon: MessageSquareText, title: "教师协助", text: "如遇薪资、岗位或适应问题，可在反馈中申请教师介入。" }, { icon: GraduationCap, title: "培养改进", text: "能力差距将用于优化课程和实训项目。" }].map((item) => <div key={item.title} className="flex gap-3"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-[#f3f6fa] text-[#3b82f6]"><item.icon className="h-4 w-4" /></div><div><div className="text-xs font-semibold text-[#374151]">{item.title}</div><p className="mt-1 text-[11px] leading-5 text-[#6b7280]">{item.text}</p></div></div>)}</div></aside>
              </div>
            </div>
          )}
        </section>
      </div>

      {selectedJob && (
        <div className="fixed inset-0 z-[400] flex justify-end bg-black/45" onMouseDown={(event) => event.currentTarget === event.target && setSelectedJob(null)}>
          <aside className="h-full w-full max-w-[620px] overflow-y-auto bg-white shadow-2xl">
            <header className="sticky top-0 z-10 flex items-start justify-between border-b border-[#e5e7eb] bg-white px-5 py-4"><div><div className="flex items-center gap-2"><h2 className="text-lg font-bold text-[#111827]">{selectedJob.title}</h2><span className="rounded-[3px] bg-blue-50 px-2 py-1 text-[10px] text-blue-700">{selectedJob.jobType}</span></div><p className="mt-1 flex items-center gap-1 text-xs text-[#6b7280]">{selectedJob.company}<BadgeCheck className="h-3.5 w-3.5 text-blue-500" /></p></div><button onClick={() => setSelectedJob(null)} className="rounded-[4px] p-1.5 text-[#6b7280] hover:bg-[#f3f4f6]" aria-label="关闭"><X className="h-5 w-5" /></button></header>
            <div className="space-y-6 p-5">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[{ label: "薪资", value: selectedJob.salary }, { label: "城市", value: selectedJob.city }, { label: "学历", value: selectedJob.education }, { label: "招聘", value: `${selectedJob.headcount} 人` }].map((item) => <div key={item.label} className="rounded-[4px] bg-[#f8fafc] p-3"><div className="text-[10px] text-[#9ca3af]">{item.label}</div><div className="mt-1 text-xs font-semibold text-[#374151]">{item.value}</div></div>)}</div>
              <section><h3 className="text-sm font-bold text-[#111827]">岗位职责</h3><div className="mt-3 space-y-2">{selectedJob.responsibilities.map((item, index) => <p key={item} className="flex gap-2 text-xs leading-5 text-[#4b5563]"><span className="text-[#3b82f6]">{index + 1}.</span>{item}</p>)}</div></section>
              <section><h3 className="text-sm font-bold text-[#111827]">任职能力</h3><div className="mt-3 flex flex-wrap gap-2">{selectedJob.skills.map((skill) => <span key={skill} className="rounded-[3px] border border-[#dbe5f5] bg-[#f5f8ff] px-2.5 py-1.5 text-xs text-[#2563eb]">{skill}</span>)}</div></section>
              <section className="rounded-[4px] border border-blue-100 bg-blue-50/50 p-4"><div className="flex items-center justify-between"><div><h3 className="text-sm font-bold text-[#111827]">我的匹配分析</h3><p className="mt-1 text-[11px] text-[#6b7280]">基于课程、项目、证书和求职意向综合计算</p></div><strong className="text-2xl text-emerald-600">{selectedJob.match}%</strong></div><div className="mt-4 grid gap-3 sm:grid-cols-3"><MatchColumn title="已满足" items={selectedJob.matchedSkills} tone="text-emerald-700 bg-emerald-50" /><MatchColumn title="部分满足" items={selectedJob.partialSkills} tone="text-blue-700 bg-blue-50" /><MatchColumn title="待提升" items={selectedJob.missingSkills} tone="text-amber-700 bg-amber-50" /></div></section>
              <section><h3 className="text-sm font-bold text-[#111827]">企业福利</h3><div className="mt-3 flex flex-wrap gap-2">{selectedJob.benefits.map((benefit) => <span key={benefit} className="rounded-[3px] bg-[#f3f4f6] px-2.5 py-1.5 text-xs text-[#4b5563]">{benefit}</span>)}</div></section>
            </div>
            <footer className="sticky bottom-0 flex items-center justify-between border-t border-[#e5e7eb] bg-white p-4"><span className="text-xs text-[#9ca3af]">截止 {selectedJob.deadline}</span><div className="flex gap-2"><Button variant="outline" className="h-9 rounded-[4px] text-xs" onClick={() => setFavoriteIds((ids) => [...new Set([...ids, selectedJob.id])])}><Heart className="h-4 w-4" />收藏</Button><Button disabled={hasApplied(selectedJob.id)} onClick={() => applyToJob(selectedJob)} className="h-9 rounded-[4px] bg-[#3b82f6] px-5 text-xs text-white">{hasApplied(selectedJob.id) ? "已进入流程" : "立即投递"}</Button></div></footer>
          </aside>
        </div>
      )}

      {feedbackOpen && (
        <div className="fixed inset-0 z-[420] flex items-center justify-center bg-black/50 p-4" onMouseDown={(event) => event.currentTarget === event.target && setFeedbackOpen(false)}>
          <form onSubmit={(event) => { event.preventDefault(); setFeedbackOpen(false); setFeedbackSubmitted(true); showToast("入职一个月反馈已提交，跟进教师将收到通知"); }} className="max-h-[90vh] w-full max-w-[680px] overflow-y-auto rounded-[4px] bg-white shadow-2xl">
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e5e7eb] bg-white px-5 py-4"><div><h2 className="text-base font-bold text-[#111827]">入职一个月反馈</h2><p className="mt-1 text-[11px] text-[#6b7280]">华启数字科技有限公司 · AI应用开发工程师</p></div><button type="button" onClick={() => setFeedbackOpen(false)} className="p-1.5 text-[#6b7280]"><X className="h-5 w-5" /></button></header>
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              <FeedbackSelect label="岗位匹配度" value={feedbackForm.match} onChange={(value) => setFeedbackForm({ ...feedbackForm, match: value })} options={["95", "85", "75", "60", "50"]} suffix="%" />
              <FeedbackSelect label="工作满意度" value={feedbackForm.satisfaction} onChange={(value) => setFeedbackForm({ ...feedbackForm, satisfaction: value })} options={["5", "4", "3", "2", "1"]} suffix="分" />
              <FeedbackSelect label="实际薪资是否与 Offer 一致" value={feedbackForm.salaryConsistent} onChange={(value) => setFeedbackForm({ ...feedbackForm, salaryConsistent: value })} options={["是", "部分一致", "否"]} />
              <FeedbackSelect label="课程和项目帮助程度" value={feedbackForm.courseUsefulness} onChange={(value) => setFeedbackForm({ ...feedbackForm, courseUsefulness: value })} options={["帮助非常大", "较大帮助", "一般", "帮助较少"]} />
              <label className="sm:col-span-2"><span className="mb-1.5 block text-xs font-medium text-[#374151]">当前仍需提升的技能</span><Input value={feedbackForm.skillGap} onChange={(event) => setFeedbackForm({ ...feedbackForm, skillGap: event.target.value })} className="h-9 rounded-[4px] text-xs" /></label>
              <FeedbackSelect label="是否需要教师协助" value={feedbackForm.needsHelp} onChange={(value) => setFeedbackForm({ ...feedbackForm, needsHelp: value })} options={["否", "是，需要岗位沟通", "是，需要能力辅导", "是，考虑重新求职"]} />
              <div className="hidden sm:block" />
              <label className="sm:col-span-2"><span className="mb-1.5 block text-xs font-medium text-[#374151]">补充反馈</span><Textarea value={feedbackForm.comment} onChange={(event) => setFeedbackForm({ ...feedbackForm, comment: event.target.value })} className="min-h-24 rounded-[4px] text-xs" /></label>
              <label className="sm:col-span-2 flex items-start gap-2 rounded-[4px] bg-[#f8fafc] p-3 text-[11px] leading-5 text-[#6b7280]"><input required type="checkbox" className="mt-0.5 h-4 w-4 accent-[#3b82f6]" />我确认以上反馈真实，并同意将反馈用于教师就业跟进和课程培养改进。</label>
            </div>
            <footer className="sticky bottom-0 flex justify-end gap-2 border-t border-[#e5e7eb] bg-white px-5 py-4"><Button type="button" variant="outline" onClick={() => setFeedbackOpen(false)} className="h-9 rounded-[4px] text-xs">取消</Button><Button type="submit" className="h-9 rounded-[4px] bg-[#3b82f6] px-5 text-xs text-white">提交反馈</Button></footer>
          </form>
        </div>
      )}
    </div>
  );
}

function MatchColumn({ title, items, tone }: { title: string; items: string[]; tone: string }) {
  return <div><div className="text-[10px] font-semibold text-[#6b7280]">{title}</div><div className="mt-2 space-y-1.5">{items.map((item) => <div key={item} className={cn("rounded-[3px] px-2 py-1.5 text-[10px]", tone)}>{item}</div>)}</div></div>;
}

function FeedbackSelect({ label, value, onChange, options, suffix }: { label: string; value: string; onChange: (value: string) => void; options: string[]; suffix?: string }) {
  return <label><span className="mb-1.5 block text-xs font-medium text-[#374151]">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="h-9 w-full rounded-[4px] border border-[#dfe3e8] bg-white px-3 text-xs outline-none focus:border-[#3b82f6]">{options.map((option) => <option key={option} value={option}>{option}{suffix ? ` ${suffix}` : ""}</option>)}</select></label>;
}
