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
