<template>
  <section id="strengths" class="py-20 bg-primary-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle titleKey="strengths_title" subtitleKey="strengths_subtitle" titleClass="text-white" subtitleClass="text-primary-100" />
      <div class="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
        <div v-for="item in strengths" :key="item.valueKey"
             class="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
          <div class="text-4xl font-bold text-accent mb-2">{{ $t(item.valueKey) }}</div>
          <div class="text-sm text-primary-100">{{ $t(item.labelKey) }}</div>
        </div>
      </div>
      <p class="text-center text-primary-100 text-sm md:text-base max-w-4xl mx-auto">
        {{ $t('strengths_tagline') }}
      </p>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from './SectionTitle.vue'

const strengths = [
  { valueKey: 'strengths_intl_auth_value', labelKey: 'strengths_intl_auth' },
  { valueKey: 'strengths_cert_projects_value', labelKey: 'strengths_cert_projects' },
  { valueKey: 'strengths_categories_value', labelKey: 'strengths_categories' },
  { valueKey: 'strengths_honors_value', labelKey: 'strengths_honors' },
  { valueKey: 'strengths_clients_value', labelKey: 'strengths_clients' }
]
</script>
