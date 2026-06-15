<template>
  <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div class="h-44 overflow-hidden rounded-3xl bg-slate-100">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        class="h-full w-full object-cover"
        loading="lazy"
      />
      <div v-else class="flex h-full items-center justify-center text-slate-500">
        无图片预览
      </div>
    </div>
    <h2 class="mt-6 text-xl font-semibold text-slate-900">{{ product.name }}</h2>
    <p class="mt-3 text-slate-500">{{ product.desc || product.description }}</p>
    <div class="mt-6 flex items-center justify-between">
      <span class="text-2xl font-bold text-slate-900">¥{{ product.price }}</span>
      <a
        :href="`/products/${product.id || product._id || ''}`"
        class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
      >
        查看详情
      </a>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>
