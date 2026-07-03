<template>
  <div class="min-h-screen">
    <Header />
    <main class="pt-16">
      <Home />
    </main>
    <Footer />
    <FloatingSidebar />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { inject } from '@vercel/analytics'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import FloatingSidebar from './components/FloatingSidebar.vue'
import Home from './views/Home.vue'

onMounted(() => {
  inject()
})
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
html {
  scroll-behavior: smooth;
}
</style>
