import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN.json'
import zhTW from './locales/zh-TW.json'
import en from './locales/en.json'

const supportedLocales = ['zh-CN', 'zh-TW', 'en']
const defaultLocale = 'en'

function getStoredLocale() {
  try {
    const stored = localStorage.getItem('locale')
    if (stored && supportedLocales.includes(stored)) {
      return stored
    }
  } catch (e) {
    // localStorage unavailable
  }
  return null
}

function storeLocale(locale) {
  try {
    localStorage.setItem('locale', locale)
  } catch (e) {
    // localStorage unavailable
  }
}

// 基于浏览器语言偏好检测区域设置（纯客户端，不泄露 IP 给第三方）
function detectLocaleFromNavigator() {
  const lang = (navigator.language || '').toLowerCase()
  const languages = (navigator.languages || []).map((l) => l.toLowerCase())

  // 依次检查所有语言偏好
  for (const l of languages.concat(lang)) {
    if (l.startsWith('zh-cn') || l.startsWith('zh-hans') || l === 'zh') return 'zh-CN'
    if (l.startsWith('zh-tw') || l.startsWith('zh-hant') || l.startsWith('zh-hk') || l.startsWith('zh-mo')) return 'zh-TW'
    if (l.startsWith('zh')) return 'zh-CN'
  }

  return defaultLocale
}

async function detectLocale() {
  const stored = getStoredLocale()
  if (stored) return stored
  return detectLocaleFromNavigator()
}

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages: {
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    en: en
  }
})

export { i18n, detectLocale, supportedLocales, storeLocale, getStoredLocale }
export default i18n
