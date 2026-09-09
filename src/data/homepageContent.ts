import adminPortrait from "@/admin.jpg";
import teacherPortrait from "@/teacher-img.jpg";
import teacherLoginPortrait from "@/teacher-login-bg.jpg";

export type CapabilityIcon = "standard" | "talent" | "growth" | "employment" | "dashboard";

export interface BusinessCapability {
  id: string;
  tab: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: CapabilityIcon;
  highlights: string[];
  metrics: Array<{ value: string; label: string }>;
  actionLabel: string;
  actionHref: string;
}

export const PLATFORM_STATS = [
  { value: "12,580", suffix: "+", label: "累计培养学员", note: "覆盖多层次数字人才" },
  { value: "368", suffix: "+", label: "合作企业", note: "共建岗位能力标准" },
  { value: "86", suffix: "+", label: "精品课程", note: "紧跟产业技术变化" },
  { value: "42", suffix: "个", label: "人才认证方向", note: "能力结果可验证" },
] as const;

export const BUSINESS_CAPABILITIES: BusinessCapability[] = [
  {
    id: "industry-standard",
    tab: "行业能力标准建设",
    eyebrow: "标准先行",
    title: "把企业真实岗位要求，转化为可执行的人才培养标准",
    description: "联合行业专家与头部企业梳理岗位任务、能力项和评价指标，让课程、实训与认证从同一套能力标准出发。",
    icon: "standard",
    highlights: ["岗位任务与核心能力拆解", "课程、实训、测评标准统一", "行业标准持续迭代更新"],
    actionLabel: "了解解决方案",
    actionHref: "/login",
    metrics: [
      { value: "42", label: "认证方向" },
      { value: "260+", label: "能力指标" },
      { value: "96%", label: "企业认可度" },
    ],
  },
  {
    id: "talent-development",
    tab: "产业人才培育",
    eyebrow: "产教融合",
    title: "围绕产业紧缺岗位，建设从基础到实战的培养路径",
    description: "以岗位胜任为目标组合课程、项目和实训资源，支持院校、园区与企业快速落地数字人才培养项目。",
    icon: "talent",
    highlights: ["分层分岗培养方案", "真实产业项目驱动", "教师与企业导师协同"],
    actionLabel: "全部课程",
    actionHref: "/user/courses",
    metrics: [
      { value: "86+", label: "精品课程" },
      { value: "180+", label: "实战项目" },
      { value: "31", label: "覆盖地区" },
    ],
  },
  {
    id: "learner-growth",
    tab: "学员成长全周期",
    eyebrow: "成长可见",
    title: "记录每一次学习与实践，形成持续更新的能力画像",
    description: "贯通学习、练习、项目、测评与认证数据，让学员明确成长方向，让管理者及时识别培养成效。",
    icon: "growth",
    highlights: ["个性化学习路径推荐", "能力雷达与成长档案", "阶段预警和精准辅导"],
    actionLabel: "查看详情",
    actionHref: "/teacher/student-lifecycle",
    metrics: [
      { value: "12,580+", label: "学员档案" },
      { value: "92%", label: "课程完成率" },
      { value: "4.8", label: "平均满意度" },
    ],
  },
  {
    id: "targeted-employment",
    tab: "企业定向就业",
    eyebrow: "岗位直达",
    title: "从企业需求出发定向培养，让人才能力与岗位精准衔接",
    description: "企业深度参与需求诊断、课程设计和项目评审，平台依据能力结果完成分层推荐与就业服务。",
    icon: "employment",
    highlights: ["企业岗位需求前置", "培养过程共同参与", "认证结果辅助人才匹配"],
    actionLabel: "了解解决方案",
    actionHref: "/login",
    metrics: [
      { value: "368+", label: "合作企业" },
      { value: "6,200+", label: "岗位需求" },
      { value: "89%", label: "就业匹配率" },
    ],
  },
  {
    id: "smart-dashboard",
    tab: "智能数字驾驶舱",
    eyebrow: "运营有数",
    title: "用一套驾驶舱看清招生、教学、实训、认证与就业",
    description: "为学院和主管部门提供多层级数据视图，关键指标可追踪、异常情况可预警、运营结果可复盘。",
    icon: "dashboard",
    highlights: ["核心指标实时总览", "区域、学院、专业多维分析", "培养质量与就业结果联动"],
    actionLabel: "查看驾驶舱",
    actionHref: "/cockpit",
    metrics: [
      { value: "28", label: "运营指标" },
      { value: "7×24", label: "实时监测" },
      { value: "18", label: "预警模型" },
    ],
  },
];

export const FEATURED_WORKS = [
  {
    title: "企业知识库智能问答助手",
    author: "学员联合项目组",
    direction: "AI 智能体",
    cover: "/images/covers/microsoft_tech_ai_1779333317936.png",
    description: "基于企业知识文档构建可追溯的问答助手，覆盖知识检索、流程查询与服务支持。",
  },
  {
    title: "区域人才需求分析平台",
    author: "数据分析实训班",
    direction: "数据分析",
    cover: "/images/covers/microsoft_tech_data_1779333332856.png",
    description: "融合招聘与培养数据，呈现紧缺岗位、技能变化和人才供需趋势。",
  },
  {
    title: "云端业务安全巡检系统",
    author: "云安全项目组",
    direction: "安全运维",
    cover: "/images/covers/microsoft_tech_cyber_1779333412582.png",
    description: "围绕云资源配置、风险识别和处置闭环完成一体化安全巡检。",
  },
] as const;

