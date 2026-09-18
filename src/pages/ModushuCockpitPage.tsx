import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Maximize2, Minimize2 } from 'lucide-react';
import '@/styles/modushuCockpit.css';

const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1080;

const withBase = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

const grades = [19, 27, 65, 89, 73, 89, 112, 158, 114, 48];
const gradeColors = ['cyan', 'cyan', 'cyan', 'blue', 'blue', 'blue', 'blue', 'orange', 'orange', 'orange'];

const industryItems = [
  ['制造业', '23%', '#ff2274'],
  ['建筑工程', '2%', '#00ffae'],
  ['商贸流通', '12%', '#ffb900'],
  ['AIGC', '7%', '#04dcfd'],
  ['现代服务业', '8%', '#0094ff'],
  ['短视频', '4%', '#a600ff'],
  ['数字经济', '15%', '#f6fffc'],
  ['其他', '2%', '#511cff'],
] as const;

const initialCourses = [
  { rank: 1, name: '短视频运营', learners: 4100, rating: '4.9', growth: 5 },
  { rank: 2, name: '智能制造', learners: 3326, rating: '4.8', growth: 4 },
  { rank: 3, name: '人工智能应用', learners: 3056, rating: '4.88', growth: 3 },
  { rank: 4, name: '电商运营', learners: 2375, rating: '4.6', growth: 3 },
  { rank: 5, name: '养老护理', learners: 1754, rating: '4.9', growth: 2 },
  { rank: 6, name: '数字化营销', learners: 1632, rating: '4.86', growth: 2 },
  { rank: 7, name: '工业互联网', learners: 1488, rating: '4.8', growth: 2 },
  { rank: 8, name: '直播电商实务', learners: 1260, rating: '4.78', growth: 1 },
  { rank: 9, name: '数据分析基础', learners: 1086, rating: '4.76', growth: 1 },
  { rank: 10, name: '跨境电商', learners: 965, rating: '4.72', growth: 1 },
];

const floatingBubbles = [
  { id: 'standard', label: '行业标准建设', asset: 'bubble-standard.png', x: 300, y: 252, duration: 5.4, delay: -1.2, reverse: false },
  { id: 'talent', label: '普惠人才培育', asset: 'bubble-talent.png', x: 764, y: 252, duration: 6.1, delay: -3.4, reverse: true },
  { id: 'enterprise', label: '企业转型赋能', asset: 'bubble-enterprise.png', x: 298, y: 713, duration: 5.8, delay: -2.3, reverse: true },
  { id: 'employment', label: '认证就业衔接', asset: 'bubble-employment.png', x: 766, y: 713, duration: 6.4, delay: -4.1, reverse: false },
];

const orbitalParticles = [
  { id: 'top', asset: 'particle-top.png', x: 575, y: 373, width: 43, height: 43, radius: 4, duration: 15, delay: -2, reverse: false },
  { id: 'left', asset: 'particle-left.png', x: 375, y: 514, width: 50, height: 50, radius: 5, duration: 17, delay: -5, reverse: true },
  { id: 'right', asset: 'particle-right.png', x: 763, y: 455, width: 50, height: 50, radius: 4, duration: 16, delay: -8, reverse: false },
  { id: 'inner', asset: 'particle-inner.png', x: 516, y: 645, width: 32, height: 32, radius: 3, duration: 13, delay: -6, reverse: false },
  { id: 'lower', asset: 'particle-lower.png', x: 630, y: 717, width: 50, height: 50, radius: 5, duration: 18, delay: -4, reverse: true },
];

const visualLabels = [
  { label: '行业标准建设态势', asset: 'label-standard.png', x: 232, y: 177 },
  { label: '普惠人才培育态势', asset: 'label-talent.png', x: 697, y: 177 },
  { label: '企业转型赋能态势', asset: 'label-enterprise.png', x: 231, y: 639 },
  { label: '认证就业衔接态势', asset: 'label-employment.png', x: 699, y: 639 },
];

const certificates = [
  ['短视频制作高级专家', 90],
  ['AIGC工程师', 90],
  ['运营高级专家', 20],
  ['AI设计工程师', 34],
  ['数字技能工程师', 34],
] as const;

