# 东莞市公信检测技术有限公司门户网站 — 首页改版设计

- **日期**：2026-06-20
- **范围**：第一期 — 首页设计与内容规划（仅设计方案，不含代码实现）
- **参考网站**：http://www.anxintesting.com/（安信检测，借鉴模块结构与布局）
- **内容来源**：`设计素材/宣传手册.pdf`（公司官方宣传手册，OCR 提取）
- **设计方向**：方案 C — 混合优化布局（保留参考站信息架构，用现代手法优化呈现）

---

## 1. 背景与目标

### 1.1 现状

现有项目 `gongxin-home` 是 Vue 3 + Vite + Tailwind CSS + vue-i18n 的纯前端门户网站，已包含首页、关于我们、产品服务、联系我们四个区块，支持简体中文/繁体中文/英文三语切换。但当前内容为通用占位内容（云服务、信息安全、大数据），并非资质检测公司的真实业务。

### 1.2 目标

将首页改造为符合"资质检测公司"行业特征的门户首页，参考安信检测网站的模块结构与布局，采用深蓝专业风格，基于公司官方宣传手册的真实内容，展示公司业务能力、核心优势、服务流程、资质与合作实验室、典型案例，并在明显位置突出联系电话 `15207111291`。

### 1.3 范围界定

| 包含 | 不包含 |
|------|--------|
| 首页各模块设计与内容规划 | 代码实现（由后续实施计划处理） |
| 多页面架构蓝图规划 | 二期详情页设计 |
| 视觉设计系统定义 | 查询功能（证书/项目/标准查询） |
| 图片资源映射方案 | 新闻资讯模块 |
| i18n 内容策略 | vue-router 引入（二期） |
| | 后端 API 对接 |
| | 客服微信二维码 |

---

## 2. 整体架构

### 2.1 多页面架构蓝图

```
gongxin-home/
├── 首页 Home（第一期实现）
│   ├── Header（导航 + 语言切换 + 醒目电话 15207111291）
│   ├── Banner 轮播
│   ├── 关于我们
│   ├── 核心优势
│   ├── 服务项目 Tab
│   ├── 服务领域
│   ├── 服务流程
│   ├── 资质与合作实验室
│   ├── 典型案例
│   ├── 联系 CTA
│   └── Footer
├── 关于我们详情页（后续二期）
├── 服务项目详情页（后续二期）
├── 服务领域详情页（后续二期）
├── 资质详情页（后续二期）
└── 联系我们页（后续二期）
```

### 2.2 第一期范围：仅首页

- **保留**：现有 Vue 3 + Vite + Tailwind + vue-i18n 技术栈，不引入 vue-router（二期再加）
- **首页形态**：单页滚动，各模块作为 `<section>` 区块纵向排列（沿用现有 `App.vue` 结构）
- **导航**：Header 锚点跳转到对应区块
- **二期预留**：详情页入口在首页各模块"查看更多"按钮处，一期先做占位（按钮样式但提示"即将上线"或预留路由）

### 2.3 技术决策

| 项目 | 决策 | 理由 |
|------|------|------|
| 路由 | 一期不引入 vue-router，用锚点滚动；二期引入 | 一期单页足够，降低复杂度 |
| 状态管理 | 不需要 | 纯展示型项目 |
| 图片资源 | 放 `src/assets/images/`，按模块分子目录 | 便于 Vite 打包与引用 |
| 数据来源 | 检测项目/服务领域等列表数据写在组件 `setup` 内（静态），i18n 文案走 locale 文件 | 无后端，静态数据即可 |
| 响应式 | 移动端优先，断点 sm/md/lg/xl | 行业网站移动端流量占比高 |

---

## 3. 首页模块详细设计

### 3.1 模块清单与顺序

| 序号 | 模块 | 类型 | 锚点 id |
|------|------|------|---------|
| 1 | Header | 改造现有 | — |
| 2 | Banner 轮播 | 新建（改造 Hero） | #home |
| 3 | 关于我们 | 改造现有 | #about |
| 4 | 核心优势 | 新建 | #strengths |
| 5 | 服务项目 Tab | 新建 | #products |
| 6 | 服务领域 | 新建 | #fields |
| 7 | 服务流程 | 新建 | #process |
| 8 | 资质与合作实验室 | 新建 | #qualifications |
| 9 | 典型案例 | 新建 | #cases |
| 10 | 联系 CTA | 改造现有 Contact | #contact |
| 11 | Footer | 改造现有 | — |

