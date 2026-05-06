<template>
  <section class="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-24">
    <div class="absolute inset-0 bg-opacity-10">
      <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.03&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">{{ $t('hero_title') }}</h1>
        <p class="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          {{ $t('hero_desc') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#products" class="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            {{ $t('learn_more') }}
          </a>
          <a href="#contact" class="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-700 transition-colors">
            {{ $t('contact_us_btn') }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
