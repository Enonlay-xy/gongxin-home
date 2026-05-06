<template>
  <section id="about" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ $t('about_us') }}</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">{{ $t('about_us_desc') }}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div class="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl overflow-hidden flex items-center justify-center">
          <div class="text-center p-8">
            <Users class="w-24 h-24 text-primary-400 mx-auto mb-4" />
            <p class="text-gray-500">{{ $t('professional_team') }}</p>
          </div>
        </div>
        <div>
          <h3 class="text-2xl font-semibold text-gray-900 mb-4">{{ $t('company_intro') }}</h3>
          <p class="text-gray-600 mb-4">{{ $t('company_intro_text1') }}</p>
          <p class="text-gray-600 mb-6">{{ $t('company_intro_text2') }}</p>
          <div class="grid grid-cols-3 gap-4">
            <div class="text-center">
              <div class="text-3xl font-bold text-primary-600">14+</div>
              <div class="text-gray-500 text-sm">{{ $t('years_experience') }}</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary-600">500+</div>
              <div class="text-gray-500 text-sm">{{ $t('clients') }}</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary-600">200+</div>
              <div class="text-gray-500 text-sm">{{ $t('team_members') }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-16">
        <h3 class="text-2xl font-semibold text-gray-900 mb-8 text-center">{{ $t('milestones') }}</h3>
        <div class="relative">
          <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
          <div class="space-y-8">
            <div v-for="(milestone, index) in milestones" :key="milestone.year"
                 :class="['relative flex items-center', index % 2 === 0 ? 'flex-row' : 'flex-row-reverse']">
              <div :class="['w-1/2', index % 2 === 0 ? 'pr-8 text-right' : 'pl-8']">
                <div class="bg-gray-50 rounded-xl p-6">
                  <div class="text-primary-600 font-bold text-xl mb-2">{{ milestone.year }}</div>
                  <h4 class="text-gray-900 font-semibold mb-2">{{ $t(milestone.titleKey) }}</h4>
                  <p class="text-gray-600 text-sm">{{ $t(milestone.descKey) }}</p>
                </div>
              </div>
              <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white"></div>
              <div class="w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 class="text-2xl font-semibold text-gray-900 mb-8 text-center">{{ $t('corporate_culture') }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div v-for="value in values" :key="value.titleKey"
               class="bg-gray-50 rounded-xl p-6 text-center">
            <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <component :is="value.icon" class="w-6 h-6 text-primary-600" />
            </div>
            <h4 class="font-semibold text-gray-900 mb-2">{{ $t(value.titleKey) }}</h4>
            <p class="text-gray-600 text-sm">{{ $t(value.descKey) }}</p>
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
  { year: '2010', titleKey: 'milestone_2010_title', descKey: 'milestone_2010_desc' },
  { year: '2014', titleKey: 'milestone_2014_title', descKey: 'milestone_2014_desc' },
  { year: '2018', titleKey: 'milestone_2018_title', descKey: 'milestone_2018_desc' },
  { year: '2024', titleKey: 'milestone_2024_title', descKey: 'milestone_2024_desc' }
]

const values = [
  { icon: markRaw(Target), titleKey: 'culture_customer_first', descKey: 'culture_customer_first_desc' },
  { icon: markRaw(Lightbulb), titleKey: 'culture_innovation', descKey: 'culture_innovation_desc' },
  { icon: markRaw(Heart), titleKey: 'culture_integrity', descKey: 'culture_integrity_desc' },
  { icon: markRaw(Users), titleKey: 'culture_teamwork', descKey: 'culture_teamwork_desc' }
]
</script>
