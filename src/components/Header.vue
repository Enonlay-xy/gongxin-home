<template>
  <header class="bg-white shadow-md fixed w-full top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <span class="text-2xl font-bold text-primary-700">国信科技</span>
        </div>
        <nav class="hidden md:flex space-x-8">
          <a v-for="item in navItems" :key="item.href" :href="item.href"
             class="text-gray-600 hover:text-primary-600 transition-colors font-medium">
            {{ item.label }}
          </a>
        </nav>
        <button @click="toggleMenu" class="md:hidden text-gray-600">
          <Menu class="w-6 h-6" />
        </button>
      </div>
    </div>
    <div v-if="menuOpen" class="md:hidden bg-white border-t">
      <nav class="flex flex-col px-4 py-3 space-y-3">
        <a v-for="item in navItems" :key="item.href" :href="item.href"
           @click="menuOpen = false"
           class="text-gray-600 hover:text-primary-600 transition-colors font-medium py-2">
          {{ item.label }}
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Menu } from 'lucide-vue-next'

const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const navItems = [
  { label: '首页', href: '#home' },
  { label: '关于我们', href: '#about' },
  { label: '产品服务', href: '#products' },
  { label: '联系我们', href: '#contact' }
]
</script>