### 3.2 模块 1：Header（改造现有）

- **布局**：左 Logo + 中导航 + 右语言切换 + 醒目电话按钮
- **电话展示**：右上角醒目按钮 `15207111291`，深蓝底白字 + 电话图标（`Phone` from lucide），移动端常驻显示，使用 `tel:15207111291` 协议
- **导航项**：首页 / 关于我们 / 核心优势 / 服务项目 / 服务领域 / 服务流程 / 资质合作 / 典型案例 / 联系我们（锚点跳转）
- **语言切换**：保留现有下拉（简体/繁体/英文）
- **移动端**：导航折叠为汉堡菜单，含遮罩层 + 侧滑动画
- **素材**：使用 `设计素材/公司logo/115a0af6e070ff1f01405d8abe0a163b.png` 替换现有占位 Logo

### 3.3 模块 2：Banner 轮播（新建，改造 Hero）

- **形式**：全宽轮播，3-4 张图，自动播放（5 秒间隔）+ 手动切换 + 指示器圆点
- **图片**：使用 `设计素材/公司照片/` 与 `设计素材/实验室图片/` 中的真实照片
- **文案与配图**（来自宣传手册，文案与图片语义匹配）：
  - 图 1：配 `公司照片/公司前台.jpg`，主标题"公信检测，全球认证" + 副标题"专业进出口商品检测认证服务平台" + 按钮"了解我们"
  - 图 2：配 `公司照片/实验室.jpg`，主标题"一次测试，多证通行" + 副标题"助力中国制造，通达全球市场" + 按钮"查看服务"
  - 图 3：配 `实验室图片/TUV南德、莱茵合作实验室.png`，主标题"国际权威合作实验室" + 副标题"TUV南德/莱茵 · CSA · CQC · Intertek" + 按钮"查看资质"
  - 图 4（可选）：配 `实验室图片/电磁兼容实验室.png`，主标题"CNAS 认可核心实验室" + 副标题"EMC · 安规 · 化学 · 射频 全面检测能力" + 按钮"了解能力"
- **视觉**：深蓝渐变遮罩（从左到右 `from-primary-900/70`）+ 左对齐白色文案
- **移动端**：高度自适应（`h-64`），文案字号缩小，副标题可隐藏
- **组件实现**：自建轻量轮播（不引第三方库），用 `setInterval` + Vue `<transition>` 实现淡入淡出效果
- **A11y**：轮播容器 `role="region" aria-label="banner 轮播"`，指示器 `aria-label`，支持键盘左右切换

### 3.4 模块 3：关于我们（改造现有 About 区块）

- **布局**：左文右图（公司前台照片），深蓝标题 + 正文 + "了解更多"按钮
- **内容**（来自宣传手册原文）：

> 东莞市公信检测技术有限公司（英文简称"GXJC"），是专业的第三方检测、鉴定、验货及认证服务平台，专门从事进出口商品的电子电器、机械、灯具、玩具、建筑建材等产品的电磁兼容（EMC）、安规（LVD）、射频（RF）、环保（ROHS）、机械安全、光性能等检测，并提供全方位国际认证服务。TUV莱茵、TUV南德、BV、Intertek、欧陆目击实验室。
>
> 公司坐落于东莞松山湖高新技术产业开发区，这里是粤港澳大湾区的几何中心、广深科技创新走廊的核心节点。

- **素材**：`设计素材/公司照片/公司前台.jpg`
- **i18n**：文案走 locale 文件
- **二期入口**："了解更多"按钮预留详情页跳转

### 3.5 模块 4：核心优势（新建）

- **形式**：深蓝背景全宽区块，数据卡片网格（桌面 1 行 5 列 / 平板 2-3 列 / 移动 2 列）
- **内容**（来自宣传手册"核心优势"区块，共 5 项数据）：

| 数据 | 标签 |
|------|------|
| 19 | 国际合作授权 |
| 100+ | 成功认证项目 |
| 8 | 大认证品类 |
| 300+ | 社会荣誉 |
| 100+ | 服务企业客户 |

> 注：宣传手册原文未给出"核心实验室数量"作为数据卡，实验室数量在"资质与合作实验室"模块以实际展示体现，此处不重复。

