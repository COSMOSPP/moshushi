import React, { useState } from 'react';
import { ChevronLeft, CloudUpload, File, X, Info, ShieldCheck, HardDrive, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface DatasetUploadProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
}

export default function DatasetUpload({ onBack, onSubmit }: DatasetUploadProps) {
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    type: '表格数据',
    tags: [] as string[],
    isPublic: true,
  });
  const [tagInput, setTagInput] = useState('');
  const [files, setFiles] = useState<{name: string; size: string}[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Helper functions
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const simulateFileUpload = () => {
     setFiles([
       { name: "train_data.csv", size: "128 MB" },
       { name: "validation_data.csv", size: "32 MB" }
     ]);
  };

  return (
    <div className="flex flex-col h-full bg-[#f5f6f8] relative w-[100vw] left-1/2 -translate-x-1/2 -mt-6">
       <div className="h-16 bg-white border-b border-neutral-border px-6 flex items-center justify-between shrink-0 shadow-sm relative z-10 w-full">
         <div className="max-w-4xl mx-auto w-full flex items-center gap-4">
           <Button variant="ghost" onClick={onBack} className="text-neutral-caption hover:text-neutral-title hover:bg-neutral-100 h-9 px-3 gap-1 flex">
             <ChevronLeft className="w-5 h-5 -ml-1" /> 返回发现页
           </Button>
           <div className="h-6 w-px bg-neutral-border"></div>
           <h1 className="font-bold text-[18px] text-neutral-title">创建与发布数据集</h1>
         </div>
       </div>

       <div className="flex-1 overflow-y-auto w-full pb-20">
          <div className="max-w-4xl mx-auto mt-8 bg-white border border-neutral-border rounded-[16px] shadow-sm overflow-hidden">
             
             {/* Header */}
             <div className="p-8 border-b border-neutral-border bg-gradient-to-r from-blue-50/50 to-transparent">
                <h2 className="text-2xl font-bold text-neutral-title">填写数据集信息</h2>
                <p className="text-[14px] text-neutral-caption mt-2 flex items-center gap-1.5 line-clamp-2">
                  <Info className="w-4 h-4 text-[#3b82f6]" /> 我们极力推崇开源精神，您上传的公共数据集将被成千上万的开发者所利用并挂载至他们的模型项目中。
                </p>
             </div>

             <div className="p-8 space-y-8">
                {/* Form fields */}
                <div className="space-y-3">
                   <label className="text-[14px] font-bold text-neutral-title">数据集名称 <span className="text-red-500">*</span></label>
                   <Input 
                     value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                     placeholder="例如：电商用户行为十万级分析底座" 
                     className="max-w-md h-11 text-[14px] focus-visible:ring-[#3b82f6]" 
                   />
                </div>

                <div className="space-y-3">
                   <label className="text-[14px] font-bold text-neutral-title flex items-center gap-2">
                     数据集背景、用途及组成描述 <span className="text-red-500">*</span>
                   </label>
                   <textarea 
                     value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})}
                     className="w-full h-32 p-4 text-[14px] bg-white border border-neutral-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] resize-none"
                     placeholder="描述这段数据的来源、清洗方式、支持的任务类型（如：分类、回归、生成）等，尽量控制在 50-500 字内。"
                   />
                </div>

                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-3">
                     <label className="text-[14px] font-bold text-neutral-title">数据集类别 / 模态</label>
                     <select 
                       value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}
                       className="w-full h-11 px-4 text-[14px] bg-white border border-neutral-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                     >
                       {["表格数据", "文本语料", "图像样本", "视频音频", "图数据集", "其他结构化数据"].map(t => (
                         <option key={t} value={t}>{t}</option>
                       ))}
                     </select>
                   </div>
                   
                   <div className="space-y-3">
                     <label className="text-[14px] font-bold text-neutral-title">自定义分类标签</label>
                     <div className="flex gap-2">
                        <Input 
                          value={tagInput} 
                          onChange={e => setTagInput(e.target.value)} 
                          onKeyDown={e => e.key === 'Enter' && addTag()}
                          placeholder="输入后回车添加" 
                          className="h-11 text-[14px] focus-visible:ring-[#3b82f6]" 
                        />
                        <Button onClick={addTag} variant="outline" className="h-11 px-4 border-[#3b82f6] text-[#3b82f6] hover:bg-[#eff6ff]">添加</Button>
                     </div>
                     <div className="flex flex-wrap gap-2 pt-2">
                        {formData.tags.map(tag => (
                          <span key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-neutral-100 text-neutral-title text-[13px] rounded-full border border-neutral-200">
                            {tag} <X className="w-3.5 h-3.5 text-neutral-caption hover:text-red-500 cursor-pointer" onClick={() => removeTag(tag)}/>
                          </span>
                        ))}
                     </div>
                   </div>
                </div>

                {/* Upload Zone */}
                <div className="space-y-3 pt-4 border-t border-neutral-100">
                   <label className="text-[14px] font-bold text-neutral-title flex items-center gap-2">
                     <HardDrive className="w-5 h-5 text-neutral-caption" /> 本地数据集文件上传 <span className="text-red-500">*</span>
                   </label>
                   
                   <div 
                     onClick={simulateFileUpload}
                     onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                     onDragLeave={() => setIsDragging(false)}
                     onDrop={(e) => { e.preventDefault(); setIsDragging(false); simulateFileUpload(); }}
                     className={cn(
                       "w-full h-48 border-2 border-dashed rounded-[12px] flex flex-col items-center justify-center cursor-pointer transition-all",
                       isDragging ? "border-[#3b82f6] bg-[#eff6ff]" : "border-neutral-300 bg-[#fafafa] hover:bg-neutral-50 hover:border-[#3b82f6]/50"
                     )}
                   >
                     <CloudUpload className={cn("w-12 h-12 mb-3 transition-colors", isDragging ? "text-[#3b82f6]" : "text-neutral-300")} />
                     <p className="text-[15px] font-bold text-neutral-title mb-1">
                       点击我 或 将目标文件拖拽至此处
                     </p>
                     <p className="text-[13px] text-neutral-caption">
                       支持 ZIP / CSV / JSON / TAR.GZ 格式归档。单次总计不超过 20GB。
                     </p>
                   </div>

                   {/* Uploaded Files Queue */}
                   {files.length > 0 && (
                     <div className="mt-4 space-y-2">
                       {files.map((f, i) => (
                         <div key={i} className="flex justify-between items-center p-3 bg-white border border-neutral-200 rounded-[8px] shadow-sm">
                           <div className="flex items-center gap-3">
                              <File className="w-5 h-5 text-[#3b82f6]" />
                              <div>
                                <span className="font-bold text-[14px] text-neutral-title">{f.name}</span>
                                <div className="text-[12px] text-neutral-caption">{f.size} - 校验成功</div>
                              </div>
                           </div>
                           <Button variant="ghost" onClick={(e) => { e.stopPropagation(); setFiles(files.filter(x => x !== f)); }} className="h-8 w-8 p-0 text-neutral-400 hover:text-red-500">
                              <X className="w-4 h-4" />
                           </Button>
                         </div>
                       ))}
                     </div>
                   )}
                </div>

                {/* Visibility */}
                <div className="space-y-3 pt-4 border-t border-neutral-100">
                   <label className="text-[14px] font-bold text-neutral-title flex items-center gap-2">可见范围权限</label>
                   <div className="flex gap-4">
                     <label onClick={() => setFormData({...formData, isPublic: true})} className={cn(
                        "flex items-center gap-3 p-4 flex-1 border rounded-[8px] cursor-pointer transition-colors",
                        formData.isPublic ? "border-[#3b82f6] bg-[#eff6ff]" : "border-neutral-200 bg-white"
                     )}>
                        <input type="radio" checked={formData.isPublic} readOnly className="accent-[#3b82f6] w-4 h-4" />
                        <div>
                          <div className="font-bold text-[14px] text-neutral-title flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> 公开 (Public)</div>
                          <div className="text-[12px] text-neutral-caption mt-0.5">允许平台任何人检索和使用此数据集作为训练底层支撑</div>
                        </div>
                     </label>

                     <label onClick={() => setFormData({...formData, isPublic: false})} className={cn(
                        "flex items-center gap-3 p-4 flex-1 border rounded-[8px] cursor-pointer transition-colors",
                        !formData.isPublic ? "border-[#3b82f6] bg-[#eff6ff]" : "border-neutral-200 bg-white"
                     )}>
                        <input type="radio" checked={!formData.isPublic} readOnly className="accent-[#3b82f6] w-4 h-4" />
                        <div>
                          <div className="font-bold text-[14px] text-neutral-title text-[#3b82f6]">私有 (Private)</div>
                          <div className="text-[12px] text-neutral-caption mt-0.5">仅在您的账户沙盒可见，不可进行任何共享</div>
                        </div>
                     </label>
                   </div>
                </div>

                <div className="pt-8">
                   <Button 
                     onClick={() => onSubmit(formData)}
                     className="w-full h-12 text-[16px] font-bold rounded-[8px] bg-[#3b82f6] hover:bg-[#1d4ed8] text-white shadow-lg"
                   >
                     完成填写，正式发布数据集
                   </Button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
