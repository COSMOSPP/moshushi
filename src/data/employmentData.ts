export type JobMatchLevel = "高度匹配" | "基本匹配" | "能力待提升";
export type ApplicationStage = "已投递" | "企业筛选" | "面试中" | "Offer" | "已入职" | "不合适";
export type RecommendationStage = "待学生确认" | "学生已授权" | "企业已查看" | "已邀约" | "面试中" | "Offer" | "已入职";
export type FeedbackStatus = "未到回访时间" | "待反馈" | "反馈进行中" | "需教师跟进" | "已完成";

export interface EmploymentJob {
  id: number;
  company: string;
  companyShort: string;
  verified: boolean;
  title: string;
  department: string;
  city: string;
  salary: string;
  jobType: "校招" | "实习" | "社招";
  workType: "全职" | "实习" | "远程";
  education: string;
  headcount: number;
  applicants: number;
  deadline: string;
  publishedAt: string;
  skills: string[];
  bonusSkills: string[];
  responsibilities: string[];
  benefits: string[];
  description: string;
  match: number;
  matchedSkills: string[];
  partialSkills: string[];
  missingSkills: string[];
}

export interface EmploymentStudent {
  id: number;
  studentNo: string;
  name: string;
  className: string;
  direction: string;
  city: string;
  expectedSalary: string;
  level: string;
  resumeProgress: number;
  projects: number;
  certificates: number;
  match: number;
  skills: string[];
  jobStatus: "未启动求职" | "求职准备中" | "已投递/已推荐" | "面试中" | "Offer" | "已入职";
  targetJobId: number;
  applications: number;
  recommendations: number;
  lastFollowUp: string;
  risk?: boolean;
}

export interface EmploymentApplication {
  id: number;
  jobId: number;
  studentName: string;
  source: "自主投递" | "教师推荐" | "企业邀约";
  stage: ApplicationStage;
  appliedAt: string;
  nextAction: string;
}

export interface TeacherRecommendation {
  id: number;
  jobId: number;
  studentId: number;
  teacher: string;
  reason: string;
  submittedAt: string;
  stage: RecommendationStage;
}

export interface EmploymentFeedback {
  id: number;
  studentId: number;
  studentName: string;
  company: string;
  jobTitle: string;
  onboardDate: string;
  feedbackOpenDate: string;
  deadline: string;
  status: FeedbackStatus;
  studentSubmitted: boolean;
  enterpriseSubmitted: boolean;
  matchScore?: number;
  satisfaction?: number;
  salaryConsistent?: boolean;
  needsHelp?: boolean;
  retentionAdvice?: "建议留用" | "待观察" | "不建议留用";
  studentComment?: string;
  enterpriseComment?: string;
  skillGap?: string[];
}