interface DetailModuleData {
  id: string;
  title: string;
  subtitle: string;
  asset: string;
  accent: string;
  kpis: [string, string, string, string][];
  trend: {
    title: string;
    unit: string;
    labels: string[];
    values: number[];
  };
  distribution: {
    title: string;
    centerValue: string;
    centerLabel: string;
    segments: [string, number, string][];
  };
  progress: {
    title: string;
    rows: [string, number][];
  };
  table: {
    title: string;
    columns: string[];
    rows: { cells: string[]; tone: string }[];
  };
}

const detailModules: Record<string, DetailModuleData> = {
  standard: {
    id: 'standard',
    title: '行业标准建设态势',
    subtitle: '产业数字化能力标准体系',
    asset: 'bubble-standard.png',
    accent: '#24d7ff',
    kpis: [
      ['标准总数', '128', '项', '+12'],
      ['覆盖行业', '8', '类', '+1'],
      ['覆盖岗位', '42', '个', '+6'],
      ['已发布标准', '96', '项', '75.0%'],
      ['标准采用率', '82.6', '%', '+4.2%'],
    ],
    trend: {
      title: '标准建设趋势',
      unit: '累计标准 / 项',
      labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
      values: [68, 76, 84, 93, 107, 128],
    },
    distribution: {
      title: '标准类型结构',
      centerValue: '128',
      centerLabel: '标准总数',
      segments: [
        ['数字技能', 34, '#24d7ff'],
        ['产业技能', 28, '#3478ff'],
        ['岗位能力', 22, '#00f0ae'],
        ['职业素养', 16, '#ffad2f'],
      ],
    },
    progress: {
      title: '重点行业标准覆盖率',
      rows: [
        ['制造业', 92],
        ['数字经济', 86],
        ['商贸流通', 78],
        ['现代服务业', 71],
        ['AIGC', 68],
      ],
    },
    table: {
      title: '标准建设明细',
      columns: ['标准名称', '适用岗位', '能力等级', '建设阶段', '最近更新'],
      rows: [
        { cells: ['短视频运营能力标准', '短视频运营师', 'L1-L5', '已发布', '2026-09-06'], tone: 'complete' },
        { cells: ['智能制造应用标准', '智能制造工程师', 'L2-L6', '试运行', '2026-09-03'], tone: 'active' },
        { cells: ['AIGC内容生产标准', 'AIGC工程师', 'L1-L5', '建设中', '2026-08-28'], tone: 'active' },
        { cells: ['数字化营销能力标准', '数字营销师', 'L1-L4', '专家评审', '2026-08-22'], tone: 'warning' },
      ],
    },
  },
  talent: {
    id: 'talent',
    title: '普惠人才培育态势',
    subtitle: '从学习参与到能力成长',
    asset: 'bubble-talent.png',
    accent: '#28e2ff',
    kpis: [
      ['累计学员', '146,788', '人', '+2.8%'],
      ['活跃学员', '38,620', '人', '+6.4%'],
      ['课程完成率', '87.4', '%', '+3.1%'],
      ['考试通过率', '81.6', '%', '+2.5%'],
      ['平均学习时长', '46.8', '小时', '+5.2%'],
    ],
    trend: {
      title: '人才培养规模趋势',
      unit: '月度新增学员 / 百人',
      labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
      values: [82, 96, 118, 109, 137, 156],
    },
    distribution: {
      title: '学习阶段分布',
      centerValue: '4阶',
      centerLabel: '培养路径',
      segments: [
        ['入门学习', 32, '#24d7ff'],
        ['进阶训练', 28, '#3478ff'],
        ['项目实训', 24, '#00f0ae'],
        ['认证冲刺', 16, '#ffad2f'],
      ],
    },
    progress: {
      title: '热门课程完成率',
      rows: [
        ['短视频运营', 94],
        ['智能制造', 89],
        ['人工智能应用', 86],
        ['电商运营', 82],
        ['养老护理', 78],
      ],
    },
    table: {
      title: '重点培养项目',
      columns: ['培养项目', '覆盖专业', '在学人数', '完成率', '运行状态'],
      rows: [
        { cells: ['数字运营人才计划', '电商与短视频', '8,460', '91.2%', '运行良好'], tone: 'complete' },
        { cells: ['智能制造提升计划', '工业互联网', '6,280', '87.5%', '运行良好'], tone: 'complete' },
        { cells: ['AIGC应用训练营', '人工智能', '5,930', '83.8%', '进行中'], tone: 'active' },
        { cells: ['数字技能普惠班', '数字经济', '4,760', '76.4%', '需关注'], tone: 'warning' },
      ],
    },
  },
  enterprise: {
    id: 'enterprise',
    title: '企业转型赋能态势',
    subtitle: '企业诊断、项目实施与成效追踪',
    asset: 'bubble-enterprise.png',
    accent: '#4fd8ff',
    kpis: [
      ['服务企业', '206', '家', '+18'],
      ['诊断企业', '168', '家', '81.6%'],
      ['实施项目', '124', '个', '+15'],
      ['项目完成率', '82.1', '%', '+4.6%'],
      ['企业满意度', '96.4', '%', '+1.8%'],
    ],
    trend: {
      title: '企业赋能项目趋势',
      unit: '累计实施项目 / 个',
      labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
      values: [48, 61, 73, 88, 106, 124],
    },
    distribution: {
      title: '服务企业行业结构',
      centerValue: '206',
      centerLabel: '服务企业',
      segments: [
        ['制造业', 38, '#24d7ff'],
        ['商贸流通', 25, '#3478ff'],
        ['现代服务', 21, '#00f0ae'],
        ['其他行业', 16, '#ffad2f'],
      ],
    },
    progress: {
      title: '数字化成熟度达标率',
      rows: [
        ['生产数字化', 88],
        ['运营数字化', 84],
        ['营销数字化', 79],
        ['管理数字化', 76],
        ['数据治理', 69],
      ],
    },
    table: {
      title: '重点赋能项目',
      columns: ['企业名称', '所属行业', '赋能方向', '项目进度', '风险状态'],
      rows: [
        { cells: ['华东智造科技', '制造业', '生产数字化', '92%', '正常'], tone: 'complete' },
        { cells: ['云启商贸集团', '商贸流通', '数字化营销', '84%', '正常'], tone: 'complete' },
        { cells: ['新程服务科技', '现代服务', '数据治理', '68%', '进行中'], tone: 'active' },
        { cells: ['恒远工业设备', '制造业', '工业互联网', '53%', '进度预警'], tone: 'warning' },
      ],
    },
  },
  employment: {
    id: 'employment',
    title: '认证就业衔接态势',
    subtitle: '技能认证、岗位匹配与就业闭环',
    asset: 'bubble-employment.png',
    accent: '#22e7ff',
    kpis: [
      ['持证人才', '146,788', '人', '+3.6%'],
      ['开放岗位', '8,460', '个', '+620'],
      ['成功匹配', '12,680', '人', '+8.2%'],
      ['就业闭环率', '96.8', '%', '+1.2%'],
      ['平均匹配周期', '18.4', '天', '-2.6天'],
    ],
    trend: {
      title: '就业匹配规模趋势',
      unit: '月度成功匹配 / 百人',
      labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
      values: [76, 91, 105, 122, 138, 164],
    },
    distribution: {
      title: '就业行业流向',
      centerValue: '8类',
      centerLabel: '就业行业',
      segments: [
        ['制造业', 31, '#24d7ff'],
        ['数字经济', 27, '#3478ff'],
        ['商贸流通', 23, '#00f0ae'],
        ['其他行业', 19, '#ffad2f'],
      ],
    },
    progress: {
      title: '就业服务转化漏斗',
      rows: [
        ['完成认证', 100],
        ['建立人才档案', 92],
        ['岗位精准推荐', 81],
        ['进入企业面试', 67],
        ['确认入职', 54],
      ],
    },
    table: {
      title: '重点岗位需求',
      columns: ['岗位名称', '招聘企业', '需求人数', '匹配率', '招聘状态'],
      rows: [
        { cells: ['短视频运营师', '云启商贸集团', '320', '92.4%', '招聘中'], tone: 'active' },
        { cells: ['智能制造工程师', '华东智造科技', '180', '88.6%', '招聘中'], tone: 'active' },
        { cells: ['AIGC应用工程师', '新程服务科技', '150', '84.2%', '人才储备'], tone: 'complete' },
        { cells: ['数字营销师', '启航数字科技', '120', '76.8%', '匹配偏低'], tone: 'warning' },
      ],
    },
  },
};

