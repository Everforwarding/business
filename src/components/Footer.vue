<template>
  <footer class="bg-slate-900 text-slate-200 rounded-t-2xl">
    <div class="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div class="grid gap-3 text-sm sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p class="font-semibold">{{ site.name }}</p>
          <p class="mt-1">📞 {{ site.phone }}</p>
          <p class="mt-1 text-slate-400">{{ site.address }}</p>
        </div>
        <div class="text-right text-slate-400">© 2026 {{ site.name }} 版权所有</div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { siteConfig as site } from '../config/site'
</script>
