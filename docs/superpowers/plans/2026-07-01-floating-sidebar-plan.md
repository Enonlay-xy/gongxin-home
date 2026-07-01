# 吸边悬浮窗（FloatingSidebar）实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为网站右侧添加一个吸边悬浮窗，提供「联系我们 / 微信咨询 / 回到顶部」三个快捷入口，支持展开/收起两种状态切换，带弹簧动画。

**Architecture:** 单组件 `FloatingSidebar.vue`，通过 `isExpanded` 响应式变量互斥控制展开态和收起态。动画在 `tailwind.config.js` 中注册为 keyframes，通过 Vue `<transition mode="out-in">` 切换。组件挂载在 `App.vue` 的 Footer 之后。

**Tech Stack:** Vue 3 (`<script setup>`) + Tailwind CSS 3.4 + lucide-vue-next + vue-i18n 9

**Spec:** `docs/superpowers/specs/2026-07-01-floating-sidebar-design.md`

---

## 文件结构

| 文件 | 操作 | 职责 |
|------|------|------|
| `tailwind.config.js` | 修改 | 新增 3 个弹簧动画 keyframes + animation |
| `src/i18n/locales/zh-CN.json` | 修改 | 新增 5 个 sidebar_* 国际化 key |
| `src/i18n/locales/zh-TW.json` | 修改 | 新增 5 个 sidebar_* 国际化 key |
| `src/i18n/locales/en.json` | 修改 | 新增 5 个 sidebar_* 国际化 key |
| `src/components/FloatingSidebar.vue` | 新增 | 悬浮窗组件（展开态 + 收起态 + 二维码气泡） |
| `src/App.vue` | 修改 | 在 Footer 后挂载 FloatingSidebar |

---

### Task 1: 在 tailwind.config.js 注册弹簧动画

**Files:**
- Modify: `tailwind.config.js:28-36`（`keyframes` 和 `animation` 对象）

- [ ] **Step 1: 在 `keyframes` 对象中新增三个动画**

打开 `tailwind.config.js`，在 `theme.extend.keyframes` 中，在已有的 `blink` 之后新增三个 keyframe。

将现有的：

```js
      keyframes: {
        blink: {
          '0%, 100%': { borderColor: '#ef4444' },
          '50%': { borderColor: 'transparent' },
        },
      },
```

替换为：

```js
      keyframes: {
        blink: {
          '0%, 100%': { borderColor: '#ef4444' },
          '50%': { borderColor: 'transparent' },
        },
        'spring-expand': {
          '0%': { transform: 'scale(0.8) translateX(20px)', opacity: '0' },
          '60%': { transform: 'scale(1.05) translateX(-4px)', opacity: '1' },
          '100%': { transform: 'scale(1) translateX(0)', opacity: '1' },
        },
        'spring-collapse': {
          '0%': { transform: 'scale(1) translateX(0)', opacity: '1' },
          '100%': { transform: 'scale(0.8) translateX(20px)', opacity: '0' },
        },
        'spring-pop': {
          '0%': { transform: 'scale(0.5) translateX(10px)', opacity: '0' },
          '70%': { transform: 'scale(1.08) translateX(-2px)', opacity: '1' },
          '100%': { transform: 'scale(1) translateX(0)', opacity: '1' },
        },
      },
```

- [ ] **Step 2: 在 `animation` 对象中新增三个动画引用**

在同一个文件的 `theme.extend.animation` 中，在已有的 `blink` 之后新增三行。

将现有的：

```js
      animation: {
        blink: 'blink 0.6s ease-in-out 0s 3',
      },
```

替换为：

```js
      animation: {
        blink: 'blink 0.6s ease-in-out 0s 3',
        'spring-expand': 'spring-expand 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'spring-collapse': 'spring-collapse 0.3s ease-in forwards',
        'spring-pop': 'spring-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
```

- [ ] **Step 3: 验证 Tailwind 配置语法正确**

Run: `node -e "require('./tailwind.config.js').theme.extend.keyframes['spring-expand']"`
Expected: 输出 `{ '0%': { ... }, '60%': { ... }, '100%': { ... } }` 对象，无报错

- [ ] **Step 4: 提交**

```bash
git add tailwind.config.js
git commit -m "feat: 在 tailwind.config.js 注册悬浮窗弹簧动画 keyframes"
```

---

### Task 2: 添加国际化 key

**Files:**
- Modify: `src/i18n/locales/zh-CN.json:211`（文件末尾 `}` 前）
- Modify: `src/i18n/locales/zh-TW.json:211`（文件末尾 `}` 前）
- Modify: `src/i18n/locales/en.json:211`（文件末尾 `}` 前）

- [ ] **Step 1: 在 zh-CN.json 末尾新增 5 个 key**

打开 `src/i18n/locales/zh-CN.json`，将最后一行：

```json
  "footer_icp": "备案号：[待提供]"
}
```

替换为：

