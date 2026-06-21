<template>
  <div class="min-h-screen">
    <Header />
    <main class="pt-16">
      <Home />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Home from './views/Home.vue'
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
