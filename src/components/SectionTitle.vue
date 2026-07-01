<template>
  <div class="text-center mb-12">
    <h2 class="text-3xl md:text-4xl font-bold mb-2" :class="titleClass">{{ $t(titleKey) }}</h2>
    <p v-if="subtitleKey" class="text-sm uppercase tracking-widest mb-4" :class="subtitleClass">{{ $t(subtitleKey) }}</p>
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
  },
  titleClass: {
    type: String,
    default: 'text-gray-900'
  },
  subtitleClass: {
    type: String,
    default: 'text-gray-400'
  }
})
</script>
