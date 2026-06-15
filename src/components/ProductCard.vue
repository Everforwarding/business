<template>
  <article class="glow-card group overflow-hidden p-0 flex flex-col">
    <div class="overflow-hidden h-52 bg-zinc-900">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        class="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div v-else class="flex h-full items-center justify-center text-zinc-600">
        暂无图片
      </div>
    </div>
    <div class="p-6 flex flex-col flex-1">
      <h2 class="text-lg font-semibold text-zinc-100">{{ product.name }}</h2>
      <p class="mt-2 text-sm text-zinc-500 flex-1">{{ product.desc || product.description }}</p>
      <div class="mt-5 flex items-center justify-between">
        <span class="text-2xl font-bold text-cyan-400">¥{{ product.price }}</span>
        <a
          :href="`/products/${product.id || product._id || ''}`"
          class="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-5 py-2 text-sm font-medium text-zinc-300 transition hover:bg-cyan-500/20 hover:border-cyan-500/30 hover:text-cyan-300"
        >
          查看详情
          <span class="text-xs">→</span>
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>
