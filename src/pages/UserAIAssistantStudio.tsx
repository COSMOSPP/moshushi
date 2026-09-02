import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  Send, 
  Paperclip, 
  Mic, 
  Database,
  ChevronDown,
  Settings,
  Bot
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Switch({ defaultChecked, className }: { defaultChecked?: boolean, className?: string }) {
  const [checked, setChecked] = useState(defaultChecked || false);
  return (
    <button 
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => setChecked(!checked)}
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-[#3b82f6]" : "bg-neutral-200",
        className
      )}
    >
      <span
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform",
          checked ? "translate-x-4" : "translate-x-0"
        )}
      />
    </button>
  );
}

export default function UserAIAssistantStudio() {
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '你好！我是你的客服助手，有什么可以帮到你的吗？'
    },
    {
      role: 'user',
      content: '我想把这个旧的生命周期方法转换成 useEffect hooks，能帮我看看吗？\n\ncomponentDidMount() {\n  this.fetchData();\n}'
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const [metadataState, setMetadataState] = useState<'auto' | 'manual' | 'disabled'>('disabled');
  const [similarity, setSimilarity] = useState(0.6);
  const [vectorWeight, setVectorWeight] = useState(0.7);
  const [topN, setTopN] = useState(8);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    setMessages([...messages, { role: 'user', content: inputValue }]);
    setInputValue("");
  };

  return (
    <div className="flex flex-1 min-h-0 w-full bg-white overflow-hidden">
      
      {/* Left Area (Header + Chat) */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        
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
              <h1 className="text-[16px] font-bold text-neutral-title">项目代码重构咨询</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-[12px] text-neutral-body font-medium">DeepSeek-V3</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-[6px] hover:bg-neutral-100 text-neutral-body transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </header>
          
        {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex justify-center mb-6">
              <span className="px-3 py-1 bg-neutral-50 border border-neutral-200 rounded-full text-[12px] text-neutral-caption flex items-center gap-1.5 shadow-sm">
                <Settings className="w-3.5 h-3.5" /> System Prompt Active
              </span>
            </div>

            {messages.map((msg, idx) => (
              <div key={idx} className={cn("flex gap-4", msg.role === 'user' ? "justify-end" : "justify-start")}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-[#eff6ff] flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-[#3b82f6]" />
                  </div>
                )}
                
                <div 
                  className={cn(
                    "px-5 py-3.5 rounded-[16px] max-w-[80%] text-[14px] leading-relaxed shadow-sm",
                    msg.role === 'user' 
                      ? "bg-[#3b82f6] text-white rounded-tr-[4px]" 
                      : "bg-white border border-neutral-border text-neutral-title rounded-tl-[4px]"
                  )}
                >
                  <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 border border-neutral-200">
                    <div className="w-4 h-4 rounded-full bg-neutral-300" /> {/* User avatar placeholder */}
                  </div>
                )}
              </div>
            ))}
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
                placeholder="输入消息，Shift + Enter 换行..."
                className="w-full max-h-[300px] min-h-[90px] bg-transparent border-none outline-none resize-none px-1 text-[14px] text-neutral-title placeholder:text-neutral-caption leading-relaxed"
                rows={4}
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
            <div className="text-center mt-3 text-[12px] text-neutral-caption">
              AI 生成的内容可能包含错误，请注意甄别。
            </div>
          </div>
        </div>

        {/* Right Configuration Sidebar */}
        <div className="w-[340px] bg-white border-l border-neutral-border shrink-0 flex flex-col overflow-hidden min-h-0">
          <div className="flex-1 overflow-y-auto p-5 pb-8 space-y-8">
            
            {/* Knowledge Base Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2 text-[14px] font-bold text-neutral-title group-hover:text-[#3b82f6] transition-colors">
                  <Database className="w-4 h-4" /> 检索知识
                </div>
                <ChevronDown className="w-4 h-4 text-neutral-caption group-hover:text-[#3b82f6] transition-colors" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[13px] text-neutral-body">
                  <span>关联知识库</span>
                  <span className="font-medium">2 已选</span>
                </div>
                
                <div className="flex items-center justify-between border border-neutral-200 rounded-[8px] px-3 py-2 text-[13px] text-neutral-title hover:border-[#3b82f6] cursor-pointer bg-[#fafafa]">
                  <span>已选择 2 个知识库</span>
                  <ChevronDown className="w-4 h-4 text-neutral-caption" />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-[#eff6ff] text-[#3b82f6] rounded-[4px] text-[12px] flex items-center gap-1">
                    前端开发规范 <span className="cursor-pointer font-bold hover:text-red-500">×</span>
                  </span>
                  <span className="px-2.5 py-1 bg-[#eff6ff] text-[#3b82f6] rounded-[4px] text-[12px] flex items-center gap-1">
                    API 接口定义 <span className="cursor-pointer font-bold hover:text-red-500">×</span>
                  </span>
                </div>
              </div>

              {/* Metadata state */}
              <div className="space-y-2 pt-2">
                <div className="text-[13px] text-neutral-title font-medium">元数据状态</div>
                <div className="flex p-1 bg-[#f5f6f8] rounded-[8px]">
                  {(['auto', 'manual', 'disabled'] as const).map(state => (
                    <button
                      key={state}
                      onClick={() => setMetadataState(state)}
                      className={cn(
                        "flex-1 text-[13px] py-1.5 rounded-[6px] transition-colors font-medium",
                        metadataState === state 
                          ? (state === 'disabled' ? "bg-white text-neutral-title shadow-sm" : "bg-white text-[#3b82f6] shadow-sm") 
                          : "text-neutral-caption hover:text-neutral-title"
                      )}
                    >
                      {state === 'auto' && '自动'}
                      {state === 'manual' && '手动'}
                      {state === 'disabled' && '禁用'}
                    </button>
                  ))}
                </div>
                <div className="text-[12px] text-neutral-caption">启用后将携带上下文元数据进行检索。</div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="text-[13px] text-neutral-title font-medium">Tavily API Key</div>
                <Input type="password" placeholder="tvly-..." className="h-9 text-[13px] focus-visible:ring-[#3b82f6]" />
                <div className="text-right text-[12px] text-[#3b82f6] cursor-pointer hover:underline">获取 API Key</div>
              </div>
            </div>

            <hr className="border-neutral-100" />

            {/* Toggles */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-neutral-title font-medium">多轮对话优化</span>
                <Switch defaultChecked className="data-[state=checked]:bg-[#3b82f6]" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-neutral-title">使用知识图谱</span>
                <Switch className="data-[state=checked]:bg-[#3b82f6]" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-neutral-title">推理功能</span>
                <Switch className="data-[state=checked]:bg-[#3b82f6]" />
              </div>
            </div>

            <hr className="border-neutral-100" />

            {/* Sliders */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-[13px]">
                  <span className="text-neutral-title font-medium">相似度阈值</span>
                  <span className="text-[#3b82f6] font-mono">{similarity}</span>
                </div>
                <input 
                  type="range" min="0" max="1" step="0.1" 
                  value={similarity} onChange={(e) => setSimilarity(Number(e.target.value))}
                  className="w-full accent-[#3b82f6] h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-[13px]">
                  <span className="text-neutral-title font-medium">向量权重</span>
                  <span className="text-[#3b82f6] font-mono">{vectorWeight}</span>
                </div>
                <input 
                  type="range" min="0" max="1" step="0.1" 
                  value={vectorWeight} onChange={(e) => setVectorWeight(Number(e.target.value))}
                  className="w-full accent-[#3b82f6] h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-[13px]">
                  <span className="text-neutral-title font-medium">Top N</span>
                  <span className="text-[#3b82f6] font-mono">{topN}</span>
                </div>
                <input 
                  type="range" min="1" max="20" step="1" 
                  value={topN} onChange={(e) => setTopN(Number(e.target.value))}
                  className="w-full accent-[#3b82f6] h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-2 pt-2">
                <div className="text-[13px] text-neutral-title font-medium">Rerank 模型</div>
                <div className="flex items-center justify-between border border-neutral-200 rounded-[8px] px-3 py-2 text-[13px] text-neutral-title hover:border-[#3b82f6] cursor-pointer bg-[#fafafa]">
                  <span className="font-mono">BGE-Reranker-v2-m3</span>
                  <ChevronDown className="w-4 h-4 text-neutral-caption" />
                </div>
              </div>
            </div>
            
          </div>

          {/* Sticky Save Button */}
          <div className="p-4 bg-white border-t border-neutral-border shrink-0 z-10 w-full bg-white">
            <Button className="w-full bg-[#3b82f6] hover:bg-[#e64a19] text-white flex items-center gap-2">
              <Database className="w-4 h-4" /> 保存配置
            </Button>
          </div>
      </div>
    </div>
  );
}
