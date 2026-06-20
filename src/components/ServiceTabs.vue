<template>
  <section id="products" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle titleKey="products_title" subtitleKey="products_subtitle" />

      <div class="flex justify-center mb-12" role="tablist">
        <div class="inline-flex border-b border-gray-200 overflow-x-auto">
          <button v-for="tab in tabs" :key="tab.key"
                  role="tab"
                  :aria-selected="activeTab === tab.key"
                  @click="activeTab = tab.key"
                  :class="['px-6 py-3 font-medium transition-colors whitespace-nowrap border-b-2 -mb-px',
                           activeTab === tab.key
                             ? 'border-primary-500 text-primary-600'
                             : 'border-transparent text-gray-500 hover:text-gray-700']">
            {{ $t(tab.labelKey) }}
          </button>
        </div>
      </div>

      <transition name="fade" mode="out-in">
        <div :key="activeTab" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="item in currentItems" :key="item.nameKey"
               class="bg-gray-50 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <component :is="item.icon" class="w-6 h-6 text-primary-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t(item.nameKey) }}</h3>
            <p class="text-sm text-gray-600">{{ $t(item.descKey) }}</p>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, markRaw } from 'vue'
import { Award, BadgeCheck, Globe, Shield, Radio, FlaskConical, Cpu, Zap, Cog, Lightbulb } from 'lucide-vue-next'
import SectionTitle from './SectionTitle.vue'

const tabs = [
  { key: 'international', labelKey: 'service_tab_international' },
  { key: 'domestic', labelKey: 'service_tab_domestic' },
  { key: 'testing', labelKey: 'service_tab_testing' }
]

const activeTab = ref('international')

const allItems = {
  international: [
    { nameKey: 'cert_ce', descKey: 'cert_ce_desc', icon: markRaw(Award) },
    { nameKey: 'cert_fcc', descKey: 'cert_fcc_desc', icon: markRaw(Radio) },
    { nameKey: 'cert_cb', descKey: 'cert_cb_desc', icon: markRaw(Globe) },
    { nameKey: 'cert_ul', descKey: 'cert_ul_desc', icon: markRaw(Shield) },
    { nameKey: 'cert_etl', descKey: 'cert_etl_desc', icon: markRaw(Shield) },
    { nameKey: 'cert_csa', descKey: 'cert_csa_desc', icon: markRaw(BadgeCheck) },
    { nameKey: 'cert_saa', descKey: 'cert_saa_desc', icon: markRaw(BadgeCheck) },
    { nameKey: 'cert_gs', descKey: 'cert_gs_desc', icon: markRaw(Award) },
    { nameKey: 'cert_pse', descKey: 'cert_pse_desc', icon: markRaw(BadgeCheck) },
    { nameKey: 'cert_tuv', descKey: 'cert_tuv_desc', icon: markRaw(Award) },
    { nameKey: 'cert_cec', descKey: 'cert_cec_desc', icon: markRaw(Zap) },
    { nameKey: 'cert_ukca', descKey: 'cert_ukca_desc', icon: markRaw(BadgeCheck) }
  ],
  domestic: [
    { nameKey: 'cert_ccc', descKey: 'cert_ccc_desc', icon: markRaw(Shield) },
    { nameKey: 'cert_cqc', descKey: 'cert_cqc_desc', icon: markRaw(BadgeCheck) }
  ],
  testing: [
    { nameKey: 'test_emc', descKey: 'test_emc_desc', icon: markRaw(Radio) },
    { nameKey: 'test_lvd', descKey: 'test_lvd_desc', icon: markRaw(Shield) },
    { nameKey: 'test_rf', descKey: 'test_rf_desc', icon: markRaw(Radio) },
    { nameKey: 'test_rohs', descKey: 'test_rohs_desc', icon: markRaw(FlaskConical) },
    { nameKey: 'test_mech', descKey: 'test_mech_desc', icon: markRaw(Cog) },
    { nameKey: 'test_light', descKey: 'test_light_desc', icon: markRaw(Lightbulb) }
  ]
}

const currentItems = computed(() => allItems[activeTab.value] || [])
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