```json
  "footer_icp": "备案号：[待提供]",

  "sidebar_contact": "联系我们",
  "sidebar_wechat": "微信咨询",
  "sidebar_back_top": "回到顶部",
  "sidebar_collapsed_label": "在线咨询",
  "sidebar_qr_tip": "扫码添加微信咨询"
}
```

- [ ] **Step 2: 在 zh-TW.json 末尾新增 5 个 key**

打开 `src/i18n/locales/zh-TW.json`，将最后一行：

```json
  "footer_icp": "備案號：[待提供]"
}
```

替换为：

```json
  "footer_icp": "備案號：[待提供]",

  "sidebar_contact": "聯繫我們",
  "sidebar_wechat": "微信諮詢",
  "sidebar_back_top": "回到頂部",
  "sidebar_collapsed_label": "在線諮詢",
  "sidebar_qr_tip": "掃碼添加微信諮詢"
}
```

- [ ] **Step 3: 在 en.json 末尾新增 5 个 key**

打开 `src/i18n/locales/en.json`，将最后一行：

```json
  "footer_icp": "ICP: [TBD]"
}
```

替换为：

```json
  "footer_icp": "ICP: [TBD]",

  "sidebar_contact": "Contact Us",
  "sidebar_wechat": "WeChat",
  "sidebar_back_top": "Back to Top",
  "sidebar_collapsed_label": "Consult",
  "sidebar_qr_tip": "Scan to add WeChat"
}
```

- [ ] **Step 4: 验证 JSON 语法正确**

Run: `node -e "JSON.parse(require('fs').readFileSync('src/i18n/locales/zh-CN.json','utf8')); JSON.parse(require('fs').readFileSync('src/i18n/locales/zh-TW.json','utf8')); JSON.parse(require('fs').readFileSync('src/i18n/locales/en.json','utf8')); console.log('All JSON valid')"`
Expected: 输出 `All JSON valid`，无报错

- [ ] **Step 5: 提交**

```bash
git add src/i18n/locales/zh-CN.json src/i18n/locales/zh-TW.json src/i18n/locales/en.json
git commit -m "feat: 添加悬浮窗组件的国际化 key（zh-CN/zh-TW/en）"
```

---

### Task 3: 创建 FloatingSidebar.vue 组件

**Files:**
- Create: `src/components/FloatingSidebar.vue`

- [ ] **Step 1: 创建组件文件，写入完整内容**

创建 `src/components/FloatingSidebar.vue`，内容如下：

```vue
<template>
  <div class="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
    <transition
      mode="out-in"
      enter-active-class="animate-spring-expand"
      leave-active-class="animate-spring-collapse"
    >
      <!-- 展开态 -->
      <div
        v-if="isExpanded"
        key="expanded"
        class="relative bg-primary-100 border border-primary-200 border-r-0 rounded-l-2xl px-3 py-3.5 w-[84px] shadow-[-4px_4px_16px_rgba(30,64,175,0.15)]"
      >
        <!-- 关闭按钮 -->
        <button
          @click="isExpanded = false"
          class="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-md hover:bg-primary-700 transition-colors"
          :aria-label="$t('sidebar_collapsed_label')"
        >
          <X class="w-3 h-3" />
        </button>

        <!-- 按钮列表 -->
        <div class="flex flex-col gap-2.5">
          <!-- 联系我们 -->
          <button
            @click="scrollToContact"
            class="flex flex-col items-center gap-1 px-1 py-2 rounded-xl bg-white/70 hover:bg-white transition-colors"
          >
            <div class="w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center text-white">
              <Phone class="w-4 h-4" />
            </div>
            <span class="text-[10px] font-semibold text-primary-700 text-center leading-tight">{{ $t('sidebar_contact') }}</span>
          </button>

          <!-- 微信咨询 -->
          <div
            class="relative"
            @mouseenter="showQrCode = true"
            @mouseleave="showQrCode = false"
          >
            <button
              class="w-full flex flex-col items-center gap-1 px-1 py-2 rounded-xl bg-white/70 hover:bg-white transition-colors"
            >
              <div class="w-7 h-7 rounded-full bg-primary-600 flex items-center justify-center text-white">
                <MessageCircle class="w-4 h-4" />
              </div>
              <span class="text-[10px] font-semibold text-primary-700 text-center leading-tight">{{ $t('sidebar_wechat') }}</span>
            </button>

            <!-- 二维码气泡 -->
            <transition
              enter-active-class="animate-spring-pop"
              leave-active-class="transition-opacity duration-200 opacity-0"
            >
              <div
                v-if="showQrCode"
                class="absolute top-1/2 -translate-y-1/2 right-[calc(100%+12px)] bg-white border border-primary-200 rounded-2xl p-3.5 shadow-xl w-40"
              >
                <!-- 小三角 -->
                <div class="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-r border-t border-primary-200 rotate-45"></div>
                <!-- 二维码占位区 -->
                <div class="w-[132px] h-[132px] bg-primary-50 rounded-lg border border-dashed border-primary-300 flex items-center justify-center mx-auto">
                  <span class="text-primary-500 text-xs font-semibold">微信二维码</span>
                </div>
                <p class="text-primary-700 text-xs font-semibold text-center mt-2.5">{{ $t('sidebar_qr_tip') }}</p>
              </div>
            </transition>
          </div>

          <!-- 回到顶部 -->
          <button
            @click="scrollToTop"
            class="flex flex-col items-center gap-1 px-1 py-2 rounded-xl bg-white/70 hover:bg-white transition-colors"
          >
            <div class="w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center text-white">
              <ArrowUp class="w-4 h-4" />
            </div>
            <span class="text-[10px] font-semibold text-primary-700 text-center leading-tight">{{ $t('sidebar_back_top') }}</span>
          </button>
        </div>
      </div>

      <!-- 收起态 -->
      <button
        v-else
        key="collapsed"
        @click="isExpanded = true"
        class="bg-primary-600 rounded-l-3xl px-2 py-3.5 w-[40px] shadow-[-4px_4px_16px_rgba(30,64,175,0.25)] flex flex-col items-center gap-2 cursor-pointer hover:bg-primary-700 transition-colors"
        :aria-label="$t('sidebar_collapsed_label')"
      >
        <ChevronRight class="w-4 h-4 text-white" />
        <span
          class="text-primary-200 text-[9px] font-semibold tracking-wider"
          style="writing-mode: vertical-rl; letter-spacing: 0.15em;"
        >
          {{ $t('sidebar_collapsed_label') }}
        </span>
        <span class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse"></span>
      </button>
    </transition>
  </div>
</template>

<script setup>
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
</script>
```

