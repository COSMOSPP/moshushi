import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, BadgeCheck, CheckCircle2, MessageSquareReply, Search, Star, TrendingUp, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  COURSE_REVIEW_EVENT,
  getCourseReviews,
  getCourseReviewSummary,
  saveCourseReviews,
  type CourseReview,
} from "@/data/courseReviews";

interface TeacherCourseReviewsProps {
  courseId?: string;
}

const dimensionLabels = {
  content: "内容质量",
  practical: "实用程度",
  difficulty: "难度合理性",
  teaching: "教学体验",
};

export default function TeacherCourseReviews({ courseId = "python-basic" }: TeacherCourseReviewsProps) {
  const [reviews, setReviews] = useState(() => getCourseReviews(courseId));
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("all");
  const [replyStatus, setReplyStatus] = useState("all");
  const [selected, setSelected] = useState<CourseReview | null>(null);
  const [reply, setReply] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    const sync = () => setReviews(getCourseReviews(courseId));
    window.addEventListener(COURSE_REVIEW_EVENT, sync);
    return () => window.removeEventListener(COURSE_REVIEW_EVENT, sync);
  }, [courseId]);

  const summary = useMemo(() => getCourseReviewSummary(reviews), [reviews]);
  const dimensionAverages = useMemo(() => {
    if (!reviews.length) return { content: 0, practical: 0, difficulty: 0, teaching: 0 };
    return (Object.keys(dimensionLabels) as Array<keyof typeof dimensionLabels>).reduce((result, key) => ({
      ...result,
      [key]: Number((reviews.reduce((sum, item) => sum + item.dimensions[key], 0) / reviews.length).toFixed(1)),
    }), {} as Record<keyof typeof dimensionLabels, number>);
  }, [reviews]);

  const visibleReviews = useMemo(() => reviews.filter((item) => {
    const keyword = search.trim().toLowerCase();
    const matchesSearch = !keyword || [item.studentName, item.content, ...item.tags].some((value) => value.toLowerCase().includes(keyword));
    const matchesRating = rating === "all" || item.rating === Number(rating);
    const matchesReply = replyStatus === "all" || (replyStatus === "replied" ? Boolean(item.teacherReply) : !item.teacherReply);
    return matchesSearch && matchesRating && matchesReply;
  }), [rating, replyStatus, reviews, search]);

  const lowScoreCount = reviews.filter((item) => item.rating <= 3).length;
  const pendingReplyCount = reviews.filter((item) => !item.teacherReply).length;

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const openReply = (review: CourseReview) => {
    setSelected(review);
    setReply(review.teacherReply?.content ?? "");
  };

  const submitReply = () => {
    if (!selected || reply.trim().length < 5) {
      showToast("请输入至少 5 个字的回复内容");
      return;
    }
    const next = reviews.map((item) => item.id === selected.id ? {
      ...item,
      teacherReply: {
        content: reply.trim(),
        teacherName: "张老师",
        createdAt: new Date().toLocaleString("zh-CN", { hour12: false }).replaceAll("/", "-"),
      },
    } : item);
    setReviews(next);
    saveCourseReviews(next);
    setSelected(null);
    showToast("教师回复已发布");
  };

  return (
    <div className="min-h-[650px] bg-[#f5f7fa] p-5 lg:p-7">
      {toast && <div className="fixed right-6 top-20 z-[420] rounded-[6px] bg-neutral-900 px-4 py-2.5 text-sm text-white shadow-xl">{toast}</div>}

      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">课程评价</h2>
          <p className="mt-1 text-sm text-neutral-500">查看已完成课程学员的真实反馈，跟踪课程质量并回复学员。</p>
        </div>
        <div className="flex items-center gap-2 rounded-[4px] border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          <AlertTriangle className="h-4 w-4" />{lowScoreCount} 条低分反馈需关注 · {pendingReplyCount} 条待回复
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
        {[
          { label: "综合评分", value: summary.average, suffix: "/ 5.0", icon: Star, tone: "bg-amber-50 text-amber-600" },
          { label: "评价总数", value: summary.total, suffix: "条", icon: Users, tone: "bg-blue-50 text-blue-600" },
          { label: "好评率", value: summary.positiveRate, suffix: "%", icon: TrendingUp, tone: "bg-emerald-50 text-emerald-600" },
          { label: "评价参与率", value: summary.participationRate, suffix: "%", icon: CheckCircle2, tone: "bg-violet-50 text-violet-600" },
          { label: "教师回复率", value: summary.repliedRate, suffix: "%", icon: MessageSquareReply, tone: "bg-cyan-50 text-cyan-600" },
        ].map((item) => (
          <div key={item.label} className="rounded-[6px] border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">{item.label}</span>
              <span className={cn("rounded-[4px] p-2", item.tone)}><item.icon className="h-4 w-4" /></span>
            </div>
            <div className="mt-3 text-2xl font-bold text-neutral-900">{item.value}<span className="ml-1 text-xs font-normal text-neutral-400">{item.suffix}</span></div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_1fr]">
        <section className="rounded-[6px] border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between"><h3 className="text-sm font-semibold text-neutral-900">各维度评分</h3><span className="text-xs text-neutral-400">近 30 天</span></div>
          <div className="mt-5 space-y-4">
            {(Object.keys(dimensionLabels) as Array<keyof typeof dimensionLabels>).map((key) => (
              <div key={key}>
                <div className="mb-1.5 flex items-center justify-between text-xs"><span className="text-neutral-600">{dimensionLabels[key]}</span><span className="font-semibold text-neutral-900">{dimensionAverages[key]}</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-neutral-100"><div className="h-full rounded-full bg-blue-500" style={{ width: `${dimensionAverages[key] * 20}%` }} /></div>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-[6px] border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between"><h3 className="text-sm font-semibold text-neutral-900">评分分布</h3><span className="text-xs text-emerald-600">好评率 {summary.positiveRate}%</span></div>
          <div className="mt-5 space-y-3">
            {summary.distribution.map((item) => (
              <div key={item.rating} className="flex items-center gap-3"><span className="w-8 text-xs text-neutral-500">{item.rating} 星</span><div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100"><div className="h-full rounded-full bg-amber-400" style={{ width: `${item.percent}%` }} /></div><span className="w-10 text-right text-xs text-neutral-400">{item.percent}%</span></div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-5 rounded-[6px] border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-neutral-100 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:w-72"><Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="搜索学员、评价或标签" className="h-9 rounded-[4px] border-neutral-200 pl-9 text-sm" /></div>
          <div className="flex gap-2">
            <select value={rating} onChange={(event) => setRating(event.target.value)} className="h-9 rounded-[4px] border border-neutral-200 bg-white px-3 text-xs text-neutral-600"><option value="all">全部评分</option>{[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} 星</option>)}</select>
            <select value={replyStatus} onChange={(event) => setReplyStatus(event.target.value)} className="h-9 rounded-[4px] border border-neutral-200 bg-white px-3 text-xs text-neutral-600"><option value="all">全部回复状态</option><option value="pending">待回复</option><option value="replied">已回复</option></select>
          </div>
        </div>
        <div className="divide-y divide-neutral-100">
          {visibleReviews.map((review) => (
            <article key={review.id} className={cn("p-5", review.rating <= 3 && "bg-amber-50/30")}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">{review.anonymous ? "学" : review.studentAvatar}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2"><span className="text-sm font-semibold text-neutral-900">{review.anonymous ? "匿名学员" : review.studentName}</span><span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700"><BadgeCheck className="h-3 w-3" />已完成课程</span>{review.rating <= 3 && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] text-amber-800">需关注</span>}</div>
                  <div className="mt-1 flex items-center gap-3"><div className="flex">{[1, 2, 3, 4, 5].map((value) => <Star key={value} className={cn("h-3.5 w-3.5", value <= review.rating ? "fill-amber-400 text-amber-400" : "text-neutral-200")} />)}</div><span className="text-xs text-neutral-400">{review.createdAt}</span></div>
                  <p className="mt-3 text-sm leading-6 text-neutral-700">{review.content}</p>
                  <div className="mt-3 flex flex-wrap gap-2">{review.tags.map((tag) => <span key={tag} className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] text-neutral-600">{tag}</span>)}</div>
                  {review.teacherReply && <div className="mt-4 rounded-[4px] border-l-2 border-blue-500 bg-blue-50 px-4 py-3"><div className="text-xs font-semibold text-blue-800">张老师 · {review.teacherReply.createdAt}</div><p className="mt-1 text-xs leading-5 text-blue-900/80">{review.teacherReply.content}</p></div>}
                </div>
                <Button variant="outline" onClick={() => openReply(review)} className="h-8 shrink-0 rounded-[4px] border-neutral-200 text-xs text-neutral-600"><MessageSquareReply className="mr-1.5 h-3.5 w-3.5" />{review.teacherReply ? "修改回复" : "回复"}</Button>
              </div>
            </article>
          ))}
          {!visibleReviews.length && <div className="p-12 text-center text-sm text-neutral-400">没有符合筛选条件的评价</div>}
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-[410] flex items-center justify-center bg-neutral-950/50 p-4" role="presentation" onClick={() => setSelected(null)}>
          <div className="w-full max-w-[560px] rounded-[8px] bg-white shadow-2xl" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between border-b border-neutral-100 px-5 py-4"><div><h3 className="font-bold text-neutral-900">回复学员评价</h3><p className="mt-1 text-xs text-neutral-500">{selected.anonymous ? "匿名学员" : selected.studentName} · {selected.rating} 星评价</p></div><button title="关闭" onClick={() => setSelected(null)} className="rounded-[4px] p-1.5 text-neutral-400 hover:bg-neutral-100"><X className="h-5 w-5" /></button></div>
            <div className="p-5"><div className="rounded-[4px] bg-neutral-50 p-4 text-sm leading-6 text-neutral-600">{selected.content}</div><label className="mt-5 block text-sm font-semibold text-neutral-800">教师回复</label><Textarea value={reply} onChange={(event) => setReply(event.target.value)} placeholder="回应学员反馈，说明改进计划或提供学习建议" className="mt-2 min-h-[120px] resize-none rounded-[4px]" /><p className="mt-2 text-xs text-neutral-400">回复将公开展示在课程评价中，并通知学员。</p></div>
            <div className="flex justify-end gap-3 border-t border-neutral-100 bg-neutral-50 px-5 py-4"><Button variant="outline" onClick={() => setSelected(null)} className="h-9 rounded-[4px]">取消</Button><Button onClick={submitReply} className="h-9 rounded-[4px] bg-blue-600 text-white hover:bg-blue-700">发布回复</Button></div>
          </div>
        </div>
      )}
    </div>
  );
}
