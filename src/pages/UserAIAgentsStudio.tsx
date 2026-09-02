import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, Send, Paperclip, Mic, Settings, Clock, 
  CheckCircle2, Circle, Search, FileCode, Folder,
  Download, Maximize2, FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserAIAgentsStudio() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    setInputValue("");
  };

  return (
    <div className="flex flex-1 min-h-0 w-full bg-[#f5f6f8] overflow-hidden gap-4 p-4">
      
      {/* Left Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-white rounded-[12px] shadow-sm border border-neutral-border overflow-hidden">
        
        {/* Header */}
        <header className="h-14 bg-white border-b border-neutral-border flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-title transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <h1 className="text-[16px] font-bold text-neutral-title">超级智能体</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-[6px] hover:bg-neutral-100 text-neutral-caption transition-colors">
              <Clock className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-[6px] hover:bg-neutral-100 text-neutral-caption transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </header>
          
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* User Message */}
          <div className="flex justify-end mb-6">
             <div className="px-5 py-3.5 rounded-[16px] max-w-[80%] text-[14px] leading-relaxed shadow-sm bg-[#3b82f6] text-white rounded-tr-[4px]">
               mcp是什么
             </div>
          </div>

          {/* AI Response Block */}
          <div className="flex flex-col gap-6 max-w-[90%]">
             
            {/* Thinking / initial reply */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#eff6ff] flex items-center justify-center shrink-0">
                <span className="text-[#3b82f6] font-bold text-[18px] mb-1">+</span>
              </div>
              <div className="flex-1 mt-1">
                <div className="font-bold text-[14px] text-neutral-title mb-2">翼小问</div>
                <div className="text-[14px] text-neutral-body leading-relaxed">
                  没问题，我会为您详细解释 MCP (Model Context Protocol, 模型上下文协议) 的定义、核心价值以及它的工作原理。请稍等，我为您整理一份说明。
                </div>
                <div className="text-[12px] text-neutral-caption mt-2 uppercase">
                  GEMINI-1.5-PRO • 15:55
                </div>
              </div>
            </div>

            {/* Task Process Panel */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#eff6ff] flex items-center justify-center shrink-0">
                <span className="text-[#3b82f6] font-bold text-[18px] mb-1">+</span>
              </div>
              <div className="flex-1 mt-1">
                <div className="font-bold text-[14px] text-neutral-title mb-4">翼小问</div>
                <div className="text-[14px] text-neutral-body leading-relaxed mb-4">
                  您好，我已经为您整理了关于 模型上下文协议 (Model Context Protocol, MCP) 的详细解释文档。MCP 是一种开放标准，旨在解决大型语言模型 (LLM) 与外部系统、工具 and 数据源之间交互的标准化问题，是 AI 领域实现更强大、更可靠 AI 代理的关键基础设施。请查阅附件中的 Markdown 文档，其中详细介绍了 MCP 的核心定义、架构原理 (客户端-服务器模式) 以及主要的应用场景。如果您对其中任何部分有疑问，欢迎随时提出。
                </div>

                {/* Workflow Steps */}
                <div className="space-y-4 text-[13px]">
                  
                  {/* Step 1 */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[#3b82f6] font-medium">
                      <CheckCircle2 className="w-4 h-4 fill-current text-white bg-[#3b82f6] rounded-full" />
                      <span>深入研究并整理MCP的核心定义与架构原理</span>
                    </div>
                    <div className="pl-6 space-y-2 border-l-2 border-neutral-100 ml-2 py-1">
                      <div className="text-neutral-caption">接下来专注研究MCP的定义、架构 and 应用，为下一步详细说明做准备</div>
                      <div className="flex items-center gap-2 bg-[#f5f6f8] px-3 py-2 rounded-[6px] text-neutral-body">
                         <Search className="w-3.5 h-3.5 text-neutral-caption" />
                         <span>正在搜索 Model Context Protocol (MCP) definition, MCP 协议 架构, 模型上下文协议 应用</span>
                      </div>
                      <div className="flex items-center gap-2 bg-[#f5f6f8] px-3 py-2 rounded-[6px] text-neutral-body">
                         <FileCode className="w-3.5 h-3.5 text-neutral-caption" />
                         <span>正在创建文件 <span className="font-bold text-blue-600">mcp_explanation.md</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[#3b82f6] font-medium">
                      <CheckCircle2 className="w-4 h-4 fill-current text-white bg-[#3b82f6] rounded-full" />
                      <span>编写并交付 MCP 详细说明文档</span>
                    </div>
                    <div className="pl-6 space-y-4 border-l-2 border-transparent ml-2 py-1">
                      <div className="text-neutral-body leading-relaxed">
                        通过搜索了解到，MCP (模型上下文协议) 是一种开放标准，用于连接AI应用与外部系统，实现双向、标准化通信。采用客户端-服务器架构，支持工具和数据源集成。下一步整理详细架构 and 应用场景。
                      </div>
                      
                      {/* Attached Files */}
                      <div className="flex gap-4">
                        {/* File Card 1 (Active) */}
                        <div className="flex items-center gap-3 p-3 rounded-[8px] border-2 border-[#3b82f6] bg-[#eff6ff] min-w-[200px] cursor-pointer shadow-sm">
                          <div className="w-10 h-10 rounded-[6px] bg-[#3b82f6]/10 flex items-center justify-center text-[#3b82f6]">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-[13px] font-bold text-neutral-title mb-0.5">mcp_explanation.md</div>
                            <div className="text-[11px] text-neutral-caption uppercase tracking-wider">MARKDOWN 文档</div>
                          </div>
                        </div>

                        {/* File Card 2 */}
                        <div className="flex items-center gap-3 p-3 rounded-[8px] border border-neutral-200 bg-white hover:border-[#3b82f6] hover:shadow-sm cursor-pointer transition-all min-w-[200px]">
                          <div className="w-10 h-10 rounded-[6px] bg-[#f5f6f8] flex items-center justify-center text-neutral-title">
                            <Folder className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-[13px] font-bold text-neutral-title mb-0.5">查看此任务的全部文件</div>
                            <div className="text-[11px] text-neutral-caption uppercase tracking-wider">包含资源文件库</div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                <div className="text-[12px] text-neutral-caption mt-4 uppercase">
                  GEMINI-1.5-PRO • 15:55
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Input Area */}
        <div className="shrink-0 p-4 bg-white border-t border-neutral-border z-10 w-full">
          <div className="border border-neutral-200 rounded-[12px] p-3 bg-[#fdfdfd] focus-within:border-[#3b82f6] focus-within:ring-1 focus-within:ring-[#3b82f6]/20 transition-all shadow-sm flex flex-col gap-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="请输入您的问题..."
              className="w-full max-h-[300px] min-h-[50px] bg-transparent border-none outline-none resize-none px-1 text-[14px] text-neutral-title placeholder:text-neutral-caption leading-relaxed"
              rows={2}
            />
            
            <div className="flex items-center justify-between w-full">
              <button className="p-1.5 text-neutral-caption hover:text-neutral-title hover:bg-neutral-100 rounded-[8px] transition-colors shrink-0 flex items-center justify-center">
                <Paperclip className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-2 shrink-0">
                <button className="p-1.5 text-neutral-caption hover:text-neutral-title hover:bg-neutral-100 rounded-[8px] transition-colors flex items-center justify-center">
                  <Mic className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="flex items-center justify-center w-8 h-8 bg-[#3b82f6] text-white rounded-[8px] hover:bg-[#e64a19] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Document Preview Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-white rounded-[12px] shadow-sm border border-neutral-border overflow-hidden">
        
        {/* Header */}
        <header className="h-14 bg-white border-b border-neutral-100 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-[4px] bg-[#e6f4ff] flex items-center justify-center text-[#1677ff]">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-[14px] font-bold text-neutral-title">mcp_explanation.md</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-[6px] hover:bg-neutral-100 text-neutral-caption transition-colors">
              <Download className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-[6px] hover:bg-neutral-100 text-neutral-caption transition-colors">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Markdown Content Panel */}
        <div className="flex-1 overflow-y-auto p-10 bg-white">
          <div className="max-w-[800px] mx-auto prose prose-neutral">
            <h1 className="text-3xl font-bold mb-6 text-neutral-title">模型上下文协议 (MCP) 详解</h1>
            
            <p className="text-neutral-body text-[15px] leading-relaxed mb-8">
              MCP 是由 Anthropic、Google 等公司共同推动的开放协议...
            </p>

            <h3 className="text-xl font-bold mb-4 mt-8 text-neutral-title">1. 核心定义</h3>
            <p className="text-neutral-body text-[15px] leading-relaxed mb-6">
              MCP 旨在为 AI 代理提供一个统一的“连接器”。
            </p>

            <h3 className="text-xl font-bold mb-4 mt-8 text-neutral-title">2. 架构模式</h3>
            <p className="text-neutral-body text-[15px] leading-relaxed mb-4">
              采用典型的 Client-Server 架构：
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-8 text-neutral-body text-[15px] marker:text-neutral-400">
              <li><strong className="text-neutral-title font-bold">Client:</strong> 如 Claude, IDEALFLOW</li>
              <li><strong className="text-neutral-title font-bold">Server:</strong> 如数据库、Google Search 工具</li>
            </ul>

            <h3 className="text-xl font-bold mb-4 mt-8 text-neutral-title">3. 主要价值</h3>
            <p className="text-neutral-body text-[15px] leading-relaxed mb-6">
              降低集成成本，提升 AI 工具调用的可靠性。
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
