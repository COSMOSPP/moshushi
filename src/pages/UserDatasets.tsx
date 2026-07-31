import React, { useState } from "react";
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
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import DatasetDetail from "@/components/DatasetDetail";

export default function UserDatasets() {
  const [selectedDataset, setSelectedDataset] = useState<any>(null);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('全部');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Form State for Create Drawer
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formType, setFormType] = useState('表格');
  const [formTags, setFormTags] = useState('');
  const [formFile, setFormFile] = useState<File | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const [datasets, setDatasets] = useState([
    {
      title: "电商用户行为分析数据",
      desc: "包含超过10万条电商平台用户的浏览、点击、购买等行为日志数据，适用于推荐系统训练。",
      type: "表格",
      size: "1.2 GB",
      updated: "2026-03-15",
      icon: Database,
      color: "text-blue-500 bg-blue-50"
    },
    {
      title: "医疗影像识别样本库",
      desc: "高质量的X光和MRI影像数据集，已由专业医生标注，用于训练医疗影像辅助诊断模型。",
      type: "图像",
      size: "4.5 GB",
      updated: "2026-03-12",
      icon: ImageIcon,
      color: "text-emerald-500 bg-emerald-50"
    },
    {
      title: "智能客服对话语料",
      desc: "真实场景下的客服对话记录，经过脱敏处理，包含意图分类和情感倾向标注。",
      type: "文本",
      size: "850 MB",
      updated: "2026-03-10",
      icon: FileText,
      color: "text-purple-500 bg-purple-50"
    },
    {
      title: "自动驾驶路况视频集",
      desc: "涵盖多种天气和光照条件下的城市道路行驶视频，包含车辆、行人、交通标志的边界框标注。",
      type: "视频",
      size: "12.8 GB",
      updated: "2026-03-08",
      icon: Video,
      color: "text-orange-500 bg-orange-50"
    },
    {
      title: "金融风控特征数据",
      desc: "包含用户信用评分、交易历史、设备指纹等多维特征，用于构建反欺诈和信用评估模型。",
      type: "表格",
      size: "2.1 GB",
      updated: "2026-03-05",
      icon: Database,
      color: "text-blue-500 bg-blue-50"
    },
    {
      title: "商品评论情感分析集",
      desc: "来自各大电商平台的商品评价文本，带有正向、负向、中性情感标签。",
      type: "文本",
      size: "420 MB",
      updated: "2026-03-01",
      icon: FileText,
      color: "text-purple-500 bg-purple-50"
    }
  ]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      showToast('数据集名称不能为空', 'error');
      return;
    }

    const newDs = {
      title: formName,
      desc: formDesc || '暂无描述信息',
      type: formType,
      size: formFile ? `${(formFile.size / 1024 / 1024).toFixed(1)} MB` : '1.0 MB',
      updated: new Date().toISOString().split('T')[0],
      icon: formType === '图像' ? ImageIcon : formType === '文本' ? FileText : formType === '视频' ? Video : Database,
      color: formType === '图像' ? 'text-emerald-500 bg-emerald-50' : formType === '文本' ? 'text-purple-500 bg-purple-50' : formType === '视频' ? 'text-orange-500 bg-orange-50' : 'text-blue-500 bg-blue-50'
    };

    setDatasets([newDs, ...datasets]);
    setIsCreateDrawerOpen(false);
    setFormName('');
    setFormDesc('');
    setFormType('表格');
    setFormTags('');
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
    return <DatasetDetail dataset={selectedDataset} onBack={() => setSelectedDataset(null)} />;
  }

  return (
    <div className="flex flex-col bg-[#f5f6f8] relative text-left">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-6 right-6 z-[200] bg-white border border-neutral-200/80 shadow-xl rounded-[6px] px-4 py-3 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {toast.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
          <span className="text-[14px] font-medium text-neutral-800">{toast.message}</span>
        </div>
      )}

      {/* Banner */}
      <div className="w-full h-40 mb-8 rounded-[16px] overflow-hidden relative group shrink-0 shadow-sm bg-gradient-to-r from-[#fa541c] to-[#ff8c3a] flex items-center px-10 justify-between">
         <div className="text-white relative z-10">
            <h1 className="text-2xl font-bold mb-2">公共数据集广场</h1>
            <p className="text-[14px] text-white/80 max-w-2xl mb-4">这里汇聚了用户上传的公开数据集，您可以将数据集添加到项目中进行处理、微调与分析。</p>
            <div className="flex gap-4">
              <Button variant="outline" className="h-9 px-4 rounded-[6px] text-white border-white/30 bg-white/10 hover:bg-white hover:text-[#fa541c]">
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
          className="bg-[#fa541c] hover:bg-[#e84a15] text-white flex items-center gap-2 shadow-sm h-10 px-6 rounded-[4px] font-bold border-0 cursor-pointer text-[14px]"
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
                    ? "bg-[#fa541c] text-white border-[#fa541c]" 
                    : "bg-white border-neutral-200 text-neutral-700 hover:text-[#fa541c] hover:border-[#fa541c]"
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
            className="pl-9 pr-4 py-1.5 text-[13px] rounded-full border border-neutral-200 bg-white focus:outline-none focus:border-[#fa541c] w-full h-9 transition-all"
          />
        </div>
      </div>

      {/* Main Cards Grid */}
      <div className="flex-1 pr-2 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDatasets.map((dataset, i) => {
            const Icon = dataset.icon;
            return (
              <div key={i} onClick={() => setSelectedDataset(dataset)} className="bg-white rounded-[12px] overflow-hidden border border-neutral-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col p-5 cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-12 h-12 rounded-[12px] flex items-center justify-center flex-shrink-0", dataset.color)}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold text-neutral-title mb-1 truncate group-hover:text-[#fa541c] transition-colors">
                        {dataset.title}
                      </h3>
                      <span className="inline-block px-2 py-0.5 rounded-[4px] bg-neutral-bg text-neutral-body text-[12px]">
                        {dataset.type}
                      </span>
                    </div>
                  </div>
                  <button className="text-neutral-caption hover:text-neutral-title p-1 rounded-[4px] hover:bg-neutral-bg opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-[13px] text-neutral-caption line-clamp-2 mb-4 flex-1">
                  {dataset.desc}
                </p>
                
                {/* Metric Area: Only Size & Updated Time (Items / 条数模块 deleted) */}
                <div className="grid grid-cols-2 gap-y-2 text-[13px] text-neutral-body mt-auto pt-4 border-t border-neutral-border/50 mb-4">
                  <div className="flex items-center gap-1.5">
                    <HardDrive className="w-4 h-4 text-neutral-caption" />
                    <span>{dataset.size}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-neutral-caption" />
                    <span>更新于 {dataset.updated}</span>
                  </div>
                </div>
                
                {/* Button Action Area: Only 查看详情 (Download / 下载按钮 deleted) */}
                <div className="flex items-center gap-2">
                  <Button 
                    onClick={(e) => { e.stopPropagation(); setSelectedDataset(dataset); }} 
                    className="w-full h-9 text-[13px] rounded-[4px] bg-[#fa541c] hover:bg-[#e84a15] text-white font-bold border-0 cursor-pointer shadow-sm transition-colors"
                  >
                    查看详情
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end p-4 gap-4 mt-8">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-7 w-7 p-0 rounded-[4px]" disabled>&lt;</Button>
            <Button variant="outline" size="sm" className="h-7 w-7 p-0 rounded-[4px] bg-[#fa541c] text-white border-[#fa541c]">1</Button>
            <Button variant="outline" size="sm" className="h-7 w-7 p-0 rounded-[4px]">2</Button>
            <Button variant="outline" size="sm" className="h-7 w-7 p-0 rounded-[4px]">3</Button>
            <span className="px-1 text-neutral-caption text-[13px]">...</span>
            <Button variant="outline" size="sm" className="h-7 w-7 p-0 rounded-[4px]">&gt;</Button>
          </div>
          <div className="relative bg-white rounded-[6px]">
            <select className="appearance-none text-[13px] border border-neutral-200 hover:border-[#fa541c]/60 focus:border-[#fa541c] rounded-[6px] pl-3 pr-8 py-1 focus:outline-none text-neutral-600 bg-white cursor-pointer h-7 transition-colors min-w-[95px] shadow-sm">
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

      {/* Drawer: Create Dataset (Right-side Drawer referencing Teacher Home Datasets module) */}
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
                className="text-neutral-400 hover:text-[#fa541c] p-1.5 hover:bg-neutral-100 rounded-full transition-colors border-0 bg-transparent cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-[13px]">
              <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                <label className="text-[13px] font-bold text-neutral-400 text-right">
                  名称 <span className="text-[#fa541c]">*</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="请输入数据集名称"
                  className="w-full border border-neutral-200 rounded px-3.5 py-2 text-[13px] focus:outline-none focus:border-[#fa541c] transition-all text-neutral-800"
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
                  className="w-full h-24 border border-neutral-200 rounded px-3.5 py-2 text-[13px] focus:outline-none focus:border-[#fa541c] transition-all text-neutral-800 resize-none"
                />
              </div>

              <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                <label className="text-[13px] font-bold text-neutral-400 text-right">
                  类型 <span className="text-[#fa541c]">*</span>
                </label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                  className="w-full border border-neutral-200 rounded px-3.5 py-2 text-[13px] focus:outline-none focus:border-[#fa541c] transition-all text-neutral-800 bg-white cursor-pointer"
                >
                  <option value="文本">文本数据集</option>
                  <option value="图像">图像数据集</option>
                  <option value="视频">视频数据集</option>
                  <option value="音频">音频数据集</option>
                  <option value="表格">表格数据集</option>
                  <option value="混合">混合数据集</option>
                  <option value="其他">其他数据集</option>
                </select>
              </div>

              <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                <label className="text-[13px] font-bold text-neutral-400 text-right">
                  标签
                </label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="输入标签，用逗号分隔（如：医疗, CV, 问答）"
                  className="w-full border border-neutral-200 rounded px-3.5 py-2 text-[13px] focus:outline-none focus:border-[#fa541c] transition-all text-neutral-800"
                />
              </div>

              {/* Upload Area */}
              <div className="grid grid-cols-[80px_1fr] items-start gap-4">
                <label className="text-[13px] font-bold text-neutral-400 text-right pt-2">
                  文件上传
                </label>
                <div className="border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50/50 p-6 flex flex-col items-center justify-center text-center group hover:border-[#fa541c] hover:bg-[#fff2e8]/30 transition-all cursor-pointer relative">
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
                      <div className="w-12 h-12 bg-white shadow-sm border border-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mb-3 group-hover:text-[#fa541c] group-hover:scale-110 transition-all">
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
                className="bg-[#fa541c] hover:bg-[#e84a15] text-white h-9 px-8 rounded-[4px] shadow-sm text-[13px] border-0 cursor-pointer transition-colors font-semibold"
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
