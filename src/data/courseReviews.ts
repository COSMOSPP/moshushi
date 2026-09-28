export type CourseReviewStatus = "published" | "pending" | "hidden";

export interface CourseReviewDimensions {
  content: number;
  practical: number;
  difficulty: number;
  teaching: number;
}

export interface CourseReview {
  id: string;
  courseId: string;
  courseName: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  anonymous: boolean;
  completed: boolean;
  rating: number;
  dimensions: CourseReviewDimensions;
  tags: string[];
  content: string;
  createdAt: string;
  updatedAt?: string;
  helpful: number;
  teacherReply?: {
    content: string;
    teacherName: string;
    createdAt: string;
  };
  status: CourseReviewStatus;
}

export interface CourseReviewSummary {
  average: number;
  total: number;
  positiveRate: number;
  participationRate: number;
  repliedRate: number;
  distribution: Array<{ rating: number; count: number; percent: number }>;
}

export const COURSE_REVIEW_STORAGE_KEY = "xuanwu_course_reviews";
export const COURSE_REVIEW_EVENT = "course-review-updated";
export const CURRENT_STUDENT_ID = "student-current";

export const COURSE_REVIEW_TAGS = [
  "内容扎实",
  "案例丰富",
  "通俗易懂",
  "实践性强",
  "讲解清晰",
  "难度合理",
  "难度偏高",
  "内容需更新",
];

const INITIAL_COURSE_REVIEWS: CourseReview[] = [
  {
    id: "review-001",
    courseId: "python-basic",
    courseName: "Python 基础",
    studentId: "student-001",
    studentName: "李明",
    studentAvatar: "李",
    anonymous: false,
    completed: true,
    rating: 5,
    dimensions: { content: 5, practical: 5, difficulty: 4, teaching: 5 },
    tags: ["内容扎实", "实践性强", "讲解清晰"],
    content: "课程从语法基础到数据处理循序渐进，每章都有可操作的实验。完成后能够独立处理真实数据，对我的项目帮助很大。",
    createdAt: "2026-09-26 15:20",
    helpful: 36,
    teacherReply: {
      content: "感谢认真的反馈。后续课程会增加更多企业数据清洗案例，也欢迎继续参与进阶实训。",
      teacherName: "张老师",
      createdAt: "2026-09-27 09:12",
    },
    status: "published",
  },
  {
    id: "review-002",
    courseId: "python-basic",
    courseName: "Python 基础",
    studentId: "student-002",
    studentName: "匿名学员",
    studentAvatar: "学",
    anonymous: true,
    completed: true,
    rating: 4,
    dimensions: { content: 4, practical: 4, difficulty: 3, teaching: 5 },
    tags: ["通俗易懂", "案例丰富", "难度合理"],
    content: "讲解比较清晰，对初学者友好。如果能在文件处理章节再增加一个完整项目会更好。",
    createdAt: "2026-09-24 18:35",
    helpful: 21,
    status: "published",
  },
  {
    id: "review-003",
    courseId: "python-basic",
    courseName: "Python 基础",
    studentId: "student-003",
    studentName: "陈雨桐",
    studentAvatar: "陈",
    anonymous: false,
    completed: true,
    rating: 5,
    dimensions: { content: 5, practical: 4, difficulty: 5, teaching: 5 },
    tags: ["内容扎实", "通俗易懂"],
    content: "课节时长合理，作业可以很快验证是否真正掌握。建议保留现在的学习节奏。",
    createdAt: "2026-09-21 11:08",
    helpful: 15,
    status: "published",
  },
  {
    id: "review-004",
    courseId: "python-basic",
    courseName: "Python 基础",
    studentId: "student-004",
    studentName: "周子轩",
    studentAvatar: "周",
    anonymous: false,
    completed: true,
    rating: 3,
    dimensions: { content: 4, practical: 3, difficulty: 3, teaching: 4 },
    tags: ["内容需更新", "难度偏高"],
    content: "基础部分很完整，但数据分析实验里的部分依赖版本与课件不一致，希望后续更新环境说明。",
    createdAt: "2026-09-18 20:42",
    helpful: 12,
    status: "published",
  },
];

export function getCourseReviews(courseId = "python-basic") {
  if (typeof window === "undefined") return INITIAL_COURSE_REVIEWS.filter((item) => item.courseId === courseId);
  const saved = window.localStorage.getItem(COURSE_REVIEW_STORAGE_KEY);
  if (!saved) return INITIAL_COURSE_REVIEWS.filter((item) => item.courseId === courseId);
  try {
    const parsed = JSON.parse(saved) as CourseReview[];
    return parsed.filter((item) => item.courseId === courseId);
  } catch {
    return INITIAL_COURSE_REVIEWS.filter((item) => item.courseId === courseId);
  }
}

export function saveCourseReviews(reviews: CourseReview[]) {
  if (typeof window === "undefined") return;
  const saved = window.localStorage.getItem(COURSE_REVIEW_STORAGE_KEY);
  let allReviews = INITIAL_COURSE_REVIEWS;
  if (saved) {
    try {
      allReviews = JSON.parse(saved) as CourseReview[];
    } catch {
      allReviews = INITIAL_COURSE_REVIEWS;
    }
  }
  const courseId = reviews[0]?.courseId ?? "python-basic";
  const next = [...allReviews.filter((item) => item.courseId !== courseId), ...reviews];
  window.localStorage.setItem(COURSE_REVIEW_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(COURSE_REVIEW_EVENT));
}

export function getCourseReviewSummary(reviews = getCourseReviews()): CourseReviewSummary {
  const visible = reviews.filter((item) => item.status === "published");
  const baseDistribution = { 5: 227, 4: 68, 3: 22, 2: 6, 1: 3 };
  visible.forEach((review) => {
    baseDistribution[review.rating as keyof typeof baseDistribution] += 1;
  });
  const total = Object.values(baseDistribution).reduce((sum, value) => sum + value, 0);
  const weighted = Object.entries(baseDistribution).reduce((sum, [rating, count]) => sum + Number(rating) * count, 0);
  const replied = visible.filter((item) => item.teacherReply).length;
  return {
    average: Number((weighted / total).toFixed(1)),
    total,
    positiveRate: Math.round(((baseDistribution[5] + baseDistribution[4]) / total) * 100),
    participationRate: 72,
    repliedRate: visible.length ? Math.round((replied / visible.length) * 100) : 0,
    distribution: [5, 4, 3, 2, 1].map((rating) => ({
      rating,
      count: baseDistribution[rating as keyof typeof baseDistribution],
      percent: Math.round((baseDistribution[rating as keyof typeof baseDistribution] / total) * 100),
    })),
  };
}
