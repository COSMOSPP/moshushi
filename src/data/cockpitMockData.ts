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
  { name: '互联网 / IT', value: 32.2, color: '#3b82f6' },
  { name: '智能制造', value: 18.6, color: '#2563eb' },
  { name: '金融服务', value: 12.4, color: '#14b8a6' },
  { name: '教育培训', value: 8.7, color: '#10b981' },
  { name: '文化传媒', value: 7.3, color: '#06b6d4' },
  { name: '其他', value: 20.8, color: '#475569' },
];

export const employmentRolesData = [
  { name: '前端开发工程', value: 28.5, color: '#3b82f6' },
  { name: '后端开发工程', value: 25.4, color: '#2563eb' },
  { name: '数据分析/算法', value: 15.6, color: '#14b8a6' },
  { name: '软件测试/QA', value: 12.0, color: '#10b981' },
  { name: 'UI/UX设计', value: 9.5, color: '#06b6d4' },
  { name: '其他技术岗', value: 9.0, color: '#475569' },
];

export const employmentRegionsData = [
  { name: '一线城市(北上广深)', value: 45.8, color: '#3b82f6' },
  { name: '新一线/强二线', value: 28.2, color: '#2563eb' },
  { name: '江浙沪周边', value: 12.5, color: '#14b8a6' },
  { name: '珠三角周边', value: 8.4, color: '#10b981' },
  { name: '中西部核心城', value: 3.1, color: '#06b6d4' },
  { name: '其他地区', value: 2.0, color: '#475569' },
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
  { id: 1, className: 'Java开发就业班-01期', courseName: 'Java开发实战', count: 35, attendance: 96.8, completion: 92.4, passRate: 95.1, eval: 4.9, instructor: '张维讲师', status: '优秀', campus: '北京校区' },
  { id: 2, className: '前端开发就业班-02期', courseName: 'Web前端开发', count: 32, attendance: 94.5, completion: 90.1, passRate: 91.8, eval: 4.8, instructor: '李建国讲师', status: '优秀', campus: '北京校区' },
  { id: 3, className: 'Python数据分析班-01期', courseName: 'Python数据分析', count: 28, attendance: 93.2, completion: 88.5, passRate: 89.4, eval: 4.7, instructor: '王晨高级讲师', status: '良好', campus: '上海校区' },
  { id: 4, className: '人工智能算法班-01期', courseName: '深度学习与AI', count: 30, attendance: 95.6, completion: 91.0, passRate: 94.2, eval: 4.9, instructor: '赵博士', status: '优秀', campus: '北京校区' },
  { id: 5, className: '大数据开发班-03期', courseName: '大数据开发与应用', count: 31, attendance: 91.8, completion: 86.7, passRate: 87.5, eval: 4.6, instructor: '孙明讲师', status: '良好', campus: '上海校区' },
  { id: 6, className: 'UI/UX全栈设计班-02期', courseName: 'UI/UX设计实战', count: 25, attendance: 92.0, completion: 87.2, passRate: 88.0, eval: 4.7, instructor: '周敏总监', status: '良好', campus: '北京校区' },
  { id: 7, className: 'Go云原生架构班-01期', courseName: 'Go语言与K8s', count: 29, attendance: 94.1, completion: 89.8, passRate: 92.0, eval: 4.8, instructor: '吴浩技术专家', status: '优秀', campus: '上海校区' },
  { id: 8, className: '网络安全渗透班-02期', courseName: '攻防渗透实战', count: 26, attendance: 88.4, completion: 81.2, passRate: 82.5, eval: 4.3, instructor: '郑特聘专家', status: '需关注', campus: '北京校区', alertReason: '完课率低于85%' },
  { id: 9, className: 'Java全栈冲刺班-05期', courseName: 'Java微服务架构', count: 34, attendance: 90.2, completion: 85.6, passRate: 86.4, eval: 4.5, instructor: '陈海讲师', status: '良好', campus: '上海校区' },
  { id: 10, className: '嵌入式物联网班-01期', courseName: 'C++与嵌入式系统', count: 22, attendance: 86.5, completion: 79.8, passRate: 80.1, eval: 4.2, instructor: '林工', status: '需关注', campus: '北京校区', alertReason: '出勤率及完课率偏低' },
  { id: 11, className: '鸿蒙应用开发班-01期', courseName: 'HarmonyOS开发', count: 27, attendance: 96.2, completion: 93.0, passRate: 94.5, eval: 4.9, instructor: '黄教研组长', status: '优秀', campus: '上海校区' },
  { id: 12, className: '软件测试自动化班-03期', courseName: '全栈自动化测试', count: 33, attendance: 89.0, completion: 83.4, passRate: 84.0, eval: 4.4, instructor: '高高级讲师', status: '需关注', campus: '北京校区', alertReason: '通过率低于85%' },
  { id: 13, className: '全栈开发就业班-04期', courseName: 'Node.js+React全栈', count: 30, attendance: 93.8, completion: 89.0, passRate: 90.5, eval: 4.7, instructor: '徐副教授', status: '良好', campus: '上海校区' },
  { id: 14, className: 'AIGC应用工程师班-01期', courseName: '大模型微调与Prompt', count: 36, attendance: 97.5, completion: 94.8, passRate: 96.0, eval: 5.0, instructor: '刘AI架构师', status: '优秀', campus: '北京校区' },
  { id: 15, className: '云计算运维架构班-02期', courseName: 'DevOps与Cloud Native', count: 24, attendance: 91.5, completion: 86.0, passRate: 87.2, eval: 4.6, instructor: '宋运维主管', status: '良好', campus: '上海校区' },
  { id: 16, className: '数据分析强化班-04期', courseName: '商业数据分析与BI', count: 29, attendance: 87.9, completion: 82.0, passRate: 83.5, eval: 4.3, instructor: '胡数据专家', status: '需关注', campus: '北京校区', alertReason: '出勤率及通过率较低' },
  { id: 17, className: '游戏开发引擎班-01期', courseName: 'Unity3D与Unreal', count: 23, attendance: 95.0, completion: 90.5, passRate: 92.1, eval: 4.8, instructor: '马游戏制作人', status: '优秀', campus: '上海校区' },
  { id: 18, className: '区块链开发精英班-01期', courseName: 'Solidity与Web3', count: 20, attendance: 92.3, completion: 88.0, passRate: 89.2, eval: 4.6, instructor: '杨资深专家', status: '良好', campus: '北京校区' }
];
