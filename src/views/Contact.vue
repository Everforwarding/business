<template>
  <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
    <div class="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
      <div class="space-y-6">
        <h1 class="text-3xl font-bold text-slate-900">联系我们</h1>
        <p class="text-slate-600 leading-7">
          欢迎在线咨询或电话预约，我们会为您安排专业验光师提供一对一服务。
        </p>
        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p class="text-slate-700">🏪 店名：{{ site.name }}</p>
          <div class="mt-4 text-slate-700">
            <p class="font-semibold">📞 电话：</p>
            <p class="ml-4">{{ site.phone }}</p>
          </div>
          <div class="mt-4 text-slate-700">
            <p class="font-semibold">📍 地址：</p>
            <p class="ml-4">{{ site.address }}</p>
          </div>
          <p class="mt-4 text-slate-700">营业时间：周一至周日 10:00 - 20:00</p>
        </div>
        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p class="text-lg font-semibold text-slate-900">顾客评价</p>
          <p class="mt-4 text-amber-500">⭐⭐⭐⭐⭐</p>
          <p class="mt-3 text-slate-700">“老板很专业，配镜很快！”</p>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <a
            :href="amapNav"
            target="_blank"
            rel="noreferrer"
            class="rounded-3xl bg-slate-900 px-5 py-4 text-center text-white shadow hover:bg-slate-800"
          >
            📍 高德地图导航
          </a>
          <a
            :href="baiduNav"
            target="_blank"
            rel="noreferrer"
            class="rounded-3xl bg-slate-900 px-5 py-4 text-center text-white shadow hover:bg-slate-800"
          >
            🧭 百度地图导航
          </a>
        </div>
        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p class="text-lg font-semibold text-slate-900">微信二维码</p>
          <div class="mt-4 flex items-center gap-4">
            <div class="h-40 w-40 rounded-3xl bg-slate-100 p-2 overflow-hidden">
              <img src="/qrcode.png" alt="微信二维码" class="h-full w-full object-cover rounded-2xl" />
            </div>
            <div class="text-slate-700">
              <p class="font-semibold">扫一扫加客服</p>
              <p class="mt-2">微信咨询更快，支持线上预约与验光咨询。</p>
            </div>
          </div>
        </div>
        <BookingForm />
      </div>
      <div class="space-y-6">
        <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div class="border-b border-slate-200 bg-slate-950 px-6 py-5 text-white">
            <p class="font-semibold">地图预览</p>
          </div>
          <iframe
            class="h-[420px] w-full"
            :src="mapEmbed"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p class="text-lg font-semibold text-slate-900">导航快捷入口</p>
          <p class="mt-3 text-slate-700">直接跳转到地图 App，快速抵达店铺。</p>
          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              @click="openAmapNav"
              class="rounded-3xl bg-amber-500 px-5 py-4 text-slate-950 shadow hover:bg-amber-400"
            >
              前往高德导航
            </button>
            <button
              type="button"
              @click="openBaiduNav"
              class="rounded-3xl bg-slate-900 px-5 py-4 text-white shadow hover:bg-slate-800"
            >
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
const mapUrl = `https://uri.amap.com/marker?position=118.3085,32.3075&name=富豪眼镜店`
const mapEmbed = `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`
const amapNav = `https://uri.amap.com/navigation?to=${lng},${lat},${site.name}&mode=car`
const baiduNav = `https://api.map.baidu.com/direction?destination=${lat},${lng}&mode=driving&region=滁州`
const isMobile = /Android|iPhone/i.test(navigator.userAgent)

const openAmapNav = () => {
  if (isMobile) {
    window.location.href = amapNav
    return
  }
  window.open(amapNav, '_blank')
}

const openBaiduNav = () => {
  if (isMobile) {
    window.location.href = baiduNav
    return
  }
  window.open(baiduNav, '_blank')
}
</script>
