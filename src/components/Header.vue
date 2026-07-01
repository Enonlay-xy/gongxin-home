<template>
  <header class="bg-white shadow-md fixed w-full top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <img src="../assets/images/logo/logo.png" :alt="$t('company')" class="h-10 w-auto" />
          <span class="ml-3 text-lg font-bold text-primary-600">{{ $t('company') }}</span>
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
