<template>
  <section id="home">
    <Hero />
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">核心业务</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">我们专注于为企业提供全方位的技术服务</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="service in services" :key="service.title"
               class="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
              <component :is="service.icon" class="w-8 h-8 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ service.title }}</h3>
            <p class="text-gray-600">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">为什么选择我们</h2>
            <ul class="space-y-4">
              <li v-for="feature in features" :key="feature.title" class="flex">
                <div class="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check class="w-4 h-4 text-white" />
                </div>
                <div class="ml-4">
                  <h4 class="font-semibold text-gray-900">{{ feature.title }}</h4>
                  <p class="text-gray-600 text-sm">{{ feature.description }}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="relative">
            <div class="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl overflow-hidden flex items-center justify-center">
              <div class="text-center p-8">
                <Building2 class="w-24 h-24 text-primary-400 mx-auto mb-4" />
                <p class="text-gray-500">现代化办公环境</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import Hero from '../components/Hero.vue'
import { Cloud, Shield, Zap, Check, Building2 } from 'lucide-vue-next'
import { markRaw } from 'vue'

const services = [
  {
    icon: markRaw(Cloud),
    title: '云计算服务',
    description: '提供稳定可靠的云计算基础设施，助力企业数字化转型。'
  },
  {
    icon: markRaw(Shield),
    title: '信息安全',
    description: '全方位的安全解决方案，保护企业数据安全。'
  },
  {
    icon: markRaw(Zap),
    title: '大数据分析',
    description: '利用大数据技术帮助企业洞察市场趋势。'
  }
]

const features = [
  {
    title: '专业团队',
    description: '拥有资深技术团队，提供专业的技术支持'
  },
  {
    title: '创新技术',
    description: '持续创新，保持技术领先优势'
  },
  {
    title: '优质服务',
    description: '7x24小时全天候服务，及时响应客户需求'
  },
  {
    title: '客户至上',
    description: '以客户需求为导向，提供定制化解决方案'
  }
]
</script>