- **视觉**：大字号数字（`text-4xl font-bold text-accent`）+ 小字标签，卡片半透明白底
- **底部标语**：居中显示"CNAS/CE/A2LA/FCC/CSA 权威资质 · TUV南德/莱茵/SGS 等授权 · AI 助力检测认证流程"
- **交互**：数字进入视口时滚动动画（可选，用 `IntersectionObserver` 触发）

### 3.6 模块 5：服务项目 Tab（新建，核心模块）

- **形式**：Tab 切换
- **Tab 分类**（基于宣传手册"认证服务与范围"重新归类；与参考站安信"认证/体系/功效"分类不同，因公信业务无体系认证与功效医疗，故按"国际/国内/检测"维度划分）：

**Tab 1 — 国际认证**（宣传手册列出的认证清单）：
CE / FCC / CB / UL / ETL / CSA / SAA / GS / PSE / TUV-Mark / CEC / UKCA

**Tab 2 — 国内认证**：
CCC / CQC

**Tab 3 — 检测项目**（基于宣传手册业务范围）：
EMC 电磁兼容 / LVD 安规 / RF 射频 / ROHS 环保 / 机械安全 / 光性能

- **展示**：每个 Tab 下用网格卡片列出具体项目（图标 + 名称 + 简述），每行 3-4 个
- **认证简述**（来自宣传手册原文摘录）：
  - **CE认证**：产品进入欧盟及欧洲经济区市场的强制性安全通行证
  - **CB认证**：国际电工委员会全球互认体系，"一次测试，多证通行"
  - **FCC认证**：美国联邦通信委员会对电子产品的电磁兼容强制认证
  - **UL/ETL认证**：产品安全认证标志，UL 由美国保险商实验室颁发，ETL 由 Intertek 颁发
- **交互**：Tab 切换有过渡动画，卡片悬浮上移 + 阴影
- **A11y**：Tab 容器 `role="tablist"`，Tab 项 `role="tab" aria-selected`，面板 `role="tabpanel"`
- **二期入口**：卡片点击预留详情页跳转

**数据结构示例**：

```js
const serviceTabs = [
  {
    key: 'international',
    labelKey: 'service_tab_international',
    items: [
      { nameKey: 'cert_ce', descKey: 'cert_ce_desc', icon: markRaw(Award) },
      { nameKey: 'cert_fcc', descKey: 'cert_fcc_desc', icon: markRaw(BadgeCheck) },
      { nameKey: 'cert_cb', descKey: 'cert_cb_desc', icon: markRaw(Globe) },
      // UL/ETL/CSA/SAA/GS/PSE/TUV-Mark/CEC/UKCA
    ]
  },
  { key: 'domestic', labelKey: 'service_tab_domestic', items: [...] },
  { key: 'testing', labelKey: 'service_tab_testing', items: [...] }
]
```

### 3.7 模块 6：服务领域（新建）

- **形式**：网格卡片（桌面 4 列，平板 2 列，移动 1 列），每张卡 = 产品图 + 领域名称 + 简述
- **8 大服务品类**（来自宣传手册第 1 页"8 大服务品类"标签 + "服务介绍"图例综合）：

| 序号 | 领域 | 简述（来自宣传手册） |
|------|------|------|
| 1 | 电子电器 | 专注于电子电器产品的检测与认证，获 CNAS、A2LA、FCC、TUV、Intertek 等资质 |
| 2 | 音视频类 | 个人计算机、打印机、传真机等 IT 类产品检测认证 |
| 3 | 锂电池类 | 手机、笔记本、无人机、移动电源、电子烟等消费类锂电池检测 |
| 4 | 机械设备 | 电动工具、园林机械、数控机床、包装机械等检测 |
| 5 | 灯具类 | LED 灯具、节能灯、筒灯等成品灯具及核心组件检测 |
| 6 | 玩具 | 玩具产品出口认证（EN 71 等） |
| 7 | 建筑建材 | 建材出口中东等市场认证 |
| 8 | 动力电池 | 动力电池/储能电池产品出口各国认证（与消费类锂电池区分） |

> 注：宣传手册"8 大服务品类"图例含"锂电池"与"电池"两项，为避免语义重叠，本设计将第 8 项明确为"动力电池"。若实际业务中两项确为同一品类，可合并为 7 品类并调整网格布局。

