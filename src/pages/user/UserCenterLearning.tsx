import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { 
  ChevronRight, 
  Target, 
  Zap, 
  Shield, 
  BookOpen, 
  Award, 
  Search,
  User,
  MapPin,
  Calendar,
  Briefcase,
  Heart,
  Quote
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const radarData = [
  { subject: '基础分', A: 85, fullMark: 100 },
  { subject: '服务力', A: 80, fullMark: 100 },
  { subject: '成长力', A: 90, fullMark: 100 },
  { subject: '经营力', A: 65, fullMark: 100 },
];

export default function UserCenterLearning() {
  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-neutral-caption">
        <Link to="/user" className="hover:text-[#3b82f6] cursor-pointer transition-colors">首页</Link>
        <ChevronRight className="w-4 h-4 mx-1" />
        <Link to="/user/center" className="hover:text-[#3b82f6] cursor-pointer transition-colors">个人中心</Link>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-neutral-title font-medium">学习画像</span>
      </div>

      <div className="flex gap-6 items-start">
        {/* Left Sidebar: User Persona (Reference Fig 2) */}
        <div className="w-[280px] bg-white rounded-[16px] shadow-sm border border-neutral-border overflow-hidden shrink-0">
          <div className="p-8 flex flex-col items-center">
            {/* Avatar Section */}
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-blue-500 border-4 border-white shadow-lg overflow-hidden">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-neutral-title mb-1">张三</h2>
            <p className="text-[14px] text-neutral-caption mb-4">顶级人工智能专家</p>
            
            <div className="relative px-4 py-3 bg-neutral-bg rounded-[8px] mb-8 italic text-[13px] text-neutral-body text-center">
              <Quote className="absolute -left-1 -top-1 w-4 h-4 text-[#3b82f6]/20" />
              " 既然选择了远方，便只顾风雨兼程。"
              <Quote className="absolute -right-1 -bottom-1 w-4 h-4 text-[#3b82f6]/20 rotate-180" />
            </div>

            {/* Basic Info */}
            <div className="w-full space-y-4 mb-8">
              <h3 className="text-sm font-bold text-neutral-title uppercase tracking-wider mb-2">基本信息</h3>
              <div className="grid grid-cols-2 gap-y-3">
                <div className="flex items-center gap-2 text-[13px] text-neutral-body">
                  <User className="w-4 h-4 text-neutral-caption" />
                  <span>男性</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-neutral-body">
                  <Calendar className="w-4 h-4 text-neutral-caption" />
                  <span>28 岁</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-neutral-body col-span-2">
                  <MapPin className="w-4 h-4 text-neutral-caption" />
                  <span>广东省 / 深圳市 / 南山区</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-neutral-body">
                  <Heart className="w-4 h-4 text-neutral-caption" />
                  <span>未婚</span>
                </div>
              </div>
              <Button variant="outline" className="w-full h-9 text-[12px] border-dashed border-neutral-border text-neutral-caption hover:text-[#3b82f6] hover:border-[#3b82f6]">
                + 添加字段
              </Button>
            </div>

            {/* Domains / Tags */}
            <div className="w-full">
              <h3 className="text-sm font-bold text-neutral-title uppercase tracking-wider mb-4">领域标签</h3>
              <div className="flex flex-wrap gap-2">
                {["大模型专家", "NLP资深", "跨平台开发", "技术极客", "Python爱好者", "爱折腾"].map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-white border border-neutral-border rounded-[4px] text-[12px] text-neutral-body whitespace-nowrap">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content: Skill & Learning (Reference Fig 1) */}
        <div className="flex-1 space-y-6">
          {/* Top Section: Skill Depth Module */}
          <div className="bg-white rounded-[16px] shadow-sm border border-neutral-border overflow-hidden relative">
            {/* Background Gradient */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-r from-[#3b82f6]/5 to-[#60a5fa]/10 pointer-events-none" />
            
            <div className="relative p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Level Progress */}
                <div className="space-y-12">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-[#3b82f6] rounded-[12px] shadow-lg shadow-[#3b82f6]/30 flex items-center justify-center text-white text-3xl font-bold italic">
                      V2
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold text-neutral-title">技术专家</h2>
                        <Button className="h-7 px-4 bg-[#3b82f6] text-white text-xs rounded-full hover:bg-[#3b82f6]/90">
                          了解升级方式
                        </Button>
                      </div>
                      <p className="text-[13px] text-neutral-caption mt-1 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" /> 更新时间：每月 3 日更新等级、各模块&指标分数
                      </p>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="relative pt-8 pb-4 px-4">
                    <div className="absolute left-0 right-0 top-10 h-1.5 bg-neutral-bg rounded-full" />
                    <div className="absolute left-0 w-[40%] top-10 h-1.5 bg-[#3b82f6] rounded-full shadow-sm shadow-[#3b82f6]/30" />
                    
                    <div className="flex justify-between items-center relative z-10">
                      {[
                        { label: "V1 阶段", score: "0" },
                        { label: "V2 阶段", score: "490", active: true },
                        { label: "V3 阶段", score: "620" },
                        { label: "V4 阶段", score: "850" },
                        { label: "V5 阶段+", score: "1000" },
                      ].map((step, i) => (
                        <div key={i} className="flex flex-col items-center gap-6 group">
                          <div className="text-[12px] text-neutral-caption group-hover:text-neutral-title transition-colors">{step.score}</div>
                          <div className={cn(
                            "w-4 h-4 rounded-full border-2 transition-all duration-300",
                            step.active 
                              ? "bg-white border-[#3b82f6] scale-125 shadow-[0_0_10px_rgba(59, 130, 246,0.5)]" 
                              : i < 1 ? "bg-[#3b82f6] border-[#3b82f6]" : "bg-neutral-bg border-neutral-border"
                          )} />
                          <div className={cn(
                            "text-[12px] font-medium py-1 px-3 rounded-full transition-all duration-300",
                            step.active ? "bg-[#3b82f6] text-white shadow-md" : "text-neutral-caption"
                          )}>
                            {step.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Radar Chart Section */}
                <div className="bg-neutral-bg/50 rounded-[12px] p-6 border border-white/50 shadow-inner">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-base font-bold text-neutral-title">综合能力分 = 基础分 + 潜力分</h3>
                      <p className="text-[13px] text-neutral-caption mt-1">当前等级分 <span className="text-[#3b82f6] font-bold">424</span> 预计下月可升级 V3</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 text-[11px] text-neutral-caption hover:text-[#3b82f6]">
                      指标详情 &gt;
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-[220px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                          <PolarGrid stroke="#e5e7eb" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                          <Radar name="当前分数" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="w-[140px] space-y-4">
                      <div className="bg-white p-3 rounded-[8px] shadow-sm border border-neutral-border/50">
                        <div className="text-[20px] font-bold text-neutral-title leading-none">400<span className="text-[12px] font-normal text-neutral-caption ml-1">/1000</span></div>
                        <div className="text-[11px] text-neutral-caption mt-1">基础成长分</div>
                      </div>
                      <div className="bg-white p-3 rounded-[8px] shadow-sm border border-neutral-border/50">
                        <div className="text-[20px] font-bold text-[#3b82f6] leading-none">24<span className="text-[12px] font-normal text-neutral-caption ml-1">/100</span></div>
                        <div className="text-[11px] text-neutral-caption mt-1">项目附加分</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Learning Goals & Analysis Module */}
          <div className="bg-white rounded-[16px] shadow-sm border border-neutral-border overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-border flex items-center justify-between">
              <h3 className="text-base font-bold text-neutral-title">当前等级 <span className="text-[#3b82f6] font-bold mx-1">6项</span> 核心能力</h3>
              <button className="text-[13px] text-neutral-caption hover:text-[#3b82f6] transition-colors flex items-center gap-1">
                查看全部等级能力 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-2 border-b border-neutral-border flex gap-8 px-6 overflow-x-auto no-scrollbar bg-neutral-bg/30">
              {["全部", "编程开发", "算法研究", "数据分析", "工程落地", "业务理解"].map((tab, i) => (
                <button 
                  key={i} 
                  className={cn(
                    "py-3 text-[14px] font-medium transition-all relative",
                    i === 0 ? "text-[#3b82f6]" : "text-neutral-body hover:text-neutral-title"
                  )}
                >
                  {tab}
                  {i === 0 && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6]" />}
                </button>
              ))}
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { title: "跨平台架构搭建", desc: "主导过 2 个以上跨平台核心业务模块开发", icon: Shield, bg: "bg-blue-50", color: "text-blue-500" },
                  { title: "大模型参数微调", desc: "掌握 LoRA、P-Tuning 等微调技术路线", icon: Zap, bg: "bg-blue-50", color: "text-orange-500" },
                  { title: "高性能并发调优", desc: "具备百万级并发场景下的系统性能调优能力", icon: Briefcase, bg: "bg-green-50", color: "text-green-500" },
                  { title: "行业解决方案设计", desc: "能够针对垂直行业提出完整的AI落地链路", icon: Award, bg: "bg-purple-50", color: "text-purple-500" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group cursor-pointer">
                    <div className={cn("w-12 h-12 rounded-[12px] flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", item.bg, item.color)}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-[15px] font-bold text-neutral-title mb-1 group-hover:text-[#3b82f6] transition-colors">{item.title}</h4>
                      <p className="text-[12px] text-neutral-caption leading-relaxed line-clamp-2">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Goal Analysis Banner */}
              <div className="mt-12 p-8 bg-[#eff6ff] rounded-[16px] border border-[#dbeafe] relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="absolute left-10 bottom-0 w-24 h-24 bg-[#3b82f6]/5 rounded-full -ml-12 -mb-12 blur-xl" />
                
                <div className="shrink-0 relative z-10">
                  <div className="w-20 h-20 bg-white rounded-full p-1.5 shadow-md">
                    <div className="w-full h-full bg-[#3b82f6] rounded-full flex items-center justify-center text-white text-3xl">
                      🎯
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 relative z-10 text-center md:text-left">
                  <h3 className="text-xl font-bold text-neutral-title mb-2">升级 V3 可获得更多挑战与奖励 ❤️</h3>
                  <p className="text-[14px] text-neutral-body">您的学习进度已超过全国 <span className="text-[#3b82f6] font-bold">85%</span> 的开发者，完成以下目标即可晋升下一阶段：</p>
                  <div className="flex flex-wrap gap-4 mt-6">
                    <div className="flex items-center gap-2 px-6 py-2 bg-white rounded-full text-[13px] text-neutral-title border border-[#dbeafe] shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-green-500" /> 完成 2 个高级实战项目
                    </div>
                    <div className="flex items-center gap-2 px-6 py-2 bg-white rounded-full text-[13px] text-neutral-title border border-[#dbeafe] shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-blue-500" /> 获得 PMP 专业认证或等效评价
                    </div>
                  </div>
                </div>

                <div className="shrink-0 relative z-10">
                   <Button size="lg" className="bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white font-bold px-8 h-12 rounded-xl shadow-lg shadow-[#3b82f6]/20">
                     去学习吧
                   </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
