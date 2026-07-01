# 吸边悬浮窗（FloatingSidebar）设计文档

- **日期**：2026-07-01
- **状态**：已确认，待编写实现计划
- **作者**：AI 辅助设计

## 一、目标

为网站右侧增加一个吸边悬浮窗，提供「联系我们 / 微信咨询 / 回到顶部」三个快捷入口。悬浮窗有展开和收起两种状态，使用弹簧动画切换。仅在桌面端（`lg` 断点以上）显示，移动端隐藏。

## 二、设计决策汇总

| 维度 | 决策 |
|------|------|
| 默认状态 | 展开态 |
| 展开触发 | 点击收起态胶囊整体 |
| 收起触发 | 点击展开态右上角关闭图标 |
| 收起态形态 | 竖排「在线咨询」文字 + 展开箭头 + 跳动圆点 |
| 展开态按钮 | 圆形图标 + 文字标签（垂直堆叠），独立白色卡片 |
| 二维码气泡 | 经典款：白底 + 二维码 + 一行提示 + 小三角 |
| 移动端 | 隐藏（`hidden lg:flex`） |
| 二维码图片 | 先用占位图，后续替换 |
| 颜色体系 | 全部使用网站 primary 主题色系 |
| 实现方案 | 单组件 + Tailwind 原生动画（在 tailwind.config.js 注册 keyframes） |

## 三、组件架构

### 3.1 文件结构

- **新增组件**：`src/components/FloatingSidebar.vue`
- **挂载位置**：`src/App.vue` 根 `<div>` 内，`<Footer />` 之后
- **z-index**：`z-40`（低于 Header 的 `z-50`，避免遮挡导航/语言下拉菜单）
- **响应式**：`hidden lg:flex`（移动端隐藏，桌面端 `lg` 断点以上显示）

### 3.2 状态管理

组件内部状态，无需全局 store：

```js
const isExpanded = ref(true)      // 默认展开
const showQrCode = ref(false)    // 二维码气泡显示控制（仅桌面端悬停触发）
```

## 四、展开态设计

圆角矩形容器，吸附页面右侧垂直居中。

### 4.1 容器规格

