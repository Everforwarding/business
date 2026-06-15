<template>
  <header class="bg-white/85 backdrop-blur-sm border-b border-slate-200 shadow-sm rounded-b-2xl">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
      <div>
        <router-link to="/" class="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span class="text-2xl">👓</span>
          <span>{{ site.name }}</span>
        </router-link>
      </div>
      <nav class="space-x-6 text-slate-700 flex items-center">
        <router-link to="/" class="hover:text-slate-900 transition-transform duration-200 hover:-translate-y-0.5">首页</router-link>
        <router-link to="/products" class="hover:text-slate-900 transition-transform duration-200 hover:-translate-y-0.5">产品</router-link>
        <router-link to="/about" class="hover:text-slate-900 transition-transform duration-200 hover:-translate-y-0.5">关于</router-link>
        <router-link to="/contact" class="hover:text-slate-900 transition-transform duration-200 hover:-translate-y-0.5">联系</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { siteConfig as site } from '../config/site'
</script>
