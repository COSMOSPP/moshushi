import { useEffect, useMemo, useState } from "react";
import { BadgeCheck, CheckCircle2, ChevronDown, MessageSquareText, Star, ThumbsUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  COURSE_REVIEW_EVENT,
  COURSE_REVIEW_TAGS,
  CURRENT_STUDENT_ID,
  getCourseReviews,
  getCourseReviewSummary,
  saveCourseReviews,
  type CourseReview,
  type CourseReviewDimensions,
} from "@/data/courseReviews";

interface StudentCourseReviewsProps {
  courseId?: string;
  courseName?: string;
  canReview?: boolean;
  initialOpen?: boolean;
}

const emptyDimensions: CourseReviewDimensions = {
  content: 0,
  practical: 0,
  difficulty: 0,
  teaching: 0,
};

const dimensionLabels: Array<{ key: keyof CourseReviewDimensions; label: string }> = [
  { key: "content", label: "内容质量" },
  { key: "practical", label: "实用程度" },
  { key: "difficulty", label: "难度合理性" },
  { key: "teaching", label: "教学体验" },
];

function RatingStars({ value, onChange, size = "md" }: { value: number; onChange?: (rating: number) => void; size?: "sm" | "md" | "lg" }) {
  const iconSize = size === "lg" ? "h-7 w-7" : size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} 星`}>
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(rating)}
          className={cn("rounded-[4px] p-0.5", onChange && "hover:bg-amber-50")}
          aria-label={`${rating} 星`}
        >
          <Star className={cn(iconSize, rating <= value ? "fill-amber-400 text-amber-400" : "text-neutral-200")} />
        </button>
      ))}
    </div>
  );
}

export default function StudentCourseReviews({
  courseId = "python-basic",
  courseName = "Python 基础",
  canReview = true,
  initialOpen = false,
}: StudentCourseReviewsProps) {
  const [reviews, setReviews] = useState(() => getCourseReviews(courseId));
  const [sortBy, setSortBy] = useState("latest");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [reviewOpen, setReviewOpen] = useState(initialOpen);
  const [toast, setToast] = useState("");
  const [helpfulIds, setHelpfulIds] = useState<string[]>([]);
  const currentReview = reviews.find((item) => item.studentId === CURRENT_STUDENT_ID);
  const [rating, setRating] = useState(currentReview?.rating ?? 0);
  const [dimensions, setDimensions] = useState<CourseReviewDimensions>(currentReview?.dimensions ?? emptyDimensions);
  const [tags, setTags] = useState<string[]>(currentReview?.tags ?? []);
  const [content, setContent] = useState(currentReview?.content ?? "");
  const [anonymous, setAnonymous] = useState(currentReview?.anonymous ?? false);

  useEffect(() => {
    const sync = () => setReviews(getCourseReviews(courseId));
    window.addEventListener(COURSE_REVIEW_EVENT, sync);
    return () => window.removeEventListener(COURSE_REVIEW_EVENT, sync);
  }, [courseId]);

  useEffect(() => {
    if (!initialOpen) return;
    setReviewOpen(true);
  }, [initialOpen]);

  const summary = useMemo(() => getCourseReviewSummary(reviews), [reviews]);
  const visibleReviews = useMemo(() => {
    const filtered = reviews.filter((item) => item.status === "published" && (ratingFilter === "all" || item.rating === Number(ratingFilter)));
    return [...filtered].sort((a, b) => {
      if (sortBy === "helpful") return b.helpful - a.helpful;
      if (sortBy === "highest") return b.rating - a.rating;
      if (sortBy === "lowest") return a.rating - b.rating;
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [ratingFilter, reviews, sortBy]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };

  const openEditor = () => {
    setRating(currentReview?.rating ?? 0);
    setDimensions(currentReview?.dimensions ?? emptyDimensions);
    setTags(currentReview?.tags ?? []);
    setContent(currentReview?.content ?? "");
    setAnonymous(currentReview?.anonymous ?? false);
    setReviewOpen(true);
  };

  const submitReview = () => {
    if (!rating || Object.values(dimensions).some((value) => !value)) {
      showToast("请完成所有评分项");
      return;
    }
    if (content.trim().length < 20) {
      showToast("文字评价至少需要 20 个字");
      return;
    }
    const now = new Date().toLocaleString("zh-CN", { hour12: false }).replaceAll("/", "-");
    const nextReview: CourseReview = {
      id: currentReview?.id ?? `review-${Date.now()}`,
      courseId,
      courseName,
      studentId: CURRENT_STUDENT_ID,
      studentName: anonymous ? "匿名学员" : "张同学",
      studentAvatar: anonymous ? "学" : "张",
      anonymous,
      completed: true,
      rating,
      dimensions,
      tags,
      content: content.trim(),
      createdAt: currentReview?.createdAt ?? now,
      updatedAt: currentReview ? now : undefined,
      helpful: currentReview?.helpful ?? 0,
      teacherReply: currentReview?.teacherReply,
      status: "published",
    };
    const next = currentReview
      ? reviews.map((item) => item.id === currentReview.id ? nextReview : item)
      : [nextReview, ...reviews];
    setReviews(next);
    saveCourseReviews(next);
    setReviewOpen(false);
    showToast(currentReview ? "评价已更新" : "评价已发布，感谢你的真实反馈");
  };

  const markHelpful = (review: CourseReview) => {
    if (helpfulIds.includes(review.id)) return;
    const next = reviews.map((item) => item.id === review.id ? { ...item, helpful: item.helpful + 1 } : item);
    setReviews(next);
    setHelpfulIds((items) => [...items, review.id]);
    saveCourseReviews(next);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {toast && (
        <div className="fixed right-6 top-20 z-[420] rounded-[6px] bg-neutral-900 px-4 py-2.5 text-sm text-white shadow-xl">{toast}</div>
      )}

      <section className="rounded-[8px] border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex min-w-[180px] flex-col items-center justify-center border-b border-neutral-100 pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
            <div className="text-5xl font-bold text-neutral-900">{summary.average}</div>
            <RatingStars value={Math.round(summary.average)} />
            <div className="mt-2 text-xs text-neutral-500">{summary.total} 位学员已评价</div>
          </div>
          <div className="flex-1 space-y-2">
            {summary.distribution.map((item) => (
              <button key={item.rating} onClick={() => setRatingFilter(String(item.rating))} className="flex w-full items-center gap-3 rounded-[4px] px-2 py-1 hover:bg-neutral-50">
                <span className="w-9 text-xs text-neutral-600">{item.rating} 星</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
                  <span className="block h-full rounded-full bg-amber-400" style={{ width: `${item.percent}%` }} />
                </span>
                <span className="w-10 text-right text-xs text-neutral-400">{item.percent}%</span>
              </button>
            ))}
          </div>
          <div className="min-w-[240px] rounded-[6px] bg-blue-50 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-900">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              {currentReview ? "你已完成本课程评价" : "你已获得评价资格"}
            </div>
            <p className="mt-2 text-xs leading-5 text-blue-700">{currentReview ? "可以随时修改评分和学习感受。" : "课程已完成，分享你的真实学习体验。"}</p>
            <Button onClick={openEditor} disabled={!canReview} className="mt-4 h-9 w-full rounded-[4px] bg-blue-600 text-white hover:bg-blue-700">
              {currentReview ? "修改评价" : "发表评价"}
            </Button>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-5">
          <span className="mr-1 text-xs text-neutral-500">学员高频印象</span>
          {["内容扎实 128", "实践性强 96", "通俗易懂 82", "案例丰富 65"].map((tag) => (
            <span key={tag} className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs text-blue-700">{tag}</span>
          ))}
        </div>
      </section>

      <section className="rounded-[8px] border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-neutral-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-bold text-neutral-900">学员评价</h2>
            <p className="mt-1 text-xs text-neutral-500">所有公开评价均来自已完成课程的学员</p>
          </div>
          <div className="flex gap-2">
            {ratingFilter !== "all" && <button onClick={() => setRatingFilter("all")} className="rounded-[4px] border border-blue-200 px-3 py-1.5 text-xs text-blue-600">清除 {ratingFilter} 星筛选</button>}
            <div className="relative">
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="h-8 appearance-none rounded-[4px] border border-neutral-200 bg-white pl-3 pr-8 text-xs text-neutral-600 outline-none focus:border-blue-400">
                <option value="latest">最新发布</option>
                <option value="helpful">最有帮助</option>
                <option value="highest">评分最高</option>
                <option value="lowest">评分最低</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-2 h-4 w-4 text-neutral-400" />
            </div>
          </div>
        </div>
        <div className="divide-y divide-neutral-100 px-6">
          {visibleReviews.map((review) => (
            <article key={review.id} className="py-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">{review.studentAvatar}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-neutral-900">{review.anonymous ? "匿名学员" : review.studentName}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700"><BadgeCheck className="h-3 w-3" />已完成课程</span>
                    {review.studentId === CURRENT_STUDENT_ID && <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] text-blue-600">我的评价</span>}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-3">
                    <RatingStars value={review.rating} size="sm" />
                    <span className="text-xs text-neutral-400">{review.updatedAt ? `更新于 ${review.updatedAt}` : review.createdAt}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">{review.content}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {review.tags.map((tag) => <span key={tag} className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] text-neutral-600">{tag}</span>)}
                  </div>
                  {review.teacherReply && (
                    <div className="mt-4 rounded-[6px] border-l-2 border-blue-500 bg-blue-50/70 px-4 py-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-blue-800"><MessageSquareText className="h-3.5 w-3.5" />{review.teacherReply.teacherName} 回复</div>
                      <p className="mt-1.5 text-xs leading-5 text-blue-900/80">{review.teacherReply.content}</p>
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <button onClick={() => markHelpful(review)} className={cn("inline-flex items-center gap-1.5 text-xs", helpfulIds.includes(review.id) ? "text-blue-600" : "text-neutral-500 hover:text-blue-600")}>
                      <ThumbsUp className={cn("h-3.5 w-3.5", helpfulIds.includes(review.id) && "fill-blue-100")} />有帮助 {review.helpful}
                    </button>
                    {review.studentId === CURRENT_STUDENT_ID && <button onClick={openEditor} className="text-xs text-blue-600 hover:text-blue-700">修改评价</button>}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {reviewOpen && (
        <div className="fixed inset-0 z-[410] flex items-center justify-center bg-neutral-950/55 p-4 backdrop-blur-sm" role="presentation" onClick={() => setReviewOpen(false)}>
          <div className="flex max-h-[calc(100vh-2rem)] w-full max-w-[680px] flex-col overflow-hidden rounded-[8px] bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="course-review-title" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between border-b border-neutral-100 px-6 py-5">
              <div>
                <h2 id="course-review-title" className="text-lg font-bold text-neutral-900">{currentReview ? "修改课程评价" : "发表课程评价"}</h2>
                <p className="mt-1 text-xs text-neutral-500">{courseName} · 仅已完成课程的学员可发表</p>
              </div>
              <button title="关闭" onClick={() => setReviewOpen(false)} className="rounded-[4px] p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"><X className="h-5 w-5" /></button>
            </div>
            <div className="overflow-y-auto px-6 py-5">
              <div className="flex flex-col items-center rounded-[6px] bg-amber-50 px-4 py-5">
                <span className="text-sm font-semibold text-neutral-800">这门课程总体如何？</span>
                <div className="mt-2"><RatingStars value={rating} onChange={setRating} size="lg" /></div>
                <span className="mt-2 text-xs text-amber-700">{["请评分", "很不满意", "需要改进", "基本满意", "比较推荐", "非常推荐"][rating]}</span>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {dimensionLabels.map((item) => (
                  <div key={item.key} className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-3">
                    <span className="text-sm text-neutral-700">{item.label}</span>
                    <RatingStars value={dimensions[item.key]} onChange={(value) => setDimensions((current) => ({ ...current, [item.key]: value }))} size="sm" />
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <label className="text-sm font-semibold text-neutral-800">选择印象标签 <span className="font-normal text-neutral-400">最多 3 个</span></label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {COURSE_REVIEW_TAGS.map((tag) => (
                    <button key={tag} type="button" onClick={() => setTags((current) => current.includes(tag) ? current.filter((item) => item !== tag) : current.length < 3 ? [...current, tag] : current)} className={cn("rounded-full border px-3 py-1.5 text-xs", tags.includes(tag) ? "border-blue-500 bg-blue-50 text-blue-700" : "border-neutral-200 text-neutral-600 hover:border-blue-300")}>{tag}</button>
                  ))}
                </div>
              </div>
              <div className="mt-5">
                <div className="flex items-center justify-between"><label className="text-sm font-semibold text-neutral-800">说说你的学习体验</label><span className={cn("text-xs", content.length > 500 ? "text-red-500" : "text-neutral-400")}>{content.length}/500</span></div>
                <Textarea value={content} onChange={(event) => setContent(event.target.value.slice(0, 500))} placeholder="可以从内容、案例、难度和实践收获等方面分享，至少 20 个字" className="mt-2 min-h-[110px] resize-none rounded-[4px] border-neutral-200 text-sm" />
              </div>
              <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-[6px] bg-neutral-50 px-4 py-3">
                <input type="checkbox" checked={anonymous} onChange={(event) => setAnonymous(event.target.checked)} className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-blue-600" />
                <span><span className="block text-sm font-medium text-neutral-700">匿名发表</span><span className="mt-0.5 block text-xs text-neutral-400">其他学员不会看到姓名，课程教师仍可用于学习跟进。</span></span>
              </label>
            </div>
            <div className="flex items-center justify-between border-t border-neutral-100 bg-neutral-50 px-6 py-4">
              <span className="text-xs text-neutral-400">评价将用于帮助其他学员和改进课程</span>
              <div className="flex gap-3"><Button variant="outline" onClick={() => setReviewOpen(false)} className="h-9 rounded-[4px]">取消</Button><Button onClick={submitReview} className="h-9 rounded-[4px] bg-blue-600 text-white hover:bg-blue-700">发布评价</Button></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
