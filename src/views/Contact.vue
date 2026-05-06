<template>
  <section id="contact" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ $t('contact_us') }}</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">{{ $t('contact_desc') }}</p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 class="text-2xl font-semibold text-gray-900 mb-6">{{ $t('contact_info') }}</h3>
          <div class="space-y-6">
            <div class="flex items-start">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin class="w-6 h-6 text-primary-600" />
              </div>
              <div class="ml-4">
                <h4 class="font-semibold text-gray-900">{{ $t('company_address') }}</h4>
                <p class="text-gray-600">{{ $t('address_text') }}</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone class="w-6 h-6 text-primary-600" />
              </div>
              <div class="ml-4">
                <h4 class="font-semibold text-gray-900">{{ $t('contact_phone') }}</h4>
                <p class="text-gray-600">400-888-8888</p>
                <p class="text-gray-600">010-88888888</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail class="w-6 h-6 text-primary-600" />
              </div>
              <div class="ml-4">
                <h4 class="font-semibold text-gray-900">{{ $t('email_label') }}</h4>
                <p class="text-gray-600">contact@guoxin.com</p>
                <p class="text-gray-600">support@guoxin.com</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock class="w-6 h-6 text-primary-600" />
              </div>
              <div class="ml-4">
                <h4 class="font-semibold text-gray-900">{{ $t('working_hours') }}</h4>
                <p class="text-gray-600">{{ $t('working_hours_text') }}</p>
                <p class="text-gray-600">{{ $t('holiday_text') }}</p>
              </div>
            </div>
          </div>
          <div class="mt-8 aspect-video bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl overflow-hidden flex items-center justify-center">
            <div class="text-center p-8">
              <Building2 class="w-20 h-20 text-primary-400 mx-auto mb-4" />
              <p class="text-gray-500">{{ $t('address_location') }}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-2xl font-semibold text-gray-900 mb-6">{{ $t('send_message') }}</h3>
          <form @submit.prevent="handleSubmit" class="bg-gray-50 rounded-xl p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('name') }}</label>
                <input v-model="form.name" type="text" required
                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                       :placeholder="$t('name_placeholder')" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('phone') }}</label>
                <input v-model="form.phone" type="tel" required
                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                       :placeholder="$t('phone_placeholder')" />
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('email') }}</label>
              <input v-model="form.email" type="email" required
                     class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                     :placeholder="$t('email_placeholder')" />
            </div>
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('message') }}</label>
              <textarea v-model="form.message" rows="4" required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        :placeholder="$t('message_placeholder')"></textarea>
            </div>
            <button type="submit" 
                    class="w-full bg-primary-600 text-white font-semibold py-3 rounded-lg hover:bg-primary-700 transition-colors">
              {{ $t('submit') }}
            </button>
            <p v-if="submitted" class="mt-4 text-green-600 text-center">{{ $t('submit_success') }}</p>
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
  console.log('Form submitted:', form)
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
