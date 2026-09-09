# 模数师数字平台官网 Design Specification

> 版本：v1.0  
> 页面类型：产业数字化人才培养平台官网首页  
> 设计定位：年轻化、专业化、数字化、可信赖  
> 目标设备：Desktop First，优先适配 1920 × 1080 及以上分辨率  
> 参考原型：用户提供的首页原型图  
> 核心关键词：`数字人才` `产业数字化` `AI` `人才培养` `企业服务` `数据化运营`

---

## 1. 产品定位

“模数师数字平台”不是传统培训机构官网，而是一个面向学员、企业、政企/主管部门和学院运营人员的产业数字化人才服务门户。

核心价值：

> 聚焦产业数字化人才培养，赋能企业标准化、轻量化、体系化人才梯队建设。

核心链路：

```text
行业标准 → 人才培养 → 课程学习 → 实训实践 → 能力测评 → 人才认证 → 企业匹配 → 就业/人才梯队建设 → 数据化运营
```

首页需要让用户快速理解：

1. 我是谁
2. 我能培养什么人才
3. 我能提供什么课程
4. 学员能获得什么能力
5. 企业能获得什么人才服务
6. 学院是否具备数字化运营能力
7. 如何报名、咨询或合作

---

# 2. 整体视觉方向

## 2.1 设计关键词

```text
年轻 / 现代 / 数字化 / AI / 专业 / 可信赖 / 轻科技 / 教育感 / 企业级
```

避免传统教育机构官网、深色科技大屏、过度赛博朋克、大面积霓虹、复杂粒子、卡片堆叠和廉价渐变。

整体视觉采用：

> **浅色科技 + 蓝色品牌 + 蓝紫 AI 渐变 + 大留白 + 精致卡片。**

---

# 3. 设计基准

## 3.1 Desktop

```text
设计基准：1920 × 1080
最大内容宽度：1440px
```

```css
.container {
  width: min(1440px, calc(100% - 80px));
  margin: 0 auto;
}
```

1920px 时内容区域约 1440px，左右留白约 240px。

## 3.2 响应式

### ≥ 1600px

- 最大宽度 1440px
- Hero 双栏
- 课程 3～4 列
- 师资 3～4 列
- 企业 Logo 多列
- Footer 双栏

### 1200～1599px

- 最大宽度 1200px
- Hero 保持双栏
- 卡片及模块间距适当缩小

### 768～1199px

- Hero 转上下结构
- 课程 2 列
- 师资 2 列
- 企业 Logo 4～5 列

### < 768px

- Header 转 Logo + 菜单按钮
- Hero 上下布局
- Tab 横向滚动
- 课程、师资单列
- 企业 Logo 3 列
- Footer 单列

---

# 4. 色彩系统

## 4.1 品牌主色

```text
Primary        #2457FF
Primary Hover  #1747E8
Primary Light  #EAF0FF
```

用于 Logo、主按钮、当前 Tab、链接、重点数字、进度和主要图标。

## 4.2 AI 渐变

```text
#2457FF → #7357FF
#00B8FF → #2457FF
```

仅用于 Hero、AI 核心视觉、能力模型、数据强调，不要全站大面积使用。

## 4.3 背景

```text
Page Background   #FFFFFF
Soft Background   #F7F9FC
Blue Background   #F2F7FF
Surface           #FFFFFF
Border            #E7ECF3
```

## 4.4 文字

```text
Primary    #101828
Secondary  #344054
Tertiary   #667085
Disabled   #98A2B3
```

---

# 5. Typography

字体优先级：

```text
Alibaba PuHuiTi 3.0
HarmonyOS Sans SC
PingFang SC
Microsoft YaHei
sans-serif
```

数字使用 Inter。

```text
Hero H1       48px / 700 / 1.2
Page H2       40px / 700 / 1.25
Section H2    32px / 700 / 1.3
Card Title    18px / 600 / 1.4
Body          14px / 400 / 1.7
Caption       12px / 400 / 1.6
```

---

# 6. Layout / Radius / Shadow

## 6.1 Section

```text
Section 上下间距：96px
紧凑模块：72px
标题与内容：32px
```

## 6.2 Radius

```text
Button  8px
Card    12px
Large   16px
Hero    24px
```

## 6.3 Shadow

```css
/* Card */
box-shadow: 0 8px 28px rgba(31, 56, 100, 0.08);

/* Hover */
box-shadow: 0 16px 40px rgba(36, 87, 255, 0.14);
```

避免厚重黑色阴影。

---

# 7. Header