- **素材**：`设计素材/一些可参考的官方图片/` 中的 JPG
- **交互**：卡片悬浮放大图片 + 显示"查看详情"遮罩
- **二期入口**：点击预留详情页跳转

### 3.8 模块 7：服务流程（新建）

- **形式**：横向流程步骤（桌面 5 列，移动纵向），步骤间用箭头/连线连接
- **5 步流程**（来自宣传手册"服务流程"）：

| 步骤 | 标题 | 说明 |
|------|------|------|
| 01 | 提交申请 | 提交申请并确认认证范围和要求 |
| 02 | 初步评估 | 对申请方的管理体系和产品进行初步评估和审核 |
| 03 | 复审 | 对申请方的生产场地、管理体系和产品进行审核 |
| 04 | 报告与证书 | 根据审核结果出具报告并颁发相应的证书 |
| 05 | 监督与复审 | 对获得认证的组织进行监督和定期复审以确保持续符合标准要求 |

- **视觉**：每步圆形序号 + 图标 + 标题 + 说明，深蓝序号 + 灰色连线
- **交互**：步骤进入视口时依次淡入（可选）

### 3.9 模块 8：资质与合作实验室（新建）

- **形式**：分两部分纵向排列
  - **资质展示区**：资质徽章横排展示（图标 + 名称）
  - **核心实验室**：6 大实验室图片网格（3 列），每张图带标题与说明

**资质清单**（来自宣传手册"资质展示区"）：
CNAS / A2LA / FCC / CSA / TUV SUD / TUV Rheinland / CQC / CEC / Intertek

**6 大核心实验室**（来自宣传手册"核心实验室"，对应已有图片素材）：

| 实验室 | 说明（宣传手册摘录） | 素材 |
|--------|----------------------|------|
| 电磁兼容实验室 | 3 米法全电波暗室，德国 R&S 接收机，通过 CNAS 认可 | `实验室图片/电磁兼容实验室.png` |
| 化学检测实验室 | 依据 ISO/IEC 17025 建设，覆盖 ROHS/REACH，气相色谱-质谱联用仪 | `实验室图片/化学实验室.png` |
| 安规检测实验室 | TUV/CSA/CQC 合作实验室，耐压/绝缘/泄漏/接地/灼热丝/IP 防尘防水 | `实验室图片/安规实验室.png`、`安规实验室2.png` |
| TUV南德、莱茵合作实验室 | 安规/EMC/机械安全数据互认，可申请 GS/CE/CB 证书 | `实验室图片/TUV南德、莱茵合作实验室.png` |
| 加拿大 CSA 合作实验室 | 北美市场安规测试，本地化测试无需寄样海外 | `实验室图片/加拿大CSA合作实验室.png` |
| 中国质量认证中心 CQC 合作实验室 | CCC 强制认证及 CQC 自愿性认证检测服务 | `实验室图片/中国质量认证中心CQC合作实验室.png` |

- **目的**：建立权威信任感

### 3.10 模块 9：典型案例（新建）

- **形式**：案例卡片网格（3 列桌面 / 1 列移动），每张卡含项目信息
- **3 个典型案例**（来自宣传手册"典型案例"，项目信息按 OCR 原文保留）：

| 案例 | 项目类型 | 客户需求 | 服务内容 | 认证结果 |
|------|----------|----------|----------|----------|
| 案例 1 | 数控机床出口北美 | CE+ROHS 认证 | 安规+EMC+光性能+化学 | 获 UL 认证 |
| 案例 2 | 玩具出口欧盟 | EN 71 全项 | 物理+燃烧+化学 | 顺利清关 |
| 案例 3 | 建材出口中东 | CE+ROHS 认证 | 机械安全+EMC / 物理性能+化学 | 顺利清关 |

- **客户评价**（独立展示区，不强行对应具体案例，避免 OCR 解析的对应关系错误）：

> "专业高效，帮我们顺利拿到 CE 认证，产品已成功进入德国市场。"
> — 某东莞机械企业客户

> "公信团队响应很快，从测试到拿到 FCC 证书只用了 3 周，非常满意。"
> — 某深圳电子企业客户

> 注：宣传手册 OCR 中案例与评价的对应关系存在矛盾（如"玩具出口欧盟"配"FCC 证书"评价），故评价独立展示。待用户提供真实对应关系后可调整为一一对应。

