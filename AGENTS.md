---
name: gongxin-home
description: 国信科技门户网站 — 项目专属 AI 编码规则
---

# gongxin-home

## 项目简介

国信科技公司门户网站，纯前端展示型项目。

**本地开发：** http://localhost:5173/
**生产环境：** https://gongxin-home.vercel.app/（Vercel 部署）

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.4+ | 前端框架 |
| Vite | 6.5+ | 构建工具 |
| Tailwind CSS | 3.4+ | CSS 框架 |
| Lucide Vue Next | ^0.2 | 图标库 |
| vue-i18n | 9 | 多语言支持 |

## 目录结构

```
gongxin-home/
├── src/
│   ├── components/         # 公共组件
│   │   ├── Header.vue      # 导航头部 + 语言切换器
│   │   ├── Footer.vue      # 页脚
│   │   └── Hero.vue        # 首页横幅
│   ├── views/              # 页面视图
│   │   ├── Home.vue        # 首页
│   │   ├── About.vue       # 关于我们
│   │   ├── Products.vue    # 产品服务
│   │   └── Contact.vue     # 联系我们
│   ├── i18n/               # 国际化
│   │   ├── index.js        # i18n 初始化 + IP检测逻辑
│   │   └── locales/        # 语言文件
│   │       ├── zh-CN.json  # 简体中文
│   │       ├── zh-TW.json  # 繁体中文
│   │       └── en.json     # 英文
│   ├── App.vue             # 根组件
│   ├── main.js             # 异步启动 + i18n注入
│   └── style.css           # Tailwind 样式入口
├── docs/superpowers/       # 设计文档
│   ├── specs/              # 技术规格
│   └── plans/              # 实现计划
├── index.html
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 编码约定

1. **组件风格**：单文件组件（SFC），`<script setup>` + Composition API
2. **样式方案**：Tailwind CSS 类名，无自定义 CSS
3. **图标**：统一使用 `lucide-vue-next`，通过 `markRaw` 包装避免响应式问题
4. **多语言**：所有文本通过 `$t(key)` 引用，key 命名使用 snake_case
5. **IP 检测**：使用 `ipapi.co` 免费 API，结果缓存到 localStorage

## 文档规则

AI 生成的开发计划和设计文档必须存储在 `docs/` 目录中：

```
docs/
├── superpowers/
│   ├── specs/                    # 技术设计文档
│   │   └── YYYY-MM-DD-<主题>-design.md
│   └── plans/                    # 实现计划文档
│       └── YYYY-MM-DD-<主题>-plan.md
└── README.md                     # 项目文档索引（可选）
```

**命名规则：**
- 设计文档：`docs/superpowers/specs/YYYY-MM-DD-<主题>-design.md`
- 实现计划：`docs/superpowers/plans/YYYY-MM-DD-<主题>-plan.md`

## 页面结构

| id | 页面 | 说明 |
|----|------|------|
| `#home` | 首页 | Hero + 核心业务 + 公司优势 |
| `#about` | 关于我们 | 公司简介 + 发展历程 + 企业文化 |
| `#products` | 产品服务 | 分类筛选 + 产品卡片 |
| `#contact` | 联系我们 | 联系信息 + 留言表单 |

## 启动命令

```bash
npm install          # 安装依赖
npm run dev          # 开发模式（localhost:5173）
npm run build        # 生产构建
```

## 全局规则引用

本项目遵循 [工作空间全局规则](../../AGENTS.md) 中定义的：
- Superpowers 开发工作流
- Commit Message 格式规范
