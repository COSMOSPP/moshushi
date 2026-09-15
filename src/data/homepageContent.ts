import adminPortrait from "@/admin.jpg";
import teacherPortrait from "@/teacher-img.jpg";
import teacherLoginPortrait from "@/teacher-login-bg.jpg";

export type CapabilityIcon = "standard" | "talent" | "enterprise" | "employment" | "dashboard";

export interface CapabilityStep {
  title: string;
  items: string[];
}

export interface BusinessCapability {
  id: string;
  tab: string;
  eyebrow: string;
  title: string;
  valueStatement: string;
  description: string;
  icon: CapabilityIcon;
  tags: string[];
  systemTitle: string;
  systemDescription: string;
  steps: CapabilityStep[];
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
    tab: "行业能力标准",
    eyebrow: "INDUSTRY STANDARD",
    title: "行业能力标准\n建设服务",
    valueStatement: "构建产业数字人才标准化能力体系",
    description: "基于产业发展趋势、企业岗位需求和人才能力要求，建立标准化、数字化、可测评、可认证的人才能力体系，为产业发展提供坚实的人才基础。",
    icon: "standard",
    tags: ["标准化", "数字化", "可测评", "可认证"],
    systemTitle: "行业能力标准体系",
    systemDescription: "从行业需求到人才认证，建立完整的数字人才标准体系。",
    steps: [
      { title: "行业人才标准", items: ["行业趋势分析", "人才需求分析", "职业方向划分", "人才等级定义"] },
      { title: "企业岗位标准", items: ["岗位职责", "岗位技能", "工具能力", "业务能力"] },
      { title: "人才能力模型", items: ["AI 应用能力", "数据分析能力", "数字运营能力", "项目管理能力", "内容生产能力", "沟通协作能力"] },
      { title: "人才测评标准", items: ["知识测评", "技能测评", "项目实训", "综合能力", "岗位匹配度"] },
      { title: "人才库标准", items: ["能力认证", "等级认证", "企业人才库"] },
    ],
    actionLabel: "查看详细流程",
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
    eyebrow: "TALENT DEVELOPMENT",
    title: "产业数字人才\n培育服务",
    valueStatement: "围绕紧缺岗位，搭建可落地的学习成长路径",
    description: "以岗位胜任为目标组合课程、项目和实训资源，支持院校、园区与企业快速落地数字人才培养项目。",
    icon: "talent",
    tags: ["分层培养", "项目驱动", "产教融合", "成长可见"],
    systemTitle: "产业人才培养体系",
    systemDescription: "从人才需求识别到能力成长，让课程、训练与真实项目连续衔接。",
    steps: [
      { title: "人才需求图谱", items: ["产业紧缺方向", "区域人才缺口", "岗位能力需求"] },
      { title: "分层课程体系", items: ["基础通识课程", "岗位专项课程", "前沿技术课程"] },
      { title: "学习成长路径", items: ["知识学习", "技能训练", "项目实践", "阶段测评", "导师辅导", "成长档案"] },
      { title: "真实项目实训", items: ["企业真实场景", "云端实训环境", "项目成果沉淀"] },
      { title: "能力成长认证", items: ["过程能力评价", "阶段等级提升", "认证结果输出"] },
    ],
    actionLabel: "全部课程",
    actionHref: "/user/courses",
    metrics: [
      { value: "86+", label: "精品课程" },
      { value: "180+", label: "实战项目" },
      { value: "31", label: "覆盖地区" },
    ],
  },
  {
    id: "enterprise-enablement",
    tab: "企业数字化赋能",
    eyebrow: "ENTERPRISE ENABLEMENT",
    title: "企业数字化能力\n赋能服务",
    valueStatement: "以岗位与人才为支点，推动企业数字能力升级",
    description: "围绕企业业务目标诊断数字化能力缺口，建设数字岗位、人才模型、工具实训和可持续的人才梯队。",
    icon: "enterprise",
    tags: ["企业诊断", "岗位升级", "工具赋能", "梯队建设"],
    systemTitle: "企业数字化能力升级体系",
    systemDescription: "把业务问题转化为岗位能力要求，以人才成长支撑企业数字化转型。",
    steps: [
      { title: "企业能力诊断", items: ["业务目标梳理", "数字成熟度评估", "能力缺口识别"] },
      { title: "数字岗位设计", items: ["岗位任务重构", "职责边界定义", "胜任标准建立"] },
      { title: "企业数智应用场景", items: ["AI 业务应用", "数据分析决策", "流程自动化", "智能客户服务", "数字化运营", "协同管理"] },
      { title: "数字化项目落地", items: ["应用方案实施", "业务流程改造", "项目成效评估"] },
      { title: "人才梯队建设", items: ["骨干人才识别", "分层培养计划", "组织能力沉淀"] },
    ],
    actionLabel: "生命周期管理",
    actionHref: "/teacher/student-lifecycle",
    metrics: [
      { value: "368+", label: "合作企业" },
      { value: "120+", label: "数字岗位" },
      { value: "86%", label: "能力提升率" },
    ],
  },
  {
    id: "certification-employment",
    tab: "人才认证与就业",
    eyebrow: "CERTIFICATION & EMPLOYMENT",
    title: "人才认证与\n就业服务",
    valueStatement: "让学习成果成为就业凭证，让每一次成长获得持续激励",
    description: "汇聚课程、项目、实训与导师评价成果，贯通能力认证、人岗匹配、就业服务和成长激励。",
    icon: "employment",
    tags: ["成果沉淀", "多元认证", "精准匹配", "成长激励"],
    systemTitle: "人才认证与就业服务闭环",
    systemDescription: "以真实成果为凭证，以人岗匹配为核心，连接认证、推荐、就业与持续成长。",
    steps: [
      { title: "成果档案", items: ["课程成绩", "项目作品", "实训记录", "导师评价"] },
      { title: "多元认证", items: ["技能认证", "项目认证", "企业联合认证", "证书核验"] },
      { title: "人岗智能匹配", items: ["能力标签", "岗位画像", "求职意向", "地域偏好", "成长潜力", "匹配指数"] },
      { title: "就业服务", items: ["简历优化", "模拟面试", "双选活动", "定向推荐"] },
      { title: "成长激励", items: ["成长积分", "等级晋升", "荣誉勋章", "就业跟踪"] },
    ],
    actionLabel: "查看成长激励",
    actionHref: "/teacher/growth-incentives",
    metrics: [
      { value: "368+", label: "合作企业" },
      { value: "6,200+", label: "岗位需求" },
      { value: "89%", label: "就业匹配率" },
    ],
  },
  {
    id: "smart-dashboard",
    tab: "智能驾驶舱",
    eyebrow: "SMART COCKPIT",
    title: "智能数字驾驶舱\n服务",
    valueStatement: "一个平台看清培养全貌，让运营决策有据可依",
    description: "面向学院管理者与主管部门，统一查看招生、学习、测评、认证和就业数据，及时发现问题并评估项目成效。",
    icon: "dashboard",
    tags: ["实时数据", "多维分析", "风险预警", "决策支持"],
    systemTitle: "数字人才运营驾驶舱",
    systemDescription: "汇聚培养全过程数据，实时呈现质量趋势、人才结构与就业成效。",
    steps: [
      { title: "招生", items: ["生源结构", "报名转化"] },
      { title: "学习", items: ["活跃度", "完成率"] },
      { title: "测评", items: ["能力分布", "质量趋势"] },
      { title: "认证", items: ["获证率", "等级结构"] },
      { title: "就业", items: ["匹配率", "去向跟踪"] },
    ],
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
