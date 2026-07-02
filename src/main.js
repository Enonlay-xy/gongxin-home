import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n, { detectLocale, storeLocale } from './i18n'
import { inject } from '@vercel/analytics'

async function bootstrap() {
  const locale = await detectLocale()
  i18n.global.locale.value = locale
  storeLocale(locale)

  const app = createApp(App)
  app.use(i18n)
  app.mount('#app')
  // 接入 Vercel Analytics 访问统计
  inject()
}

bootstrap()