export const EMPLOYMENT_JOBS: EmploymentJob[] = [
  {
    id: 1,
    company: "华启数字科技有限公司",
    companyShort: "华启科技",
    verified: true,
    title: "AI 应用开发工程师",
    department: "数智产品中心",
    city: "南京",
    salary: "18K–22K",
    jobType: "校招",
    workType: "全职",
    education: "本科及以上",
    headcount: 8,
    applicants: 24,
    deadline: "2026.10.20",
    publishedAt: "2天前",
    skills: ["Python", "RAG", "Agent", "FastAPI"],
    bonusSkills: ["Docker", "向量数据库", "Vue"],
    responsibilities: ["参与企业知识库与智能体应用研发", "完成大模型应用服务接口设计与交付", "与产品及算法团队协作完成业务验证"],
    benefits: ["六险一金", "年度体检", "技术导师", "弹性工作"],
    description: "面向企业数字化场景，参与大模型应用、知识库问答和智能体工作流建设。",
    match: 94,
    matchedSkills: ["Python", "RAG", "FastAPI"],
    partialSkills: ["Agent 工程"],
    missingSkills: ["企业级部署经验"],
  },
  {
    id: 2,
    company: "云澜数据服务股份有限公司",
    companyShort: "云澜数据",
    verified: true,
    title: "数据分析工程师",
    department: "企业数据部",
    city: "上海",
    salary: "14K–18K",
    jobType: "校招",
    workType: "全职",
    education: "本科及以上",
    headcount: 5,
    applicants: 17,
    deadline: "2026.10.08",
    publishedAt: "3天前",
    skills: ["SQL", "Python", "BI", "A/B Test"],
    bonusSkills: ["Tableau", "统计建模"],
    responsibilities: ["搭建经营指标体系和数据看板", "完成专题分析并输出业务建议", "参与数据质量治理与自动化分析"],
    benefits: ["补充医疗", "餐饮补贴", "年度奖金"],
    description: "负责企业经营数据分析、指标体系建设和业务策略支持。",
    match: 87,
    matchedSkills: ["Python", "SQL", "数据可视化"],
    partialSkills: ["业务指标体系"],
    missingSkills: ["A/B Test 实战"],
  },
  {
    id: 3,
    company: "知行云计算技术有限公司",
    companyShort: "知行云",
    verified: true,
    title: "云平台运维工程师",
    department: "基础架构部",
    city: "苏州",
    salary: "12K–16K",
    jobType: "校招",
    workType: "全职",
    education: "大专及以上",
    headcount: 4,
    applicants: 9,
    deadline: "2026.10.30",
    publishedAt: "今天",
    skills: ["Linux", "Docker", "K8s", "Shell"],
    bonusSkills: ["Prometheus", "网络安全"],
    responsibilities: ["负责云平台日常巡检和故障处置", "维护容器集群与监控告警体系", "参与自动化运维工具开发"],
    benefits: ["带薪年假", "认证补贴", "夜班补助"],
    description: "参与企业云平台和容器基础设施的运行保障及自动化建设。",
    match: 78,
    matchedSkills: ["Linux", "Docker"],
    partialSkills: ["K8s"],
    missingSkills: ["生产监控经验", "Shell 自动化"],
  },
  {
    id: 4,
    company: "新域内容科技有限公司",
    companyShort: "新域内容",
    verified: true,
    title: "数字化运营专员",
    department: "用户增长部",
    city: "杭州",
    salary: "10K–14K",
    jobType: "实习",
    workType: "实习",
    education: "本科在读或以上",
    headcount: 6,
    applicants: 31,
    deadline: "2026.10.15",
    publishedAt: "5天前",
    skills: ["用户增长", "数据分析", "内容运营"],
    bonusSkills: ["AIGC", "短视频运营"],
    responsibilities: ["运营内容矩阵并分析用户行为", "协助制定增长活动与复盘", "使用AIGC工具提升内容生产效率"],
    benefits: ["转正机会", "实习证明", "项目奖金"],
    description: "面向数字内容业务，参与用户增长、内容运营和活动分析。",
    match: 66,
    matchedSkills: ["数据分析"],
    partialSkills: ["内容运营"],
    missingSkills: ["增长活动经验", "AIGC内容生产"],
  },
];

export const EMPLOYMENT_STUDENTS: EmploymentStudent[] = [
  { id: 1, studentNo: "2026900101", name: "李明", className: "2026春季大模型1班", direction: "AI 智能体开发", city: "南京", expectedSalary: "16K–20K", level: "L8 高阶实践者", resumeProgress: 100, projects: 5, certificates: 4, match: 96, skills: ["Python", "RAG", "LangChain", "FastAPI"], jobStatus: "已投递/已推荐", targetJobId: 1, applications: 3, recommendations: 1, lastFollowUp: "2026.09.26" },
  { id: 2, studentNo: "2026900108", name: "陈雨桐", className: "2026春季大模型1班", direction: "大模型应用", city: "南京", expectedSalary: "15K–18K", level: "L7 项目实践者", resumeProgress: 92, projects: 4, certificates: 3, match: 93, skills: ["Prompt", "Agent", "Vue", "Node.js"], jobStatus: "面试中", targetJobId: 1, applications: 4, recommendations: 2, lastFollowUp: "2026.09.27" },
  { id: 3, studentNo: "2026900126", name: "周子轩", className: "2026春季数据智能1班", direction: "数据分析", city: "上海", expectedSalary: "13K–17K", level: "L7 项目实践者", resumeProgress: 96, projects: 6, certificates: 3, match: 92, skills: ["SQL", "Python", "Tableau", "A/B Test"], jobStatus: "Offer", targetJobId: 2, applications: 5, recommendations: 1, lastFollowUp: "2026.09.25" },
  { id: 4, studentNo: "2026900135", name: "王若琳", className: "2026春季大模型2班", direction: "AI 应用开发", city: "苏州", expectedSalary: "14K–18K", level: "L6 熟练实践者", resumeProgress: 78, projects: 3, certificates: 2, match: 86, skills: ["Python", "FastAPI", "Docker"], jobStatus: "求职准备中", targetJobId: 1, applications: 1, recommendations: 0, lastFollowUp: "2026.09.20", risk: true },
  { id: 5, studentNo: "2026900162", name: "赵嘉宁", className: "2026春季云计算1班", direction: "云平台运维", city: "苏州", expectedSalary: "11K–15K", level: "L7 项目实践者", resumeProgress: 88, projects: 4, certificates: 3, match: 91, skills: ["Linux", "Docker", "K8s", "Shell"], jobStatus: "已投递/已推荐", targetJobId: 3, applications: 2, recommendations: 1, lastFollowUp: "2026.09.24" },
  { id: 6, studentNo: "2026900181", name: "孙浩然", className: "2026春季数据智能1班", direction: "数据分析", city: "南京", expectedSalary: "12K–15K", level: "L6 熟练实践者", resumeProgress: 65, projects: 2, certificates: 1, match: 74, skills: ["Python", "Pandas", "ECharts"], jobStatus: "未启动求职", targetJobId: 2, applications: 0, recommendations: 0, lastFollowUp: "尚未跟进", risk: true },
];

