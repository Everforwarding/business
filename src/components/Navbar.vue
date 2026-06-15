<template>
  <header class="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
    <div class="mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8 max-w-7xl">
      <router-link to="/" class="flex items-center gap-2.5 group">
        <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-500 text-xl shadow-lg shadow-cyan-500/20 transition group-hover:shadow-cyan-500/40 group-hover:scale-105">
          👓
        </span>
        <span class="text-base font-semibold tracking-tight text-zinc-100">{{ site.name }}</span>
      </router-link>
      <nav class="flex items-center gap-1.5 text-sm">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="relative rounded-full px-4 py-2 text-zinc-400 transition hover:text-zinc-100 hover:bg-white/5"
          active-class="!text-cyan-400 bg-cyan-500/10"
        >
          {{ link.label }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { siteConfig as site } from '../config/site'

const links = [
  { to: '/', label: '首页' },
  { to: '/products', label: '产品' },
  { to: '/about', label: '关于' },
  { to: '/contact', label: '联系' },
]
</script>
