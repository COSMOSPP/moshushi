import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ChevronRight, 
  ChevronDown, 
  ChevronLeft,
  Users,
  Star,
  MessageSquare,
  Code,
  BarChart,
  Palette,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserAISkills() {
  const skills = [
    {
      title: "写作助手",
      desc: "AI驱动的智能写作，帮助您快速生成高质量文章、报告和邮件。",
      icon: MessageSquare,
      color: "text-blue-500 bg-blue-50",
      uses: "12K",
      rating: 4.9,
      tag: "对话类"
    },
    {
      title: "代码助手",
      desc: "代码生成与优化，支持多种编程语言，提升开发效率。",
      icon: Code,
      color: "text-gray-700 bg-gray-100",
      uses: "8K",
      rating: 4.8,
      tag: "代码类"
    },
    {
      title: "数据分析助手",
      desc: "自动分析数据并生成可视化图表，让数据洞察更简单。",
      icon: BarChart,
      color: "text-emerald-500 bg-emerald-50",
      uses: "5K",
      rating: 4.7,
      tag: "分析类"
    },
    {
      title: "图像识别助手",
      desc: "智能图像识别与分类，快速提取图片中的关键信息。",
      icon: Palette,
      color: "text-amber-500 bg-amber-50",
      uses: "15K",
      rating: 4.9,
      tag: "图像类"
    },
    {
      title: "翻译助手",
      desc: "支持多语言互译，提供准确、流畅的翻译结果。",
      icon: MessageSquare,
      color: "text-indigo-500 bg-indigo-50",
      uses: "20K",
      rating: 4.8,
      tag: "对话类"
    },
    {
      title: "Bug调试专家",
      desc: "智能分析错误日志，快速定位并提供修复建议。",
      icon: Code,
      color: "text-red-500 bg-red-50",
      uses: "6K",
      rating: 4.9,
      tag: "代码类"
    },
    {
      title: "文案创作大师",
      desc: "一键生成吸引人的营销文案、社交媒体帖子和广告语。",
      icon: Palette,
      color: "text-pink-500 bg-pink-50",
      uses: "9K",
      rating: 4.6,
      tag: "创意类"
    },
    {
      title: "个性化学习计划",
      desc: "根据您的学习目标和进度，量身定制高效的学习路径。",
      icon: BookOpen,
      color: "text-purple-500 bg-purple-50",
      uses: "3K",
      rating: 4.8,
      tag: "学习类"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#f5f6f8] relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-neutral-title">Skills库</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-start gap-4">
          <span className="text-[14px] text-neutral-body font-medium whitespace-nowrap mt-1.5">功能分类</span>
          <div className="flex flex-wrap gap-2">
            {["全部", "对话", "代码", "数据分析", "创意设计", "学习"].map((tag, i) => (
              <button 
                key={i}
                className={cn(
                  "px-4 py-1.5 rounded-full text-[13px] transition-colors",
                  i === 0 ? "bg-[#3b82f6] text-white" : "bg-white border border-neutral-border text-neutral-body hover:text-[#3b82f6] hover:border-[#3b82f6]"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center bg-white rounded-full p-1 border border-neutral-border">
          <button className="px-6 py-1.5 rounded-full text-[14px] font-medium bg-[#f5f6f8] text-neutral-title">
            最新
          </button>
          <button className="px-6 py-1.5 rounded-full text-[14px] font-medium text-neutral-body hover:text-neutral-title">
            最热
          </button>
        </div>
        
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-caption" />
          <Input 
            placeholder="输入Skills名称搜索" 
            className="pl-9 h-10 text-[14px] rounded-full border-neutral-border bg-white focus-visible:ring-[#3b82f6]" 
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 gap-6 min-h-0">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto pr-2 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {skills.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <div key={i} className="bg-white rounded-[12px] overflow-hidden border border-neutral-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col p-6 cursor-pointer">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={cn("w-12 h-12 rounded-[12px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110", skill.color)}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[16px] font-bold text-neutral-title mb-1 truncate group-hover:text-[#3b82f6] transition-colors">
                          {skill.title}
                        </h3>
                        <p className="text-[13px] text-neutral-caption line-clamp-2">
                          {skill.desc}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-[13px] text-neutral-body mt-auto pt-4 border-t border-neutral-border mb-4">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-[#faad14] fill-[#faad14]" />
                        <span className="font-medium text-neutral-title">{skill.rating}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-neutral-caption" />
                        <span>{skill.uses}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-neutral-caption" />
                        <span>{skill.tag}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full h-9 text-[13px] rounded-[8px] bg-white border border-neutral-border text-neutral-title hover:bg-neutral-bg hover:text-[#3b82f6] hover:border-[#3b82f6] transition-colors">
                      立即使用
                    </Button>
                  </div>
                );
              })}
            </div>

            {/* Load More / Pagination */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-[4px] border border-neutral-border text-neutral-caption hover:text-[#3b82f6] hover:border-[#3b82f6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-[4px] bg-[#3b82f6] text-white font-medium">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-[4px] border border-neutral-border text-neutral-body hover:text-[#3b82f6] hover:border-[#3b82f6] transition-colors">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-[4px] border border-neutral-border text-neutral-body hover:text-[#3b82f6] hover:border-[#3b82f6] transition-colors">3</button>
                <span className="px-2 text-neutral-caption">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded-[4px] border border-neutral-border text-neutral-body hover:text-[#3b82f6] hover:border-[#3b82f6] transition-colors">5</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-[4px] border border-neutral-border text-neutral-body hover:text-[#3b82f6] hover:border-[#3b82f6] transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-4 text-[13px] text-neutral-body">
                <div className="flex items-center gap-2">
                  <span>每页</span>
                  <button className="flex items-center gap-1 px-2 py-1 border border-neutral-border rounded-[4px] hover:border-[#3b82f6] transition-colors">
                    20 <ChevronDown className="w-3 h-3" />
                  </button>
                  <span>条</span>
                </div>
                <span>共 156 个Skills</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
