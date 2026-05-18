<template>
  <div class="w-full relative py-6 bg-white/70 backdrop-blur-2xl border border-white/60 rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
    
    <!-- Active Ingredient Controls (Floating above dock) -->
    <transition name="pop">
      <div v-if="activeIngredient && activeIngredient.id !== 'temperature'" class="absolute -top-14 left-0 w-full flex justify-center z-50 pointer-events-none">
         <div class="bg-black/90 backdrop-blur-xl text-white rounded-full px-2 py-1.5 flex items-center gap-4 shadow-2xl pointer-events-auto border border-white/10">
            <button @click="decrease" class="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/25 active:scale-90 transition-all cursor-pointer">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <div class="flex flex-col items-center min-w-[70px]">
               <span class="text-xs font-bold uppercase tracking-widest text-[#a89083]">{{ activeIngredient.id === 'temperature' ? 'Temperature' : $t('ingredients.' + activeIngredient.id) }}</span>
               <div class="text-sm font-semibold tracking-tight">{{ recipe[activeIngredient.id] || 0 }}<span class="text-white/50 text-xs ml-0.5">{{ activeIngredient.id === 'espresso' ? 'x' : 'ml' }}</span></div>
            </div>
            <button @click="increase" class="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/25 active:scale-90 transition-all cursor-pointer">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
         </div>
      </div>
    </transition>

    <!-- Carousel container -->
    <div 
       ref="containerRef"
       class="flex overflow-x-auto snap-x snap-mandatory fancy-scrollbar items-center mask-edges min-h-[90px]"
    >
       <!-- Left Spacer for centering first item -->
       <div class="shrink-0 w-[calc(50%-40px)] pointer-events-none"></div>
       
       <!-- Temperature Toggle as first item -->
       <div class="snap-center shrink-0 flex flex-col items-center gap-2 cursor-pointer transition-all duration-300"
            @click="selectItem(0, $event)"
            :class="activeIdx === 0 ? 'scale-100 opacity-100 mx-2' : 'scale-75 opacity-50 hover:opacity-80'">
          <button @click="activeIdx === 0 ? isIced = !isIced : null" class="w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300" :class="isIced ? 'bg-blue-50 text-blue-500 border border-blue-200' : 'bg-[#fff5ee] text-[#d48866] border border-[#f5dbcf]'">
             <!-- Ice Icon -->
             <svg v-if="isIced" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 16-5.5 5.5A2.121 2.121 0 0 1 12.5 21H3V11.5a2.121 2.121 0 0 1 .621-1.5L9 4.5"/><path d="M12.5 21 21 12.5"/><path d="M9 4.5 17.5 13"/><path d="M11 10.5 8.5 13"/><path d="M15.5 15 13 17.5"/></svg>
             <!-- Hot Icon -->
             <svg v-else width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v4"/><path d="M14 2v4"/><path d="M7 6h10c1.7 0 3 1.3 3 3v6c0 3.3-2.7 6-6 6H10c-3.3 0-6-2.7-6-6V9c0-1.7 1.3-3 3-3Zm0 0v-4"/></svg>
          </button>
          <span class="text-[11px] font-bold uppercase tracking-widest transition-colors w-20 text-center truncate" :class="activeIdx === 0 ? 'text-stone-900' : 'text-stone-500'">{{ isIced ? $t('general.iced') : $t('general.hot') }}</span>
       </div>

       <!-- Ingredients -->
       <div 
         v-for="(ing, idx) in activeIngredients" 
         :key="ing.id"
         class="snap-center shrink-0 flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 relative"
         @click="selectItem(idx + 1, $event)"
         :class="(activeIdx === idx + 1) ? 'scale-100 opacity-100 mx-2' : 'scale-75 opacity-50 hover:opacity-80'"
       >
         <!-- Indicator dot if > 0 -->
         <div v-if="(recipe[ing.id] || 0) > 0" class="absolute -top-1 right-1 w-3.5 h-3.5 bg-stone-900 rounded-full border-2 border-white z-10 transition-transform scale-in"></div>

         <div class="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border border-black/5 overflow-hidden"
            :class="(activeIdx === idx + 1) ? 'shadow-lg bg-stone-900 border-stone-800' : 'bg-white hover:bg-stone-50'">
            <component :is="getIconFor(ing.id)" class="w-7 h-7 transition-colors" :class="(activeIdx === idx + 1) ? 'text-white' : 'text-stone-700'" />
         </div>
         <span class="text-[11px] font-bold uppercase tracking-widest transition-colors w-20 text-center truncate" :class="(activeIdx === idx + 1) ? 'text-stone-900' : 'text-stone-500'">{{ $t('ingredients.' + ing.id) }}</span>
       </div>

       <!-- Right Spacer for centering last item -->
       <div class="shrink-0 w-[calc(50%-40px)] pointer-events-none"></div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRecipe } from '../composables/useRecipe'
import CoffeeIcon from './icons/CoffeeIcon.vue'
import MilkIcon from './icons/MilkIcon.vue'
import FlavorIcon from './icons/FlavorIcon.vue'
import ToppingIcon from './icons/ToppingIcon.vue'

const { recipe, setIngredient, activeIngredients, isIced, activeIdx } = useRecipe()

const containerRef = ref(null)

const activeIngredient = computed(() => {
    if (activeIdx.value === 0) return { id: 'temperature' }
    return activeIngredients.value[activeIdx.value - 1]
})

const selectItem = (idx, event) => {
    activeIdx.value = idx
    if (event && event.currentTarget && containerRef.value) {
        const item = event.currentTarget
        const container = containerRef.value
        const targetScrollLeft = item.offsetLeft - (container.clientWidth / 2) + (item.clientWidth / 2)
        container.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth'
        })
    }
}

const decrease = () => {
    if(!activeIngredient.value || activeIngredient.value.id === 'temperature') return
    const ing = activeIngredient.value
    const current = recipe.value[ing.id] || 0
    const step = ing.id === 'espresso' ? 1 : 10
    if(current > 0) {
        setIngredient(ing.id, Math.max(0, current - step))
    }
}

const increase = () => {
    if(!activeIngredient.value || activeIngredient.value.id === 'temperature') return
    const ing = activeIngredient.value
    const current = recipe.value[ing.id] || 0
    const step = ing.id === 'espresso' ? 1 : 10
    if(current < ing.max) {
        setIngredient(ing.id, Math.min(ing.max, current + step))
    }
}

// Icon mapping
const getIconFor = (id) => {
    const ing = activeIngredients.value.find(i => i.id === id)
    if(ing?.type === 'base') return CoffeeIcon
    if(ing?.type === 'milk') return MilkIcon
    if(ing?.type === 'flavor') return FlavorIcon
    return ToppingIcon
}
</script>

<style scoped>
.pop-enter-active,
.pop-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.9);
}
.scale-in {
  animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes scaleIn {
  from { transform: scale(0); }
  to { transform: scale(1); }
}

.fancy-scrollbar::-webkit-scrollbar {
  display: none;
}
.fancy-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.mask-edges {
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}
</style>
