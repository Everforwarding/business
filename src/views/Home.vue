<template>
  <section class="relative overflow-hidden">
    <!-- Hero -->
    <div class="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pt-24">
      <div class="text-center">
        <p class="text-xs font-medium uppercase tracking-[0.3em] text-cyan-400/80">{{ site.slogan }}</p>
        <h1 class="mt-6 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
          欢迎来到<br class="sm:hidden" /> {{ site.name }}
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 leading-relaxed">
          资深验光师团队，快速配镜方案，专业服务让您自信看见更清晰的世界。
        </p>
      </div>

      <!-- Feature Cards -->
      <div class="mt-16 grid gap-5 sm:grid-cols-3">
        <div class="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl transition hover:-translate-y-1">
          <div class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-2xl ring-1 ring-cyan-500/20">
            👁
          </div>
          <h2 class="mt-5 text-lg font-semibold text-white">专业验光</h2>
          <p class="mt-2 text-sm text-slate-300 leading-relaxed">精密验光设备，精准度高，验光更舒适。</p>
        </div>
        <div class="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl transition hover:-translate-y-1">
          <div class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-2xl ring-1 ring-violet-500/20">
            ⚡
          </div>
          <h2 class="mt-5 text-lg font-semibold text-white">快速配镜</h2>
          <p class="mt-2 text-sm text-slate-300 leading-relaxed">标准化流程，高效配镜，节省等待时间。</p>
        </div>
        <div class="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl transition hover:-translate-y-1">
          <div class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-2xl ring-1 ring-amber-500/20">
            💎
          </div>
          <h2 class="mt-5 text-lg font-semibold text-white">品质保证</h2>
          <p class="mt-2 text-sm text-slate-300 leading-relaxed">严选镜片与镜架，耐用舒适，持久如新。</p>
        </div>
      </div>

      <!-- Work Flow -->
      <div class="mt-20 rounded-[2rem] bg-slate-950/70 p-8 shadow-2xl ring-1 ring-white/10">
        <div class="grid gap-8 lg:grid-cols-4">
          <div class="space-y-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">1</div>
            <h3 class="text-lg font-semibold text-white">在线预约</h3>
            <p class="text-slate-400 leading-relaxed">微信客服或电话预约，快速安排验光时间。</p>
          </div>
          <div class="space-y-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">2</div>
            <h3 class="text-lg font-semibold text-white">专业验光</h3>
            <p class="text-slate-400 leading-relaxed">资深验光师进行详尽检查，给出精准配镜方案。</p>
          </div>
          <div class="space-y-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-300">3</div>
            <h3 class="text-lg font-semibold text-white">快速选镜</h3>
            <p class="text-slate-400 leading-relaxed">根据验光结果和风格建议，挑选合适镜架和镜片。</p>
          </div>
          <div class="space-y-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300">4</div>
            <h3 class="text-lg font-semibold text-white">舒适取镜</h3>
            <p class="text-slate-400 leading-relaxed">配镜完成后及时取件，享受清晰舒适的视界。</p>
          </div>
        </div>
      </div>

      <!-- Product Previews -->
      <div class="mt-20">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-sm uppercase tracking-[0.3em] text-cyan-400/80">热门推荐</p>
            <h2 class="mt-3 text-3xl font-semibold text-white">本周热销款</h2>
          </div>
          <p class="max-w-xl text-slate-400">为你甄选最受欢迎的镜框与护眼组合。</p>
        </div>
        <div class="mt-8 grid gap-5 sm:grid-cols-3">
          <div class="rounded-[2rem] border border-white/10 bg-slate-950/80 p-7 shadow-2xl transition hover:-translate-y-1">
            <h3 class="text-xl font-semibold text-white">时尚黑框</h3>
            <p class="mt-3 text-slate-400">经典复古，干练有型，适合通勤与日常。</p>
            <p class="mt-6 text-3xl font-bold text-cyan-300">¥199</p>
          </div>
          <div class="rounded-[2rem] border border-white/10 bg-slate-950/80 p-7 shadow-2xl transition hover:-translate-y-1">
            <h3 class="text-xl font-semibold text-white">防蓝光眼镜</h3>
            <p class="mt-3 text-slate-400">长时间用眼必备，减轻疲劳与眩光。</p>
            <p class="mt-6 text-3xl font-bold text-violet-300">¥299</p>
          </div>
          <div class="rounded-[2rem] border border-white/10 bg-slate-950/80 p-7 shadow-2xl transition hover:-translate-y-1">
            <h3 class="text-xl font-semibold text-white">渐变太阳镜</h3>
            <p class="mt-3 text-slate-400">出行必备，防晒与造型兼具。</p>
            <p class="mt-6 text-3xl font-bold text-amber-300">¥259</p>
          </div>
        </div>
      </div>

      <!-- Testimonials -->
      <div class="mt-20 rounded-[2rem] bg-slate-950/75 p-8 shadow-2xl ring-1 ring-white/10">
        <div class="grid gap-6 lg:grid-cols-3">
          <div class="space-y-4 rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
            <p class="font-semibold text-cyan-300">真实评价</p>
            <p class="text-slate-300 leading-relaxed">“验光师很细心，拿到眼镜后视野清晰了很多，服务也很周到。”</p>
            <p class="text-sm text-slate-500">— 小李</p>
          </div>
          <div class="space-y-4 rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
            <p class="font-semibold text-violet-300">顾客反馈</p>
            <p class="text-slate-300 leading-relaxed">“镜片比想象的轻，戴起来很舒适，拿到后很满意。”</p>
            <p class="text-sm text-slate-500">— 小张</p>
          </div>
          <div class="space-y-4 rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
            <p class="font-semibold text-amber-300">亲测推荐</p>
            <p class="text-slate-300 leading-relaxed">“配镜流程专业，高效又放心，强烈推荐给朋友。”</p>
            <p class="text-sm text-slate-500">— 小王</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-20 text-center">
        <div class="mx-auto inline-flex rounded-[2rem] bg-white/10 px-8 py-5 text-slate-100 ring-1 ring-white/10 backdrop-blur-xl">
          <p>立即预约 <span class="font-semibold text-cyan-300">{{ site.phone }}</span></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { siteConfig as site } from '../config/site'
</script>
