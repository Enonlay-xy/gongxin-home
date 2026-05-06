<template>
  <section id="products" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">产品服务</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">我们提供全方位的技术解决方案</p>
      </div>
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button v-for="category in categories" :key="category.id"
                @click="activeCategory = category.id"
                :class="['px-6 py-2 rounded-full font-medium transition-colors',
                         activeCategory === category.id 
                           ? 'bg-primary-600 text-white' 
                           : 'bg-white text-gray-600 hover:bg-gray-100']">
          {{ category.name }}
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="product in filteredProducts" :key="product.name"
             class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
          <div class="aspect-video bg-gradient-to-br from-primary-50 to-primary-100 overflow-hidden flex items-center justify-center">
            <component :is="product.icon" class="w-16 h-16 text-primary-400" />
          </div>
          <div class="p-6">
            <div class="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-3">
              {{ product.category }}
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ product.name }}</h3>
            <p class="text-gray-600 mb-4">{{ product.description }}</p>
            <ul class="space-y-2 text-sm text-gray-500">
              <li v-for="feature in product.features" :key="feature" class="flex items-center">
                <Check class="w-4 h-4 text-green-500 mr-2" />
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, markRaw } from 'vue'
import { Check, Server, HardDrive, ShieldCheck, Lock, BarChart3, Brain } from 'lucide-vue-next'

const categories = [
  { id: 'all', name: '全部' },
  { id: 'cloud', name: '云计算' },
  { id: 'security', name: '信息安全' },
  { id: 'data', name: '大数据' }
]

const activeCategory = ref('all')

const products = [
  {
    name: '云服务器',
    category: '云计算',
    categoryId: 'cloud',
    icon: markRaw(Server),
    description: '弹性可扩展的云服务器，满足企业不同规模的计算需求',
    features: ['弹性伸缩', '高可用性', '安全可靠']
  },
  {
    name: '云存储',
    category: '云计算',
    categoryId: 'cloud',
    icon: markRaw(HardDrive),
    description: '安全可靠的云存储服务，随时随地访问您的数据',
    features: ['无限容量', '数据加密', '跨区域同步']
  },
  {
    name: '网络安全',
    category: '信息安全',
    categoryId: 'security',
    icon: markRaw(ShieldCheck),
    description: '全方位的网络安全解决方案，保护企业网络安全',
    features: ['实时监控', '威胁检测', '安全审计']
  },
  {
    name: '数据加密',
    category: '信息安全',
    categoryId: 'security',
    icon: markRaw(Lock),
    description: '企业级数据加密服务，确保数据安全存储和传输',
    features: ['AES加密', '密钥管理', '合规认证']
  },
  {
    name: '大数据分析',
    category: '大数据',
    categoryId: 'data',
    icon: markRaw(BarChart3),
    description: '强大的大数据分析平台，洞察业务数据价值',
    features: ['数据挖掘', '智能分析', '可视化报表']
  },
  {
    name: 'AI智能平台',
    category: '大数据',
    categoryId: 'data',
    icon: markRaw(Brain),
    description: '基于人工智能的智能分析平台，助力企业智能化升级',
    features: ['机器学习', '预测分析', '智能推荐']
  }
]

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') {
    return products
  }
  return products.filter(p => p.categoryId === activeCategory.value)
})
</script>
