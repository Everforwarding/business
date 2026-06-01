import { defineStore } from 'pinia'
import { getProducts } from '../api/product'

export const useProductStore = defineStore('product', {
  state: () => ({
    list: [],
    loading: false,
    error: '',
  }),
  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = ''
      try {
        this.list = await getProducts()
      } catch (err) {
        this.error = err?.message || '获取商品失败'
      } finally {
        this.loading = false
      }
    },
  },
})
