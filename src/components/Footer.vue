<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-bold text-primary-400 mb-2">{{ $t('footer_company') }}</h3>
          <p class="text-gray-400 text-sm">{{ $t('footer_company_en') }}</p>
        </div>
        <div>
          <h4 class="font-semibold mb-4">{{ $t('footer_quick_links') }}</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><a href="#home" class="hover:text-white transition-colors">{{ $t('nav_home') }}</a></li>
            <li><a href="#about" class="hover:text-white transition-colors">{{ $t('nav_about') }}</a></li>
            <li><a href="#products" class="hover:text-white transition-colors">{{ $t('nav_products') }}</a></li>
            <li><a href="#qualifications" class="hover:text-white transition-colors">{{ $t('nav_qualifications') }}</a></li>
            <li><a href="#contact" class="hover:text-white transition-colors">{{ $t('nav_contact') }}</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">{{ $t('footer_contact') }}</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li class="flex items-center"><Phone class="w-4 h-4 mr-2" />{{ $t('phone_number') }}</li>
            <li class="flex items-center"><Mail class="w-4 h-4 mr-2" />{{ $t('email_value') }}</li>
            <li class="flex items-center"><Globe class="w-4 h-4 mr-2" />{{ $t('website_value') }}</li>
            <li class="flex items-start"><MapPin class="w-4 h-4 mr-2 mt-1" />{{ $t('address_value') }}</li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
        <p>{{ $t('footer_copyright') }}</p>
        <p class="mt-1">{{ $t('footer_icp') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Phone, Mail, Globe, MapPin } from 'lucide-vue-next'
</script>
