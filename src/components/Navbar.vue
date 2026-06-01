<template>
  <header class="bg-white border-b border-slate-200 shadow-sm">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
      <div>
        <router-link to="/" class="text-xl font-bold text-slate-900">👓 {{ site.name }}</router-link>
      </div>
      <nav class="space-x-4 text-slate-700">
        <router-link to="/" class="hover:text-slate-900">首页</router-link>
        <router-link to="/products" class="hover:text-slate-900">产品</router-link>
        <router-link to="/about" class="hover:text-slate-900">关于</router-link>
        <router-link to="/contact" class="hover:text-slate-900">联系</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { siteConfig as site } from '../config/site'
</script>
