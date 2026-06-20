<template>
  <section id="qualifications" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle titleKey="qual_title" subtitleKey="qual_subtitle" />

      <h3 class="text-2xl font-semibold text-gray-900 mb-6 text-center">{{ $t('qual_certs_title') }}</h3>
      <div class="flex flex-wrap justify-center gap-4 mb-16">
        <div v-for="cert in certs" :key="cert"
             class="bg-white rounded-lg px-6 py-3 shadow-sm border border-gray-100">
          <span class="font-semibold text-primary-600">{{ cert }}</span>
        </div>
      </div>

      <h3 class="text-2xl font-semibold text-gray-900 mb-6 text-center">{{ $t('qual_labs_title') }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="lab in labs" :key="lab.nameKey"
             class="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all">
          <div class="aspect-video overflow-hidden bg-gray-200">
            <img :src="lab.image" :alt="$t(lab.nameKey)" loading="lazy"
                 class="w-full h-full object-cover" />
          </div>
          <div class="p-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-2">{{ $t(lab.nameKey) }}</h4>
            <p class="text-sm text-gray-600">{{ $t(lab.descKey) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from './SectionTitle.vue'
import emc from '../assets/images/labs/emc.png'
import chem from '../assets/images/labs/chemistry.png'
import safety from '../assets/images/labs/safety1.png'
import tuv from '../assets/images/labs/tuv.png'
import csa from '../assets/images/labs/csa.png'
import cqc from '../assets/images/labs/cqc.png'

const certs = ['CNAS', 'A2LA', 'FCC', 'CSA', 'TUV SUD', 'TUV Rheinland', 'CQC', 'CEC', 'Intertek']

const labs = [
  { nameKey: 'lab_emc', descKey: 'lab_emc_desc', image: emc },
  { nameKey: 'lab_chem', descKey: 'lab_chem_desc', image: chem },
  { nameKey: 'lab_safety', descKey: 'lab_safety_desc', image: safety },
  { nameKey: 'lab_tuv', descKey: 'lab_tuv_desc', image: tuv },
  { nameKey: 'lab_csa', descKey: 'lab_csa_desc', image: csa },
  { nameKey: 'lab_cqc', descKey: 'lab_cqc_desc', image: cqc }
]
</script>
