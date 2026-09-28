export type DemandStatus = "招聘中" | "待发布" | "已暂停";

export interface EnterpriseDemand {
  id: number;
  title: string;
  department: string;
  city: string;
  salary: string;
  headcount: number;
  matched: number;
  applicants: number;
  status: DemandStatus;
  deadline: string;
  skills: string[];
}

export interface EnterpriseTalent {
  id: number;
  name: string;
  direction: string;
  school: string;
  level: string;
  match: number;
  projects: number;
  certificates: number;
  city: string;
  status: "待沟通" | "已邀约" | "面试中";
  skills: string[];
  highlight: string;
}

export interface TrainingProgram {
  id: number;
  name: string;
  targetRole: string;
  learners: number;
  progress: number;
  qualified: number;
  stage: string;
  mentor: string;
  endDate: string;
}

export interface RecruitmentCandidate {
  id: number;
  name: string;
  role: string;
  match: number;
  school: string;
  updatedAt: string;
  stage: "shortlist" | "interview" | "offer" | "onboard";
}

export const ENTERPRISE_DEMANDS: EnterpriseDemand[] = [
  {
    id: 1,
    title: "AI 应用开发工程师",
    department: "数智产品中心",
    city: "南京",
    salary: "18K–22K",
    headcount: 8,
    matched: 36,
    applicants: 24,
    status: "招聘中",
    deadline: "2026.10.20",
    skills: ["Python", "RAG", "Agent"],
  },
  {
    id: 2,
    title: "数据分析工程师",
    department: "企业数据部",
    city: "上海",
    salary: "14K–18K",
    headcount: 5,
    matched: 22,
    applicants: 17,
    status: "招聘中",
    deadline: "2026.10.08",
    skills: ["SQL", "Python", "BI"],
  },
  {
    id: 3,
    title: "云平台运维工程师",
    department: "基础架构部",
    city: "苏州",
    salary: "12K–16K",
    headcount: 4,
    matched: 15,
    applicants: 9,
    status: "待发布",
    deadline: "2026.10.30",
    skills: ["Linux", "Docker", "K8s"],
  },
  {
    id: 4,
    title: "数字化运营专员",
    department: "用户增长部",
    city: "杭州",
    salary: "10K–14K",
    headcount: 6,
    matched: 18,
    applicants: 31,
    status: "已暂停",
    deadline: "2026.09.28",
    skills: ["用户增长", "数据分析", "内容运营"],
  },
];

export const ENTERPRISE_TALENTS: EnterpriseTalent[] = [
  {
    id: 1,
    name: "李晓林",
    direction: "AI 智能体开发",
    school: "南京理工大学",
    level: "L8 高阶实践者",
    match: 96,
    projects: 5,
    certificates: 4,
    city: "南京",
    status: "待沟通",
    skills: ["Python", "LangChain", "RAG", "FastAPI"],
    highlight: "企业知识库智能问答项目企业评审 A 级",
  },
  {
    id: 2,
    name: "王子涵",
    direction: "大模型应用",
    school: "合肥工业大学",
    level: "L7 项目实践者",
    match: 94,
    projects: 4,
    certificates: 3,
    city: "合肥",
    status: "已邀约",
    skills: ["Prompt", "Agent", "Vue", "Node.js"],
    highlight: "完成智能客服 Agent 从规划到部署全流程",
  },
  {
    id: 3,
    name: "张语晴",
    direction: "数据分析",
    school: "南京邮电大学",
    level: "L7 项目实践者",
    match: 92,
    projects: 6,
    certificates: 3,
    city: "上海",
    status: "面试中",
    skills: ["SQL", "Python", "Tableau", "A/B Test"],
    highlight: "区域人才需求分析平台数据负责人",
  },
  {
    id: 4,
    name: "陈昊",
    direction: "Java 云原生开发",
    school: "河海大学",
    level: "L6 熟练实践者",
    match: 89,
    projects: 4,
    certificates: 2,
    city: "苏州",
    status: "待沟通",
    skills: ["Java", "Spring Boot", "MySQL", "Docker"],
    highlight: "高并发订单系统实训项目核心成员",
  },
  {
    id: 5,
    name: "赵一鸣",
    direction: "网络安全运维",
    school: "西安电子科技大学",
    level: "L8 高阶实践者",
    match: 88,
    projects: 7,
    certificates: 5,
    city: "西安",
    status: "待沟通",
    skills: ["Linux", "SOC", "漏洞分析", "安全巡检"],
    highlight: "云端业务安全巡检系统优秀项目奖",
  },
];

export const ENTERPRISE_TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 1,
    name: "2026 AI 应用开发定向班",
    targetRole: "AI 应用开发工程师",
    learners: 36,
    progress: 72,
    qualified: 28,
    stage: "企业项目实训",
    mentor: "刘志远",
    endDate: "2026.11.18",
  },
  {
    id: 2,
    name: "数据分析人才共育计划",
    targetRole: "数据分析工程师",
    learners: 24,
    progress: 48,
    qualified: 16,
    stage: "岗位核心课程",
    mentor: "周敏",
    endDate: "2026.12.06",
  },
  {
    id: 3,
    name: "云原生工程实践营",
    targetRole: "云平台运维工程师",
    learners: 18,
    progress: 31,
    qualified: 9,
    stage: "基础能力训练",
    mentor: "吴晓峰",
    endDate: "2027.01.12",
  },
];

export const ENTERPRISE_RECRUITMENT: RecruitmentCandidate[] = [
  { id: 1, name: "陈昊", role: "AI 应用开发工程师", match: 91, school: "河海大学", updatedAt: "10:24", stage: "shortlist" },
  { id: 2, name: "林晓曦", role: "数据分析工程师", match: 89, school: "南京财经大学", updatedAt: "09:48", stage: "shortlist" },
  { id: 3, name: "王子涵", role: "AI 应用开发工程师", match: 94, school: "合肥工业大学", updatedAt: "昨天", stage: "interview" },
  { id: 4, name: "张语晴", role: "数据分析工程师", match: 92, school: "南京邮电大学", updatedAt: "昨天", stage: "interview" },
  { id: 5, name: "周嘉言", role: "云平台运维工程师", match: 90, school: "苏州大学", updatedAt: "09.22", stage: "offer" },
  { id: 6, name: "李晓林", role: "AI 应用开发工程师", match: 96, school: "南京理工大学", updatedAt: "09.20", stage: "onboard" },
];
