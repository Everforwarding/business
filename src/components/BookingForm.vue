<template>
  <div class="rounded-3xl bg-slate-900 p-6 text-white shadow-xl">
    <h2 class="text-xl font-semibold">预约验光</h2>
    <p class="mt-3 text-slate-300">填写信息后，我们会尽快与您联系确认预约时间。</p>
    <form @submit.prevent="submit" class="mt-6 space-y-4">
      <input
        v-model="form.name"
        type="text"
        placeholder="姓名"
        class="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
      />
      <input
        v-model="form.phone"
        type="tel"
        placeholder="电话"
        class="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
      />
      <textarea
        v-model="form.note"
        rows="4"
        placeholder="备注需求"
        class="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
      ></textarea>
      <button
        type="submit"
        class="w-full rounded-2xl bg-slate-100 py-3 font-semibold text-slate-900 hover:bg-white"
      >
        提交预约
      </button>
    </form>
    <p v-if="success" class="mt-4 rounded-2xl bg-emerald-100 px-4 py-3 text-emerald-900">{{ success }}</p>
    <p v-if="error" class="mt-4 rounded-2xl bg-rose-100 px-4 py-3 text-rose-900">{{ error }}</p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  phone: '',
  note: '',
})
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
