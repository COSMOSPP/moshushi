export interface FilterState {
  dimension: string;
  term: string;
  classId: string;
  courseId: string;
}

export interface MetricData {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  trend: number; // positive for up, negative for down
  trendIsPercent?: boolean; // whether to show % after trend
  icon: string;
  color: string;
  detailHeaders?: string[];
  detailData?: Record<string, any>[];
}

export interface ChartData {
  name: string;
  [key: string]: any;
}

export interface ClassRow {
  id: number;
  className: string;
  courseName: string;
  count: number;
  attendance: number;
  completion: number;
  passRate: number;
  eval: number;
  instructor?: string;
  status?: string;
  campus?: string;
  alertReason?: string;
}