- **视觉**：案例卡片顶部标签（项目类型）+ 中部表格（需求/内容/结果）；评价区用引用块样式横向排列
- **二期入口**：底部"查看更多案例"按钮预留

### 3.11 模块 10：联系 CTA（改造现有 Contact 区块）

- **布局**：深蓝背景（`bg-primary-900`）全宽区块，左联系信息 + 右留言表单（保留现有表单）
- **联系信息**（来自宣传手册，全部为真实值）：

| 项目 | 值 |
|------|-----|
| 服务热线 | 15207111291 |
| 公司邮箱 | lj729614937@gmail.com |
| 公司官网 | www.gx-test.com |
| 公司地址 | 广东省大朗镇佛子凹村佛富路98号 |

- **醒目电话**：大字号显示 `15207111291` + "服务热线"标签 + 电话图标，使用 `tel:` 链接
- **表单**：保留现有留言表单（姓名/电话/需求），提交暂为前端提示（`alert` 或 toast）

### 3.12 模块 11：Footer（改造现有）

- **内容**：
  - 公司全称：东莞市公信检测技术有限公司
  - 英文简称：GXJC（Gongxin Testing）
  - 联系信息：电话 15207111291 / 邮箱 lj729614937@gmail.com / 地址 广东省大朗镇佛子凹村佛富路98号
  - 导航链接 + 版权 + 备案号占位 `[待提供]`
- **简化**：移除参考站的客服微信二维码（不需要）

---

## 4. 视觉设计系统

### 4.1 配色方案（深蓝专业风）

更新 `tailwind.config.js` 的 `primary` 色板：

```
primary（深蓝，基于 Tailwind blue 色阶调整）:
  - primary-50:  #eff6ff  (浅底背景)
  - primary-100: #dbeafe  (浅色徽章)
  - primary-200: #bfdbfe
  - primary-300: #93c5fd
  - primary-400: #60a5fa
  - primary-500: #1e40af  (主按钮 / 标题)
  - primary-600: #1e3a8a  (悬浮态，比 500 更深)
  - primary-700: #1e3a8a  (深色区块背景)
  - primary-800: #172554
  - primary-900: #0f172a  (Footer / CTA 背景)

辅助色:
  - accent: #0ea5e9 (青蓝点缀，用于图标 / 数据高亮)

中性色:
  - gray-50 / gray-100 / gray-600 / gray-900 (文本 / 背景层次)

功能色:
  - success #16a34a
  - warning #f59e0b
  - danger  #dc2626
```

> 注：primary-600 与 primary-700 同色为有意设计（悬浮态与深色区块视觉一致），若需严格递进可将 700 改为 `#172554`。

### 4.2 字体与排版

- **中文字体**：`"PingFang SC", "Microsoft YaHei", sans-serif`（系统字体栈，零加载成本）
- **英文字体**：`"Inter", system-ui, sans-serif`
- **标题层级**：
  - H1：`text-4xl md:text-5xl font-bold text-gray-900`
  - H2：`text-3xl md:text-4xl font-bold text-gray-900`
  - H3：`text-xl font-semibold text-gray-900`
- **正文**：`text-base text-gray-600 leading-relaxed`
- **章节标题样式**：统一"中文标题 + 英文副标题"双行样式，**居中对齐**，如"关于我们 / About Us"，下方加短装饰线（参考安信的双语标题形式，但采用居中布局以匹配整体设计）

### 4.3 间距与布局

- **容器宽度**：`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`（沿用现有）
- **章节间距**：`py-20`（桌面）/ `py-12`（移动）
- **卡片圆角**：`rounded-xl`（12px）
- **阴影**：默认无，悬浮 `hover:shadow-xl transition-all`

### 4.4 组件视觉规范

| 组件 | 样式规范 |
|------|----------|
| 按钮-主要 | `bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors` |
| 按钮-次要 | `border-2 border-primary-500 text-primary-500 hover:bg-primary-50 transition-colors` |
| 卡片 | `bg-white rounded-xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all` |
| 章节标题 | 居中，中文 H2 + 英文小字副标题 + 下方短装饰线（`w-16 h-1 bg-primary-500 mx-auto`） |
| Tab 选中态 | 下划线 `border-b-2 border-primary-500` + 深蓝文字 |
| Tab 未选中 | 灰色文字 `text-gray-500` |
| 流程步骤序号 | `w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center` |

### 4.5 响应式断点

