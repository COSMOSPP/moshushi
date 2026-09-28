import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  FileCheck2,
  Filter,
  MessageSquareText,
  Search,
  Send,
  ShieldCheck,
  Target,
  UserCheck,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  EMPLOYMENT_JOBS,
  EMPLOYMENT_STUDENTS,
  INITIAL_FEEDBACKS,
  INITIAL_RECOMMENDATIONS,
  type EmploymentFeedback,
  type EmploymentJob,
  type EmploymentStudent,
  type RecommendationStage,
  type TeacherRecommendation,
} from "@/data/employmentData";
import { cn } from "@/lib/utils";

type EmploymentTab = "overview" | "students" | "recommend" | "records" | "followup";

const panelClass = "rounded-[4px] border border-[#e5e7eb] bg-white shadow-sm";

const recommendationTone: Record<RecommendationStage, string> = {
  待学生确认: "bg-amber-50 text-amber-700",
  学生已授权: "bg-blue-50 text-blue-700",
  企业已查看: "bg-cyan-50 text-cyan-700",
  已邀约: "bg-violet-50 text-violet-700",
  面试中: "bg-purple-50 text-purple-700",
  Offer: "bg-orange-50 text-orange-700",
  已入职: "bg-emerald-50 text-emerald-700",
};

export default function TeacherEmployment() {
  const [activeTab, setActiveTab] = useState<EmploymentTab>("overview");
  const [students, setStudents] = useState(EMPLOYMENT_STUDENTS);
  const [recommendations, setRecommendations] = useState(INITIAL_RECOMMENDATIONS);
  const [feedbacks, setFeedbacks] = useState(INITIAL_FEEDBACKS);
  const [studentSearch, setStudentSearch] = useState("");
  const [studentStage, setStudentStage] = useState("全部阶段");
  const [selectedJob, setSelectedJob] = useState<EmploymentJob>(EMPLOYMENT_JOBS[0]);
  const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);
  const [recommendOpen, setRecommendOpen] = useState(false);
  const [recommendReason, setRecommendReason] = useState("该学员已完成岗位相关课程和企业项目实训，专业能力、项目成果与求职意向均与岗位高度匹配。建议企业优先安排沟通。");
  const [selectedFeedback, setSelectedFeedback] = useState<EmploymentFeedback | null>(null);
  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const filteredStudents = useMemo(() => {
    const keyword = studentSearch.trim().toLowerCase();
    return students.filter((student) => {
      const matchesSearch = !keyword || [student.name, student.studentNo, student.className, student.direction]
        .some((value) => value.toLowerCase().includes(keyword));
      const matchesStage = studentStage === "全部阶段" || student.jobStatus === studentStage;
      return matchesSearch && matchesStage;
    });
  }, [studentSearch, studentStage, students]);

  const matchedStudents = useMemo(() => students
    .map((student) => ({ ...student, match: student.targetJobId === selectedJob.id ? student.match : Math.max(58, student.match - 12) }))
    .sort((a, b) => b.match - a.match), [selectedJob.id, students]);

  const selectedStudents = students.filter((student) => selectedStudentIds.includes(student.id));

  const submitRecommendation = () => {
    const newRecords: TeacherRecommendation[] = selectedStudents.map((student, index) => ({
      id: Date.now() + index,
      jobId: selectedJob.id,
      studentId: student.id,
      teacher: "张老师",
      reason: recommendReason,
      submittedAt: "2026.09.28",
      stage: "待学生确认",
    }));
    setRecommendations((records) => [...newRecords, ...records]);
    setStudents((items) => items.map((student) => selectedStudentIds.includes(student.id)
      ? { ...student, recommendations: student.recommendations + 1, jobStatus: student.jobStatus === "未启动求职" ? "求职准备中" : "已投递/已推荐" }
      : student));
    setSelectedStudentIds([]);
    setRecommendOpen(false);
    setActiveTab("records");
    showToast(`已提交 ${newRecords.length} 份岗位推荐，等待学员确认授权`);
  };

  const stats = {
    seeking: students.filter((student) => ["求职准备中", "已投递/已推荐"].includes(student.jobStatus)).length + 38,
    interview: students.filter((student) => student.jobStatus === "面试中").length + 11,
    offer: students.filter((student) => student.jobStatus === "Offer").length + 7,
    employed: students.filter((student) => student.jobStatus === "已入职").length + 26,
    risk: students.filter((student) => student.risk).length + feedbacks.filter((feedback) => feedback.status === "需教师跟进").length,
  };

  return (
    <div className="-m-6 min-h-full bg-[#f5f6f8] p-6 text-[#1f2937]">
      {toast && <div className="fixed left-1/2 top-16 z-[500] flex -translate-x-1/2 items-center gap-2 rounded-[4px] bg-[#1f2937] px-4 py-2.5 text-xs font-medium text-white shadow-xl"><CheckCircle2 className="h-4 w-4 text-emerald-400" />{toast}</div>}
      <div className="mx-auto max-w-[1480px] space-y-5">
        <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-blue-50 text-[#3b82f6]"><BriefcaseBusiness className="h-5 w-5" /></div>
            <div><h1 className="text-xl font-bold text-[#111827]">就业服务</h1><p className="mt-1 text-sm text-[#6b7280]">跟踪学员求职进展，匹配企业岗位并完成入职一个月回访。</p></div>
          </div>
          <div className="flex gap-2"><Button variant="outline" className="h-9 rounded-[4px] bg-white text-xs" onClick={() => setActiveTab("followup")}><MessageSquareText className="h-4 w-4" />待回访 {feedbacks.filter((item) => item.status !== "已完成" && item.status !== "未到回访时间").length}</Button><Button className="h-9 rounded-[4px] bg-[#3b82f6] text-xs text-white" onClick={() => setActiveTab("recommend")}><Send className="h-4 w-4" />推荐学员</Button></div>
        </header>

        <section className="grid grid-cols-2 gap-3 xl:grid-cols-5">
          {[
            { label: "求职中学员", value: stats.seeking, unit: "人", icon: Users, tone: "bg-blue-50 text-blue-600" },
            { label: "进入面试", value: stats.interview, unit: "人", icon: CalendarDays, tone: "bg-violet-50 text-violet-600" },
            { label: "获得 Offer", value: stats.offer, unit: "人", icon: WalletCards, tone: "bg-orange-50 text-orange-600" },
            { label: "正式入职", value: stats.employed, unit: "人", icon: UserCheck, tone: "bg-emerald-50 text-emerald-600" },
            { label: "需要跟进", value: stats.risk, unit: "人", icon: AlertTriangle, tone: "bg-rose-50 text-rose-600" },
          ].map((item) => <div key={item.label} className={cn(panelClass, "flex items-center justify-between p-4")}><div><div className="text-xs text-[#6b7280]">{item.label}</div><div className="mt-1.5 text-2xl font-bold text-[#111827]">{item.value}<span className="ml-1 text-[10px] font-normal text-[#9ca3af]">{item.unit}</span></div></div><div className={cn("flex h-10 w-10 items-center justify-center rounded-[4px]", item.tone)}><item.icon className="h-5 w-5" /></div></div>)}
        </section>

        <section className={cn(panelClass, "overflow-hidden")}>
          <div className="flex overflow-x-auto border-b border-[#e5e7eb] px-3">
            {[
              { key: "overview" as const, label: "就业概览", icon: BarChart3 },
              { key: "students" as const, label: "学员求职进展", icon: Users },
              { key: "recommend" as const, label: "岗位推荐", icon: Target },
              { key: "records" as const, label: "推荐记录", icon: FileCheck2 },
              { key: "followup" as const, label: "入职回访", icon: MessageSquareText },
            ].map((tab) => <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={cn("relative flex h-12 shrink-0 items-center gap-2 px-4 text-sm font-medium", activeTab === tab.key ? "text-[#2563eb]" : "text-[#6b7280] hover:text-[#111827]")}><tab.icon className="h-4 w-4" />{tab.label}{activeTab === tab.key && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-[#3b82f6]" />}</button>)}
          </div>

          {activeTab === "overview" && <OverviewPanel students={students} feedbacks={feedbacks} onChangeTab={setActiveTab} />}

          {activeTab === "students" && (
            <div>
              <div className="flex flex-col gap-3 border-b border-[#eef0f3] p-4 lg:flex-row lg:items-center lg:justify-between"><div className="flex flex-1 flex-col gap-2 sm:flex-row"><div className="relative max-w-[420px] flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" /><Input value={studentSearch} onChange={(event) => setStudentSearch(event.target.value)} placeholder="搜索学员、班级或求职方向" className="h-9 rounded-[4px] pl-9 text-xs" /></div><select value={studentStage} onChange={(event) => setStudentStage(event.target.value)} className="h-9 rounded-[4px] border border-[#dfe3e8] bg-white px-3 text-xs text-[#4b5563] outline-none">{["全部阶段", "未启动求职", "求职准备中", "已投递/已推荐", "面试中", "Offer", "已入职"].map((item) => <option key={item}>{item}</option>)}</select></div><Button variant="outline" className="h-9 rounded-[4px] text-xs"><Filter className="h-4 w-4" />更多筛选</Button></div>
              <div className="overflow-x-auto"><table className="w-full min-w-[1150px] text-left text-xs"><thead className="border-b border-[#e5e7eb] bg-[#fafafa] text-[#6b7280]"><tr><th className="px-5 py-3 font-medium">学员档案</th><th className="px-4 py-3 font-medium">求职意向</th><th className="px-4 py-3 font-medium">求职材料</th><th className="px-4 py-3 font-medium">投递 / 推荐</th><th className="px-4 py-3 font-medium">当前阶段</th><th className="px-4 py-3 font-medium">最近跟进</th><th className="px-5 py-3 text-right font-medium">操作</th></tr></thead><tbody className="divide-y divide-[#eef0f3]">{filteredStudents.map((student) => <tr key={student.id} className="hover:bg-[#fafcff]"><td className="px-5 py-4"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-700">{student.name.slice(-1)}</div><div><div className="flex items-center gap-1.5 font-semibold text-[#111827]">{student.name}{student.risk && <CircleAlert className="h-3.5 w-3.5 text-rose-500" />}</div><div className="mt-1 text-[10px] text-[#9ca3af]">{student.studentNo} · {student.className}</div></div></div></td><td className="px-4 py-4"><div className="font-medium text-[#374151]">{student.direction}</div><div className="mt-1 text-[10px] text-[#9ca3af]">{student.city} · {student.expectedSalary}</div></td><td className="px-4 py-4"><div className="flex items-center gap-2"><div className="h-1.5 w-16 rounded-full bg-[#e5e7eb]"><div className="h-full rounded-full bg-[#3b82f6]" style={{ width: `${student.resumeProgress}%` }} /></div><span>{student.resumeProgress}%</span></div><div className="mt-1 text-[10px] text-[#9ca3af]">{student.projects} 个项目 · {student.certificates} 项证书</div></td><td className="px-4 py-4 text-[#4b5563]">{student.applications} 次投递 · {student.recommendations} 次推荐</td><td className="px-4 py-4"><JobStatus status={student.jobStatus} /></td><td className="px-4 py-4 text-[#6b7280]">{student.lastFollowUp}</td><td className="px-5 py-4 text-right"><button onClick={() => { setSelectedStudentIds([student.id]); setSelectedJob(EMPLOYMENT_JOBS.find((job) => job.id === student.targetJobId) ?? EMPLOYMENT_JOBS[0]); setRecommendOpen(true); }} className="font-medium text-[#2563eb] hover:underline">推荐岗位</button><button onClick={() => showToast(`已打开 ${student.name} 的就业档案`)} className="ml-4 text-[#6b7280] hover:text-[#111827]">查看档案</button></td></tr>)}</tbody></table></div>
            </div>
          )}

          {activeTab === "recommend" && (
            <div className="grid min-h-[620px] lg:grid-cols-[340px_1fr]">
              <aside className="border-r border-[#e5e7eb] bg-[#fafbfc] p-4"><div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" /><Input placeholder="搜索企业岗位" className="h-9 rounded-[4px] bg-white pl-9 text-xs" /></div><div className="mt-4 space-y-2">{EMPLOYMENT_JOBS.map((job) => <button key={job.id} onClick={() => { setSelectedJob(job); setSelectedStudentIds([]); }} className={cn("w-full rounded-[4px] border p-3 text-left transition-colors", selectedJob.id === job.id ? "border-blue-300 bg-white shadow-sm" : "border-transparent hover:bg-white")}><div className="flex items-start justify-between gap-2"><div className="text-xs font-semibold text-[#111827]">{job.title}</div><span className="shrink-0 text-[10px] font-medium text-emerald-600">{job.headcount}人</span></div><div className="mt-1 truncate text-[10px] text-[#6b7280]">{job.company}</div><div className="mt-2 flex items-center justify-between text-[10px] text-[#9ca3af]"><span>{job.city} · {job.salary}</span><span>{job.deadline}截止</span></div></button>)}</div></aside>
              <div className="min-w-0"><div className="flex flex-col gap-3 border-b border-[#e5e7eb] p-4 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2"><h2 className="text-base font-bold text-[#111827]">{selectedJob.title}</h2><span className="rounded-[3px] bg-blue-50 px-2 py-1 text-[10px] text-blue-700">{selectedJob.jobType}</span></div><p className="mt-1 text-xs text-[#6b7280]">{selectedJob.company} · {selectedJob.city} · {selectedJob.salary}</p></div><Button disabled={selectedStudentIds.length === 0} onClick={() => setRecommendOpen(true)} className="h-9 rounded-[4px] bg-[#3b82f6] text-xs text-white"><Send className="h-4 w-4" />推荐已选 {selectedStudentIds.length} 人</Button></div>
                <div className="border-b border-blue-100 bg-blue-50/60 px-4 py-3 text-xs text-blue-800"><span className="font-semibold">岗位能力：</span>{selectedJob.skills.join("、")}　<span className="ml-2 text-blue-600">系统已根据课程、项目、证书和求职意向计算匹配度</span></div>
                <div className="overflow-x-auto"><table className="w-full min-w-[800px] text-left text-xs"><thead className="border-b border-[#e5e7eb] bg-[#fafafa] text-[#6b7280]"><tr><th className="w-12 px-4 py-3"></th><th className="px-3 py-3 font-medium">匹配人才</th><th className="px-3 py-3 font-medium">核心能力</th><th className="px-3 py-3 font-medium">成果证明</th><th className="px-3 py-3 font-medium">人岗匹配</th><th className="px-4 py-3 text-right font-medium">操作</th></tr></thead><tbody className="divide-y divide-[#eef0f3]">{matchedStudents.map((student) => <tr key={student.id} className="hover:bg-[#fafcff]"><td className="px-4 py-4"><input type="checkbox" checked={selectedStudentIds.includes(student.id)} onChange={() => setSelectedStudentIds((ids) => ids.includes(student.id) ? ids.filter((id) => id !== student.id) : [...ids, student.id])} className="h-4 w-4 accent-[#3b82f6]" /></td><td className="px-3 py-4"><div className="font-semibold text-[#111827]">{student.name}</div><div className="mt-1 text-[10px] text-[#9ca3af]">{student.className} · {student.level}</div></td><td className="px-3 py-4"><div className="flex max-w-[230px] flex-wrap gap-1">{student.skills.slice(0, 3).map((skill) => <span key={skill} className="rounded-[3px] bg-[#f3f4f6] px-1.5 py-1 text-[10px] text-[#4b5563]">{skill}</span>)}</div></td><td className="px-3 py-4 text-[#4b5563]">{student.projects} 个项目 · {student.certificates} 项认证</td><td className="px-3 py-4"><strong className={cn("text-lg", student.match >= 90 ? "text-emerald-600" : student.match >= 75 ? "text-blue-600" : "text-amber-600")}>{student.match}%</strong><div className="mt-1 text-[10px] text-[#9ca3af]">{student.city}意向</div></td><td className="px-4 py-4 text-right"><button onClick={() => { setSelectedStudentIds([student.id]); setRecommendOpen(true); }} className="font-medium text-[#2563eb] hover:underline">立即推荐</button></td></tr>)}</tbody></table></div>
              </div>
            </div>
          )}

          {activeTab === "records" && <RecommendationRecords records={recommendations} />}

          {activeTab === "followup" && (
            <div>
              <div className="flex items-center justify-between border-b border-[#eef0f3] p-4"><div><h2 className="text-sm font-bold text-[#111827]">入职一个月回访</h2><p className="mt-1 text-[11px] text-[#6b7280]">学生与企业各完成一次反馈，异常情况自动进入教师跟进。</p></div><span className="text-xs text-[#9ca3af]">共 {feedbacks.length} 条入职档案</span></div>
              <div className="overflow-x-auto"><table className="w-full min-w-[1100px] text-left text-xs"><thead className="border-b border-[#e5e7eb] bg-[#fafafa] text-[#6b7280]"><tr><th className="px-5 py-3 font-medium">学员与入职信息</th><th className="px-4 py-3 font-medium">回访时间</th><th className="px-4 py-3 font-medium">学生反馈</th><th className="px-4 py-3 font-medium">企业评价</th><th className="px-4 py-3 font-medium">岗位匹配</th><th className="px-4 py-3 font-medium">风险状态</th><th className="px-5 py-3 text-right font-medium">操作</th></tr></thead><tbody className="divide-y divide-[#eef0f3]">{feedbacks.map((feedback) => <tr key={feedback.id} className="hover:bg-[#fafcff]"><td className="px-5 py-4"><div className="font-semibold text-[#111827]">{feedback.studentName}</div><div className="mt-1 text-[10px] text-[#9ca3af]">{feedback.company} · {feedback.jobTitle}</div><div className="mt-1 text-[10px] text-[#9ca3af]">入职 {feedback.onboardDate}</div></td><td className="px-4 py-4"><div className="font-mono text-[#4b5563]">{feedback.feedbackOpenDate}</div><div className="mt-1 text-[10px] text-[#9ca3af]">截止 {feedback.deadline}</div></td><td className="px-4 py-4"><SubmitStatus submitted={feedback.studentSubmitted} /></td><td className="px-4 py-4"><SubmitStatus submitted={feedback.enterpriseSubmitted} /></td><td className="px-4 py-4">{feedback.matchScore ? <strong className={cn("text-lg", feedback.matchScore >= 80 ? "text-emerald-600" : feedback.matchScore >= 60 ? "text-blue-600" : "text-rose-600")}>{feedback.matchScore}%</strong> : <span className="text-[#9ca3af]">--</span>}</td><td className="px-4 py-4"><FeedbackStatus status={feedback.status} /></td><td className="px-5 py-4 text-right"><button onClick={() => setSelectedFeedback(feedback)} className="font-medium text-[#2563eb] hover:underline">查看回访</button></td></tr>)}</tbody></table></div>
            </div>
          )}
        </section>
      </div>

      {recommendOpen && (
        <div className="fixed inset-0 z-[420] flex items-center justify-center bg-black/50 p-4" onMouseDown={(event) => event.currentTarget === event.target && setRecommendOpen(false)}>
          <div className="w-full max-w-[620px] rounded-[4px] bg-white shadow-2xl"><header className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-4"><div><h2 className="text-base font-bold text-[#111827]">推荐学员入职企业</h2><p className="mt-1 text-[11px] text-[#6b7280]">推荐将先发送给学员确认，授权后企业才能查看完整档案。</p></div><button onClick={() => setRecommendOpen(false)} className="p-1.5 text-[#6b7280]"><X className="h-5 w-5" /></button></header><div className="space-y-5 p-5"><div className="rounded-[4px] border border-blue-100 bg-blue-50/60 p-4"><div className="text-xs font-semibold text-blue-900">{selectedJob.title}</div><div className="mt-1 text-[11px] text-blue-700">{selectedJob.company} · {selectedJob.city} · {selectedJob.salary}</div></div><div><div className="mb-2 text-xs font-medium text-[#374151]">推荐学员（{selectedStudents.length}人）</div><div className="flex flex-wrap gap-2">{selectedStudents.map((student) => <span key={student.id} className="inline-flex items-center gap-1.5 rounded-[3px] border border-[#dbe5f5] bg-[#f5f8ff] px-2.5 py-1.5 text-xs text-[#2563eb]">{student.name}<button onClick={() => setSelectedStudentIds((ids) => ids.filter((id) => id !== student.id))}><X className="h-3 w-3" /></button></span>)}</div></div><label><span className="mb-1.5 block text-xs font-medium text-[#374151]">教师推荐意见</span><Textarea value={recommendReason} onChange={(event) => setRecommendReason(event.target.value)} className="min-h-28 rounded-[4px] text-xs" /></label><div className="rounded-[4px] bg-[#f8fafc] p-3 text-[11px] leading-5 text-[#6b7280]"><ShieldCheck className="mr-1 inline h-4 w-4 text-[#3b82f6]" />平台将自动附带学习成绩、项目成果、能力证书和匹配分析；联系方式将在学员同意后向企业开放。</div></div><footer className="flex justify-end gap-2 border-t border-[#e5e7eb] bg-[#fafafa] px-5 py-4"><Button variant="outline" onClick={() => setRecommendOpen(false)} className="h-9 rounded-[4px] text-xs">取消</Button><Button disabled={selectedStudents.length === 0 || !recommendReason.trim()} onClick={submitRecommendation} className="h-9 rounded-[4px] bg-[#3b82f6] px-5 text-xs text-white"><Send className="h-4 w-4" />提交推荐</Button></footer></div>
        </div>
      )}

      {selectedFeedback && (
        <div className="fixed inset-0 z-[430] flex justify-end bg-black/45" onMouseDown={(event) => event.currentTarget === event.target && setSelectedFeedback(null)}>
          <aside className="h-full w-full max-w-[560px] overflow-y-auto bg-white shadow-2xl"><header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e5e7eb] bg-white px-5 py-4"><div><h2 className="text-base font-bold text-[#111827]">入职回访详情</h2><p className="mt-1 text-[11px] text-[#6b7280]">{selectedFeedback.studentName} · {selectedFeedback.company}</p></div><button onClick={() => setSelectedFeedback(null)} className="p-1.5 text-[#6b7280]"><X className="h-5 w-5" /></button></header><div className="space-y-5 p-5"><div className="grid grid-cols-2 gap-3">{[{ label: "入职岗位", value: selectedFeedback.jobTitle }, { label: "入职日期", value: selectedFeedback.onboardDate }, { label: "岗位匹配", value: selectedFeedback.matchScore ? `${selectedFeedback.matchScore}%` : "待反馈" }, { label: "留用建议", value: selectedFeedback.retentionAdvice ?? "待评价" }].map((item) => <div key={item.label} className="rounded-[4px] bg-[#f8fafc] p-3"><div className="text-[10px] text-[#9ca3af]">{item.label}</div><div className="mt-1 text-xs font-semibold text-[#374151]">{item.value}</div></div>)}</div><FeedbackBlock title="学员反馈" submitted={selectedFeedback.studentSubmitted} text={selectedFeedback.studentComment} /><FeedbackBlock title="企业评价" submitted={selectedFeedback.enterpriseSubmitted} text={selectedFeedback.enterpriseComment} />{selectedFeedback.skillGap && <section><h3 className="text-xs font-bold text-[#374151]">待提升能力</h3><div className="mt-2 flex flex-wrap gap-2">{selectedFeedback.skillGap.map((skill) => <span key={skill} className="rounded-[3px] bg-amber-50 px-2 py-1 text-[10px] text-amber-700">{skill}</span>)}</div></section>}{selectedFeedback.status === "需教师跟进" && <section className="rounded-[4px] border border-rose-100 bg-rose-50 p-4"><div className="flex items-center gap-2 text-xs font-semibold text-rose-800"><AlertTriangle className="h-4 w-4" />需要教师跟进</div><p className="mt-2 text-[11px] leading-5 text-rose-700">学生反馈实际薪资与Offer不一致，并主动申请教师协助。建议联系企业确认薪资结构与夜班安排。</p></section>}</div><footer className="sticky bottom-0 flex justify-end gap-2 border-t border-[#e5e7eb] bg-white p-4"><Button variant="outline" className="h-9 rounded-[4px] text-xs" onClick={() => setSelectedFeedback(null)}>关闭</Button>{selectedFeedback.status === "需教师跟进" && <Button className="h-9 rounded-[4px] bg-[#3b82f6] text-xs text-white" onClick={() => { setFeedbacks((items) => items.map((item) => item.id === selectedFeedback.id ? { ...item, status: "已完成", needsHelp: false } : item)); setSelectedFeedback(null); showToast("已记录教师跟进结果，回访状态更新为已完成"); }}>记录跟进结果</Button>}</footer></aside>
        </div>
      )}
    </div>
  );
}

function OverviewPanel({ students, feedbacks, onChangeTab }: { students: EmploymentStudent[]; feedbacks: EmploymentFeedback[]; onChangeTab: (tab: EmploymentTab) => void }) {
  const funnel = [{ label: "就业准备", value: 58, color: "bg-[#3b82f6]" }, { label: "已投递/推荐", value: 42, color: "bg-[#4f87ee]" }, { label: "进入面试", value: 24, color: "bg-[#7c5ce6]" }, { label: "获得 Offer", value: 12, color: "bg-[#f59e0b]" }, { label: "正式入职", value: 8, color: "bg-[#10b981]" }];
  return <div className="grid gap-5 bg-[#f8f9fb] p-4 xl:grid-cols-[1.45fr_0.75fr]"><section className={cn(panelClass, "p-5")}><div className="flex items-center justify-between"><div><h2 className="text-sm font-bold text-[#111827]">本期就业转化</h2><p className="mt-1 text-[11px] text-[#6b7280]">从求职准备到正式入职的学员进展</p></div><button onClick={() => onChangeTab("students")} className="text-xs font-medium text-[#2563eb]">查看全部 <ChevronRight className="inline h-3.5 w-3.5" /></button></div><div className="mt-6 space-y-4">{funnel.map((item, index) => <div key={item.label} className="grid grid-cols-[90px_1fr_42px] items-center gap-3"><span className="text-xs text-[#4b5563]">{item.label}</span><div className="h-7 overflow-hidden rounded-[3px] bg-[#eef0f3]"><div className={cn("flex h-full items-center justify-end px-2 text-[10px] text-white", item.color)} style={{ width: `${100 - index * 13}%` }}>{index < 3 ? `${Math.round((item.value / funnel[0].value) * 100)}%` : ""}</div></div><strong className="text-right text-sm text-[#111827]">{item.value}</strong></div>)}</div><div className="mt-6 grid grid-cols-3 divide-x border-t border-[#eef0f3] pt-4 text-center"><div><strong className="text-lg text-[#111827]">63.8%</strong><p className="mt-1 text-[10px] text-[#9ca3af]">就业转化率</p></div><div><strong className="text-lg text-[#111827]">16.8K</strong><p className="mt-1 text-[10px] text-[#9ca3af]">平均月薪</p></div><div><strong className="text-lg text-[#111827]">91%</strong><p className="mt-1 text-[10px] text-[#9ca3af]">岗位匹配均值</p></div></div></section><aside className={cn(panelClass, "p-5")}><div className="flex items-center justify-between"><h2 className="text-sm font-bold text-[#111827]">待办与风险</h2><span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-medium text-rose-600">{students.filter((item) => item.risk).length + feedbacks.filter((item) => item.status === "需教师跟进").length} 项</span></div><div className="mt-4 divide-y divide-[#eef0f3]">{[{ title: "何嘉悦入职反馈需要教师跟进", meta: "薪资与岗位适应问题", tone: "text-rose-600", tab: "followup" as const }, { title: "2名学员简历完善度低于80%", meta: "建议本周完成就业辅导", tone: "text-amber-600", tab: "students" as const }, { title: "AI应用开发岗位即将截止", meta: "仍有3名高匹配学员未推荐", tone: "text-blue-600", tab: "recommend" as const }].map((item) => <button key={item.title} onClick={() => onChangeTab(item.tab)} className="flex w-full items-center gap-3 py-4 text-left"><div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-[#f8fafc]", item.tone)}><CircleAlert className="h-4 w-4" /></div><div className="min-w-0 flex-1"><div className="truncate text-xs font-medium text-[#374151]">{item.title}</div><div className="mt-1 text-[10px] text-[#9ca3af]">{item.meta}</div></div><ChevronRight className="h-4 w-4 text-[#c0c5ce]" /></button>)}</div></aside></div>;
}

function RecommendationRecords({ records }: { records: TeacherRecommendation[] }) {
  return <div className="overflow-x-auto"><table className="w-full min-w-[1000px] text-left text-xs"><thead className="border-b border-[#e5e7eb] bg-[#fafafa] text-[#6b7280]"><tr><th className="px-5 py-3 font-medium">推荐学员</th><th className="px-4 py-3 font-medium">推荐岗位</th><th className="px-4 py-3 font-medium">教师意见</th><th className="px-4 py-3 font-medium">推荐时间</th><th className="px-4 py-3 font-medium">当前状态</th><th className="px-5 py-3 text-right font-medium">操作</th></tr></thead><tbody className="divide-y divide-[#eef0f3]">{records.map((record) => { const student = EMPLOYMENT_STUDENTS.find((item) => item.id === record.studentId); const job = EMPLOYMENT_JOBS.find((item) => item.id === record.jobId); return <tr key={record.id} className="hover:bg-[#fafcff]"><td className="px-5 py-4"><div className="font-semibold text-[#111827]">{student?.name}</div><div className="mt-1 text-[10px] text-[#9ca3af]">{student?.className}</div></td><td className="px-4 py-4"><div className="font-medium text-[#374151]">{job?.title}</div><div className="mt-1 text-[10px] text-[#9ca3af]">{job?.company}</div></td><td className="max-w-[320px] px-4 py-4"><p className="line-clamp-2 leading-5 text-[#6b7280]">{record.reason}</p></td><td className="px-4 py-4 font-mono text-[#6b7280]">{record.submittedAt}</td><td className="px-4 py-4"><span className={cn("rounded-[3px] px-2 py-1 text-[11px] font-medium", recommendationTone[record.stage])}>{record.stage}</span></td><td className="px-5 py-4 text-right"><button className="font-medium text-[#2563eb] hover:underline">查看进展</button></td></tr>; })}</tbody></table></div>;
}

function JobStatus({ status }: { status: EmploymentStudent["jobStatus"] }) {
  const tone = status === "已入职" ? "bg-emerald-50 text-emerald-700" : status === "Offer" ? "bg-orange-50 text-orange-700" : status === "面试中" ? "bg-violet-50 text-violet-700" : status === "未启动求职" ? "bg-neutral-100 text-neutral-500" : "bg-blue-50 text-blue-700";
  return <span className={cn("rounded-[3px] px-2 py-1 text-[11px] font-medium", tone)}>{status}</span>;
}

function SubmitStatus({ submitted }: { submitted: boolean }) {
  return submitted ? <span className="inline-flex items-center gap-1 text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5" />已提交</span> : <span className="inline-flex items-center gap-1 text-amber-600"><Clock3 className="h-3.5 w-3.5" />待提交</span>;
}

function FeedbackStatus({ status }: { status: EmploymentFeedback["status"] }) {
  const tone = status === "已完成" ? "bg-emerald-50 text-emerald-700" : status === "需教师跟进" ? "bg-rose-50 text-rose-700" : status === "未到回访时间" ? "bg-neutral-100 text-neutral-500" : "bg-amber-50 text-amber-700";
  return <span className={cn("rounded-[3px] px-2 py-1 text-[11px] font-medium", tone)}>{status}</span>;
}

function FeedbackBlock({ title, submitted, text }: { title: string; submitted: boolean; text?: string }) {
  return <section><div className="flex items-center justify-between"><h3 className="text-xs font-bold text-[#374151]">{title}</h3><SubmitStatus submitted={submitted} /></div><div className="mt-2 rounded-[4px] border border-[#e5e7eb] bg-[#f8fafc] p-3 text-xs leading-6 text-[#4b5563]">{submitted ? text || "已提交反馈" : "尚未提交反馈"}</div></section>;
}
