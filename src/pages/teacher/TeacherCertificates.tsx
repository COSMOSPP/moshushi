import { useMemo, useState } from "react";
import {
  Award,
  BadgeCheck,
  Ban,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileBadge2,
  FileDown,
  FileText,
  GraduationCap,
  Search,
  Send,
  ShieldCheck,
  Stamp,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CertificateTab = "issue" | "records" | "templates";
type StudentCertificateStatus = "待发放" | "已发放" | "暂不符合";
type RecordStatus = "已发放" | "已撤销";

interface CertificateStudent {
  id: string;
  studentNo: string;
  name: string;
  className: string;
  course: string;
  progress: number;
  score: number;
  assessment: "优秀" | "良好" | "合格" | "未完成";
  status: StudentCertificateStatus;
  missing?: string;
}

interface CertificateRecord {
  id: string;
  certNo: string;
  studentName: string;
  studentNo: string;
  certificateName: string;
  type: string;
  course: string;
  issueDate: string;
  operator: string;
  status: RecordStatus;
}

interface CertificateTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  issuer: string;
  usage: number;
  tone: string;
  iconTone: string;
}

const INITIAL_STUDENTS: CertificateStudent[] = [
  {
    id: "STU-001",
    studentNo: "2026900101",
    name: "李明",
    className: "2026春季大模型1班",
    course: "大模型微调与工程化开发",
    progress: 100,
    score: 98,
    assessment: "优秀",
    status: "待发放",
  },
  {
    id: "STU-002",
    studentNo: "2026900108",
    name: "陈雨桐",
    className: "2026春季大模型1班",
    course: "大模型微调与工程化开发",
    progress: 100,
    score: 95,
    assessment: "优秀",
    status: "待发放",
  },
  {
    id: "STU-003",
    studentNo: "2026900126",
    name: "周子轩",
    className: "2026春季大模型2班",
    course: "AI全栈智能体开发",
    progress: 100,
    score: 91,
    assessment: "优秀",
    status: "待发放",
  },
  {
    id: "STU-004",
    studentNo: "2026900135",
    name: "王若琳",
    className: "2026春季大模型2班",
    course: "AI全栈智能体开发",
    progress: 94,
    score: 88,
    assessment: "良好",
    status: "暂不符合",
    missing: "课程进度未达到 100%",
  },
  {
    id: "STU-005",
    studentNo: "2026900162",
    name: "赵嘉宁",
    className: "2026春季云计算1班",
    course: "云计算架构与微服务实训",
    progress: 100,
    score: 86,
    assessment: "良好",
    status: "待发放",
  },
  {
    id: "STU-006",
    studentNo: "2026900181",
    name: "孙浩然",
    className: "2026春季云计算1班",
    course: "云计算架构与微服务实训",
    progress: 82,
    score: 72,
    assessment: "未完成",
    status: "暂不符合",
    missing: "实训项目与综合考核未完成",
  },
];

const INITIAL_RECORDS: CertificateRecord[] = [
  {
    id: "REC-001",
    certNo: "XW-2026-LLM-08912",
    studentName: "张欣怡",
    studentNo: "2026900088",
    certificateName: "大模型微调与工程化开发结业证书",
    type: "课程结业",
    course: "大模型微调与工程化开发",
    issueDate: "2026-09-20",
    operator: "张老师",
    status: "已发放",
  },
  {
    id: "REC-002",
    certNo: "XW-2026-AGT-08745",
    studentName: "吴一凡",
    studentNo: "2026900093",
    certificateName: "AI全栈智能体开发工程师能力证书",
    type: "技能认证",
    course: "AI全栈智能体开发",
    issueDate: "2026-09-18",
    operator: "张老师",
    status: "已发放",
  },
  {
    id: "REC-003",
    certNo: "XW-2026-CLD-08126",
    studentName: "何嘉悦",
    studentNo: "2026900066",
    certificateName: "云计算架构与微服务实训认证证书",
    type: "企业联合认证",
    course: "云计算架构与微服务实训",
    issueDate: "2026-09-10",
    operator: "李老师",
    status: "已撤销",
  },
  {
    id: "REC-004",
    certNo: "XW-2026-PY-07839",
    studentName: "林泽宇",
    studentNo: "2026900047",
    certificateName: "Python高级数据分析与AI实战结业证书",
    type: "课程结业",
    course: "Python高级数据分析与AI实战",
    issueDate: "2026-08-28",
    operator: "张老师",
    status: "已发放",
  },
];