- **移动端**（<768px）：单列布局，Banner 高度 `h-64`，Tab 横向滚动，导航折叠为汉堡菜单，服务流程纵向排列
- **平板**（768-1024px）：2 列网格
- **桌面**（>1024px）：3-4 列网格，完整布局

### 4.6 可访问性（A11y）

- Banner 轮播：`role="region"` + `aria-label`，指示器可键盘操作，支持左右键切换
- Tab 切换：`role="tablist"` / `role="tab"` / `aria-selected` / `role="tabpanel"`
- 电话链接：使用 `<a href="tel:15207111291">` 协议
- 图片：所有 `<img>` 配 `alt` 属性（走 i18n）
- 流程步骤：`<ol>` 语义化列表

### 4.7 性能约束

- Banner 首屏图片优先加载，其余图片 `loading="lazy"`
- 图片提供 `srcset` 多分辨率适配（如有条件生成 WebP）
- 各模块图片合计体积预算 < 2MB
- 轮播自动播放暂停于 `prefers-reduced-motion` 场景

---

## 5. 组件拆分与文件结构

### 5.1 新建/改造组件清单

```
src/
├── components/
│   ├── Header.vue          # 改造：加电话按钮 + 调整导航项 + 移动端汉堡菜单
│   ├── Footer.vue          # 改造：补充真实联系信息 + 备案占位
│   ├── BannerCarousel.vue  # 新建：全宽轮播（替代 Hero.vue）
│   ├── SectionTitle.vue    # 新建：可复用章节标题（中文+英文+装饰线）
│   ├── CoreStrengths.vue   # 新建：核心优势数据卡片
│   ├── ServiceTabs.vue     # 新建：服务项目 Tab 切换
│   ├── ServiceFields.vue   # 新建：服务领域 8 品类网格
│   ├── ServiceProcess.vue  # 新建：服务流程 5 步
│   ├── Qualifications.vue  # 新建：资质徽章 + 6 大实验室
│   ├── TypicalCases.vue    # 新建：典型案例卡片
│   └── ContactCTA.vue      # 新建：联系 CTA 区块（改造 Contact.vue）
├── views/
│   └── Home.vue            # 改造：编排 11 个模块
├── assets/
│   └── images/             # 新建：按模块组织图片
│       ├── logo/
│       ├── banner/
│       ├── labs/
│       └── fields/
└── i18n/locales/           # 补充新增 key（zh-CN / zh-TW / en）
```

### 5.2 组件职责说明

| 组件 | 职责 | 依赖 |
|------|------|------|
| `Header.vue` | 顶部导航 + 语言切换 + 电话按钮 | lucide 图标、i18n |
| `BannerCarousel.vue` | 全宽图片轮播 + 文案叠加 | 本地图片资源 |
| `SectionTitle.vue` | 可复用章节标题（props: 中文标题 key、英文副标题） | i18n |
| `CoreStrengths.vue` | 核心优势数据卡片网格 | i18n |
| `ServiceTabs.vue` | 服务项目 Tab 切换 + 项目卡片网格 | lucide 图标、i18n |
| `ServiceFields.vue` | 服务领域 8 品类图片卡片网格 | 本地图片资源、i18n |
| `ServiceProcess.vue` | 服务流程 5 步横向/纵向 | lucide 图标、i18n |
| `Qualifications.vue` | 资质徽章 + 6 大实验室图片网格 | 本地图片资源、i18n |
| `TypicalCases.vue` | 典型案例卡片网格 | i18n |
| `ContactCTA.vue` | 联系信息 + 留言表单 | i18n |
| `Footer.vue` | 页脚信息 | i18n |

---

## 6. i18n 与内容策略

### 6.1 多语言策略

- **保留**：现有 zh-CN / zh-TW / en 三语 + IP 检测逻辑
- **新增 key 命名**：沿用 snake_case，按模块前缀分组
  - `banner_*`（轮播文案）
  - `about_*`（关于我们）
  - `strengths_*`（核心优势）
  - `service_tab_*` / `cert_*` / `test_*`（服务项目）
  - `field_*`（服务领域）
  - `process_*`（服务流程）
  - `qual_*`（资质合作）
  - `case_*`（典型案例）
  - `cta_*`（联系区块）
- **电话号码**：硬编码在组件中（`15207111291`），不走 i18n

### 6.2 内容来源说明

