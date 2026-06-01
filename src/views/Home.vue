<template>
  <section class="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
    <div class="mx-auto max-w-6xl px-4 py-20 sm:px-6 text-center">
      <p class="text-sm uppercase tracking-[0.35em] text-slate-300">{{ site.slogan }}</p>
      <h1 class="mt-6 text-4xl font-semibold sm:text-5xl">欢迎来到 {{ site.name }}</h1>
      <p class="mx-auto mt-6 max-w-2xl text-slate-200 sm:text-lg">
        资深验光师团队，快速配镜方案，专业服务让您自信看见更清晰的世界。
      </p>
      <div class="mt-12 grid gap-4 sm:grid-cols-3">
        <div class="rounded-3xl border border-white/20 bg-white/10 p-8 text-left shadow-xl backdrop-blur-xl">
          <p class="text-3xl">👁</p>
          <h2 class="mt-4 text-xl font-semibold">专业验光</h2>
          <p class="mt-2 text-slate-200">个性化验光方案，守护视力健康。</p>
        </div>
        <div class="rounded-3xl border border-white/20 bg-white/10 p-8 text-left shadow-xl backdrop-blur-xl">
          <p class="text-3xl">⚡</p>
          <h2 class="mt-4 text-xl font-semibold">快速配镜</h2>
          <p class="mt-2 text-slate-200">高效取镜服务，体验更顺畅。</p>
        </div>
        <div class="rounded-3xl border border-white/20 bg-white/10 p-8 text-left shadow-xl backdrop-blur-xl">
          <p class="text-3xl">💎</p>
          <h2 class="mt-4 text-xl font-semibold">品质保证</h2>
          <p class="mt-2 text-slate-200">精选镜片与镜架，耐用时尚兼顾。</p>
        </div>
      </div>
      <div class="mt-12 rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-xl">
        <h2 class="text-2xl font-semibold">🔥 热卖推荐</h2>
        <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div class="rounded-3xl bg-slate-900/80 p-6">
            <h3 class="text-xl font-semibold">时尚黑框</h3>
            <p class="mt-3 text-slate-300">经典复古，通勤首选。</p>
            <p class="mt-6 text-3xl font-bold">¥199</p>
          </div>
          <div class="rounded-3xl bg-slate-900/80 p-6">
            <h3 class="text-xl font-semibold">防蓝光眼镜</h3>
            <p class="mt-3 text-slate-300">屏幕前办公更舒适。</p>
            <p class="mt-6 text-3xl font-bold">¥299</p>
          </div>
          <div class="rounded-3xl bg-slate-900/80 p-6">
            <h3 class="text-xl font-semibold">流行渐变片</h3>
            <p class="mt-3 text-slate-300">潮流时尚，百搭造型。</p>
            <p class="mt-6 text-3xl font-bold">¥259</p>
          </div>
        </div>
      </div>
      <div class="mt-10 rounded-3xl bg-white/10 p-8 shadow-xl">
        <p class="text-lg text-slate-100">📞 立即预约：{{ site.phone }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { siteConfig as site } from '../config/site'
</script>
