import { MetricData, ClassRow } from "../types/cockpit";

export const filterOptions = {
  dimensions: [
    { label: "全部校区", value: "all" },
    { label: "北京校区", value: "bj" },
    { label: "上海校区", value: "sh" },
  ],
  terms: [
    { label: "2025年春季第3期", value: "2025-spring-3" },
    { label: "2025年春季第2期", value: "2025-spring-2" },
    { label: "2025年春季第1期", value: "2025-spring-1" },
  ],
  classes: [
    { label: "全部班级", value: "all" },
    { label: "Java开发就业班", value: "java" },
    { label: "前端开发就业班", value: "fe" },
  ],
  courses: [
    { label: "全部课程", value: "all" },
    { label: "Java开发实战", value: "java-prac" },
    { label: "Web前端开发", value: "fe-dev" },
  ],
};

export const generateMetrics = (): MetricData[] => {
  return [
    { id: "enrollment", title: "报名人数", value: "15,745", unit: "人", trend: 12.5, trendIsPercent: true, icon: "users", color: "#06b6d4" },
    { id: "training", title: "在训人数", value: "12,450", unit: "人", trend: 8.2, trendIsPercent: true, icon: "user-check", color: "#3b82f6" },
    { id: "classes", title: "班级数", value: "77", unit: "个", trend: 5, trendIsPercent: false, icon: "layout-grid", color: "#8b5cf6" },
    { id: "teachers", title: "师资数", value: "89", unit: "人", trend: 3, trendIsPercent: false, icon: "award", color: "#f59e0b" },
    { id: "courses", title: "课程数", value: "128", unit: "门", trend: 7, trendIsPercent: false, icon: "book-open-check", color: "#6366f1" },
    { id: "attendance", title: "平均出勤率", value: "92.6", unit: "%", trend: 2.6, trendIsPercent: true, icon: "calendar-check-2", color: "#14b8a6" },
    { id: "completion", title: "完课率 / 通过率", value: "87.3", unit: "%", trend: 4.1, trendIsPercent: true, icon: "trophy", color: "#10b981" },
    { id: "evaluation", title: "课程评价", value: "4.7", unit: "分", trend: 0.2, trendIsPercent: false, icon: "star", color: "#f43f5e" },
    { id: "works", title: "作品数量", value: "1,236", unit: "个", trend: 15.3, trendIsPercent: true, icon: "flame", color: "#f97316" },
  ];
};

export const trendChartData = [
  { name: '2024秋季第1期', 报名人数: 11500, 在训人数: 9050 },
  { name: '2024秋季第2期', 报名人数: 12550, 在训人数: 9800 },
  { name: '2024秋季第3期', 报名人数: 13600, 在训人数: 10500 },
  { name: '2025春季第1期', 报名人数: 14200, 在训人数: 11200 },
  { name: '2025春季第2期', 报名人数: 15100, 在训人数: 11800 },
  { name: '2025春季第3期', 报名人数: 15745, 在训人数: 12450 },
];

export const passRateChartData = [
  { name: '2024秋季第1期', 完课率: 80, 通过率: 62 },
  { name: '2024秋季第2期', 完课率: 78, 通过率: 64 },
  { name: '2024秋季第3期', 完课率: 82, 通过率: 68 },
  { name: '2025春季第1期', 完课率: 85, 通过率: 72 },
  { name: '2025春季第2期', 完课率: 80, 通过率: 70 },
  { name: '2025春季第3期', 完课率: 84, 通过率: 74 },
];

export const employmentDestinationsData = [
  { name: '互联网 / IT', value: 32.2, count: 404, color: '#3b82f6' },
  { name: '智能制造', value: 18.6, count: 234, color: '#2563eb' },
  { name: '金融服务', value: 12.4, count: 156, color: '#14b8a6' },
  { name: '教育培训', value: 8.7, count: 109, color: '#10b981' },
  { name: '文化传媒', value: 7.3, count: 92, color: '#06b6d4' },
  { name: '其他行业', value: 20.8, count: 261, color: '#475569' },
];

export const employmentRolesData = [
  { name: '前端开发工程', value: 28.5, count: 358, color: '#3b82f6' },
  { name: '后端开发工程', value: 25.4, count: 319, color: '#2563eb' },
  { name: '数据分析/算法', value: 15.6, count: 196, color: '#14b8a6' },
  { name: '软件测试/QA', value: 12.0, count: 151, color: '#10b981' },
  { name: 'UI/UX设计', value: 9.5, count: 119, color: '#06b6d4' },
  { name: '其他技术岗', value: 9.0, count: 113, color: '#475569' },
];

