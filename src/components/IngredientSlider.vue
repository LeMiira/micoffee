<template>
  <div class="bg-white/60 backdrop-blur-md border border-white shadow-sm hover:shadow-[0_12px_32px_rgba(168,144,131,0.12)] transition-all duration-300 rounded-[28px] p-5 flex flex-col gap-5 group transform hover:-translate-y-1">
    
    <div class="flex justify-between items-center">
      <label class="font-extrabold uppercase tracking-widest text-[#5a473d] text-[11px]">{{ $t(`ingredients.${ingredient.id}`) }}</label>
      <div class="text-[#816252] font-mono font-bold text-sm bg-white/80 border border-white/80 px-3 py-1.5 rounded-xl shadow-sm">
        {{ amount }} <span class="text-[10px] text-[#a89083] font-sans font-semibold uppercase ml-1">{{ ingredient.id === 'espresso' ? 'shots' : 'ml' }}</span>
      </div>
    </div>
    
    <div class="flex items-center gap-4">
      <button 
        @click="decrease" 
        class="w-11 h-11 shrink-0 rounded-full flex items-center justify-center border-2 border-white bg-white/50 text-[#816252] hover:bg-white hover:text-[#5a473d] transition-all shadow-sm active:scale-95"
        :class="amount === 0 ? 'opacity-40 cursor-not-allowed hover:bg-white/50 shadow-none' : ''"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </button>

      <div class="relative flex-1 h-12 flex items-center group/slider cursor-pointer" @click="handleTrackClick">
         <div class="w-full h-5 bg-white/40 rounded-full border-[1.5px] border-white/80 relative overflow-hidden transition-all group-hover/slider:h-7 duration-300 shadow-inner">
            <div 
               class="h-full rounded-full transition-all duration-300 ease-out border-r-2 border-white/20"
               :class="gradientColors"
               :style="{ width: percent + '%' }"
            ></div>
         </div>
         <input 
           type="range" 
           :min="0" 
           :max="ingredient.max" 
           v-model.number="amount"
           class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
         />
      </div>
      
      <button 
        @click="increase" 
        class="w-11 h-11 shrink-0 rounded-full flex items-center justify-center border-2 border-white bg-white/50 text-[#816252] hover:bg-white hover:text-[#5a473d] transition-all shadow-sm active:scale-95"
        :class="amount >= ingredient.max ? 'opacity-40 cursor-not-allowed hover:bg-white/50 shadow-none' : ''"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRecipe } from '../composables/useRecipe';

const props = defineProps({
  ingredient: Object
});

const { recipe, setIngredient } = useRecipe();

const amount = computed({
  get: () => recipe.value[props.ingredient.id] || 0,
  set: (val) => { setIngredient(props.ingredient.id, val); }
});

const decrease = () => {
  const step = props.ingredient.id === 'espresso' ? 1 : 10;
  if(amount.value > 0) amount.value = Math.max(0, amount.value - step);
};

const increase = () => {
  const step = props.ingredient.id === 'espresso' ? 1 : 10;
  if(amount.value < props.ingredient.max) amount.value = Math.min(props.ingredient.max, amount.value + step);
};

const handleTrackClick = (e) => {
    // Calculate rough click position for ranges if needed
    // The input range layer completely handles clicks anyway
};

const percent = computed(() => {
  return (amount.value / props.ingredient.max) * 100;
});

const gradientColors = computed(() => {
  switch (props.ingredient.type) {
    case 'base': return 'bg-gradient-to-r from-[#a89083] to-[#5a473d] shadow-[0_0_12px_rgba(90,71,61,0.5)]';
    case 'milk': return 'bg-gradient-to-r from-white/90 to-white/70 shadow-[0_0_12px_rgba(255,255,255,0.9)]';
    case 'flavor': return 'bg-gradient-to-r from-[#d4af37] to-[#fcebb6] shadow-[0_0_12px_rgba(212,175,55,0.6)] text-[#816252]';
    case 'topping': return 'bg-gradient-to-r from-[#c3ada0] to-[#e2e4e8] shadow-[0_0_12px_rgba(195,173,160,0.5)]';
    default: return 'bg-white/80';
  }
});
</script>