高度约 `72px`，建议 sticky。

```css
position: sticky;
top: 0;
z-index: 100;
background: rgba(255,255,255,.92);
backdrop-filter: blur(16px);
```

结构：

```text
Logo | 优秀作品 | 热门课程 | 师资团队 | 合作企业 | 就业保障 | 注册/登录
```

Logo：蓝色简洁云/数字化图形 + “模数师数字平台”。

导航字体 13～14px，默认 `#344054`，Hover/Active `#2457FF`。

CTA：

```text
注册/登录
84 × 36px
#2457FF
```

---

# 8. Hero

Hero 高度建议 `580～620px`，采用左右双栏。

```text
┌──────────────────────────────────────────────┐
│                                              │
│  左侧信息                    右侧 AI 主视觉   │
│                                              │
│  Eyebrow                                     │
│  H1                                          │
│  副标题                                      │
│  CTA                                         │
│  能力标签                                    │
│                                              │
└──────────────────────────────────────────────┘
```

文案：

```text
DIGITAL TALENT · AI POWERED

聚焦产业数字化人才
模数化培养 · 赋能人才梯队

聚焦产业数字化人才培养，赋能企业标准化、轻量化、体系化人才梯队建设。

[开始学习] [企业合作]
```

Hero 左侧负责价值表达，右侧负责品牌记忆。

---

# 9. Hero 主视觉

参考原型右侧蓝色云平台 3D 视觉，但不要直接做成普通“云计算插画”。

升级为：

```text
             AI 核心
          ↙    ↓    ↘
       课程   实训   测评
          ↘    ↓    ↙
          认证 / 能力模型
                 ↓
              企业人才
```

视觉元素：

- 蓝色 AI 核心球
- 半透明玻璃卡片
- 数据节点
- 轨道
- 课程卡片
- 能力标签
- 企业人才节点
- 流动数据线

主色：`#2457FF`、`#00B8FF`、`#7357FF`、白色。

背景保持白色与极浅蓝渐变，禁止大面积深色背景。

---

# 10. Hero 能力标签

建议 4 个：

```text
行业能力标准
产业人才培养
人才能力测评
企业人才服务
```

每个包含：

```text
Icon + 标题 + 一句辅助说明
```

使用线性图标，保持轻量。

---

# 11. 五大核心业务能力

参考原型五个 Tab：

```text
行业能力标准建设
产业人才培育
学员成长全周期
企业定向就业
智能数字驾驶舱
```

Tab 默认：

```css
background: #FFFFFF;
border: 1px solid #E7ECF3;
color: #344054;
```

Active：

```css
background: #2457FF;
color: #FFFFFF;
box-shadow: 0 8px 20px rgba(36,87,255,.18);
```

点击后内容平滑切换，`fade + translateY(8px)`，约 250ms。

---

# 12. 业务能力展示区

采用“左侧主视觉 + 右侧能力菜单”。

```text
┌──────────────────┬──────────┬──────────┐
│                  │ 行业人才标准 │ 企业用人标准 │
│ 数字化学员管理   ├──────────┼──────────┤
│                  │ 人才测评标准 │ 就业指导   │
│                  ├──────────┼──────────┤
│                  │ 就业分配     │          │
└──────────────────┴──────────┴──────────┘
```

左侧主视觉约 `360 × 240px`，可使用：

```text
#EAF3FF → #B8DDFF
```

主视觉中可以放轻量 Dashboard、学员头像、AI 图形和数据节点。

---

# 13. 优秀作品

标题：

```text
优秀作品
```

副标题：

```text
真实项目实践，展示人才数字化创造力
```

推荐 3～4 个作品，图片比例 `16:9`。

卡片信息：

```text
作品封面
作品标题
作者
方向
```

Hover：图片 `scale(1.03)`，卡片上浮 `4px`，出现“查看作品”。

---

# 14. 热门核心课程

标题：

```text
热门核心课程
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

课程卡片建议 3～4 列：

```text
课程封面
↓
课程标签
↓
课程标题
↓
课程简介
↓
课时 / 难度 / 学习人数
↓
[开始学习] [查看详情]
```

图片统一 `16:9`，圆角 10px。

---

# 15. 专业师资

标题：

```text
专业师资
```

副标题：

```text
行业经验 × 实战能力 × 教学能力
```

3～4 列卡片。

卡片：

```text
头像
姓名
职位 / 专业方向
个人简介
能力标签
```

头像 72～96px，1:1 圆形。

---

# 16. 企业定向培养

标题：

```text
企业定向培养
```

副标题：

```text
围绕企业真实岗位，构建定制化人才培养方案
```

企业 Logo 建议 `6 列 × 4 行`，Logo 使用白底卡片：

```css
border: 1px solid #E7ECF3;
border-radius: 8px;
```

默认灰度：

```css
filter: grayscale(100%);
opacity: .75;
```

Hover 恢复彩色并上移 2px。

---

# 17. 企业培养流程

从单纯展示 Logo 升级为服务能力：

```text
企业需求诊断
      ↓
