<template>
  <section id="fields" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle titleKey="field_title" subtitleKey="field_subtitle" />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="(field, i) in fields" :key="i"
             class="group relative bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all">
          <div class="aspect-video overflow-hidden bg-gray-200">
            <img v-if="field.image" :src="field.image" :alt="$t(field.nameKey)"
                 :loading="i > 3 ? 'lazy' : 'eager'"
                 class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div v-else class="w-full h-full flex items-center justify-center bg-primary-100">
              <component :is="field.icon" class="w-16 h-16 text-primary-400" />
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t(field.nameKey) }}</h3>
            <p class="text-sm text-gray-600">{{ $t(field.descKey) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { markRaw } from 'vue'
import { Cpu, Video, Battery, Cog, Lightbulb, ToyBrick, Building2, BatteryCharging } from 'lucide-vue-next'
import SectionTitle from './SectionTitle.vue'
import field1 from '../assets/images/fields/field1.jpg'
import field2 from '../assets/images/fields/field2.jpg'
import field3 from '../assets/images/fields/field3.jpg'
import field4 from '../assets/images/fields/field4.jpg'
import field5 from '../assets/images/fields/field5.jpg'
import field6 from '../assets/images/fields/field6.jpg'
import field7 from '../assets/images/fields/field7.jpg'
import field8 from '../assets/images/fields/field8.jpg'

const fields = [
  { nameKey: 'field_1_name', descKey: 'field_1_desc', image: field1, icon: markRaw(Cpu) },
  { nameKey: 'field_2_name', descKey: 'field_2_desc', image: field2, icon: markRaw(Video) },
  { nameKey: 'field_3_name', descKey: 'field_3_desc', image: field3, icon: markRaw(Battery) },
  { nameKey: 'field_4_name', descKey: 'field_4_desc', image: field4, icon: markRaw(Cog) },
  { nameKey: 'field_5_name', descKey: 'field_5_desc', image: field5, icon: markRaw(Lightbulb) },
  { nameKey: 'field_6_name', descKey: 'field_6_desc', image: field6, icon: markRaw(ToyBrick) },
  { nameKey: 'field_7_name', descKey: 'field_7_desc', image: field7, icon: markRaw(Building2) },
  { nameKey: 'field_8_name', descKey: 'field_8_desc', image: field8, icon: markRaw(BatteryCharging) }
]
</script>
