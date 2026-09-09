# AGENTS.md

## 1. 项目说明

本项目是「模数师数字平台」官网。

项目不是传统培训机构官网，而是面向：

- 学员
- 企业
- 政企/主管部门
- 学院运营人员

的产业数字化人才服务门户。

核心定位：

> 聚焦产业数字化人才培养，赋能企业标准化、轻量化、体系化人才梯队建设。

核心业务闭环：

```text
行业标准
→ 人才培养
→ 课程学习
→ 实训实践
→ 能力测评
→ 人才认证
→ 企业匹配
→ 就业 / 人才梯队建设
→ 数据化运营
```

官网核心表达：

```text
人才 × 能力 × AI × 企业 × 数据
```

---

# 2. Codex 工作总原则

你是本项目的前端开发 Agent。

你的首要目标不是“把页面写出来”，而是：

> 在不破坏产品信息架构和视觉规范的前提下，高还原度地实现设计。

必须遵守以下原则：

1. 开始开发前先阅读 `design.md`。
2. 如果项目中存在现有页面，先检查现有代码结构，再决定修改方式。
3. 优先复用已有组件、样式、工具函数和依赖。
4. 不要无理由重构整个项目。
5. 不要为了实现一个页面而引入大量新依赖。
6. 不要自行改变品牌定位。
7. 不要自行改变首页信息架构。
8. 不要自行增加与需求无关的模块。
9. 不要使用深色大屏/赛博朋克风格替代设计方案。
10. 所有视觉实现以 `design.md` 为最高设计依据。
11. 如果设计稿和现有实现存在冲突，优先保证设计稿要求。
12. 如果需求不明确，选择最符合现有设计系统的实现方式。
13. 完成代码后必须运行项目并检查实际页面。
14. 修改视觉问题时，优先调整布局、间距、字号、比例和层级，不要随意增加装饰。

---

# 3. 设计规范优先级

当多个规则发生冲突时，按以下优先级处理：

```text
用户当前明确需求
        ↓
design.md
        ↓
AGENTS.md
        ↓
现有项目代码规范
        ↓
通用前端最佳实践
```

如果用户明确要求与本文件冲突：

> 以用户当前明确需求为准。

---

# 4. 开发流程

每次开发任务按照以下流程执行：

```text
1. 理解需求
   ↓
2. 阅读 design.md
   ↓
3. 检查项目结构
   ↓
4. 检查已有组件
   ↓
5. 制定实现方案
   ↓
6. 开发
   ↓
7. 启动项目
   ↓
8. 浏览器检查
   ↓
9. 修复视觉 / 交互问题
   ↓
10. 再次检查
   ↓
11. 汇报修改结果
```

不要在没有检查项目结构的情况下直接大规模创建文件。

---

# 5. 技术实现原则

## 5.1 组件化

页面必须采用组件化开发。

推荐结构：

```text
src/
├── components/
│   ├── Header/
│   ├── Hero/
│   ├── StatsBar/
│   ├── BusinessTabs/
│   ├── BusinessOverview/
│   ├── WorksSection/
│   ├── CourseSection/
│   ├── CourseCard/
│   ├── TeacherSection/
│   ├── TeacherCard/
│   ├── EnterpriseSection/
│   ├── EmploymentSection/
│   ├── DashboardPreview/
│   ├── CTASection/
│   └── Footer/
│
├── pages/
│   ├── Home/
│   ├── Courses/
│   ├── Teachers/
│   ├── Enterprise/
│   ├── Employment/
│   └── About/
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── logos/
│
└── styles/
    ├── variables.css
    ├── global.css
    └── responsive.css
```

如果项目已有目录结构，不需要强制改成以上结构。

---

# 6. CSS / Design Token

必须优先使用设计变量。

核心变量：