本次设计内容**全部来自公司官方宣传手册**（`设计素材/宣传手册.pdf`），已通过 OCR 提取并校对。以下内容为真实值，非占位：

| 内容类型 | 来源 | 状态 |
|----------|------|------|
| 公司简介 | 宣传手册第 2 页"企业简介" | 真实值 |
| 核心优势数据 | 宣传手册第 2 页"核心优势" | 真实值 |
| 认证项目清单 | 宣传手册第 2 页"认证服务与范围" | 真实值 |
| 服务领域 8 品类 | 宣传手册第 1 页"8 大服务品类" | 真实值 |
| 服务流程 5 步 | 宣传手册第 2 页"服务流程" | 真实值 |
| 实验室说明 | 宣传手册第 2 页"核心实验室" | 真实值 |
| 典型案例 | 宣传手册第 1 页"典型案例" | 真实值 |
| 联系信息 | 宣传手册第 1 页底部 | 真实值 |
| 认证简述（CE/CB/FCC/UL） | 宣传手册第 2 页 | 真实值 |
| 备案号 | — | `[待提供]` |

### 6.3 图片资源映射

| 模块 | 素材来源 | 用途 |
|------|----------|------|
| Logo（主） | `设计素材/公司logo/115a0af6e070ff1f01405d8abe0a163b.png` | Header 品牌 |
| Logo（备） | `设计素材/公司logo/ccc047662b2f1fd5501452abf4093daa.png` | 备用（Footer 或深色背景版） |
| Banner 图 1 | `设计素材/公司照片/公司前台.jpg` | 轮播主图 |
| Banner 图 2 | `设计素材/公司照片/实验室.jpg` | 轮播主图 |
| Banner 图 3 | `设计素材/实验室图片/TUV南德、莱茵合作实验室.png` | 轮播主图 |
| Banner 图 4 | `设计素材/实验室图片/电磁兼容实验室.png` | 轮播主图 |
| 关于我们 | `设计素材/公司照片/公司前台.jpg` | 简介配图 |
| 服务领域 | `设计素材/一些可参考的官方图片/*.jpg`（4 张） | 领域卡片图（4 张图对应 4 个主要领域，其余领域用纯色卡占位） |
| 资质-EMC 实验室 | `设计素材/实验室图片/电磁兼容实验室.png` | 实验室展示 |
| 资质-化学实验室 | `设计素材/实验室图片/化学实验室.png` | 实验室展示 |
| 资质-安规实验室 | `设计素材/实验室图片/安规实验室.png`、`安规实验室2.png` | 实验室展示（2 张可择一或组合） |
| 资质-TUV 合作 | `设计素材/实验室图片/TUV南德、莱茵合作实验室.png` | 合作展示 |
| 资质-CSA 合作 | `设计素材/实验室图片/加拿大CSA合作实验室.png` | 合作展示 |
| 资质-CQC 合作 | `设计素材/实验室图片/中国质量认证中心CQC合作实验室.png` | 合作展示 |

**未使用素材说明**：
- `设计素材/公司照片/公司培训.jpg`、`收发件.jpg`：一期未规划使用，可在二期"关于我们详情页"或"公司风采"模块使用
- `设计素材/一些可参考的官方图片/` 4 张 JPG 具体对应：因图片为参考性质，实施时需根据图片实际内容匹配到电子电器/灯具/机械/玩具等具体领域

### 6.4 i18n key 完整清单（zh-CN）

实施时需在 `src/i18n/locales/zh-CN.json` 补充以下 key（同样需同步 zh-TW.json 与 en.json）：

