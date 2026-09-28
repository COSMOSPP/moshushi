import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Filter,
  Search,
  ShieldCheck,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { INITIAL_FEEDBACKS, type EmploymentFeedback } from "@/data/employmentData";
import { cn } from "@/lib/utils";

const panelClass = "rounded-[4px] border border-[#e5e7eb] bg-white shadow-sm";

export default function EnterpriseEmploymentFeedback() {
  const [feedbacks, setFeedbacks] = useState(INITIAL_FEEDBACKS);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("全部状态");
  const [selected, setSelected] = useState<EmploymentFeedback | null>(null);
  const [evaluating, setEvaluating] = useState<EmploymentFeedback | null>(null);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ competence: "4", execution: "4", collaboration: "5", professionalism: "5", retention: "建议留用", skillGap: "生产环境部署、监控告警", comment: "专业基础扎实，能够较快进入项目。建议继续加强生产部署和故障复盘经验。" });

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2500);
  };

  const visibleFeedbacks = useMemo(() => feedbacks.filter((feedback) => {
    const keyword = search.trim().toLowerCase();
    const matchesSearch = !keyword || [feedback.studentName, feedback.jobTitle, feedback.company]
      .some((value) => value.toLowerCase().includes(keyword));
    const matchesStatus = status === "全部状态" || feedback.status === status;
    return matchesSearch && matchesStatus;
  }), [feedbacks, search, status]);

  const submitEvaluation = () => {
    if (!evaluating) return;
    setFeedbacks((items) => items.map((item) => item.id === evaluating.id ? {
      ...item,
      enterpriseSubmitted: true,
      retentionAdvice: form.retention as EmploymentFeedback["retentionAdvice"],
      enterpriseComment: form.comment,
      skillGap: form.skillGap.split(/[,，、]/).map((value) => value.trim()).filter(Boolean),
      status: item.studentSubmitted ? "已完成" : "反馈进行中",
    } : item));
    setEvaluating(null);
    showToast("企业入职评价已提交，并同步至学员跟进教师");
  };

  const active = feedbacks.filter((item) => item.status !== "未到回访时间");
  const completed = feedbacks.filter((item) => item.studentSubmitted && item.enterpriseSubmitted);
  const avgMatch = Math.round(feedbacks.filter((item) => item.matchScore).reduce((sum, item) => sum + (item.matchScore ?? 0), 0) / feedbacks.filter((item) => item.matchScore).length);

  return (
    <div>
      {toast && <div className="fixed right-6 top-20 z-[100] flex items-center gap-2 rounded-[4px] border border-emerald-200 bg-white px-4 py-3 text-xs font-medium text-emerald-700 shadow-lg"><CheckCircle2 className="h-4 w-4" />{toast}</div>}
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-xl font-bold text-neutral-900">入职评价</h1><p className="mt-1 text-sm leading-6 text-neutral-500">在学员入职满一个月后提交岗位胜任评价，与学生反馈共同形成培养闭环。</p></div><div className="flex items-center gap-2 rounded-[4px] border border-blue-100 bg-blue-50 px-3 py-2 text-xs text-blue-700"><ShieldCheck className="h-4 w-4" />评价内容仅对授权学员与教师开放</div></header>

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          { label: "已入职人才", value: 12, note: "本月新增 4 人", icon: Users, tone: "bg-blue-50 text-blue-600" },
          { label: "待企业评价", value: active.filter((item) => !item.enterpriseSubmitted).length, note: "请在反馈期内完成", icon: Clock3, tone: "bg-amber-50 text-amber-600" },
          { label: "双向反馈完成", value: completed.length, note: `完成率 ${Math.round(completed.length / active.length * 100)}%`, icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-600" },
          { label: "平均岗位匹配", value: `${avgMatch}%`, note: "基于入职一个月反馈", icon: UserCheck, tone: "bg-violet-50 text-violet-600" },
        ].map((item) => <div key={item.label} className={cn(panelClass, "flex items-center justify-between p-4")}><div><div className="text-xs text-[#667085]">{item.label}</div><div className="mt-1.5 text-2xl font-bold text-[#101828]">{item.value}</div><div className="mt-1 text-[10px] text-[#98a2b3]">{item.note}</div></div><div className={cn("flex h-10 w-10 items-center justify-center rounded-[4px]", item.tone)}><item.icon className="h-5 w-5" /></div></div>)}
      </section>

      <section className={cn(panelClass, "mt-5 overflow-hidden")}>
        <div className="flex flex-col gap-3 border-b border-[#eef0f3] p-4 sm:flex-row sm:items-center sm:justify-between"><div className="relative max-w-[420px] flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="搜索学员、岗位" className="h-9 rounded-[4px] pl-9 text-xs" /></div><div className="flex gap-2"><select value={status} onChange={(event) => setStatus(event.target.value)} className="h-9 rounded-[4px] border border-[#dfe3e8] bg-white px-3 text-xs text-[#475467] outline-none"><option>全部状态</option><option>未到回访时间</option><option>待反馈</option><option>反馈进行中</option><option>需教师跟进</option><option>已完成</option></select><Button variant="outline" className="h-9 rounded-[4px] text-xs"><Filter className="h-4 w-4" />筛选</Button></div></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[1100px] text-left text-xs"><thead className="border-b border-[#e5e7eb] bg-[#fafbfc] text-[#667085]"><tr><th className="px-5 py-3 font-medium">入职人才</th><th className="px-4 py-3 font-medium">入职岗位</th><th className="px-4 py-3 font-medium">回访周期</th><th className="px-4 py-3 font-medium">学生反馈</th><th className="px-4 py-3 font-medium">企业评价</th><th className="px-4 py-3 font-medium">岗位匹配</th><th className="px-4 py-3 font-medium">状态</th><th className="px-5 py-3 text-right font-medium">操作</th></tr></thead><tbody className="divide-y divide-[#eef0f3]">{visibleFeedbacks.map((feedback) => <tr key={feedback.id} className="hover:bg-[#fafcff]"><td className="px-5 py-4"><div className="font-semibold text-[#344054]">{feedback.studentName}</div><div className="mt-1 text-[10px] text-[#98a2b3]">入职 {feedback.onboardDate}</div></td><td className="px-4 py-4 text-[#475467]">{feedback.jobTitle}</td><td className="px-4 py-4"><div className="font-mono text-[#475467]">{feedback.feedbackOpenDate}</div><div className="mt-1 text-[10px] text-[#98a2b3]">截止 {feedback.deadline}</div></td><td className="px-4 py-4"><SubmitStatus submitted={feedback.studentSubmitted} /></td><td className="px-4 py-4"><SubmitStatus submitted={feedback.enterpriseSubmitted} /></td><td className="px-4 py-4">{feedback.matchScore ? <strong className={cn("text-lg", feedback.matchScore >= 80 ? "text-emerald-600" : feedback.matchScore >= 60 ? "text-blue-600" : "text-rose-600")}>{feedback.matchScore}%</strong> : <span className="text-[#98a2b3]">--</span>}</td><td className="px-4 py-4"><StatusBadge status={feedback.status} /></td><td className="px-5 py-4 text-right"><button onClick={() => setSelected(feedback)} className="font-medium text-[#2563eb] hover:underline">查看反馈</button>{!feedback.enterpriseSubmitted && feedback.status !== "未到回访时间" && <button onClick={() => setEvaluating(feedback)} className="ml-4 font-medium text-[#475467] hover:text-[#101828]">提交评价</button>}</td></tr>)}</tbody></table></div>
      </section>

      {selected && <FeedbackDetail feedback={selected} onClose={() => setSelected(null)} />}

      {evaluating && (
        <div className="fixed inset-0 z-[420] flex items-center justify-center bg-black/50 p-4" onMouseDown={(event) => event.currentTarget === event.target && setEvaluating(null)}>
          <div className="max-h-[90vh] w-full max-w-[680px] overflow-y-auto rounded-[4px] bg-white shadow-2xl"><header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e5e7eb] bg-white px-5 py-4"><div><h2 className="text-base font-bold text-[#101828]">提交入职一个月评价</h2><p className="mt-1 text-[11px] text-[#667085]">{evaluating.studentName} · {evaluating.jobTitle}</p></div><button onClick={() => setEvaluating(null)} className="p-1.5 text-[#667085]"><X className="h-5 w-5" /></button></header><div className="grid gap-4 p-5 sm:grid-cols-2"><ScoreSelect label="专业技能" value={form.competence} onChange={(value) => setForm({ ...form, competence: value })} /><ScoreSelect label="项目执行能力" value={form.execution} onChange={(value) => setForm({ ...form, execution: value })} /><ScoreSelect label="沟通协作" value={form.collaboration} onChange={(value) => setForm({ ...form, collaboration: value })} /><ScoreSelect label="职业素养" value={form.professionalism} onChange={(value) => setForm({ ...form, professionalism: value })} /><label><span className="mb-1.5 block text-xs font-medium text-[#344054]">试用期留用建议</span><select value={form.retention} onChange={(event) => setForm({ ...form, retention: event.target.value })} className="h-9 w-full rounded-[4px] border border-[#dfe3e8] bg-white px-3 text-xs outline-none"><option>建议留用</option><option>待观察</option><option>不建议留用</option></select></label><label><span className="mb-1.5 block text-xs font-medium text-[#344054]">需提升技能</span><Input value={form.skillGap} onChange={(event) => setForm({ ...form, skillGap: event.target.value })} className="h-9 rounded-[4px] text-xs" /></label><label className="sm:col-span-2"><span className="mb-1.5 block text-xs font-medium text-[#344054]">企业评价与培养建议</span><Textarea value={form.comment} onChange={(event) => setForm({ ...form, comment: event.target.value })} className="min-h-28 rounded-[4px] text-xs" /></label><label className="sm:col-span-2 flex items-start gap-2 rounded-[4px] bg-[#f8fafc] p-3 text-[11px] leading-5 text-[#667085]"><input type="checkbox" required className="mt-0.5 h-4 w-4 accent-[#3b82f6]" />确认评价基于学员入职一个月内的实际工作表现，并同意同步给授权跟进教师。</label></div><footer className="sticky bottom-0 flex justify-end gap-2 border-t border-[#e5e7eb] bg-white p-4"><Button variant="outline" onClick={() => setEvaluating(null)} className="h-9 rounded-[4px] text-xs">取消</Button><Button onClick={submitEvaluation} className="h-9 rounded-[4px] bg-[#3b82f6] px-5 text-xs text-white">提交评价</Button></footer></div>
        </div>
      )}
    </div>
  );
}

