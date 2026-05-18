<template>
  <div class="min-h-[100dvh] w-screen bg-[#f4f2ef] font-sans text-stone-800 p-6 max-w-2xl mx-auto">
    <header class="flex items-center gap-4 mb-10">
      <router-link to="/kitchen" class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
      </router-link>
      <h1 class="text-2xl font-bold tracking-tight">Shop Settings</h1>
    </header>

    <div class="space-y-8">
      
      <!-- QR Code Generator -->
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
        <h2 class="text-lg font-bold mb-4">Table QR Generator</h2>
        <div class="flex gap-3 mb-6">
          <input type="number" v-model="tableNumber" placeholder="Table Number" class="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-stone-400" />
        </div>
        
        <div v-if="tableNumber" class="flex flex-col items-center p-6 bg-stone-50 rounded-2xl border border-stone-200">
          <!-- Fake QR Code visual -->
          <div class="w-48 h-48 bg-white p-2 rounded-xl shadow-sm mb-4 relative">
            <div class="absolute inset-2 border-4 border-stone-900 border-dashed rounded-lg flex items-center justify-center opacity-50"></div>
               <!-- Patterns to look like QR -->
               <div class="absolute inset-4 grid grid-cols-5 grid-rows-5 gap-1">
                 <div v-for="i in 25" :key="i" class="bg-stone-900" :class="Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'"></div>
               </div>
               <div class="absolute top-4 left-4 w-8 h-8 border-4 border-stone-900 bg-white z-10"></div>
               <div class="absolute top-4 right-4 w-8 h-8 border-4 border-stone-900 bg-white z-10"></div>
               <div class="absolute bottom-4 left-4 w-8 h-8 border-4 border-stone-900 bg-white z-10"></div>
          </div>
          <p class="text-sm text-stone-500 mb-2">Scan to order for Table {{ tableNumber }}</p>
          <div class="text-xs font-mono bg-stone-200 px-3 py-1.5 rounded-lg break-all">
            {{ baseUrl }}?table={{ tableNumber }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tableNumber = ref('')
const baseUrl = computed(() => window.location.origin)
</script>
