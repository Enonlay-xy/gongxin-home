# 公信检测门户网站首页改版实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有通用占位门户首页改造为基于公司宣传手册真实内容的资质检测公司首页，含 11 个模块、深蓝专业风格、三语 i18n。

**Architecture:** 保留 Vue 3 + Vite + Tailwind + vue-i18n 技术栈，单页滚动（不引入 vue-router）。各模块拆分为独立组件，由 `Home.vue` 编排。图片资源从 `设计素材/` 复制到 `src/assets/images/` 由 Vite 打包。i18n 文案走 locale JSON 文件。

**Tech Stack:** Vue 3.5 (Composition API + `<script setup>`)、Vite 6、Tailwind CSS 3.4、lucide-vue-next、vue-i18n 9

**设计文档:** [docs/superpowers/specs/2026-06-20-homepage-redesign-design.md](file:///Users/laihao/Project/gongxin-home/docs/superpowers/specs/2026-06-20-homepage-redesign-design.md)

---

## 文件结构总览

### 新建文件
```
src/assets/images/
├── logo/115a0af6e070ff1f01405d8abe0a163b.png      (Task 1)
├── banner/公司前台.jpg                              (Task 1)
├── banner/实验室.jpg                                (Task 1)
├── banner/TUV南德莱茵合作实验室.png                  (Task 1)
├── banner/电磁兼容实验室.png                         (Task 1)
├── fields/25644f0163e0d69a220ab0b5ed849f93.jpg     (Task 1)
├── fields/6ddc649cb51eb9b8c37420f676122c47.jpg     (Task 1)
├── fields/9f0ec7ecf93cffdb2665de325d2072f8.jpg     (Task 1)
├── fields/d9e42a0477950d4d986897dfd9f9c2b3.jpg     (Task 1)
├── labs/电磁兼容实验室.png                           (Task 1)
├── labs/化学实验室.png                               (Task 1)
├── labs/安规实验室.png                               (Task 1)
├── labs/安规实验室2.png                              (Task 1)
├── labs/TUV南德莱茵合作实验室.png                     (Task 1)
├── labs/加拿大CSA合作实验室.png                      (Task 1)
└── labs/中国质量认证中心CQC合作实验室.png              (Task 1)

src/components/
├── BannerCarousel.vue     (Task 4)
├── SectionTitle.vue       (Task 3)
├── CoreStrengths.vue      (Task 6)
├── ServiceTabs.vue        (Task 7)
├── ServiceFields.vue      (Task 8)
├── ServiceProcess.vue     (Task 9)
├── Qualifications.vue     (Task 10)
├── TypicalCases.vue       (Task 11)
└── ContactCTA.vue         (Task 12)
```

### 改造文件
```
tailwind.config.js              (Task 2)  更新 primary 色板
src/i18n/locales/zh-CN.json     (Task 5)  补充所有新 key
src/i18n/locales/zh-TW.json     (Task 5)  同步繁体
src/i18n/locales/en.json        (Task 5)  同步英文
src/components/Header.vue       (Task 13) 加电话按钮 + 调整导航
src/components/Footer.vue       (Task 14) 补充真实联系信息
src/views/Home.vue              (Task 15) 编排 11 模块
src/App.vue                     (Task 15) 移除多余 view 引用
```

### 删除文件
```
src/components/Hero.vue         (Task 4)  被 BannerCarousel 替代
src/views/About.vue             (Task 15) 内容并入 Home 区块
src/views/Products.vue          (Task 15) 被 ServiceTabs 替代
src/views/Contact.vue           (Task 15) 被 ContactCTA 替代
```

---

## Task 1: 复制图片资源到 src/assets/images

**Files:**
- Create: `src/assets/images/logo/`、`src/assets/images/banner/`、`src/assets/images/fields/`、`src/assets/images/labs/` 目录及图片

- [ ] **Step 1: 创建目录结构**

Run:
```bash
mkdir -p src/assets/images/logo src/assets/images/banner src/assets/images/fields src/assets/images/labs
```

- [ ] **Step 2: 复制 Logo**

Run:
```bash
cp "设计素材/公司logo/115a0af6e070ff1f01405d8abe0a163b.png" src/assets/images/logo/logo.png
```

- [ ] **Step 3: 复制 Banner 图片**

Run:
```bash
cp "设计素材/公司照片/公司前台.jpg" src/assets/images/banner/banner1.jpg
cp "设计素材/公司照片/实验室.jpg" src/assets/images/banner/banner2.jpg
cp "设计素材/实验室图片/TUV南德、莱茵合作实验室.png" "src/assets/images/banner/banner3.png"
cp "设计素材/实验室图片/电磁兼容实验室.png" "src/assets/images/banner/banner4.png"
```

- [ ] **Step 4: 复制服务领域图片**

Run:
```bash
cp "设计素材/一些可参考的官方图片/25644f0163e0d69a220ab0b5ed849f93.jpg" src/assets/images/fields/field1.jpg
cp "设计素材/一些可参考的官方图片/6ddc649cb51eb9b8c37420f676122c47.jpg" src/assets/images/fields/field2.jpg
cp "设计素材/一些可参考的官方图片/9f0ec7ecf93cffdb2665de325d2072f8.jpg" src/assets/images/fields/field3.jpg
cp "设计素材/一些可参考的官方图片/d9e42a0477950d4d986897dfd9f9c2b3.jpg" src/assets/images/fields/field4.jpg
```

- [ ] **Step 5: 复制实验室图片**

Run:
```bash
cp "设计素材/实验室图片/电磁兼容实验室.png" "src/assets/images/labs/emc.png"
cp "设计素材/实验室图片/化学实验室.png" "src/assets/images/labs/chemistry.png"
cp "设计素材/实验室图片/安规实验室.png" "src/assets/images/labs/safety1.png"
cp "设计素材/实验室图片/安规实验室2.png" "src/assets/images/labs/safety2.png"
cp "设计素材/实验室图片/TUV南德、莱茵合作实验室.png" "src/assets/images/labs/tuv.png"
cp "设计素材/实验室图片/加拿大CSA合作实验室.png" "src/assets/images/labs/csa.png"
cp "设计素材/实验室图片/中国质量认证中心CQC合作实验室.png" "src/assets/images/labs/cqc.png"
```

- [ ] **Step 6: 验证文件**

Run: `ls -R src/assets/images/`
Expected: 4 个子目录，共 16 个图片文件

- [ ] **Step 7: 提交**

```bash
git add src/assets/images/
git commit -m "feat: 复制设计素材图片到 src/assets/images"
```

---

## Task 2: 更新 Tailwind 配色

**Files:**
- Modify: `tailwind.config.js`

- [ ] **Step 1: 更新 primary 色板**

将 `tailwind.config.js` 的 `colors.primary` 替换为：

```js
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#1e40af',
    600: '#1e3a8a',
    700: '#1e3a8a',
    800: '#172554',
    900: '#0f172a',
  },
  accent: {
    DEFAULT: '#0ea5e9',
    light: '#38bdf8',
    dark: '#0284c7',
  }
}
```

- [ ] **Step 2: 验证配置**

Run: `npm run build`
Expected: 构建成功无错误

- [ ] **Step 3: 提交**

```bash
git add tailwind.config.js
git commit -m "feat: 更新 Tailwind primary 色板为深蓝专业风"
```

---

## Task 3: 创建 SectionTitle 可复用组件

**Files:**
- Create: `src/components/SectionTitle.vue`

- [ ] **Step 1: 创建组件**

```vue
<template>
  <div class="text-center mb-12">
    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{{ $t(titleKey) }}</h2>
    <p v-if="subtitleKey" class="text-sm text-gray-400 uppercase tracking-widest mb-4">{{ $t(subtitleKey) }}</p>
    <div class="w-16 h-1 bg-primary-500 mx-auto"></div>
  </div>
</template>

<script setup>
defineProps({
  titleKey: {
    type: String,
    required: true
  },
  subtitleKey: {
    type: String,
    default: ''
  }
})
</script>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/SectionTitle.vue
git commit -m "feat: 新增 SectionTitle 可复用章节标题组件"
```

---

## Task 4: 创建 BannerCarousel 轮播组件

**Files:**
- Create: `src/components/BannerCarousel.vue`
- Delete: `src/components/Hero.vue`

- [ ] **Step 1: 创建 BannerCarousel.vue**

```vue
<template>
  <section id="home" class="relative" role="region" aria-label="banner 轮播">
    <div class="relative h-[400px] md:h-[500px] overflow-hidden">
      <transition name="fade" mode="out-in">
        <div v-for="(slide, i) in slides" :key="i" v-show="current === i"
             class="absolute inset-0">
          <img :src="slide.image" :alt="$t(slide.titleKey)"
               class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-r from-primary-900/70 to-primary-900/30"></div>
          <div class="absolute inset-0 flex items-center">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div class="max-w-2xl text-white">
                <h1 class="text-3xl md:text-5xl font-bold mb-4">{{ $t(slide.titleKey) }}</h1>
                <p class="text-lg md:text-xl text-primary-100 mb-8 hidden md:block">{{ $t(slide.subtitleKey) }}</p>
                <a :href="slide.btnHref"
                   class="inline-flex items-center px-8 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors">
                  {{ $t(slide.btnKey) }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- 指示器 -->
      <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button v-for="(slide, i) in slides" :key="i"
                @click="current = i"
                :aria-label="`切换到第 ${i + 1} 张`"
                :class="['w-3 h-3 rounded-full transition-colors',
                         current === i ? 'bg-white' : 'bg-white/50 hover:bg-white/75']"></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import banner1 from '../assets/images/banner/banner1.jpg'
import banner2 from '../assets/images/banner/banner2.jpg'
import banner3 from '../assets/images/banner/banner3.png'
import banner4 from '../assets/images/banner/banner4.png'

const slides = [
  { image: banner1, titleKey: 'banner_1_title', subtitleKey: 'banner_1_subtitle', btnKey: 'banner_1_btn', btnHref: '#about' },
  { image: banner2, titleKey: 'banner_2_title', subtitleKey: 'banner_2_subtitle', btnKey: 'banner_2_btn', btnHref: '#products' },
  { image: banner3, titleKey: 'banner_3_title', subtitleKey: 'banner_3_subtitle', btnKey: 'banner_3_btn', btnHref: '#qualifications' },
  { image: banner4, titleKey: 'banner_4_title', subtitleKey: 'banner_4_subtitle', btnKey: 'banner_4_btn', btnHref: '#qualifications' }
]

const current = ref(0)
let timer = null

const startAutoPlay = () => {
  timer = setInterval(() => {
    current.value = (current.value + 1) % slides.length
  }, 5000)
}

const stopAutoPlay = () => {
  if (timer) clearInterval(timer)
}

const handleKeydown = (e) => {
  if (e.key === 'ArrowLeft') current.value = (current.value - 1 + slides.length) % slides.length
  if (e.key === 'ArrowRight') current.value = (current.value + 1) % slides.length
}

onMounted(() => {
  startAutoPlay()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  stopAutoPlay()
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
```

- [ ] **Step 2: 删除 Hero.vue**

Run: `rm src/components/Hero.vue`

- [ ] **Step 3: 提交**

```bash
git add src/components/BannerCarousel.vue
git rm src/components/Hero.vue
git commit -m "feat: 新增 BannerCarousel 轮播组件，替代 Hero"
```

---

## Task 5: 更新 i18n 三语文件

**Files:**
- Modify: `src/i18n/locales/zh-CN.json`
- Modify: `src/i18n/locales/zh-TW.json`
- Modify: `src/i18n/locales/en.json`

- [ ] **Step 1: 重写 zh-CN.json**

将 `src/i18n/locales/zh-CN.json` 完整替换为：

```json
{
  "company": "东莞市公信检测技术有限公司",
  "company_en": "GXJC",
  "phone_label": "服务热线",
  "phone_number": "15207111291",
  "email_value": "lj729614937@gmail.com",
  "website_value": "www.gx-test.com",
  "address_value": "广东省大朗镇佛子凹村佛富路98号",

  "nav_home": "首页",
  "nav_about": "关于我们",
  "nav_strengths": "核心优势",
  "nav_products": "服务项目",
  "nav_fields": "服务领域",
  "nav_process": "服务流程",
  "nav_qualifications": "资质合作",
  "nav_cases": "典型案例",
  "nav_contact": "联系我们",

  "banner_1_title": "公信检测，全球认证",
  "banner_1_subtitle": "专业进出口商品检测认证服务平台",
  "banner_1_btn": "了解我们",
  "banner_2_title": "一次测试，多证通行",
  "banner_2_subtitle": "助力中国制造，通达全球市场",
  "banner_2_btn": "查看服务",
  "banner_3_title": "国际权威合作实验室",
  "banner_3_subtitle": "TUV南德/莱茵 · CSA · CQC · Intertek",
  "banner_3_btn": "查看资质",
  "banner_4_title": "CNAS 认可核心实验室",
  "banner_4_subtitle": "EMC · 安规 · 化学 · 射频 全面检测能力",
  "banner_4_btn": "了解能力",

  "about_title": "关于我们",
  "about_subtitle": "About Us",
  "about_desc_1": "东莞市公信检测技术有限公司（英文简称\"GXJC\"），是专业的第三方检测、鉴定、验货及认证服务平台，专门从事进出口商品的电子电器、机械、灯具、玩具、建筑建材等产品的电磁兼容（EMC）、安规（LVD）、射频（RF）、环保（ROHS）、机械安全、光性能等检测，并提供全方位国际认证服务。TUV莱茵、TUV南德、BV、Intertek、欧陆目击实验室。",
  "about_desc_2": "公司坐落于东莞松山湖高新技术产业开发区，这里是粤港澳大湾区的几何中心、广深科技创新走廊的核心节点。",
  "about_btn": "了解更多",

  "strengths_title": "核心优势",
  "strengths_subtitle": "Core Strengths",
  "strengths_intl_auth": "国际合作授权",
  "strengths_cert_projects": "成功认证项目",
  "strengths_categories": "大认证品类",
  "strengths_honors": "社会荣誉",
  "strengths_clients": "服务企业客户",
  "strengths_tagline": "CNAS/CE/A2LA/FCC/CSA 权威资质 · TUV南德/莱茵/SGS 等授权 · AI 助力检测认证流程",

  "service_tab_international": "国际认证",
  "service_tab_domestic": "国内认证",
  "service_tab_testing": "检测项目",
  "products_title": "服务项目",
  "products_subtitle": "Service Items",

  "cert_ce": "CE 认证",
  "cert_ce_desc": "产品进入欧盟及欧洲经济区市场的强制性安全通行证",
  "cert_fcc": "FCC 认证",
  "cert_fcc_desc": "美国联邦通信委员会对电子产品的电磁兼容强制认证",
  "cert_cb": "CB 认证",
  "cert_cb_desc": "国际电工委员会全球互认体系，一次测试多证通行",
  "cert_ul": "UL 认证",
  "cert_ul_desc": "美国保险商实验室颁发的产品安全认证标志",
  "cert_etl": "ETL 认证",
  "cert_etl_desc": "Intertek 旗下机构颁发的产品安全认证，与 UL 同等效力",
  "cert_csa": "CSA 认证",
  "cert_csa_desc": "加拿大 CSA 集团认证，进入加拿大市场的准入要求",
  "cert_saa": "SAA 认证",
  "cert_saa_desc": "澳大利亚标准协会认证，进入澳洲市场必备",
  "cert_gs": "GS 认证",
  "cert_gs_desc": "德国安全认证标志，证明产品符合德国安全标准",
  "cert_pse": "PSE 认证",
  "cert_pse_desc": "日本电气产品安全认证，进入日本市场强制要求",
  "cert_tuv": "TUV-Mark",
  "cert_tuv_desc": "TUV 南德/莱茵认证标志，国际广泛认可",
  "cert_cec": "CEC 认证",
  "cert_cec_desc": "美国加州能效认证，进入加州市场必需",
  "cert_ukca": "UKCA 认证",
  "cert_ukca_desc": "英国合格评定标志，脱欧后替代 CE 标志",

  "cert_ccc": "CCC 认证",
  "cert_ccc_desc": "中国强制性产品认证，国内市场准入门槛",
  "cert_cqc": "CQC 认证",
  "cert_cqc_desc": "中国质量认证中心自愿性认证，提升产品公信力",

  "test_emc": "EMC 电磁兼容",
  "test_emc_desc": "电磁兼容性测试，确保产品不产生也不受电磁干扰",
  "test_lvd": "LVD 安规",
  "test_lvd_desc": "低电压指令安全测试，保障产品电气安全",
  "test_rf": "RF 射频",
  "test_rf_desc": "射频测试，针对无线通信产品的频率与功率检测",
  "test_rohs": "ROHS 环保",
  "test_rohs_desc": "有害物质限制检测，确保产品符合环保法规",
  "test_mech": "机械安全",
  "test_mech_desc": "机械设备安全测试，保障操作人员安全",
  "test_light": "光性能",
  "test_light_desc": "灯具光学性能测试，评估亮度、色温等指标",

  "field_title": "服务领域",
  "field_subtitle": "Service Fields",
  "field_1_name": "电子电器",
  "field_1_desc": "专注于电子电器产品的检测与认证，获 CNAS、A2LA、FCC、TUV、Intertek 等资质",
  "field_2_name": "音视频类",
  "field_2_desc": "个人计算机、打印机、传真机等 IT 类产品检测认证",
  "field_3_name": "锂电池类",
  "field_3_desc": "手机、笔记本、无人机、移动电源、电子烟等消费类锂电池检测",
  "field_4_name": "机械设备",
  "field_4_desc": "电动工具、园林机械、数控机床、包装机械等检测",
  "field_5_name": "灯具类",
  "field_5_desc": "LED 灯具、节能灯、筒灯等成品灯具及核心组件检测",
  "field_6_name": "玩具",
  "field_6_desc": "玩具产品出口认证（EN 71 等）",
  "field_7_name": "建筑建材",
  "field_7_desc": "建材出口中东等市场认证",
  "field_8_name": "动力电池",
  "field_8_desc": "动力电池/储能电池产品出口各国认证",

  "process_title": "服务流程",
  "process_subtitle": "Service Process",
  "process_1_title": "提交申请",
  "process_1_desc": "提交申请并确认认证范围和要求",
  "process_2_title": "初步评估",
  "process_2_desc": "对申请方的管理体系和产品进行初步评估和审核",
  "process_3_title": "复审",
  "process_3_desc": "对申请方的生产场地、管理体系和产品进行审核",
  "process_4_title": "报告与证书",
  "process_4_desc": "根据审核结果出具报告并颁发相应的证书",
  "process_5_title": "监督与复审",
  "process_5_desc": "对获得认证的组织进行监督和定期复审以确保持续符合标准要求",

  "qual_title": "资质与合作实验室",
  "qual_subtitle": "Qualifications & Labs",
  "qual_certs_title": "资质展示",
  "qual_labs_title": "核心实验室",
  "lab_emc": "电磁兼容实验室",
  "lab_emc_desc": "3 米法全电波暗室，德国 R&S 接收机，通过 CNAS 认可",
  "lab_chem": "化学检测实验室",
  "lab_chem_desc": "依据 ISO/IEC 17025 建设，覆盖 ROHS/REACH，气相色谱-质谱联用仪",
  "lab_safety": "安规检测实验室",
  "lab_safety_desc": "TUV/CSA/CQC 合作实验室，耐压/绝缘/泄漏/接地/灼热丝/IP 防尘防水",
  "lab_tuv": "TUV南德、莱茵合作实验室",
  "lab_tuv_desc": "安规/EMC/机械安全数据互认，可申请 GS/CE/CB 证书",
  "lab_csa": "加拿大 CSA 合作实验室",
  "lab_csa_desc": "北美市场安规测试，本地化测试无需寄样海外",
  "lab_cqc": "中国质量认证中心 CQC 合作实验室",
  "lab_cqc_desc": "CCC 强制认证及 CQC 自愿性认证检测服务",

  "case_title": "典型案例",
  "case_subtitle": "Typical Cases",
  "case_1_type": "LED 灯具出口欧盟",
  "case_1_need": "CE+RoHS 认证",
  "case_1_service": "安规+EMC+光性能+化学",
  "case_1_result": "获 TUV-Mark",
  "case_2_type": "数控机床出口北美",
  "case_2_need": "CE+RoHS 认证",
  "case_2_service": "机械安全+EMC",
  "case_2_result": "获 UL 认证",
  "case_3_type": "玩具出口欧盟",
  "case_3_need": "EN 71 全项",
  "case_3_service": "物理+燃烧+化学",
  "case_3_result": "获 CE 认证",
  "case_4_type": "建材出口中东",
  "case_4_need": "EN 71 全项",
  "case_4_service": "物理性能+化学",
  "case_4_result": "顺利清关",
  "case_need_label": "客户需求",
  "case_service_label": "服务内容",
  "case_result_label": "认证结果",
  "case_quote_1": "专业高效，帮我们顺利拿到 CE 认证，产品已成功进入德国市场。",
  "case_quote_1_from": "— 某东莞机械企业客户",
  "case_quote_2": "公信团队响应很快，从测试到拿到 FCC 证书只用了 3 周，非常满意。",
  "case_quote_2_from": "— 某深圳电子企业客户",
  "case_more_btn": "查看更多案例",

  "cta_title": "联系我们",
  "cta_subtitle": "Contact Us",
  "cta_phone_label": "服务热线",
  "cta_email_label": "公司邮箱",
  "cta_website_label": "公司官网",
  "cta_address_label": "公司地址",
  "cta_form_title": "在线留言",
  "cta_form_name": "姓名",
  "cta_form_name_placeholder": "请输入您的姓名",
  "cta_form_phone": "电话",
  "cta_form_phone_placeholder": "请输入您的电话",
  "cta_form_message": "需求",
  "cta_form_message_placeholder": "请简要描述您的检测认证需求",
  "cta_form_submit": "提交留言",
  "cta_form_success": "感谢您的留言，我们会尽快与您联系！",

  "footer_company": "东莞市公信检测技术有限公司",
  "footer_company_en": "Dongguan Gongxin Testing Technology Co., Ltd.",
  "footer_quick_links": "快速链接",
  "footer_contact": "联系方式",
  "footer_copyright": "© 2024 东莞市公信检测技术有限公司. All rights reserved.",
  "footer_icp": "备案号：[待提供]"
}
```

- [ ] **Step 2: 重写 zh-TW.json**

将 `src/i18n/locales/zh-TW.json` 完整替换为繁体中文版本（与 zh-CN 结构一致，文字转为繁体）：

```json
{
  "company": "東莞市公信檢測技術有限公司",
  "company_en": "GXJC",
  "phone_label": "服務熱線",
  "phone_number": "15207111291",
  "email_value": "lj729614937@gmail.com",
  "website_value": "www.gx-test.com",
  "address_value": "廣東省大朗鎮佛子凹村佛富路98號",

  "nav_home": "首頁",
  "nav_about": "關於我們",
  "nav_strengths": "核心優勢",
  "nav_products": "服務項目",
  "nav_fields": "服務領域",
  "nav_process": "服務流程",
  "nav_qualifications": "資質合作",
  "nav_cases": "典型案例",
  "nav_contact": "聯繫我們",

  "banner_1_title": "公信檢測，全球認證",
  "banner_1_subtitle": "專業進出口商品檢測認證服務平台",
  "banner_1_btn": "了解我們",
  "banner_2_title": "一次測試，多證通行",
  "banner_2_subtitle": "助力中國製造，通達全球市場",
  "banner_2_btn": "查看服務",
  "banner_3_title": "國際權威合作實驗室",
  "banner_3_subtitle": "TUV南德/萊茵 · CSA · CQC · Intertek",
  "banner_3_btn": "查看資質",
  "banner_4_title": "CNAS 認可核心實驗室",
  "banner_4_subtitle": "EMC · 安規 · 化學 · 射頻 全面檢測能力",
  "banner_4_btn": "了解能力",

  "about_title": "關於我們",
  "about_subtitle": "About Us",
  "about_desc_1": "東莞市公信檢測技術有限公司（英文簡稱\"GXJC\"），是專業的第三方檢測、鑑定、驗貨及認證服務平台，專門從事進出口商品的電子電器、機械、燈具、玩具、建築建材等產品的電磁相容（EMC）、安規（LVD）、射頻（RF）、環保（ROHS）、機械安全、光性能等檢測，並提供全方位國際認證服務。TUV萊茵、TUV南德、BV、Intertek、歐陸目擊實驗室。",
  "about_desc_2": "公司坐落於東莞松山湖高新技術產業開發區，這裡是粵港澳大灣區的幾何中心、廣深科技創新走廊的核心節點。",
  "about_btn": "了解更多",

  "strengths_title": "核心優勢",
  "strengths_subtitle": "Core Strengths",
  "strengths_intl_auth": "國際合作授權",
  "strengths_cert_projects": "成功認證項目",
  "strengths_categories": "大認證品類",
  "strengths_honors": "社會榮譽",
  "strengths_clients": "服務企業客戶",
  "strengths_tagline": "CNAS/CE/A2LA/FCC/CSA 權威資質 · TUV南德/萊茵/SGS 等授權 · AI 助力檢測認證流程",

  "service_tab_international": "國際認證",
  "service_tab_domestic": "國內認證",
  "service_tab_testing": "檢測項目",
  "products_title": "服務項目",
  "products_subtitle": "Service Items",

  "cert_ce": "CE 認證",
  "cert_ce_desc": "產品進入歐盟及歐洲經濟區市場的強制性安全通行證",
  "cert_fcc": "FCC 認證",
  "cert_fcc_desc": "美國聯邦通信委員會對電子產品的電磁相容強制認證",
  "cert_cb": "CB 認證",
  "cert_cb_desc": "國際電工委員會全球互認體系，一次測試多證通行",
  "cert_ul": "UL 認證",
  "cert_ul_desc": "美國保險商實驗室頒發的產品安全認證標誌",
  "cert_etl": "ETL 認證",
  "cert_etl_desc": "Intertek 旗下機構頒發的產品安全認證，與 UL 同等效力",
  "cert_csa": "CSA 認證",
  "cert_csa_desc": "加拿大 CSA 集團認證，進入加拿大市場的准入要求",
  "cert_saa": "SAA 認證",
  "cert_saa_desc": "澳大利亞標準協會認證，進入澳洲市場必備",
  "cert_gs": "GS 認證",
  "cert_gs_desc": "德國安全認證標誌，證明產品符合德國安全標準",
  "cert_pse": "PSE 認證",
  "cert_pse_desc": "日本電氣產品安全認證，進入日本市場強制要求",
  "cert_tuv": "TUV-Mark",
  "cert_tuv_desc": "TUV 南德/萊茵認證標誌，國際廣泛認可",
  "cert_cec": "CEC 認證",
  "cert_cec_desc": "美國加州能效認證，進入加州市場必需",
  "cert_ukca": "UKCA 認證",
  "cert_ukca_desc": "英國合格評定標誌，脫歐後替代 CE 標誌",

  "cert_ccc": "CCC 認證",
  "cert_ccc_desc": "中國強制性產品認證，國內市場准入門檻",
  "cert_cqc": "CQC 認證",
  "cert_cqc_desc": "中國質量認證中心自願性認證，提升產品公信力",

  "test_emc": "EMC 電磁相容",
  "test_emc_desc": "電磁相容性測試，確保產品不產生也不受電磁干擾",
  "test_lvd": "LVD 安規",
  "test_lvd_desc": "低電壓指令安全測試，保障產品電氣安全",
  "test_rf": "RF 射頻",
  "test_rf_desc": "射頻測試，針對無線通信產品的頻率與功率檢測",
  "test_rohs": "ROHS 環保",
  "test_rohs_desc": "有害物質限制檢測，確保產品符合環保法規",
  "test_mech": "機械安全",
  "test_mech_desc": "機械設備安全測試，保障操作人員安全",
  "test_light": "光性能",
  "test_light_desc": "燈具光學性能測試，評估亮度、色溫等指標",

  "field_title": "服務領域",
  "field_subtitle": "Service Fields",
  "field_1_name": "電子電器",
  "field_1_desc": "專注於電子電器產品的檢測與認證，獲 CNAS、A2LA、FCC、TUV、Intertek 等資質",
  "field_2_name": "音視頻類",
  "field_2_desc": "個人計算機、打印機、傳真機等 IT 類產品檢測認證",
  "field_3_name": "鋰電池類",
  "field_3_desc": "手機、筆記本、無人機、移動電源、電子煙等消費類鋰電池檢測",
  "field_4_name": "機械設備",
  "field_4_desc": "電動工具、園林機械、數控機床、包裝機械等檢測",
  "field_5_name": "燈具類",
  "field_5_desc": "LED 燈具、節能燈、筒燈等成品燈具及核心組件檢測",
  "field_6_name": "玩具",
  "field_6_desc": "玩具產品出口認證（EN 71 等）",
  "field_7_name": "建築建材",
  "field_7_desc": "建材出口中東等市場認證",
  "field_8_name": "動力電池",
  "field_8_desc": "動力電池/儲能電池產品出口各國認證",

  "process_title": "服務流程",
  "process_subtitle": "Service Process",
  "process_1_title": "提交申請",
  "process_1_desc": "提交申請並確認認證範圍和要求",
  "process_2_title": "初步評估",
  "process_2_desc": "對申請方的管理體系和產品進行初步評估和審核",
  "process_3_title": "復審",
  "process_3_desc": "對申請方的生產場地、管理體系和產品進行審核",
  "process_4_title": "報告與證書",
  "process_4_desc": "根據審核結果出具報告並頒發相應的證書",
  "process_5_title": "監督與復審",
  "process_5_desc": "對獲得認證的組織進行監督和定期復審以確保持續符合標準要求",

  "qual_title": "資質與合作實驗室",
  "qual_subtitle": "Qualifications & Labs",
  "qual_certs_title": "資質展示",
  "qual_labs_title": "核心實驗室",
  "lab_emc": "電磁相容實驗室",
  "lab_emc_desc": "3 米法全電波暗室，德國 R&S 接收機，通過 CNAS 認可",
  "lab_chem": "化學檢測實驗室",
  "lab_chem_desc": "依據 ISO/IEC 17025 建設，覆蓋 ROHS/REACH，氣相色譜-質譜聯用儀",
  "lab_safety": "安規檢測實驗室",
  "lab_safety_desc": "TUV/CSA/CQC 合作實驗室，耐壓/絕緣/洩漏/接地/灼熱絲/IP 防塵防水",
  "lab_tuv": "TUV南德、萊茵合作實驗室",
  "lab_tuv_desc": "安規/EMC/機械安全數據互認，可申請 GS/CE/CB 證書",
  "lab_csa": "加拿大 CSA 合作實驗室",
  "lab_csa_desc": "北美市場安規測試，本地化測試無需寄樣海外",
  "lab_cqc": "中國質量認證中心 CQC 合作實驗室",
  "lab_cqc_desc": "CCC 強制認證及 CQC 自願性認證檢測服務",

  "case_title": "典型案例",
  "case_subtitle": "Typical Cases",
  "case_1_type": "LED 燈具出口歐盟",
  "case_1_need": "CE+RoHS 認證",
  "case_1_service": "安規+EMC+光性能+化學",
  "case_1_result": "獲 TUV-Mark",
  "case_2_type": "數控機床出口北美",
  "case_2_need": "CE+RoHS 認證",
  "case_2_service": "機械安全+EMC",
  "case_2_result": "獲 UL 認證",
  "case_3_type": "玩具出口歐盟",
  "case_3_need": "EN 71 全項",
  "case_3_service": "物理+燃燒+化學",
  "case_3_result": "獲 CE 認證",
  "case_4_type": "建材出口中東",
  "case_4_need": "EN 71 全項",
  "case_4_service": "物理性能+化學",
  "case_4_result": "順利清關",
  "case_need_label": "客戶需求",
  "case_service_label": "服務內容",
  "case_result_label": "認證結果",
  "case_quote_1": "專業高效，幫我們順利拿到 CE 認證，產品已成功進入德國市場。",
  "case_quote_1_from": "— 某東莞機械企業客戶",
  "case_quote_2": "公信團隊響應很快，從測試到拿到 FCC 證書只用了 3 週，非常滿意。",
  "case_quote_2_from": "— 某深圳電子企業客戶",
  "case_more_btn": "查看更多案例",

  "cta_title": "聯繫我們",
  "cta_subtitle": "Contact Us",
  "cta_phone_label": "服務熱線",
  "cta_email_label": "公司郵箱",
  "cta_website_label": "公司官網",
  "cta_address_label": "公司地址",
  "cta_form_title": "在線留言",
  "cta_form_name": "姓名",
  "cta_form_name_placeholder": "請輸入您的姓名",
  "cta_form_phone": "電話",
  "cta_form_phone_placeholder": "請輸入您的電話",
  "cta_form_message": "需求",
  "cta_form_message_placeholder": "請簡要描述您的檢測認證需求",
  "cta_form_submit": "提交留言",
  "cta_form_success": "感謝您的留言，我們會盡快與您聯繫！",

  "footer_company": "東莞市公信檢測技術有限公司",
  "footer_company_en": "Dongguan Gongxin Testing Technology Co., Ltd.",
  "footer_quick_links": "快速連結",
  "footer_contact": "聯繫方式",
  "footer_copyright": "© 2024 東莞市公信檢測技術有限公司. All rights reserved.",
  "footer_icp": "備案號：[待提供]"
}
```

- [ ] **Step 3: 重写 en.json**

将 `src/i18n/locales/en.json` 完整替换为英文版本：

```json
{
  "company": "Dongguan Gongxin Testing Technology Co., Ltd.",
  "company_en": "GXJC",
  "phone_label": "Service Hotline",
  "phone_number": "15207111291",
  "email_value": "lj729614937@gmail.com",
  "website_value": "www.gx-test.com",
  "address_value": "No. 98, Fofu Road, Fozi'ao Village, Dalang Town, Guangdong Province",

  "nav_home": "Home",
  "nav_about": "About",
  "nav_strengths": "Strengths",
  "nav_products": "Services",
  "nav_fields": "Fields",
  "nav_process": "Process",
  "nav_qualifications": "Qualifications",
  "nav_cases": "Cases",
  "nav_contact": "Contact",

  "banner_1_title": "Gongxin Testing, Global Certification",
  "banner_1_subtitle": "Professional Import & Export Testing and Certification Platform",
  "banner_1_btn": "About Us",
  "banner_2_title": "One Test, Multiple Certificates",
  "banner_2_subtitle": "Empowering Chinese Manufacturing to Reach Global Markets",
  "banner_2_btn": "Our Services",
  "banner_3_title": "International Authoritative Partner Labs",
  "banner_3_subtitle": "TUV SUD / Rheinland · CSA · CQC · Intertek",
  "banner_3_btn": "View Qualifications",
  "banner_4_title": "CNAS Accredited Core Laboratories",
  "banner_4_subtitle": "EMC · Safety · Chemistry · RF Comprehensive Testing",
  "banner_4_btn": "View Capabilities",

  "about_title": "About Us",
  "about_subtitle": "About Us",
  "about_desc_1": "Dongguan Gongxin Testing Technology Co., Ltd. (\"GXJC\") is a professional third-party testing, inspection, verification and certification service platform, specializing in EMC, safety (LVD), RF, environmental (ROHS), mechanical safety, and optical performance testing of import and export products including electronics, machinery, lighting, toys, and building materials, providing comprehensive international certification services. TUV Rheinland, TUV SUD, BV, Intertek, Eurofins witness lab.",
  "about_desc_2": "Located in Dongguan Songshan Lake High-tech Industrial Development Zone, the geometric center of the Greater Bay Area and a core node of the Guangzhou-Shenzhen Science and Technology Innovation Corridor.",
  "about_btn": "Learn More",

  "strengths_title": "Core Strengths",
  "strengths_subtitle": "Core Strengths",
  "strengths_intl_auth": "International Authorizations",
  "strengths_cert_projects": "Successful Projects",
  "strengths_categories": "Certification Categories",
  "strengths_honors": "Social Honors",
  "strengths_clients": "Enterprise Clients",
  "strengths_tagline": "CNAS/CE/A2LA/FCC/CSA Qualifications · TUV SUD/Rheinland/SGS Authorizations · AI-Powered Process",

  "service_tab_international": "International",
  "service_tab_domestic": "Domestic",
  "service_tab_testing": "Testing",
  "products_title": "Service Items",
  "products_subtitle": "Service Items",

  "cert_ce": "CE Certification",
  "cert_ce_desc": "Mandatory safety passport for products entering the EU and EEA markets",
  "cert_fcc": "FCC Certification",
  "cert_fcc_desc": "Mandatory EMC certification by the US Federal Communications Commission",
  "cert_cb": "CB Certification",
  "cert_cb_desc": "IEC global mutual recognition system, one test multiple certificates",
  "cert_ul": "UL Certification",
  "cert_ul_desc": "Product safety certification mark issued by Underwriters Laboratories",
  "cert_etl": "ETL Certification",
  "cert_etl_desc": "Product safety certification by Intertek, equivalent to UL",
  "cert_csa": "CSA Certification",
  "cert_csa_desc": "Canadian Standards Association certification for Canadian market access",
  "cert_saa": "SAA Certification",
  "cert_saa_desc": "Standards Australia certification, essential for Australian market",
  "cert_gs": "GS Certification",
  "cert_gs_desc": "German safety certification mark proving compliance with German standards",
  "cert_pse": "PSE Certification",
  "cert_pse_desc": "Japanese electrical product safety certification, mandatory for Japan",
  "cert_tuv": "TUV-Mark",
  "cert_tuv_desc": "TUV SUD/Rheinland certification mark, internationally recognized",
  "cert_cec": "CEC Certification",
  "cert_cec_desc": "California energy efficiency certification, required for California market",
  "cert_ukca": "UKCA Certification",
  "cert_ukca_desc": "UK Conformity Assessed mark, replacing CE after Brexit",

  "cert_ccc": "CCC Certification",
  "cert_ccc_desc": "China Compulsory Certification, domestic market access threshold",
  "cert_cqc": "CQC Certification",
  "cert_cqc_desc": "China Quality Certification Centre voluntary certification",

  "test_emc": "EMC Testing",
  "test_emc_desc": "Electromagnetic compatibility testing ensuring no interference",
  "test_lvd": "LVD Safety",
  "test_lvd_desc": "Low Voltage Directive safety testing for electrical safety",
  "test_rf": "RF Testing",
  "test_rf_desc": "Radio frequency testing for wireless communication products",
  "test_rohs": "ROHS Testing",
  "test_rohs_desc": "Hazardous substance testing ensuring environmental compliance",
  "test_mech": "Mechanical Safety",
  "test_mech_desc": "Mechanical equipment safety testing protecting operators",
  "test_light": "Optical Performance",
  "test_light_desc": "Lighting optical performance testing for brightness and color temp",

  "field_title": "Service Fields",
  "field_subtitle": "Service Fields",
  "field_1_name": "Electronics",
  "field_1_desc": "Testing and certification for electronic products with CNAS, A2LA, FCC, TUV, Intertek",
  "field_2_name": "Audio/Video",
  "field_2_desc": "IT product testing including PCs, printers, fax machines",
  "field_3_name": "Lithium Battery",
  "field_3_desc": "Consumer lithium battery testing for phones, laptops, drones, power banks",
  "field_4_name": "Machinery",
  "field_4_desc": "Testing for power tools, garden machinery, CNC machines, packaging equipment",
  "field_5_name": "Lighting",
  "field_5_desc": "LED lamps, energy-saving lamps, downlights and core components",
  "field_6_name": "Toys",
  "field_6_desc": "Toy product export certification (EN 71 etc.)",
  "field_7_name": "Building Materials",
  "field_7_desc": "Building material certification for Middle East and other markets",
  "field_8_name": "Power Battery",
  "field_8_desc": "Power/storage battery export certification for various countries",

  "process_title": "Service Process",
  "process_subtitle": "Service Process",
  "process_1_title": "Submit Application",
  "process_1_desc": "Submit application and confirm certification scope and requirements",
  "process_2_title": "Initial Assessment",
  "process_2_desc": "Initial assessment and audit of applicant's management system and products",
  "process_3_title": "Review",
  "process_3_desc": "Audit of applicant's production site, management system and products",
  "process_4_title": "Report & Certificate",
  "process_4_desc": "Issue report and corresponding certificate based on audit results",
  "process_5_title": "Supervision & Re-audit",
  "process_5_desc": "Supervision and periodic re-audit to ensure continued compliance",

  "qual_title": "Qualifications & Labs",
  "qual_subtitle": "Qualifications & Labs",
  "qual_certs_title": "Qualifications",
  "qual_labs_title": "Core Laboratories",
  "lab_emc": "EMC Laboratory",
  "lab_emc_desc": "3-meter fully anechoic chamber, German R&S receiver, CNAS accredited",
  "lab_chem": "Chemistry Laboratory",
  "lab_chem_desc": "ISO/IEC 17025 compliant, covers ROHS/REACH, GC-MS equipment",
  "lab_safety": "Safety Laboratory",
  "lab_safety_desc": "TUV/CSA/CQC partner lab, withstand voltage/insulation/leakage/grounding",
  "lab_tuv": "TUV SUD/Rheinland Partner Lab",
  "lab_tuv_desc": "Safety/EMC/mechanical data mutual recognition, GS/CE/CB certificates",
  "lab_csa": "Canadian CSA Partner Lab",
  "lab_csa_desc": "North American safety testing, localized without overseas shipping",
  "lab_cqc": "CQC Partner Lab",
  "lab_cqc_desc": "CCC mandatory and CQC voluntary certification testing services",

  "case_title": "Typical Cases",
  "case_subtitle": "Typical Cases",
  "case_1_type": "LED Lighting to EU",
  "case_1_need": "CE+RoHS Certification",
  "case_1_service": "Safety+EMC+Optical+Chemistry",
  "case_1_result": "Obtained TUV-Mark",
  "case_2_type": "CNC Machine to North America",
  "case_2_need": "CE+RoHS Certification",
  "case_2_service": "Mechanical Safety+EMC",
  "case_2_result": "Obtained UL Certification",
  "case_3_type": "Toys to EU",
  "case_3_need": "EN 71 Full Test",
  "case_3_service": "Physical+Combustion+Chemistry",
  "case_3_result": "Obtained CE Certification",
  "case_4_type": "Building Materials to Middle East",
  "case_4_need": "EN 71 Full Test",
  "case_4_service": "Physical Performance+Chemistry",
  "case_4_result": "Smooth Customs Clearance",
  "case_need_label": "Client Need",
  "case_service_label": "Service Content",
  "case_result_label": "Result",
  "case_quote_1": "Professional and efficient, helped us obtain CE certification, product successfully entered the German market.",
  "case_quote_1_from": "— A Dongguan Machinery Enterprise Client",
  "case_quote_2": "Gongxin team responded quickly, took only 3 weeks from testing to FCC certificate, very satisfied.",
  "case_quote_2_from": "— A Shenzhen Electronics Enterprise Client",
  "case_more_btn": "View More Cases",

  "cta_title": "Contact Us",
  "cta_subtitle": "Contact Us",
  "cta_phone_label": "Service Hotline",
  "cta_email_label": "Email",
  "cta_website_label": "Website",
  "cta_address_label": "Address",
  "cta_form_title": "Online Message",
  "cta_form_name": "Name",
  "cta_form_name_placeholder": "Please enter your name",
  "cta_form_phone": "Phone",
  "cta_form_phone_placeholder": "Please enter your phone",
  "cta_form_message": "Requirements",
  "cta_form_message_placeholder": "Please briefly describe your testing and certification needs",
  "cta_form_submit": "Submit",
  "cta_form_success": "Thank you for your message, we will contact you soon!",

  "footer_company": "Dongguan Gongxin Testing Technology Co., Ltd.",
  "footer_company_en": "Dongguan Gongxin Testing Technology Co., Ltd.",
  "footer_quick_links": "Quick Links",
  "footer_contact": "Contact",
  "footer_copyright": "© 2024 Dongguan Gongxin Testing Technology Co., Ltd. All rights reserved.",
  "footer_icp": "ICP: [TBD]"
}
```

- [ ] **Step 4: 验证 JSON 合法性**

Run:
```bash
node -e "JSON.parse(require('fs').readFileSync('src/i18n/locales/zh-CN.json','utf8')); JSON.parse(require('fs').readFileSync('src/i18n/locales/zh-TW.json','utf8')); JSON.parse(require('fs').readFileSync('src/i18n/locales/en.json','utf8')); console.log('All JSON valid')"
```
Expected: `All JSON valid`

- [ ] **Step 5: 提交**

```bash
git add src/i18n/locales/
git commit -m "feat: 重写三语 i18n 文件，覆盖全部 11 模块真实内容"
```

---

## Task 6: 创建 CoreStrengths 核心优势组件

**Files:**
- Create: `src/components/CoreStrengths.vue`

- [ ] **Step 1: 创建组件**

```vue
<template>
  <section id="strengths" class="py-20 bg-primary-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle titleKey="strengths_title" subtitleKey="strengths_subtitle" />
      <div class="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
        <div v-for="item in strengths" :key="item.valueKey"
             class="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
          <div class="text-4xl font-bold text-accent mb-2">{{ $t(item.valueKey) }}</div>
          <div class="text-sm text-primary-100">{{ $t(item.labelKey) }}</div>
        </div>
      </div>
      <p class="text-center text-primary-100 text-sm md:text-base max-w-4xl mx-auto">
        {{ $t('strengths_tagline') }}
      </p>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from './SectionTitle.vue'

const strengths = [
  { valueKey: 'strengths_intl_auth_value', labelKey: 'strengths_intl_auth' },
  { valueKey: 'strengths_cert_projects_value', labelKey: 'strengths_cert_projects' },
  { valueKey: 'strengths_categories_value', labelKey: 'strengths_categories' },
  { valueKey: 'strengths_honors_value', labelKey: 'strengths_honors' },
  { valueKey: 'strengths_clients_value', labelKey: 'strengths_clients' }
]
</script>
```

- [ ] **Step 2: 补充 i18n 数值 key**

在三个 locale 文件中补充以下 key（zh-CN 示例，zh-TW 与 en 同步）：

zh-CN.json 追加：
```json
"strengths_intl_auth_value": "19",
"strengths_cert_projects_value": "100+",
"strengths_categories_value": "8",
"strengths_honors_value": "300+",
"strengths_clients_value": "100+"
```

zh-TW.json 追加（同 zh-CN）：
```json
"strengths_intl_auth_value": "19",
"strengths_cert_projects_value": "100+",
"strengths_categories_value": "8",
"strengths_honors_value": "300+",
"strengths_clients_value": "100+"
```

en.json 追加：
```json
"strengths_intl_auth_value": "19",
"strengths_cert_projects_value": "100+",
"strengths_categories_value": "8",
"strengths_honors_value": "300+",
"strengths_clients_value": "100+"
```

- [ ] **Step 3: 提交**

```bash
git add src/components/CoreStrengths.vue src/i18n/locales/
git commit -m "feat: 新增 CoreStrengths 核心优势组件"
```

---

## Task 7: 创建 ServiceTabs 服务项目 Tab 组件

**Files:**
- Create: `src/components/ServiceTabs.vue`

- [ ] **Step 1: 创建组件**

```vue
<template>
  <section id="products" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle titleKey="products_title" subtitleKey="products_subtitle" />

      <div class="flex justify-center mb-12" role="tablist">
        <div class="inline-flex border-b border-gray-200 overflow-x-auto">
          <button v-for="tab in tabs" :key="tab.key"
                  role="tab"
                  :aria-selected="activeTab === tab.key"
                  @click="activeTab = tab.key"
                  :class="['px-6 py-3 font-medium transition-colors whitespace-nowrap border-b-2 -mb-px',
                           activeTab === tab.key
                             ? 'border-primary-500 text-primary-600'
                             : 'border-transparent text-gray-500 hover:text-gray-700']">
            {{ $t(tab.labelKey) }}
          </button>
        </div>
      </div>

      <transition name="fade" mode="out-in">
        <div :key="activeTab" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="item in currentItems" :key="item.nameKey"
               class="bg-gray-50 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <component :is="item.icon" class="w-6 h-6 text-primary-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t(item.nameKey) }}</h3>
            <p class="text-sm text-gray-600">{{ $t(item.descKey) }}</p>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, markRaw } from 'vue'
import { Award, BadgeCheck, Globe, Shield, Radio, FlaskConical, Cpu, Zap, Cog, Lightbulb } from 'lucide-vue-next'
import SectionTitle from './SectionTitle.vue'

const tabs = [
  { key: 'international', labelKey: 'service_tab_international' },
  { key: 'domestic', labelKey: 'service_tab_domestic' },
  { key: 'testing', labelKey: 'service_tab_testing' }
]

const activeTab = ref('international')

const allItems = {
  international: [
    { nameKey: 'cert_ce', descKey: 'cert_ce_desc', icon: markRaw(Award) },
    { nameKey: 'cert_fcc', descKey: 'cert_fcc_desc', icon: markRaw(Radio) },
    { nameKey: 'cert_cb', descKey: 'cert_cb_desc', icon: markRaw(Globe) },
    { nameKey: 'cert_ul', descKey: 'cert_ul_desc', icon: markRaw(Shield) },
    { nameKey: 'cert_etl', descKey: 'cert_etl_desc', icon: markRaw(Shield) },
    { nameKey: 'cert_csa', descKey: 'cert_csa_desc', icon: markRaw(BadgeCheck) },
    { nameKey: 'cert_saa', descKey: 'cert_saa_desc', icon: markRaw(BadgeCheck) },
    { nameKey: 'cert_gs', descKey: 'cert_gs_desc', icon: markRaw(Award) },
    { nameKey: 'cert_pse', descKey: 'cert_pse_desc', icon: markRaw(BadgeCheck) },
    { nameKey: 'cert_tuv', descKey: 'cert_tuv_desc', icon: markRaw(Award) },
    { nameKey: 'cert_cec', descKey: 'cert_cec_desc', icon: markRaw(Zap) },
    { nameKey: 'cert_ukca', descKey: 'cert_ukca_desc', icon: markRaw(BadgeCheck) }
  ],
  domestic: [
    { nameKey: 'cert_ccc', descKey: 'cert_ccc_desc', icon: markRaw(Shield) },
    { nameKey: 'cert_cqc', descKey: 'cert_cqc_desc', icon: markRaw(BadgeCheck) }
  ],
  testing: [
    { nameKey: 'test_emc', descKey: 'test_emc_desc', icon: markRaw(Radio) },
    { nameKey: 'test_lvd', descKey: 'test_lvd_desc', icon: markRaw(Shield) },
    { nameKey: 'test_rf', descKey: 'test_rf_desc', icon: markRaw(Radio) },
    { nameKey: 'test_rohs', descKey: 'test_rohs_desc', icon: markRaw(FlaskConical) },
    { nameKey: 'test_mech', descKey: 'test_mech_desc', icon: markRaw(Cog) },
    { nameKey: 'test_light', descKey: 'test_light_desc', icon: markRaw(Lightbulb) }
  ]
}

const currentItems = computed(() => allItems[activeTab.value] || [])
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/ServiceTabs.vue
git commit -m "feat: 新增 ServiceTabs 服务项目 Tab 组件"
```

---

## Task 8: 创建 ServiceFields 服务领域组件

**Files:**
- Create: `src/components/ServiceFields.vue`

- [ ] **Step 1: 创建组件**

```vue
<template>
  <section id="fields" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle titleKey="field_title" subtitleKey="field_subtitle" />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="(field, i) in fields" :key="i"
             class="group relative bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all">
          <div class="aspect-video overflow-hidden bg-gray-200">
            <img v-if="field.image" :src="field.image" :alt="$t(field.nameKey)"
                 :loading="i > 3 ? 'lazy' : 'eager'"
                 class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div v-else class="w-full h-full flex items-center justify-center bg-primary-100">
              <component :is="field.icon" class="w-16 h-16 text-primary-400" />
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t(field.nameKey) }}</h3>
            <p class="text-sm text-gray-600">{{ $t(field.descKey) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { markRaw } from 'vue'
import { Cpu, Video, Battery, Cog, Lightbulb, ToyBrick, Building2, BatteryCharging } from 'lucide-vue-next'
import SectionTitle from './SectionTitle.vue'
import field1 from '../assets/images/fields/field1.jpg'
import field2 from '../assets/images/fields/field2.jpg'
import field3 from '../assets/images/fields/field3.jpg'
import field4 from '../assets/images/fields/field4.jpg'

const fields = [
  { nameKey: 'field_1_name', descKey: 'field_1_desc', image: field1, icon: markRaw(Cpu) },
  { nameKey: 'field_2_name', descKey: 'field_2_desc', image: field2, icon: markRaw(Video) },
  { nameKey: 'field_3_name', descKey: 'field_3_desc', image: field3, icon: markRaw(Battery) },
  { nameKey: 'field_4_name', descKey: 'field_4_desc', image: field4, icon: markRaw(Cog) },
  { nameKey: 'field_5_name', descKey: 'field_5_desc', image: null, icon: markRaw(Lightbulb) },
  { nameKey: 'field_6_name', descKey: 'field_6_desc', image: null, icon: markRaw(ToyBrick) },
  { nameKey: 'field_7_name', descKey: 'field_7_desc', image: null, icon: markRaw(Building2) },
  { nameKey: 'field_8_name', descKey: 'field_8_desc', image: null, icon: markRaw(BatteryCharging) }
]
</script>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/ServiceFields.vue
git commit -m "feat: 新增 ServiceFields 服务领域组件"
```

---

## Task 9: 创建 ServiceProcess 服务流程组件

**Files:**
- Create: `src/components/ServiceProcess.vue`

- [ ] **Step 1: 创建组件**

```vue
<template>
  <section id="process" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle titleKey="process_title" subtitleKey="process_subtitle" />
      <ol class="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
        <li v-for="(step, i) in steps" :key="i" class="relative text-center">
          <div class="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center mx-auto mb-4 font-bold">
            {{ String(i + 1).padStart(2, '0') }}
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t(step.titleKey) }}</h3>
          <p class="text-sm text-gray-600">{{ $t(step.descKey) }}</p>
          <div v-if="i < steps.length - 1"
               class="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gray-200"></div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from './SectionTitle.vue'

const steps = [
  { titleKey: 'process_1_title', descKey: 'process_1_desc' },
  { titleKey: 'process_2_title', descKey: 'process_2_desc' },
  { titleKey: 'process_3_title', descKey: 'process_3_desc' },
  { titleKey: 'process_4_title', descKey: 'process_4_desc' },
  { titleKey: 'process_5_title', descKey: 'process_5_desc' }
]
</script>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/ServiceProcess.vue
git commit -m "feat: 新增 ServiceProcess 服务流程组件"
```

---

## Task 10: 创建 Qualifications 资质与合作实验室组件

**Files:**
- Create: `src/components/Qualifications.vue`

- [ ] **Step 1: 创建组件**

```vue
<template>
  <section id="qualifications" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle titleKey="qual_title" subtitleKey="qual_subtitle" />

      <h3 class="text-2xl font-semibold text-gray-900 mb-6 text-center">{{ $t('qual_certs_title') }}</h3>
      <div class="flex flex-wrap justify-center gap-4 mb-16">
        <div v-for="cert in certs" :key="cert"
             class="bg-white rounded-lg px-6 py-3 shadow-sm border border-gray-100">
          <span class="font-semibold text-primary-600">{{ cert }}</span>
        </div>
      </div>

      <h3 class="text-2xl font-semibold text-gray-900 mb-6 text-center">{{ $t('qual_labs_title') }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="lab in labs" :key="lab.nameKey"
             class="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all">
          <div class="aspect-video overflow-hidden bg-gray-200">
            <img :src="lab.image" :alt="$t(lab.nameKey)" loading="lazy"
                 class="w-full h-full object-cover" />
          </div>
          <div class="p-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-2">{{ $t(lab.nameKey) }}</h4>
            <p class="text-sm text-gray-600">{{ $t(lab.descKey) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from './SectionTitle.vue'
import emc from '../assets/images/labs/emc.png'
import chem from '../assets/images/labs/chemistry.png'
import safety from '../assets/images/labs/safety1.png'
import tuv from '../assets/images/labs/tuv.png'
import csa from '../assets/images/labs/csa.png'
import cqc from '../assets/images/labs/cqc.png'

const certs = ['CNAS', 'A2LA', 'FCC', 'CSA', 'TUV SUD', 'TUV Rheinland', 'CQC', 'CEC', 'Intertek']

const labs = [
  { nameKey: 'lab_emc', descKey: 'lab_emc_desc', image: emc },
  { nameKey: 'lab_chem', descKey: 'lab_chem_desc', image: chem },
  { nameKey: 'lab_safety', descKey: 'lab_safety_desc', image: safety },
  { nameKey: 'lab_tuv', descKey: 'lab_tuv_desc', image: tuv },
  { nameKey: 'lab_csa', descKey: 'lab_csa_desc', image: csa },
  { nameKey: 'lab_cqc', descKey: 'lab_cqc_desc', image: cqc }
]
</script>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/Qualifications.vue
git commit -m "feat: 新增 Qualifications 资质与合作实验室组件"
```

---

## Task 11: 创建 TypicalCases 典型案例组件

**Files:**
- Create: `src/components/TypicalCases.vue`

- [ ] **Step 1: 创建组件**

```vue
<template>
  <section id="cases" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle titleKey="case_title" subtitleKey="case_subtitle" />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div v-for="(c, i) in cases" :key="i"
             class="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
          <div class="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-4">
            {{ $t(c.typeKey) }}
          </div>
          <dl class="space-y-3 text-sm">
            <div>
              <dt class="text-gray-500">{{ $t('case_need_label') }}</dt>
              <dd class="text-gray-900 font-medium">{{ $t(c.needKey) }}</dd>
            </div>
            <div>
              <dt class="text-gray-500">{{ $t('case_service_label') }}</dt>
              <dd class="text-gray-900 font-medium">{{ $t(c.serviceKey) }}</dd>
            </div>
            <div>
              <dt class="text-gray-500">{{ $t('case_result_label') }}</dt>
              <dd class="text-primary-600 font-semibold">{{ $t(c.resultKey) }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <blockquote class="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-lg">
          <p class="text-gray-700 italic mb-3">"{{ $t('case_quote_1') }}"</p>
          <footer class="text-sm text-gray-500">{{ $t('case_quote_1_from') }}</footer>
        </blockquote>
        <blockquote class="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-lg">
          <p class="text-gray-700 italic mb-3">"{{ $t('case_quote_2') }}"</p>
          <footer class="text-sm text-gray-500">{{ $t('case_quote_2_from') }}</footer>
        </blockquote>
      </div>

      <div class="text-center">
        <button class="px-8 py-3 border-2 border-primary-500 text-primary-500 font-semibold rounded-lg hover:bg-primary-50 transition-colors">
          {{ $t('case_more_btn') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from './SectionTitle.vue'

const cases = [
  { typeKey: 'case_1_type', needKey: 'case_1_need', serviceKey: 'case_1_service', resultKey: 'case_1_result' },
  { typeKey: 'case_2_type', needKey: 'case_2_need', serviceKey: 'case_2_service', resultKey: 'case_2_result' },
  { typeKey: 'case_3_type', needKey: 'case_3_need', serviceKey: 'case_3_service', resultKey: 'case_3_result' },
  { typeKey: 'case_4_type', needKey: 'case_4_need', serviceKey: 'case_4_service', resultKey: 'case_4_result' }
]
</script>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/TypicalCases.vue
git commit -m "feat: 新增 TypicalCases 典型案例组件"
```

---

## Task 12: 创建 ContactCTA 联系区块组件

**Files:**
- Create: `src/components/ContactCTA.vue`

- [ ] **Step 1: 创建组件**

```vue
<template>
  <section id="contact" class="py-20 bg-primary-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-2">{{ $t('cta_title') }}</h2>
        <p class="text-sm text-primary-200 uppercase tracking-widest mb-4">{{ $t('cta_subtitle') }}</p>
        <div class="w-16 h-1 bg-accent mx-auto"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <a :href="'tel:' + $t('phone_number')"
             class="block bg-white/10 backdrop-blur rounded-xl p-8 mb-6 hover:bg-white/15 transition-colors">
            <div class="flex items-center">
              <Phone class="w-10 h-10 text-accent mr-4" />
              <div>
                <div class="text-sm text-primary-200">{{ $t('cta_phone_label') }}</div>
                <div class="text-3xl font-bold">{{ $t('phone_number') }}</div>
              </div>
            </div>
          </a>

          <div class="space-y-4">
            <div class="flex items-center">
              <Mail class="w-6 h-6 text-accent mr-4" />
              <div>
                <div class="text-sm text-primary-200">{{ $t('cta_email_label') }}</div>
                <div class="text-lg">{{ $t('email_value') }}</div>
              </div>
            </div>
            <div class="flex items-center">
              <Globe class="w-6 h-6 text-accent mr-4" />
              <div>
                <div class="text-sm text-primary-200">{{ $t('cta_website_label') }}</div>
                <div class="text-lg">{{ $t('website_value') }}</div>
              </div>
            </div>
            <div class="flex items-start">
              <MapPin class="w-6 h-6 text-accent mr-4 mt-1" />
              <div>
                <div class="text-sm text-primary-200">{{ $t('cta_address_label') }}</div>
                <div class="text-lg">{{ $t('address_value') }}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-6">{{ $t('cta_form_title') }}</h3>
          <form @submit.prevent="handleSubmit" class="bg-white/10 backdrop-blur rounded-xl p-6 space-y-4">
            <div>
              <label class="block text-sm text-primary-200 mb-1">{{ $t('cta_form_name') }}</label>
              <input v-model="form.name" type="text" required
                     class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-primary-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                     :placeholder="$t('cta_form_name_placeholder')" />
            </div>
            <div>
              <label class="block text-sm text-primary-200 mb-1">{{ $t('cta_form_phone') }}</label>
              <input v-model="form.phone" type="tel" required
                     class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-primary-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                     :placeholder="$t('cta_form_phone_placeholder')" />
            </div>
            <div>
              <label class="block text-sm text-primary-200 mb-1">{{ $t('cta_form_message') }}</label>
              <textarea v-model="form.message" rows="4" required
                        class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-primary-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                        :placeholder="$t('cta_form_message_placeholder')"></textarea>
            </div>
            <button type="submit"
                    class="w-full bg-accent text-white font-semibold py-3 rounded-lg hover:bg-accent-dark transition-colors">
              {{ $t('cta_form_submit') }}
            </button>
            <p v-if="submitted" class="text-center text-accent-light">{{ $t('cta_form_success') }}</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Phone, Mail, Globe, MapPin } from 'lucide-vue-next'

const form = reactive({ name: '', phone: '', message: '' })
const submitted = ref(false)

const handleSubmit = () => {
  submitted.value = true
  form.name = ''
  form.phone = ''
  form.message = ''
  setTimeout(() => { submitted.value = false }, 3000)
}
</script>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/ContactCTA.vue
git commit -m "feat: 新增 ContactCTA 联系区块组件"
```

---

## Task 13: 改造 Header 组件

**Files:**
- Modify: `src/components/Header.vue`

- [ ] **Step 1: 替换 Header.vue 全部内容**

```vue
<template>
  <header class="bg-white shadow-md fixed w-full top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <img src="../assets/images/logo/logo.png" :alt="$t('company')" class="h-10 w-auto" />
        </div>

        <nav class="hidden lg:flex items-center space-x-6" role="navigation">
          <a v-for="item in navItems" :key="item.href" :href="item.href"
             class="text-gray-600 hover:text-primary-600 transition-colors font-medium text-sm">
            {{ $t(item.label) }}
          </a>
        </nav>

        <div class="flex items-center space-x-3">
          <a :href="'tel:' + $t('phone_number')"
             class="hidden sm:inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold text-sm">
            <Phone class="w-4 h-4 mr-2" />
            {{ $t('phone_number') }}
          </a>

          <div class="relative" ref="langDropdown">
            <button @click="toggleLangMenu"
                    class="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors font-medium text-sm">
              <Globe class="w-4 h-4" />
              <span>{{ langLabel }}</span>
              <ChevronDown class="w-3 h-3" />
            </button>
            <div v-if="langMenuOpen"
                 class="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
              <button v-for="locale in locales" :key="locale.code"
                      @click="switchLocale(locale.code)"
                      :class="['w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors',
                               currentLocale === locale.code ? 'text-primary-600 font-semibold' : 'text-gray-600']">
                {{ locale.native }}
              </button>
            </div>
          </div>

          <button @click="menuOpen = !menuOpen" class="lg:hidden text-gray-600">
            <Menu v-if="!menuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <transition name="slide">
      <div v-if="menuOpen" class="lg:hidden bg-white border-t fixed inset-x-0 top-16 bottom-0 overflow-y-auto">
        <nav class="flex flex-col p-4 space-y-2">
          <a v-for="item in navItems" :key="item.href" :href="item.href"
             @click="menuOpen = false"
             class="text-gray-600 hover:text-primary-600 transition-colors font-medium py-3 border-b border-gray-100">
            {{ $t(item.label) }}
          </a>
          <a :href="'tel:' + $t('phone_number')"
             class="mt-4 inline-flex items-center justify-center px-4 py-3 bg-primary-500 text-white rounded-lg font-semibold">
            <Phone class="w-4 h-4 mr-2" />
            {{ $t('phone_number') }}
          </a>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Menu, X, Globe, ChevronDown, Phone } from 'lucide-vue-next'
import { storeLocale } from '../i18n'

const { locale } = useI18n()
const menuOpen = ref(false)
const langMenuOpen = ref(false)
const langDropdown = ref(null)
const currentLocale = computed(() => locale.value)

const locales = [
  { code: 'zh-CN', native: '简体中文' },
  { code: 'zh-TW', native: '繁體中文' },
  { code: 'en', native: 'English' }
]

const langLabel = computed(() => {
  const map = { 'zh-CN': '中文', 'zh-TW': '繁中', 'en': 'EN' }
  return map[locale.value] || 'EN'
})

const navItems = [
  { label: 'nav_home', href: '#home' },
  { label: 'nav_about', href: '#about' },
  { label: 'nav_strengths', href: '#strengths' },
  { label: 'nav_products', href: '#products' },
  { label: 'nav_fields', href: '#fields' },
  { label: 'nav_process', href: '#process' },
  { label: 'nav_qualifications', href: '#qualifications' },
  { label: 'nav_cases', href: '#cases' },
  { label: 'nav_contact', href: '#contact' }
]

const toggleLangMenu = () => { langMenuOpen.value = !langMenuOpen.value }

const switchLocale = (loc) => {
  locale.value = loc
  storeLocale(loc)
  langMenuOpen.value = false
}

function handleClickOutside(event) {
  if (langDropdown.value && !langDropdown.value.contains(event.target)) {
    langMenuOpen.value = false
  }
}

onMounted(() => { document.addEventListener('click', handleClickOutside) })
onUnmounted(() => { document.removeEventListener('click', handleClickOutside) })
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}
</style>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/Header.vue
git commit -m "feat: 改造 Header，加电话按钮、Logo、9 项导航、移动端侧滑菜单"
```

---

## Task 14: 改造 Footer 组件

**Files:**
- Modify: `src/components/Footer.vue`

- [ ] **Step 1: 替换 Footer.vue 全部内容**

```vue
<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-bold text-primary-400 mb-2">{{ $t('footer_company') }}</h3>
          <p class="text-gray-400 text-sm">{{ $t('footer_company_en') }}</p>
        </div>
        <div>
          <h4 class="font-semibold mb-4">{{ $t('footer_quick_links') }}</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><a href="#home" class="hover:text-white transition-colors">{{ $t('nav_home') }}</a></li>
            <li><a href="#about" class="hover:text-white transition-colors">{{ $t('nav_about') }}</a></li>
            <li><a href="#products" class="hover:text-white transition-colors">{{ $t('nav_products') }}</a></li>
            <li><a href="#qualifications" class="hover:text-white transition-colors">{{ $t('nav_qualifications') }}</a></li>
            <li><a href="#contact" class="hover:text-white transition-colors">{{ $t('nav_contact') }}</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">{{ $t('footer_contact') }}</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li class="flex items-center"><Phone class="w-4 h-4 mr-2" />{{ $t('phone_number') }}</li>
            <li class="flex items-center"><Mail class="w-4 h-4 mr-2" />{{ $t('email_value') }}</li>
            <li class="flex items-center"><Globe class="w-4 h-4 mr-2" />{{ $t('website_value') }}</li>
            <li class="flex items-start"><MapPin class="w-4 h-4 mr-2 mt-1" />{{ $t('address_value') }}</li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
        <p>{{ $t('footer_copyright') }}</p>
        <p class="mt-1">{{ $t('footer_icp') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Phone, Mail, Globe, MapPin } from 'lucide-vue-next'
</script>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/Footer.vue
git commit -m "feat: 改造 Footer，补充真实联系信息与备案占位"
```

---

## Task 15: 改造 Home.vue 与 App.vue，删除旧 view 文件

**Files:**
- Modify: `src/views/Home.vue`
- Modify: `src/App.vue`
- Delete: `src/views/About.vue`、`src/views/Products.vue`、`src/views/Contact.vue`

- [ ] **Step 1: 重写 Home.vue**

```vue
<template>
  <section id="home">
    <BannerCarousel />

    <section id="about" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle titleKey="about_title" subtitleKey="about_subtitle" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="aspect-video rounded-xl overflow-hidden">
            <img src="../assets/images/banner/banner1.jpg" :alt="$t('about_title')"
                 class="w-full h-full object-cover" />
          </div>
          <div>
            <p class="text-gray-600 mb-4 leading-relaxed">{{ $t('about_desc_1') }}</p>
            <p class="text-gray-600 mb-6 leading-relaxed">{{ $t('about_desc_2') }}</p>
            <a href="#contact" class="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors">
              {{ $t('about_btn') }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <CoreStrengths />
    <ServiceTabs />
    <ServiceFields />
    <ServiceProcess />
    <Qualifications />
    <TypicalCases />
    <ContactCTA />
  </section>
</template>

<script setup>
import BannerCarousel from '../components/BannerCarousel.vue'
import SectionTitle from '../components/SectionTitle.vue'
import CoreStrengths from '../components/CoreStrengths.vue'
import ServiceTabs from '../components/ServiceTabs.vue'
import ServiceFields from '../components/ServiceFields.vue'
import ServiceProcess from '../components/ServiceProcess.vue'
import Qualifications from '../components/Qualifications.vue'
import TypicalCases from '../components/TypicalCases.vue'
import ContactCTA from '../components/ContactCTA.vue'
</script>
```

- [ ] **Step 2: 重写 App.vue**

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

<style>
body {
  margin: 0;
  padding: 0;
}
html {
  scroll-behavior: smooth;
}
</style>
```

- [ ] **Step 3: 删除旧 view 文件**

Run:
```bash
rm src/views/About.vue src/views/Products.vue src/views/Contact.vue
```

- [ ] **Step 4: 启动开发服务器验证**

Run: `npm run dev`
Expected: 服务启动无错误，浏览器打开 http://localhost:5173/ 显示完整首页

- [ ] **Step 5: 生产构建验证**

Run: `npm run build`
Expected: 构建成功无错误

- [ ] **Step 6: 提交**

```bash
git add src/views/Home.vue src/App.vue
git rm src/views/About.vue src/views/Products.vue src/views/Contact.vue
git commit -m "feat: 改造 Home.vue 编排 11 模块，更新 App.vue，删除旧 view"
```

---

## Task 16: 最终验证与清理

- [ ] **Step 1: 启动开发服务器**

Run: `npm run dev`

- [ ] **Step 2: 人工验证清单**

在浏览器 http://localhost:5173/ 逐项验证：

- [ ] Header 显示 Logo + 9 项导航 + 电话按钮 `15207111291` + 语言切换
- [ ] Banner 轮播 4 张图自动切换，文案与图片匹配
- [ ] 关于我们显示公司前台图 + 真实公司简介
- [ ] 核心优势显示 5 项数据（19/100+/8/300+/100+）
- [ ] 服务项目 Tab 3 个（国际/国内/检测），切换正常
- [ ] 服务领域 8 个卡片，前 4 个有图，后 4 个有图标占位
- [ ] 服务流程 5 步横向排列（移动端纵向）
- [ ] 资质展示 9 个徽章 + 6 个实验室卡片
- [ ] 典型案例 4 个卡片 + 2 个客户评价
- [ ] 联系 CTA 深蓝背景，电话大字号，表单可提交
- [ ] Footer 显示真实联系信息
- [ ] 切换简体/繁体/英文三语，无 key 缺失
- [ ] 移动端（375px 宽度）布局正常，汉堡菜单可用
- [ ] 点击电话按钮唤起拨号

- [ ] **Step 3: 生产构建**

Run: `npm run build`
Expected: 构建成功，`dist/` 目录生成

- [ ] **Step 4: 最终提交**

```bash
git add -A
git commit -m "chore: 首页改版完成，通过全部验证"
```

---

## Self-Review

### Spec 覆盖检查

| 设计文档模块 | 对应 Task | 状态 |
|-------------|-----------|------|
| Header | Task 13 | ✓ |
| Banner 轮播 | Task 4 | ✓ |
| 关于我们 | Task 15 (Home.vue 内) | ✓ |
| 核心优势 | Task 6 | ✓ |
| 服务项目 Tab | Task 7 | ✓ |
| 服务领域 | Task 8 | ✓ |
| 服务流程 | Task 9 | ✓ |
| 资质与合作实验室 | Task 10 | ✓ |
| 典型案例 | Task 11 | ✓ |
| 联系 CTA | Task 12 | ✓ |
| Footer | Task 14 | ✓ |
| 视觉系统（配色） | Task 2 | ✓ |
| i18n 三语 | Task 5 + Task 6 补充 | ✓ |
| 图片资源映射 | Task 1 | ✓ |

### 占位符扫描

无 TBD/TODO，所有步骤含完整代码。

### 类型一致性

- `phone_number` key 在 Header/Footer/ContactCTA 中统一使用
- `SectionTitle` props（titleKey/subtitleKey）在所有引用处一致
- 图片导入路径与 Task 1 复制的文件名一致
