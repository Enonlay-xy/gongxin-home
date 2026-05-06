<template>
  <section id="products" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ $t('products_title') }}</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">{{ $t('products_desc') }}</p>
      </div>
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button v-for="category in categories" :key="category.id"
                @click="activeCategory = category.id"
                :class="['px-6 py-2 rounded-full font-medium transition-colors',
                         activeCategory === category.id 
                           ? 'bg-primary-600 text-white' 
                           : 'bg-white text-gray-600 hover:bg-gray-100']">
          {{ $t(category.nameKey) }}
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="product in filteredProducts" :key="product.nameKey"
             class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
          <div class="aspect-video bg-gradient-to-br from-primary-50 to-primary-100 overflow-hidden flex items-center justify-center">
            <component :is="product.icon" class="w-16 h-16 text-primary-400" />
          </div>
          <div class="p-6">
            <div class="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-3">
              {{ $t(product.catKey) }}
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ $t(product.nameKey) }}</h3>
            <p class="text-gray-600 mb-4">{{ $t(product.descKey) }}</p>
            <ul class="space-y-2 text-sm text-gray-500">
              <li v-for="featureKey in product.featureKeys" :key="featureKey" class="flex items-center">
                <Check class="w-4 h-4 text-green-500 mr-2" />
                {{ $t(featureKey) }}
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
  { id: 'all', nameKey: 'all' },
  { id: 'cloud', nameKey: 'cloud_computing' },
  { id: 'security', nameKey: 'info_security_cat' },
  { id: 'data', nameKey: 'big_data_cat' }
]

const activeCategory = ref('all')

const products = [
  {
    nameKey: 'cloud_server',
    catKey: 'cloud_computing',
    categoryId: 'cloud',
    icon: markRaw(Server),
    descKey: 'cloud_server_desc',
    featureKeys: ['feature_elastic', 'feature_ha', 'feature_secure']
  },
  {
    nameKey: 'cloud_storage',
    catKey: 'cloud_computing',
    categoryId: 'cloud',
    icon: markRaw(HardDrive),
    descKey: 'cloud_storage_desc',
    featureKeys: ['feature_unlimited', 'feature_encryption', 'feature_sync']
  },
  {
    nameKey: 'network_security',
    catKey: 'info_security_cat',
    categoryId: 'security',
    icon: markRaw(ShieldCheck),
    descKey: 'network_security_desc',
    featureKeys: ['feature_monitor', 'feature_threat', 'feature_audit']
  },
  {
    nameKey: 'data_encryption',
    catKey: 'info_security_cat',
    categoryId: 'security',
    icon: markRaw(Lock),
    descKey: 'data_encryption_desc',
    featureKeys: ['feature_aes', 'feature_key', 'feature_compliance']
  },
  {
    nameKey: 'big_data_analytics',
    catKey: 'big_data_cat',
    categoryId: 'data',
    icon: markRaw(BarChart3),
    descKey: 'big_data_analytics_desc',
    featureKeys: ['feature_mining', 'feature_analysis', 'feature_viz']
  },
  {
    nameKey: 'ai_platform',
    catKey: 'big_data_cat',
    categoryId: 'data',
    icon: markRaw(Brain),
    descKey: 'ai_platform_desc',
    featureKeys: ['feature_ml', 'feature_prediction', 'feature_recommend']
  }
]

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') {
    return products
  }
  return products.filter(p => p.categoryId === activeCategory.value)
})
</script>