```css
:root {
  --color-primary: #2457FF;
  --color-primary-hover: #1747E8;

  --color-ai-blue: #00B8FF;
  --color-ai-purple: #7357FF;

  --color-text-primary: #101828;
  --color-text-secondary: #667085;
  --color-text-tertiary: #98A2B3;

  --color-bg: #FFFFFF;
  --color-bg-soft: #F7F9FC;
  --color-bg-blue: #F2F7FF;

  --color-border: #E7ECF3;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  --container-width: 1440px;
}
```

禁止在组件中大量出现无法解释的随机颜色。

例如：

```css
color: #3478f6;
```

如果已经存在：

```css
color: var(--color-primary);
```

则优先使用变量。

---

# 7. 页面宽度

Desktop 设计基准：

```text
1920 × 1080
```

内容最大宽度：

```text
1440px
```

推荐：

```css
.container {
  width: min(1440px, calc(100% - 80px));
  margin-inline: auto;
}
```

页面不能只针对 1366px 设计。

必须优先保证：

```text
1920px
1440px
1280px
```

下的视觉稳定性。

---

# 8. Header 开发规则

Header：

```text
软件产品
热门课程
师资团队
合作企业
就业保障
```

右侧：

```text
免费咨询
```

要求：

- 高度约 72px
- 白色或半透明白色
- 支持 sticky
- 导航 Hover 状态明显
- 当前页面 Active 状态明显
- Logo 不得变形
- 不使用过大的导航字体

推荐：

```css
background: rgba(255, 255, 255, 0.92);
backdrop-filter: blur(16px);
```

---

# 9. Hero 开发规则

Hero 是首页第一视觉。

结构：

```text
左侧：
Eyebrow
H1
副标题
CTA
能力标签

右侧：
AI / 数字人才 3D 主视觉
```

核心标题：

```text
聚焦产业数字化人才
模数化培养 · 赋能人才梯队
```

Hero 不允许退化为：

```text
普通 Banner
+
一张装饰图
```

右侧视觉必须体现：

```text
AI
课程
实训
测评
认证
能力模型
企业人才
数据
```

---

# 10. Hero 视觉约束

优先使用：

```text
蓝
浅蓝
白
蓝紫渐变
玻璃质感
柔和光效
```

不要使用：

```text
黑色背景
大量霓虹
赛博朋克
大面积粒子
高频闪烁
复杂光束
```

Hero 的科技感来自：

```text
层次
空间
数据节点
玻璃
渐变
3D
```

而不是来自大量特效。

---

# 11. 首页 Section 顺序

除非用户明确要求，否则不要改变以下顺序：

```text
Header
↓
Hero
↓
核心数据 / 品牌能力
↓
五大业务能力
↓
优秀作品
↓
热门核心课程
↓
专业师资
↓
企业定向培养
↓
就业保障
↓
学院数字化运营
↓
咨询 CTA
↓
Footer
```

---

# 12. 五大业务能力

Tab：

```text
行业能力标准建设
产业人才培育
学员成长全周期
企业定向就业
智能数字驾驶舱
```

Tab Active：

```text
#2457FF
```

切换：

```text
fade
+
translateY(8px)
```

不要使用复杂翻页动画。

内容切换必须稳定，避免页面高度剧烈跳动。

---

# 13. 优秀作品

作品卡片统一：

```text
16:9
```

内容：

```text
作品图
作品标题
作者
方向
```

Hover：

```text
图片 scale(1.03)
卡片 translateY(-4px)
```

不要让图片发生变形。

---

# 14. 课程模块

课程卡片统一结构：

```text
课程图片
↓
标签
↓
课程标题
↓
课程简介
↓
课时 / 难度 / 学习人数
↓
操作按钮
```

推荐课程：

```text
AI大模型与通识基础
AI智能体应用开发
视频剪辑
数字营销
数据分析
智能办公
```

图片统一：

```text
aspect-ratio: 16 / 9;
object-fit: cover;
```

---

# 15. 师资模块

师资卡：

```text
头像
姓名
职位 / 专业方向
简介
能力标签
```

头像：

```text
1:1
border-radius: 50%;
```

卡片保持：