export const employmentRegionsData = [
  { name: '一线城市(北上广深)', value: 45.8, count: 575, color: '#3b82f6' },
  { name: '新一线/强二线', value: 28.2, count: 354, color: '#2563eb' },
  { name: '江浙沪周边', value: 12.5, count: 157, color: '#14b8a6' },
  { name: '珠三角周边', value: 8.4, count: 106, color: '#10b981' },
  { name: '中西部核心城', value: 3.1, count: 39, color: '#06b6d4' },
  { name: '其他地区', value: 2.0, count: 25, color: '#475569' },
];

export const studentLevelData = [
  { level: 'L5 专家级', code: 'L5', name: '专家级', count: 1556, percentage: 12.5, passRate: 99.2, color: '#ec4899', desc: '具备独立架构与高阶工程解决能力' },
  { level: 'L4 高级', code: 'L4', name: '高级', count: 3536, percentage: 28.4, passRate: 96.5, color: '#8b5cf6', desc: '熟练掌握复杂业务场景与核心技术栈' },
  { level: 'L3 中级', code: 'L3', name: '中级', count: 4582, percentage: 36.8, passRate: 91.0, color: '#3b82f6', desc: '掌握主流开发框架与标准工程规范' },
  { level: 'L2 初级', code: 'L2', name: '初级', count: 2030, percentage: 16.3, passRate: 85.4, color: '#06b6d4', desc: '具备基础编码与模块实现能力' },
  { level: 'L1 入门级', code: 'L1', name: '入门级', count: 746, percentage: 6.0, passRate: 78.2, color: '#10b981', desc: '新入训或基础理论巩固阶段' },
];

export const courseRankingData = [
  { id: 1, rank: 1, title: '大模型微调与AIGC实战应用', category: '人工智能', score: 4.98, reviews: 1820, satisfaction: 99.6, teacher: '刘AI架构师', trend: '+0.12' },
  { id: 2, rank: 2, title: 'HarmonyOS NEXT全场景开发', category: '移动开发', score: 4.95, reviews: 1450, satisfaction: 99.1, teacher: '黄教研组长', trend: '+0.08' },
  { id: 3, rank: 3, title: 'Java分布式微服务与高并发实战', category: '后端开发', score: 4.92, reviews: 2360, satisfaction: 98.4, teacher: '张维讲师', trend: '+0.05' },
  { id: 4, rank: 4, title: '深度学习与计算机视觉核心算法', category: '人工智能', score: 4.89, reviews: 1280, satisfaction: 97.8, teacher: '赵博士', trend: '+0.03' },
  { id: 5, rank: 5, title: 'Web前端架构与低代码平台工程', category: '前端开发', score: 4.85, reviews: 1940, satisfaction: 96.9, teacher: '李建国讲师', trend: '+0.02' },
  { id: 6, rank: 6, title: 'Go云原生与K8s容器化架构', category: '云原生', score: 4.82, reviews: 1120, satisfaction: 96.2, teacher: '吴浩技术专家', trend: '+0.04' },
  { id: 7, rank: 7, title: 'Python商业数据分析与BI实战', category: '数据分析', score: 4.79, reviews: 1350, satisfaction: 95.8, teacher: '王晨高级讲师', trend: '+0.06' },
  { id: 8, rank: 8, title: 'UI/UX全链路体验设计与设计系统', category: '产品设计', score: 4.78, reviews: 980, satisfaction: 95.5, teacher: '周敏总监', trend: '+0.01' },
  { id: 9, rank: 9, title: '网络攻防渗透与红蓝对抗演练', category: '网络安全', score: 4.75, reviews: 860, satisfaction: 95.0, teacher: '郑特聘专家', trend: '+0.05' },
  { id: 10, rank: 10, title: 'Unity3D与Unreal游戏引擎开发', category: '游戏开发', score: 4.73, reviews: 750, satisfaction: 94.6, teacher: '马游戏制作人', trend: '+0.02' },
  { id: 11, rank: 11, title: '全栈自动化测试体系与平台建设', category: '质量保障', score: 4.71, reviews: 890, satisfaction: 94.2, teacher: '高高级讲师', trend: '+0.03' },
  { id: 12, rank: 12, title: '企业级DevOps持续交付实战', category: '云原生', score: 4.69, reviews: 670, satisfaction: 93.8, teacher: '宋运维主管', trend: '+0.04' },
  { id: 13, rank: 13, title: 'Solidity与Web3智能合约开发', category: '区块链', score: 4.66, reviews: 520, satisfaction: 93.2, teacher: '杨资深专家', trend: '+0.03' },
  { id: 14, rank: 14, title: 'C++高性能系统编程与嵌入式', category: '嵌入式', score: 4.63, reviews: 610, satisfaction: 92.5, teacher: '林工', trend: '+0.02' },
];

