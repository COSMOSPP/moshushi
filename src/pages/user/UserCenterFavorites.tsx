import React, { useState } from "react";
import { ChevronRight, ChevronLeft, ChevronDown, Star, Book, FolderKanban, Database, HeartOff, FileText, Sparkles, Menu, Users, Layers } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialFavoriteCourses = [
  {
    id: 1,
    title: "Python核心编程与实战 (第1卷)",
    image: "https://picsum.photos/seed/pycore/400/225",
    description: "包含Python高级特性、网络编程、多线程与异步IO等核心知识。",
    tags: ["#Python", "#核心语法", "#后端开发"],
    chapters: 32,
    students: 2500
  },
  {
    id: 2,
    title: "深度学习基础与 PyTorch 实战",
    image: "https://picsum.photos/seed/pytorch/400/225",
    description: "从张量计算到卷积神经网络，手把手构建 CV 与 NLP 大模型底层逻辑。",
    tags: ["#深度学习", "#PyTorch", "#AI核心"],
    chapters: 48,
    students: 4200
  },
  {
    id: 3,
    title: "大语言模型 RAG 应用开发指南",
    image: "https://picsum.photos/seed/ragapp/400/225",
    description: "基于 LangChain、LlamaIndex 与向量数据库的高效企业级应用落地方案。",
    tags: ["#LLM", "#RAG", "#向量数据库"],
    chapters: 24,
    students: 1800
  },
  {
    id: 4,
    title: "Prompt 工程与 Agent 智能体架构",
    image: "https://picsum.photos/seed/agentarch/400/225",
    description: "深入探讨结构化提示词设计、ReAct 框架与 Multi-Agent 多智能体协同。",
    tags: ["#AI Agent", "#Prompt", "#智能体"],
    chapters: 28,
    students: 3100
  },
  {
    id: 5,
    title: "云原生 Kubernetes 容器编排实战",
    image: "https://picsum.photos/seed/k8s/400/225",
    description: "Docker 容器化部署、Pod 调度、Ingress 网关与微服务治理运维全流程。",
    tags: ["#云原生", "#Kubernetes", "#DevOps"],
    chapters: 36,
    students: 1900
  },
  {
    id: 6,
    title: "大模型 Efficient Fine-Tuning (PEFT / LoRA)",
    image: "https://picsum.photos/seed/peft/400/225",
    description: "专注于轻量化模型微调技术，掌握 QLoRA、DeepSpeed 及 GPU 显存优化技巧。",
    tags: ["#模型微调", "#LoRA", "#DeepSpeed"],
    chapters: 30,
    students: 2100
  },
  {
    id: 7,
    title: "数据分析与 Pandas 大规模数据挖掘",
    image: "https://picsum.photos/seed/pandas/400/225",
    description: "掌握高性能数据清洗、特征提取、可视化呈现与统计学挖掘建模。",
    tags: ["#数据分析", "#Pandas", "#数据挖掘"],
    chapters: 26,
    students: 1500
  },
  {
    id: 8,
    title: "计算机视觉 OpenCV 图像处理实战",
    image: "https://picsum.photos/seed/opencv/400/225",
    description: "图像增强、目标检测、人脸识别与边缘计算场景下的轻量部署。",
    tags: ["#CV", "#OpenCV", "#图像处理"],
    chapters: 40,
    students: 2900
  },
  {
    id: 9,
    title: "AI 时代的前端 Transformer 架构解析",
    image: "https://picsum.photos/seed/webai/400/225",
    description: "前端交互与 WebGL/WebGPU 模型轻量端侧推理的交叉实践课程。",
    tags: ["#前端AI", "#WebGL", "#WebGPU"],
    chapters: 20,
    students: 1200
  }
];

