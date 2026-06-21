<template>
  <div class="text-center mb-12">
    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{{ $t(titleKey) }}</h2>
    <p v-if="subtitleKey" class="text-sm text-gray-400 uppercase tracking-widest mb-4">{{ $t(subtitleKey) }}</p>
    <div class="w-16 h-1 bg-primary-500 mx-auto"></div>
  </div>
</template>

<script setup>
defineProps({
  titleKey: {
    type: String,
    required: true
  },
  subtitleKey: {
    type: String,
    default: ''
  }
})
</script>