function getViewportLayout() {
  if (typeof window === 'undefined') {
    return { scale: 1, logicalWidth: BASE_WIDTH, logicalHeight: BASE_HEIGHT };
  }

  const w = window.innerWidth || BASE_WIDTH;
  const h = window.innerHeight || BASE_HEIGHT;
  const rawScale = Math.min(w / BASE_WIDTH, h / BASE_HEIGHT);
  const scale = Number.isFinite(rawScale) && rawScale > 0.05 ? rawScale : 1;

  return {
    scale,
    logicalWidth: Math.round(w / scale),
    logicalHeight: Math.round(h / scale),
  };
}

function useDashboardViewport() {
  const [layout, setLayout] = useState(getViewportLayout);

  useEffect(() => {
    const resize = () => setLayout(getViewportLayout());

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return layout;
}

function useLiveDashboardData() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setTick((value) => value + 1), 8000);
    return () => window.clearInterval(timer);
  }, []);

  const refreshPhase = tick % 6;

  return {
    refreshKey: tick,
    metrics: [
      ['累计学员人数', 146788 + refreshPhase * 7, '人', 'metric-users.png'],
      ['赋能企业数量', 200 + Math.floor(refreshPhase / 3), '家', 'metric-order.png'],
      ['持证人才储备', 146788 + refreshPhase * 5, '人', 'metric-building.png'],
      ['就业服务闭环率', (96.8 + (tick % 3) * 0.1).toFixed(1), '%', 'metric-order-alt.png'],
    ] as [string, string | number, string, string][],
    courses: initialCourses.map(({ growth, ...course }) => ({
      ...course,
      learners: course.learners + refreshPhase * growth,
    })),
  };
}

