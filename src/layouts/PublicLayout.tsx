import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ZhiYunLogo } from "@/components/icons/ZhiYunLogo";

const HOME_NAV_ITEMS = [
  { label: "核心能力", target: "platform-showcase" },
  { label: "优秀作品", target: "success-stories" },
  { label: "精选课程", target: "featured-courses" },
  { label: "专业师资", target: "faculty" },
  { label: "企业定向培养", target: "business-scenarios" },
  { label: "就业保障", target: "employment-service" },
] as const;

export default function PublicLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollTo = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-neutral-surface">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-border bg-neutral-surface/80 backdrop-blur-md">
        <div className="container mx-auto max-w-[1200px] flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <ZhiYunLogo className="w-8 h-8 text-primary" />
              <span className="text-[18px] font-medium text-neutral-title">
                模数师数字平台
              </span>
            </Link>
            <nav className="hidden items-center gap-3 whitespace-nowrap text-[13px] lg:flex xl:gap-5 xl:text-[14px]">
              <Link to="/" className="font-medium text-primary">首页</Link>
              {HOME_NAV_ITEMS.map((item) => (
                <button
                  key={item.target}
                  type="button"
                  onClick={() => handleScrollTo(item.target)}
                  className="min-h-11 cursor-pointer text-neutral-body transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2 h-16">
            <Link 
              to="/login/admin" 
              className={cn(buttonVariants({ variant: "ghost" }), "text-neutral-body hover:text-primary")}
            >
              运营端
            </Link>
            <div className="group relative cursor-pointer h-16 flex items-center">
              <div
                className={cn(buttonVariants({ variant: "default" }), "bg-primary hover:bg-primary-hover text-white flex items-center gap-1")}
              >
                登录 / 注册 <ChevronDown className="w-4 h-4" />
              </div>
              <div className="absolute top-full right-0 hidden group-hover:block pt-2">
                <div className="w-32 rounded-[6px] border border-neutral-border bg-neutral-surface p-2 shadow-sm">
                  <Link to="/login/user" className="block px-3 py-2 hover:bg-neutral-bg rounded-[4px] text-neutral-title transition-colors text-center">用户版</Link>
                  <Link to="/login/teacher" className="block px-3 py-2 hover:bg-neutral-bg rounded-[4px] text-neutral-title transition-colors text-center">教师版</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-neutral-border bg-white text-center text-[13px] text-neutral-caption flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <Link to="#" className="hover:text-neutral-title transition-colors">关于我们</Link>
        <span>|</span>
        <Link to="#" className="hover:text-neutral-title transition-colors">帮助中心</Link>
        <span>|</span>
        <Link to="#" className="hover:text-neutral-title transition-colors">隐私政策</Link>
        <span>|</span>
        <Link to="#" className="hover:text-neutral-title transition-colors">服务条款</Link>
        <span>|</span>
        <span>©2025 模数师数字平台</span>
        <span>|</span>
        <span>京ICP备12345678号</span>
      </footer>
    </div>
  );
}
