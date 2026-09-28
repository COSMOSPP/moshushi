import { useEffect, useRef, useState, type ComponentType } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  CircleHelp,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings,
  UserRoundSearch,
  Workflow,
  MessageSquareText,
} from "lucide-react";
import { ZhiYunLogo } from "@/components/icons/ZhiYunLogo";
import { cn } from "@/lib/utils";

type NavigationItem = {
  label: string;
  path: string;
  icon: ComponentType<{ className?: string }>;
  end?: boolean;
};

const ENTERPRISE_NAVIGATION: NavigationItem[] = [
  { label: "企业工作台", path: "/enterprise", icon: LayoutDashboard, end: true },
  { label: "人才需求", path: "/enterprise/demands", icon: BriefcaseBusiness },
  { label: "智能人才库", path: "/enterprise/talents", icon: UserRoundSearch },
  { label: "定向培养", path: "/enterprise/training", icon: GraduationCap },
  { label: "招聘协同", path: "/enterprise/recruitment", icon: Workflow },
  { label: "入职评价", path: "/enterprise/employment-feedback", icon: MessageSquareText },
];

function EnterpriseNavigation({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav className={mobile ? "flex min-w-max gap-1 px-4" : "flex h-full items-center gap-1"} aria-label="企业端主导航">
      {ENTERPRISE_NAVIGATION.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => cn(
              "relative flex items-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]",
              mobile ? "min-h-11 rounded-[4px] px-3" : "h-full px-3",
              mobile
                ? isActive ? "bg-[#eff6ff] text-[#3b82f6]" : "text-[#475467] hover:bg-[#f3f6fa] hover:text-[#101828]"
                : isActive
                  ? "bg-white/10 text-white after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-[#3b82f6]"
                  : "text-gray-300 hover:bg-white/10 hover:text-white",
            )}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default function EnterpriseLayout() {
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="enterprise-portal flex h-screen w-screen flex-col overflow-hidden bg-[#f5f6f8] text-[#101828] [letter-spacing:0]">
      <header className="z-50 flex h-16 shrink-0 items-center justify-between bg-[#1f1f1f] px-4 text-white lg:px-8">
        <div className="flex h-full min-w-0 items-center gap-5">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <ZhiYunLogo className="h-6 w-6 text-[#3b82f6]" />
            <span className="text-[16px] font-medium tracking-wide">模数师数字平台<span className="hidden sm:inline">(企业端)</span></span>
          </Link>
          <div className="hidden h-full items-center xl:flex">
            <button type="button" className="flex h-full items-center gap-2 rounded-[4px] px-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white">
              <Building2 className="h-4 w-4" />
              <span className="max-w-40 truncate">华启数字科技</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
          </div>
          <div className="hidden h-full lg:block">
            <EnterpriseNavigation />
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-300 sm:gap-3">
          <button type="button" className="relative flex h-10 w-10 items-center justify-center rounded-[4px] hover:bg-white/10 hover:text-white" title="消息通知">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-[#1f1f1f] bg-[#ef4444]" />
          </button>
          <button type="button" className="hidden h-10 w-10 items-center justify-center rounded-[4px] hover:bg-white/10 hover:text-white sm:flex" title="帮助中心">
            <CircleHelp className="h-5 w-5" />
          </button>
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen((value) => !value)}
              className="flex min-h-10 items-center gap-2 rounded-[4px] px-2 hover:bg-white/10 hover:text-white"
              aria-expanded={profileOpen}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-700 text-xs font-bold text-white">陈</span>
              <span className="hidden text-left sm:block">
                <span className="block text-xs font-semibold text-gray-200">陈经理</span>
                <span className="block text-[10px] text-gray-500">招聘负责人</span>
              </span>
              <ChevronDown className="hidden h-4 w-4 text-gray-500 sm:block" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-12 w-40 rounded-[6px] border border-neutral-200 bg-white p-2 text-[#475467] shadow-lg">
                <button type="button" className="flex w-full items-center gap-2 rounded-[4px] px-3 py-2 text-sm hover:bg-[#eff6ff] hover:text-[#3b82f6]">
                  <Settings className="h-4 w-4" /> 企业设置
                </button>
                <Link to="/login/enterprise" className="mt-1 flex items-center gap-2 border-t border-neutral-100 px-3 py-2 text-sm hover:bg-[#eff6ff] hover:text-[#3b82f6]">
                  <LogOut className="h-4 w-4" /> 退出登录
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="no-scrollbar z-40 shrink-0 overflow-x-auto border-b border-neutral-200 bg-white py-1 lg:hidden">
        <EnterpriseNavigation mobile />
      </div>

      <main ref={contentRef} className="min-h-0 min-w-0 flex-1 overflow-auto bg-[#f5f6f8] p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
}