export const FEATURED_COURSES = [
  {
    title: "AI 大模型与通识基础",
    description: "理解大模型原理、能力边界与典型产业应用。",
    cover: "/images/covers/microsoft_tech_ai_1779333317936.png",
    tags: ["AI 基础", "热门"],
    hours: "24 课时",
    level: "入门",
    learners: "3,820 人",
  },
  {
    title: "AI 智能体应用开发",
    description: "从工作流设计到工具调用，完成企业级智能体项目。",
    cover: "/images/covers/microsoft_tech_dev_1779333430898.png",
    tags: ["项目实战", "Agent"],
    hours: "36 课时",
    level: "进阶",
    learners: "2,460 人",
  },
  {
    title: "数据分析与商业洞察",
    description: "用真实业务数据完成清洗、分析与可视化表达。",
    cover: "/images/covers/microsoft_tech_data_1779333332856.png",
    tags: ["数据分析", "实训"],
    hours: "32 课时",
    level: "进阶",
    learners: "2,180 人",
  },
  {
    title: "云计算架构与实践",
    description: "掌握云上资源规划、部署运维与成本优化方法。",
    cover: "/images/covers/microsoft_tech_cloud_1779333396845.png",
    tags: ["云计算", "认证"],
    hours: "40 课时",
    level: "进阶",
    learners: "1,960 人",
  },
  {
    title: "机器学习项目进阶",
    description: "完成模型训练、评估、调优与服务化的完整流程。",
    cover: "/images/covers/microsoft_tech_ml_1779333449102.png",
    tags: ["机器学习", "算法"],
    hours: "48 课时",
    level: "高阶",
    learners: "1,680 人",
  },
  {
    title: "网络安全攻防实训",
    description: "通过隔离靶场掌握风险发现、验证与修复流程。",
    cover: "/images/covers/microsoft_tech_cyber_1779333412582.png",
    tags: ["网络安全", "靶场"],
    hours: "42 课时",
    level: "高阶",
    learners: "1,520 人",
  },
] as const;

export const TEACHERS = [
  {
    name: "周明远",
    role: "人工智能首席讲师",
    direction: "大模型与智能体",
    biography: "10 年 AI 工程与人才培养经验，主导多个企业智能化转型项目。",
    tags: ["企业导师", "AI Agent", "项目评审"],
    portrait: teacherPortrait,
  },
  {
    name: "陈思齐",
    role: "数据技术教研负责人",
    direction: "数据分析与云计算",
    biography: "长期服务产业园区和院校数字人才项目，专注数据能力标准建设。",
    tags: ["课程研发", "数据治理", "云架构"],
    portrait: adminPortrait,
  },
  {
    name: "林浩然",
    role: "产业实践导师",
    direction: "软件工程与数字化创新",
    biography: "参与多项企业数字产品建设，擅长以真实项目组织工程实训。",
    tags: ["产业项目", "工程实践", "就业辅导"],
    portrait: teacherLoginPortrait,
  },
] as const;

export const ENTERPRISE_PARTNERS = [
  "华为云", "阿里云", "腾讯云", "百度智能云", "京东科技", "科大讯飞",
  "用友", "金蝶", "奇安信", "浪潮", "软通动力", "东软集团",
] as const;

export const TRAINING_STEPS = [
  { number: "01", title: "企业需求诊断", description: "明确岗位目标与用人规模" },
  { number: "02", title: "岗位能力模型", description: "拆解任务和能力评价项" },
  { number: "03", title: "定制课程", description: "组合课程与企业案例" },
  { number: "04", title: "实战训练", description: "在真实场景中完成项目" },
  { number: "05", title: "能力测评", description: "形成可验证的能力结果" },
  { number: "06", title: "人才推荐", description: "按岗位要求分层匹配" },
] as const;

export const EMPLOYMENT_STAGES = [
  {
    number: "01",
    title: "定制培养",
    description: "对照目标岗位构建个人成长路径，让学员从入学起就明确职业方向。",
    items: ["岗位能力基线测评", "个性化课程路径", "企业导师阶段指导"],
  },
  {
    number: "02",
    title: "实战实训",
    description: "以真实业务任务检验能力，将学习成果沉淀为可展示的项目作品。",
    items: ["企业真实项目", "过程能力评价", "作品集与认证结果"],
  },
  {
    number: "03",
    title: "定向推荐",
    description: "基于能力画像与企业岗位模型进行匹配，提供贯穿入职前后的就业服务。",
    items: ["人岗智能匹配", "简历与面试辅导", "就业结果跟踪"],
  },
] as const;

export const OPERATIONS_TREND = [
  { month: "3月", active: 62, completed: 48 },
  { month: "4月", active: 68, completed: 54 },
  { month: "5月", active: 74, completed: 61 },
  { month: "6月", active: 79, completed: 67 },
  { month: "7月", active: 86, completed: 74 },
  { month: "8月", active: 91, completed: 82 },
] as const;

export const OPERATIONS_METRICS = [
  { label: "本期在培学员", value: "2,846", change: "+12.6%" },
  { label: "课程完成率", value: "92.4%", change: "+3.2%" },
  { label: "能力认证率", value: "86.8%", change: "+5.7%" },
] as const;
