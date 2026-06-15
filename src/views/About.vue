<template>
  <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
      <!-- Left: About text -->
      <div>
        <p class="text-xs font-medium uppercase tracking-[0.3em] text-cyan-400/80">关于我们</p>
        <h1 class="mt-3 text-4xl font-bold text-zinc-50">专业验光，值得信赖</h1>
        <p class="mt-6 text-zinc-400 leading-8">
          {{ site.name }}位于{{ site.address }}，专注于提供专业验光、个性化配镜服务。
        </p>
        <p class="mt-4 text-zinc-400 leading-8">
          我们致力于为每一位顾客提供清晰视界与舒适体验，是您身边值得信赖的眼镜专家。
        </p>
        <ul class="mt-10 space-y-4">
          <li class="flex items-start gap-4">
            <span class="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-cyan-500 text-xs text-zinc-950 font-bold shadow-lg shadow-cyan-500/20">✓</span>
            <span class="text-zinc-300">专业验光与舒适配镜。</span>
          </li>
          <li class="flex items-start gap-4">
            <span class="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-violet-500 text-xs text-zinc-950 font-bold shadow-lg shadow-violet-500/20">✓</span>
            <span class="text-zinc-300">精选高品质镜架与镜片。</span>
          </li>
          <li class="flex items-start gap-4">
            <span class="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-xs text-zinc-950 font-bold shadow-lg shadow-amber-500/20">✓</span>
            <span class="text-zinc-300">快速服务与专业售后保障。</span>
          </li>
        </ul>
        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div class="rounded-[1.8rem] bg-slate-900/70 p-6">
            <p class="text-sm uppercase tracking-[0.3em] text-cyan-400/80">专业团队</p>
            <h3 class="mt-3 text-2xl font-semibold text-white">20+ 年配镜经验</h3>
            <p class="mt-3 text-slate-400 leading-relaxed">验光师团队经验丰富，细致检测每一个视力细节。</p>
          </div>
          <div class="rounded-[1.8rem] bg-slate-900/70 p-6">
            <p class="text-sm uppercase tracking-[0.3em] text-amber-400/80">优质服务</p>
            <h3 class="mt-3 text-2xl font-semibold text-white">贴心售后</h3>
            <p class="mt-3 text-slate-400 leading-relaxed">配镜后支持调试、维修和镜片升级，安心无忧。</p>
          </div>
        </div>
      </div>

      <!-- Right: Store info card -->
      <div class="glass-card p-8 self-start">
        <h2 class="text-2xl font-semibold text-zinc-100">门店信息</h2>
        <div class="mt-6 space-y-4 text-zinc-400">
          <div class="flex items-center gap-3">
            <span class="text-zinc-500">🏪</span>
            <span>{{ site.name }} · 本地旗舰店</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-zinc-500">📍</span>
            <span>{{ site.address }}</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-zinc-500">📞</span>
            <span class="text-cyan-400 font-medium">{{ site.phone }}</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-zinc-500">🕐</span>
            <span>周一至周日 10:00 - 20:00</span>
          </div>
        </div>
        <div class="mt-8 border-t border-white/5 pt-6">
          <p class="font-semibold text-zinc-200">服务项目</p>
          <p class="mt-2 text-zinc-500 leading-relaxed">验光配镜、镜片升级、框架维修、蓝光防护、个性定制</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { siteConfig as site } from '../config/site'
</script>