export const teacherRankingData = [
  { id: 1, rank: 1, name: '刘AI架构师', title: '特级金牌讲师', field: 'AIGC与大模型', score: 4.98, satisfaction: 99.8, students: 420, coursesCount: 4, avatarBg: 'from-amber-500 to-rose-500' },
  { id: 2, rank: 2, name: '赵博士', title: '卓越导师', field: '深度学习/AI算法', score: 4.96, satisfaction: 99.4, students: 380, coursesCount: 3, avatarBg: 'from-blue-500 to-indigo-600' },
  { id: 3, rank: 3, name: '黄教研组长', title: '金牌讲师', field: '鸿蒙跨平台开发', score: 4.94, satisfaction: 99.1, students: 350, coursesCount: 3, avatarBg: 'from-cyan-500 to-blue-600' },
  { id: 4, rank: 4, name: '张维讲师', title: '骨干名师', field: 'Java微服务架构', score: 4.91, satisfaction: 98.7, students: 520, coursesCount: 5, avatarBg: 'from-purple-500 to-indigo-500' },
  { id: 5, rank: 5, name: '李建国讲师', title: '资深名师', field: 'Web全栈工程', score: 4.88, satisfaction: 98.2, students: 460, coursesCount: 4, avatarBg: 'from-teal-500 to-emerald-600' },
  { id: 6, rank: 6, name: '周敏总监', title: '行业专家', field: 'UI/UX全栈设计', score: 4.86, satisfaction: 98.0, students: 290, coursesCount: 2, avatarBg: 'from-pink-500 to-rose-500' },
  { id: 7, rank: 7, name: '吴浩技术专家', title: '云原生先锋', field: 'Go语言与K8s', score: 4.85, satisfaction: 97.9, students: 310, coursesCount: 3, avatarBg: 'from-sky-500 to-blue-700' },
  { id: 8, rank: 8, name: '王晨高级讲师', title: '数据领军人', field: 'Python数据分析', score: 4.83, satisfaction: 97.5, students: 390, coursesCount: 3, avatarBg: 'from-violet-500 to-purple-600' },
  { id: 9, rank: 9, name: '孙明讲师', title: '资深架构师', field: '大数据开发与应用', score: 4.80, satisfaction: 97.1, students: 330, coursesCount: 2, avatarBg: 'from-amber-600 to-orange-600' },
  { id: 10, rank: 10, name: '马游戏制作人', title: '卓越导师', field: 'Unity3D/UE引擎', score: 4.78, satisfaction: 96.8, students: 260, coursesCount: 2, avatarBg: 'from-emerald-500 to-teal-700' },
  { id: 11, rank: 11, name: '郑特聘专家', title: '特聘安全顾问', field: '攻防渗透实战', score: 4.76, satisfaction: 96.5, students: 280, coursesCount: 2, avatarBg: 'from-red-500 to-rose-700' },
  { id: 12, rank: 12, name: '徐副教授', title: '金牌讲师', field: '全栈架构演进', score: 4.74, satisfaction: 96.2, students: 340, coursesCount: 3, avatarBg: 'from-indigo-500 to-cyan-600' },
];

export const courseEvaluationsData = [
  { subject: '5分', value: 58 },
  { subject: '4分', value: 42 },
  { subject: '3分', value: 18 },
  { subject: '2分', value: 6 },
  { subject: '1分', value: 4 },
];

