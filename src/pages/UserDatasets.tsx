import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ChevronRight, 
  ChevronDown, 
  ChevronLeft,
  Database,
  FileText,
  ImageIcon,
  Video,
  HardDrive,
  Clock,
  MoreVertical,
  Plus,
  X,
  UploadCloud,
  CheckCircle,
  AlertCircle,
  Check,
  Star,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import DatasetDetail from "@/components/DatasetDetail";

export default function UserDatasets() {
  const location = useLocation();
  const [selectedDataset, setSelectedDataset] = useState<any>(location.state?.dataset || null);

  useEffect(() => {
    if (location.state?.dataset) {
      setSelectedDataset(location.state.dataset);
    }
  }, [location.state]);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('全部');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Form State for Create Drawer (Matching TeacherDatasets style)
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formScope, setFormScope] = useState<'私有' | '公开'>('公开');
  const [formType, setFormType] = useState('文本');
  const [formTags, setFormTags] = useState<string[]>([]);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [customTagInput, setCustomTagInput] = useState('');
  const [availableDatasetTags, setAvailableDatasetTags] = useState<string[]>([
    'CV', 'NLP', '推荐系统', '医疗影像', '自动驾驶', '语音识别', '大模型', '表格挖掘'
  ]);
  const [formFile, setFormFile] = useState<File | null>(null);

  const typeDropdownRef = useRef<HTMLDivElement>(null);
  const tagDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target as Node)) {
        setIsTypeDropdownOpen(false);
      }
      if (tagDropdownRef.current && !tagDropdownRef.current.contains(event.target as Node)) {
        setIsTagDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddCustomTag = () => {
    const trimmed = customTagInput.trim();
    if (!trimmed) return;
    if (!formTags.includes(trimmed)) {
      setFormTags([...formTags, trimmed]);
    }
    if (!availableDatasetTags.includes(trimmed)) {
      setAvailableDatasetTags([...availableDatasetTags, trimmed]);
    }
    setCustomTagInput('');
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const [datasets, setDatasets] = useState([
    {
      id: 1,
      title: "电商用户行为分析数据",
      desc: "包含超过10万条电商平台用户的浏览、点击、购买等行为日志数据，适用于推荐系统训练。",
      type: "表格",
      size: "1.2 GB",
      updated: "2026-03-15",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
      tags: ["数据分析", "推荐系统", "表格数据"],
      favorites: 428,
      applications: "1,250",
      icon: Database,
      color: "bg-blue-50 text-blue-500"
    },
    {
      id: 2,
      title: "医疗影像识别样本库",
      desc: "高质量的X光和MRI影像数据集，已由专业医生标注，用于训练医疗影像辅助诊断模型。",
      type: "图像",
      size: "4.5 GB",
      updated: "2026-03-12",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80",
      tags: ["CV", "医疗影像", "图像样本"],
      favorites: 512,
      applications: "2,180",
      icon: ImageIcon,
      color: "bg-emerald-50 text-emerald-500"
    },
    {
      id: 3,
      title: "智能客服对话语料",
      desc: "真实场景下的客服对话记录，经过脱敏处理，包含意图分类和情感倾向标注。",
      type: "文本",
      size: "850 MB",
      updated: "2026-03-10",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=80",
      tags: ["NLP", "对话语料", "文本语料"],
      favorites: 319,
      applications: "960",
      icon: FileText,
      color: "bg-purple-50 text-purple-500"
    },
    {
      id: 4,
      title: "自动驾驶路况视频集",
      desc: "涵盖多种天气和光照条件下的城市道路行驶视频，包含车辆、行人、交通标志的边界框标注。",
      type: "视频",
      size: "12.8 GB",
      updated: "2026-03-08",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&auto=format&fit=crop&q=80",
      tags: ["自动驾驶", "CV", "视频音频"],
      favorites: 640,
      applications: "3,410",
      icon: Video,
      color: "bg-blue-50 text-orange-500"
    },
    {
      id: 5,
      title: "金融风控特征数据",
      desc: "包含用户信用评分、交易历史、设备指纹等多维特征，用于构建反欺诈和信用评估模型。",
      type: "表格",
      size: "2.1 GB",
      updated: "2026-03-05",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80",
      tags: ["金融风控", "表格挖掘", "表格数据"],
      favorites: 275,
      applications: "1,120",
      icon: Database,
      color: "bg-blue-50 text-blue-500"
    },
    {
      id: 6,
      title: "商品评论情感分析集",
      desc: "来自各大电商平台的商品评价文本，带有正向、负向、中性情感标签。",
      type: "文本",
      size: "420 MB",
      updated: "2026-03-01",
      image: "https://images.unsplash.com/photo-1556742049-0a67daf64f42?w=600&auto=format&fit=crop&q=80",
      tags: ["NLP", "情感分析", "文本语料"],
      favorites: 189,
      applications: "850",
      icon: FileText,
      color: "bg-purple-50 text-purple-500"
    },
    {
      id: 7,
      title: "大语言模型微调指令集",
      desc: "涵盖多领域高质量Prompt-Response对，专门用于大语言模型SFT指令微调。",
      type: "文本",
      size: "1.5 GB",
      updated: "2026-02-28",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
      tags: ["大模型", "SFT", "Prompt"],
      favorites: 890,
      applications: "4,200",
      icon: FileText,
      color: "bg-purple-50 text-purple-500"
    },
    {
      id: 8,
      title: "工业缺陷检测高分辨率图像集",
      desc: "包含各类金属与塑料表面划痕、孔洞、裂纹缺陷的高清晰度工业相机采集图。",
      type: "图像",
      size: "6.2 GB",
      updated: "2026-02-25",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80",
      tags: ["工业质检", "CV", "图像样本"],
      favorites: 450,
      applications: "1,560",
      icon: ImageIcon,
      color: "bg-emerald-50 text-emerald-500"
    }
  ]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      showToast('数据集名称不能为空', 'error');
      return;
    }

    const newDs = {
      id: Date.now(),
      title: formName,
      desc: formDesc || '暂无描述信息',
      type: formType,
      size: formFile ? `${(formFile.size / 1024 / 1024).toFixed(1)} MB` : '1.0 MB',
      updated: new Date().toISOString().split('T')[0],
      image: formType === '图像' ? "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80" : formType === '文本' ? "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=80" : formType === '视频' ? "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&auto=format&fit=crop&q=80" : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
      tags: formTags.length > 0 ? formTags : [formType, "常用"],
      favorites: 0,
      applications: "0",
      icon: formType === '图像' ? ImageIcon : formType === '文本' ? FileText : formType === '视频' ? Video : Database,
      color: formType === '图像' ? 'bg-emerald-50 text-emerald-500' : formType === '文本' ? 'bg-purple-50 text-purple-500' : formType === '视频' ? 'bg-blue-50 text-orange-500' : 'bg-blue-50 text-blue-500'
    };

    setDatasets([newDs, ...datasets]);
    setIsCreateDrawerOpen(false);
    setFormName('');
    setFormDesc('');
    setFormScope('公开');
    setFormType('文本');
    setFormTags([]);
    setIsTypeDropdownOpen(false);
    setIsTagDropdownOpen(false);
    setFormFile(null);
    showToast('数据集创建成功');
  };

  const filteredDatasets = datasets.filter(ds => {
    const matchesSearch = ds.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ds.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === '全部' || ds.type === selectedType || 
                        (selectedType === '表格数据' && ds.type === '表格') || 
                        (selectedType === '文本语料' && ds.type === '文本') || 
                        (selectedType === '图像样本' && ds.type === '图像') || 
                        (selectedType === '视频音频' && (ds.type === '视频' || ds.type === '音频'));
    return matchesSearch && matchesType;
  });

  if (selectedDataset) {
    return (
      <div className="-m-6">
        <DatasetDetail dataset={selectedDataset} onBack={() => setSelectedDataset(null)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#f5f6f8] relative text-left">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[9999] bg-white border border-neutral-200/80 shadow-xl rounded-[6px] px-4 py-3 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {toast.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
          <span className="text-[14px] font-medium text-neutral-800">{toast.message}</span>
        </div>
      )}

      {/* Banner */}
      <div className="w-full h-40 mb-8 rounded-[16px] overflow-hidden relative group shrink-0 shadow-sm bg-gradient-to-r from-[#3b82f6] to-[#ff8c3a] flex items-center px-10 justify-between">
         <div className="text-white relative z-10">
            <h1 className="text-2xl font-bold mb-2">公共数据集广场</h1>
            <p className="text-[14px] text-white/80 max-w-2xl mb-4">这里汇聚了用户上传的公开数据集，您可以将数据集添加到项目中进行处理、微调与分析。</p>
            <div className="flex gap-4">
              <Button variant="outline" className="h-9 px-4 rounded-[6px] text-white border-white/30 bg-white/10 hover:bg-white hover:text-[#3b82f6]">
                了解更多
              </Button>
            </div>
         </div>
         
         <Database className="absolute right-32 -bottom-10 w-48 h-48 text-white/10 transform rotate-12" />
      </div>

      {/* Header - Referencing Student Projects module style */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-neutral-title">全部数据集</h1>
        </div>
        <Button 
          className="bg-[#3b82f6] hover:bg-[#2563eb] text-white flex items-center gap-2 shadow-sm h-10 px-6 rounded-[4px] font-bold border-0 cursor-pointer text-[14px]"
          onClick={() => setIsCreateDrawerOpen(true)}
        >
          <Plus className="w-4 h-4" /> 新建数据集
        </Button>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {["全部", "表格数据", "文本语料", "图像样本", "视频音频"].map((tag) => (
              <button 
                key={tag}
                onClick={() => setSelectedType(tag)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-[13px] transition-colors font-medium border cursor-pointer",
                  selectedType === tag 
                    ? "bg-[#3b82f6] text-white border-[#3b82f6]" 
                    : "bg-white border-neutral-200 text-neutral-700 hover:text-[#3b82f6] hover:border-[#3b82f6]"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input 
            type="text"
            placeholder="搜索数据集名称" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-1.5 text-[13px] rounded-full border border-neutral-200 bg-white focus:outline-none focus:border-[#3b82f6] w-full h-9 transition-all"
          />
        </div>
      </div>

      {/* Main Cards Grid */}
      <div className="flex-1 pr-2 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDatasets.map((dataset, i) => {
            const Icon = dataset.icon || Database;
            return (
              <div 
                key={i} 
                onClick={() => setSelectedDataset(dataset)} 
                className="bg-white rounded-[12px] overflow-hidden border border-neutral-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col cursor-pointer"
              >
                {/* Cover Image Container with Fallback Header */}
                <div className="relative aspect-video overflow-hidden bg-[#f0f2f5] flex items-center justify-center">
                  <div className={cn("absolute inset-0 flex items-center justify-center transition-colors", dataset.color || "bg-blue-50 text-[#3b82f6]")}>
                    <Icon className="w-10 h-10 opacity-30" />
                  </div>
                  <img 
                    src={dataset.image} 
                    alt={dataset.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 relative z-10"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Content Area */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-[16px] font-bold text-neutral-title mb-2 line-clamp-1 group-hover:text-[#3b82f6] transition-colors">
                    {dataset.title}
                  </h3>
                  
                  <p className="text-[13px] text-neutral-caption mb-3 line-clamp-1">
                    {dataset.desc}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {dataset.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-[#f5f6f8] text-neutral-body text-[12px] rounded-[4px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Bottom Stats: Citations (引用) Count & Favorites Count */}
                  <div className="mt-auto pt-3 border-t border-neutral-border flex items-center justify-between text-[12px] text-neutral-caption">
                    <div className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-neutral-caption" />
                      <span>{dataset.applications} 次引用</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#faad14] fill-[#faad14]" />
                      <span className="text-[#faad14] font-medium">{dataset.favorites} 收藏</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end p-4 gap-4 mt-8">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-7 w-7 p-0 rounded-[4px]" disabled>&lt;</Button>
            <Button variant="outline" size="sm" className="h-7 w-7 p-0 rounded-[4px] bg-[#3b82f6] text-white border-[#3b82f6]">1</Button>
            <Button variant="outline" size="sm" className="h-7 w-7 p-0 rounded-[4px]">2</Button>
            <Button variant="outline" size="sm" className="h-7 w-7 p-0 rounded-[4px]">3</Button>
            <span className="px-1 text-neutral-caption text-[13px]">...</span>
            <Button variant="outline" size="sm" className="h-7 w-7 p-0 rounded-[4px]">&gt;</Button>
          </div>
          <div className="relative bg-white rounded-[6px]">
            <select className="appearance-none text-[13px] border border-neutral-200 hover:border-[#3b82f6]/60 focus:border-[#3b82f6] rounded-[6px] pl-3 pr-8 py-1 focus:outline-none text-neutral-600 bg-white cursor-pointer h-7 transition-colors min-w-[95px] shadow-sm">
              <option className="bg-white">10 条/页</option>
              <option className="bg-white">20 条/页</option>
              <option className="bg-white">50 条/页</option>
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Drawer: Create Dataset (Right-side Drawer referencing Teacher Datasets module) */}
      {isCreateDrawerOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/45 backdrop-blur-[2px] flex justify-end animate-fade-in"
          onClick={() => setIsCreateDrawerOpen(false)}
        >
          <div 
            className="bg-white w-full max-w-[600px] h-screen flex flex-col shadow-2xl border-l border-neutral-100 animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50 shrink-0">
              <h2 className="text-[16px] font-bold text-neutral-800">
                新建数据集
              </h2>
              <button 
                onClick={() => setIsCreateDrawerOpen(false)}
                className="text-neutral-400 hover:text-[#3b82f6] p-1.5 hover:bg-neutral-100 rounded-[4px] transition-colors border-0 bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-[13px]">
              <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                <label className="text-[13px] font-bold text-neutral-400 text-right">
                  名称 <span className="text-[#3b82f6]">*</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="请输入数据集名称"
                  className="w-full border border-neutral-200 rounded px-3.5 py-2 text-[13px] focus:outline-none focus:border-[#3b82f6] transition-all text-neutral-800"
                />
              </div>

              <div className="grid grid-cols-[80px_1fr] items-start gap-4">
                <label className="text-[13px] font-bold text-neutral-400 text-right pt-2">
                  描述
                </label>
                <textarea
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="描述数据集的内容、用途及注意事项..."
                  className="w-full h-24 border border-neutral-200 rounded px-3.5 py-2 text-[13px] focus:outline-none focus:border-[#3b82f6] transition-all text-neutral-800 resize-none"
                />
              </div>

              {/* 权限 (描述下方) */}
              <div className="grid grid-cols-[80px_1fr] items-start gap-4">
                <label className="text-[13px] font-bold text-neutral-400 text-right pt-1.5">
                  权限 <span className="text-[#3b82f6]">*</span>
                </label>
                <div>
                  <div className="flex items-center gap-6 pt-1">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-[13px] font-medium text-neutral-800">
                      <input 
                        type="radio" 
                        name="userDatasetScope" 
                        value="私有" 
                        checked={formScope === '私有'} 
                        onChange={() => setFormScope('私有')}
                        className="accent-[#3b82f6] w-4 h-4 cursor-pointer"
                      />
                      <span>私有</span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer text-[13px] font-medium text-neutral-800">
                      <input 
                        type="radio" 
                        name="userDatasetScope" 
                        value="公开" 
                        checked={formScope === '公开'} 
                        onChange={() => setFormScope('公开')}
                        className="accent-[#3b82f6] w-4 h-4 cursor-pointer"
                      />
                      <span>公开</span>
                    </label>
                  </div>
                  {formScope === '公开' && (
                    <div className="mt-2.5 text-[12px] text-amber-600 bg-amber-50/70 border border-amber-200/80 rounded px-3 py-1.5 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>公开数据集被引用后不可改回私有</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 当权限为公开时，才显示类型和标签 */}
              {formScope === '公开' && (
                <>
                  {/* 类型下拉 (参考教师端新建数据集/新建课程模块风格) */}
                  <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                    <label className="text-[13px] font-bold text-[#262626] text-right">
                      类型 <span className="text-[#3b82f6]">*</span>
                    </label>
                    <div ref={typeDropdownRef} className="relative w-full text-[13px]">
                      <div
                        onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                        className={cn(
                          "min-h-[38px] w-full border rounded-[4px] px-3.5 py-2 flex items-center justify-between transition-all text-[#262626] bg-white cursor-pointer select-none",
                          isTypeDropdownOpen ? "border-[#3b82f6] ring-1 ring-[#3b82f6]/25 shadow-[0_0_0_2px_rgba(59, 130, 246,0.1)]" : "border-neutral-200 hover:border-neutral-300"
                        )}
                      >
                        <span>{formType}</span>
                        <ChevronDown 
                          className={cn("w-4 h-4 transition-transform duration-200 text-neutral-400", isTypeDropdownOpen && "rotate-180")} 
                          strokeWidth={1.5}
                        />
                      </div>

                      {/* 类型下拉菜单 */}
                      {isTypeDropdownOpen && (
                        <div className="absolute left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-[4px] shadow-lg z-[150] overflow-hidden flex flex-col py-1 animate-in fade-in slide-in-from-top-1 duration-150">
                          <div className="max-h-[220px] overflow-y-auto custom-scrollbar">
                            {[
                              { label: '文本', value: '文本' },
                              { label: '图像', value: '图像' },
                              { label: '视频', value: '视频' },
                              { label: '音频', value: '音频' },
                              { label: '其他', value: '其他' },
                            ].map(opt => {
                              const isSelected = formType === opt.value;
                              return (
                                <div
                                  key={opt.value}
                                  onClick={() => {
                                    setFormType(opt.value);
                                    setIsTypeDropdownOpen(false);
                                  }}
                                  className={cn(
                                    "px-4 py-2.5 text-left text-[13px] transition-colors cursor-pointer flex items-center justify-between",
                                    isSelected 
                                      ? "bg-blue-50 text-[#3b82f6] font-bold"
                                      : "text-neutral-700 hover:bg-blue-50/40 hover:text-neutral-900"
                                  )}
                                >
                                  <span className="font-medium">{opt.label}</span>
                                  {isSelected && (
                                    <Check className="w-3.5 h-3.5 text-[#3b82f6]" strokeWidth={2.5} />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 标签及下拉 (参考教师端新建数据集/新建课程模块风格) */}
                  <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                    <label className="text-[13px] font-bold text-[#262626] text-right">
                      标签
                    </label>
                    <div ref={tagDropdownRef} className="relative w-full text-[13px]">
                      <div
                        onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                        className={cn(
                          "min-h-[38px] w-full border rounded-[4px] px-3.5 py-1.5 flex flex-wrap items-center gap-1.5 transition-all text-[#262626] bg-white cursor-pointer select-none",
                          isTagDropdownOpen ? "border-[#3b82f6] ring-1 ring-[#3b82f6]/25 shadow-[0_0_0_2px_rgba(59, 130, 246,0.1)]" : "border-neutral-200 hover:border-neutral-300"
                        )}
                      >
                        {formTags.length === 0 ? (
                          <span className="text-neutral-400 select-none">请选择数据集标签</span>
                        ) : (
                          <div className="flex flex-wrap gap-1.5 items-center w-full pr-8">
                            {formTags.map(tag => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold border transition-all bg-neutral-50 text-neutral-600 border-neutral-200"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
                                <span>{tag}</span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFormTags(formTags.filter(t => t !== tag));
                                  }}
                                  className="hover:bg-black/10 rounded-[4px] p-0.5 transition-colors cursor-pointer text-current flex items-center justify-center border-0 bg-transparent"
                                >
                                  <X className="w-2.5 h-2.5" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* 右侧下拉箭头 */}
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                          <ChevronDown 
                            className={cn("w-4 h-4 transition-transform duration-200 text-neutral-400", isTagDropdownOpen && "rotate-180")} 
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>

                      {/* 标签下拉菜单 */}
                      {isTagDropdownOpen && (
                        <div className="absolute left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-[4px] shadow-lg z-[150] overflow-hidden flex flex-col py-1 animate-in fade-in slide-in-from-top-1 duration-150">
                          {/* 自定义标签添加栏 */}
                          <div className="px-3 py-2 border-b border-neutral-100 flex items-center gap-2 bg-neutral-50/50" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="text"
                              value={customTagInput}
                              onChange={(e) => setCustomTagInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddCustomTag();
                                }
                              }}
                              placeholder="自定义标签按回车添加..."
                              className="flex-1 border border-neutral-200 rounded px-2.5 py-1 text-[12px] focus:outline-none focus:border-[#3b82f6] bg-white text-neutral-800"
                            />
                            <button
                              type="button"
                              onClick={handleAddCustomTag}
                              className="px-2.5 py-1 text-[12px] bg-[#3b82f6] text-white rounded hover:bg-[#2563eb] transition-colors shrink-0 font-medium cursor-pointer"
                            >
                              添加
                            </button>
                          </div>

                          {/* 标签选项列表 */}
                          <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                            {availableDatasetTags.map(tag => {
                              const isSelected = formTags.includes(tag);
                              return (
                                <div
                                  key={tag}
                                  onClick={() => {
                                    if (isSelected) {
                                      setFormTags(formTags.filter(t => t !== tag));
                                    } else {
                                      setFormTags([...formTags, tag]);
                                    }
                                  }}
                                  className={cn(
                                    "px-4 py-2.5 text-left text-[13px] transition-colors cursor-pointer flex items-center justify-between",
                                    isSelected 
                                      ? "bg-blue-50 text-[#3b82f6] font-bold"
                                      : "text-neutral-700 hover:bg-blue-50/40 hover:text-neutral-900"
                                  )}
                                >
                                  <span className="font-medium">{tag}</span>
                                  {isSelected && (
                                    <Check className="w-3.5 h-3.5 text-[#3b82f6]" strokeWidth={2.5} />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Upload Area */}
              <div className="grid grid-cols-[80px_1fr] items-start gap-4">
                <label className="text-[13px] font-bold text-neutral-400 text-right pt-2">
                  文件上传
                </label>
                <div className="border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50/50 p-6 flex flex-col items-center justify-center text-center group hover:border-[#3b82f6] hover:bg-[#eff6ff]/30 transition-all cursor-pointer relative">
                  <input 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setFormFile(e.target.files[0]);
                      }
                    }}
                  />
                  {formFile ? (
                    <>
                      <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-3">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <p className="text-[13px] font-bold text-neutral-800">{formFile.name}</p>
                      <p className="text-[12px] text-neutral-500 mt-1">{(formFile.size / 1024 / 1024).toFixed(2)} MB • 点击重新上传</p>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-white shadow-sm border border-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mb-3 group-hover:text-[#3b82f6] group-hover:scale-110 transition-all">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <p className="text-[13px] font-bold text-neutral-800">点击上传或将文件拖拽到这里</p>
                      <p className="text-[12px] text-neutral-500 mt-1">支持 zip, tar, csv, json, txt 等格式，单个文件不超过 5GB</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-end gap-3 shrink-0">
              <Button 
                onClick={() => setIsCreateDrawerOpen(false)} 
                variant="outline" 
                className="border-neutral-200 text-neutral-600 h-9 px-6 rounded-[4px] text-[13px] bg-white cursor-pointer hover:bg-neutral-50 transition-colors font-semibold"
              >
                取消
              </Button>
              <Button 
                onClick={handleCreateSubmit} 
                className="bg-[#3b82f6] hover:bg-[#2563eb] text-white h-9 px-8 rounded-[4px] shadow-sm text-[13px] border-0 cursor-pointer transition-colors font-semibold"
              >
                确认
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
