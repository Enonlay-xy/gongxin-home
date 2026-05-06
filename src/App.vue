<template>
  <div class="min-h-screen">
    <Header />
    <main>
      <Home />
      <About />
      <Products />
      <Contact />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Products from './views/Products.vue'
import Contact from './views/Contact.vue'
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