export const worksTrendData = [
  { name: '2024秋季第1期', 作品数量: 950 },
  { name: '2024秋季第2期', 作品数量: 980 },
  { name: '2024秋季第3期', 作品数量: 960 },
  { name: '2025春季第1期', 作品数量: 1400 },
  { name: '2025春季第2期', 作品数量: 1236 },
  { name: '2025春季第3期', 作品数量: 1200 },
];

export const classTableData: ClassRow[] = [
  { id: 1, className: 'AIGC应用工程师班-01期', courseName: '大模型微调与Prompt', count: 36, attendance: 97.5, completion: 94.8, passRate: 96.0, eval: 5.0, instructor: '刘AI架构师', status: '优秀', campus: '北京校区' },
  { id: 2, className: '鸿蒙应用开发班-01期', courseName: 'HarmonyOS开发', count: 27, attendance: 96.2, completion: 93.0, passRate: 94.5, eval: 4.9, instructor: '黄教研组长', status: '优秀', campus: '上海校区' },
  { id: 3, className: 'Java开发就业班-01期', courseName: 'Java开发实战', count: 35, attendance: 96.8, completion: 92.4, passRate: 95.1, eval: 4.9, instructor: '张维讲师', status: '优秀', campus: '北京校区' },
  { id: 4, className: '人工智能算法班-01期', courseName: '深度学习与AI', count: 30, attendance: 95.6, completion: 91.0, passRate: 94.2, eval: 4.9, instructor: '赵博士', status: '优秀', campus: '北京校区' },
  { id: 5, className: '前端开发就业班-02期', courseName: 'Web前端开发', count: 32, attendance: 94.5, completion: 90.1, passRate: 91.8, eval: 4.8, instructor: '李建国讲师', status: '优秀', campus: '北京校区' },
  { id: 6, className: 'Go云原生架构班-01期', courseName: 'Go语言与K8s', count: 29, attendance: 94.1, completion: 89.8, passRate: 92.0, eval: 4.8, instructor: '吴浩技术专家', status: '优秀', campus: '上海校区' },
  { id: 7, className: 'Python数据分析班-01期', courseName: 'Python数据分析', count: 28, attendance: 93.2, completion: 88.5, passRate: 89.4, eval: 4.7, instructor: '王晨高级讲师', status: '良好', campus: '上海校区' },
  { id: 8, className: 'UI/UX全栈设计班-02期', courseName: 'UI/UX设计实战', count: 25, attendance: 92.0, completion: 87.2, passRate: 88.0, eval: 4.7, instructor: '周敏总监', status: '良好', campus: '北京校区' },
  { id: 9, className: '游戏开发引擎班-01期', courseName: 'Unity3D与Unreal', count: 23, attendance: 95.0, completion: 90.5, passRate: 92.1, eval: 4.8, instructor: '马游戏制作人', status: '优秀', campus: '上海校区' },
  { id: 10, className: '全栈开发就业班-04期', courseName: 'Node.js+React全栈', count: 30, attendance: 93.8, completion: 89.0, passRate: 90.5, eval: 4.7, instructor: '徐副教授', status: '良好', campus: '上海校区' },
  { id: 11, className: '大数据开发班-03期', courseName: '大数据开发与应用', count: 31, attendance: 91.8, completion: 86.7, passRate: 87.5, eval: 4.6, instructor: '孙明讲师', status: '良好', campus: '上海校区' },
  { id: 12, className: '区块链开发精英班-01期', courseName: 'Solidity与Web3', count: 20, attendance: 92.3, completion: 88.0, passRate: 89.2, eval: 4.6, instructor: '杨资深专家', status: '良好', campus: '北京校区' },
  { id: 13, className: '云计算运维架构班-02期', courseName: 'DevOps与Cloud Native', count: 24, attendance: 91.5, completion: 86.0, passRate: 87.2, eval: 4.6, instructor: '宋运维主管', status: '良好', campus: '上海校区' },
  { id: 14, className: 'Java全栈冲刺班-05期', courseName: 'Java微服务架构', count: 34, attendance: 90.2, completion: 85.6, passRate: 86.4, eval: 4.5, instructor: '陈海讲师', status: '良好', campus: '上海校区' },
  { id: 15, className: '网络安全渗透班-02期', courseName: '攻防渗透实战', count: 26, attendance: 88.4, completion: 81.2, passRate: 82.5, eval: 4.3, instructor: '郑特聘专家', status: '需关注', campus: '北京校区', alertReason: '完课率低于85%' },
  { id: 16, className: '软件测试自动化班-03期', courseName: '全栈自动化测试', count: 33, attendance: 89.0, completion: 83.4, passRate: 84.0, eval: 4.4, instructor: '高高级讲师', status: '需关注', campus: '北京校区', alertReason: '通过率低于85%' },
  { id: 17, className: '数据分析强化班-04期', courseName: '商业数据分析与BI', count: 29, attendance: 87.9, completion: 82.0, passRate: 83.5, eval: 4.3, instructor: '胡数据专家', status: '需关注', campus: '北京校区', alertReason: '出勤率及通过率较低' },
  { id: 18, className: '嵌入式物联网班-01期', courseName: 'C++与嵌入式系统', count: 22, attendance: 86.5, completion: 79.8, passRate: 80.1, eval: 4.2, instructor: '林工', status: '需关注', campus: '北京校区', alertReason: '出勤率及完课率偏低' },
  { id: 19, className: '大模型Agent应用实战班-02期', courseName: 'LangChain与智能体', count: 38, attendance: 98.1, completion: 95.2, passRate: 96.8, eval: 4.9, instructor: '刘AI架构师', status: '优秀', campus: '北京校区' },
  { id: 20, className: '鸿蒙元服务开发进阶班-02期', courseName: 'HarmonyOS元服务', count: 26, attendance: 95.8, completion: 92.4, passRate: 93.6, eval: 4.8, instructor: '黄教研组长', status: '优秀', campus: '上海校区' },
  { id: 21, className: 'SpringCloud微服务高并发班-03期', courseName: '微服务与性能调优', count: 33, attendance: 94.2, completion: 90.6, passRate: 92.4, eval: 4.8, instructor: '张维讲师', status: '优秀', campus: '北京校区' },
  { id: 22, className: '计算机视觉实战强化班-02期', courseName: 'OpenCV与目标检测', count: 27, attendance: 93.5, completion: 89.2, passRate: 91.0, eval: 4.7, instructor: '赵博士', status: '良好', campus: '北京校区' },
  { id: 23, className: '微前端与低代码平台班-01期', courseName: '现代前端工程化', count: 31, attendance: 94.0, completion: 89.5, passRate: 91.2, eval: 4.8, instructor: '李建国讲师', status: '优秀', campus: '上海校区' },
  { id: 24, className: 'K8s与微服务服务网格班-02期', courseName: 'Istio与云原生运维', count: 25, attendance: 92.8, completion: 88.0, passRate: 89.6, eval: 4.7, instructor: '吴浩技术专家', status: '良好', campus: '上海校区' },
  { id: 25, className: '大数据实时计算Flink班-01期', courseName: 'Flink+Kafka流计算', count: 28, attendance: 91.2, completion: 86.4, passRate: 87.8, eval: 4.6, instructor: '孙明讲师', status: '良好', campus: '北京校区' },
  { id: 26, className: '网络安全护网攻防演练班-03期', courseName: '内网渗透与应急响应', count: 24, attendance: 87.2, completion: 80.5, passRate: 81.8, eval: 4.2, instructor: '郑特聘专家', status: '需关注', campus: '上海校区', alertReason: '通过率及完课率偏低' },
  { id: 27, className: 'DevOps流水线建设实战班-03期', courseName: 'GitLab CI/CD与Docker', count: 26, attendance: 93.1, completion: 88.7, passRate: 90.2, eval: 4.7, instructor: '宋运维主管', status: '良好', campus: '北京校区' },
  { id: 28, className: '3D游戏物理与着色器特效班-02期', courseName: 'Shader编程与HLSL', count: 21, attendance: 94.6, completion: 90.0, passRate: 91.5, eval: 4.8, instructor: '马游戏制作人', status: '优秀', campus: '上海校区' },
  { id: 29, className: '移动跨平台Flutter实训班-01期', courseName: 'Flutter 3.0全平台开发', count: 29, attendance: 93.0, completion: 88.2, passRate: 89.8, eval: 4.6, instructor: '徐副教授', status: '良好', campus: '北京校区' },
  { id: 30, className: 'AI大模型应用测试与评测班-01期', courseName: 'LLM自动化评估与安全测试', count: 32, attendance: 95.4, completion: 91.8, passRate: 93.2, eval: 4.8, instructor: '高高级讲师', status: '优秀', campus: '上海校区' },
];
