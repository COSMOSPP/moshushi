import React, { useState, useRef } from 'react';
import { 
  ChevronLeft, 
  Star,
  Download,
  Plus, 
  HardDrive, 
  Clock, 
  BookOpen, 
  HelpCircle,
  FileText,
  Box,
  X,
  Cpu,
  Check,
  Upload,
  ChevronDown,
  Bold,
  Italic,
  Type,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo2,
  Redo2,
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DatasetDetailProps {
  dataset: any;
  onBack: () => void;
}

export default function DatasetDetail({ dataset, onBack }: DatasetDetailProps) {
  const [activeMenu, setActiveMenu] = useState<'overview' | 'file'>('overview');
  const [showAddToProjectModal, setShowAddToProjectModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState('IL511785481462');

  // Drawer step & form states
  const [drawerStep, setDrawerStep] = useState<'select' | 'create'>('select');
  const [activeFormTab, setActiveFormTab] = useState<'basic' | 'env'>('basic');
  const [formName, setFormName] = useState('');
  const [formTags, setFormTags] = useState<string[]>([]);
  const [formDesc, setFormDesc] = useState('');
  const [formIntroduction, setFormIntroduction] = useState('');
  const [selectedCover, setSelectedCover] = useState('/shixunnew-v2/images/covers/microsoft_tech_ai_1779333317936.png');
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const tagDropdownRef = useRef<HTMLDivElement>(null);

  // Env tab state
  const [resourcePool, setResourcePool] = useState('天翼云资源池1');
  const [envType, setEnvType] = useState<'容器' | '云主机'>('容器');
  const [repoUploadMode, setRepoUploadMode] = useState<'manual' | 'upload'>('manual');
  const [formSourceRepoUrl, setFormSourceRepoUrl] = useState('');
  const [creationMethod, setCreationMethod] = useState<'template' | 'custom'>('template');
  const [templateValue, setTemplateValue] = useState('通用模板');

  const [projectList, setProjectList] = useState([
     { id: 'IL511785481462', name: 'IL511785481462' },
     { id: 'IL511773974443', name: 'IL511773974443' }
  ]);

  const defaultCovers = [
    '/shixunnew-v2/images/covers/microsoft_tech_ai_1779333317936.png',
    '/shixunnew-v2/images/covers/microsoft_tech_data_1779333332856.png',
    '/shixunnew-v2/images/covers/microsoft_tech_cloud_1779333396845.png',
    '/shixunnew-v2/images/covers/microsoft_tech_cyber_1779333412582.png',
    '/shixunnew-v2/images/covers/microsoft_tech_dev_1779333430898.png',
    '/shixunnew-v2/images/covers/microsoft_tech_ml_1779333449102.png',
  ];

  const availableTagsList = ['AI', '容器', '虚机', 'Java', 'Python', '数据分析', 'DevOps', '大模型'];

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-[#f5f5f5] w-[100vw] relative left-1/2 -translate-x-1/2 -mt-6">
      {/* Header / Banner - Kept intact as requested */}
      <div className="bg-white border-b border-neutral-border pt-8 pb-8 px-14 shadow-sm relative shrink-0 text-left">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-6">
             <div>
                <div className="flex items-center text-[13px] text-neutral-caption mb-4">
                  <button onClick={onBack} className="hover:text-[#fa541c] flex items-center gap-1 transition-colors border-0 bg-transparent cursor-pointer">
                    <ChevronLeft className="w-4 h-4" /> 返回数据集列表
                  </button>
                  <span className="mx-2">/</span>
                  <span className="text-neutral-title font-medium">{dataset.title}</span>
                </div>
                <div className="flex items-center gap-4 mb-3">
                   <h1 className="text-3xl font-bold text-neutral-title">{dataset.title}</h1>
                   <span className="px-2 py-1 bg-[#fff2e8] text-[#fa541c] text-[12px] font-bold rounded border border-[#ffbb96]">{dataset.type}</span>
                </div>
                <div className="flex items-center gap-6 text-[13px] text-neutral-body">
                   <div className="flex items-center gap-2">
                     <img src="https://i.pravatar.cc/150?u=1" alt="avatar" className="w-6 h-6 rounded-full" />
                     <span className="font-bold text-neutral-title">数据科学实验室</span>
                   </div>
                   <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-neutral-caption" /> {dataset.updated} 更新</div>
                   <div className="flex items-center gap-1.5"><HardDrive className="w-4 h-4 text-neutral-caption" /> 总容量: {dataset.size}</div>
                </div>
             </div>
             
             <div className="flex items-center gap-3">
                 {/* 收藏按钮 */}
                 <button 
                   onClick={() => setIsFavorited(!isFavorited)}
                   className={cn(
                     "flex items-center gap-1.5 px-4 h-9 rounded-full transition-all text-[13px] font-medium border shadow-sm cursor-pointer select-none",
                     isFavorited 
                       ? "bg-[#fa541c]/10 border-[#fa541c]/30 text-[#fa541c] hover:bg-[#fa541c]/20" 
                       : "bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200/90 hover:border-[#fa541c]/40 hover:text-[#fa541c]"
                   )}
                 >
                   <Star className={cn("w-4 h-4 transition-transform active:scale-95", isFavorited ? "text-[#fa541c] fill-[#fa541c]" : "text-neutral-400")} /> 
                   <span>{isFavorited ? '已收藏' : '收藏'}</span>
                 </button>

                 {/* 下载按钮 */}
                 <button 
                   className="flex items-center gap-1.5 px-4 h-9 rounded-full transition-all text-[13px] font-medium border border-neutral-200/90 bg-white hover:bg-neutral-50 text-neutral-700 hover:border-[#fa541c]/40 hover:text-[#fa541c] shadow-sm cursor-pointer select-none"
                 >
                   <Download className="w-4 h-4 text-neutral-400" />
                   <span>下载</span>
                 </button>

                 {/* 添加到项目按钮 - 参考 CourseDetail.tsx 加入课程按钮风格 */}
                 <button 
                   onClick={() => setShowAddToProjectModal(true)}
                   className="flex items-center gap-1.5 px-6 h-9 rounded-[8px] bg-gradient-to-r from-[#fa541c] to-[#ff7a45] hover:from-[#ff7a45] hover:to-[#ff9c6e] text-white shadow-md shadow-[#fa541c]/20 hover:shadow-[#fa541c]/30 font-bold text-[13px] transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer border-0 select-none"
                 >
                    <Plus className="w-4 h-4" />
                    <span>添加到项目</span>
                 </button>
             </div>
          </div>
          <p className="text-[14px] text-neutral-body max-w-4xl leading-relaxed">
             {dataset.desc} 当前版本汇集了最新采集的高精度特征数据，经清洗与脱敏处理，具备良好的统计分布特性。您可以直接在实验环境中挂载该数据集用于大模型训练与微调。
          </p>
        </div>
      </div>

      {/* Main Content Area - Matching the screenshot */}
      <div className="flex-1 max-w-7xl mx-auto w-full py-6 flex gap-6 px-4 items-stretch">
         {/* Left Sidebar: File list */}
         <div className="w-64 bg-white rounded-lg border border-neutral-200/80 shadow-sm flex flex-col shrink-0 overflow-hidden text-left">
            {/* Header */}
            <div className="px-4 py-3 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
               <span className="text-[13px] font-bold text-neutral-800">文件</span>
               <span className="text-[12px] text-neutral-400 font-mono">{dataset.size || '11 MB'}</span>
            </div>

            {/* Menu items */}
            <div className="p-2 space-y-1 flex-1">
               <button 
                  onClick={() => setActiveMenu('overview')}
                  className={cn(
                     "w-full px-3 py-2 rounded text-[13px] flex items-center gap-2.5 transition-colors cursor-pointer text-left border-0",
                     activeMenu === 'overview' 
                        ? "bg-[#fff2e8] text-[#fa541c] font-bold" 
                        : "hover:bg-neutral-50 text-neutral-700 font-medium bg-transparent"
                  )}
               >
                  <BookOpen className={cn("w-4 h-4 shrink-0", activeMenu === 'overview' ? "text-[#fa541c]" : "text-neutral-400")} />
                  <span>概览</span>
               </button>

               <button 
                  onClick={() => setActiveMenu('file')}
                  className={cn(
                     "w-full px-3 py-2 rounded text-[13px] flex items-center gap-2.5 transition-colors cursor-pointer text-left border-0",
                     activeMenu === 'file' 
                        ? "bg-[#fff2e8] text-[#fa541c] font-bold" 
                        : "hover:bg-neutral-50 text-neutral-600 font-medium bg-transparent"
                  )}
               >
                  <HelpCircle className={cn("w-4 h-4 shrink-0", activeMenu === 'file' ? "text-[#fa541c]" : "text-neutral-400")} />
                  <span className="truncate">mnist.npz</span>
               </button>
            </div>
         </div>

         {/* Right Main Content */}
         <div className="flex-1 bg-white rounded-lg border border-neutral-200/80 shadow-sm p-8 flex flex-col text-left min-h-[520px]">
            {activeMenu === 'overview' ? (
               <div>
                  {/* Title */}
                  <h2 className="text-[18px] font-bold text-neutral-900 flex items-center gap-2.5 mb-6">
                     <span className="w-[3.5px] h-4 bg-[#fa541c] rounded-full inline-block"></span>
                     <span>概览</span>
                  </h2>

                  {/* Paragraphs */}
                  <div className="space-y-3 text-[14px] text-neutral-700 leading-relaxed mb-6">
                     <p>This is classic MNIST dataset and pickled (in npz format).</p>
                     <p>To load this dataset in your code use following function</p>
                  </div>

                  {/* Code Block */}
                  <div className="bg-[#f8f9fa] border border-neutral-200/80 rounded-lg p-5 mb-6 font-mono text-[13px] text-neutral-800 leading-relaxed">
                     <pre className="m-0 p-0 font-mono text-[13px] leading-relaxed whitespace-pre font-normal text-neutral-800">
{`def load_data(path):
    with np.load(path) as f:
        x_train, y_train = f['x_train'], f['y_train']
        x_test, y_test = f['x_test'], f['y_test']
        return (x_train, y_train), (x_test, y_test)

(x_train, y_train), (x_test, y_test) = load_data('../input/mnist.npz')`}
                     </pre>
                  </div>

                  {/* Dataset Source */}
                  <div className="text-[14px] text-neutral-700 pt-2">
                     <span>Dataset source: </span>
                     <a 
                        href="https://storage.googleapis.com/tensorflow/tf-keras-datasets/mnist.npz" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#fa541c] hover:underline transition-colors font-medium"
                     >
                        https://storage.googleapis.com/tensorflow/tf-keras-datasets/mnist.npz
                     </a>
                  </div>
               </div>
            ) : (
               <div>
                  {/* File Detail Title */}
                  <h2 className="text-[18px] font-bold text-neutral-900 flex items-center gap-2.5 mb-6">
                     <span className="w-[3.5px] h-4 bg-[#fa541c] rounded-full inline-block"></span>
                     <span>mnist.npz</span>
                  </h2>

                  <div className="space-y-4 text-[13px] text-neutral-700">
                     <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200/60 space-y-2">
                        <div className="flex items-center gap-2 text-neutral-800 font-bold">
                           <FileText className="w-4 h-4 text-[#fa541c]" />
                           <span>文件名: mnist.npz</span>
                        </div>
                        <p className="text-neutral-500">文件大小: 11 MB • 格式: NumPy Archive (.npz)</p>
                        <p className="text-neutral-500">包含数组: x_train, y_train, x_test, y_test</p>
                     </div>

                     <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
                        <table className="w-full text-left border-collapse text-xs font-mono">
                           <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-bold">
                              <tr>
                                 <th className="p-3">数组名称</th>
                                 <th className="p-3">数据类型</th>
                                 <th className="p-3">维度 (Shape)</th>
                                 <th className="p-3">说明</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-neutral-100 text-neutral-700">
                              <tr>
                                 <td className="p-3 font-semibold text-neutral-800">x_train</td>
                                 <td className="p-3">uint8</td>
                                 <td className="p-3">(60000, 28, 28)</td>
                                 <td className="p-3">训练集手写数字图像</td>
                              </tr>
                              <tr>
                                 <td className="p-3 font-semibold text-neutral-800">y_train</td>
                                 <td className="p-3">uint8</td>
                                 <td className="p-3">(60000,)</td>
                                 <td className="p-3">训练集数字标签 (0-9)</td>
                              </tr>
                              <tr>
                                 <td className="p-3 font-semibold text-neutral-800">x_test</td>
                                 <td className="p-3">uint8</td>
                                 <td className="p-3">(10000, 28, 28)</td>
                                 <td className="p-3">测试集手写数字图像</td>
                              </tr>
                              <tr>
                                 <td className="p-3 font-semibold text-neutral-800">y_test</td>
                                 <td className="p-3">uint8</td>
                                 <td className="p-3">(10000,)</td>
                                 <td className="p-3">测试集数字标签 (0-9)</td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>

      {/* Drawer: Add to Project & Create Project Flow */}
      {showAddToProjectModal && (
        <div 
          className="fixed inset-0 z-[100] bg-black/45 backdrop-blur-[2px] flex justify-end animate-fade-in text-left"
          onClick={() => {
            setShowAddToProjectModal(false);
            setDrawerStep('select');
          }}
        >
          <div 
            className="bg-white w-full max-w-[680px] h-screen flex flex-col shadow-2xl border-l border-neutral-100 animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {drawerStep === 'select' ? (
              <>
                {/* Header */}
                <div className="px-6 py-4 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50 shrink-0">
                  <h2 className="text-[16px] font-bold text-[#262626] flex items-center gap-2">
                    <Plus className="w-5 h-5 text-[#fa541c]" />
                    将数据集添加到你的项目
                  </h2>
                  <button 
                    onClick={() => setShowAddToProjectModal(false)}
                    className="text-neutral-400 hover:text-[#fa541c] p-1.5 hover:bg-neutral-100 rounded-full transition-colors border-0 bg-transparent cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 text-[13px]">
                  <div className="text-[13px] text-neutral-600 font-medium bg-orange-50/50 border border-orange-100/80 rounded-[6px] p-3.5 leading-relaxed">
                    将数据集添加到已有项目，即可进入开发环境进行数据处理。
                  </div>

                  {/* Project Selection Items */}
                  <div className="space-y-3 pt-2">
                    <label className="text-[13px] font-bold text-neutral-700 block">
                      选择关联的项目 <span className="text-[#fa541c]">*</span>
                    </label>
                    {projectList.map((proj) => {
                      const isSelected = selectedProjectId === proj.id;
                      return (
                        <div 
                          key={proj.id}
                          onClick={() => setSelectedProjectId(proj.id)}
                          className={cn(
                            "px-5 py-3.5 rounded-[4px] flex items-center transition-all cursor-pointer select-none border",
                            isSelected 
                              ? "bg-[#fff2e8] border-[#ffbb96]" 
                              : "bg-[#f8f9fa] border-transparent hover:border-neutral-200"
                          )}
                        >
                          <span className="w-2 h-2 rounded-full bg-neutral-300 mr-3.5 shrink-0 inline-block"></span>
                          <div className={cn(
                            "w-8 h-8 rounded-[4px] flex items-center justify-center mr-3.5 shrink-0 transition-colors",
                            isSelected ? "bg-[#fa541c]/10 text-[#fa541c]" : "bg-neutral-200/60 text-neutral-500"
                          )}>
                            <Box className="w-4 h-4" />
                          </div>
                          <span className={cn(
                            "text-[14px] font-medium transition-colors",
                            isSelected ? "text-[#fa541c] font-semibold" : "text-neutral-800"
                          )}>
                            {proj.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-[13px] text-neutral-600 pt-4 border-t border-neutral-100">
                    没有合适的项目？ 试试{' '}
                    <button 
                      onClick={() => {
                        setDrawerStep('create');
                        setActiveFormTab('basic');
                      }} 
                      className="text-[#fa541c] hover:underline font-bold border-0 bg-transparent cursor-pointer p-0"
                    >
                      新建项目
                    </button>{' '}
                    关联当前数据集。
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-end gap-3 shrink-0">
                  <Button 
                    onClick={() => setShowAddToProjectModal(false)} 
                    variant="outline" 
                    className="border-neutral-200 text-neutral-600 h-9 px-6 rounded-[4px] text-[13px] bg-white cursor-pointer hover:bg-neutral-50 font-semibold"
                  >
                    取消
                  </Button>
                  <Button 
                    onClick={() => setShowAddToProjectModal(false)} 
                    className="bg-[#fa541c] hover:bg-[#e84a15] text-white h-9 px-8 rounded-[4px] shadow-sm text-[13px] border-0 cursor-pointer font-semibold"
                  >
                    确认
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Header for 新建实战项目 */}
                <div className="px-6 py-4 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50 shrink-0">
                  <h2 className="text-[16px] font-bold text-[#262626] flex items-center gap-2">
                    <Plus className="w-5 h-5 text-[#fa541c]" />
                    新建实战项目
                  </h2>
                  <button 
                    onClick={() => {
                      setDrawerStep('select');
                    }} 
                    className="text-neutral-400 hover:text-[#fa541c] p-1.5 hover:bg-neutral-100 rounded-[4px] transition-colors border-0 bg-transparent cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Modal Tab Headers for configurations */}
                <div className="flex border-b border-neutral-100 bg-neutral-50/20 text-[11px] font-bold select-none flex-shrink-0">
                  {[
                    { key: 'basic', label: '1. 基础信息', icon: BookOpen },
                    { key: 'env', label: '2. 项目环境', icon: Cpu }
                  ].map(tab => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveFormTab(tab.key as any)}
                      className={cn(
                        "flex-1 py-3 text-center border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 rounded-[4px]",
                        activeFormTab === tab.key 
                          ? "border-[#fa541c] text-[#fa541c] bg-white font-extrabold" 
                          : "border-transparent text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100/40"
                      )}
                    >
                      <tab.icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Modal Scrollable Content Forms */}
                <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6 bg-white text-[13px]">
                  {/* TAB 1: BASIC INFORMATION (Figure 1) */}
                  {activeFormTab === 'basic' && (
                    <div className="space-y-6 animate-fade-in py-2">
                      {/* 1. 项目名称 */}
                      <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                        <label className="text-[13px] font-bold text-[#262626] text-right">
                          项目名称 <span className="text-[#fa541c]">*</span>
                        </label>
                        <input 
                          type="text"
                          placeholder="请输入"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          className="w-full border border-neutral-200 rounded px-3.5 py-2 text-[13px] focus:outline-none focus:border-[#fa541c] transition-all text-[#262626]"
                        />
                      </div>

                      {/* 2. 标签 */}
                      <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                        <label className="text-[13px] font-bold text-[#262626] text-right">
                          标签
                        </label>
                        <div ref={tagDropdownRef} className="relative w-full text-[13px]">
                          <div
                            onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                            className={cn(
                              "min-h-[38px] w-full border rounded px-3.5 py-1.5 flex flex-wrap items-center gap-1.5 transition-all text-[#262626] bg-white cursor-pointer select-none",
                              isTagDropdownOpen ? "border-[#fa541c] ring-1 ring-[#fa541c]/25 shadow-[0_0_0_2px_rgba(250,84,28,0.1)]" : "border-neutral-200 hover:border-neutral-300"
                            )}
                          >
                            {formTags.length === 0 ? (
                              <span className="text-neutral-400 select-none">请选择项目标签</span>
                            ) : (
                              <div className="flex flex-wrap gap-1.5 items-center w-full pr-8">
                                {formTags.map(tag => (
                                  <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold border border-orange-200 bg-orange-50 text-orange-600">
                                    <span>{tag}</span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setFormTags(formTags.filter(t => t !== tag));
                                      }}
                                      className="hover:bg-black/10 rounded p-0.5 border-0 bg-transparent cursor-pointer text-current"
                                    >
                                      <X className="w-2.5 h-2.5" />
                                    </button>
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                              <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isTagDropdownOpen && "rotate-180")} strokeWidth={1.5} />
                            </div>
                          </div>

                          {isTagDropdownOpen && (
                            <div className="absolute left-0 right-0 mt-1 bg-white border border-neutral-200 rounded shadow-lg z-[150] overflow-hidden flex flex-col py-1">
                              <div className="max-h-[180px] overflow-y-auto">
                                {availableTagsList.map(tag => {
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
                                        "px-4 py-2 text-left text-[13px] transition-colors cursor-pointer flex items-center justify-between",
                                        isSelected ? "bg-orange-50 text-[#fa541c] font-bold" : "text-neutral-700 hover:bg-neutral-50"
                                      )}
                                    >
                                      <span>{tag}</span>
                                      {isSelected && <Check className="w-3.5 h-3.5 text-[#fa541c]" />}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 3. 项目描述 */}
                      <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                        <label className="text-[13px] font-bold text-[#262626] text-right">
                          项目描述 <span className="text-[#fa541c]">*</span>
                        </label>
                        <input 
                          type="text"
                          placeholder="请输入"
                          value={formDesc}
                          onChange={(e) => setFormDesc(e.target.value)}
                          className="w-full border border-neutral-200 rounded px-3.5 py-2 text-[13px] focus:outline-none focus:border-[#fa541c] transition-all text-[#262626]"
                        />
                      </div>

                      {/* 4. 项目图片 */}
                      <div className="grid grid-cols-[100px_1fr] items-start gap-4">
                        <label className="text-[13px] font-bold text-[#262626] text-right pt-1.5">
                          项目图片 <span className="text-[#fa541c]">*</span>
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {defaultCovers.map((cover, idx) => (
                            <div 
                              key={idx}
                              onClick={() => setSelectedCover(cover)}
                              className={cn(
                                "aspect-[5/2] rounded-[4px] overflow-hidden border-2 transition-all relative select-none cursor-pointer hover:border-[#fa541c]/50 hover:scale-[1.02]",
                                selectedCover === cover 
                                  ? "border-[#fa541c] shadow-md shadow-orange-500/10 scale-[1.02]" 
                                  : "border-transparent"
                              )}
                            >
                              <img src={cover} alt={`cover-${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              {selectedCover === cover && (
                                <div className="absolute top-2 right-2 bg-[#fa541c] text-white rounded-full p-0.5 shadow-md flex items-center justify-center w-5 h-5 animate-in zoom-in-50 duration-150">
                                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 5. 项目介绍 (富文本编辑框) */}
                      <div className="grid grid-cols-[100px_1fr] items-start gap-4">
                        <label className="text-[13px] font-bold text-[#262626] text-right pt-2">
                          项目介绍 <span className="text-[#fa541c]">*</span>
                        </label>
                        <div className="border border-neutral-200 rounded overflow-hidden flex flex-col bg-white w-full">
                          {/* Rich Text Toolbar */}
                          <div className="flex flex-wrap items-center gap-1.5 px-3 py-2 border-b border-neutral-200 bg-neutral-50/50 select-none">
                            <button type="button" className="p-1 hover:bg-neutral-200 rounded transition-colors text-neutral-500 border-0 bg-transparent cursor-pointer" title="加粗"><Bold className="w-3.5 h-3.5" /></button>
                            <button type="button" className="p-1 hover:bg-neutral-200 rounded transition-colors text-neutral-500 border-0 bg-transparent cursor-pointer" title="斜体"><Italic className="w-3.5 h-3.5" /></button>
                            <button type="button" className="p-1 hover:bg-neutral-200 rounded transition-colors text-neutral-500 border-0 bg-transparent cursor-pointer text-[#fa541c]" title="文字颜色"><Type className="w-3.5 h-3.5" /></button>
                            <div className="w-px h-3.5 bg-neutral-200 mx-1"></div>
                            <button type="button" className="p-1 hover:bg-neutral-200 rounded transition-colors text-neutral-500 border-0 bg-transparent cursor-pointer" title="列表"><List className="w-3.5 h-3.5" /></button>
                            <div className="w-px h-3.5 bg-neutral-200 mx-1"></div>
                            <button type="button" className="p-1 hover:bg-neutral-200 rounded transition-colors text-neutral-500 border-0 bg-transparent cursor-pointer" title="左对齐"><AlignLeft className="w-3.5 h-3.5" /></button>
                            <button type="button" className="p-1 hover:bg-neutral-200 rounded transition-colors text-neutral-500 border-0 bg-transparent cursor-pointer" title="居中对齐"><AlignCenter className="w-3.5 h-3.5" /></button>
                            <button type="button" className="p-1 hover:bg-neutral-200 rounded transition-colors text-neutral-500 border-0 bg-transparent cursor-pointer" title="右对齐"><AlignRight className="w-3.5 h-3.5" /></button>
                            <div className="w-px h-3.5 bg-neutral-200 mx-1"></div>
                            <button type="button" className="p-1 hover:bg-neutral-200 rounded transition-colors text-neutral-500 border-0 bg-transparent cursor-pointer" title="撤销"><Undo2 className="w-3.5 h-3.5" /></button>
                            <button type="button" className="p-1 hover:bg-neutral-200 rounded transition-colors text-neutral-500 border-0 bg-transparent cursor-pointer" title="重做"><Redo2 className="w-3.5 h-3.5" /></button>
                            <div className="w-px h-3.5 bg-neutral-200 mx-1 flex-1"></div>
                            <button type="button" className="p-1 hover:bg-neutral-200 rounded transition-colors text-neutral-500 border-0 bg-transparent cursor-pointer" title="全屏"><Maximize2 className="w-3.5 h-3.5" /></button>
                          </div>
                          
                          <textarea 
                            placeholder="请输入"
                            value={formIntroduction}
                            onChange={(e) => setFormIntroduction(e.target.value)}
                            className="w-full min-h-[140px] p-4 text-[13px] focus:outline-none resize-none leading-relaxed text-[#262626] border-0"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: PROJECT ENVIRONMENT (Figure 2) */}
                  {activeFormTab === 'env' && (
                    <div className="space-y-6 animate-fade-in py-2">
                      {/* 1. 选择资源池 */}
                      <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                        <label className="text-[13px] font-bold text-[#262626] text-right">
                          选择资源池 <span className="text-[#fa541c]">*</span>
                        </label>
                        <div className="relative w-full">
                          <select 
                            value={resourcePool}
                            onChange={(e) => setResourcePool(e.target.value)}
                            className="w-full border border-neutral-200 rounded px-3.5 py-2 text-[13px] focus:outline-none focus:border-[#fa541c] bg-white text-[#262626] cursor-pointer appearance-none pr-8"
                          >
                            <option value="天翼云资源池1">天翼云资源池1</option>
                            <option value="上海园区资源池">上海园区资源池</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* 2. 选择环境类型 */}
                      <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                        <label className="text-[13px] font-bold text-[#262626] text-right">
                          选择环境类型 <span className="text-[#fa541c]">*</span>
                        </label>
                        <div className="flex items-center gap-6 text-[13px]">
                          {[
                            { value: '容器', label: '容器' },
                            { value: '云主机', label: '云主机' }
                          ].map(opt => (
                            <label key={opt.value} className="flex items-center gap-2 cursor-pointer select-none">
                              <input
                                type="radio"
                                name="envType"
                                value={opt.value}
                                checked={envType === opt.value}
                                onChange={() => setEnvType(opt.value as any)}
                                className="w-4 h-4 accent-[#fa541c] cursor-pointer"
                              />
                              <span className="font-medium text-[#262626]">{opt.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* 3. 源仓库地址 */}
                      <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                        <label className="text-[13px] font-bold text-[#262626] text-right">
                          源仓库地址 <span className="text-[#fa541c]">*</span>
                        </label>
                        <div className="flex items-center gap-6 text-[13px]">
                          {[
                            { value: 'manual', label: '手动添加' },
                            { value: 'upload', label: '本地文件上传' }
                          ].map(opt => (
                            <label key={opt.value} className="flex items-center gap-2 cursor-pointer select-none">
                              <input
                                type="radio"
                                name="repoUploadMode"
                                value={opt.value}
                                checked={repoUploadMode === opt.value}
                                onChange={() => setRepoUploadMode(opt.value as any)}
                                className="w-4 h-4 accent-[#fa541c] cursor-pointer"
                              />
                              <span className="font-medium text-[#262626]">{opt.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Mode-specific input */}
                      <div className="grid grid-cols-[100px_1fr] gap-4">
                        <div />
                        <div className="w-full">
                          {repoUploadMode === 'manual' ? (
                            <input
                              type="text"
                              placeholder="请输入源仓库地址 (如: git@github.com:... 或 https://...)"
                              value={formSourceRepoUrl}
                              onChange={(e) => setFormSourceRepoUrl(e.target.value)}
                              className="w-full border border-neutral-200 rounded px-3.5 py-2 text-[13px] focus:outline-none focus:border-[#fa541c] transition-all text-[#262626] font-mono"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center border border-dashed border-neutral-300 hover:border-[#fa541c] bg-neutral-50/50 rounded p-6 cursor-pointer gap-2 text-center">
                              <Upload className="w-6 h-6 text-[#fa541c]" />
                              <span className="text-[13px] font-bold text-[#262626]">点击选择或拖拽源码文件上传</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 4. 创建方式 */}
                      <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                        <label className="text-[13px] font-bold text-[#262626] text-right">
                          创建方式
                        </label>
                        <div className="flex items-center gap-6 text-[13px]">
                          {[
                            { value: 'template', label: '模板创建' },
                            { value: 'custom', label: '自定义' }
                          ].map(opt => (
                            <label key={opt.value} className="flex items-center gap-2 cursor-pointer select-none">
                              <input
                                type="radio"
                                name="creationMethod"
                                value={opt.value}
                                checked={creationMethod === opt.value}
                                onChange={() => setCreationMethod(opt.value as any)}
                                className="w-4 h-4 accent-[#fa541c] cursor-pointer"
                              />
                              <span className="font-medium text-[#262626]">{opt.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {creationMethod === 'template' && (
                        <div className="grid grid-cols-[100px_1fr] gap-4">
                          <div />
                          <div className="relative w-full">
                            <select 
                              value={templateValue}
                              onChange={(e) => setTemplateValue(e.target.value)}
                              className="w-full border border-neutral-200 rounded px-3.5 py-2 text-[13px] focus:outline-none focus:border-[#fa541c] bg-white text-[#262626] cursor-pointer appearance-none pr-8"
                            >
                              <option value="通用模板">通用模板</option>
                              <option value="AI训练模板">AI训练模板</option>
                              <option value="数据分析模板">数据分析模板</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer for 新建实战项目 */}
                <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between shrink-0">
                  <div>
                    {activeFormTab === 'env' ? (
                      <Button 
                        onClick={() => setActiveFormTab('basic')} 
                        variant="outline" 
                        className="border-neutral-200 text-neutral-600 h-9 px-6 rounded-[4px] text-[13px] bg-white cursor-pointer hover:bg-neutral-50 font-semibold"
                      >
                        上一步
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => setDrawerStep('select')} 
                        variant="outline" 
                        className="border-neutral-200 text-neutral-600 h-9 px-6 rounded-[4px] text-[13px] bg-white cursor-pointer hover:bg-neutral-50 font-semibold"
                      >
                        返回关联列表
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <Button 
                      onClick={() => {
                        setShowAddToProjectModal(false);
                        setDrawerStep('select');
                      }} 
                      variant="outline" 
                      className="border-neutral-200 text-neutral-600 h-9 px-6 rounded-[4px] text-[13px] bg-white cursor-pointer hover:bg-neutral-50 font-semibold"
                    >
                      取消
                    </Button>
                    {activeFormTab === 'basic' ? (
                      <Button 
                        onClick={() => setActiveFormTab('env')} 
                        className="bg-[#fa541c] hover:bg-[#e84a15] text-white h-9 px-8 rounded-[4px] shadow-sm text-[13px] border-0 cursor-pointer font-semibold"
                      >
                        下一步
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => {
                          const newId = formName ? `PRJ_${formName}` : `IL51179900223`;
                          const newProj = { id: newId, name: formName || '新建实战项目' };
                          setProjectList([newProj, ...projectList]);
                          setSelectedProjectId(newId);
                          setDrawerStep('select');
                        }} 
                        className="bg-[#fa541c] hover:bg-[#e84a15] text-white h-9 px-8 rounded-[4px] shadow-sm text-[13px] border-0 cursor-pointer font-semibold"
                      >
                        保存
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
