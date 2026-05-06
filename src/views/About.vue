<template>
  <section id="about" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">关于我们</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">了解国信科技的发展历程和企业文化</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div class="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl overflow-hidden flex items-center justify-center">
          <div class="text-center p-8">
            <Users class="w-24 h-24 text-primary-400 mx-auto mb-4" />
            <p class="text-gray-500">专业团队</p>
          </div>
        </div>
        <div>
          <h3 class="text-2xl font-semibold text-gray-900 mb-4">公司简介</h3>
          <p class="text-gray-600 mb-4">
            国信科技成立于2010年，是一家专注于企业信息化建设的高科技企业。
            我们致力于为客户提供专业的IT解决方案和技术服务，帮助企业实现数字化转型。
          </p>
          <p class="text-gray-600 mb-6">
            经过多年的发展，我们已经服务了数百家企业客户，涵盖金融、制造、零售、医疗等多个行业。
            我们的使命是通过技术创新，助力企业提升竞争力。
          </p>
          <div class="grid grid-cols-3 gap-4">
            <div class="text-center">
              <div class="text-3xl font-bold text-primary-600">14+</div>
              <div class="text-gray-500 text-sm">年经验</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary-600">500+</div>
              <div class="text-gray-500 text-sm">客户</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary-600">200+</div>
              <div class="text-gray-500 text-sm">团队成员</div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-16">
        <h3 class="text-2xl font-semibold text-gray-900 mb-8 text-center">发展历程</h3>
        <div class="relative">
          <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
          <div class="space-y-8">
            <div v-for="(milestone, index) in milestones" :key="milestone.year"
                 :class="['relative flex items-center', index % 2 === 0 ? 'flex-row' : 'flex-row-reverse']">
              <div :class="['w-1/2', index % 2 === 0 ? 'pr-8 text-right' : 'pl-8']">
                <div class="bg-gray-50 rounded-xl p-6">
                  <div class="text-primary-600 font-bold text-xl mb-2">{{ milestone.year }}</div>
                  <h4 class="text-gray-900 font-semibold mb-2">{{ milestone.title }}</h4>
                  <p class="text-gray-600 text-sm">{{ milestone.description }}</p>
                </div>
              </div>
              <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white"></div>
              <div class="w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 class="text-2xl font-semibold text-gray-900 mb-8 text-center">企业文化</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div v-for="value in values" :key="value.title"
               class="bg-gray-50 rounded-xl p-6 text-center">
            <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <component :is="value.icon" class="w-6 h-6 text-primary-600" />
            </div>
            <h4 class="font-semibold text-gray-900 mb-2">{{ value.title }}</h4>
            <p class="text-gray-600 text-sm">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Users, Target, Lightbulb, Heart } from 'lucide-vue-next'
import { markRaw } from 'vue'

const milestones = [
  { year: '2010', title: '公司成立', description: '国信科技在北京正式成立，开始为企业提供IT咨询服务' },
  { year: '2014', title: '业务拓展', description: '业务范围扩展至云计算和大数据领域' },
  { year: '2018', title: '快速发展', description: '服务客户突破300家，团队规模超过100人' },
  { year: '2024', title: '创新引领', description: '推出新一代智能化解决方案，助力企业数字化转型' }
]

const values = [
  { icon: markRaw(Target), title: '客户至上', description: '以客户需求为中心，提供优质服务' },
  { icon: markRaw(Lightbulb), title: '创新驱动', description: '持续创新，保持技术领先' },
  { icon: markRaw(Heart), title: '诚信为本', description: '诚实守信，赢得客户信赖' },
  { icon: markRaw(Users), title: '团队协作', description: '团结协作，共创美好未来' }
]
</script>