- [ ] **Step 2: 验证文件已创建且语法正确**

Run: `node -e "const fs = require('fs'); const c = fs.readFileSync('src/components/FloatingSidebar.vue','utf8'); if(!c.includes('<template>') || !c.includes('<script setup>')) throw new Error('Missing sections'); console.log('Component file OK')"`
Expected: 输出 `Component file OK`

- [ ] **Step 3: 提交**

```bash
git add src/components/FloatingSidebar.vue
git commit -m "feat: 新增 FloatingSidebar 悬浮窗组件（展开/收起 + 二维码气泡）"
```

---

### Task 4: 在 App.vue 挂载组件

**Files:**
- Modify: `src/App.vue:1-15`

- [ ] **Step 1: 在 App.vue 中导入 FloatingSidebar 并挂载**

打开 `src/App.vue`，将现有的：

```vue
<template>
  <div class="min-h-screen">
    <Header />
    <main class="pt-16">
      <Home />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Home from './views/Home.vue'
</script>
```

替换为：

```vue
<template>
  <div class="min-h-screen">
    <Header />
    <main class="pt-16">
      <Home />
    </main>
    <Footer />
    <FloatingSidebar />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import FloatingSidebar from './components/FloatingSidebar.vue'
import Home from './views/Home.vue'
</script>
```

- [ ] **Step 2: 提交**

```bash
git add src/App.vue
git commit -m "feat: 在 App.vue 挂载 FloatingSidebar 悬浮窗组件"
```

---

### Task 5: 构建验证与开发服务器检查

**Files:**
- 无文件修改，仅验证

- [ ] **Step 1: 运行生产构建确认无编译错误**

Run: `npm run build`
Expected: 构建成功，输出 `dist/` 目录，无 Vite 或 Vue 编译错误

- [ ] **Step 2: 启动开发服务器进行可视化检查**

Run: `npm run dev`
Expected: 开发服务器在 `http://localhost:5173/` 启动

- [ ] **Step 3: 可视化检查清单**

在浏览器打开 `http://localhost:5173/`，逐项确认：

1. 页面右侧出现展开态悬浮窗（浅蓝色圆角矩形）
2. 三个按钮从上到下依次为：联系我们、微信咨询、回到顶部
3. 点击「联系我们」→ 页面平滑滚动到底部联系模块
4. 鼠标悬停「微信咨询」→ 左侧弹出二维码气泡（弹簧动画）
5. 鼠标移开 → 二维码气泡消失
6. 点击「回到顶部」→ 页面平滑滚动到顶部
7. 点击左上角关闭按钮（X）→ 悬浮窗收起为深蓝半胶囊（弹簧动画）
8. 收起态显示：箭头 + 竖排「在线咨询」+ 跳动小圆点
9. 点击收起态胶囊 → 恢复展开态（弹簧动画）
10. 缩小浏览器窗口到移动端宽度（< 1024px）→ 悬浮窗隐藏
11. 切换语言（中/繁/英）→ 悬浮窗文字正确切换

- [ ] **Step 4: 如果发现问题，修复后重新验证**

如果上述任何一项不通过，记录问题，修复后重新执行 Step 1-3。

- [ ] **Step 5: 停止开发服务器**

在运行 `npm run dev` 的终端按 `Ctrl+C` 停止服务器。

---

## 完成后的收尾

所有 Task 完成后，按照 finishing-a-development-branch skill 的指引完成开发分支的收尾工作。