```text
白色
浅边框
轻阴影
12px 圆角
```

不要把教师卡片做成复杂的 3D 人物展示。

---

# 16. 企业 Logo

企业 Logo：

- 优先 SVG
- PNG 次之
- 保持原始比例
- 不允许拉伸
- 默认弱化
- Hover 恢复视觉

默认建议：

```css
filter: grayscale(100%);
opacity: .75;
```

Hover：

```css
filter: grayscale(0);
opacity: 1;
```

Logo 卡片不应抢过课程和 Hero 的视觉重点。

---

# 17. 就业保障

固定表达三个阶段：

```text
01 定制培养
02 实战实训
03 定向推荐
```

流程关系必须明显。

建议：

```text
01 → 02 → 03
```

连接线使用浅蓝。

内容重点：

```text
企业需求
实战项目
岗位匹配
人才画像
就业推荐
```

---

# 18. 数字化运营模块

数字化运营是本项目的重要差异化能力。

标题：

```text
学院数字化运营
```

核心表达：

```text
可用
可管
可统计
```

Dashboard 使用：

```text
白色卡片
浅灰背景
蓝色数据
轻量图表
```

禁止：

```text
深色驾驶舱
大量发光边框
传统大屏风格
```

---

# 19. Card 规范

默认：

```css
background: #fff;
border: 1px solid #E7ECF3;
border-radius: 12px;
```

Hover：

```css
transform: translateY(-4px);
box-shadow:
  0 16px 40px rgba(36, 87, 255, 0.12);
```

动画：

```css
transition:
  transform .25s ease,
  box-shadow .25s ease,
  border-color .25s ease;
```

不要给所有元素都添加 Hover 动画。

---

# 20. Button 规范

Primary：

```css
background: #2457FF;
color: #FFFFFF;
height: 40px;
padding: 0 20px;
border-radius: 8px;
```

Hover：

```css
background: #1747E8;
transform: translateY(-1px);
```

Secondary：

```text
白色背景
蓝色文字
浅蓝边框
```

按钮文案应该明确：

```text
开始学习
查看详情
立即咨询
企业合作
```

不要使用：

```text
点击这里
了解一下
更多
```

作为唯一 CTA。

---

# 21. Icon 规范

推荐：

```text
Lucide
Iconify
Ant Design Icons
```

统一使用：

```text
线性图标
1.5～2px stroke
```

禁止：

```text
Emoji
随机 icon 网站素材
风格不统一的图标
```

---

# 22. 动效规范

原则：

> 轻量、有反馈、不喧宾夺主。

页面进入：

```text
opacity 0 → 1
translateY(16px) → 0
500ms
```

Card：

```text
translateY(-4px)
250ms
```

Hero：

```text
4～8 秒缓慢浮动
```

禁止：

- 快速旋转
- 高频闪烁
- 强烈缩放
- 自动弹窗
- 大面积粒子
- 无限循环的强视觉动画

如果设备开启：

```text
prefers-reduced-motion
```

应该减少或关闭非必要动画。

---

# 23. 图片处理

所有图片必须：

```text
保持比例
object-fit: cover
```

禁止：

```text
图片拉伸
图片压扁
随意裁切人物
```

如果使用用户提供的设计图作为参考：

> 设计图只用于理解视觉、布局和信息层级，不要直接把整张设计图作为网页背景来冒充实现。

---

# 24. 响应式

必须至少处理：

```text
1920px
1440px
1280px
1024px
768px
375px
```

移动端：

```text
Header → Logo + 菜单
Hero → 上下结构
Tabs → 横向滚动
课程 → 单列
师资 → 单列
企业 Logo → 3列
Footer → 单列
```

不能简单通过：

```css
transform: scale(...)
```

来实现移动端。

---

# 25. Accessibility

必须考虑：

- 图片 alt
- Button 可聚焦
- 键盘 Tab
- Hover / Focus 状态
- 足够的文字对比度
- 不只通过颜色区分状态

