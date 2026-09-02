import React, { useState, useMemo } from 'react';
import { 
  Users, 
  UserPlus, 
  FileSpreadsheet, 
  QrCode, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Filter, 
  ChevronRight, 
  Eye, 
  Edit3, 
  Award, 
  Briefcase, 
  History, 
  Download, 
  Upload, 
  Copy, 
  ExternalLink, 
  Check, 
  AlertCircle, 
  Layers, 
  GraduationCap, 
  Sparkles, 
  Calendar, 
  Phone, 
  Mail, 
  Building2, 
  Tag, 
  BookOpen, 
  Cpu, 
  BarChart3, 
  CheckSquare, 
  Square, 
  ShieldCheck, 
  Share2, 
  FileText, 
  Plus, 
  Trash2, 
  RefreshCw, 
  ArrowRight,
  TrendingUp,
  MapPin,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// ==================== Types ====================

export type LifecycleStatus = 
  | '报名待审' 
  | '审核驳回' 
  | '待分班' 
  | '在读学习' 
  | '结业待考' 
  | '已获证书' 
  | '已就业' 
  | '休学' 
  | '退学';

export type SourceChannel = '校招直通' | '校企合作' | '社招公开' | '政企委托' | '自主报名';

export type IntentDirection = 
  | '大模型开发与微调' 
  | 'AIGC应用工程' 
  | '云计算运维架构' 
  | 'AI计算机视觉' 
  | '大数据分析与挖掘' 
  | '物联网嵌入式AI';

export interface AuditRecord {
  id: string;
  timestamp: string;
  operator: string;
  fieldName: string;
  oldValue: string;
  newValue: string;
  reason: string;
}

export interface EmploymentInfo {
  status: '已正式签约' | '拟录用/Offer' | '升学深造' | '自主创业' | '求职中' | '暂无意向';
  company?: string;
  position?: string;
  salary?: string;
  city?: string;
  signDate?: string;
  contractUrl?: string;
  notes?: string;
}

export interface StudentLifecycleItem {
  id: string;
  studentNo: string;
  name: string;
  gender: '男' | '女';
  age: number;
  phone: string;
  email: string;
  university: string;
  major: string;
  education: '本科' | '硕士' | '大专' | '博士' | '其他';
  graduationYear: string;
  
  // Registration & Tags
  registerDate: string;
  source: SourceChannel;
  intentDirection: IntentDirection;
  tags: string[];
  
  // Audit & Allocation
  auditStatus: '待审核' | '已通过' | '已驳回';
  auditRemark?: string;
  auditTime?: string;
  auditor?: string;
  classCohort: string; // e.g. "2026春季大模型1班" or "未分班"
  mentorTeacher?: string;
  
  // Lifecycle Status
  status: LifecycleStatus;
  
  // Learning & Sandbox Progress
  courseProgress: number; // 0 - 100%
  sandboxDurationHours: number; // e.g. 142.5 h
  completedLabs: number;
  totalLabs: number;
  activeDays: number;
  
  // Grades & Certificate
  theoryScore?: number;
  practiceScore?: number;
  overallScore?: number;
  certificateStatus: '未颁发' | '已生成' | '已发放';
  certificateNo?: string;
  certificateIssueDate?: string;
  
  // Employment
  employment: EmploymentInfo;
  
  // Audit Trail Logs
  auditTrail: AuditRecord[];
}

// ==================== Initial Mock Data ====================

const INITIAL_STUDENTS: StudentLifecycleItem[] = [
  {
    id: 'STU-2026001',
    studentNo: '2026900101',
    name: '林若曦',
    gender: '女',
    age: 22,
    phone: '13812345601',
    email: 'lin.rx@edu.cn',
    university: '华中科技大学',
    major: '计算机科学与技术',
    education: '本科',
    graduationYear: '2026',
    registerDate: '2026-03-01 10:20',
    source: '校企合作',
    intentDirection: '大模型开发与微调',
    tags: ['优秀生源', '竞赛省一', '保研意向'],
    auditStatus: '已通过',
    auditRemark: '专业背景优秀，具备Python/PyTorch实战基础，符合入班条件。',
    auditTime: '2026-03-02 14:30',
    auditor: '张老师',
    classCohort: '2026春季大模型1班',
    mentorTeacher: '张老师',
    status: '已就业',
    courseProgress: 100,
    sandboxDurationHours: 186.5,
    completedLabs: 18,
    totalLabs: 18,
    activeDays: 64,
    theoryScore: 94,
    practiceScore: 98,
    overallScore: 96,
    certificateStatus: '已发放',
    certificateNo: 'ZY-AI-2026-08912',
    certificateIssueDate: '2026-06-15',
    employment: {
      status: '已正式签约',
      company: '智谱AI（清言算法实验室）',
      position: '大模型算法实习工程师',
      salary: '22k-26k·15薪',
      city: '北京-海淀区',
      signDate: '2026-06-20',
      notes: '主要负责平台微调数据流管道构建与RAG评估。'
    },
    auditTrail: [
      {
        id: 'LOG-001',
        timestamp: '2026-03-01 10:20',
        operator: '系统自动采集',
        fieldName: '线上报名',
        oldValue: '无',
        newValue: '提交信息采集表单',
        reason: '学员通过2026校企专区扫码线上报名'
      },
      {
        id: 'LOG-002',
        timestamp: '2026-03-02 14:30',
        operator: '张老师',
        fieldName: '资格审核状态',
        oldValue: '待审核',
        newValue: '已通过',
        reason: '材料完整，背景考核符合大模型实验室准入标准'
      },
      {
        id: 'LOG-003',
        timestamp: '2026-03-03 09:15',
        operator: '张老师',
        fieldName: '班级期次归属',
        oldValue: '未分班',
        newValue: '2026春季大模型1班',
        reason: '按专业意向方向自动批量分流分班'
      },
      {
        id: 'LOG-004',
        timestamp: '2026-06-15 16:00',
        operator: '教务处考评组',
        fieldName: '成绩与结业证书',
        oldValue: '未颁发',
        newValue: '已发放 (ZY-AI-2026-08912)',
        reason: '完成全部18项沙箱实验并通过综合考评（96分）'
      },
      {
        id: 'LOG-005',
        timestamp: '2026-06-22 11:30',
        operator: '张老师',
        fieldName: '就业去向记录',
        oldValue: '求职中',
        newValue: '已正式签约 (智谱AI)',
        reason: '学员提交三方协议扫描件及Offer签约凭证'
      }
    ]
  },
  {
    id: 'STU-2026002',
    studentNo: '2026900102',
    name: '周逸轩',
    gender: '男',
    age: 23,
    phone: '13988776602',
    email: 'zhou.yx@pku.edu',
    university: '北京交通大学',
    major: '软件工程',
    education: '硕士',
    graduationYear: '2026',
    registerDate: '2026-03-02 11:45',
    source: '校招直通',
    intentDirection: 'AIGC应用工程',
    tags: ['全栈开发', 'LangChain', '项目经验丰富'],
    auditStatus: '已通过',
    auditRemark: '有完整全栈项目经验，考核通过。',
    auditTime: '2026-03-02 16:10',
    auditor: '李讲师',
    classCohort: '2026春季大模型1班',
    mentorTeacher: '张老师',
    status: '在读学习',
    courseProgress: 82,
    sandboxDurationHours: 134.0,
    completedLabs: 15,
    totalLabs: 18,
    activeDays: 52,
    theoryScore: 89,
    practiceScore: 92,
    overallScore: 90,
    certificateStatus: '未颁发',
    employment: {
      status: '拟录用/Offer',
      company: '百度移动生态事业群(MEG)',
      position: 'AIGC应用研发工程师',
      salary: '25k-30k·16薪',
      city: '北京-海淀区',
      signDate: '2026-07-01'
    },
    auditTrail: [
      {
        id: 'LOG-101',
        timestamp: '2026-03-02 11:45',
        operator: '张老师 (Excel导入)',
        fieldName: '学员批量导入',
        oldValue: '无',
        newValue: '创建档案',
        reason: '通过《2026春季高教拔尖人才批次.xlsx》导入'
      },
      {
        id: 'LOG-102',
        timestamp: '2026-03-02 16:10',
        operator: '李讲师',
        fieldName: '资格审核',
        oldValue: '待审核',
        newValue: '已通过',
        reason: '审核符合条件'
      },
      {
        id: 'LOG-103',
        timestamp: '2026-04-10 14:20',
        operator: '张老师',
        fieldName: '意向方向',
        oldValue: '大模型开发与微调',
        newValue: 'AIGC应用工程',
        reason: '学员申请调整方向以贴合毕业设计需求'
      }
    ]
  },
  {
    id: 'STU-2026003',
    studentNo: '2026900103',
    name: '宋佳明',
    gender: '男',
    age: 21,
    phone: '13611223303',
    email: 'song.jm@163.com',
    university: '南京航空航天大学',
    major: '网络空间安全',
    education: '本科',
    graduationYear: '2027',
    registerDate: '2026-03-05 09:30',
    source: '政企委托',
    intentDirection: '云计算运维架构',
    tags: ['K8s架构', 'Linux运维', '政企定培'],
    auditStatus: '已通过',
    auditRemark: '政企联合委托实训批次，资质完备。',
    auditTime: '2026-03-05 10:00',
    auditor: '张老师',
    classCohort: '2026云计算架构二期',
    mentorTeacher: '王助教',
    status: '在读学习',
    courseProgress: 68,
    sandboxDurationHours: 92.5,
    completedLabs: 11,
    totalLabs: 16,
    activeDays: 38,
    certificateStatus: '未颁发',
    employment: {
      status: '求职中',
      notes: '预计2026年9月参与秋招提前批。'
    },
    auditTrail: [
      {
        id: 'LOG-201',
        timestamp: '2026-03-05 09:30',
        operator: '张老师',
        fieldName: '信息采集录入',
        oldValue: '无',
        newValue: '录入档案',
        reason: '政企合作定向班导入'
      }
    ]
  },
  {
    id: 'STU-2026004',
    studentNo: '2026900104',
    name: '韩依依',
    gender: '女',
    age: 22,
    phone: '13799881104',
    email: 'han.yiyi@seu.edu.cn',
    university: '东南大学',
    major: '电子信息工程',
    education: '本科',
    graduationYear: '2026',
    registerDate: '2026-03-06 14:15',
    source: '自主报名',
    intentDirection: 'AI计算机视觉',
    tags: ['OpenCV', 'YOLO算法', '自主报名'],
    auditStatus: '待审核',
    auditRemark: '',
    classCohort: '未分班',
    status: '报名待审',
    courseProgress: 0,
    sandboxDurationHours: 0,
    completedLabs: 0,
    totalLabs: 16,
    activeDays: 0,
    certificateStatus: '未颁发',
    employment: {
      status: '求职中'
    },
    auditTrail: [
      {
        id: 'LOG-301',
        timestamp: '2026-03-06 14:15',
        operator: '自主报名门户',
        fieldName: '线上表单提交',
        oldValue: '无',
        newValue: '待审核',
        reason: '学员通过公开扫码完成信息采集并提交成绩单'
      }
    ]
  },
  {
    id: 'STU-2026005',
    studentNo: '2026900105',
    name: '陈梓豪',
    gender: '男',
    age: 24,
    phone: '13566778805',
    email: 'chen.zh@zju.edu.cn',
    university: '浙江大学',
    major: '应用统计学',
    education: '硕士',
    graduationYear: '2026',
    registerDate: '2026-03-07 16:40',
    source: '社招公开',
    intentDirection: '大数据分析与挖掘',
    tags: ['Spark', '数据建模', '跨专业'],
    auditStatus: '已驳回',
    auditRemark: '前置数学与编程基础考核未达及格线，建议选修基础课后再申请。',
    auditTime: '2026-03-08 09:20',
    auditor: '张老师',
    classCohort: '未分班',
    status: '审核驳回',
    courseProgress: 0,
    sandboxDurationHours: 0,
    completedLabs: 0,
    totalLabs: 15,
    activeDays: 0,
    certificateStatus: '未颁发',
    employment: {
      status: '求职中'
    },
    auditTrail: [
      {
        id: 'LOG-401',
        timestamp: '2026-03-07 16:40',
        operator: '线上信息采集系统',
        fieldName: '提交报名',
        oldValue: '无',
        newValue: '待审核',
        reason: '社招公开申请'
      },
      {
        id: 'LOG-402',
        timestamp: '2026-03-08 09:20',
        operator: '张老师',
        fieldName: '资格审核',
        oldValue: '待审核',
        newValue: '已驳回',
        reason: '前置测评未通过'
      }
    ]
  },
  {
    id: 'STU-2026006',
    studentNo: '2026900106',
    name: '郭雨萌',
    gender: '女',
    age: 22,
    phone: '13911223306',
    email: 'guo.ym@whu.edu.cn',
    university: '武汉大学',
    major: '人工智能',
    education: '本科',
    graduationYear: '2026',
    registerDate: '2026-03-08 10:10',
    source: '校企合作',
    intentDirection: '大模型开发与微调',
    tags: ['Prompt工程师', '学术论文', '已结业'],
    auditStatus: '已通过',
    auditRemark: '资质优秀，同意入班。',
    auditTime: '2026-03-08 11:30',
    auditor: '张老师',
    classCohort: '2026春季大模型1班',
    mentorTeacher: '张老师',
    status: '已获证书',
    courseProgress: 100,
    sandboxDurationHours: 172.0,
    completedLabs: 18,
    totalLabs: 18,
    activeDays: 58,
    theoryScore: 92,
    practiceScore: 95,
    overallScore: 94,
    certificateStatus: '已发放',
    certificateNo: 'ZY-AI-2026-08913',
    certificateIssueDate: '2026-06-15',
    employment: {
      status: '升学深造',
      company: '清华大学人工智能研究院',
      position: '学术型硕士研究生',
      city: '北京-海淀区',
      notes: '已获直博生推免录取。'
    },
    auditTrail: [
      {
        id: 'LOG-501',
        timestamp: '2026-03-08 10:10',
        operator: '张老师',
        fieldName: '线上报名',
        oldValue: '无',
        newValue: '已通过',
        reason: '校企优秀保送'
      },
      {
        id: 'LOG-502',
        timestamp: '2026-06-15 16:00',
        operator: '教务处考评组',
        fieldName: '证书颁发',
        oldValue: '未颁发',
        newValue: '已发放 (ZY-AI-2026-08913)',
        reason: '成绩合格（94分）'
      }
    ]
  },
  {
    id: 'STU-2026007',
    studentNo: '2026900107',
    name: '杨博涵',
    gender: '男',
    age: 23,
    phone: '13877665507',
    email: 'yang.bh@xjtu.edu.cn',
    university: '西安交通大学',
    major: '自动化',
    education: '本科',
    graduationYear: '2026',
    registerDate: '2026-03-09 15:30',
    source: '校招直通',
    intentDirection: '物联网嵌入式AI',
    tags: ['EdgeAI', '嵌入式', '在读'],
    auditStatus: '已通过',
    auditRemark: '实训方向匹配，予以录用。',
    auditTime: '2026-03-09 17:00',
    auditor: '李讲师',
    classCohort: '2026物联网AI一期',
    mentorTeacher: '李讲师',
    status: '在读学习',
    courseProgress: 55,
    sandboxDurationHours: 78.0,
    completedLabs: 8,
    totalLabs: 14,
    activeDays: 32,
    certificateStatus: '未颁发',
    employment: {
      status: '求职中'
    },
    auditTrail: [
      {
        id: 'LOG-601',
        timestamp: '2026-03-09 15:30',
        operator: '李讲师 (Excel导入)',
        fieldName: '创建档案',
        oldValue: '无',
        newValue: '在读',
        reason: '批量导入'
      }
    ]
  }
];

export const AVAILABLE_CLASSES = [
  '2026春季大模型1班',
  '2026春季大模型2班',
  '2026云计算架构一期',
  '2026云计算架构二期',
  '2026物联网AI一期',
  '2026大数据智能分析班'
];

export const SOURCE_OPTIONS: SourceChannel[] = ['校招直通', '校企合作', '社招公开', '政企委托', '自主报名'];

export const INTENT_OPTIONS: IntentDirection[] = [
  '大模型开发与微调',
  'AIGC应用工程',
  '云计算运维架构',
  'AI计算机视觉',
  '大数据分析与挖掘',
  '物联网嵌入式AI'
];

export default function TeacherStudentLifecycle() {
  const [students, setStudents] = useState<StudentLifecycleItem[]>(INITIAL_STUDENTS);
  
  // Pipeline Tab
  const [pipelineTab, setPipelineTab] = useState<
    'all' | 'register' | 'audit' | 'enrolled' | 'graduation' | 'employment'
  >('all');

  // Filters
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedIntent, setSelectedIntent] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  
  // Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Modals & Drawers
  const [drawerStudent, setDrawerStudent] = useState<StudentLifecycleItem | null>(null);
  const [drawerTab, setDrawerTab] = useState<'profile' | 'learning' | 'grades' | 'employment' | 'auditTrail'>('profile');
  
  // 1. Online Registration / Form Config Modal
  const [isRegisterConfigOpen, setIsRegisterConfigOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  
  // 2. Excel Import Wizard Modal
  const [isExcelImportOpen, setIsExcelImportOpen] = useState(false);
  const [importStep, setImportStep] = useState<1 | 2 | 3 | 4>(1);
  const [parsedImportData, setParsedImportData] = useState<any[]>([]);
  
  // 3. Single / Batch Audit Modal
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditTargetStudents, setAuditTargetStudents] = useState<StudentLifecycleItem[]>([]);
  const [auditDecision, setAuditDecision] = useState<'pass' | 'reject'>('pass');
  const [auditComment, setAuditComment] = useState('');
  
  // 4. Single / Batch Class Allocation Modal
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [targetClass, setTargetClass] = useState<string>(AVAILABLE_CLASSES[0]);
  const [classChangeReason, setClassChangeReason] = useState('正常分班分配');
  
  // 5. Certificate Preview Modal
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [certStudent, setCertStudent] = useState<StudentLifecycleItem | null>(null);
  
  // 6. Employment Edit Modal
  const [isEmploymentModalOpen, setIsEmploymentModalOpen] = useState(false);
  const [employmentFormStudent, setEmploymentFormStudent] = useState<StudentLifecycleItem | null>(null);
  const [empStatus, setEmpStatus] = useState<EmploymentInfo['status']>('已正式签约');
  const [empCompany, setEmpCompany] = useState('');
  const [empPosition, setEmpPosition] = useState('');
  const [empSalary, setEmpSalary] = useState('');
  const [empCity, setEmpCity] = useState('');
  const [empSignDate, setEmpSignDate] = useState('');
  const [empNotes, setEmpNotes] = useState('');
  
  // 7. Manual Add Student Modal
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [newStudentForm, setNewStudentForm] = useState<Partial<StudentLifecycleItem>>({
    name: '',
    gender: '男',
    age: 22,
    phone: '',
    email: '',
    university: '',
    major: '',
    education: '本科',
    graduationYear: '2026',
    source: '校企合作',
    intentDirection: '大模型开发与微调',
    tags: []
  });

  // 8. Toast Feedback
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Helper: Log an audit trail item
  const recordAuditTrail = (
    studentId: string, 
    fieldName: string, 
    oldValue: string, 
    newValue: string, 
    reason: string
  ) => {
    const newLog: AuditRecord = {
      id: `LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleString('zh-CN', { hour12: false }),
      operator: '张老师 (当前登录)',
      fieldName,
      oldValue: oldValue || '无',
      newValue: newValue || '无',
      reason: reason || '日常教学管理调整'
    };
    return newLog;
  };

  // ==================== Filtered Data ====================

  const filteredStudents = useMemo(() => {
    return students.filter(item => {
      // Pipeline stage filter
      if (pipelineTab === 'register') {
        if (item.status !== '报名待审' && item.status !== '审核驳回') return false;
      } else if (pipelineTab === 'audit') {
        if (item.auditStatus !== '待审核') return false;
      } else if (pipelineTab === 'enrolled') {
        if (item.status !== '在读学习' && item.status !== '待分班') return false;
      } else if (pipelineTab === 'graduation') {
        if (item.status !== '结业待考' && item.status !== '已获证书' && item.status !== '已就业') return false;
      } else if (pipelineTab === 'employment') {
        if (item.employment.status === '暂无意向' && item.status !== '已就业') return false;
      }

      // Keyword search
      if (searchKeyword.trim()) {
        const kw = searchKeyword.toLowerCase();
        const matches = 
          item.name.toLowerCase().includes(kw) ||
          item.studentNo.includes(kw) ||
          item.phone.includes(kw) ||
          item.email.toLowerCase().includes(kw) ||
          item.university.toLowerCase().includes(kw) ||
          item.major.toLowerCase().includes(kw);
        if (!matches) return false;
      }

      // Source Filter
      if (selectedSource !== 'all' && item.source !== selectedSource) return false;

      // Intent Direction Filter
      if (selectedIntent !== 'all' && item.intentDirection !== selectedIntent) return false;

      // Class Cohort Filter
      if (selectedClass !== 'all') {
        if (selectedClass === '未分班' && item.classCohort !== '未分班') return false;
        if (selectedClass !== '未分班' && item.classCohort !== selectedClass) return false;
      }

      // Status Filter
      if (selectedStatus !== 'all' && item.status !== selectedStatus) return false;

      return true;
    });
  }, [students, pipelineTab, searchKeyword, selectedSource, selectedIntent, selectedClass, selectedStatus]);

  // Global Statistics
  const stats = useMemo(() => {
    const total = students.length;
    const pendingAudit = students.filter(s => s.auditStatus === '待审核').length;
    const inStudy = students.filter(s => s.status === '在读学习').length;
    const certCount = students.filter(s => s.certificateStatus === '已发放' || s.certificateStatus === '已生成').length;
    const employedCount = students.filter(s => s.employment.status === '已正式签约' || s.employment.status === '拟录用/Offer' || s.employment.status === '升学深造').length;
    const totalHours = students.reduce((acc, curr) => acc + curr.sandboxDurationHours, 0);
    const avgHours = total > 0 ? (totalHours / total).toFixed(1) : '0';

    return {
      total,
      pendingAudit,
      inStudy,
      certCount,
      employedCount,
      avgHours
    };
  }, [students]);

  // Selection handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredStudents.map(s => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // ==================== Actions ====================

  // 1. Audit Submit
  const handlePerformAudit = () => {
    if (auditTargetStudents.length === 0) return;
    const newStatus = auditDecision === 'pass' ? '已通过' : '已驳回';
    const lifecycleStatus = auditDecision === 'pass' ? '待分班' : '审核驳回';
    const timeNow = new Date().toLocaleString('zh-CN', { hour12: false });

    setStudents(prev => prev.map(s => {
      const isTarget = auditTargetStudents.some(t => t.id === s.id);
      if (!isTarget) return s;

      const log = recordAuditTrail(
        s.id,
        '资格审核状态',
        s.auditStatus,
        newStatus,
        auditComment || (auditDecision === 'pass' ? '审核通过，进入待分班期次' : '材料审核不符，予以驳回')
      );

      return {
        ...s,
        auditStatus: newStatus,
        auditRemark: auditComment,
        auditTime: timeNow,
        auditor: '张老师',
        status: s.classCohort !== '未分班' && auditDecision === 'pass' ? '在读学习' : lifecycleStatus,
        auditTrail: [log, ...s.auditTrail]
      };
    }));

    showToast(`成功完成 ${auditTargetStudents.length} 位学员的资格审核（${newStatus}）`);
    setIsAuditModalOpen(false);
    setAuditTargetStudents([]);
    setAuditComment('');
  };

  // 2. Class Allocation Submit
  const handlePerformClassAssign = () => {
    if (selectedIds.length === 0 && !drawerStudent) return;
    const targetIds = drawerStudent ? [drawerStudent.id] : selectedIds;

    setStudents(prev => prev.map(s => {
      if (!targetIds.includes(s.id)) return s;
      const oldClass = s.classCohort;
      const log = recordAuditTrail(
        s.id,
        '班级期次归属',
        oldClass,
        targetClass,
        classChangeReason
      );

      const updated = {
        ...s,
        classCohort: targetClass,
        status: (s.status === '待分班' || s.status === '报名待审') ? ('在读学习' as LifecycleStatus) : s.status,
        mentorTeacher: '张老师',
        auditTrail: [log, ...s.auditTrail]
      };

      if (drawerStudent && drawerStudent.id === s.id) {
        setDrawerStudent(updated);
      }
      return updated;
    }));

    showToast(`已成功将 ${targetIds.length} 名学员分配至【${targetClass}】`);
    setIsClassModalOpen(false);
    setSelectedIds([]);
  };

  // 3. Employment Submit
  const handleSaveEmployment = () => {
    if (!employmentFormStudent) return;
    const s = employmentFormStudent;
    const oldEmp = s.employment.status;
    const log = recordAuditTrail(
      s.id,
      '就业去向记录',
      `${oldEmp} (${s.employment.company || '无'})`,
      `${empStatus} (${empCompany || '无'}) - ${empPosition || '无'}`,
      empNotes || '录入最新就业与签约信息'
    );

    const updatedEmp: EmploymentInfo = {
      status: empStatus,
      company: empCompany,
      position: empPosition,
      salary: empSalary,
      city: empCity,
      signDate: empSignDate,
      notes: empNotes
    };

    setStudents(prev => prev.map(item => {
      if (item.id !== s.id) return item;
      const updated = {
        ...item,
        employment: updatedEmp,
        status: (empStatus === '已正式签约' || empStatus === '升学深造' || empStatus === '自主创业') 
          ? ('已就业' as LifecycleStatus) 
          : item.status,
        auditTrail: [log, ...item.auditTrail]
      };
      if (drawerStudent && drawerStudent.id === item.id) {
        setDrawerStudent(updated);
      }
      return updated;
    }));

    showToast(`已更新【${s.name}】的就业去向信息`);
    setIsEmploymentModalOpen(false);
  };

  // 4. Issue Certificate
  const handleIssueCertificate = (student: StudentLifecycleItem) => {
    const certNum = `ZY-AI-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const log = recordAuditTrail(
      student.id,
      '颁发结业证书',
      student.certificateStatus,
      `已发放 (${certNum})`,
      '完成全套实训实验与综合考评，正式颁发平台防伪结业证书'
    );

    setStudents(prev => prev.map(item => {
      if (item.id !== student.id) return item;
      const updated: StudentLifecycleItem = {
        ...item,
        certificateStatus: '已发放',
        certificateNo: certNum,
        certificateIssueDate: new Date().toISOString().split('T')[0],
        status: item.status === '在读学习' || item.status === '结业待考' ? '已获证书' : item.status,
        auditTrail: [log, ...item.auditTrail]
      };
      if (drawerStudent && drawerStudent.id === item.id) {
        setDrawerStudent(updated);
      }
      return updated;
    }));

    showToast(`已成功为【${student.name}】颁发结业证书，证书编号：${certNum}`);
  };

  // 5. Add Manual Student
  const handleAddManualStudent = () => {
    if (!newStudentForm.name || !newStudentForm.phone) {
      showToast('请完整填写学员姓名与联系电话', 'error');
      return;
    }
    const id = `STU-${Date.now().toString().slice(-6)}`;
    const sNo = `2026900${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newStudent: StudentLifecycleItem = {
      id,
      studentNo: sNo,
      name: newStudentForm.name || '',
      gender: newStudentForm.gender || '男',
      age: Number(newStudentForm.age) || 22,
      phone: newStudentForm.phone || '',
      email: newStudentForm.email || `${sNo}@zhiyun.edu`,
      university: newStudentForm.university || '智云合作实训基地',
      major: newStudentForm.major || '人工智能工程',
      education: newStudentForm.education || '本科',
      graduationYear: newStudentForm.graduationYear || '2026',
      registerDate: new Date().toLocaleString('zh-CN', { hour12: false }),
      source: (newStudentForm.source as SourceChannel) || '自主报名',
      intentDirection: (newStudentForm.intentDirection as IntentDirection) || '大模型开发与微调',
      tags: newStudentForm.tags && newStudentForm.tags.length > 0 ? newStudentForm.tags : ['手动录入'],
      auditStatus: '待审核',
      classCohort: '未分班',
      status: '报名待审',
      courseProgress: 0,
      sandboxDurationHours: 0,
      completedLabs: 0,
      totalLabs: 16,
      activeDays: 1,
      certificateStatus: '未颁发',
      employment: {
        status: '求职中'
      },
      auditTrail: [
        {
          id: `LOG-${Date.now()}`,
          timestamp: new Date().toLocaleString('zh-CN', { hour12: false }),
          operator: '张老师 (手动创建)',
          fieldName: '档案创建',
          oldValue: '无',
          newValue: '录入报名档案',
          reason: '教师端手动录入新学员信息'
        }
      ]
    };

    setStudents([newStudent, ...students]);
    showToast(`成功录入学员【${newStudent.name}】，学号：${sNo}`);
    setIsAddStudentOpen(false);
    setNewStudentForm({
      name: '',
      gender: '男',
      age: 22,
      phone: '',
      email: '',
      university: '',
      major: '',
      education: '本科',
      graduationYear: '2026',
      source: '校企合作',
      intentDirection: '大模型开发与微调',
      tags: []
    });
  };

  // 6. Mock Excel Import Completion
  const handleExecuteExcelImport = () => {
    const mockNames = ['吴昊天', '赵雅馨', '钱博文', '孙子涵', '李慕白', '范楚楚'];
    const newItems: StudentLifecycleItem[] = mockNames.map((name, i) => ({
      id: `STU-IMP-${Date.now()}-${i}`,
      studentNo: `20269002${10 + i}`,
      name,
      gender: i % 2 === 0 ? '男' : '女',
      age: 22 + (i % 3),
      phone: `138001122${20 + i}`,
      email: `${name.toLowerCase()}@zhiyun.edu`,
      university: i % 2 === 0 ? '华中科技大学' : '武汉理工大学',
      major: '人工智能应用',
      education: '本科',
      graduationYear: '2026',
      registerDate: new Date().toLocaleString('zh-CN', { hour12: false }),
      source: '校企合作',
      intentDirection: '大模型开发与微调',
      tags: ['Excel导入批次', '校企合作'],
      auditStatus: '已通过',
      auditRemark: '通过Excel批量直接导入并通过资格校验。',
      auditTime: new Date().toLocaleString('zh-CN', { hour12: false }),
      auditor: '张老师 (批量导入)',
      classCohort: '2026春季大模型2班',
      mentorTeacher: '张老师',
      status: '在读学习',
      courseProgress: 0,
      sandboxDurationHours: 0,
      completedLabs: 0,
      totalLabs: 18,
      activeDays: 0,
      certificateStatus: '未颁发',
      employment: {
        status: '求职中'
      },
      auditTrail: [
        {
          id: `LOG-IMP-${i}`,
          timestamp: new Date().toLocaleString('zh-CN', { hour12: false }),
          operator: '张老师 (Excel导入)',
          fieldName: '批量导入档案',
          oldValue: '无',
          newValue: '在读 (2026春季大模型2班)',
          reason: '导入《2026春季校企直通学员名单.xlsx》'
        }
      ]
    }));

    setStudents([...newItems, ...students]);
    showToast(`成功批量导入 ${newItems.length} 名学员档案并已自动分配班级！`);
    setIsExcelImportOpen(false);
    setImportStep(1);
  };

  return (
    <div className="-m-6 p-6 min-h-full space-y-6 pb-16 bg-[#f5f7fa] text-neutral-800">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2.5 px-5 py-2.5 bg-neutral-900/90 text-white backdrop-blur-md rounded-xl shadow-xl animate-in slide-in-from-top-3 border border-white/10">
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
          {toast.type === 'info' && <Sparkles className="w-4 h-4 text-blue-400" />}
          <span className="text-[13px] font-medium">{toast.message}</span>
        </div>
      )}

      {/* ================= Header Banner ================= */}
      <div className="relative bg-gradient-to-r from-[#1e40af] via-[#3b82f6] to-[#60a5fa] rounded-2xl overflow-hidden shadow-lg p-6 md:p-8 text-white">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 backdrop-blur-sm text-xs font-semibold text-white tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              学员全生命周期赋能引擎
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              学员全生命周期管理中心
            </h1>
            <p className="text-white/80 text-xs md:text-sm max-w-2xl leading-relaxed">
              贯穿「线上报名/采集 → Excel批量导入 → 资格审核 → 班级期次归属 → 在读学情时长监控 → 考核证书颁发 → 就业去向跟踪」与「关键字段修改留痕」，实现数字化闭环育人。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => setIsRegisterConfigOpen(true)}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md gap-2 font-medium shadow-sm"
            >
              <QrCode className="w-4 h-4 text-white" />
              线上报名 / 信息采集
            </Button>
            <Button
              onClick={() => {
                setImportStep(1);
                setIsExcelImportOpen(true);
              }}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md gap-2 font-medium shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-300" />
              Excel 批量导入
            </Button>
            <Button
              onClick={() => setIsAddStudentOpen(true)}
              className="bg-white text-[#2563eb] hover:bg-blue-50 font-bold gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              录入单条学员
            </Button>
          </div>
        </div>

        {/* Stats Grid inside Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mt-6 pt-6 border-t border-white/20">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15">
            <div className="text-xs text-white/70 font-medium">总学员档案</div>
            <div className="text-2xl font-black mt-1">{stats.total} <span className="text-xs font-normal text-white/70">人</span></div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15">
            <div className="text-xs text-white/70 font-medium flex items-center justify-between">
              资格待审核
              {stats.pendingAudit > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              )}
            </div>
            <div className="text-2xl font-black mt-1 text-amber-200">{stats.pendingAudit} <span className="text-xs font-normal text-white/70">人</span></div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15">
            <div className="text-xs text-white/70 font-medium">在读学习中</div>
            <div className="text-2xl font-black mt-1 text-blue-100">{stats.inStudy} <span className="text-xs font-normal text-white/70">人</span></div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15">
            <div className="text-xs text-white/70 font-medium">已获官方证书</div>
            <div className="text-2xl font-black mt-1 text-emerald-200">{stats.certCount} <span className="text-xs font-normal text-white/70">人</span></div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15">
            <div className="text-xs text-white/70 font-medium">已就业/拟录用</div>
            <div className="text-2xl font-black mt-1 text-yellow-200">{stats.employedCount} <span className="text-xs font-normal text-white/70">人</span></div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15">
            <div className="text-xs text-white/70 font-medium">人均上机时长</div>
            <div className="text-2xl font-black mt-1 text-cyan-200">{stats.avgHours} <span className="text-xs font-normal text-white/70">小时</span></div>
          </div>
        </div>
      </div>

      {/* ================= Lifecycle Pipeline Tabs ================= */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-2 flex flex-wrap items-center gap-1.5 overflow-x-auto">
        {[
          { key: 'all', label: '全部生命周期', icon: Layers, count: students.length },
          { key: 'register', label: '1. 报名与信息采集', icon: QrCode, count: students.filter(s => s.status === '报名待审' || s.status === '审核驳回').length },
          { key: 'audit', label: '2. 资格审核流水线', icon: ShieldCheck, count: students.filter(s => s.auditStatus === '待审核').length, highlight: stats.pendingAudit > 0 },
          { key: 'enrolled', label: '3. 班级期次与在读', icon: BookOpen, count: students.filter(s => s.status === '在读学习' || s.status === '待分班').length },
          { key: 'graduation', label: '4. 成绩与结业证书', icon: Award, count: students.filter(s => s.certificateStatus === '已发放' || s.status === '结业待考').length },
          { key: 'employment', label: '5. 就业去向跟踪', icon: Briefcase, count: students.filter(s => s.employment.status !== '暂无意向').length },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setPipelineTab(tab.key as any)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all whitespace-nowrap",
              pipelineTab === tab.key
                ? "bg-[#3b82f6] text-white shadow-md shadow-blue-500/20"
                : "text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900"
            )}
          >
            <tab.icon className={cn("w-4 h-4", pipelineTab === tab.key ? "text-white" : "text-neutral-500")} />
            <span>{tab.label}</span>
            <span className={cn(
              "px-1.5 py-0.5 rounded-full text-[11px] font-extrabold",
              pipelineTab === tab.key ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-600",
              tab.highlight && pipelineTab !== tab.key && "bg-amber-100 text-amber-700 animate-pulse"
            )}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* ================= Filters & Search Bar ================= */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Keyword Search */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <Input
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              placeholder="搜索姓名、学号、手机号、毕业院校、专业..."
              className="pl-9 bg-neutral-50/50 border-neutral-200 text-xs h-9 rounded-xl focus:bg-white"
            />
            {searchKeyword && (
              <button onClick={() => setSearchKeyword('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs">
                清空
              </button>
            )}
          </div>

          {/* Source Channel Filter */}
          <div className="w-[150px]">
            <select
              value={selectedSource}
              onChange={e => setSelectedSource(e.target.value)}
              className="w-full h-9 px-3 text-xs bg-neutral-50/50 border border-neutral-200 rounded-xl text-neutral-700 focus:outline-none focus:border-[#3b82f6]"
            >
              <option value="all">来源渠道 (全部)</option>
              {SOURCE_OPTIONS.map(src => (
                <option key={src} value={src}>{src}</option>
              ))}
            </select>
          </div>

          {/* Intent Direction Filter */}
          <div className="w-[170px]">
            <select
              value={selectedIntent}
              onChange={e => setSelectedIntent(e.target.value)}
              className="w-full h-9 px-3 text-xs bg-neutral-50/50 border border-neutral-200 rounded-xl text-neutral-700 focus:outline-none focus:border-[#3b82f6]"
            >
              <option value="all">意向方向 (全部)</option>
              {INTENT_OPTIONS.map(intent => (
                <option key={intent} value={intent}>{intent}</option>
              ))}
            </select>
          </div>

          {/* Class Cohort Filter */}
          <div className="w-[160px]">
            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              className="w-full h-9 px-3 text-xs bg-neutral-50/50 border border-neutral-200 rounded-xl text-neutral-700 focus:outline-none focus:border-[#3b82f6]"
            >
              <option value="all">班级/期次 (全部)</option>
              <option value="未分班">未分班</option>
              {AVAILABLE_CLASSES.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          {/* Lifecycle Status Filter */}
          <div className="w-[140px]">
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full h-9 px-3 text-xs bg-neutral-50/50 border border-neutral-200 rounded-xl text-neutral-700 focus:outline-none focus:border-[#3b82f6]"
            >
              <option value="all">状态 (全部)</option>
              <option value="报名待审">报名待审</option>
              <option value="待分班">待分班</option>
              <option value="在读学习">在读学习</option>
              <option value="已获证书">已获证书</option>
              <option value="已就业">已就业</option>
              <option value="审核驳回">审核驳回</option>
              <option value="休学">休学</option>
            </select>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchKeyword('');
              setSelectedSource('all');
              setSelectedIntent('all');
              setSelectedClass('all');
              setSelectedStatus('all');
            }}
            className="h-9 px-3 text-xs text-neutral-600 rounded-xl hover:bg-neutral-100"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1" />
            重置
          </Button>
        </div>

        {/* Batch Operations Bar */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between px-4 py-2.5 bg-blue-50/70 border border-blue-200/80 rounded-xl animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-900">
              <CheckSquare className="w-4 h-4 text-[#3b82f6]" />
              已勾选 <span className="text-[#3b82f6] text-sm font-black">{selectedIds.length}</span> 位学员
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => {
                  const targetList = students.filter(s => selectedIds.includes(s.id));
                  setAuditTargetStudents(targetList);
                  setAuditDecision('pass');
                  setIsAuditModalOpen(true);
                }}
                className="h-7 px-3 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                批量资格审核
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setTargetClass(AVAILABLE_CLASSES[0]);
                  setIsClassModalOpen(true);
                }}
                className="h-7 px-3 text-xs bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium rounded-lg shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5 mr-1" />
                批量分配班级期次
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedIds([])}
                className="h-7 px-2.5 text-xs text-neutral-600 hover:bg-white"
              >
                取消勾选
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ================= Students Table ================= */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-neutral-50/80 border-b border-neutral-200/80 text-neutral-600 font-bold tracking-wide select-none">
                <th className="p-3.5 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={filteredStudents.length > 0 && selectedIds.length === filteredStudents.length}
                    onChange={handleSelectAll}
                    className="rounded border-neutral-300 text-[#3b82f6] focus:ring-[#3b82f6] cursor-pointer"
                  />
                </th>
                <th className="p-3.5 min-w-[170px]">学员信息 / 学号</th>
                <th className="p-3.5 min-w-[140px]">院校 / 专业背景</th>
                <th className="p-3.5 min-w-[130px]">来源与意向标签</th>
                <th className="p-3.5 min-w-[130px]">班级 / 期次归属</th>
                <th className="p-3.5 min-w-[100px]">生命周期状态</th>
                <th className="p-3.5 min-w-[130px]">实训学情 / 时长</th>
                <th className="p-3.5 min-w-[120px]">成绩 / 证书</th>
                <th className="p-3.5 min-w-[140px]">就业去向</th>
                <th className="p-3.5 min-w-[140px] text-right pr-5">操作与档案</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-16 text-center text-neutral-400">
                    <Users className="w-12 h-12 mx-auto mb-2 stroke-[1.2] text-neutral-300" />
                    <p className="text-sm font-medium">暂无符合条件的学员档案</p>
                    <p className="text-xs mt-1 text-neutral-400">您可以尝试清空筛选条件或使用上方功能进行线上采集/批量导入</p>
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => {
                  const isChecked = selectedIds.includes(student.id);

                  return (
                    <tr 
                      key={student.id} 
                      className={cn(
                        "hover:bg-blue-50/30 transition-colors group",
                        isChecked && "bg-blue-50/50"
                      )}
                    >
                      {/* Checkbox */}
                      <td className="p-3.5 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelect(student.id)}
                          className="rounded border-neutral-300 text-[#3b82f6] focus:ring-[#3b82f6] cursor-pointer"
                        />
                      </td>

                      {/* Name & Basic Info */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-9 h-9 rounded-full flex items-center justify-center font-bold text-white shadow-sm shrink-0",
                            student.gender === '女' ? "bg-gradient-to-tr from-pink-500 to-rose-400" : "bg-gradient-to-tr from-blue-600 to-cyan-500"
                          )}>
                            {student.name.slice(0, 1)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span 
                                onClick={() => {
                                  setDrawerStudent(student);
                                  setDrawerTab('profile');
                                }}
                                className="font-bold text-neutral-900 text-sm hover:text-[#3b82f6] cursor-pointer transition-colors"
                              >
                                {student.name}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.2 bg-neutral-100 rounded text-neutral-600 font-medium">
                                {student.gender} · {student.age}岁
                              </span>
                            </div>
                            <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                              NO: {student.studentNo}
                            </div>
                            <div className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3 text-neutral-400" />
                              {student.phone}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* University & Major */}
                      <td className="p-3.5">
                        <div className="font-medium text-neutral-800">{student.university}</div>
                        <div className="text-neutral-500 text-[11px] mt-0.5">{student.major}</div>
                        <div className="text-neutral-400 text-[10px] mt-0.5">{student.education} · {student.graduationYear}届</div>
                      </td>

                      {/* Source & Intent Direction Tags */}
                      <td className="p-3.5">
                        <div className="space-y-1">
                          <span className={cn(
                            "inline-block px-2 py-0.5 rounded text-[10px] font-bold border",
                            student.source === '校企合作' ? "bg-blue-50 text-blue-700 border-blue-200" :
                            student.source === '校招直通' ? "bg-purple-50 text-purple-700 border-purple-200" :
                            student.source === '政企委托' ? "bg-amber-50 text-amber-700 border-amber-200" :
                            student.source === '社招公开' ? "bg-cyan-50 text-cyan-700 border-cyan-200" :
                            "bg-neutral-50 text-neutral-700 border-neutral-200"
                          )}>
                            {student.source}
                          </span>
                          <div className="text-neutral-700 font-medium text-[11px]">
                            {student.intentDirection}
                          </div>
                          {student.tags && student.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {student.tags.slice(0, 2).map((t, idx) => (
                                <span key={idx} className="text-[9px] px-1 py-0.2 bg-neutral-100 text-neutral-600 rounded">
                                  #{t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Cohort / Class */}
                      <td className="p-3.5">
                        {student.classCohort === '未分班' ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-neutral-400 italic">未分班</span>
                            <button
                              onClick={() => {
                                setDrawerStudent(student);
                                setTargetClass(AVAILABLE_CLASSES[0]);
                                setIsClassModalOpen(true);
                              }}
                              className="text-[10px] text-[#3b82f6] hover:underline font-medium"
                            >
                              去分班
                            </button>
                          </div>
                        ) : (
                          <div>
                            <div className="font-semibold text-neutral-800 flex items-center gap-1">
                              <BookOpen className="w-3 h-3 text-[#3b82f6]" />
                              {student.classCohort}
                            </div>
                            <div className="text-[10px] text-neutral-400 mt-0.5">
                              导师: {student.mentorTeacher || '张老师'}
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="p-3.5">
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1 border",
                          student.status === '在读学习' && "bg-blue-50 text-blue-700 border-blue-200",
                          student.status === '已获证书' && "bg-emerald-50 text-emerald-700 border-emerald-200",
                          student.status === '已就业' && "bg-teal-50 text-teal-800 border-teal-200",
                          student.status === '报名待审' && "bg-amber-50 text-amber-700 border-amber-200",
                          student.status === '待分班' && "bg-indigo-50 text-indigo-700 border-indigo-200",
                          student.status === '审核驳回' && "bg-rose-50 text-rose-700 border-rose-200",
                          student.status === '休学' && "bg-neutral-100 text-neutral-600 border-neutral-200"
                        )}>
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            student.status === '在读学习' && "bg-blue-600",
                            student.status === '已获证书' && "bg-emerald-600",
                            student.status === '已就业' && "bg-teal-600",
                            student.status === '报名待审' && "bg-amber-500",
                            student.status === '待分班' && "bg-indigo-600",
                            student.status === '审核驳回' && "bg-rose-600"
                          )}></span>
                          {student.status}
                        </span>
                      </td>

                      {/* Learning Progress & Sandbox Hours */}
                      <td className="p-3.5">
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-medium mb-1">
                            <span className="text-neutral-500">课程完成</span>
                            <span className="font-bold text-neutral-800">{student.courseProgress}%</span>
                          </div>
                          <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full transition-all",
                                student.courseProgress === 100 ? "bg-emerald-500" : "bg-[#3b82f6]"
                              )} 
                              style={{ width: `${student.courseProgress}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-neutral-400 mt-1">
                            <span>沙箱实验: {student.completedLabs}/{student.totalLabs}</span>
                            <span className="font-semibold text-neutral-600">{student.sandboxDurationHours}h</span>
                          </div>
                        </div>
                      </td>

                      {/* Grades & Certificate */}
                      <td className="p-3.5">
                        {student.overallScore ? (
                          <div>
                            <div className="text-[12px] font-bold text-neutral-900">
                              综合: <span className={cn(
                                student.overallScore >= 90 ? "text-emerald-600" : "text-[#3b82f6]"
                              )}>{student.overallScore}分</span>
                            </div>
                            <div className="text-[10px] text-neutral-400 mt-0.5">
                              理论 {student.theoryScore} · 实操 {student.practiceScore}
                            </div>
                            {student.certificateStatus === '已发放' ? (
                              <button
                                onClick={() => {
                                  setCertStudent(student);
                                  setIsCertModalOpen(true);
                                }}
                                className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-200 transition-colors"
                              >
                                <Award className="w-3 h-3" />
                                查看证书
                              </button>
                            ) : (
                              <button
                                onClick={() => handleIssueCertificate(student)}
                                className="inline-flex items-center gap-1 mt-1 text-[10px] font-medium text-[#3b82f6] hover:underline"
                              >
                                颁发证书
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="text-neutral-400 text-[11px]">
                            {student.status === '在读学习' ? '考核学习中' : '尚未录入'}
                          </div>
                        )}
                      </td>

                      {/* Employment Tracking */}
                      <td className="p-3.5">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className={cn(
                              "text-[11px] font-bold",
                              student.employment.status === '已正式签约' && "text-emerald-700",
                              student.employment.status === '拟录用/Offer' && "text-blue-700",
                              student.employment.status === '升学深造' && "text-purple-700",
                              student.employment.status === '求职中' && "text-amber-700",
                              student.employment.status === '自主创业' && "text-teal-700"
                            )}>
                              {student.employment.status}
                            </span>
                          </div>
                          {student.employment.company && (
                            <div className="text-[11px] font-medium text-neutral-800 truncate max-w-[140px] mt-0.5" title={student.employment.company}>
                              {student.employment.company}
                            </div>
                          )}
                          {student.employment.position && (
                            <div className="text-[10px] text-neutral-400 truncate max-w-[140px]">
                              {student.employment.position} {student.employment.salary ? `· ${student.employment.salary}` : ''}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="p-3.5 text-right pr-5">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Audit Action Button if pending */}
                          {student.auditStatus === '待审核' && (
                            <Button
                              size="sm"
                              onClick={() => {
                                setAuditTargetStudents([student]);
                                setAuditDecision('pass');
                                setIsAuditModalOpen(true);
                              }}
                              className="h-6 px-2 text-[11px] bg-amber-500 hover:bg-amber-600 text-white font-bold rounded"
                            >
                              审核
                            </Button>
                          )}

                          {/* Quick Edit Employment */}
                          <button
                            onClick={() => {
                              setEmploymentFormStudent(student);
                              setEmpStatus(student.employment.status);
                              setEmpCompany(student.employment.company || '');
                              setEmpPosition(student.employment.position || '');
                              setEmpSalary(student.employment.salary || '');
                              setEmpCity(student.employment.city || '');
                              setEmpSignDate(student.employment.signDate || '');
                              setEmpNotes(student.employment.notes || '');
                              setIsEmploymentModalOpen(true);
                            }}
                            className="p-1 hover:bg-neutral-100 rounded text-neutral-600 hover:text-neutral-900 transition-colors"
                            title="录入/编辑就业去向"
                          >
                            <Briefcase className="w-3.5 h-3.5" />
                          </button>

                          {/* Open Dossier Drawer */}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setDrawerStudent(student);
                              setDrawerTab('profile');
                            }}
                            className="h-6 px-2 text-[11px] text-[#3b82f6] hover:bg-blue-50 font-bold rounded"
                          >
                            档案
                            <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-neutral-100 flex flex-wrap items-center justify-between text-xs text-neutral-500 gap-3">
          <div>
            显示 <span className="font-bold text-neutral-800">{filteredStudents.length}</span> 条档案（共 {students.length} 条）
          </div>
          <div className="flex items-center gap-1.5">
            <button className="px-2.5 py-1 rounded border border-neutral-200 hover:bg-neutral-50 disabled:opacity-40" disabled>上一页</button>
            <button className="px-2.5 py-1 rounded bg-[#3b82f6] text-white font-bold">1</button>
            <button className="px-2.5 py-1 rounded border border-neutral-200 hover:bg-neutral-50 disabled:opacity-40" disabled>下一页</button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. 学员档案多维抽屉 (Student Dossier Drawer) */}
      {/* ========================================================================= */}
      {drawerStudent && (
        <div 
          className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-[2px] flex justify-end animate-fade-in"
          onClick={() => setDrawerStudent(null)}
        >
          <div 
            className="bg-white w-full max-w-[760px] h-screen flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
            onClick={e => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-md",
                  drawerStudent.gender === '女' ? "bg-gradient-to-tr from-pink-500 to-rose-400" : "bg-gradient-to-tr from-blue-600 to-cyan-500"
                )}>
                  {drawerStudent.name.slice(0, 1)}
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-xl font-black text-neutral-900">{drawerStudent.name}</h2>
                    <span className="text-xs px-2 py-0.5 bg-blue-100/80 text-[#2563eb] rounded-full font-bold">
                      {drawerStudent.classCohort}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded-full font-medium">
                      {drawerStudent.status}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500 mt-1 flex items-center gap-3">
                    <span>学号: <strong className="text-neutral-700 font-mono">{drawerStudent.studentNo}</strong></span>
                    <span>·</span>
                    <span>院校: {drawerStudent.university}</span>
                    <span>·</span>
                    <span>专业: {drawerStudent.major}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setDrawerStudent(null)}
                className="p-2 hover:bg-neutral-200/60 rounded-full transition-colors"
              >
                <XCircle className="w-5 h-5 text-neutral-400 hover:text-neutral-700" />
              </button>
            </div>

            {/* Drawer Tabs */}
            <div className="px-6 border-b border-neutral-200 flex gap-6 bg-white select-none">
              {[
                { key: 'profile', label: '基本档案', icon: Users },
                { key: 'learning', label: '在读学情与时长', icon: Cpu },
                { key: 'grades', label: '成绩与证书', icon: Award },
                { key: 'employment', label: '就业去向', icon: Briefcase },
                { key: 'auditTrail', label: '修改留痕 (审计)', icon: History, count: drawerStudent.auditTrail.length }
              ].map(t => (
                <button
                  key={t.key}
                  onClick={() => setDrawerTab(t.key as any)}
                  className={cn(
                    "py-3 font-bold text-xs border-b-2 flex items-center gap-1.5 transition-all",
                    drawerTab === t.key
                      ? "border-[#3b82f6] text-[#3b82f6]"
                      : "border-transparent text-neutral-500 hover:text-neutral-900"
                  )}
                >
                  <t.icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                  {t.count !== undefined && (
                    <span className="px-1.5 py-0.2 bg-neutral-100 text-neutral-600 rounded-full text-[10px]">
                      {t.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {drawerTab === 'profile' && (
                <div className="space-y-6">
                  {/* Basic Profile Grid */}
                  <div>
                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">个人与联络信息</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-neutral-50 p-4 rounded-xl border border-neutral-200/70 text-xs">
                      <div>
                        <span className="text-neutral-400 block mb-0.5">姓名</span>
                        <span className="font-bold text-neutral-800">{drawerStudent.name} ({drawerStudent.gender})</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block mb-0.5">联系电话</span>
                        <span className="font-medium text-neutral-800 font-mono">{drawerStudent.phone}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block mb-0.5">电子邮箱</span>
                        <span className="font-medium text-neutral-800">{drawerStudent.email}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block mb-0.5">毕业院校</span>
                        <span className="font-medium text-neutral-800">{drawerStudent.university}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block mb-0.5">就读专业</span>
                        <span className="font-medium text-neutral-800">{drawerStudent.major}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block mb-0.5">学历 / 届别</span>
                        <span className="font-medium text-neutral-800">{drawerStudent.education} · {drawerStudent.graduationYear}届</span>
                      </div>
                    </div>
                  </div>

                  {/* Enrollment & Tags */}
                  <div>
                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">来源渠道与意向方向</h3>
                    <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/70 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">来源渠道:</span>
                        <span className="font-bold text-neutral-800 bg-white px-2.5 py-1 rounded border border-neutral-200">{drawerStudent.source}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">意向技术方向:</span>
                        <span className="font-bold text-[#2563eb] bg-blue-50 px-2.5 py-1 rounded border border-blue-200">{drawerStudent.intentDirection}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">报名采集时间:</span>
                        <span className="text-neutral-700 font-mono">{drawerStudent.registerDate}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block mb-1.5">学员标签:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {drawerStudent.tags.map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 bg-white border border-neutral-200 rounded text-neutral-700 text-xs font-medium">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Audit & Allocation Details */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">班级期次与审核批注</h3>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setTargetClass(drawerStudent.classCohort !== '未分班' ? drawerStudent.classCohort : AVAILABLE_CLASSES[0]);
                          setIsClassModalOpen(true);
                        }}
                        className="h-7 text-xs text-[#3b82f6] border-blue-200 hover:bg-blue-50"
                      >
                        <Edit3 className="w-3 h-3 mr-1" />
                        调整班级期次
                      </Button>
                    </div>
                    <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/70 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">当前归属班级:</span>
                        <span className="font-extrabold text-neutral-900">{drawerStudent.classCohort}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">资格审核状态:</span>
                        <span className={cn(
                          "font-bold",
                          drawerStudent.auditStatus === '已通过' && "text-emerald-600",
                          drawerStudent.auditStatus === '待审核' && "text-amber-600",
                          drawerStudent.auditStatus === '已驳回' && "text-rose-600"
                        )}>
                          {drawerStudent.auditStatus} ({drawerStudent.auditor || '待审'})
                        </span>
                      </div>
                      {drawerStudent.auditRemark && (
                        <div className="pt-2 border-t border-neutral-200/60 text-neutral-600">
                          <span className="font-semibold text-neutral-700">审核评语: </span>
                          {drawerStudent.auditRemark}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Learning */}
              {drawerTab === 'learning' && (
                <div className="space-y-6">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50/60 border border-blue-100 p-4 rounded-xl text-center">
                      <div className="text-xs text-neutral-500">数字化课程完成率</div>
                      <div className="text-2xl font-black text-[#2563eb] mt-1">{drawerStudent.courseProgress}%</div>
                    </div>
                    <div className="bg-indigo-50/60 border border-indigo-100 p-4 rounded-xl text-center">
                      <div className="text-xs text-neutral-500">云沙箱实训时长</div>
                      <div className="text-2xl font-black text-indigo-700 mt-1">{drawerStudent.sandboxDurationHours} <span className="text-xs font-normal">h</span></div>
                    </div>
                    <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-xl text-center">
                      <div className="text-xs text-neutral-500">实操实验完成</div>
                      <div className="text-2xl font-black text-emerald-700 mt-1">{drawerStudent.completedLabs}/{drawerStudent.totalLabs}</div>
                    </div>
                  </div>

                  {/* Experiments List */}
                  <div>
                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">核心实验环境挂载与进度</h3>
                    <div className="space-y-2 text-xs">
                      {[
                        { title: '实验一：Llama-3 微调全流程沙箱', status: '已完成 (100分)', time: '22.5h' },
                        { title: '实验二：RAG 企业级知识库检索增强', status: '已完成 (95分)', time: '34.0h' },
                        { title: '实验三：Prompt 优化与 Agent 多智能体编排', status: drawerStudent.completedLabs >= 3 ? '已完成 (96分)' : '进行中 (60%)', time: '18.0h' },
                        { title: '实验四：大模型安全性与红队测试评估', status: drawerStudent.completedLabs >= 4 ? '已完成' : '待解锁', time: '12.0h' }
                      ].map((exp, idx) => (
                        <div key={idx} className="p-3 bg-neutral-50 border border-neutral-200/70 rounded-xl flex items-center justify-between">
                          <div className="font-medium text-neutral-800">{exp.title}</div>
                          <div className="flex items-center gap-3">
                            <span className="text-neutral-400">{exp.time}</span>
                            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{exp.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Grades & Certificate */}
              {drawerTab === 'grades' && (
                <div className="space-y-6 text-xs">
                  <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-neutral-400 block text-[11px]">综合评定总分</span>
                        <span className="text-3xl font-black text-neutral-900 mt-1">
                          {drawerStudent.overallScore || '暂未出分'} <span className="text-sm font-normal text-neutral-500">分</span>
                        </span>
                      </div>
                      <div className="flex gap-4">
                        <div className="text-right">
                          <span className="text-neutral-400 block">理论考核</span>
                          <span className="font-bold text-neutral-800 text-sm">{drawerStudent.theoryScore || '-'} 分</span>
                        </div>
                        <div className="text-right">
                          <span className="text-neutral-400 block">实训沙箱</span>
                          <span className="font-bold text-neutral-800 text-sm">{drawerStudent.practiceScore || '-'} 分</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                      <div>
                        <span className="text-neutral-500 block">结业证书状态:</span>
                        <span className="font-bold text-neutral-900 text-sm">{drawerStudent.certificateStatus}</span>
                        {drawerStudent.certificateNo && (
                          <span className="text-[11px] text-neutral-400 font-mono block mt-0.5">
                            编号: {drawerStudent.certificateNo} ({drawerStudent.certificateIssueDate})
                          </span>
                        )}
                      </div>
                      <div>
                        {drawerStudent.certificateStatus === '已发放' ? (
                          <Button
                            onClick={() => {
                              setCertStudent(drawerStudent);
                              setIsCertModalOpen(true);
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-1.5 shadow-sm"
                          >
                            <Award className="w-4 h-4" />
                            预览数字结业证书
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleIssueCertificate(drawerStudent)}
                            className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold gap-1.5"
                          >
                            <Sparkles className="w-4 h-4" />
                            生成并颁发证书
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Employment */}
              {drawerTab === 'employment' && (
                <div className="space-y-6 text-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">就业去向档案</h3>
                    <Button
                      size="sm"
                      onClick={() => {
                        setEmploymentFormStudent(drawerStudent);
                        setEmpStatus(drawerStudent.employment.status);
                        setEmpCompany(drawerStudent.employment.company || '');
                        setEmpPosition(drawerStudent.employment.position || '');
                        setEmpSalary(drawerStudent.employment.salary || '');
                        setEmpCity(drawerStudent.employment.city || '');
                        setEmpSignDate(drawerStudent.employment.signDate || '');
                        setEmpNotes(drawerStudent.employment.notes || '');
                        setIsEmploymentModalOpen(true);
                      }}
                      className="h-7 text-xs bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold"
                    >
                      <Edit3 className="w-3.5 h-3.5 mr-1" />
                      更新就业去向
                    </Button>
                  </div>

                  <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/80 space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div>
                        <span className="text-neutral-400 block mb-0.5">当前状态</span>
                        <span className="font-bold text-neutral-800 text-sm">{drawerStudent.employment.status}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block mb-0.5">签约企业 / 院校</span>
                        <span className="font-bold text-neutral-800 text-sm">{drawerStudent.employment.company || '-'}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block mb-0.5">岗位方向</span>
                        <span className="font-medium text-neutral-800">{drawerStudent.employment.position || '-'}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block mb-0.5">薪资待遇</span>
                        <span className="font-bold text-emerald-700 font-mono">{drawerStudent.employment.salary || '-'}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block mb-0.5">工作城市</span>
                        <span className="font-medium text-neutral-800">{drawerStudent.employment.city || '-'}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block mb-0.5">签约日期</span>
                        <span className="font-mono text-neutral-800">{drawerStudent.employment.signDate || '-'}</span>
                      </div>
                    </div>

                    {drawerStudent.employment.notes && (
                      <div className="pt-3 border-t border-neutral-200/70 text-neutral-600">
                        <span className="font-semibold text-neutral-700">跟踪备注: </span>
                        {drawerStudent.employment.notes}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab: Audit Trail (修改留痕) */}
              {drawerTab === 'auditTrail' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                      关键字段变更与审计记录 (全量留痕)
                    </h3>
                    <span className="text-[11px] text-neutral-400">所有字段变更自动留痕可溯源</span>
                  </div>

                  <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                    {drawerStudent.auditTrail.map((log, idx) => (
                      <div key={log.id || idx} className="relative group">
                        {/* Dot */}
                        <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#3b82f6] border-2 border-white shadow-sm"></div>
                        
                        <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/80 text-xs space-y-2 hover:bg-white hover:shadow-sm transition-all">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-neutral-900 text-[13px]">{log.fieldName}</span>
                            <span className="text-[11px] text-neutral-400 font-mono">{log.timestamp}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 bg-white p-2.5 rounded-lg border border-neutral-100">
                            <div>
                              <span className="text-[10px] text-neutral-400 block">变更前 (Before)</span>
                              <span className="font-mono text-neutral-600 line-through truncate block">{log.oldValue}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-emerald-600 block font-semibold">变更后 (After)</span>
                              <span className="font-mono text-emerald-700 font-bold truncate block">{log.newValue}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                            <span>操作人: <strong className="text-neutral-700">{log.operator}</strong></span>
                            <span>变更依据: <em className="not-italic text-neutral-600">{log.reason}</em></span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. 线上报名 / 信息采集配置与扫码模态框 */}
      {/* ========================================================================= */}
      {isRegisterConfigOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-[620px] rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden text-xs">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-[#2563eb]">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">线上报名与信息采集门户</h3>
                  <p className="text-[11px] text-neutral-500">生成专属公开报名表单与微信扫码入口</p>
                </div>
              </div>
              <button onClick={() => setIsRegisterConfigOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* QR Code & Link preview */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-gradient-to-r from-blue-50/60 to-indigo-50/40 rounded-xl border border-blue-100">
                {/* SVG mock QR Code */}
                <div className="w-32 h-32 bg-white p-2 rounded-xl border border-neutral-200 shadow-sm flex flex-col items-center justify-center shrink-0">
                  <div className="w-full h-full bg-[radial-gradient(#2563eb_2px,transparent_2px)] [background-size:8px_8px] rounded border border-neutral-100 flex items-center justify-center">
                    <div className="w-8 h-8 rounded bg-[#3b82f6] text-white flex items-center justify-center font-bold text-xs shadow">
                      智
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <div className="font-bold text-neutral-900 text-sm">2026年智云AI实训学员线上报名表</div>
                  <p className="text-neutral-500 text-[11px] leading-relaxed">
                    学员使用微信或浏览器扫码，即可提交基础信息、意向方向、院校专业及电子简历附件。
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <Input
                      readOnly
                      value="https://zhiyun.edu/apply/2026-ai-spring?ref=T1001"
                      className="h-8 text-xs font-mono bg-white text-neutral-600 select-all"
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText("https://zhiyun.edu/apply/2026-ai-spring?ref=T1001");
                        setCopiedLink(true);
                        setTimeout(() => setCopiedLink(false), 2000);
                        showToast('报名链接已复制到剪贴板！');
                      }}
                      className="h-8 text-xs bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold shrink-0"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                      {copiedLink ? '已复制' : '复制链接'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Form fields config items */}
              <div>
                <h4 className="font-bold text-neutral-800 mb-2">已启用的采集字段配置</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { label: '学员姓名/性别/年龄', req: true },
                    { label: '手机号 (短信验证)', req: true },
                    { label: '电子邮箱', req: true },
                    { label: '毕业院校及专业', req: true },
                    { label: '意向实训技术方向', req: true },
                    { label: '简历/作品集附件', req: false }
                  ].map((field, i) => (
                    <div key={i} className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg flex items-center justify-between">
                      <span className="text-neutral-700">{field.label}</span>
                      <span className={cn("text-[10px] font-bold px-1.5 py-0.2 rounded", field.req ? "bg-rose-50 text-rose-600" : "bg-neutral-100 text-neutral-500")}>
                        {field.req ? '必填' : '选填'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-neutral-100 flex justify-end gap-2 bg-neutral-50">
              <Button variant="outline" onClick={() => setIsRegisterConfigOpen(false)}>
                关闭
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. Excel 批量导入向导模态框 (4 步流程) */}
      {/* ========================================================================= */}
      {isExcelImportOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-[680px] rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden text-xs">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">Excel 批量导入学员档案向导</h3>
                  <p className="text-[11px] text-neutral-500">支持批量创建档案、自动分配期次并校验数据格式</p>
                </div>
              </div>
              <button onClick={() => setIsExcelImportOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Header */}
            <div className="px-8 py-3 bg-neutral-100/60 border-b border-neutral-200 flex items-center justify-between select-none">
              {[
                { s: 1, label: '1. 下载标准模板' },
                { s: 2, label: '2. 上传数据文件' },
                { s: 3, label: '3. 智能字段校验' },
                { s: 4, label: '4. 导入完成' }
              ].map(step => (
                <div 
                  key={step.s}
                  className={cn(
                    "flex items-center gap-1.5 font-bold text-xs",
                    importStep === step.s ? "text-[#3b82f6]" : importStep > step.s ? "text-emerald-600" : "text-neutral-400"
                  )}
                >
                  <span className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center text-[10px]",
                    importStep === step.s ? "bg-[#3b82f6] text-white" : importStep > step.s ? "bg-emerald-600 text-white" : "bg-neutral-200 text-neutral-600"
                  )}>
                    {importStep > step.s ? '✓' : step.s}
                  </span>
                  <span>{step.label}</span>
                </div>
              ))}
            </div>

            <div className="p-6 space-y-6">
              {importStep === 1 && (
                <div className="space-y-4 text-center py-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#3b82f6] flex items-center justify-center mx-auto mb-2">
                    <Download className="w-8 h-8" />
                  </div>
                  <h4 className="text-sm font-bold text-neutral-800">第一步：请先下载标准化学员信息采集模板</h4>
                  <p className="text-neutral-500 max-w-md mx-auto text-[11px] leading-relaxed">
                    模板中包含姓名、手机、邮箱、院校、专业、来源渠道、意向技术方向、目标班级期次等必填与选填字段规范。
                  </p>
                  <Button
                    onClick={() => {
                      showToast('标准 Excel 导入模板《模数师学员导入模板_v2026.xlsx》已开始下载');
                      setImportStep(2);
                    }}
                    className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold gap-2 shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    下载标准 Excel 导入模板
                  </Button>
                </div>
              )}

              {importStep === 2 && (
                <div className="space-y-4">
                  <div 
                    onClick={() => {
                      setParsedImportData([1, 2, 3, 4, 5, 6]);
                      setImportStep(3);
                    }}
                    className="border-2 border-dashed border-neutral-300 hover:border-[#3b82f6] hover:bg-blue-50/20 p-8 rounded-2xl text-center cursor-pointer transition-all space-y-2"
                  >
                    <Upload className="w-10 h-10 text-neutral-400 mx-auto" />
                    <div className="font-bold text-neutral-800 text-sm">点击或拖拽上传填写好的 Excel 文件 (.xlsx, .xls)</div>
                    <p className="text-neutral-400 text-[11px]">单个文件支持最大 10MB，每次最多导入 5000 条学员记录</p>
                  </div>
                </div>
              )}

              {importStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-neutral-800">
                      文件解析成功：检测到 <span className="text-[#3b82f6] font-black">6</span> 条有效学员记录
                    </div>
                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      全部字段通过合规校验
                    </span>
                  </div>

                  <div className="border border-neutral-200 rounded-xl overflow-hidden max-h-[220px] overflow-y-auto text-[11px]">
                    <table className="w-full text-left">
                      <thead className="bg-neutral-50 border-b border-neutral-200 font-bold text-neutral-600">
                        <tr>
                          <th className="p-2">姓名</th>
                          <th className="p-2">联系手机</th>
                          <th className="p-2">院校与专业</th>
                          <th className="p-2">意向方向</th>
                          <th className="p-2">目标班级</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {['吴昊天', '赵雅馨', '钱博文', '孙子涵', '李慕白', '范楚楚'].map((name, i) => (
                          <tr key={i}>
                            <td className="p-2 font-bold">{name}</td>
                            <td className="p-2 font-mono">138001122{20 + i}</td>
                            <td className="p-2">华中科技大学 · 人工智能</td>
                            <td className="p-2 text-[#2563eb]">大模型开发与微调</td>
                            <td className="p-2">2026春季大模型2班</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-neutral-100 flex justify-between items-center bg-neutral-50">
              <Button
                variant="outline"
                onClick={() => {
                  if (importStep > 1) setImportStep((importStep - 1) as any);
                  else setIsExcelImportOpen(false);
                }}
              >
                {importStep === 1 ? '取消' : '上一步'}
              </Button>

              {importStep === 3 && (
                <Button
                  onClick={handleExecuteExcelImport}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  确认导入 6 位学员
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. 资格审核模态框 */}
      {/* ========================================================================= */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-[520px] rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden text-xs">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">学员资格审核</h3>
                  <p className="text-[11px] text-neutral-500">
                    审核 {auditTargetStudents.length} 位学员的实训入读资格
                  </p>
                </div>
              </div>
              <button onClick={() => setIsAuditModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Target names */}
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="text-neutral-400 block mb-1 text-[11px]">待审学员名单:</span>
                <div className="flex flex-wrap gap-1.5 font-bold text-neutral-800">
                  {auditTargetStudents.map(s => (
                    <span key={s.id} className="bg-white px-2 py-0.5 rounded border border-neutral-200 text-xs">
                      {s.name} ({s.university})
                    </span>
                  ))}
                </div>
              </div>

              {/* Decision */}
              <div>
                <label className="font-bold text-neutral-800 block mb-1.5">审核结论</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="auditDecision"
                      checked={auditDecision === 'pass'}
                      onChange={() => setAuditDecision('pass')}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="font-bold text-emerald-700">审核通过 (流转至待分班/在读)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="auditDecision"
                      checked={auditDecision === 'reject'}
                      onChange={() => setAuditDecision('reject')}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <span className="font-bold text-rose-700">审核驳回</span>
                  </label>
                </div>
              </div>

              {/* Remark */}
              <div>
                <label className="font-bold text-neutral-800 block mb-1.5">审核批注意见</label>
                <Textarea
                  value={auditComment}
                  onChange={e => setAuditComment(e.target.value)}
                  placeholder="请输入审核评语或驳回原因说明..."
                  className="text-xs min-h-[80px]"
                />
              </div>
            </div>

            <div className="p-4 border-t border-neutral-100 flex justify-end gap-2 bg-neutral-50">
              <Button variant="outline" onClick={() => setIsAuditModalOpen(false)}>
                取消
              </Button>
              <Button
                onClick={handlePerformAudit}
                className={cn(
                  "font-bold text-white shadow-sm",
                  auditDecision === 'pass' ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"
                )}
              >
                提交审核结论
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. 班级/期次归属分配模态框 */}
      {/* ========================================================================= */}
      {isClassModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-[480px] rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden text-xs">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-[#2563eb]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">分配 / 调整班级期次</h3>
                  <p className="text-[11px] text-neutral-500">归属调整将自动记录至修改留痕审计中</p>
                </div>
              </div>
              <button onClick={() => setIsClassModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="font-bold text-neutral-800 block mb-1.5">选择目标班级 / 期次</label>
                <select
                  value={targetClass}
                  onChange={e => setTargetClass(e.target.value)}
                  className="w-full h-9 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 font-bold focus:outline-none focus:border-[#3b82f6]"
                >
                  {AVAILABLE_CLASSES.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-neutral-800 block mb-1.5">调班 / 分配原因 (留痕记录)</label>
                <Input
                  value={classChangeReason}
                  onChange={e => setClassChangeReason(e.target.value)}
                  placeholder="例如：按专业方向批量入班、学员申请进阶班等"
                  className="text-xs h-9"
                />
              </div>
            </div>

            <div className="p-4 border-t border-neutral-100 flex justify-end gap-2 bg-neutral-50">
              <Button variant="outline" onClick={() => setIsClassModalOpen(false)}>
                取消
              </Button>
              <Button
                onClick={handlePerformClassAssign}
                className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold"
              >
                确认分班
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. 数字证书防伪预览模态框 (Certificate Modal) */}
      {/* ========================================================================= */}
      {isCertModalOpen && certStudent && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-[700px] rounded-2xl shadow-2xl border-4 border-amber-200/80 overflow-hidden text-neutral-800 relative">
            
            {/* Certificate Header pattern */}
            <div className="bg-gradient-to-r from-[#1e3a8a] via-[#1d4ed8] to-[#1e3a8a] p-8 text-center text-white relative">
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button 
                  onClick={() => setIsCertModalOpen(false)}
                  className="text-white/70 hover:text-white"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="w-12 h-12 bg-amber-400/20 border border-amber-300/40 rounded-full flex items-center justify-center mx-auto mb-2 text-amber-300">
                <Award className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black tracking-widest uppercase">实训结业证书</h2>
              <div className="text-xs text-amber-200/80 tracking-widest mt-1">CERTIFICATE OF COMPLETION</div>
            </div>

            {/* Certificate Body */}
            <div className="p-8 space-y-6 text-center bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] [background-size:16px_16px]">
              <p className="text-xs text-neutral-500">兹证明</p>
              <h3 className="text-3xl font-black text-neutral-900 tracking-wide border-b-2 border-neutral-300 pb-2 inline-block px-8">
                {certStudent.name}
              </h3>
              
              <p className="text-xs text-neutral-600 max-w-lg mx-auto leading-relaxed">
                学号 <strong>{certStudent.studentNo}</strong>，在模数师数字平台参加<strong>【{certStudent.intentDirection}】</strong>高级工程实训课程与沙箱实验，完成全部教学任务与综合考评，成绩评定为 <strong>{certStudent.overallScore || 95} 分（优秀）</strong>，特发此证。
              </p>

              {/* Seal & QR Code */}
              <div className="pt-6 flex items-end justify-between px-8 border-t border-neutral-200">
                <div className="text-left text-[11px] text-neutral-500 space-y-0.5">
                  <div>证书编号: <strong className="font-mono text-neutral-800">{certStudent.certificateNo}</strong></div>
                  <div>颁发日期: <span className="font-mono">{certStudent.certificateIssueDate || '2026-06-15'}</span></div>
                  <div>发证机构: <strong>模数师数字平台教学指导委员会</strong></div>
                </div>

                {/* Red Official Stamp */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-2 border-red-600/80 flex flex-col items-center justify-center text-red-600 font-black text-[10px] transform -rotate-12 select-none pointer-events-none shadow-inner">
                    <div className="text-[8px] tracking-tighter">★ 模数师 ★</div>
                    <div className="text-xs my-0.5">证书专用章</div>
                    <div className="text-[7px]">OFFICIAL SEAL</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-xs">
              <span className="text-neutral-400">官方防伪二维码与电子认证可在线核验</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    showToast('已生成高清 PDF 电子证书并准备下载！');
                  }}
                  className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  下载电子证书 (PDF)
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. 就业去向录入/编辑模态框 */}
      {/* ========================================================================= */}
      {isEmploymentModalOpen && employmentFormStudent && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-[540px] rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden text-xs">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-800">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    录入 / 编辑就业去向（{employmentFormStudent.name}）
                  </h3>
                  <p className="text-[11px] text-neutral-500">更新就业状态与签约薪资等信息</p>
                </div>
              </div>
              <button onClick={() => setIsEmploymentModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-neutral-800 block mb-1">就业签约状态</label>
                  <select
                    value={empStatus}
                    onChange={e => setEmpStatus(e.target.value as any)}
                    className="w-full h-9 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 font-bold focus:outline-none focus:border-[#3b82f6]"
                  >
                    <option value="已正式签约">已正式签约 (三方/劳动合同)</option>
                    <option value="拟录用/Offer">拟录用 / 已接Offer</option>
                    <option value="升学深造">升学深造 (读研/直博)</option>
                    <option value="自主创业">自主创业</option>
                    <option value="求职中">求职中</option>
                    <option value="暂无意向">暂无意向</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">签约企业 / 单位</label>
                  <Input
                    value={empCompany}
                    onChange={e => setEmpCompany(e.target.value)}
                    placeholder="如：阿里云、智谱AI、华为等"
                    className="text-xs h-9"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">岗位名称</label>
                  <Input
                    value={empPosition}
                    onChange={e => setEmpPosition(e.target.value)}
                    placeholder="如：大模型算法实习工程师"
                    className="text-xs h-9"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">薪资待遇</label>
                  <Input
                    value={empSalary}
                    onChange={e => setEmpSalary(e.target.value)}
                    placeholder="如：20k-25k·15薪"
                    className="text-xs h-9 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">工作所在城市</label>
                  <Input
                    value={empCity}
                    onChange={e => setEmpCity(e.target.value)}
                    placeholder="如：北京-海淀区"
                    className="text-xs h-9"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">签约 / 入职日期</label>
                  <Input
                    type="date"
                    value={empSignDate}
                    onChange={e => setEmpSignDate(e.target.value)}
                    className="text-xs h-9"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-neutral-800 block mb-1">备注说明 (自动留痕)</label>
                <Textarea
                  value={empNotes}
                  onChange={e => setEmpNotes(e.target.value)}
                  placeholder="补充关于三方协议签订、面试评价等说明..."
                  className="text-xs min-h-[60px]"
                />
              </div>
            </div>

            <div className="p-4 border-t border-neutral-100 flex justify-end gap-2 bg-neutral-50">
              <Button variant="outline" onClick={() => setIsEmploymentModalOpen(false)}>
                取消
              </Button>
              <Button
                onClick={handleSaveEmployment}
                className="bg-teal-700 hover:bg-teal-800 text-white font-bold"
              >
                保存就业档案
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. 手动录入单条学员模态框 */}
      {/* ========================================================================= */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-[580px] rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden text-xs">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-[#2563eb]">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">录入新学员报名档案</h3>
                  <p className="text-[11px] text-neutral-500">手动录入单条生源信息</p>
                </div>
              </div>
              <button onClick={() => setIsAddStudentOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-neutral-800 block mb-1">学员姓名 *</label>
                  <Input
                    value={newStudentForm.name}
                    onChange={e => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                    placeholder="请输入真实姓名"
                    className="text-xs h-9"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">联系电话 *</label>
                  <Input
                    value={newStudentForm.phone}
                    onChange={e => setNewStudentForm({ ...newStudentForm, phone: e.target.value })}
                    placeholder="11位手机号码"
                    className="text-xs h-9 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">性别</label>
                  <select
                    value={newStudentForm.gender}
                    onChange={e => setNewStudentForm({ ...newStudentForm, gender: e.target.value as any })}
                    className="w-full h-9 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-xl"
                  >
                    <option value="男">男</option>
                    <option value="女">女</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">年龄</label>
                  <Input
                    type="number"
                    value={newStudentForm.age}
                    onChange={e => setNewStudentForm({ ...newStudentForm, age: Number(e.target.value) })}
                    className="text-xs h-9"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">毕业/就读院校</label>
                  <Input
                    value={newStudentForm.university}
                    onChange={e => setNewStudentForm({ ...newStudentForm, university: e.target.value })}
                    placeholder="如：华中科技大学"
                    className="text-xs h-9"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">就读专业</label>
                  <Input
                    value={newStudentForm.major}
                    onChange={e => setNewStudentForm({ ...newStudentForm, major: e.target.value })}
                    placeholder="如：计算机科学与技术"
                    className="text-xs h-9"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">来源渠道</label>
                  <select
                    value={newStudentForm.source}
                    onChange={e => setNewStudentForm({ ...newStudentForm, source: e.target.value as any })}
                    className="w-full h-9 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-xl"
                  >
                    {SOURCE_OPTIONS.map(src => (
                      <option key={src} value={src}>{src}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">意向实训方向</label>
                  <select
                    value={newStudentForm.intentDirection}
                    onChange={e => setNewStudentForm({ ...newStudentForm, intentDirection: e.target.value as any })}
                    className="w-full h-9 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-xl font-medium"
                  >
                    {INTENT_OPTIONS.map(intent => (
                      <option key={intent} value={intent}>{intent}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-neutral-100 flex justify-end gap-2 bg-neutral-50">
              <Button variant="outline" onClick={() => setIsAddStudentOpen(false)}>
                取消
              </Button>
              <Button
                onClick={handleAddManualStudent}
                className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold"
              >
                保存并录入档案
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
