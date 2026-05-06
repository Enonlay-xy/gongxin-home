<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-2xl font-bold text-primary-400 mb-4">国信科技</h3>
          <p class="text-gray-400 text-sm">专注于科技创新，为客户提供优质的产品和服务。</p>
        </div>
        <div>
          <h4 class="font-semibold mb-4">快速链接</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#home" class="hover:text-white transition-colors">首页</a></li>
            <li><a href="#about" class="hover:text-white transition-colors">关于我们</a></li>
            <li><a href="#products" class="hover:text-white transition-colors">产品服务</a></li>
            <li><a href="#contact" class="hover:text-white transition-colors">联系我们</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">联系方式</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li class="flex items-center"><MapPin class="w-4 h-4 mr-2" />北京市朝阳区科技园区</li>
            <li class="flex items-center"><Phone class="w-4 h-4 mr-2" />400-888-8888</li>
            <li class="flex items-center"><Mail class="w-4 h-4 mr-2" />contact@guoxin.com</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">关注我们</h4>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors"><Globe class="w-6 h-6" /></a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors"><Twitter class="w-6 h-6" /></a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors"><Linkedin class="w-6 h-6" /></a>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
        <p>© 2024 国信科技. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { MapPin, Phone, Mail, Globe, Twitter, Linkedin } from 'lucide-vue-next'
</script>