const initialFavoriteProjects = [
  {
    id: 1,
    title: "图像分类项目",
    desc: "基于CNN的图像分类实战，涵盖数据预处理、模型构建与训练。",
    image: "https://picsum.photos/seed/proj1/400/225",
    participants: "1,234",
    favorites: 342,
    innovator: "李明",
    type: "平台项目",
    difficulty: "中级",
    tags: ["AI", "CV"],
  },
  {
    id: 2,
    title: "文本情感分析项目",
    desc: "NLP实战：使用深度学习模型对海量文本进行情感倾向分析。",
    image: "https://picsum.photos/seed/proj2/400/225",
    participants: "987",
    favorites: 156,
    innovator: "张华",
    type: "租户项目",
    difficulty: "中高级",
    tags: ["AI", "NLP"],
  },
  {
    id: 3,
    title: "电商数据可视化大屏",
    desc: "使用 ECharts 和 React 构建实时动态的电商销售数据大屏。",
    image: "https://picsum.photos/seed/proj3/400/225",
    participants: "2,156",
    favorites: 521,
    innovator: "王强",
    type: "个人项目",
    difficulty: "初级",
    tags: ["数据分析", "可视化"],
  },
  {
    id: 4,
    title: "目标检测系统开发",
    desc: "基于 YOLOv8 的实时目标检测系统，支持自定义数据集训练。",
    image: "https://picsum.photos/seed/proj4/400/225",
    participants: "856",
    favorites: 189,
    innovator: "赵雪",
    type: "平台项目",
    difficulty: "高级",
    tags: ["AI", "CV"],
  },
  {
    id: 5,
    title: "用户行为数据清洗",
    desc: "使用 Pandas 处理千万级用户行为日志，提取有效特征。",
    image: "https://picsum.photos/seed/proj5/400/225",
    participants: "1,432",
    favorites: 275,
    innovator: "刘磊",
    type: "租户项目",
    difficulty: "中级",
    tags: ["数据分析", "数据清洗"],
  },
  {
    id: 6,
    title: "全栈博客系统开发",
    desc: "从零开始构建基于 Next.js 和 Node.js 的全栈博客平台。",
    image: "https://picsum.photos/seed/proj6/400/225",
    participants: "3,210",
    favorites: 890,
    innovator: "陈芳",
    type: "个人项目",
    difficulty: "中级",
    tags: ["Web开发", "全栈"],
  },
  {
    id: 7,
    title: "智能问答机器人",
    desc: "结合大语言模型API，开发具备上下文记忆的智能客服机器人。",
    image: "https://picsum.photos/seed/proj7/400/225",
    participants: "1,890",
    favorites: 432,
    innovator: "孙杰",
    type: "平台项目",
    difficulty: "中高级",
    tags: ["AI", "NLP"],
  },
  {
    id: 8,
    title: "房价预测机器学习模型",
    desc: "使用 Scikit-Learn 构建回归模型，预测城市二手房价格走势。",
    image: "https://picsum.photos/seed/proj8/400/225",
    participants: "2,450",
    favorites: 610,
    innovator: "周伟",
    type: "租户项目",
    difficulty: "初级",
    tags: ["数据分析", "机器学习"],
  }
];

const initialFavoriteDatasets = [
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
  },
  {
    id: 3,
    title: "自动驾驶路况视频集",
    desc: "涵盖多种天气和光照条件下的城市道路行驶视频，包含车辆、行人、交通标志的边界框标注。",
    type: "视频",
    size: "12.8 GB",
    updated: "2026-03-08",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&auto=format&fit=crop&q=80",
    tags: ["自动驾驶", "CV", "视频音频"],
    favorites: 640,
    applications: "3,410",
  },
  {
    id: 4,
    title: "大语言模型微调指令集",
    desc: "涵盖多领域高质量Prompt-Response对，专门用于大语言模型SFT指令微调。",
    type: "文本",
    size: "1.5 GB",
    updated: "2026-02-28",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    tags: ["大模型", "SFT", "Prompt"],
    favorites: 890,
    applications: "4,200",
  }
];