交互元素必须有清晰的可操作反馈。

---

# 26. 性能

优先保证：

```text
首屏加载速度
图片体积
字体加载
动画性能
```

图片：

- 优先 WebP / AVIF
- 合理压缩
- 不加载远超展示尺寸的大图

动画：

- 优先 transform / opacity
- 避免频繁操作 layout
- 避免大面积 blur 造成性能问题

---

# 27. 数据与内容

如果后端接口尚未接入：

可以使用 mock 数据。

但：

> mock 数据必须集中管理，不要散落在 JSX / Vue Template 中。

推荐：

```text
src/data/
├── courses.ts
├── teachers.ts
├── enterprises.ts
├── works.ts
└── employment.ts
```

后续接 API 时应该可以直接替换数据源。

---

# 28. 页面状态

需要考虑：

```text
Loading
Empty
Error
Hover
Active
Disabled
```

例如：

```text
课程加载中 → Skeleton
没有课程 → 暂无课程
加载失败 → 内容加载失败 + 重新加载
```

---

# 29. 路由

推荐页面：

```text
/
├── /courses
├── /teachers
├── /enterprise
├── /employment
├── /about
└── /course/:id
```

如果项目已有路由系统，优先复用。

导航不能出现死链接。

---

# 30. SEO 基础

首页应该具备：

```text
title
description
keywords
Open Graph
```

推荐 Title：

```text
模数师数字平台｜产业数字化人才培养与企业人才服务平台
```

推荐 Description：

```text
聚焦产业数字化人才培养，提供课程学习、实训实践、能力测评、人才认证及企业定向培养服务，助力企业构建标准化、轻量化、体系化人才梯队。
```

---

# 31. 禁止事项

以下行为默认禁止：

### 视觉

- ❌ 擅自改成深色科技风
- ❌ 擅自加入赛博朋克元素
- ❌ 大面积使用霓虹色
- ❌ 大量玻璃拟态
- ❌ 大量阴影
- ❌ 大量渐变
- ❌ Emoji 作为正式 Icon
- ❌ 使用廉价模板式 UI

### 布局

- ❌ 擅自改变 Section 顺序
- ❌ 擅自删除业务模块
- ❌ 为了填充空间增加无意义内容
- ❌ 使用大量空白导致首屏信息不足
- ❌ 使用大量卡片造成页面碎片化

### 代码

- ❌ 不检查现有项目就重构
- ❌ 不必要地修改 package.json
- ❌ 不必要地增加依赖
- ❌ 复制大量重复 CSS
- ❌ 使用无法解释的魔法数字
- ❌ 将大量 mock 数据硬编码到组件
- ❌ 提交明显未使用的代码

---

# 32. 视觉验收方法

完成页面后，不要只检查代码。

必须实际运行项目。

重点检查：

```text
1920px
↓
1440px
↓
1280px
↓
移动端
```

检查：

1. Hero 是否足够突出。
2. Header 是否过高。
3. 内容最大宽度是否正确。
4. Section 间距是否统一。
5. H1 是否足够醒目。
6. 卡片是否过于密集。
7. 图片是否变形。
8. 蓝色是否统一。
9. 阴影是否过重。
10. 页面是否有传统后台感。
11. 页面是否有足够留白。
12. CTA 是否容易发现。
13. 企业 Logo 是否过度抢眼。
14. Footer 是否过于厚重。

---

# 33. 视觉问题修复优先级

当页面“看起来不高级”时，不要第一时间增加特效。

按照以下顺序修改：

```text
1. 页面整体比例
2. 信息层级
3. Section 间距
4. 容器宽度
5. 字体大小
6. 字体粗细
7. 卡片比例
8. 图片比例
9. 色彩
10. 边框
11. 阴影
12. 动效
```

优先解决结构问题，再解决装饰问题。

---

# 34. Codex 任务拆分

不要一次要求完成整个网站。

推荐：