function SubmitStatus({ submitted }: { submitted: boolean }) {
  return submitted ? <span className="inline-flex items-center gap-1 text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5" />已提交</span> : <span className="inline-flex items-center gap-1 text-amber-600"><Clock3 className="h-3.5 w-3.5" />待提交</span>;
}

function StatusBadge({ status }: { status: EmploymentFeedback["status"] }) {
  const tone = status === "已完成" ? "bg-emerald-50 text-emerald-700" : status === "需教师跟进" ? "bg-rose-50 text-rose-700" : status === "未到回访时间" ? "bg-neutral-100 text-neutral-500" : "bg-amber-50 text-amber-700";
  return <span className={cn("rounded-[3px] px-2 py-1 text-[11px] font-medium", tone)}>{status}</span>;
}

function ScoreSelect({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label><span className="mb-1.5 block text-xs font-medium text-[#344054]">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="h-9 w-full rounded-[4px] border border-[#dfe3e8] bg-white px-3 text-xs outline-none">{["5", "4", "3", "2", "1"].map((score) => <option key={score} value={score}>{score} 分</option>)}</select></label>;
}

function FeedbackDetail({ feedback, onClose }: { feedback: EmploymentFeedback; onClose: () => void }) {
  return <div className="fixed inset-0 z-[410] flex justify-end bg-black/45" onMouseDown={(event) => event.currentTarget === event.target && onClose()}><aside className="h-full w-full max-w-[540px] overflow-y-auto bg-white shadow-2xl"><header className="sticky top-0 flex items-center justify-between border-b border-[#e5e7eb] bg-white px-5 py-4"><div><h2 className="text-base font-bold text-[#101828]">双向入职反馈</h2><p className="mt-1 text-[11px] text-[#667085]">{feedback.studentName} · {feedback.jobTitle}</p></div><button onClick={onClose} className="p-1.5 text-[#667085]"><X className="h-5 w-5" /></button></header><div className="space-y-5 p-5"><div className="grid grid-cols-2 gap-3">{[{ label: "岗位匹配", value: feedback.matchScore ? `${feedback.matchScore}%` : "待反馈" }, { label: "学生满意度", value: feedback.satisfaction ? `${feedback.satisfaction} / 5` : "待反馈" }, { label: "薪资是否一致", value: feedback.salaryConsistent === undefined ? "待反馈" : feedback.salaryConsistent ? "一致" : "不一致" }, { label: "留用建议", value: feedback.retentionAdvice ?? "待评价" }].map((item) => <div key={item.label} className="rounded-[4px] bg-[#f8fafc] p-3"><div className="text-[10px] text-[#98a2b3]">{item.label}</div><div className="mt-1 text-xs font-semibold text-[#344054]">{item.value}</div></div>)}</div><section><div className="flex items-center justify-between"><h3 className="text-xs font-bold text-[#344054]">学生反馈</h3><SubmitStatus submitted={feedback.studentSubmitted} /></div><p className="mt-2 rounded-[4px] border border-[#e5e7eb] bg-[#f8fafc] p-3 text-xs leading-6 text-[#475467]">{feedback.studentComment ?? "尚未提交反馈"}</p></section><section><div className="flex items-center justify-between"><h3 className="text-xs font-bold text-[#344054]">企业评价</h3><SubmitStatus submitted={feedback.enterpriseSubmitted} /></div><p className="mt-2 rounded-[4px] border border-[#e5e7eb] bg-[#f8fafc] p-3 text-xs leading-6 text-[#475467]">{feedback.enterpriseComment ?? "尚未提交评价"}</p></section>{feedback.skillGap && <section><h3 className="text-xs font-bold text-[#344054]">需提升能力</h3><div className="mt-2 flex flex-wrap gap-2">{feedback.skillGap.map((skill) => <span key={skill} className="rounded-[3px] bg-amber-50 px-2 py-1 text-[10px] text-amber-700">{skill}</span>)}</div></section>}{feedback.needsHelp && <div className="rounded-[4px] border border-rose-100 bg-rose-50 p-4"><div className="flex items-center gap-2 text-xs font-semibold text-rose-800"><AlertTriangle className="h-4 w-4" />学员已申请教师协助</div><p className="mt-2 text-[11px] leading-5 text-rose-700">平台已通知跟进教师处理，企业可在招聘协同中补充说明。</p></div>}</div></aside></div>;
}
