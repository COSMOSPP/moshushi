import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Phone,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ZhiYunLogo } from "@/components/icons/ZhiYunLogo";

export default function LoginEnterprise() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "apply">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [loginForm, setLoginForm] = useState({ account: "", password: "", remember: true });
  const [applyForm, setApplyForm] = useState({ company: "", contact: "", phone: "", creditCode: "" });

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      navigate("/enterprise");
    }, 650);
  };

  const handleApply = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setMessage("入驻申请已提交，工作人员将在 1 个工作日内联系您。");
    }, 650);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] [letter-spacing:0] lg:grid lg:grid-cols-[0.9fr_1.1fr]">
      <section className="relative hidden min-h-screen overflow-hidden bg-[#102a50] lg:block">
        <img src="/assets/academy.jpg" alt="企业与学院共建数字人才培养" className="absolute inset-0 h-full w-full object-cover object-center opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,31,63,.42),rgba(10,31,63,.92))]" />
        <Link to="/" className="absolute left-9 top-8 z-10 flex items-center gap-3 text-white">
          <ZhiYunLogo className="h-10 w-10" />
          <span className="text-xl font-bold">模数师数字平台</span>
        </Link>
        <div className="absolute inset-x-9 bottom-12 z-10 max-w-xl text-white">
          <span className="inline-flex rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">产教协同 · 企业端</span>
          <h1 className="mt-5 text-[34px] font-bold leading-[1.35]">让企业深度参与人才培养，<br />让岗位需求更快找到答案</h1>
          <div className="mt-7 grid grid-cols-3 border-y border-white/15 py-5 text-sm text-white/75">
            <span>岗位标准共建</span><span>真实项目共育</span><span>人才精准匹配</span>
          </div>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-[430px]">
          <Link to="/" className="mb-9 inline-flex items-center gap-2 text-sm text-[#667085] hover:text-[#2563eb] lg:hidden"><ArrowLeft className="h-4 w-4" />返回官网</Link>
          <div className="mb-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#173f7a] text-white"><Building2 className="h-6 w-6" /></div>
            <h2 className="text-[28px] font-bold text-[#101828]">{mode === "login" ? "企业端登录" : "申请企业入驻"}</h2>
            <p className="mt-2 text-sm leading-6 text-[#667085]">{mode === "login" ? "登录后管理人才需求、定向培养与招聘协同。" : "提交企业基础信息，通过资质审核后开通账号。"}</p>
          </div>

          {message && <div className="mb-5 flex items-start gap-2 rounded-lg border border-[#abefc6] bg-[#ecfdf3] p-4 text-sm leading-6 text-[#027a48]"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0" />{message}</div>}

          {mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <label className="block"><span className="mb-1.5 block text-xs font-medium text-[#344054]">企业账号</span><div className="relative"><User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" /><Input required value={loginForm.account} onChange={(event) => setLoginForm({ ...loginForm, account: event.target.value })} placeholder="请输入邮箱或手机号" className="h-11 rounded-md bg-white pl-10" /></div></label>
              <label className="block"><span className="mb-1.5 block text-xs font-medium text-[#344054]">密码</span><div className="relative"><Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" /><Input required type={showPassword ? "text" : "password"} value={loginForm.password} onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })} placeholder="请输入登录密码" className="h-11 rounded-md bg-white pl-10 pr-10" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98a2b3]" title={showPassword ? "隐藏密码" : "显示密码"}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></label>
              <div className="flex items-center justify-between text-xs"><label className="flex items-center gap-2 text-[#667085]"><input type="checkbox" checked={loginForm.remember} onChange={(event) => setLoginForm({ ...loginForm, remember: event.target.checked })} />保持登录</label><button type="button" className="font-medium text-[#2563eb]">忘记密码？</button></div>
              <Button type="submit" disabled={loading} className="h-11 w-full rounded-md bg-[#2563eb]">{loading ? "正在登录..." : "登录企业端"}</Button>
              <p className="pt-2 text-center text-sm text-[#667085]">尚未开通企业账号？ <button type="button" onClick={() => { setMode("apply"); setMessage(""); }} className="font-semibold text-[#2563eb]">申请入驻</button></p>
            </form>
          ) : (
            <form onSubmit={handleApply} className="space-y-4">
              <label className="block"><span className="mb-1.5 block text-xs font-medium text-[#344054]">企业名称</span><div className="relative"><Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" /><Input required value={applyForm.company} onChange={(event) => setApplyForm({ ...applyForm, company: event.target.value })} placeholder="请输入企业全称" className="h-11 rounded-md bg-white pl-10" /></div></label>
              <label className="block"><span className="mb-1.5 block text-xs font-medium text-[#344054]">联系人</span><div className="relative"><User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" /><Input required value={applyForm.contact} onChange={(event) => setApplyForm({ ...applyForm, contact: event.target.value })} placeholder="请输入姓名" className="h-11 rounded-md bg-white pl-10" /></div></label>
              <label className="block"><span className="mb-1.5 block text-xs font-medium text-[#344054]">联系手机</span><div className="relative"><Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" /><Input required value={applyForm.phone} onChange={(event) => setApplyForm({ ...applyForm, phone: event.target.value })} placeholder="请输入手机号" className="h-11 rounded-md bg-white pl-10" /></div></label>
              <label className="block"><span className="mb-1.5 block text-xs font-medium text-[#344054]">统一社会信用代码</span><div className="relative"><BadgeCheck className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" /><Input required value={applyForm.creditCode} onChange={(event) => setApplyForm({ ...applyForm, creditCode: event.target.value })} placeholder="请输入 18 位信用代码" className="h-11 rounded-md bg-white pl-10" /></div></label>
              <Button type="submit" disabled={loading || Boolean(message)} className="h-11 w-full rounded-md bg-[#2563eb]">{loading ? "正在提交..." : "提交入驻申请"}</Button>
              <button type="button" onClick={() => { setMode("login"); setMessage(""); }} className="flex min-h-10 w-full items-center justify-center gap-2 text-sm font-medium text-[#667085]"><ArrowLeft className="h-4 w-4" />返回登录</button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
