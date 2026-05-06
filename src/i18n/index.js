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

function detectLocaleByCountry(countryCode) {
  if (countryCode === 'CN') return 'zh-CN'
  if (countryCode === 'TW' || countryCode === 'HK' || countryCode === 'MO') return 'zh-TW'
  return 'en'
}

async function detectLocale() {
  const stored = getStoredLocale()
  if (stored) return stored

  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    return detectLocaleByCountry(data.country_code)
  } catch (e) {
    return defaultLocale
  }
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