const TEMPLATES: CertificateTemplate[] = [
  {
    id: "TPL-001",
    name: "课程实训结业证书",
    type: "课程结业",
    description: "适用于完成全部课程、实验与综合考核的学员。",
    issuer: "模数师数字平台教学指导委员会",
    usage: 286,
    tone: "from-[#173b70] to-[#235b9f]",
    iconTone: "bg-blue-50 text-blue-600",
  },
  {
    id: "TPL-002",
    name: "专业技能能力认证证书",
    type: "技能认证",
    description: "适用于通过专项技能测评和项目答辩的学员。",
    issuer: "数字化人才认证中心",
    usage: 143,
    tone: "from-[#24435c] to-[#17788c]",
    iconTone: "bg-cyan-50 text-cyan-700",
  },
  {
    id: "TPL-003",
    name: "企业联合培养认证证书",
    type: "企业联合认证",
    description: "适用于完成企业真实项目和岗位能力验收的学员。",
    issuer: "模数师数字平台 · 合作企业联合认证",
    usage: 68,
    tone: "from-[#4b326d] to-[#7752a5]",
    iconTone: "bg-violet-50 text-violet-700",
  },
];

const panelClass = "rounded-[4px] border border-[#e5e7eb] bg-white shadow-sm";

export default function TeacherCertificates() {
  const [activeTab, setActiveTab] = useState<CertificateTab>("issue");
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [studentSearch, setStudentSearch] = useState("");
  const [studentClass, setStudentClass] = useState("全部班级");
  const [recordSearch, setRecordSearch] = useState("");
  const [recordStatus, setRecordStatus] = useState("全部状态");
  const [isIssueOpen, setIsIssueOpen] = useState(false);
  const [issueStep, setIssueStep] = useState(1);
  const [selectedTemplateId, setSelectedTemplateId] = useState(TEMPLATES[0].id);
  const [issueDate, setIssueDate] = useState("2026-09-24");
  const [validity, setValidity] = useState("长期有效");
  const [skills, setSkills] = useState("大模型应用、工程实践、项目协作");
  const [previewRecord, setPreviewRecord] = useState<CertificateRecord | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<CertificateTemplate | null>(null);
  const [revokeTarget, setRevokeTarget] = useState<CertificateRecord | null>(null);
  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const filteredStudents = useMemo(() => {
    const keyword = studentSearch.trim().toLowerCase();
    return students.filter((student) => {
      const matchesClass = studentClass === "全部班级" || student.className === studentClass;
      const matchesKeyword = !keyword || [student.name, student.studentNo, student.course]
        .some((value) => value.toLowerCase().includes(keyword));
      return matchesClass && matchesKeyword;
    });
  }, [studentClass, studentSearch, students]);

  const filteredRecords = useMemo(() => {
    const keyword = recordSearch.trim().toLowerCase();
    return records.filter((record) => {
      const matchesStatus = recordStatus === "全部状态" || record.status === recordStatus;
      const matchesKeyword = !keyword || [record.studentName, record.studentNo, record.certNo, record.certificateName]
        .some((value) => value.toLowerCase().includes(keyword));
      return matchesStatus && matchesKeyword;
    });
  }, [recordSearch, recordStatus, records]);

  const eligibleVisibleIds = filteredStudents
    .filter((student) => student.status === "待发放")
    .map((student) => student.id);
  const allEligibleVisibleSelected = eligibleVisibleIds.length > 0
    && eligibleVisibleIds.every((id) => selectedIds.includes(id));
  const selectedStudents = students.filter((student) => selectedIds.includes(student.id));
  const selectedTemplate = TEMPLATES.find((template) => template.id === selectedTemplateId) ?? TEMPLATES[0];

  const openIssueFlow = (ids?: string[]) => {
    const nextIds = ids ?? selectedIds;
    if (nextIds.length === 0) {
      showToast("请先选择至少一名符合发放条件的学员");
      return;
    }
    setSelectedIds(nextIds);
    setIssueStep(1);
    setIsIssueOpen(true);
  };

  const handleIssue = () => {
    const issueStudents = students.filter((student) => selectedIds.includes(student.id));
    const issuedRecords = issueStudents.map((student, index): CertificateRecord => ({
      id: `REC-${Date.now()}-${index}`,
      certNo: `XW-2026-${selectedTemplate.type === "技能认证" ? "SKL" : selectedTemplate.type === "企业联合认证" ? "ENT" : "EDU"}-${String(9000 + records.length + index)}`,
      studentName: student.name,
      studentNo: student.studentNo,
      certificateName: selectedTemplate.name,
      type: selectedTemplate.type,
      course: student.course,
      issueDate,
      operator: "张老师",
      status: "已发放",
    }));

    setRecords((current) => [...issuedRecords, ...current]);
    setStudents((current) => current.map((student) => (
      selectedIds.includes(student.id) ? { ...student, status: "已发放" } : student
    )));
    setIsIssueOpen(false);
    setSelectedIds([]);
    setActiveTab("records");
    showToast(`已成功生成并发放 ${issuedRecords.length} 本证书，学员端已同步`);
  };

  const revokeRecord = () => {
    if (!revokeTarget) return;
    setRecords((current) => current.map((record) => (
      record.id === revokeTarget.id ? { ...record, status: "已撤销" } : record
    )));
    setRevokeTarget(null);
    showToast("证书已撤销，学员端同步停止下载与分享");
  };

  const stats = {
    issued: records.filter((record) => record.status === "已发放").length + 482,
    pending: students.filter((student) => student.status === "待发放").length,
    monthly: records.filter((record) => record.status === "已发放" && record.issueDate.startsWith("2026-09")).length + 36,
    revoked: records.filter((record) => record.status === "已撤销").length,
  };

  return (
    <div className="-m-6 min-h-full bg-[#f5f6f8] p-6 text-[#1f2937]">
      {toast && (
        <div className="fixed left-1/2 top-16 z-[500] flex -translate-x-1/2 items-center gap-2 rounded-[4px] bg-[#1f2937] px-4 py-2.5 text-xs font-medium text-white shadow-xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}

      <div className="mx-auto max-w-[1480px] space-y-5">
        <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-[#eaf2ff] text-[#3b82f6]">
                <FileBadge2 className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#111827]">证书管理</h1>
                <p className="mt-0.5 text-xs text-[#6b7280]">统一管理证书发放、学员同步、模板使用与防伪记录</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-9 rounded-[4px] bg-white px-3 text-xs"
              onClick={() => showToast("证书发放记录已生成导出任务")}
            >
              <FileDown className="h-4 w-4" />
              导出记录
            </Button>
            <Button
              className="h-9 rounded-[4px] bg-[#3b82f6] px-4 text-xs text-white hover:bg-[#2563eb]"
              onClick={() => openIssueFlow()}
            >
              <Send className="h-4 w-4" />
              批量发放证书
            </Button>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {[
            { label: "累计有效证书", value: stats.issued, unit: "本", icon: ShieldCheck, tone: "bg-blue-50 text-blue-600" },
            { label: "符合条件待发放", value: stats.pending, unit: "人", icon: Users, tone: "bg-amber-50 text-amber-600" },
            { label: "本月新增发放", value: stats.monthly, unit: "本", icon: CalendarDays, tone: "bg-emerald-50 text-emerald-600" },
            { label: "已撤销证书", value: stats.revoked, unit: "本", icon: Ban, tone: "bg-rose-50 text-rose-600" },
          ].map((item) => (
            <div key={item.label} className={cn(panelClass, "flex items-center justify-between p-4")}>
              <div>
                <div className="text-xs text-[#6b7280]">{item.label}</div>
                <div className="mt-1.5 text-2xl font-bold text-[#111827]">
                  {item.value}<span className="ml-1 text-xs font-normal text-[#9ca3af]">{item.unit}</span>
                </div>
              </div>
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-[4px]", item.tone)}>
                <item.icon className="h-5 w-5" />
              </div>
            </div>
          ))}
        </section>

        <section className={cn(panelClass, "overflow-hidden")}>
          <div className="flex overflow-x-auto border-b border-[#e5e7eb] px-4">
            {[
              { key: "issue" as const, label: "发放中心", count: stats.pending, icon: Send },
              { key: "records" as const, label: "发放记录", count: records.length, icon: FileText },
              { key: "templates" as const, label: "证书模板", count: TEMPLATES.length, icon: Stamp },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "relative flex h-12 shrink-0 items-center gap-2 px-4 text-sm font-medium transition-colors",
                  activeTab === tab.key ? "text-[#2563eb]" : "text-[#6b7280] hover:text-[#111827]",
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                <span className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px]",
                  activeTab === tab.key ? "bg-blue-50 text-blue-600" : "bg-[#f3f4f6] text-[#6b7280]",
                )}>{tab.count}</span>
                {activeTab === tab.key && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-[#3b82f6]" />}
              </button>
            ))}
          </div>

          {activeTab === "issue" && (
            <div>
              <div className="flex flex-col gap-3 border-b border-[#eef0f3] p-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-1 flex-col gap-2 sm:flex-row">
                  <div className="relative max-w-[360px] flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
                    <Input
                      value={studentSearch}
                      onChange={(event) => setStudentSearch(event.target.value)}
                      placeholder="搜索学员姓名、学号或课程"
                      className="h-9 rounded-[4px] border-[#dfe3e8] pl-9 text-xs"
                    />
                  </div>
                  <select
                    value={studentClass}
                    onChange={(event) => setStudentClass(event.target.value)}
                    className="h-9 rounded-[4px] border border-[#dfe3e8] bg-white px-3 text-xs text-[#4b5563] outline-none focus:border-[#3b82f6]"
                  >
                    {["全部班级", ...Array.from(new Set(students.map((student) => student.className)))].map((className) => (
                      <option key={className}>{className}</option>
                    ))}
                  </select>
                </div>
                <div className="text-xs text-[#6b7280]">
                  已选择 <strong className="text-[#2563eb]">{selectedIds.length}</strong> 人，仅符合条件的学员可发放
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[1050px] text-left text-xs">
                  <thead className="bg-[#fafafa] text-[#6b7280]">
                    <tr className="border-b border-[#e5e7eb]">
                      <th className="w-12 px-4 py-3 font-medium">
                        <input
                          type="checkbox"
                          checked={allEligibleVisibleSelected}
                          onChange={() => setSelectedIds((current) => allEligibleVisibleSelected
                            ? current.filter((id) => !eligibleVisibleIds.includes(id))
                            : Array.from(new Set([...current, ...eligibleVisibleIds])))}
                          className="h-4 w-4 accent-[#3b82f6]"
                          aria-label="选择全部符合条件的学员"
                        />
                      </th>
                      <th className="px-3 py-3 font-medium">学员</th>
                      <th className="px-3 py-3 font-medium">班级</th>
                      <th className="px-3 py-3 font-medium">关联课程</th>
                      <th className="px-3 py-3 font-medium">完成进度</th>
                      <th className="px-3 py-3 font-medium">综合考评</th>
                      <th className="px-3 py-3 font-medium">发放条件</th>
                      <th className="px-4 py-3 text-right font-medium">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eef0f3]">
                    {filteredStudents.map((student) => {
                      const isEligible = student.status === "待发放";
                      return (
                        <tr key={student.id} className="hover:bg-[#fafcff]">
                          <td className="px-4 py-3.5">
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(student.id)}
                              disabled={!isEligible}
                              onChange={() => setSelectedIds((current) => current.includes(student.id)
                                ? current.filter((id) => id !== student.id)
                                : [...current, student.id])}
                              className="h-4 w-4 accent-[#3b82f6] disabled:opacity-30"
                              aria-label={`选择${student.name}`}
                            />
                          </td>
                          <td className="px-3 py-3.5">
                            <div className="font-semibold text-[#111827]">{student.name}</div>
                            <div className="mt-0.5 font-mono text-[10px] text-[#9ca3af]">{student.studentNo}</div>
                          </td>
                          <td className="px-3 py-3.5 text-[#4b5563]">{student.className}</td>
                          <td className="max-w-[220px] px-3 py-3.5 font-medium text-[#374151]">{student.course}</td>
                          <td className="px-3 py-3.5">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-20 overflow-hidden rounded-full bg-[#e5e7eb]">
                                <div className="h-full bg-[#3b82f6]" style={{ width: `${student.progress}%` }} />
                              </div>
                              <span className="font-medium text-[#4b5563]">{student.progress}%</span>
                            </div>
                          </td>
                          <td className="px-3 py-3.5">
                            <strong className="text-sm text-[#111827]">{student.score}</strong>
                            <span className="ml-1.5 text-[#6b7280]">{student.assessment}</span>
                          </td>
                          <td className="px-3 py-3.5">
                            {student.status === "已发放" ? (
                              <span className="inline-flex items-center gap-1 rounded-[3px] bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700">
                                <CheckCircle2 className="h-3 w-3" /> 已发放
                              </span>
                            ) : isEligible ? (
                              <span className="inline-flex items-center gap-1 rounded-[3px] bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-700">
                                <BadgeCheck className="h-3 w-3" /> 已达标
                              </span>
                            ) : (
                              <div>
                                <span className="inline-flex rounded-[3px] bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-700">暂不符合</span>
                                <div className="mt-1 text-[10px] text-[#9ca3af]">{student.missing}</div>
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            {student.status === "已发放" ? (
                              <button className="text-xs font-medium text-[#2563eb] hover:underline" onClick={() => setActiveTab("records")}>查看记录</button>
                            ) : (
                              <button
                                disabled={!isEligible}
                                onClick={() => openIssueFlow([student.id])}
                                className="text-xs font-medium text-[#2563eb] hover:underline disabled:cursor-not-allowed disabled:text-[#b6bdc8] disabled:no-underline"
                              >
                                发放证书
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "records" && (
            <div>
              <div className="flex flex-col gap-3 border-b border-[#eef0f3] p-4 sm:flex-row sm:items-center">
                <div className="relative max-w-[420px] flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
                  <Input
                    value={recordSearch}
                    onChange={(event) => setRecordSearch(event.target.value)}
                    placeholder="搜索学员、证书名称或证书编号"
                    className="h-9 rounded-[4px] border-[#dfe3e8] pl-9 text-xs"
                  />
                </div>
                <select
                  value={recordStatus}
                  onChange={(event) => setRecordStatus(event.target.value)}
                  className="h-9 rounded-[4px] border border-[#dfe3e8] bg-white px-3 text-xs text-[#4b5563] outline-none focus:border-[#3b82f6]"
                >
                  <option>全部状态</option>
                  <option>已发放</option>
                  <option>已撤销</option>
                </select>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1050px] text-left text-xs">
                  <thead className="border-b border-[#e5e7eb] bg-[#fafafa] text-[#6b7280]">
                    <tr>
                      <th className="px-4 py-3 font-medium">证书编号</th>
                      <th className="px-3 py-3 font-medium">学员</th>
                      <th className="px-3 py-3 font-medium">证书名称</th>
                      <th className="px-3 py-3 font-medium">证书类型</th>
                      <th className="px-3 py-3 font-medium">发放日期</th>
                      <th className="px-3 py-3 font-medium">操作人</th>
                      <th className="px-3 py-3 font-medium">状态</th>
                      <th className="px-4 py-3 text-right font-medium">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eef0f3]">
                    {filteredRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-[#fafcff]">
                        <td className="px-4 py-3.5 font-mono text-[11px] text-[#475569]">{record.certNo}</td>
                        <td className="px-3 py-3.5">
                          <div className="font-semibold text-[#111827]">{record.studentName}</div>
                          <div className="mt-0.5 font-mono text-[10px] text-[#9ca3af]">{record.studentNo}</div>
                        </td>
                        <td className="max-w-[260px] px-3 py-3.5 font-medium text-[#374151]">{record.certificateName}</td>
                        <td className="px-3 py-3.5 text-[#4b5563]">{record.type}</td>
                        <td className="px-3 py-3.5 font-mono text-[#4b5563]">{record.issueDate}</td>
                        <td className="px-3 py-3.5 text-[#4b5563]">{record.operator}</td>
                        <td className="px-3 py-3.5">
                          <span className={cn(
                            "inline-flex rounded-[3px] px-2 py-1 text-[11px] font-medium",
                            record.status === "已发放" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700",
                          )}>{record.status}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex justify-end gap-3">
                            <button onClick={() => setPreviewRecord(record)} className="text-[#2563eb] hover:underline">查看</button>
                            <button onClick={() => showToast(`已开始下载 ${record.certNo} 电子证书`)} className="text-[#4b5563] hover:text-[#111827]">下载</button>
                            {record.status === "已发放" && (
                              <button onClick={() => setRevokeTarget(record)} className="text-[#dc2626] hover:underline">撤销</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "templates" && (
            <div className="p-5">
              <div className="mb-5 flex items-start gap-3 rounded-[4px] border border-blue-100 bg-blue-50/70 p-3 text-xs text-blue-800">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                <p>证书模板由平台统一配置。教师可选择模板并填写课程与能力信息，证书编号、防伪码、颁发机构和电子签章由系统自动生成。</p>
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                {TEMPLATES.map((template) => (
                  <article key={template.id} className="overflow-hidden rounded-[4px] border border-[#e5e7eb] bg-white transition-shadow hover:shadow-md">
                    <div className={cn("h-24 bg-gradient-to-r p-4 text-white", template.tone)}>
                      <div className="flex items-start justify-between">
                        <div className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-white/15">
                          <Award className="h-5 w-5" />
                        </div>
                        <span className="rounded-[3px] border border-white/20 bg-white/10 px-2 py-1 text-[10px]">{template.type}</span>
                      </div>
                      <div className="mt-2 text-[10px] tracking-[0.16em] text-white/70">CERTIFICATE TEMPLATE</div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-[#111827]">{template.name}</h3>
                      <p className="mt-2 min-h-10 text-xs leading-5 text-[#6b7280]">{template.description}</p>
                      <div className="mt-4 border-t border-[#eef0f3] pt-3 text-[11px] text-[#6b7280]">
                        <div className="truncate">颁发机构：{template.issuer}</div>
                        <div className="mt-1">累计使用：{template.usage} 次</div>
                      </div>
                      <Button
                        variant="outline"
                        className="mt-4 h-8 w-full rounded-[4px] text-xs"
                        onClick={() => setPreviewTemplate(template)}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        预览模板
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {isIssueOpen && (
        <div className="fixed inset-0 z-[400] flex justify-end bg-black/45" onClick={() => setIsIssueOpen(false)}>
          <aside className="flex h-full w-full max-w-[620px] flex-col bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#e5e7eb] px-5">
              <div>
                <h2 className="text-base font-bold text-[#111827]">发放证书</h2>
                <p className="mt-0.5 text-[11px] text-[#6b7280]">已选择 {selectedStudents.length} 名符合条件的学员</p>
              </div>
              <button onClick={() => setIsIssueOpen(false)} className="rounded-[4px] p-1.5 text-[#6b7280] hover:bg-[#f3f4f6]" aria-label="关闭">
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="border-b border-[#e5e7eb] px-5 py-4">
              <div className="grid grid-cols-4 gap-2">
                {["选择模板", "确认学员", "发放设置", "确认发放"].map((label, index) => {
                  const number = index + 1;
                  return (
                    <div key={label} className="relative text-center">
                      <div className={cn(
                        "relative z-10 mx-auto flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-bold",
                        issueStep > number
                          ? "border-[#3b82f6] bg-[#3b82f6] text-white"
                          : issueStep === number
                            ? "border-[#3b82f6] bg-blue-50 text-[#2563eb]"
                            : "border-[#d1d5db] bg-white text-[#9ca3af]",
                      )}>
                        {issueStep > number ? <Check className="h-3.5 w-3.5" /> : number}
                      </div>
                      <div className={cn("mt-1.5 text-[10px]", issueStep === number ? "font-semibold text-[#2563eb]" : "text-[#9ca3af]")}>{label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {issueStep === 1 && (
                <div className="space-y-3">
                  <div className="mb-4">
                    <h3 className="text-sm font-bold text-[#111827]">选择证书模板</h3>
                    <p className="mt-1 text-xs text-[#6b7280]">证书防伪信息将在确认发放时自动生成。</p>
                  </div>
                  {TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplateId(template.id)}
                      className={cn(
                        "flex w-full items-center gap-4 rounded-[4px] border p-4 text-left transition-colors",
                        selectedTemplateId === template.id ? "border-[#3b82f6] bg-blue-50/50" : "border-[#e5e7eb] hover:border-[#b8c7df]",
                      )}
                    >
                      <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px]", template.iconTone)}>
                        <Award className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <strong className="text-sm text-[#111827]">{template.name}</strong>
                          <span className="rounded-[3px] bg-[#f3f4f6] px-1.5 py-0.5 text-[10px] text-[#6b7280]">{template.type}</span>
                        </div>
                        <p className="mt-1 text-xs text-[#6b7280]">{template.description}</p>
                      </div>
                      <div className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                        selectedTemplateId === template.id ? "border-[#3b82f6] bg-[#3b82f6] text-white" : "border-[#d1d5db]",
                      )}>
                        {selectedTemplateId === template.id && <Check className="h-3 w-3" />}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {issueStep === 2 && (
                <div>
                  <h3 className="text-sm font-bold text-[#111827]">确认发放学员</h3>
                  <p className="mt-1 text-xs text-[#6b7280]">请核对学员课程完成状态和综合考评结果。</p>
                  <div className="mt-4 divide-y divide-[#eef0f3] rounded-[4px] border border-[#e5e7eb]">
                    {selectedStudents.map((student) => (
                      <div key={student.id} className="flex items-center justify-between gap-3 p-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">{student.name.slice(-1)}</div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-[#111827]">{student.name} <span className="ml-1 font-mono font-normal text-[#9ca3af]">{student.studentNo}</span></div>
                            <div className="mt-0.5 truncate text-[11px] text-[#6b7280]">{student.course}</div>
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          <div className="text-sm font-bold text-[#111827]">{student.score} 分</div>
                          <div className="text-[10px] text-emerald-600">已满足发放条件</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {issueStep === 3 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-bold text-[#111827]">设置证书信息</h3>
                    <p className="mt-1 text-xs text-[#6b7280]">以下信息将写入电子证书和学员成长档案。</p>
                  </div>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-[#374151]">证书名称</span>
                    <Input value={selectedTemplate.name} readOnly className="h-9 rounded-[4px] bg-[#f9fafb] text-xs" />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium text-[#374151]">颁发日期</span>
                      <Input type="date" value={issueDate} onChange={(event) => setIssueDate(event.target.value)} className="h-9 rounded-[4px] text-xs" />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium text-[#374151]">有效期</span>
                      <select value={validity} onChange={(event) => setValidity(event.target.value)} className="h-9 w-full rounded-[4px] border border-[#dfe3e8] bg-white px-3 text-xs outline-none focus:border-[#3b82f6]">
                        <option>长期有效</option>
                        <option>3 年</option>
                        <option>2 年</option>
                        <option>1 年</option>
                      </select>
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-[#374151]">能力标签</span>
                    <Input value={skills} onChange={(event) => setSkills(event.target.value)} className="h-9 rounded-[4px] text-xs" />
                    <span className="mt-1 block text-[10px] text-[#9ca3af]">多个能力标签请使用顿号或逗号分隔</span>
                  </label>
                  <div className="rounded-[4px] border border-[#e5e7eb] bg-[#f9fafb] p-3 text-xs text-[#6b7280]">
                    <div className="flex items-center gap-2 font-medium text-[#374151]"><ShieldCheck className="h-4 w-4 text-[#3b82f6]" />系统可信字段</div>
                    <div className="mt-2 grid grid-cols-2 gap-y-2 text-[11px]">
                      <span>颁发机构：{selectedTemplate.issuer}</span>
                      <span>编号规则：系统自动生成</span>
                      <span>电子签章：平台证书专用章</span>
                      <span>防伪核验：唯一二维码</span>
                    </div>
                  </div>
                </div>
              )}

              {issueStep === 4 && (
                <div>
                  <h3 className="text-sm font-bold text-[#111827]">确认并发放</h3>
                  <p className="mt-1 text-xs text-[#6b7280]">证书发放后将同步写入学员端和全生命周期档案。</p>
                  <CertificatePreview
                    className="mt-5"
                    template={selectedTemplate}
                    studentName={selectedStudents.length === 1 ? selectedStudents[0].name : `${selectedStudents[0]?.name} 等 ${selectedStudents.length} 名学员`}
                    course={selectedStudents[0]?.course ?? "数字化专业实训课程"}
                    issueDate={issueDate}
                    certNo="系统发放后自动生成"
                  />
                  <div className="mt-4 grid grid-cols-2 gap-3 rounded-[4px] border border-[#e5e7eb] bg-[#f9fafb] p-4 text-xs">
                    <div><span className="text-[#9ca3af]">发放数量</span><strong className="ml-2 text-[#111827]">{selectedStudents.length} 本</strong></div>
                    <div><span className="text-[#9ca3af]">证书有效期</span><strong className="ml-2 text-[#111827]">{validity}</strong></div>
                    <div className="col-span-2"><span className="text-[#9ca3af]">能力标签</span><strong className="ml-2 text-[#111827]">{skills}</strong></div>
                  </div>
                </div>
              )}
            </div>

            <footer className="flex shrink-0 items-center justify-between border-t border-[#e5e7eb] bg-[#fafafa] px-5 py-4">
              <Button
                variant="outline"
                className="h-9 rounded-[4px] bg-white text-xs"
                onClick={() => issueStep === 1 ? setIsIssueOpen(false) : setIssueStep((step) => step - 1)}
              >
                {issueStep > 1 && <ChevronLeft className="h-4 w-4" />}
                {issueStep === 1 ? "取消" : "上一步"}
              </Button>
              <Button
                className="h-9 rounded-[4px] bg-[#3b82f6] px-4 text-xs text-white hover:bg-[#2563eb]"
                onClick={() => issueStep === 4 ? handleIssue() : setIssueStep((step) => step + 1)}
              >
                {issueStep === 4 ? "确认发放" : "下一步"}
                {issueStep < 4 && <ChevronRight className="h-4 w-4" />}
              </Button>
            </footer>
          </aside>
        </div>
      )}

      {(previewRecord || previewTemplate) && (
        <div className="fixed inset-0 z-[420] flex items-center justify-center bg-black/50 p-4" onClick={() => { setPreviewRecord(null); setPreviewTemplate(null); }}>
          <div className="w-full max-w-[720px] rounded-[4px] bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-4">
              <div>
                <h3 className="text-sm font-bold text-[#111827]">证书预览</h3>
                <p className="mt-0.5 text-[11px] text-[#6b7280]">电子证书版式与防伪信息预览</p>
              </div>
              <button onClick={() => { setPreviewRecord(null); setPreviewTemplate(null); }} className="rounded-[4px] p-1.5 text-[#6b7280] hover:bg-[#f3f4f6]" aria-label="关闭预览"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-5">
              <CertificatePreview
                template={previewTemplate ?? TEMPLATES.find((template) => template.type === previewRecord?.type) ?? TEMPLATES[0]}
                studentName={previewRecord?.studentName ?? "学员姓名"}
                course={previewRecord?.course ?? "数字化专业实训课程"}
                issueDate={previewRecord?.issueDate ?? issueDate}
                certNo={previewRecord?.certNo ?? "XW-2026-DEMO-00001"}
              />
            </div>
            <div className="flex justify-end gap-2 border-t border-[#e5e7eb] bg-[#fafafa] px-5 py-3">
              <Button variant="outline" className="h-8 rounded-[4px] bg-white text-xs" onClick={() => { setPreviewRecord(null); setPreviewTemplate(null); }}>关闭</Button>
              <Button className="h-8 rounded-[4px] bg-[#3b82f6] text-xs text-white hover:bg-[#2563eb]" onClick={() => showToast("电子证书已生成下载任务")}><Download className="h-3.5 w-3.5" />下载 PDF</Button>
            </div>
          </div>
        </div>
      )}

      {revokeTarget && (
        <div className="fixed inset-0 z-[430] flex items-center justify-center bg-black/45 p-4" onClick={() => setRevokeTarget(null)}>
          <div className="w-full max-w-[420px] rounded-[4px] bg-white p-5 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-rose-50 text-rose-600"><Ban className="h-5 w-5" /></div>
            <h3 className="mt-4 text-base font-bold text-[#111827]">确认撤销该证书？</h3>
            <p className="mt-2 text-xs leading-5 text-[#6b7280]">撤销后，{revokeTarget.studentName} 将无法继续下载或分享证书，核验页面会标记为“已撤销”。本操作将记录在审计日志中。</p>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline" className="h-9 rounded-[4px] text-xs" onClick={() => setRevokeTarget(null)}>取消</Button>
              <Button className="h-9 rounded-[4px] bg-[#dc2626] text-xs text-white hover:bg-[#b91c1c]" onClick={revokeRecord}>确认撤销</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CertificatePreview({
  template,
  studentName,
  course,
  issueDate,
  certNo,
  className,
}: {
  template: CertificateTemplate;
  studentName: string;
  course: string;
  issueDate: string;
  certNo: string;
  className?: string;
}) {
  return (
    <div className={cn("border border-[#d5c7a8] bg-[#fbfaf6] p-3", className)}>
      <div className="relative overflow-hidden border-4 border-double border-[#9a7b43] bg-white px-8 py-7 text-center">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.035]"><Award className="h-72 w-72" /></div>
        <div className="relative">
          <div className="text-[10px] font-semibold tracking-[0.28em] text-[#8a6d3b]">XUANWU DIGITAL TALENT CERTIFICATION</div>
          <h2 className="mt-2 text-2xl font-black tracking-[0.22em] text-[#26374a]">{template.name}</h2>
          <div className="mx-auto mt-3 h-px w-24 bg-[#b99655]" />
          <p className="mt-5 text-xs text-[#6b7280]">兹证明</p>
          <div className="mt-2 text-2xl font-bold text-[#111827]">{studentName}</div>
          <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-[#4b5563]">已完成《{course}》规定的全部学习、实训与综合考核任务，达到认证标准，特发此证。</p>
          <div className="mt-6 flex items-end justify-between border-t border-[#ece7dc] pt-4 text-left text-[10px] text-[#6b7280]">
            <div className="space-y-1">
              <div>证书编号：<span className="font-mono text-[#374151]">{certNo}</span></div>
              <div>颁发日期：<span className="font-mono text-[#374151]">{issueDate}</span></div>
              <div>颁发机构：<span className="font-medium text-[#374151]">{template.issuer}</span></div>
            </div>
            <div className="flex h-20 w-20 rotate-[-9deg] flex-col items-center justify-center rounded-full border-2 border-[#b91c1c] text-[9px] font-bold text-[#b91c1c]">
              <span>★ 模数师 ★</span>
              <span className="my-1 text-[10px]">证书专用章</span>
              <span className="font-normal">OFFICIAL SEAL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
