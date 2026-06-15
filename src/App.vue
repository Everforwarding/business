<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <Navbar />
    <main class="flex-1">
      <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div class="site-container bg-white/80 shadow-lg card-smooth">
          <router-view />
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>