export default function UserCenterFavorites() {
  const [activeTab, setActiveTab] = useState("practices");
  const [favoriteCourses, setFavoriteCourses] = useState(initialFavoriteCourses);
  const [coursePage, setCoursePage] = useState(1);
  const [coursePageSize, setCoursePageSize] = useState(8);

  const [favoriteProjects, setFavoriteProjects] = useState(initialFavoriteProjects);
  const [projectPage, setProjectPage] = useState(1);
  const [projectPageSize, setProjectPageSize] = useState(8);

  const [favoriteDatasets, setFavoriteDatasets] = useState(initialFavoriteDatasets);
  const [datasetPage, setDatasetPage] = useState(1);
  const [datasetPageSize, setDatasetPageSize] = useState(8);
  const navigate = useNavigate();

  const tabs = [
    { id: "practices", label: "收藏的最佳实践", icon: Sparkles },
    { id: "courses", label: "收藏的课程", icon: Book },
    { id: "projects", label: "收藏的项目", icon: FolderKanban },
    { id: "datasets", label: "收藏的数据集", icon: Database },
  ];

  const handleRemoveCourse = (id: number) => {
    setFavoriteCourses(prev => {
      const updated = prev.filter(c => c.id !== id);
      const newTotalPages = Math.ceil(updated.length / coursePageSize) || 1;
      if (coursePage > newTotalPages) {
        setCoursePage(newTotalPages);
      }
      return updated;
    });
  };

  const handleRemoveProject = (id: number) => {
    setFavoriteProjects(prev => {
      const updated = prev.filter(p => p.id !== id);
      const newTotalPages = Math.ceil(updated.length / projectPageSize) || 1;
      if (projectPage > newTotalPages) {
        setProjectPage(newTotalPages);
      }
      return updated;
    });
  };

  const handleRemoveDataset = (id: number) => {
    setFavoriteDatasets(prev => {
      const updated = prev.filter(d => d.id !== id);
      const newTotalPages = Math.ceil(updated.length / datasetPageSize) || 1;
      if (datasetPage > newTotalPages) {
        setDatasetPage(newTotalPages);
      }
      return updated;
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "courses": {
        const totalPages = Math.ceil(favoriteCourses.length / coursePageSize);
        const currentCourses = favoriteCourses.slice((coursePage - 1) * coursePageSize, coursePage * coursePageSize);

        if (favoriteCourses.length === 0) {
          return (
            <div className="py-16 text-center text-neutral-400">
              <Book className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="text-sm">暂无收藏的课程</p>
            </div>
          );
        }

        return (
          <div className="flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentCourses.map(course => (
                <div 
                  key={course.id} 
                  className="bg-white rounded-[12px] overflow-hidden border border-neutral-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col cursor-pointer"
                  onClick={() => navigate('/user/courses', { state: { showDetail: true, courseId: course.id } })}
                >
                  {/* Cover Image */}
                  <div className="relative aspect-video overflow-hidden bg-neutral-bg">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* Favorite Star Button - top right */}
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveCourse(course.id);
                      }}
                      className="absolute top-2 right-2 h-8 w-8 bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white text-primary cursor-pointer z-10" 
                      title="取消收藏"
                    >
                      <Star className="w-4 h-4 fill-[#3b82f6] text-[#3b82f6]" />
                    </Button>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-[16px] font-bold text-neutral-title mb-2 line-clamp-1 group-hover:text-[#3b82f6] transition-colors">
                      {course.title}
                    </h3>
                    
                    <p className="text-[13px] text-neutral-caption mb-3 line-clamp-1">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      {course.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-[#f5f6f8] text-neutral-body text-[12px] rounded-[4px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto pt-3 border-t border-neutral-border flex items-center justify-between text-[12px] text-neutral-caption">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Menu className="w-3.5 h-3.5" />
                          <span>{course.chapters} 章节</span>
                        </div>
                        <span>{course.students}人在学</span>
                      </div>

                      {/* 查看详情 button with 4px border-radius */}
                      <Button 
                        variant="outline"
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/user/courses', { state: { showDetail: true, courseId: course.id } });
                        }}
                        className="h-7 text-xs border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white rounded-[4px] px-3 font-medium transition-colors cursor-pointer"
                      >
                        查看详情
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination matching student courses module */}
            <div className="flex items-center justify-end gap-4 mt-[20px]">
              <span className="text-[13px] text-neutral-500">共 {favoriteCourses.length} 条</span>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 w-7 p-0 rounded-[4px] disabled:opacity-40" 
                  disabled={coursePage === 1}
                  onClick={() => setCoursePage(p => Math.max(p - 1, 1))}
                >
                  &lt;
                </Button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(page => (
                  <Button 
                    key={page} 
                    variant="outline" 
                    size="sm" 
                    className={cn(
                      "h-7 w-7 p-0 rounded-[4px] text-xs font-medium cursor-pointer transition-colors",
                      coursePage === page 
                        ? "bg-[#3b82f6] text-white border-[#3b82f6] hover:bg-[#60a5fa]" 
                        : "border-neutral-200 text-neutral-600 hover:border-[#3b82f6] hover:text-[#3b82f6]"
                    )}
                    onClick={() => setCoursePage(page)}
                  >
                    {page}
                  </Button>
                ))}

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 w-7 p-0 rounded-[4px] disabled:opacity-40" 
                  disabled={coursePage === totalPages}
                  onClick={() => setCoursePage(p => Math.min(p + 1, totalPages))}
                >
                  &gt;
                </Button>
              </div>

              <div className="relative bg-white rounded-[6px]">
                <select 
                  value={coursePageSize} 
                  onChange={(e) => {
                    setCoursePageSize(Number(e.target.value));
                    setCoursePage(1);
                  }}
                  className="appearance-none text-[13px] border border-neutral-200 hover:border-[#3b82f6]/60 focus:border-[#3b82f6] rounded-[6px] pl-3 pr-8 py-1 focus:outline-none text-neutral-600 bg-white cursor-pointer h-7 transition-colors min-w-[95px] shadow-sm"
                >
                  <option value={8} className="bg-white">8 条/页</option>
                  <option value={16} className="bg-white">16 条/页</option>
                  <option value={24} className="bg-white">24 条/页</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                  <ChevronDown className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        );
      }
      case "projects": {
        const totalPages = Math.ceil(favoriteProjects.length / projectPageSize);
        const currentProjects = favoriteProjects.slice((projectPage - 1) * projectPageSize, projectPage * projectPageSize);

        if (favoriteProjects.length === 0) {
          return (
            <div className="py-16 text-center text-neutral-400">
              <FolderKanban className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="text-sm">暂无收藏的项目</p>
            </div>
          );
        }

        return (
          <div className="flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentProjects.map(project => (
                <div 
                  key={project.id} 
                  className="bg-white rounded-[12px] overflow-hidden border border-neutral-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col cursor-pointer"
                  onClick={() => navigate('/user/projects', { state: { showDetail: true, project } })}
                >
                  {/* Cover Image */}
                  <div className="relative aspect-video overflow-hidden bg-neutral-bg">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* Favorite Star Button - top right (cancel favorite action) */}
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveProject(project.id);
                      }}
                      className="absolute top-2 right-2 h-8 w-8 bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white text-primary cursor-pointer z-10" 
                      title="取消收藏"
                    >
                      <Star className="w-4 h-4 fill-[#3b82f6] text-[#3b82f6]" />
                    </Button>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-[16px] font-bold text-neutral-title mb-2 line-clamp-1 group-hover:text-[#3b82f6] transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-[13px] text-neutral-caption mb-3 line-clamp-1">
                      {project.desc}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-[#f5f6f8] text-neutral-body text-[12px] rounded-[4px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="text-[12px] text-neutral-body mb-4 flex items-center gap-3">
                      <span className="text-neutral-caption">创新者: <span className="font-medium text-neutral-body">{project.innovator}</span></span>
                    </div>
                    
                    <div className="mt-auto pt-3 border-t border-neutral-border flex items-center justify-between text-[12px] text-neutral-caption">
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>{project.participants} 参与</span>
                      </div>

                      {/* 查看详情 button with 4px border-radius */}
                      <Button 
                        variant="outline"
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/user/projects', { state: { showDetail: true, project } });
                        }}
                        className="h-7 text-xs border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white rounded-[4px] px-3 font-medium transition-colors cursor-pointer"
                      >
                        查看详情
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination matching student courses & projects module */}
            <div className="flex items-center justify-end gap-4 mt-[20px]">
              <span className="text-[13px] text-neutral-500">共 {favoriteProjects.length} 条</span>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 w-7 p-0 rounded-[4px] disabled:opacity-40" 
                  disabled={projectPage === 1}
                  onClick={() => setProjectPage(p => Math.max(p - 1, 1))}
                >
                  &lt;
                </Button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(page => (
                  <Button 
                    key={page} 
                    variant="outline" 
                    size="sm" 
                    className={cn(
                      "h-7 w-7 p-0 rounded-[4px] text-xs font-medium cursor-pointer transition-colors",
                      projectPage === page 
                        ? "bg-[#3b82f6] text-white border-[#3b82f6] hover:bg-[#60a5fa]" 
                        : "border-neutral-200 text-neutral-600 hover:border-[#3b82f6] hover:text-[#3b82f6]"
                    )}
                    onClick={() => setProjectPage(page)}
                  >
                    {page}
                  </Button>
                ))}

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 w-7 p-0 rounded-[4px] disabled:opacity-40" 
                  disabled={projectPage === totalPages}
                  onClick={() => setProjectPage(p => Math.min(p + 1, totalPages))}
                >
                  &gt;
                </Button>
              </div>

              <div className="relative bg-white rounded-[6px]">
                <select 
                  value={projectPageSize} 
                  onChange={(e) => {
                    setProjectPageSize(Number(e.target.value));
                    setProjectPage(1);
                  }}
                  className="appearance-none text-[13px] border border-neutral-200 hover:border-[#3b82f6]/60 focus:border-[#3b82f6] rounded-[6px] pl-3 pr-8 py-1 focus:outline-none text-neutral-600 bg-white cursor-pointer h-7 transition-colors min-w-[95px] shadow-sm"
                >
                  <option value={8} className="bg-white">8 条/页</option>
                  <option value={16} className="bg-white">16 条/页</option>
                  <option value={24} className="bg-white">24 条/页</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                  <ChevronDown className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        );
      }
      case "datasets": {
        const totalPages = Math.ceil(favoriteDatasets.length / datasetPageSize);
        const currentDatasets = favoriteDatasets.slice((datasetPage - 1) * datasetPageSize, datasetPage * datasetPageSize);

        if (favoriteDatasets.length === 0) {
          return (
            <div className="py-16 text-center text-neutral-400">
              <Database className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="text-sm">暂无收藏的数据集</p>
            </div>
          );
        }

        return (
          <div className="flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentDatasets.map(dataset => (
                <div 
                  key={dataset.id} 
                  className="bg-white rounded-[12px] overflow-hidden border border-neutral-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col cursor-pointer"
                  onClick={() => navigate('/user/datasets', { state: { dataset } })}
                >
                  {/* Cover Image Container with Fallback Header */}
                  <div className="relative aspect-video overflow-hidden bg-[#f0f2f5] flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-50 text-[#3b82f6]">
                      <Database className="w-10 h-10 opacity-30" />
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
                    {/* Favorite Star Button - top right */}
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveDataset(dataset.id);
                      }}
                      className="absolute top-2 right-2 h-8 w-8 bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white text-primary cursor-pointer z-10" 
                      title="取消收藏"
                    >
                      <Star className="w-4 h-4 fill-[#3b82f6] text-[#3b82f6]" />
                    </Button>
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
                    
                    {/* Bottom Stats: Citations (引用) Count & View Details Button */}
                    <div className="mt-auto pt-3 border-t border-neutral-border flex items-center justify-between text-[12px] text-neutral-caption">
                      <div className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-neutral-caption" />
                        <span>{dataset.applications} 次引用</span>
                      </div>

                      {/* 查看详情 button with 4px border-radius */}
                      <Button 
                        variant="outline"
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/user/datasets', { state: { dataset } });
                        }}
                        className="h-7 text-xs border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white rounded-[4px] px-3 font-medium transition-colors cursor-pointer"
                      >
                        查看详情
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end gap-4 mt-[20px]">
              <span className="text-[13px] text-neutral-500">共 {favoriteDatasets.length} 条</span>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 w-7 p-0 rounded-[4px] disabled:opacity-40" 
                  disabled={datasetPage === 1}
                  onClick={() => setDatasetPage(p => Math.max(p - 1, 1))}
                >
                  &lt;
                </Button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(page => (
                  <Button 
                    key={page} 
                    variant="outline" 
                    size="sm" 
                    className={cn(
                      "h-7 w-7 p-0 rounded-[4px] text-xs font-medium cursor-pointer transition-colors",
                      datasetPage === page 
                        ? "bg-[#3b82f6] text-white border-[#3b82f6] hover:bg-[#60a5fa]" 
                        : "border-neutral-200 text-neutral-600 hover:border-[#3b82f6] hover:text-[#3b82f6]"
                    )}
                    onClick={() => setDatasetPage(page)}
                  >
                    {page}
                  </Button>
                ))}

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 w-7 p-0 rounded-[4px] disabled:opacity-40" 
                  disabled={datasetPage === totalPages}
                  onClick={() => setDatasetPage(p => Math.min(p + 1, totalPages))}
                >
                  &gt;
                </Button>
              </div>

              <div className="relative bg-white rounded-[6px]">
                <select 
                  value={datasetPageSize} 
                  onChange={(e) => {
                    setDatasetPageSize(Number(e.target.value));
                    setDatasetPage(1);
                  }}
                  className="appearance-none text-[13px] border border-neutral-200 hover:border-[#3b82f6]/60 focus:border-[#3b82f6] rounded-[6px] pl-3 pr-8 py-1 focus:outline-none text-neutral-600 bg-white cursor-pointer h-7 transition-colors min-w-[95px] shadow-sm"
                >
                  <option value={8} className="bg-white">8 条/页</option>
                  <option value={16} className="bg-white">16 条/页</option>
                  <option value={24} className="bg-white">24 条/页</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                  <ChevronDown className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        );
      }
      case "practices":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map(i => (
              <Card key={i} className="flex flex-row p-0 overflow-hidden hover:shadow-md transition-shadow group border-neutral-border">
                <div className="w-32 bg-blue-50 flex items-center justify-center border-r border-neutral-border shrink-0">
                  <Sparkles className="w-10 h-10 text-orange-400" />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-neutral-title mb-1 text-[15px]">{i === 1 ? "项目汇报 PPT 生成" : "十年经验简历生成"}</h4>
                      <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-1 text-primary hover:bg-primary/10" title="取消收藏">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                      </Button>
                    </div>
                    <p className="text-xs text-neutral-body line-clamp-2 mt-1">
                      {i === 1 
                        ? "基于大模型快速生成项目汇报PPT大纲与内容，适合各类课程期末汇报、项目结题展示等场景，大幅提升文档编写效率。" 
                        : "通过深度对话挖掘你的核心竞争力，生成对标资深工程师、架构师级别的专业简历，助你脱颖而出。"}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 bg-neutral-bg text-neutral-body text-[10px] rounded-[4px]">内容创作</span>
                      <span className="px-2 py-0.5 bg-neutral-bg text-neutral-body text-[10px] rounded-[4px]">初阶</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button onClick={() => navigate('/user/practices', { state: { practiceId: i, showDetail: true } })} variant="outline" size="sm" className="h-7 text-xs">进入详情</Button>
                      <Button onClick={() => navigate('/user/practices', { state: { practiceId: i, showDetail: true } })} variant="default" size="sm" className="h-7 text-xs bg-[#3b82f6] hover:bg-[#60a5fa] text-white">一键应用</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-neutral-caption mb-4">
        <Link to="/user" className="hover:text-primary cursor-pointer transition-colors">首页</Link>
        <ChevronRight className="w-4 h-4 mx-1" />
        <Link to="/user/center" className="hover:text-primary cursor-pointer transition-colors">个人中心</Link>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-neutral-title font-medium">我的收藏</span>
      </div>

      <div className="bg-white rounded-xl border border-neutral-border shadow-sm p-6 min-h-[600px]">
        {/* Tabs */}
        <div className="flex gap-6 border-b border-neutral-border mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "pb-3 text-[15px] font-medium transition-colors relative flex items-center gap-2 cursor-pointer",
                activeTab === tab.id 
                  ? "text-primary font-bold" 
                  : "text-neutral-body hover:text-neutral-title"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
}
