<template>
  <section id="contact" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">联系我们</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">如有任何问题或需求，请随时联系我们</p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 class="text-2xl font-semibold text-gray-900 mb-6">联系方式</h3>
          <div class="space-y-6">
            <div class="flex items-start">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin class="w-6 h-6 text-primary-600" />
              </div>
              <div class="ml-4">
                <h4 class="font-semibold text-gray-900">公司地址</h4>
                <p class="text-gray-600">北京市朝阳区科技园区创新大厦A座18层</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone class="w-6 h-6 text-primary-600" />
              </div>
              <div class="ml-4">
                <h4 class="font-semibold text-gray-900">联系电话</h4>
                <p class="text-gray-600">400-888-8888</p>
                <p class="text-gray-600">010-88888888</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail class="w-6 h-6 text-primary-600" />
              </div>
              <div class="ml-4">
                <h4 class="font-semibold text-gray-900">电子邮箱</h4>
                <p class="text-gray-600">contact@guoxin.com</p>
                <p class="text-gray-600">support@guoxin.com</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock class="w-6 h-6 text-primary-600" />
              </div>
              <div class="ml-4">
                <h4 class="font-semibold text-gray-900">工作时间</h4>
                <p class="text-gray-600">周一至周五：9:00 - 18:00</p>
                <p class="text-gray-600">节假日：休息</p>
              </div>
            </div>
          </div>
          <div class="mt-8 aspect-video bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl overflow-hidden flex items-center justify-center">
            <div class="text-center p-8">
              <Building2 class="w-20 h-20 text-primary-400 mx-auto mb-4" />
              <p class="text-gray-500">北京市朝阳区科技园区</p>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-2xl font-semibold text-gray-900 mb-6">发送留言</h3>
          <form @submit.prevent="handleSubmit" class="bg-gray-50 rounded-xl p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                <input v-model="form.name" type="text" required
                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                       placeholder="请输入您的姓名" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">电话</label>
                <input v-model="form.phone" type="tel" required
                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                       placeholder="请输入您的电话" />
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
              <input v-model="form.email" type="email" required
                     class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                     placeholder="请输入您的邮箱" />
            </div>
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-1">留言内容</label>
              <textarea v-model="form.message" rows="4" required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="请输入您的留言内容"></textarea>
            </div>
            <button type="submit" 
                    class="w-full bg-primary-600 text-white font-semibold py-3 rounded-lg hover:bg-primary-700 transition-colors">
              发送留言
            </button>
            <p v-if="submitted" class="mt-4 text-green-600 text-center">感谢您的留言，我们会尽快与您联系！</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { MapPin, Phone, Mail, Clock, Building2 } from 'lucide-vue-next'

const form = reactive({
  name: '',
  phone: '',
  email: '',
  message: ''
})

const submitted = ref(false)

const handleSubmit = () => {
  console.log('表单提交:', form)
  submitted.value = true
  form.name = ''
  form.phone = ''
  form.email = ''
  form.message = ''
  setTimeout(() => {
    submitted.value = false
  }, 3000)
}
</script>