function SectionTitle({ asset, children }: { asset: string; children: React.ReactNode }) {
  return (
    <div className="section-title">
      <img src={withBase(`/assets/${asset}`)} alt={typeof children === 'string' ? children : ''} />
    </div>
  );
}

function DashboardChrome({ type, src, alt, withSweep = false }: { type: string; src: string; alt: string; withSweep?: boolean }) {
  return (
    <div className={`dashboard-chrome dashboard-chrome--${type}`}>
      <img className={`dashboard-${type}`} src={withBase(src)} alt={alt} />
      {withSweep && <span className="dashboard-chrome__sweep" aria-hidden="true" />}
    </div>
  );
}

function MetricIcon({ asset, refreshKey }: { asset: string; refreshKey: number }) {
  return (
    <div className="metric-orbit" aria-hidden="true">
      <img className="metric-orbit__art" src={withBase(`/assets/${asset}`)} alt="" />
      <span className="metric-orbit__refresh" key={refreshKey} />
    </div>
  );
}

function Metrics({ metrics, refreshKey }: { metrics: [string, string | number, string, string][]; refreshKey: number }) {
  return (
    <div className="metrics-grid">
      {metrics.map(([label, value, unit, asset]) => (
        <div className="metric" key={label}>
          <MetricIcon asset={asset} refreshKey={refreshKey} />
          <div className="metric__copy">
            <div className="metric__label">{label}</div>
            <div className="metric__value">
              <strong>
                <span className="metric__number" key={`${label}-${value}`}>
                  {typeof value === 'number' ? value.toLocaleString('zh-CN') : value}
                </span>
              </strong>
              <span>{unit}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function GradeChart() {
  return (
    <div className="grade-chart" aria-label="学员等级柱状图">
      <div className="grade-chart__unit">单位:人</div>
      <div className="grade-chart__grid">
        {[1000, 800, 600, 400, 200, 0].map((value) => (
          <div className="grade-chart__line" key={value}>
            <span>{value === 1000 ? '1,000.00' : value === 0 ? '0' : `${value}.00`}</span>
            <i />
          </div>
        ))}
      </div>
      <div className="grade-chart__bars">
        {grades.map((value, index) => (
          <div className="grade-bar" key={`L${index + 1}`}>
            <div
              className={`grade-bar__fill grade-bar__fill--${gradeColors[index]}`}
              style={{ height: `${value}px`, animationDelay: `${450 + index * 70}ms` }}
            />
            <span>L{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeftPanel({ metrics, refreshKey }: { metrics: [string, string | number, string, string][]; refreshKey: number }) {
  return (
    <aside className="left-panel dashboard-panel">
      <section className="intro-block">
        <SectionTitle asset="title-intro.png">平台介绍</SectionTitle>
        <div className="academy-photo">
          <img src={withBase("/assets/academy.jpg")} alt="玄武模数师学院展示区" />
        </div>
        <p className="intro-copy">
          构建产业数字化能力标准体系，服务区域人才高质量发展与产业转型升级;以模数化能力建设为核心，实现人才培养标准化、产业赋能体系化、就业服务规范化
        </p>
      </section>

      <section className="overview-block">
        <SectionTitle asset="title-overview.png">态势总览</SectionTitle>
        <Metrics metrics={metrics} refreshKey={refreshKey} />
      </section>

      <section className="grade-block">
        <SectionTitle asset="title-grade.png">学员等级</SectionTitle>
        <GradeChart />
      </section>
    </aside>
  );
}

function CourseTable({ courses }: { courses: typeof initialCourses }) {
  const loopedCourses = [...courses, ...courses];

  return (
    <div className="course-table" role="table" aria-label="热门课程 Top 10">
      <div className="course-table__row course-table__head" role="row">
        <span>排名</span>
        <span>课程名称</span>
        <span>学习人数</span>
        <span>课程评价</span>
      </div>
      <div className="course-table__body" role="rowgroup">
        <div
          className="course-table__track"
          style={{
            '--course-scroll-distance': `-${courses.length * 44}px`,
            '--course-scroll-duration': `${Math.max(26, courses.length * 2.8)}s`,
          } as React.CSSProperties}
        >
          {loopedCourses.map((course, index) => (
            <div
              className={`course-table__row${course.rank % 2 === 0 ? ' course-table__row--striped' : ''}`}
              role="row"
              aria-hidden={index >= courses.length ? 'true' : undefined}
              key={`${course.name}-${index}`}
            >
              <span>{course.rank}</span>
              <span>{course.name}</span>
              <strong>
                <span className="course-table__live-value" key={`learners-${course.learners}`}>
                  {course.learners}
                </span>
              </strong>
              <strong>{course.rating}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailTrendChart({ moduleId, trend, accent }: { moduleId: string; trend: DetailModuleData['trend']; accent: string }) {
  const width = 640;
  const height = 190;
  const paddingX = 24;
  const chartTop = 24;
  const chartBottom = 150;
  const maxValue = Math.max(...trend.values);
  const minValue = Math.min(...trend.values) * 0.82;
  const valueRange = Math.max(1, maxValue - minValue);
  const points = trend.values.map((value, index) => {
    const x = paddingX + (index * (width - paddingX * 2)) / (trend.values.length - 1);
    const y = chartBottom - ((value - minValue) / valueRange) * (chartBottom - chartTop);
    return { x, y, value, label: trend.labels[index] };
  });
  const polyline = points.map(({ x, y }) => `${x},${y}`).join(' ');
  const firstPoint = points.length > 0 ? points[0] : { x: paddingX, y: chartBottom };
  const lastPoint = points.length > 0 ? points[points.length - 1] : { x: width - paddingX, y: chartBottom };
  const areaPath = `M ${firstPoint.x} ${chartBottom} L ${polyline.replace(/,/g, ' ')} L ${lastPoint.x} ${chartBottom} Z`;

  return (
    <section className="detail-section detail-trend">
      <div className="detail-section__heading">
        <h3>{trend.title}</h3>
        <span>{trend.unit}</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={trend.title}>
        <defs>
          <linearGradient id={`trend-fill-${moduleId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.34" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[chartTop, 66, 108, chartBottom].map((y) => (
          <line className="detail-trend__grid" x1={paddingX} x2={width - paddingX} y1={y} y2={y} key={y} />
        ))}
        <path className="detail-trend__area" d={areaPath} fill={`url(#trend-fill-${moduleId})`} />
        <polyline className="detail-trend__line" points={polyline} style={{ stroke: accent }} />
        {points.map(({ x, y, value, label }) => (
          <g key={label}>
            <circle className="detail-trend__point-halo" cx={x} cy={y} r="7" style={{ fill: accent }} />
            <circle className="detail-trend__point" cx={x} cy={y} r="3" style={{ fill: accent }} />
            <text className="detail-trend__value" x={x} y={y - 13}>{value}</text>
            <text className="detail-trend__label" x={x} y="180">{label}</text>
          </g>
        ))}
      </svg>
    </section>
  );
}

function DetailDistribution({ distribution }: { distribution: DetailModuleData['distribution'] }) {
  let cursor = 0;
  const gradient = distribution.segments.map(([, value, color]) => {
    const start = cursor;
    cursor += value;
    return `${color} ${start}% ${cursor}%`;
  }).join(', ');

  return (
    <section className="detail-section detail-distribution">
      <div className="detail-section__heading">
        <h3>{distribution.title}</h3>
      </div>
      <div className="detail-distribution__content">
        <div className="detail-donut" style={{ background: `conic-gradient(${gradient})` }}>
          <div className="detail-donut__center">
            <strong>{distribution.centerValue}</strong>
            <span>{distribution.centerLabel}</span>
          </div>
        </div>
        <div className="detail-distribution__legend">
          {distribution.segments.map(([name, value, color]) => (
            <div className="detail-distribution__item" key={name}>
              <i style={{ backgroundColor: color }} />
              <span>{name}</span>
              <strong>{value}%</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailProgress({ progress, accent }: { progress: DetailModuleData['progress']; accent: string }) {
  return (
    <section className="detail-section detail-progress">
      <div className="detail-section__heading">
        <h3>{progress.title}</h3>
        <span>实时进度</span>
      </div>
      <div className="detail-progress__list">
        {progress.rows.map(([label, value], index) => (
          <div className="detail-progress__row" key={label}>
            <div className="detail-progress__copy">
              <span>{label}</span>
              <strong>{value}%</strong>
            </div>
            <div className="detail-progress__track">
              <i
                style={{
                  '--detail-progress': `${value}%`,
                  '--detail-progress-color': index === 4 ? '#ffad2f' : accent,
                  animationDelay: `${260 + index * 90}ms`,
                } as React.CSSProperties}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DetailTable({ table }: { table: DetailModuleData['table'] }) {
  return (
    <section className="detail-table-section">
      <div className="detail-section__heading">
        <h3>{table.title}</h3>
        <span>共 {table.rows.length} 条重点数据</span>
      </div>
      <div className="detail-table" role="table" aria-label={table.title}>
        <div className="detail-table__row detail-table__head" role="row">
          {table.columns.map((column) => <span key={column}>{column}</span>)}
        </div>
        {table.rows.map(({ cells, tone }) => (
          <div className="detail-table__row" role="row" key={cells[0]}>
            {cells.map((cell, index) => (
              <span className={index === cells.length - 1 ? `detail-table__status detail-table__status--${tone}` : ''} key={`${cell}-${index}`}>
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function DetailView({ module, onClose }: { module: DetailModuleData; onClose: () => void }) {
  return (
    <div className="detail-layer" onMouseDown={onClose} role="presentation">
      <article
        className="detail-view"
        key={module.id}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`detail-title-${module.id}`}
        onMouseDown={(event) => event.stopPropagation()}
        style={{ '--detail-accent': module.accent } as React.CSSProperties}
      >
        <header className="detail-view__header">
          <img src={withBase(`/assets/${module.asset}`)} alt="" />
          <div>
            <span>{module.subtitle}</span>
            <h2 id={`detail-title-${module.id}`}>{module.title}</h2>
          </div>
          <div className="detail-view__live"><i />实时监测</div>
          <button className="detail-view__close" type="button" onClick={onClose} aria-label="关闭详情" title="关闭详情">×</button>
        </header>

        <div className="detail-kpis">
          {module.kpis.map(([label, value, unit, change]) => (
            <div className="detail-kpi" key={label}>
              <span>{label}</span>
              <div><strong>{value}</strong><small>{unit}</small></div>
              <em>{change}</em>
            </div>
          ))}
        </div>

        <div className="detail-main-grid">
          <DetailDistribution distribution={module.distribution} />
          <DetailTrendChart moduleId={module.id} trend={module.trend} accent={module.accent} />
          <DetailProgress progress={module.progress} accent={module.accent} />
        </div>

        <DetailTable table={module.table} />
      </article>
    </div>
  );
}

function FloatingBubbles({ items, onSelect }: { items: typeof floatingBubbles; onSelect: (id: string) => void }) {
  return (
    <div className="main-visual__bubbles">
      {items.map(({ id, label, asset, x, y, duration, delay, reverse }) => (
        <button
          className="main-visual__bubble-button"
          type="button"
          aria-label={`查看${label}详情`}
          title={label}
          key={id}
          onClick={() => onSelect(id)}
          style={{
            left: `${x}px`,
            top: `${y}px`,
          }}
        >
          <img
            className={`main-visual__bubble${reverse ? ' main-visual__bubble--reverse' : ''}`}
            src={withBase(`/assets/${asset}`)}
            alt=""
            style={{
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        </button>
      ))}
    </div>
  );
}

function VisualLabels({ items }: { items: typeof visualLabels }) {
  return (
    <div className="main-visual__labels" aria-hidden="true">
      {items.map(({ label, asset, x, y }) => (
        <img
          className="main-visual__label"
          src={withBase(`/assets/${asset}`)}
          alt=""
          key={label}
          style={{ left: `${x}px`, top: `${y}px` }}
        />
      ))}
    </div>
  );
}

function CenterLighting() {
  return (
    <div className="main-visual__lighting" aria-hidden="true">
      <span className="main-visual__light main-visual__light--shine" />
      <span className="main-visual__light main-visual__light--shade" />
    </div>
  );
}

function CenterCore() {
  return (
    <div className="main-visual__center-core" aria-hidden="true">
      <img className="main-visual__center-layer main-visual__center-layer--base" src={withBase('/assets/center-orb-base.svg')} alt="" />
      <img className="main-visual__center-layer main-visual__center-layer--mask" src={withBase('/assets/center-orb-mask.svg')} alt="" />
      <img className="main-visual__center-layer main-visual__center-layer--glass" src={withBase('/assets/center-orb-glass.svg')} alt="" />
      <img className="main-visual__center-layer main-visual__center-layer--shine-top" src={withBase('/assets/center-orb-shine-top.svg')} alt="" />
      <img className="main-visual__center-layer main-visual__center-layer--shine-bottom" src={withBase('/assets/center-orb-shine-bottom.svg')} alt="" />
      <div className="main-visual__center-title">
        <span>产教一体</span>
        <span>产才融合</span>
      </div>
    </div>
  );
}

function OrbitalParticles({ items }: { items: typeof orbitalParticles }) {
  return (
    <div className="main-visual__particles" aria-hidden="true">
      {items.map(({ id, asset, x, y, width, height, radius, duration, delay, reverse }) => {
        const diagonal = Number((radius * Math.SQRT1_2).toFixed(2));

        return (
          <img
            className={`main-visual__particle${reverse ? ' main-visual__particle--reverse' : ''}`}
            src={withBase(`/assets/${asset}`)}
            alt=""
            key={id}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              width: `${width}px`,
              height: `${height}px`,
              '--particle-radius': `${radius}px`,
              '--particle-radius-negative': `${-radius}px`,
              '--particle-diagonal': `${diagonal}px`,
              '--particle-diagonal-negative': `${-diagonal}px`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}

function CertificatePanel() {
  return (
    <div className="certificate-panel">
      <div className="certificate-visual" aria-hidden="true">
        <div className="certificate-visual__ring" />
        <img src={withBase("/assets/certificate.png")} alt="" />
      </div>
      <div className="certificate-list">
        {certificates.map(([name, value]) => (
          <div className="certificate-row" key={name}>
            <span>{name}</span>
            <strong>{value}</strong>
            <small>份</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function IndustryPanel() {
  return (
    <div className="industry-panel">
      <div className="industry-donut">
        <img src={withBase("/assets/industry-ring.svg")} alt="就业行业占比环形图" />
        <div className="industry-donut__center">
          <strong>8类</strong>
          <span>覆盖行业</span>
        </div>
      </div>
      <div className="industry-legend">
        {industryItems.map(([name, value, color]) => (
          <div className="industry-item" key={name}>
            <i style={{ backgroundColor: color }} />
            <span>{name}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardBackground() {
  return <div className="dashboard-bg" aria-hidden="true" />;
}

function RightPanel({ courses }: { courses: typeof initialCourses }) {
  return (
    <aside className="right-panel dashboard-panel">
      <section className="courses-block">
        <SectionTitle asset="title-courses.png">热门课程Top10</SectionTitle>
        <CourseTable courses={courses} />
      </section>

      <section className="certificates-block">
        <SectionTitle asset="title-certificates.png">技能证书分类</SectionTitle>
        <CertificatePanel />
      </section>

      <section className="industry-block">
        <SectionTitle asset="title-industry.png">就业行业分布</SectionTitle>
        <IndustryPanel />
      </section>
    </aside>
  );
}

function DashboardFrame({ logicalWidth, logicalHeight }: { logicalWidth: number; logicalHeight: number }) {
  const { metrics, courses, refreshKey } = useLiveDashboardData();
  const [activeDetailId, setActiveDetailId] = useState<string | null>(null);
  const activeDetail = activeDetailId ? detailModules[activeDetailId] : null;
  const contentOffsetY = Math.max(0, (logicalHeight - BASE_HEIGHT) / 2);

  useEffect(() => {
    if (!activeDetailId) return undefined;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveDetailId(null);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [activeDetailId]);

  return (
    <main
      className="dashboard-canvas"
      style={{
        '--canvas-width': `${logicalWidth}px`,
        '--canvas-height': `${logicalHeight}px`,
        '--content-offset-y': `${contentOffsetY}px`,
      } as React.CSSProperties}
    >
      <DashboardBackground />
      <div className="dashboard-content">
        <DashboardChrome
          type="header"
          src="/assets/header.png"
          alt="模数师数字平台驾驶舱"
        />
        <img className="dashboard-side dashboard-side--left" src={withBase("/assets/side-left.svg")} alt="" />
        <img className="dashboard-side dashboard-side--right" src={withBase("/assets/side-right.svg")} alt="" />
        <DashboardChrome type="footer" src="/assets/footer.svg" alt="" withSweep />

        <div className="main-visual" aria-label="产教一体、产才融合四象限态势">
          <img
            className="main-visual__base"
            src={withBase("/assets/main-center-background.png")}
            alt="产教一体、产才融合中央圆环"
          />
          <CenterLighting />
          <CenterCore />
          <VisualLabels items={visualLabels} />
          <FloatingBubbles items={floatingBubbles} onSelect={setActiveDetailId} />
          <OrbitalParticles items={orbitalParticles} />
        </div>

        <LeftPanel metrics={metrics} refreshKey={refreshKey} />
        <RightPanel courses={courses} />
        {activeDetail && <DetailView module={activeDetail} onClose={() => setActiveDetailId(null)} />}
      </div>
    </main>
  );
}

export default function ModushuCockpitPage() {
  const { scale, logicalWidth, logicalHeight } = useDashboardViewport();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="dashboard-viewport">
      {/* Floating Control Toolbar */}
      <div className="fixed top-3 left-4 z-[9999] flex items-center gap-2">
        <Link
          to="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-cyan-950/70 text-xs transition-all shadow-lg shadow-cyan-950/50 group"
          title="返回平台首页"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>返回首页</span>
        </Link>
      </div>

      <div className="fixed top-3 right-4 z-[9999] flex items-center gap-2">
        <button
          type="button"
          onClick={toggleFullscreen}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-cyan-950/70 text-xs transition-all shadow-lg shadow-cyan-950/50"
          title={isFullscreen ? "退出全屏" : "全屏展示"}
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          <span>{isFullscreen ? "退出全屏" : "全屏展示"}</span>
        </button>
      </div>

      <div className="dashboard-stage">
        <div
          className="dashboard-scale"
          style={{
            width: logicalWidth,
            height: logicalHeight,
            transform: `scale(${scale})`,
          }}
        >
          <DashboardFrame logicalWidth={logicalWidth} logicalHeight={logicalHeight} />
        </div>
      </div>
    </div>
  );
}
