import { useState, type ComponentType, type KeyboardEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  BadgeCheck,
  BriefcaseBusiness,
  Boxes,
  Building2,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  GraduationCap,
  LayoutDashboard,
  Medal,
  Network,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import learnerImage from "@/user-img.png";
import {
  BUSINESS_CAPABILITIES,
  EMPLOYMENT_STAGES,
  ENTERPRISE_PARTNERS,
  FEATURED_COURSES,
  FEATURED_WORKS,
  OPERATIONS_METRICS,
  OPERATIONS_TREND,
  PLATFORM_STATS,
  TEACHERS,
  TRAINING_STEPS,
  type BusinessCapability,
  type CapabilityIcon,
} from "@/data/homepageContent";

type IconComponent = ComponentType<{ className?: string; strokeWidth?: number }>;

const CAPABILITY_ICONS: Record<CapabilityIcon, IconComponent> = {
  standard: Boxes,
  talent: GraduationCap,
  enterprise: Building2,
  employment: BadgeCheck,
  dashboard: LayoutDashboard,
};

const WORK_ICONS = [Sparkles, BarChart3, ShieldCheck] as const;
const FLOW_STEP_ICONS = [UsersRound, BriefcaseBusiness, Network, ClipboardCheck, BadgeCheck] as const;
const VALUE_TAG_ICONS = [ShieldCheck, Network, BarChart3, BadgeCheck] as const;

const withBase = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`;

function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto mb-8 max-w-3xl text-center md:mb-10"
          : "mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between"
      }
    >
      <div className={align === "center" ? "" : "max-w-3xl"}>
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--home-primary)]">
          <span className="h-px w-6 bg-[var(--home-primary)]" aria-hidden="true" />
          <span>{eyebrow}</span>
          {align === "center" && <span className="h-px w-6 bg-[var(--home-primary)]" aria-hidden="true" />}
        </div>
        <h2 className="text-[28px] font-bold leading-[1.25] text-[var(--home-title)] md:text-[32px]">
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[var(--home-muted)] md:text-base">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

function PlatformStats() {
  return (
    <section
      aria-label="平台核心数据"
      className="relative z-[15] -mt-5 px-5 sm:-mt-10 sm:px-8 lg:-mt-14 lg:px-12"
    >
      <div className="mx-auto grid max-w-[1344px] grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--home-border)] bg-[var(--home-border)] shadow-[0_16px_44px_rgba(16,24,40,0.10)] lg:grid-cols-4">
        {PLATFORM_STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex min-h-[128px] flex-col justify-center bg-white px-5 py-6 sm:min-h-[140px] sm:px-7 lg:px-9"
          >
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-bold text-[var(--home-title)] md:text-[34px]">{stat.value}</span>
              <span className="text-sm font-semibold text-[var(--home-primary)]">{stat.suffix}</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-[var(--home-body)]">{stat.label}</p>
            <p className="mt-1 hidden text-xs text-[var(--home-muted)] sm:block">{stat.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FlowStepCard({
  step,
  index,
}: {
  step: BusinessCapability["steps"][number];
  index: number;
}) {
  const Icon = FLOW_STEP_ICONS[index] ?? Network;

  return (
    <article className="group relative min-h-[168px] overflow-hidden rounded-xl border border-[#dce8ff] bg-white/90 p-5 shadow-[0_6px_20px_rgba(31,56,100,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-[#c8d8ff] hover:shadow-[0_14px_32px_rgba(36,87,255,0.10)] motion-reduce:transform-none">
      <div className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 bg-[linear-gradient(135deg,transparent_48%,rgba(140,179,255,0.12)_49%,rgba(140,179,255,0.12)_51%,transparent_52%)]" aria-hidden="true" />
      <div className="relative flex items-start gap-4">
        <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-white bg-[linear-gradient(145deg,#ffffff,#e7f1ff)] text-[#2457ff] shadow-[0_6px_18px_rgba(36,87,255,0.12)]">
          <Icon className="h-6 w-6" strokeWidth={1.8} />
        </span>
        <div className="min-w-0">
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-[#2457ff]">0{index + 1}</span>
            <h4 className="text-[17px] font-semibold text-[#172b4d]">{step.title}</h4>
          </div>
          <ul className="mt-3 space-y-1">
            {step.items.slice(0, 5).map((item) => (
              <li key={item} className="flex items-center gap-2 text-[13px] leading-5 text-[#667085]">
                <span className="h-1 w-1 shrink-0 rounded-full bg-[#8cb3ff]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function CoreModelCard({ capability }: { capability: BusinessCapability }) {
  const step = capability.steps[2];

  return (
    <article className="relative mx-auto w-full max-w-[720px] overflow-hidden rounded-2xl border border-[#d6e5ff] bg-white/75 px-5 py-5 shadow-[0_10px_30px_rgba(36,87,255,0.08)] backdrop-blur-sm sm:px-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(93,140,255,0.16),transparent_42%)]" aria-hidden="true" />
      <div className="relative grid min-h-[126px] items-center gap-5 md:grid-cols-[minmax(0,1fr)_132px_minmax(0,1.25fr)]">
        <div className="flex items-center gap-3">
          <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-white bg-[linear-gradient(145deg,#ffffff,#e7f1ff)] text-[#2457ff] shadow-[0_6px_18px_rgba(36,87,255,0.12)]">
            <Boxes className="h-6 w-6" strokeWidth={1.8} />
          </span>
          <div>
            <span className="text-2xl font-bold text-[#2457ff]">03</span>
            <h4 className="mt-1 text-[17px] font-semibold text-[#12316f]">{step.title}</h4>
          </div>
        </div>

        <div className="relative mx-auto flex h-[126px] w-[126px] items-center justify-center" aria-hidden="true">
          <span className="absolute h-[126px] w-[126px] rounded-full border border-[#dce8ff]" />
          <span className="absolute h-[104px] w-[104px] rounded-full border border-[#e7efff]" />
          <span className="absolute h-[78px] w-[78px] rotate-45 rounded-xl border border-[#a9c8ff] bg-[linear-gradient(145deg,#8fbdff,#2457ff)] shadow-[0_10px_28px_rgba(36,87,255,0.28)]" />
          <span className="absolute h-[50px] w-[50px] rotate-45 rounded-lg border border-white/60 bg-[#5d8cff]" />
          <span className="absolute h-[25px] w-[25px] rotate-45 rounded-md border border-white/70 bg-[#8cb3ff]" />
          <Boxes className="relative h-6 w-6 text-white" strokeWidth={1.7} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {step.items.map((item) => (
            <span
              key={item}
              className="flex min-h-8 items-center justify-center rounded-lg border border-[#dce8ff] bg-white/85 px-2 text-center text-xs font-medium text-[#36558f] shadow-[0_3px_10px_rgba(36,87,255,0.05)]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function FlowConnector({ horizontal = false }: { horizontal?: boolean }) {
  return (
    <span className={horizontal ? "relative flex w-full items-center justify-center text-[#5b8def]" : "relative flex h-8 items-center justify-center text-[#5b8def]"} aria-hidden="true">
      <span className={horizontal ? "absolute h-px w-full bg-[#c9dcff]" : "absolute h-full w-px bg-[#c9dcff]"} />
      {horizontal
        ? <ArrowRight className="relative h-5 w-5 bg-[#f8fbff]" strokeWidth={1.7} />
        : <ArrowDown className="relative h-5 w-5 bg-[#f8fbff]" strokeWidth={1.7} />}
    </span>
  );
}

function FlowCapabilityVisual({ capability }: { capability: BusinessCapability }) {
  return (
    <div className="relative min-h-full overflow-hidden bg-[linear-gradient(145deg,#ffffff_0%,#f8fbff_56%,#f1f7ff_100%)] p-5 sm:p-7 lg:min-h-[650px] lg:p-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-55"
        style={{
          backgroundImage: "linear-gradient(rgba(184,208,255,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(184,208,255,.16) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to bottom, transparent, black 24%, black 82%, transparent)",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute left-1/2 top-28 hidden h-[470px] w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,transparent,#b8d0ff_18%,#b8d0ff_82%,transparent)] md:block" aria-hidden="true" />

      <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-[#172b4d] md:text-[26px]">{capability.systemTitle}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#98a2b3]">{capability.systemDescription}</p>
        </div>
        <Link
          to={capability.actionHref}
          className="inline-flex min-h-9 items-center gap-1.5 text-xs font-semibold text-[#2457ff] transition hover:text-[#1747e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2457ff]"
        >
          {capability.actionLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="relative z-10 mt-7 grid gap-3 md:grid-cols-[minmax(0,1fr)_52px_minmax(0,1fr)]">
        <FlowStepCard step={capability.steps[0]} index={0} />
        <span className="hidden md:flex"><FlowConnector horizontal /></span>
        <span className="flex md:hidden"><FlowConnector /></span>
        <FlowStepCard step={capability.steps[1]} index={1} />

        <span className="flex justify-center md:col-span-3"><FlowConnector /></span>
        <div className="md:col-span-3">
          <CoreModelCard capability={capability} />
        </div>
        <span className="flex justify-center md:col-span-3"><FlowConnector /></span>

        <FlowStepCard step={capability.steps[3]} index={3} />
        <span className="hidden md:flex"><FlowConnector horizontal /></span>
        <span className="flex md:hidden"><FlowConnector /></span>
        <FlowStepCard step={capability.steps[4]} index={4} />
      </div>
    </div>
  );
}

function DashboardCapabilityVisual({ capability }: { capability: BusinessCapability }) {
  const talentDistribution = [
    { label: "初级人才", value: 28 },
    { label: "中级人才", value: 46 },
    { label: "高级人才", value: 26 },
  ];

  return (
    <div className="min-h-full bg-[linear-gradient(145deg,#ffffff_0%,#f7faff_100%)] p-5 sm:p-7 lg:min-h-[650px] lg:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-[#172b4d] md:text-[26px]">{capability.systemTitle}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#98a2b3]">{capability.systemDescription}</p>
        </div>
        <Link
          to={capability.actionHref}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-[#2457ff] transition hover:bg-[#eaf0ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2457ff]"
        >
          {capability.actionLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {OPERATIONS_METRICS.map((metric) => (
          <div key={metric.label} className="rounded-xl border border-[#e7ecf3] bg-[#f8faff] p-4">
            <p className="text-xs text-[#667085]">{metric.label}</p>
            <div className="mt-2 flex items-end justify-between gap-2">
              <strong className="text-xl text-[#12316f]">{metric.value}</strong>
              <span className="text-xs font-semibold text-emerald-600">{metric.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="min-w-0 rounded-xl border border-[#e7ecf3] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-[#172b4d]">培养质量趋势</p>
              <p className="mt-1 text-xs text-[#98a2b3]">活跃度与课程完成率</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> 实时数据
            </span>
          </div>
          <div className="mt-3 h-[220px] min-w-0 w-full overflow-hidden" aria-label="核心能力培养质量趋势图">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 300, height: 220 }}>
              <AreaChart data={OPERATIONS_TREND} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="capabilityActiveArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2457ff" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2457ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#e7ecf3" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#98a2b3", fontSize: 11 }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "#98a2b3", fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 8, borderColor: "#e7ecf3", boxShadow: "0 8px 24px rgba(16,24,40,0.08)", fontSize: 12 }} />
                <Area type="monotone" dataKey="active" name="活跃度" stroke="#2457ff" strokeWidth={2.5} fill="url(#capabilityActiveArea)" />
                <Area type="monotone" dataKey="completed" name="完成率" stroke="#00a6a6" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-xl border border-[#e7ecf3] p-4 sm:p-5">
            <p className="text-sm font-bold text-[#172b4d]">人才能力分布</p>
            <div className="mt-4 space-y-4">
              {talentDistribution.map((item) => (
                <div key={item.label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-[#667085]">{item.label}</span>
                    <strong className="text-[#36558f]">{item.value}%</strong>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#edf2fa]">
                    <div className="h-full rounded-full bg-[#5d8cff]" style={{ width: item.value + "%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-[#dce8ff] bg-[#f5f9ff] p-4 sm:p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs text-[#667085]">就业匹配率</p>
                <strong className="mt-1 block text-2xl text-[#2457ff]">89%</strong>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#667085]">企业岗位需求</p>
                <strong className="mt-1 block text-xl text-[#12316f]">6,200+</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CapabilityVisual({ activeIndex }: { activeIndex: number }) {
  const capability = BUSINESS_CAPABILITIES[activeIndex];
  return capability.id === "smart-dashboard"
    ? <DashboardCapabilityVisual capability={capability} />
    : <FlowCapabilityVisual capability={capability} />;
}

function BusinessCapabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const capability = BUSINESS_CAPABILITIES[activeIndex];

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % BUSINESS_CAPABILITIES.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + BUSINESS_CAPABILITIES.length) % BUSINESS_CAPABILITIES.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = BUSINESS_CAPABILITIES.length - 1;
    if (nextIndex === index) return;

    event.preventDefault();
    setActiveIndex(nextIndex);
    requestAnimationFrame(() => {
      document.getElementById("capability-tab-" + BUSINESS_CAPABILITIES[nextIndex].id)?.focus();
    });
  };

  return (
    <section id="platform-showcase" className="scroll-mt-24 bg-white pb-[72px] pt-[72px] lg:pb-24 lg:pt-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="核心业务能力"
          title="业务体系协同，构建产业数字人才完整生态"
          description="从标准到培养，从人才到企业，贯通能力建设、人才认证、就业服务与数字化运营。"
        />

        <div
          role="tablist"
          aria-label="五大业务能力"
          className="no-scrollbar flex gap-3 overflow-x-auto pb-2 sm:gap-4"
        >
          {BUSINESS_CAPABILITIES.map((item, index) => {
            const Icon = CAPABILITY_ICONS[item.icon];
            const active = index === activeIndex;
            return (
              <button
                key={item.id}
                id={"capability-tab-" + item.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={"capability-panel-" + item.id}
                tabIndex={active ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={
                  active
                    ? "flex h-[52px] min-w-[190px] flex-1 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#2457ff] bg-[#2457ff] px-4 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(36,87,255,0.20)] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2457ff] focus-visible:ring-offset-2 md:h-[68px] lg:min-w-0"
                    : "flex h-[52px] min-w-[190px] flex-1 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#e7ecf3] bg-white px-4 text-sm font-semibold text-[#344054] shadow-[0_6px_20px_rgba(31,56,100,0.06)] transition duration-300 hover:border-[#c8d8ff] hover:bg-[#f7faff] hover:text-[#2457ff] hover:shadow-[0_8px_22px_rgba(36,87,255,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2457ff] focus-visible:ring-offset-2 md:h-[68px] lg:min-w-0"
                }
              >
                <Icon className="h-5 w-5" strokeWidth={1.8} />
                {item.tab}
              </button>
            );
          })}
        </div>

        <div
          key={capability.id}
          id={"capability-panel-" + capability.id}
          role="tabpanel"
          aria-labelledby={"capability-tab-" + capability.id}
          className="home-capability-content mt-6 grid items-stretch overflow-hidden rounded-2xl border border-[#d6e5ff] bg-white shadow-[0_12px_36px_rgba(31,56,100,0.06)] lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]"
        >
          <article className="relative min-h-[540px] overflow-hidden border-b border-[#d6e5ff] bg-[linear-gradient(145deg,#f0f7ff_0%,#dceeff_58%,#c6e3ff_100%)] p-7 sm:p-9 lg:min-h-[650px] lg:border-b-0 lg:border-r lg:p-10">
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] opacity-25"
              style={{
                backgroundImage: "linear-gradient(rgba(36,87,255,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(36,87,255,.16) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                maskImage: "linear-gradient(to bottom, transparent, black)",
              }}
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute bottom-8 right-6 h-36 w-40 opacity-40" aria-hidden="true">
              <span className="absolute bottom-0 right-0 h-16 w-16 rotate-45 rounded-lg border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.85),rgba(93,140,255,0.35))] shadow-[0_12px_24px_rgba(36,87,255,0.12)]" />
              <span className="absolute bottom-12 right-24 h-10 w-10 rotate-45 rounded-md border border-white/80 bg-white/65" />
              <span className="absolute bottom-24 right-12 h-7 w-7 rotate-45 rounded border border-white/80 bg-[#8cb3ff]/50" />
            </div>
            <div className="relative flex h-full flex-col">
              <p className="text-xs font-semibold text-[#2457ff]">{capability.eyebrow}</p>
              <h3 className="mt-3 max-w-[330px] whitespace-pre-line text-[28px] font-bold leading-[1.35] text-[#12316f] lg:text-[32px]">
                {capability.title}
              </h3>
              <span className="mt-4 h-0.5 w-10 bg-[#2457ff]" aria-hidden="true" />
              <p className="mt-4 max-w-[330px] text-base font-medium leading-7 text-[#36558f]">{capability.valueStatement}</p>
              <p className="mt-6 max-w-[330px] text-[15px] leading-7 text-[#667085]">{capability.description}</p>
              <div className="mt-10">
                <div className="grid max-w-[330px] grid-cols-2 gap-2.5">
                  {capability.tags.map((tag, index) => {
                    const TagIcon = VALUE_TAG_ICONS[index] ?? CheckCircle2;
                    return (
                      <span key={tag} className="flex min-h-12 items-center gap-2.5 rounded-xl border border-white/90 bg-white/75 px-3.5 text-sm font-semibold text-[#36558f] shadow-[0_4px_14px_rgba(36,87,255,0.05)] backdrop-blur-sm">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#edf4ff] text-[#2457ff]">
                          <TagIcon className="h-4 w-4" strokeWidth={1.8} />
                        </span>
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </article>

          <CapabilityVisual activeIndex={activeIndex} />
        </div>
      </div>
    </section>
  );
}

function FeaturedWorks() {
  return (
    <section id="success-stories" className="scroll-mt-24 bg-[var(--home-bg)] py-[72px] lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="优秀作品"
          title="用真实项目证明能力，让成长成果清晰可见"
          description="学员围绕企业场景完成项目实践，沉淀可评价、可展示、可匹配岗位的成果作品。"
          action={
            <Link to="/login" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--home-primary)]">
              查看更多作品 <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        <div className="grid gap-5 md:grid-cols-3">
          {FEATURED_WORKS.map((work, index) => {
            const Icon = WORK_ICONS[index];
            return (
              <article
                key={work.title}
                className="group overflow-hidden rounded-xl border border-[var(--home-border)] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#cfd8ea] hover:shadow-[0_12px_32px_rgba(16,24,40,0.08)] motion-reduce:transform-none"
              >
                <div className="relative aspect-video overflow-hidden bg-[#eaf0ff]">
                  <img
                    src={withBase(work.cover)}
                    alt={work.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                    loading="lazy"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-md bg-white/90 px-2.5 py-1.5 text-xs font-semibold text-[var(--home-title)] backdrop-blur">
                    <Icon className="h-3.5 w-3.5 text-[var(--home-primary)]" />
                    {work.direction}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[var(--home-title)]">{work.title}</h3>
                  <p className="mt-3 min-h-12 text-sm leading-6 text-[var(--home-muted)]">{work.description}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-[var(--home-border)] pt-4">
                    <span className="text-xs text-[var(--home-muted)]">{work.author}</span>
                    <Link
                      to="/login"
                      aria-label={`查看${work.title}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--home-primary)] opacity-80 transition hover:bg-[var(--home-primary-soft)] group-hover:opacity-100"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedCourses() {
  return (
    <section id="featured-courses" className="scroll-mt-24 bg-white py-[72px] lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="热门核心课程"
          title="紧贴产业变化，构建面向岗位的精品课程体系"
          description="以能力标准组织内容，用项目实训连接知识学习与岗位实践。"
          action={
            <Link to="/user/courses" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--home-primary)]">
              浏览全部课程 <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_COURSES.map((course) => (
            <article
              key={course.title}
              className="group overflow-hidden rounded-xl border border-[var(--home-border)] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#cfd8ea] hover:shadow-[0_12px_32px_rgba(16,24,40,0.08)] motion-reduce:transform-none"
            >
              <Link to="/user/courses" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--home-primary)]">
                <div className="aspect-video overflow-hidden bg-[#eaf0ff]">
                  <img
                    src={withBase(course.cover)}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <span
                        key={tag}
                        className={`rounded-md px-2 py-1 text-xs font-medium ${
                          index === 0
                            ? "bg-[var(--home-primary-soft)] text-[var(--home-primary)]"
                            : "bg-[#f2f4f7] text-[var(--home-muted)]"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[var(--home-title)] transition-colors group-hover:text-[var(--home-primary)]">
                    {course.title}
                  </h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-[var(--home-muted)]">{course.description}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--home-border)] pt-4 text-xs text-[var(--home-muted)]">
                    <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" />{course.hours}</span>
                    <span className="inline-flex items-center gap-1.5"><Medal className="h-3.5 w-3.5" />{course.level}</span>
                    <span className="inline-flex items-center gap-1.5"><UsersRound className="h-3.5 w-3.5" />{course.learners}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faculty() {
  return (
    <section id="faculty" className="scroll-mt-24 bg-[#f2f7ff] py-[72px] lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="专业师资"
          title="产业导师与教研专家，共同保障培养质量"
          description="既讲清知识体系，也带领学员解决真实业务问题。"
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {TEACHERS.map((teacher) => (
            <article key={teacher.name} className="rounded-xl border border-[#dfe7f5] bg-white p-6">
              <div className="flex items-center gap-4">
                <img
                  src={teacher.portrait}
                  alt={`${teacher.name}讲师`}
                  className="h-20 w-20 shrink-0 rounded-full bg-[#eaf0ff] object-cover object-top"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-[var(--home-title)]">{teacher.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-[var(--home-primary)]">{teacher.role}</p>
                  <p className="mt-1 text-xs text-[var(--home-muted)]">{teacher.direction}</p>
                </div>
              </div>
              <p className="mt-5 min-h-12 text-sm leading-6 text-[var(--home-muted)]">{teacher.biography}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {teacher.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-[#f7f9fc] px-2.5 py-1.5 text-xs font-medium text-[var(--home-body)]">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnterpriseTraining() {
  return (
    <section id="business-scenarios" className="scroll-mt-24 bg-white py-[72px] lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="企业定向培养"
          title="企业深度参与培养过程，让人才供给更精准"
          description="从岗位需求诊断到人才推荐形成标准流程，缩短企业招聘与新人胜任周期。"
        />

        <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--home-border)] bg-[var(--home-border)] sm:grid-cols-3 lg:grid-cols-6">
          {TRAINING_STEPS.map((step) => (
            <div key={step.number} className="relative min-h-[148px] bg-white p-5">
              <span className="text-xs font-bold text-[var(--home-primary)]">{step.number}</span>
              <h3 className="mt-5 text-sm font-bold text-[var(--home-title)]">{step.title}</h3>
              <p className="mt-2 text-xs leading-5 text-[var(--home-muted)]">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[var(--home-border)] pt-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--home-title)]">合作企业与生态伙伴</p>
              <p className="mt-1 text-sm text-[var(--home-muted)]">共同参与标准建设、课程共创、项目评审与人才选拔</p>
            </div>
            <span className="text-xs text-[var(--home-muted)]">已连接 368+ 家企业</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {ENTERPRISE_PARTNERS.map((partner, index) => (
              <div
                key={partner}
                className="group flex min-h-20 items-center justify-center gap-2 rounded-lg border border-[var(--home-border)] bg-[#fafbfc] px-3 text-sm font-semibold text-[#7f899b] transition hover:border-[#cdd8f0] hover:bg-white hover:text-[var(--home-primary)]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#eef1f5] text-xs font-bold transition group-hover:bg-[var(--home-primary-soft)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EmploymentService() {
  return (
    <section id="employment-service" className="scroll-mt-24 bg-[var(--home-bg)] py-[72px] lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-stretch gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="relative min-h-[420px] overflow-hidden rounded-xl bg-[#dfe8ff]">
            <img
              src={learnerImage}
              alt="完成数字技能培养的学员"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#101828]/85 via-[#101828]/55 to-transparent px-6 pb-6 pt-24 text-white">
              <p className="text-2xl font-bold">让每一份能力，都抵达合适的岗位</p>
              <div className="mt-4 flex gap-7 text-sm text-white/80">
                <span><strong className="mr-1 text-xl text-white">89%</strong>就业匹配率</span>
                <span><strong className="mr-1 text-xl text-white">6,200+</strong>岗位需求</span>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="就业保障"
              title="从定制培养到定向推荐，持续缩短人才与岗位的距离"
              description="培养前有方向、过程中有实践、就业时有依据，形成可跟踪的就业服务闭环。"
            />
            <div className="divide-y divide-[var(--home-border)] border-y border-[var(--home-border)]">
              {EMPLOYMENT_STAGES.map((stage) => (
                <article key={stage.number} className="grid gap-4 py-6 sm:grid-cols-[64px_1fr] sm:gap-6">
                  <span className="text-[28px] font-bold text-[#c8d5ff]">{stage.number}</span>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--home-title)]">{stage.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--home-muted)]">{stage.description}</p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                      {stage.items.map((item) => (
                        <span key={item} className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--home-body)]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[var(--home-primary)]" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DigitalOperations() {
  return (
    <section className="bg-white py-[72px] lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid min-w-0 items-center gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--home-primary-soft)] text-[var(--home-primary)]">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-[var(--home-primary)]">学院数字化运营</p>
            <h2 className="mt-3 text-[28px] font-bold leading-[1.3] text-[var(--home-title)] md:text-[32px]">
              一个平台掌握培养全貌，让运营决策有据可依
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-[var(--home-muted)]">
              面向学院管理者与主管部门，统一查看招生、教学、实训、认证和就业数据，及时发现问题并评估项目成效。
            </p>
            <div className="mt-7 grid grid-cols-2 gap-y-4 text-sm text-[var(--home-body)]">
              {["全局数据总览", "教学过程监测", "能力质量分析", "就业结果追踪"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-[var(--home-primary)]" />
                  {item}
                </span>
              ))}
            </div>
            <Link
              to="/login/admin"
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-lg border border-[var(--home-border)] bg-white px-5 text-sm font-semibold text-[var(--home-title)] transition hover:border-[var(--home-primary)] hover:text-[var(--home-primary)]"
            >
              查看运营能力 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="min-w-0 bg-[#f7f9fc] p-4 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[var(--home-title)]">数字学院运营总览</p>
                <p className="mt-1 text-xs text-[var(--home-muted)]">2026 秋季培养周期</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> 实时数据
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {OPERATIONS_METRICS.map((metric) => (
                <div key={metric.label} className="rounded-lg border border-[var(--home-border)] bg-white p-4">
                  <p className="text-xs text-[var(--home-muted)]">{metric.label}</p>
                  <div className="mt-2 flex items-end justify-between gap-2">
                    <span className="text-xl font-bold text-[var(--home-title)]">{metric.value}</span>
                    <span className="text-xs font-semibold text-emerald-600">{metric.change}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 min-w-0 rounded-lg border border-[var(--home-border)] bg-white p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[var(--home-title)]">培养质量趋势</p>
                  <p className="mt-1 text-xs text-[var(--home-muted)]">活跃度与课程完成率</p>
                </div>
                <div className="flex gap-3 text-xs text-[var(--home-muted)]">
                  <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#2457ff]" />活跃度</span>
                  <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#00a6a6]" />完成率</span>
                </div>
              </div>
              <div className="h-[220px] min-w-0 w-full overflow-hidden" aria-label="培养质量趋势图">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  minWidth={0}
                  initialDimension={{ width: 300, height: 220 }}
                >
                  <AreaChart data={OPERATIONS_TREND} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
                    <defs>
                      <linearGradient id="activeArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2457ff" stopOpacity={0.18} />
                        <stop offset="95%" stopColor="#2457ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#e7ecf3" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#98a2b3", fontSize: 11 }} />
                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "#98a2b3", fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ borderRadius: 8, borderColor: "#e7ecf3", boxShadow: "0 8px 24px rgba(16,24,40,0.08)", fontSize: 12 }}
                    />
                    <Area type="monotone" dataKey="active" name="活跃度" stroke="#2457ff" strokeWidth={2.5} fill="url(#activeArea)" />
                    <Area type="monotone" dataKey="completed" name="完成率" stroke="#00a6a6" strokeWidth={2} fill="transparent" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConsultationCta() {
  return (
    <section className="bg-[linear-gradient(120deg,#2457ff_0%,#7357ff_100%)] py-14 text-white md:py-16">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-7 px-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-white/75">共建数字人才新生态</p>
          <h2 className="mt-3 text-[28px] font-bold leading-[1.3] md:text-[32px]">开启数字人才培养与学院运营新方式</h2>
          <p className="mt-3 text-sm leading-6 text-white/75 md:text-base">获取面向院校、园区、企业与主管部门的一体化解决方案。</p>
        </div>
        <Link
          to="/login"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-bold text-[var(--home-primary)] transition hover:bg-[#f2f5ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2457ff]"
        >
          立即咨询 <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

export default function HomeLandingContent() {
  return (
    <main className="homepage-redesign overflow-x-clip bg-white [letter-spacing:0]">
      <PlatformStats />
      <BusinessCapabilities />
      <FeaturedWorks />
      <FeaturedCourses />
      <Faculty />
      <EnterpriseTraining />
      <EmploymentService />
      <DigitalOperations />
      <ConsultationCta />
    </main>
  );
}