岗位能力模型
      ↓
定制课程
      ↓
实战训练
      ↓
能力测评
      ↓
人才推荐
```

视觉采用 `01 → 02 → 03 → 04 → 05 → 06`，蓝色节点 + 细连接线。

---

# 18. 就业保障

标题：

```text
就业保障
```

副标题：

```text
从学习到就业，建立人才成长全周期服务
```

三个阶段：

### 01 定制培养

```text
根据企业岗位需求，针对性培养人才
```

能力项：

```text
企业需求调研与分析
定制化课程体系设计
实战项目针对性训练
个性化学习路径规划
```

### 02 实战实训

```text
参与企业真实项目，积累实战经验
```

能力项：

```text
企业级项目实训
团队协作实践
项目管理与进度跟踪
真实业务场景模拟
```

### 03 定向推荐

```text
企业直接对接人才，提升就业匹配效率
```

能力项：

```text
企业岗位匹配
专业技能精准识别
人才画像
就业岗位推荐
```

三个模块之间使用细连接线表达成长路径。

---

# 19. 学院数字化运营

这是平台区别于传统培训官网的重要模块。

标题：

```text
学院数字化运营
```

副标题：

```text
让人才培养全过程，可用、可管、可统计
```

展示轻量 Dashboard：

```text
累计培养人才
正在学习
课程数量
完课率
认证人数
就业人数
```

图表：

```text
人才培养趋势
课程完成度
人才能力分布
行业人才分布
就业去向
```

视觉采用白色卡片、浅灰背景、蓝色数据和轻量图表，禁止做成传统深色驾驶舱。

---

# 20. 首页数据成果带

Hero 下方可以加入：

```text
12,580+
累计培养人才

368+
合作企业

86+
精品课程

42
认证方向
```

右侧可增加：

```text
学院数字化运营
可用 · 可管 · 可统计
```

数字使用 Inter，约 32px / 700 / `#2457FF`。

---

# 21. 联系与支持

Footer 前增加 CTA：

```text
开启数字人才培养

如果您希望了解课程、人才培养或企业定向服务，欢迎联系我们。

[立即咨询]
```

视觉保持简洁，可使用浅蓝渐变背景和少量 AI 节点。

---

# 22. Footer

背景：

```text
#14284B
```

文字：

```text
#FFFFFF
rgba(255,255,255,.72)
```

结构：

```text
品牌介绍

人才培养
课程中心
人才认证
企业服务

学院动态
关于我们
联系我们

关注我们
微信公众号
抖音
小红书
```

底部显示版权信息。

---

# 23. Icon / Button / Card

## Icon

推荐 Lucide / Iconify / Ant Design Icons。

统一使用线性图标，`1.5～2px stroke`，不要混用 Emoji、3D 图标和面性图标。

## Button

Primary：

```css
background: #2457FF;
color: #FFFFFF;
height: 40px;
padding: 0 20px;
border-radius: 8px;
```

Secondary：白底 + `1px solid #BFD0FF` + 品牌蓝文字。

## Card

```css
background: #FFFFFF;
border: 1px solid #E7ECF3;
border-radius: 12px;
```

Hover：

```css
transform: translateY(-4px);
box-shadow: 0 16px 40px rgba(36,87,255,.12);
transition: .25s ease;
```

---

# 24. 动效规范

原则：

> 动效让页面“活起来”，而不是“炫起来”。

页面进入：

```text
opacity 0 → 1
translateY(16px) → 0
duration 500ms
```

卡片 Hover：

```text
translateY(-4px)
duration 250ms
```

Hero AI 主视觉：

- 轨道缓慢旋转
- 数据节点缓慢移动
- 云/AI 核心轻微浮动
- 玻璃卡片轻微漂浮

周期 `4～8s`。

禁止高频闪烁、快速旋转、大面积粒子和强烈霓虹。

---

# 25. 图片规范

Hero：AI / 数字人才 / 云 / 能力模型 / 企业服务视觉。

课程、作品统一 `16:9`。

师资 `1:1`。