```text
Task 01
实现 Header + Hero

Task 02
实现核心数据 + 五大业务能力

Task 03
实现优秀作品 + 热门课程

Task 04
实现专业师资

Task 05
实现企业定向培养

Task 06
实现就业保障

Task 07
实现学院数字化运营

Task 08
实现 Footer + CTA

Task 09
统一视觉优化

Task 10
响应式适配

Task 11
最终视觉验收
```

---

# 35. 推荐 Codex Prompt

开发首页时可以使用：

```text
请先阅读项目中的 design.md 和 AGENTS.md。

然后检查当前项目结构、技术栈和已有组件。

现在只实现首页，不要修改无关页面。

按照 design.md 完成：
1. Header
2. Hero
3. 核心数据
4. 五大业务能力
5. 优秀作品
6. 热门核心课程
7. 专业师资
8. 企业定向培养
9. 就业保障
10. 学院数字化运营
11. CTA
12. Footer

要求：
- 1920px 优先
- 最大内容宽度 1440px
- 使用设计 Token
- 品牌色使用 #2457FF
- 保持浅色数字科技风
- 不使用深色赛博朋克风
- 不使用 Emoji Icon
- 图片不得变形
- 组件化实现
- mock 数据集中管理

完成后启动项目并检查实际页面。
如果发现视觉比例、间距、字体或响应式问题，请先修复再结束。
```

---

# 36. 用户反馈处理方式

如果用户说：

> “这个页面不够高级。”

不要直接回复“已优化”。

应该分析：

```text
高级感不足
→ 是布局问题？
→ 是字体问题？
→ 是留白问题？
→ 是图片问题？
→ 是颜色问题？
→ 是卡片问题？
→ 是层级问题？
```

然后进行具体修改。

如果用户说：

> “Hero 太普通。”

应该优先修改：

```text
Hero 构图
主标题比例
右侧 AI 主视觉
光影层次
信息层级
CTA
```

而不是增加更多动画。

---

# 37. 代码修改原则

修改已有代码时：

1. 先理解代码。
2. 找到最小修改范围。
3. 不要顺手重构无关模块。
4. 不要删除现有功能。
5. 不要改变 API 契约。
6. 不要修改环境变量名称。
7. 不要覆盖用户已有资源。
8. 修改完成后检查相关页面是否正常。

---

# 38. Git 原则

如果项目使用 Git：

提交前检查：

```text
git status
```

确认：

- 没有无关文件
- 没有调试文件
- 没有临时截图
- 没有密钥
- 没有 `.env` 敏感信息
- 没有大体积无关资源

提交信息建议：

```text
feat: implement homepage hero
feat: add course section
feat: add enterprise section
style: refine homepage visual
fix: responsive layout
```

---

# 39. 最终验收标准

首页完成必须满足：

## 产品

- [ ] 用户能够快速理解平台定位
- [ ] 学员能够找到课程
- [ ] 企业能够找到企业服务
- [ ] 人才培养链路清晰
- [ ] 就业保障清晰

## 视觉

- [ ] 年轻化
- [ ] 数字化
- [ ] AI 感
- [ ] 企业级
- [ ] 专业
- [ ] 可信赖
- [ ] 不老气
- [ ] 不赛博朋克

## 技术

- [ ] 组件化
- [ ] Responsive
- [ ] 无明显 Console Error
- [ ] 无明显 Layout Shift
- [ ] 图片比例正常
- [ ] Hover 正常
- [ ] 路由正常
- [ ] 页面可以正常启动

---

# 40. Agent 最终行为准则

始终遵守：

> **先理解，再设计；先规划，再编码；先结构，再视觉；先实现，再优化。**

不要为了证明自己“会写代码”而增加复杂度。

本项目最重要的不是代码数量，而是：

```text
高还原度
+
高一致性
+
高可维护性
+
良好交互
+
良好视觉
```

最终目标：

> 将“模数师数字平台”实现为一个真正具有数字人才平台属性的现代化官网，而不是一个传统培训机构模板网站。
