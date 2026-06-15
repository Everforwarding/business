<template>
  <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
      <!-- Left column -->
      <div class="space-y-6">
        <div>
          <p class="text-xs font-medium uppercase tracking-[0.3em] text-cyan-400/80">联系我们</p>
          <h1 class="mt-3 text-4xl font-bold text-zinc-50">预约验光</h1>
          <p class="mt-3 text-zinc-400 leading-7">
            欢迎在线咨询或电话预约，我们会为您安排专业验光师提供一对一服务。
          </p>
        </div>

        <!-- Store info -->
        <div class="glass-card rounded-2xl p-5 space-y-3 text-sm text-zinc-400">
          <p><span class="text-zinc-500">🏪</span> {{ site.name }}</p>
          <p><span class="text-zinc-500">📞</span> <span class="text-cyan-400 font-medium">{{ site.phone }}</span></p>
          <p><span class="text-zinc-500">📍</span> {{ site.address }}</p>
          <p><span class="text-zinc-500">🕐</span> 周一至周日 10:00 - 20:00</p>
        </div>

        <!-- Review -->
        <div class="glass-card rounded-2xl p-5">
          <p class="text-sm font-medium text-zinc-300">顾客评价</p>
          <p class="mt-2 text-amber-400 text-lg">★★★★★</p>
          <p class="mt-2 text-sm text-zinc-500">"老板很专业，配镜很快！"</p>
        </div>

        <!-- Nav buttons -->
        <div class="grid gap-3 sm:grid-cols-2">
          <a :href="amapNav" target="_blank" rel="noreferrer"
            class="rounded-xl bg-gradient-to-r from-cyan-500/20 to-cyan-600/10 border border-cyan-500/20 px-5 py-4 text-center text-sm font-medium text-cyan-400 transition hover:border-cyan-500/40 hover:bg-cyan-500/20">
            高德地图导航
          </a>
          <a :href="baiduNav" target="_blank" rel="noreferrer"
            class="rounded-xl bg-gradient-to-r from-violet-500/20 to-violet-600/10 border border-violet-500/20 px-5 py-4 text-center text-sm font-medium text-violet-400 transition hover:border-violet-500/40 hover:bg-violet-500/20">
            百度地图导航
          </a>
        </div>

        <!-- QR Code -->
        <div class="glass-card rounded-2xl p-5">
          <p class="text-sm font-medium text-zinc-300">微信二维码</p>
          <div class="mt-4 flex items-center gap-4">
            <div class="h-36 w-36 rounded-xl bg-white/5 p-2 overflow-hidden ring-1 ring-white/5">
              <img src="/qrcode.png" alt="微信二维码" class="h-full w-full object-cover rounded-lg" />
            </div>
            <div class="text-sm text-zinc-500">
              <p class="font-medium text-zinc-400">扫一扫加客服</p>
              <p class="mt-1">微信咨询更快，支持线上预约与验光咨询。</p>
            </div>
          </div>
        </div>

        <BookingForm />
      </div>

      <!-- Right column: Map -->
      <div class="space-y-6">
        <div class="overflow-hidden rounded-2xl border border-white/5 bg-zinc-900">
          <div class="border-b border-white/5 px-6 py-4">
            <p class="font-medium text-zinc-300">地图预览</p>
          </div>
          <iframe
            class="h-[420px] w-full"
            :src="mapEmbed"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div class="glass-card rounded-2xl p-5">
          <p class="font-medium text-zinc-300">导航快捷入口</p>
          <p class="mt-2 text-sm text-zinc-500">直接跳转到地图 App，快速抵达店铺。</p>
          <div class="mt-5 grid gap-3 sm:grid-cols-2">
            <button type="button" @click="openAmapNav"
              class="rounded-xl bg-amber-500/10 border border-amber-500/20 px-5 py-3.5 text-sm font-medium text-amber-400 transition hover:bg-amber-500/20 hover:border-amber-500/40">
              前往高德导航
            </button>
            <button type="button" @click="openBaiduNav"
              class="rounded-xl bg-violet-500/10 border border-violet-500/20 px-5 py-3.5 text-sm font-medium text-violet-400 transition hover:bg-violet-500/20 hover:border-violet-500/40">
              前往百度导航
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { siteConfig as site } from '../config/site'
import BookingForm from '../components/BookingForm.vue'

const lat = 32.271206
const lng = 118.309153
const mapEmbed = `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`
const amapNav = `https://uri.amap.com/navigation?to=${lng},${lat},${site.name}&mode=car`
const baiduNav = `https://api.map.baidu.com/direction?destination=${lat},${lng}&mode=driving&region=滁州`
const isMobile = /Android|iPhone/i.test(navigator.userAgent)

const openAmapNav = () => {
  if (isMobile) { window.location.href = amapNav; return }
  window.open(amapNav, '_blank')
}

const openBaiduNav = () => {
  if (isMobile) { window.location.href = baiduNav; return }
  window.open(baiduNav, '_blank')
}
</script>