| 属性 | 值 |
|------|-----|
| 背景 | `bg-primary-100` (#dbeafe) |
| 圆角 | `rounded-l-2xl`（左侧圆角，右侧贴边） |
| 宽度 | 84px |
| 内边距 | `px-3 py-3.5` |
| 阴影 | 自定义 `-4px 4px 16px rgba(30,64,175,0.15)` |
| 边框 | `border border-primary-200`（左侧+上下） |
| 定位 | `fixed right-0 top-1/2 -translate-y-1/2` |

### 4.2 按钮列表

按钮容器：纵向 `flex flex-col gap-2.5`。每个按钮是独立白色卡片 `bg-white/70 rounded-xl px-1 py-2`，内含圆形图标（上）+ 文字标签（下）`flex flex-col items-center gap-1`。

| 顺序 | 按钮 | 图标（lucide） | 图标背景 | 文字颜色 | 行为 |
|------|------|---------------|---------|---------|------|
| 1 | 联系我们 | `Phone` | `bg-primary-500` (#1e40af) | `text-primary-700` | 滚动到 `#contact` |
| 2 | 微信咨询 | `MessageCircle` | `bg-primary-600` (#1e3a8a) 稍深区分 | `text-primary-700` | 悬停弹出二维码气泡 |
| 3 | 回到顶部 | `ArrowUp` | `bg-primary-500` (#1e40af) | `text-primary-700` | `window.scrollTo({top:0})` |

- 图标尺寸：`w-7 h-7`（28px），圆形 `rounded-full`，白色图标 `text-white`
- 文字标签：`text-[10px] font-semibold text-center leading-tight`

### 4.3 关闭图标

展开态右上角加一个关闭按钮：
- 图标：`X`（lucide），`w-4 h-4`
- 颜色：`text-primary-600`
- 位置：绝对定位，悬浮窗右上角内侧
- 行为：`@click="isExpanded = false"`

## 五、收起态设计

半胶囊形状，吸附页面右侧垂直居中。

### 5.1 容器规格

| 属性 | 值 |
|------|-----|
| 背景 | `bg-primary-600` (#1e3a8a) |
| 圆角 | `rounded-l-3xl`（左侧大圆角形成半胶囊） |
| 宽度 | 40px |
| 内边距 | `px-2 py-3.5` |
| 阴影 | 自定义 `-4px 4px 16px rgba(30,64,175,0.25)` |
| 定位 | `fixed right-0 top-1/2 -translate-y-1/2` |
| 可点击 | 整个胶囊 `@click="isExpanded = true"`，`cursor-pointer` |

### 5.2 内容（从上到下）

纵向 `flex flex-col items-center gap-2`：

1. **展开箭头**：`ChevronRight` 图标，`text-white w-4 h-4`
2. **竖排文字「在线咨询」**：
   - `writing-mode: vertical-rl`
   - `text-primary-200` (#bfdbfe)
   - `text-[9px] tracking-wider font-semibold`
3. **跳动小圆点**：
   - `w-1.5 h-1.5 rounded-full bg-primary-400` (#60a5fa)
   - 使用 `animate-pulse`（Tailwind 内置）或自定义闪烁动画

## 六、二维码气泡设计

悬停微信按钮时从左侧弹出，弹簧动画。

### 6.1 容器规格

| 属性 | 值 |
|------|-----|
| 背景 | `bg-white` |
| 边框 | `border border-primary-200` |
| 圆角 | `rounded-2xl` |
| 内边距 | `p-3.5` |
| 阴影 | `shadow-xl`（`0 8px 32px rgba(30,64,175,0.2)`） |
| 宽度 | 160px |
| 定位 | 绝对定位，`right: calc(100% + 12px)`，`top-1/2 -translate-y-1/2` |

### 6.2 内容

1. **二维码区域**：
   - 尺寸 132×132
   - `bg-primary-50 rounded-lg border border-dashed border-primary-300`
   - 内含占位图（后续替换为真实微信二维码图片）
2. **提示文字**：
   - 「扫码添加微信咨询」
   - `text-primary-700 text-xs font-semibold text-center mt-2.5`

### 6.3 小三角

指向悬浮窗的指示三角：
- 实现方式：绝对定位的 div，`w-4 h-4 bg-white` 旋转 45°
- 位置：气泡右侧 `right: -8px`，垂直居中
- 边框：`border-r border-t border-primary-200`（与气泡边框衔接）

### 6.4 交互

- **桌面端**：`@mouseenter` 显示 / `@mouseleave` 隐藏（绑在微信按钮容器上）
- **移动端**：整个悬浮窗已隐藏，无需处理点击逻辑
- **动画**：弹出使用 `animate-spring-pop`（见下文动画方案）

## 七、动画方案

在 `tailwind.config.js` 的 `theme.extend.keyframes` 和 `theme.extend.animation` 中新增。

### 7.1 新增 keyframes

```js
keyframes: {
  // 已有 blink 保持不变
  'spring-expand': {
    '0%':   { transform: 'scale(0.8) translateX(20px)', opacity: '0' },
    '60%':  { transform: 'scale(1.05) translateX(-4px)', opacity: '1' },
    '100%': { transform: 'scale(1) translateX(0)', opacity: '1' },
  },
  'spring-collapse': {
    '0%':   { transform: 'scale(1) translateX(0)', opacity: '1' },
    '100%': { transform: 'scale(0.8) translateX(20px)', opacity: '0' },
  },
  'spring-pop': {
    '0%':   { transform: 'scale(0.5) translateX(10px)', opacity: '0' },
    '70%':  { transform: 'scale(1.08) translateX(-2px)', opacity: '1' },
    '100%': { transform: 'scale(1) translateX(0)', opacity: '1' },
  },
},
```

### 7.2 新增 animation

```js
animation: {
  // 已有 blink 保持不变
  'spring-expand':   'spring-expand 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
  'spring-collapse': 'spring-collapse 0.3s ease-in forwards',
  'spring-pop':      'spring-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
},
```

### 7.3 Vue transition 配置

展开/收起切换使用 Vue `<transition>` 包裹，配合自定义过渡类名：

```html
<transition
  enter-active-class="animate-spring-expand"
  leave-active-class="animate-spring-collapse"
>
  <div v-if="isExpanded"><!-- 展开态 --></div>
  <div v-else><!-- 收起态 --></div>
</transition>
```

> 实现约定：使用两个独立的 `<transition>` 分别包裹展开态和收起态，避免 `v-if/v-else` 同级切换的 `mode` 问题。展开态和收起态不会同时出现（由 `isExpanded` 互斥控制）。

## 八、行为逻辑

### 8.1 核心方法

```js
import { ref } from 'vue'
import { Phone, MessageCircle, ArrowUp, ChevronRight, X } from 'lucide-vue-next'

const isExpanded = ref(true)
const showQrCode = ref(false)

const scrollToContact = () => {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
```

### 8.2 滚动行为说明

- 项目 [App.vue](file:///Users/laihao/Project/gongxin-home/src/App.vue) 已设置 `html { scroll-behavior: smooth }`，但为确保行为一致，方法中显式传 `behavior: 'smooth'`
- 「联系我们」依赖页面存在 `id="contact"` 的元素（[Home.vue](file:///Users/laihao/Project/gongxin-home/src/views/Home.vue) 中由 `ContactCTA` 组件提供）

## 九、国际化

在 `src/i18n/locales/` 三个语言文件中新增以下 key：

| key | zh-CN | zh-TW | en |
|-----|-------|-------|-----|
| `sidebar_contact` | 联系我们 | 聯繫我們 | Contact Us |
| `sidebar_wechat` | 微信咨询 | 微信諮詢 | WeChat |
| `sidebar_back_top` | 回到顶部 | 回到頂部 | Back to Top |
| `sidebar_collapsed_label` | 在线咨询 | 在線諮詢 | Consult |
| `sidebar_qr_tip` | 扫码添加微信咨询 | 掃碼添加微信諮詢 | Scan to add WeChat |

所有文本通过 `$t(key)` 引用，遵循项目现有 i18n 规范。

## 十、涉及文件变更

| 文件 | 变更类型 | 说明 |
|------|---------|------|
| `src/components/FloatingSidebar.vue` | 新增 | 悬浮窗组件 |
| `src/App.vue` | 修改 | 在 Footer 后挂载 FloatingSidebar |
| `tailwind.config.js` | 修改 | 新增 3 个弹簧动画 keyframes + animation |
| `src/i18n/locales/zh-CN.json` | 修改 | 新增 5 个 sidebar_* key |
| `src/i18n/locales/zh-TW.json` | 修改 | 新增 5 个 sidebar_* key |
| `src/i18n/locales/en.json` | 修改 | 新增 5 个 sidebar_* key |

## 十一、不涉及的范围

- 不修改 Header / Footer / Home 等现有组件的视觉
- 不新增全局状态管理（Pinia 等）
- 不处理移动端的悬浮窗显示（移动端直接隐藏）
- 二维码图片用占位图，不在本期实现真实图片接入
- 不增加路由变化（所有操作在当前页面内完成）
