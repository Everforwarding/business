<template>
  <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
    <div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">关于我们</h1>
        <p class="mt-4 text-slate-600 leading-8">
          {{ site.name }}位于{{ site.address }}，专注于提供专业验光、个性化配镜服务。
        </p>
        <p class="mt-4 text-slate-600 leading-8">
          我们致力于为每一位顾客提供清晰视界与舒适体验，是您身边值得信赖的眼镜专家。
        </p>
        <ul class="mt-8 space-y-4 text-slate-700">
          <li class="flex items-start gap-3">
            <span class="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">✓</span>
            <span>专业验光与舒适配镜。</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">✓</span>
            <span>精选高品质镜架与镜片。</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">✓</span>
            <span>快速服务与专业售后保障。</span>
          </li>
        </ul>
      </div>
      <div class="rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
        <h2 class="text-2xl font-semibold">门店信息</h2>
        <p class="mt-4 text-slate-300">{{ site.name }} · 本地旗舰店</p>
        <p class="mt-2 text-slate-300">地址：{{ site.address }}</p>
        <p class="mt-2 text-slate-300">电话：{{ site.phone }}</p>
        <p class="mt-2 text-slate-300">营业时间：周一至周日 10:00 - 20:00</p>
        <div class="mt-8 space-y-4 text-slate-200">
          <div>
            <p class="font-semibold">服务项目</p>
            <p>验光配镜、镜片升级、框架维修、蓝光防护、个性定制</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { siteConfig as site } from '../config/site'
</script>
