<template>
  <section id="home">
    <BannerCarousel />

    <section id="about" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle titleKey="about_title" subtitleKey="about_subtitle" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="aspect-video rounded-xl overflow-hidden">
            <img src="../assets/images/banner/banner1.jpg" :alt="$t('about_title')"
                 class="w-full h-full object-cover" />
          </div>
          <div>
            <p class="text-gray-600 mb-4 leading-relaxed">{{ $t('about_desc_1') }}</p>
            <p class="text-gray-600 mb-6 leading-relaxed">{{ $t('about_desc_2') }}</p>
            <a href="#contact" class="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors">
              {{ $t('about_btn') }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <CoreStrengths />
    <ServiceTabs />
    <ServiceFields />
    <ServiceProcess />
    <Qualifications />
    <TypicalCases />
    <ContactCTA />
  </section>
</template>

<script setup>
import BannerCarousel from '../components/BannerCarousel.vue'
import SectionTitle from '../components/SectionTitle.vue'
import CoreStrengths from '../components/CoreStrengths.vue'
import ServiceTabs from '../components/ServiceTabs.vue'
import ServiceFields from '../components/ServiceFields.vue'
import ServiceProcess from '../components/ServiceProcess.vue'
import Qualifications from '../components/Qualifications.vue'
import TypicalCases from '../components/TypicalCases.vue'
import ContactCTA from '../components/ContactCTA.vue'
</script>
