<template>
  <div class="glass-card rounded-2xl p-6">
    <h2 class="text-lg font-semibold text-zinc-100">预约验光</h2>
    <p class="mt-2 text-sm text-zinc-500">填写信息后，我们会尽快与您联系确认预约时间。</p>
    <form @submit.prevent="submit" class="mt-6 space-y-4">
      <input
        v-model="form.name"
        type="text"
        placeholder="姓名"
        class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none transition focus:border-cyan-500/40 focus:bg-white/[0.07] focus:ring-1 focus:ring-cyan-500/20"
      />
      <input
        v-model="form.phone"
        type="tel"
        placeholder="电话"
        class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none transition focus:border-cyan-500/40 focus:bg-white/[0.07] focus:ring-1 focus:ring-cyan-500/20"
      />
      <textarea
        v-model="form.note"
        rows="3"
        placeholder="备注需求"
        class="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none transition focus:border-cyan-500/40 focus:bg-white/[0.07] focus:ring-1 focus:ring-cyan-500/20 resize-none"
      ></textarea>
      <button
        type="submit"
        class="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:shadow-cyan-500/40 hover:brightness-110 active:scale-[0.98]"
      >
        提交预约
      </button>
    </form>
    <p v-if="success" class="mt-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-sm text-emerald-400">{{ success }}</p>
    <p v-if="error" class="mt-4 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">{{ error }}</p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({ name: '', phone: '', note: '' })
const success = ref('')
const error = ref('')

const submit = () => {
  if (!form.name.trim() || !form.phone.trim()) {
    error.value = '请填写姓名和电话'
    success.value = ''
    return
  }
  success.value = '预约提交成功，我们会尽快与您联系确认。'
  error.value = ''
  form.name = ''
  form.phone = ''
  form.note = ''
}
</script>
