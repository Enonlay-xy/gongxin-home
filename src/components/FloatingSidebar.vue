<template>
  <div class="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
    <transition
      mode="out-in"
      enter-active-class="animate-spring-expand"
      leave-active-class="animate-spring-collapse"
    >
      <!-- 展开态 -->
      <div
        v-if="isExpanded"
        key="expanded"
        class="relative bg-primary-100 border border-primary-200 border-r-0 rounded-l-2xl px-3 py-3.5 w-[84px] shadow-[-4px_4px_16px_rgba(30,64,175,0.15)] origin-right"
      >
        <!-- 关闭按钮 -->
        <button
          @click="isExpanded = false"
          class="absolute top-[14.29%] -left-3 w-5 h-5 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-md hover:bg-primary-700 transition-colors"
          :aria-label="$t('sidebar_collapsed_label')"
        >
          <ChevronsRight class="w-3.5 h-3.5" />
        </button>

        <!-- 按钮列表 -->
        <div class="flex flex-col gap-2.5">
          <!-- 联系我们 -->
          <button
            @click="scrollToContact"
            class="flex flex-col items-center gap-1 px-1 py-2 rounded-xl bg-white/70 hover:bg-white transition-colors"
          >
            <div class="w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center text-white">
              <Phone class="w-4 h-4" />
            </div>
            <span class="text-[10px] font-semibold text-primary-700 text-center leading-tight">{{ $t('sidebar_contact') }}</span>
          </button>

          <!-- 微信咨询 -->
          <div
            class="relative"
            @mouseenter="showQrCode = true"
            @mouseleave="showQrCode = false"
          >
            <button
              class="w-full flex flex-col items-center gap-1 px-1 py-2 rounded-xl bg-white/70 hover:bg-white transition-colors"
            >
              <div class="w-7 h-7 rounded-full bg-primary-600 flex items-center justify-center text-white">
                <MessageCircle class="w-4 h-4" />
              </div>
              <span class="text-[10px] font-semibold text-primary-700 text-center leading-tight">{{ $t('sidebar_wechat') }}</span>
            </button>

            <!-- 二维码气泡 -->
            <transition
              enter-active-class="animate-spring-pop"
              leave-active-class="transition-opacity duration-200 opacity-0"
            >
              <div
                v-if="showQrCode"
                class="absolute top-1/2 -translate-y-1/2 right-[calc(100%+12px)] bg-white border border-primary-200 rounded-2xl p-3.5 shadow-xl w-40"
              >
                <!-- 小三角 -->
                <div class="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-r border-t border-primary-200 rotate-45"></div>
                <!-- 二维码占位区 -->
                <div class="w-[132px] h-[132px] bg-primary-50 rounded-lg border border-dashed border-primary-300 flex items-center justify-center mx-auto">
                  <span class="text-primary-500 text-xs font-semibold">微信二维码</span>
                </div>
                <p class="text-primary-700 text-xs font-semibold text-center mt-2.5">{{ $t('sidebar_qr_tip') }}</p>
              </div>
            </transition>
          </div>

          <!-- 回到顶部 -->
          <button
            @click="scrollToTop"
            class="flex flex-col items-center gap-1 px-1 py-2 rounded-xl bg-white/70 hover:bg-white transition-colors"
          >
            <div class="w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center text-white">
              <ArrowUp class="w-4 h-4" />
            </div>
            <span class="text-[10px] font-semibold text-primary-700 text-center leading-tight">{{ $t('sidebar_back_top') }}</span>
          </button>
        </div>
      </div>

      <!-- 收起态 -->
      <button
        v-else
        key="collapsed"
        @click="isExpanded = true"
        class="bg-primary-600 rounded-l-3xl px-2 py-3.5 w-[40px] shadow-[-4px_4px_16px_rgba(30,64,175,0.25)] flex flex-col items-center gap-2 cursor-pointer hover:bg-primary-700 transition-colors origin-right"
        :aria-label="$t('sidebar_collapsed_label')"
      >
        <ChevronLeft class="w-4 h-4 text-white" />
        <span
          class="text-primary-200 text-[9px] font-semibold"
          style="writing-mode: vertical-rl; letter-spacing: 0.15em;"
        >
          {{ $t('sidebar_collapsed_label') }}
        </span>
        <span class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse"></span>
      </button>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Phone, MessageCircle, ArrowUp, ChevronLeft, ChevronsRight } from 'lucide-vue-next'

const isExpanded = ref(true)
const showQrCode = ref(false)

const scrollToContact = () => {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
