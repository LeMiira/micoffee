<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/20 backdrop-blur-sm" @click="$emit('close')"></div>
    
    <div class="relative w-full max-w-sm bg-white rounded-[32px] p-6 shadow-2xl animate-scale-up font-sans">
      
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold tracking-tight text-stone-900">Settings</h2>
        <button @click="$emit('close')" class="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <div class="max-h-[50vh] overflow-y-auto space-y-4 fancy-scrollbar -mx-2 px-2">
         <h3 class="text-xs font-bold text-stone-400 uppercase tracking-widest">Available Ingredients</h3>
         <div class="space-y-2">
            <label v-for="ing in defaultIngredients" :key="ing.id" class="flex items-center justify-between p-3 rounded-2xl bg-stone-50 cursor-pointer group active:scale-95 transition-transform">
               <span class="text-sm font-semibold capitalize text-stone-700">{{ ing.id }}</span>
               <div class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors" :class="availableIngredients[ing.id] ? 'bg-stone-900' : 'bg-stone-200'">
                  <input type="checkbox" v-model="availableIngredients[ing.id]" class="sr-only" />
                  <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" :class="availableIngredients[ing.id] ? 'translate-x-6' : 'translate-x-1'"></span>
               </div>
            </label>
         </div>
      </div>

      <div class="mt-6 flex justify-between items-center px-1">
         <router-link to="/shop" class="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors" @click="$emit('close')">
            Kitchen View →
         </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSettings } from '../composables/useSettings';
import { useRouter } from 'vue-router';

defineProps({
  isOpen: Boolean
});

defineEmits(['close']);

const { defaultIngredients, availableIngredients } = useSettings();
</script>

<style scoped>
.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>
