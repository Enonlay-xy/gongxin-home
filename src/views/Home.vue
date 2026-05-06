<template>
  <section id="home">
    <Hero />
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ $t('core_business') }}</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">{{ $t('core_business_desc') }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="service in services" :key="service.titleKey"
               class="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
              <component :is="service.icon" class="w-8 h-8 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ $t(service.titleKey) }}</h3>
            <p class="text-gray-600">{{ $t(service.descKey) }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{{ $t('why_choose_us') }}</h2>
            <ul class="space-y-4">
              <li v-for="feature in features" :key="feature.titleKey" class="flex">
                <div class="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check class="w-4 h-4 text-white" />
                </div>
                <div class="ml-4">
                  <h4 class="font-semibold text-gray-900">{{ $t(feature.titleKey) }}</h4>
                  <p class="text-gray-600 text-sm">{{ $t(feature.descKey) }}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="relative">
            <div class="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl overflow-hidden flex items-center justify-center">
              <div class="text-center p-8">
                <Building2 class="w-24 h-24 text-primary-400 mx-auto mb-4" />
                <p class="text-gray-500">{{ $t('modern_office') }}</p>
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
  { icon: markRaw(Cloud), titleKey: 'cloud_service', descKey: 'cloud_service_desc' },
  { icon: markRaw(Shield), titleKey: 'info_security', descKey: 'info_security_desc' },
  { icon: markRaw(Zap), titleKey: 'big_data', descKey: 'big_data_desc' }
]

const features = [
  { titleKey: 'professional_team', descKey: 'professional_team_desc' },
  { titleKey: 'innovative_tech', descKey: 'innovative_tech_desc' },
  { titleKey: 'quality_service', descKey: 'quality_service_desc' },
  { titleKey: 'customer_first', descKey: 'customer_first_desc' }
]
</script>
