<template>
  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-12 text-center">
      <p class="text-xs font-medium uppercase tracking-[0.3em] text-cyan-400/80">精选推荐</p>
      <h1 class="mt-3 text-4xl font-bold text-zinc-50 sm:text-5xl">发现你的下一副眼镜</h1>
      <p class="mx-auto mt-4 max-w-xl text-zinc-500">通过我们的产品系列，找到既时尚又舒适的眼镜，适配多种脸型与风格。</p>
    </div>
    <div class="mb-10 flex flex-wrap justify-center gap-3">
      <span class="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">蓝光防护</span>
      <span class="rounded-full bg-violet-500/10 px-4 py-2 text-sm text-violet-200">复古经典</span>
      <span class="rounded-full bg-amber-500/10 px-4 py-2 text-sm text-amber-200">时尚渐变</span>
      <span class="rounded-full bg-slate-700/10 px-4 py-2 text-sm text-slate-200">轻盈镜架</span>
      <span class="rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">护眼旗舰</span>
    </div>

    <!-- States -->
    <div v-if="store.loading" class="mt-10 text-center">
      <div class="inline-flex items-center gap-3 rounded-2xl bg-white/5 px-6 py-4 text-zinc-400">
        <span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent"></span>
        正在加载商品，请稍候...
      </div>
    </div>

    <div v-else-if="store.error" class="mt-10 rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-red-400 text-center">
      {{ store.error }}
    </div>

    <!-- Product Grid -->
    <div v-else class="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <ProductCard
        v-for="product in store.list"
        :key="product.id"
        :product="product"
      />
    </div>
    <div class="mt-16 rounded-[2rem] bg-gradient-to-r from-cyan-500/10 via-slate-900/30 to-violet-500/10 p-8 shadow-2xl ring-1 ring-white/10">
      <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-sm uppercase tracking-[0.3em] text-cyan-200/80">专属服务</p>
          <h2 class="mt-3 text-3xl font-semibold text-white">你值得拥有更专业的配镜体验</h2>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row">
          <a href="/contact" class="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">立即咨询</a>
          <a href="/products" class="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">查看更多产品</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '../store/productStore'
import ProductCard from '../components/ProductCard.vue'

const store = useProductStore()

onMounted(() => {
  store.fetchProducts()
})
</script>