```
# Header
nav_home, nav_about, nav_strengths, nav_products, nav_fields, nav_process,
nav_qualifications, nav_cases, nav_contact, phone_label

# Banner
banner_1_title, banner_1_subtitle, banner_1_btn
banner_2_title, banner_2_subtitle, banner_2_btn
banner_3_title, banner_3_subtitle, banner_3_btn
banner_4_title, banner_4_subtitle, banner_4_btn

# 关于我们
about_title, about_subtitle, about_desc_1, about_desc_2, about_btn

# 核心优势
strengths_title, strengths_subtitle
strengths_intl_auth, strengths_cert_projects, strengths_categories,
strengths_honors, strengths_clients, strengths_tagline

# 服务项目
service_tab_international, service_tab_domestic, service_tab_testing
cert_ce, cert_ce_desc, cert_fcc, cert_fcc_desc, cert_cb, cert_cb_desc,
cert_ul, cert_ul_desc, cert_etl, cert_etl_desc, cert_csa, cert_csa_desc,
cert_saa, cert_gs, cert_pse, cert_tuv, cert_cec, cert_ukca,
cert_ccc, cert_ccc_desc, cert_cqc, cert_cqc_desc,
test_emc, test_emc_desc, test_lvd, test_lvd_desc, test_rf, test_rf_desc,
test_rohs, test_rohs_desc, test_mech, test_mech_desc, test_light, test_light_desc

# 服务领域
field_title, field_subtitle
field_1_name, field_1_desc, field_2_name, field_2_desc, ... field_8_name, field_8_desc

# 服务流程
process_title, process_subtitle
process_1_title, process_1_desc, process_2_title, process_2_desc,
process_3_title, process_3_desc, process_4_title, process_4_desc,
process_5_title, process_5_desc

# 资质与合作实验室
qual_title, qual_subtitle, qual_certs_title, qual_labs_title
lab_emc, lab_emc_desc, lab_chem, lab_chem_desc, lab_safety, lab_safety_desc,
lab_tuv, lab_tuv_desc, lab_csa, lab_csa_desc, lab_cqc, lab_cqc_desc

# 典型案例
case_title, case_subtitle
case_1_type, case_1_need, case_1_service, case_1_result
case_2_type, case_2_need, case_2_service, case_2_result
case_3_type, case_3_need, case_3_service, case_3_result
case_quote_1, case_quote_1_from, case_quote_2, case_quote_2_from
case_more_btn

# 联系 CTA
cta_title, cta_phone_label, cta_email_label, cta_website_label, cta_address_label
cta_form_name, cta_form_phone, cta_form_message, cta_form_submit, cta_form_success

# Footer
footer_company, footer_company_en, footer_copyright, footer_icp
```

### 6.5 验收策略

实施完成后需通过以下验收：

| 验收项 | 方法 |
|--------|------|
| 视觉对照 | 与参考站安信的关键模块（Banner/Tab/服务领域/资质）布局对照 |
| i18n 完整性 | 切换简体/繁体/英文三语，确认无 key 缺失（显示原始 key 而非翻译） |
| 移动端断点 | 在 375px（iPhone SE）/ 768px（iPad）/ 1024px / 1440px 四个宽度手测 |
| 电话链接 | 点击 Header 与 CTA 的电话按钮，确认唤起拨号 |
| 图片加载 | 所有图片正常显示，alt 文案存在 |
| 体积预算 | Lighthouse 审计，首屏图片合计 < 2MB |
| A11y | Lighthouse Accessibility 评分 ≥ 90 |

---

## 7. 关键约束与决策记录

1. **电话号码 `15207111291`** 必须在 Header 右上角与联系 CTA 区块两处醒目展示，使用 `tel:` 协议
2. **不引入 vue-router**：一期单页滚动，二期再加路由
3. **不引第三方轮播库**：自建轻量轮播组件
4. **图片用本地资源**：所有图片从 `设计素材/` 复制到 `src/assets/images/`，由 Vite 打包
5. **内容来自宣传手册**：公司简介、认证清单、服务领域、实验室说明、典型案例等均为宣传手册真实内容，非占位
6. **二期详情页入口**：一期"查看更多"按钮做占位（样式保留，点击提示"即将上线"）
7. **11 个模块**：在原 8 模块基础上，根据宣传手册内容新增"核心优势""服务流程""典型案例"三个模块
8. **服务项目 Tab 分类调整**：因公信业务无体系认证与功效医疗，将参考站"认证/体系/功效"分类调整为"国际认证/国内认证/检测项目"
9. **典型案例评价独立展示**：OCR 提取的案例与评价对应关系存在矛盾，评价独立展示，待用户提供真实对应关系
10. **服务领域 8 品类**：宣传手册"锂电池"与"电池"两项可能重叠，本设计将第 8 项明确为"动力电池"，待用户确认
11. **核心优势 5 项数据**：严格按宣传手册原文，不自行添加"实验室数量"数据卡

---

## 8. 后续步骤

1. 用户审阅本设计文档
2. 调用 `writing-plans` skill 生成详细实施计划
3. 按实施计划执行代码改造
