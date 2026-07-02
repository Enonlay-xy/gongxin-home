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
              <label class="block text-sm text-primary-200 mb-1">{{ $t('cta_form_name') }}<span class="text-red-500 ml-0.5">*</span></label>
              <input v-model="form.name" type="text" required
                     :class="['w-full px-4 py-2 bg-white/10 border rounded-lg text-white placeholder-primary-300 focus:ring-2 focus:ring-accent focus:border-transparent', errors.name ? 'border-red-500 animate-blink' : 'border-white/20']"
                     @input="errors.name = false"
                     :placeholder="$t('cta_form_name_placeholder')" />
            </div>
            <div>
              <label class="block text-sm text-primary-200 mb-1">{{ $t('cta_form_phone') }}<span class="text-red-500 ml-0.5">*</span></label>
              <input v-model="form.phone" type="tel" required
                     :class="['w-full px-4 py-2 bg-white/10 border rounded-lg text-white placeholder-primary-300 focus:ring-2 focus:ring-accent focus:border-transparent', errors.phone ? 'border-red-500 animate-blink' : 'border-white/20']"
                     @input="errors.phone = false"
                     :placeholder="$t('cta_form_phone_placeholder')" />
            </div>
            <div>
              <label class="block text-sm text-primary-200 mb-1">{{ $t('cta_form_message') }}</label>
              <textarea v-model="form.message" rows="4"
                        class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-primary-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                        :placeholder="$t('cta_form_message_placeholder')"></textarea>
            </div>
            <!-- Invisible 模式：隐藏容器，不占用布局空间 -->
            <div ref="turnstileContainer" aria-hidden="true" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);"></div>
            <button type="submit" :disabled="loading || verifying"
                    :class="['w-full bg-accent text-white font-semibold py-3 rounded-lg hover:bg-accent-dark transition-colors', (loading || verifying) ? 'opacity-60 cursor-not-allowed' : '']">
              {{ (loading || verifying) ? $t('cta_form_loading') : $t('cta_form_submit') }}
            </button>
            <p v-if="submitted" class="text-center text-accent-light">{{ $t('cta_form_success') }}</p>
            <p v-if="error" class="text-center text-red-300">{{ $t(errorType === 'turnstile' ? 'cta_form_error_turnstile' : 'cta_form_error_network') }}</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { Phone, Mail, Globe, MapPin } from 'lucide-vue-next'

const form = reactive({ name: '', phone: '', message: '' })
const submitted = ref(false)
const loading = ref(false)
const error = ref(false)
// 错误类型：'turnstile' = 人机验证失败 | 'network' = 网络/服务端错误（含速率限制）
const errorType = ref('network')
const errors = reactive({ name: false, phone: false })

// ─── Cloudflare Turnstile 人机验证（Invisible 模式）───
// 注意：此 Site Key 需在 Cloudflare 控制台创建为 Invisible 模式的 Widget
// 通过环境变量 VITE_TURNSTILE_ENABLED 控制是否启用（默认关闭，'true' 启用）
const turnstileToken = ref('')
const verifying = ref(false) // 正在执行人机验证
const turnstileContainer = ref(null)
const turnstileWidgetId = ref(null)
const turnstileSiteKey = '0x4AAAAAADugdJ2dzGh6zzFm'
const turnstileEnabled = (import.meta.env.VITE_TURNSTILE_ENABLED ?? 'false') === 'true' && !!turnstileSiteKey

function loadTurnstileScript() {
  return new Promise((resolve) => {
    if (window.turnstile) {
      resolve()
      return
    }
    const existing = document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')
    if (existing) {
      existing.addEventListener('load', resolve)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.onload = resolve
    document.head.appendChild(script)
  })
}

function renderTurnstile() {
  if (!window.turnstile || !turnstileContainer.value || !turnstileSiteKey) return
  turnstileWidgetId.value = window.turnstile.render(turnstileContainer.value, {
    sitekey: turnstileSiteKey,
    appearance: 'execute', // Invisible：通过 execute() 主动触发，需要交互时才弹出挑战
    callback: (token) => {
      turnstileToken.value = token
      verifying.value = false
      // 验证通过后自动继续提交
      submitForm()
    },
    'expired-callback': () => {
      turnstileToken.value = ''
      verifying.value = false
      errorType.value = 'turnstile'
      error.value = true
    },
    'error-callback': () => {
      turnstileToken.value = ''
      verifying.value = false
      errorType.value = 'turnstile'
      error.value = true
    },
  })
}

function resetTurnstile() {
  turnstileToken.value = ''
  if (turnstileWidgetId.value !== null && window.turnstile) {
    window.turnstile.reset(turnstileWidgetId.value)
  }
}

onMounted(async () => {
  if (turnstileEnabled) {
    await loadTurnstileScript()
    await nextTick()
    renderTurnstile()
  }
})

onUnmounted(() => {
  if (turnstileWidgetId.value !== null && window.turnstile) {
    window.turnstile.remove(turnstileWidgetId.value)
  }
})

const handleSubmit = async () => {
  errors.name = !form.name.trim()
  errors.phone = !form.phone.trim()
  if (errors.name || errors.phone) return
  error.value = false

  // Invisible 模式：首次提交时主动触发验证，验证通过后由 callback 自动调用 submitForm
  if (turnstileEnabled && !turnstileToken.value) {
    verifying.value = true
    if (turnstileWidgetId.value !== null && window.turnstile) {
      window.turnstile.execute(turnstileWidgetId.value)
    }
    return
  }

  await submitForm()
}

const submitForm = async () => {
  loading.value = true
  error.value = false
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        message: form.message,
        turnstileToken: turnstileToken.value,
      }),
    })
    // 所有非 2xx 响应（含 429 速率限制、403 人机验证失败、5xx 服务异常）
    // 统一展示为"网络异常，请稍后重试"，避免泄露服务端状态
    if (!res.ok) throw new Error('failed')
    submitted.value = true
    form.name = ''
    form.phone = ''
    form.message = ''
    resetTurnstile()
    setTimeout(() => { submitted.value = false }, 3000)
  } catch {
    errorType.value = 'network'
    error.value = true
    resetTurnstile()
  } finally {
    loading.value = false
  }
}
</script>