export const INITIAL_APPLICATIONS: EmploymentApplication[] = [
  { id: 1, jobId: 1, studentName: "李明", source: "自主投递", stage: "企业筛选", appliedAt: "2026.09.25", nextAction: "等待企业筛选结果" },
  { id: 2, jobId: 2, studentName: "李明", source: "教师推荐", stage: "面试中", appliedAt: "2026.09.21", nextAction: "09月30日 14:00 在线面试" },
  { id: 3, jobId: 3, studentName: "李明", source: "企业邀约", stage: "已投递", appliedAt: "2026.09.18", nextAction: "完善云平台项目说明" },
];

export const INITIAL_RECOMMENDATIONS: TeacherRecommendation[] = [
  { id: 1, jobId: 1, studentId: 1, teacher: "张老师", reason: "项目成果完整，具备企业知识库与RAG应用交付经验。", submittedAt: "2026.09.26", stage: "学生已授权" },
  { id: 2, jobId: 1, studentId: 2, teacher: "张老师", reason: "智能体开发方向与岗位高度一致，沟通协作能力突出。", submittedAt: "2026.09.24", stage: "企业已查看" },
  { id: 3, jobId: 2, studentId: 3, teacher: "李老师", reason: "数据分析项目经验丰富，能够独立完成指标体系搭建。", submittedAt: "2026.09.20", stage: "Offer" },
  { id: 4, jobId: 3, studentId: 5, teacher: "张老师", reason: "云原生技能覆盖完整，实训环境故障处理表现稳定。", submittedAt: "2026.09.18", stage: "已邀约" },
];

export const INITIAL_FEEDBACKS: EmploymentFeedback[] = [
  { id: 1, studentId: 7, studentName: "张欣怡", company: "华启数字科技有限公司", jobTitle: "AI 应用开发工程师", onboardDate: "2026.08.18", feedbackOpenDate: "2026.09.17", deadline: "2026.09.24", status: "已完成", studentSubmitted: true, enterpriseSubmitted: true, matchScore: 92, satisfaction: 5, salaryConsistent: true, needsHelp: false, retentionAdvice: "建议留用", studentComment: "课程中的RAG项目与当前工作高度相关，入职适应顺利。", enterpriseComment: "工程基础扎实，能够较快进入项目，建议继续加强生产部署经验。", skillGap: ["生产部署", "监控告警"] },
  { id: 2, studentId: 8, studentName: "吴一凡", company: "云澜数据服务股份有限公司", jobTitle: "数据分析工程师", onboardDate: "2026.08.25", feedbackOpenDate: "2026.09.24", deadline: "2026.10.01", status: "反馈进行中", studentSubmitted: true, enterpriseSubmitted: false, matchScore: 78, satisfaction: 4, salaryConsistent: true, needsHelp: false, studentComment: "主要工作为业务报表和专题分析，希望补充更多行业指标体系知识。", skillGap: ["行业指标体系"] },
  { id: 3, studentId: 9, studentName: "何嘉悦", company: "知行云计算技术有限公司", jobTitle: "云平台运维工程师", onboardDate: "2026.08.20", feedbackOpenDate: "2026.09.19", deadline: "2026.09.26", status: "需教师跟进", studentSubmitted: true, enterpriseSubmitted: true, matchScore: 58, satisfaction: 2, salaryConsistent: false, needsHelp: true, retentionAdvice: "待观察", studentComment: "实际夜班频率和薪资结构与入职前沟通存在差异，希望教师协助沟通。", enterpriseComment: "基础操作合格，但独立处理生产告警的能力仍需提高。", skillGap: ["生产告警", "故障复盘", "Shell自动化"] },
  { id: 4, studentId: 10, studentName: "林泽宇", company: "新域内容科技有限公司", jobTitle: "数字化运营专员", onboardDate: "2026.09.10", feedbackOpenDate: "2026.10.10", deadline: "2026.10.17", status: "未到回访时间", studentSubmitted: false, enterpriseSubmitted: false },
];
