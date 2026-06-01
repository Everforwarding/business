<template>
  <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
    <h1 class="text-3xl font-bold text-slate-900">产品展示</h1>
    <p class="mt-2 text-slate-600">按分类查看热销眼镜，找到适合你的风格。</p>

    <div v-if="store.loading" class="mt-10 text-center text-slate-500">正在加载商品，请稍候...</div>
    <div v-else-if="store.error" class="mt-10 rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
      {{ store.error }}
    </div>
    <div v-else class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
