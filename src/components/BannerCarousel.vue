<template>
  <section id="home" class="relative" role="region" aria-label="banner 轮播">
    <div class="relative h-[400px] md:h-[500px] overflow-hidden"
         @mouseenter="pauseAutoPlay"
         @mouseleave="resumeAutoPlay"
         @touchstart.passive="onTouchStart"
         @touchend="onTouchEnd">

      <!-- 滑动轨道 -->
      <div class="flex h-full transition-transform duration-700 ease-out motion-reduce:transition-none"
           :style="{ transform: `translateX(-${current * 100}%)` }">
        <div v-for="(slide, i) in slides" :key="i"
             class="relative h-full w-full shrink-0"
             :aria-hidden="current !== i">
          <img :src="slide.image" :alt="$t(slide.titleKey)"
               class="w-full h-full object-cover" loading="eager" />
          <div class="absolute inset-0 bg-gradient-to-r from-primary-900/75 via-primary-900/45 to-primary-900/20"></div>
          <div class="absolute inset-0 flex items-center">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div class="max-w-2xl text-white">
                <h1 class="text-3xl md:text-5xl font-bold mb-4 leading-tight">{{ $t(slide.titleKey) }}</h1>
                <p class="text-lg md:text-xl text-primary-100 mb-8 hidden md:block">{{ $t(slide.subtitleKey) }}</p>
                <a :href="slide.btnHref"
                   class="inline-flex items-center px-8 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors">
                  {{ $t(slide.btnKey) }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 左右箭头 -->
      <button type="button" @click="prev"
              class="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-white/15 backdrop-blur text-white hover:bg-white/30 transition-colors"
              :aria-label="$t('banner_prev')">
        <ChevronLeft class="w-6 h-6" />
      </button>
      <button type="button" @click="next"
              class="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-white/15 backdrop-blur text-white hover:bg-white/30 transition-colors"
              :aria-label="$t('banner_next')">
        <ChevronRight class="w-6 h-6" />
      </button>

      <!-- 指示器 -->
      <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button v-for="(slide, i) in slides" :key="i"
                type="button"
                @click="goTo(i)"
                :aria-label="`切换到第 ${i + 1} 张`"
                :class="['h-1.5 rounded-full transition-all duration-300',
                         current === i ? 'w-8 bg-white' : 'w-3 bg-white/50 hover:bg-white/75']"></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import banner5 from '../assets/images/banner/banner5.jpg'
import banner6 from '../assets/images/banner/banner6.jpg'
import banner1 from '../assets/images/banner/banner1.jpg'
import banner2 from '../assets/images/banner/banner2.jpg'
import banner3 from '../assets/images/banner/banner3.png'
import banner4 from '../assets/images/banner/banner4.png'

const slides = [
  { image: banner5, titleKey: 'banner_5_title', subtitleKey: 'banner_5_subtitle', btnKey: 'banner_5_btn', btnHref: '#contact' },
  { image: banner6, titleKey: 'banner_6_title', subtitleKey: 'banner_6_subtitle', btnKey: 'banner_6_btn', btnHref: '#cases' },
  { image: banner1, titleKey: 'banner_1_title', subtitleKey: 'banner_1_subtitle', btnKey: 'banner_1_btn', btnHref: '#about' },
  { image: banner2, titleKey: 'banner_2_title', subtitleKey: 'banner_2_subtitle', btnKey: 'banner_2_btn', btnHref: '#products' },
  { image: banner3, titleKey: 'banner_3_title', subtitleKey: 'banner_3_subtitle', btnKey: 'banner_3_btn', btnHref: '#qualifications' },
  { image: banner4, titleKey: 'banner_4_title', subtitleKey: 'banner_4_subtitle', btnKey: 'banner_4_btn', btnHref: '#qualifications' }
]

const current = ref(0)
const paused = ref(false)
let timer = null
let touchStartX = 0

const next = () => {
  current.value = (current.value + 1) % slides.length
}
const prev = () => {
  current.value = (current.value - 1 + slides.length) % slides.length
}
const goTo = (i) => {
  current.value = i
}

const startAutoPlay = () => {
  timer = setInterval(() => {
    if (!paused.value) next()
  }, 5000)
}
const stopAutoPlay = () => {
  if (timer) clearInterval(timer)
}
const pauseAutoPlay = () => {
  paused.value = true
}
const resumeAutoPlay = () => {
  paused.value = false
}

const onTouchStart = (e) => {
  touchStartX = e.touches[0].clientX
}
const onTouchEnd = (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(dx) > 40) {
    if (dx < 0) next()
    else prev()
  }
}

const handleKeydown = (e) => {
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
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
