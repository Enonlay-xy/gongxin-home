<template>
  <section id="cases" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle titleKey="case_title" subtitleKey="case_subtitle" />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div v-for="(c, i) in cases" :key="i"
             class="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
          <div class="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-4">
            {{ $t(c.typeKey) }}
          </div>
          <dl class="space-y-3 text-sm">
            <div>
              <dt class="text-gray-500">{{ $t('case_need_label') }}</dt>
              <dd class="text-gray-900 font-medium">{{ $t(c.needKey) }}</dd>
            </div>
            <div>
              <dt class="text-gray-500">{{ $t('case_service_label') }}</dt>
              <dd class="text-gray-900 font-medium">{{ $t(c.serviceKey) }}</dd>
            </div>
            <div>
              <dt class="text-gray-500">{{ $t('case_result_label') }}</dt>
              <dd class="text-primary-600 font-semibold">{{ $t(c.resultKey) }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <blockquote class="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-lg">
          <p class="text-gray-700 italic mb-3">"{{ $t('case_quote_1') }}"</p>
          <footer class="text-sm text-gray-500">{{ $t('case_quote_1_from') }}</footer>
        </blockquote>
        <blockquote class="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-lg">
          <p class="text-gray-700 italic mb-3">"{{ $t('case_quote_2') }}"</p>
          <footer class="text-sm text-gray-500">{{ $t('case_quote_2_from') }}</footer>
        </blockquote>
      </div>

      <div class="text-center">
        <button class="px-8 py-3 border-2 border-primary-500 text-primary-500 font-semibold rounded-lg hover:bg-primary-50 transition-colors">
          {{ $t('case_more_btn') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from './SectionTitle.vue'

const cases = [
  { typeKey: 'case_1_type', needKey: 'case_1_need', serviceKey: 'case_1_service', resultKey: 'case_1_result' },
  { typeKey: 'case_2_type', needKey: 'case_2_need', serviceKey: 'case_2_service', resultKey: 'case_2_result' },
  { typeKey: 'case_3_type', needKey: 'case_3_need', serviceKey: 'case_3_service', resultKey: 'case_3_result' },
  { typeKey: 'case_4_type', needKey: 'case_4_need', serviceKey: 'case_4_service', resultKey: 'case_4_result' }
]
</script>
