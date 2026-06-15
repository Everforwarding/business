<template>
  <footer class="border-t border-white/5 bg-zinc-950">
    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div class="glass-card rounded-2xl p-5 max-w-md w-full">
          <p class="text-lg font-semibold text-zinc-100">{{ site.name }}</p>
          <p class="mt-2 text-sm text-zinc-500">专业验光与配镜服务，让您的每一天都更清晰、更舒适。</p>
          <div class="mt-3 space-y-1 text-sm text-zinc-400">
            <p>{{ site.phone }}</p>
            <p class="text-zinc-500">{{ site.address }}</p>
          </div>
        </div>
        <p class="text-sm text-zinc-600">
          &copy; 2026 {{ site.name }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { siteConfig as site } from '../config/site'
</script>
