<template>
  <section class="relative overflow-hidden">
    <!-- Hero -->
    <div class="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pt-24">
      <div class="text-center stagger-children">
        <p class="text-xs font-medium uppercase tracking-[0.3em] text-cyan-400/80">{{ site.slogan }}</p>
        <h1 class="mt-6 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
          欢迎来到<br class="sm:hidden" /> {{ site.name }}
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 leading-relaxed">
          资深验光师团队，快速配镜方案，专业服务让您自信看见更清晰的世界。
        </p>
      </div>

      <!-- Feature Cards -->
      <div class="mt-16 grid gap-5 sm:grid-cols-3 stagger-children">
        <div class="glass-card group p-8 cursor-default border-l-[3px] border-l-cyan-400/60">
          <div class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-2xl ring-1 ring-cyan-500/20">
            👁
          </div>
          <h2 class="mt-5 text-lg font-semibold text-zinc-100">专业验光</h2>
          <p class="mt-2 text-sm text-zinc-500 leading-relaxed">个性化验光方案，守护视力健康。</p>
        </div>
        <div class="glass-card group p-8 cursor-default border-l-[3px] border-l-violet-400/60">
          <div class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-2xl ring-1 ring-violet-500/20">
            ⚡
          </div>
          <h2 class="mt-5 text-lg font-semibold text-zinc-100">快速配镜</h2>
          <p class="mt-2 text-sm text-zinc-500 leading-relaxed">高效取镜服务，体验更顺畅。</p>
        </div>
        <div class="glass-card group p-8 cursor-default border-l-[3px] border-l-amber-400/60">
          <div class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-2xl ring-1 ring-amber-500/20">
            💎
          </div>
          <h2 class="mt-5 text-lg font-semibold text-zinc-100">品质保证</h2>
          <p class="mt-2 text-sm text-zinc-500 leading-relaxed">精选镜片与镜架，耐用时尚兼顾。</p>
        </div>
      </div>

      <!-- Product Previews -->
      <div class="mt-16 stagger-children">
        <p class="text-center text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">热门推荐</p>
        <div class="mt-8 grid gap-5 sm:grid-cols-3">
          <div class="glow-card group p-7 text-center cursor-default">
            <h3 class="text-xl font-semibold text-zinc-100">时尚黑框</h3>
            <p class="mt-2 text-sm text-zinc-500">经典复古，通勤首选。</p>
            <p class="mt-5 text-3xl font-bold text-cyan-400">¥199</p>
          </div>
          <div class="glow-card group p-7 text-center cursor-default">
            <h3 class="text-xl font-semibold text-zinc-100">防蓝光眼镜</h3>
            <p class="mt-2 text-sm text-zinc-500">屏幕前办公更舒适。</p>
            <p class="mt-5 text-3xl font-bold text-violet-400">¥299</p>
          </div>
          <div class="glow-card group p-7 text-center cursor-default">
            <h3 class="text-xl font-semibold text-zinc-100">流行渐变片</h3>
            <p class="mt-2 text-sm text-zinc-500">潮流时尚，百搭造型。</p>
            <p class="mt-5 text-3xl font-bold text-amber-400">¥259</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-16 text-center stagger-children">
        <div class="glass-card mx-auto inline-block rounded-2xl px-8 py-5">
          <p class="text-zinc-400">
            立即预约 <span class="font-semibold text-cyan-400">{{ site.phone }}</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { siteConfig as site } from '../config/site'
</script>
