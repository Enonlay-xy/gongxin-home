<template>
  <section id="process" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle titleKey="process_title" subtitleKey="process_subtitle" />
      <ol class="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
        <li v-for="(step, i) in steps" :key="i" class="relative text-center">
          <div class="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center mx-auto mb-4 font-bold">
            {{ String(i + 1).padStart(2, '0') }}
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t(step.titleKey) }}</h3>
          <p class="text-sm text-gray-600">{{ $t(step.descKey) }}</p>
          <div v-if="i < steps.length - 1"
               class="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gray-200"></div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from './SectionTitle.vue'

const steps = [
  { titleKey: 'process_1_title', descKey: 'process_1_desc' },
  { titleKey: 'process_2_title', descKey: 'process_2_desc' },
  { titleKey: 'process_3_title', descKey: 'process_3_desc' },
  { titleKey: 'process_4_title', descKey: 'process_4_desc' },
  { titleKey: 'process_5_title', descKey: 'process_5_desc' }
]
</script>