企业 Logo：SVG 优先，PNG 次之。

所有图片：

```css
object-fit: cover;
```

禁止拉伸变形。

---

# 26. 首页信息架构

```text
Header
  ↓
Hero
  ↓
数据成果
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

# 27. 推荐 Frontend Component

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

---

# 28. CSS Design Tokens

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

  --shadow-card: 0 8px 28px rgba(31,56,100,.08);
  --shadow-hover: 0 16px 40px rgba(36,87,255,.14);

  --container-width: 1440px;
}
```

---

# 29. 与原型图相比的升级原则

原型已有完整业务信息，应保留其业务骨架：

```text
Hero
业务能力
优秀作品
核心课程
专业师资
企业定向培养
就业保障
联系支持
```

重点升级：

### Hero

从“普通云平台 3D”升级成“数字人才成长 AI 核心”，让视觉表达人才、AI、能力和企业之间的关系。

### 信息层级

统一为：

```text
Section 标题
↓
副标题
↓
内容
```

### 卡片

减少传统后台感，增加留白、轻边框、柔和阴影和 Hover。

### 科技感

使用白色、浅蓝、玻璃、蓝紫渐变和 3D AI 视觉，不使用深色大屏式科技风。

### 企业服务

不要只展示企业 Logo，要表达：

```text
企业需求 → 能力模型 → 定制培养 → 实战实训 → 测评认证 → 人才推荐
```

---

# 30. Accessibility

- 图片必须支持 `alt`
- Button 必须有 Hover / Focus
- 交互必须支持键盘 Tab
- 不允许只通过颜色区分状态
- 文字与背景保持足够对比度
- 移动端触控区域建议 ≥ 44px

---

# 31. 状态规范

必须考虑：

```text
Loading
Empty
Error
Hover
Active
Disabled
```

课程加载使用 Skeleton；图片加载使用浅灰占位；无数据显示“暂无内容”；错误状态提供“重新加载”。

---

# 32. Codex 实现原则

如果使用 Codex 开发本项目：

1. 开始编码前必须读取本 `design.md`。
2. 不允许随意改变品牌色。
3. 不允许自行引入深色科技大屏风格。
4. 不允许大面积使用渐变。
5. 不允许使用 Emoji 作为正式 UI Icon。
6. 不允许改变首页信息架构，除非用户明确要求。
7. 所有页面优先复用 Design Token。
8. 所有卡片统一 Radius / Shadow / Border。
9. 所有图片保持比例，不允许拉伸。
10. Desktop 优先保证 1920px 视觉效果。
11. 视觉问题优先调整 spacing、typography、hierarchy、color、component proportions。
12. 不要为了“高级”加入无意义动画。
13. 需求不明确时优先保持现有信息架构和视觉系统。
14. 每完成一个主要 Section，都要在浏览器中检查实际效果。
15. 如果有原型图或设计稿，应以原型的业务结构为基础，以本文件的视觉规范为准。

---

# 33. 验收 Checklist

## 品牌

- [ ] Logo 正确
- [ ] 品牌蓝统一
- [ ] 字体统一
- [ ] 页面风格统一

## Hero

- [ ] H1 第一视觉明确
- [ ] CTA 明确
- [ ] AI 主视觉具有辨识度
- [ ] 左右视觉平衡
- [ ] 1920px 下不空、不挤

## 内容

- [ ] 五大业务能力清晰
- [ ] 优秀作品清晰
- [ ] 热门课程清晰
- [ ] 师资清晰
- [ ] 企业 Logo 清晰
- [ ] 就业保障逻辑清晰
- [ ] 数字化运营能力清晰

## 交互

- [ ] Header Hover
- [ ] Tab 切换
- [ ] Card Hover
- [ ] Button Hover
- [ ] 页面滚动
- [ ] 移动端适配

## 视觉

- [ ] 无明显拥挤
- [ ] 无明显空洞
- [ ] 阴影不过重
- [ ] 渐变不过量
- [ ] 圆角统一
- [ ] 图片比例统一
- [ ] 模块间距统一

---

# 34. 最终设计结论

本项目官网不应该被设计成：

> “一家培训机构的官网”。

而应该被设计成：

> **一个以产业数字化人才为核心，连接人才培养、能力认证、企业人才服务和数字化运营的平台门户。**

视觉核心：

```text
人才 × 能力 × AI × 企业 × 数据
```

最终风格：

> **浅色数字科技风 + 蓝紫 AI 视觉 + 企业级信息架构 + 年轻化 UI + 强业务表达。**
