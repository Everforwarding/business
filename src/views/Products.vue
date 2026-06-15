<template>
  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-12 text-center">
      <p class="text-xs font-medium uppercase tracking-[0.3em] text-cyan-400/80">精选推荐</p>
      <h1 class="mt-3 text-4xl font-bold text-zinc-50 sm:text-5xl">发现你的下一副眼镜</h1>
      <p class="mx-auto mt-4 max-w-xl text-zinc-500">通过我们的产品系列，找到既时尚又舒适的眼镜，适配多种脸型与风格。</p>
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
