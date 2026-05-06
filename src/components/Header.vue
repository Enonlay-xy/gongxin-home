<template>
  <header class="bg-white shadow-md fixed w-full top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <span class="text-2xl font-bold text-primary-700">{{ $t('company') }}</span>
        </div>
        <div class="hidden md:flex items-center space-x-8">
          <nav class="flex space-x-8">
            <a v-for="item in navItems" :key="item.href" :href="item.href"
               class="text-gray-600 hover:text-primary-600 transition-colors font-medium">
              {{ $t(item.label) }}
            </a>
          </nav>
          <div class="relative" ref="langDropdown">
            <button @click="toggleLangMenu"
                    class="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors font-medium">
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
        </div>
        <div class="md:hidden flex items-center space-x-3">
          <div class="relative" ref="langDropdownMobile">
            <button @click="toggleLangMenuMobile"
                    class="flex items-center space-x-1 text-gray-600 font-medium text-sm">
              <Globe class="w-4 h-4" />
              <span>{{ langLabel }}</span>
            </button>
            <div v-if="langMenuOpenMobile"
                 class="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
              <button v-for="locale in locales" :key="locale.code"
                      @click="switchLocale(locale.code)"
                      :class="['w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors',
                               currentLocale === locale.code ? 'text-primary-600 font-semibold' : 'text-gray-600']">
                {{ locale.native }}
              </button>
            </div>
          </div>
          <button @click="toggleMenu" class="text-gray-600">
            <Menu class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
    <div v-if="menuOpen" class="md:hidden bg-white border-t">
      <nav class="flex flex-col px-4 py-3 space-y-3">
        <a v-for="item in navItems" :key="item.href" :href="item.href"
           @click="menuOpen = false"
           class="text-gray-600 hover:text-primary-600 transition-colors font-medium py-2">
          {{ $t(item.label) }}
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Menu, Globe, ChevronDown } from 'lucide-vue-next'
import { storeLocale } from '../i18n'

const { locale } = useI18n()

const menuOpen = ref(false)
const langMenuOpen = ref(false)
const langMenuOpenMobile = ref(false)
const langDropdown = ref(null)
const langDropdownMobile = ref(null)

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
  { label: 'home', href: '#home' },
  { label: 'about', href: '#about' },
  { label: 'products', href: '#products' },
  { label: 'contact', href: '#contact' }
]

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const toggleLangMenu = () => {
  langMenuOpen.value = !langMenuOpen.value
}

const toggleLangMenuMobile = () => {
  langMenuOpenMobile.value = !langMenuOpenMobile.value
}

const switchLocale = (loc) => {
  locale.value = loc
  storeLocale(loc)
  langMenuOpen.value = false
  langMenuOpenMobile.value = false
}

function handleClickOutside(event) {
  if (langDropdown.value && !langDropdown.value.contains(event.target)) {
    langMenuOpen.value = false
  }
  if (langDropdownMobile.value && !langDropdownMobile.value.contains(event.target)) {
    langMenuOpenMobile.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
