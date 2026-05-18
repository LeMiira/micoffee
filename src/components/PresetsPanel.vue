<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between px-2">
      <h3 class="text-xs uppercase tracking-[0.2em] font-extrabold text-[#816252]">{{ $t('presets.title') }}</h3>
      <button @click="exportRecipe" class="text-[10px] uppercase font-bold text-[#f27d26] flex items-center gap-1.5 hover:text-[#e56d1c] transition-all bg-white/60 px-3 py-1.5 rounded-lg border border-white shadow-sm hover:shadow-md">
         <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
         {{ $t('general.export') }}
      </button>
    </div>
    
    <div class="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 fancy-scrollbar snap-x">
       <button 
         v-for="preset in presets" 
         :key="preset.id"
         @click="applyPreset(preset.recipe, preset.iced)"
         class="snap-start shrink-0 px-6 py-4 rounded-3xl border border-white shadow-sm bg-white/50 backdrop-blur-md hover:bg-white/90 hover:shadow-md hover:-translate-y-0.5 transition-all text-[11px] font-extrabold uppercase tracking-widest text-[#5a473d] focus:outline-none focus:ring-2 focus:ring-[#c3ada0]"
       >
         {{ $t(`presets.${preset.id}`) }}
       </button>
       <button 
         @click="resetRecipe"
         class="snap-start shrink-0 px-6 py-4 rounded-3xl border border-red-200 shadow-sm bg-red-50/60 backdrop-blur-md hover:bg-red-100 hover:shadow-md hover:-translate-y-0.5 transition-all text-[11px] font-extrabold uppercase tracking-widest text-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
       >
         Reset
       </button>
    </div>
  </div>
</template>

<script setup>
import { useRecipe } from '../composables/useRecipe';

const { applyPreset, resetRecipe, recipe, isIced } = useRecipe();

const presets = [
  {
    id: 'latte',
    iced: false,
    recipe: { espresso: 2, milk: 70, foam: 10 }
  },
  {
    id: 'americano',
    iced: false,
    recipe: { espresso: 2, coffee: 0, ice: 0, milk: 0, foam: 0 } // Water isn't an ingredient, using espresso visually
  },
  {
    id: 'caramelMacchiato',
    iced: true,
    recipe: { espresso: 2, milk: 60, caramel: 20, ice: 40 }
  }
];

const exportRecipe = () => {
    const data = { recipe: recipe.value, isIced: isIced.value };
    const str = JSON.stringify(data);
    navigator.clipboard.writeText(str).then(() => {
        alert("Recipe copied to clipboard!"); 
    });
};
</script>
