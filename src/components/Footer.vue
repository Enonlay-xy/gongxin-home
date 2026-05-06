<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-2xl font-bold text-primary-400 mb-4">{{ $t('company') }}</h3>
          <p class="text-gray-400 text-sm">{{ $t('company_tagline') }}</p>
        </div>
        <div>
          <h4 class="font-semibold mb-4">{{ $t('quick_links') }}</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#home" class="hover:text-white transition-colors">{{ $t('home') }}</a></li>
            <li><a href="#about" class="hover:text-white transition-colors">{{ $t('about') }}</a></li>
            <li><a href="#products" class="hover:text-white transition-colors">{{ $t('products') }}</a></li>
            <li><a href="#contact" class="hover:text-white transition-colors">{{ $t('contact') }}</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">{{ $t('contact_info') }}</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li class="flex items-center"><MapPin class="w-4 h-4 mr-2" />{{ $t('address_location') }}</li>
            <li class="flex items-center"><Phone class="w-4 h-4 mr-2" />400-888-8888</li>
            <li class="flex items-center"><Mail class="w-4 h-4 mr-2" />contact@guoxin.com</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">{{ $t('follow_us') }}</h4>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors"><Globe class="w-6 h-6" /></a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors"><Twitter class="w-6 h-6" /></a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors"><Linkedin class="w-6 h-6" /></a>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
        <p>© 2024 {{ $t('company') }}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { MapPin, Phone, Mail, Globe, Twitter, Linkedin } from 'lucide-vue-next'
</script>
