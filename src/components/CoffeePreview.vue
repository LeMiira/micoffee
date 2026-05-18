<template>
  <div class="relative w-full max-w-sm aspect-[3/4] flex flex-col items-center justify-center perspective-[1000px]">
    
    <!-- Empty State -->
    <div v-if="totalVolume === 0" class="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-30 transition-opacity duration-500">
      <svg class="w-20 h-20 text-[#a89083]/40 mb-6 animate-[bounce_3s_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>
      <p class="text-[#816252] text-xs uppercase tracking-[0.2em] font-bold leading-relaxed">{{ $t('preview.empty') }}</p>
    </div>

    <!-- The Cup (Glassmorphism) -->
    <div class="relative w-64 h-80 border-[5px] border-white/60 rounded-b-[120px] rounded-t-[16px] mx-auto z-20 bg-gradient-to-tr from-white/10 to-white/40 shadow-[inset_0_-10px_20px_rgba(255,255,255,0.9),_0_20px_60px_rgba(168,144,131,0.25)] backdrop-blur-md overflow-hidden transition-all duration-500 transform mb-20 before:absolute before:inset-0 before:rounded-b-[120px] before:rounded-t-[16px] before:shadow-[inset_-10px_0_30px_rgba(255,255,255,0.7)] before:pointer-events-none">
       
       <!-- Liquid Container -->
       <div class="absolute bottom-0 left-0 w-full flex flex-col justify-end transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden rounded-b-[110px]" :style="{ height: cupFillHeight + '%' }">
          
          <!-- Layers -->
          <div 
             v-for="(layer, index) in liquidLayers" 
             :key="layer.id"
             class="w-full transition-all duration-1000 origin-bottom border-t border-white/20 relative"
             :style="{ height: layer.heightPercent + '%', backgroundColor: layer.color, opacity: layer.opacity }"
          >
             <div v-if="index === liquidLayers.length - 1 && layer.id !== 'foam' && !isIced" class="absolute top-0 left-0 w-full h-4 uppercase rounded-[100%] scale-y-50 -mt-2 shadow-inner opacity-60 bg-white/30 backdrop-blur-sm mix-blend-overlay"></div>
          </div>
       </div>

       <!-- Ice Cubes (if iced) -->
       <div v-if="isIced && recipe.ice > 0" class="absolute inset-0 z-30 pointer-events-none opacity-90">
          <div class="absolute w-12 h-12 rounded-2xl border-2 border-white/90 bg-white/40 backdrop-blur-md top-[35%] left-[20%] rotate-12 shadow-lg drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]"></div>
          <div class="absolute w-14 h-14 rounded-2xl border-2 border-white/70 bg-white/30 backdrop-blur-md top-[45%] right-[20%] -rotate-12 shadow-lg drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]"></div>
          <div class="absolute w-10 h-10 rounded-2xl border-2 border-white/90 bg-white/50 backdrop-blur-md top-[70%] left-[45%] rotate-45 shadow-lg drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]"></div>
       </div>
       
       <!-- Steam (if hot and has liquid) -->
       <div v-if="!isIced && totalVolume > 0" class="absolute -top-16 left-1/2 -translate-x-1/2 flex gap-6 opacity-60 z-10 pointer-events-none mix-blend-overlay">
          <div class="w-2 h-20 bg-white rounded-full blur-[6px] animate-[bounce_3s_infinite_ease-in-out]"></div>
          <div class="w-3 h-24 bg-white rounded-full blur-[8px] animate-[bounce_4s_infinite_ease-in-out_0.5s]"></div>
          <div class="w-2 h-16 bg-white rounded-full blur-[6px] animate-[bounce_2.5s_infinite_ease-in-out_1s]"></div>
       </div>

       <!-- Cup Highlights -->
       <div class="absolute inset-0 z-50 pointer-events-none rounded-b-[120px] shadow-[inset_-8px_0_40px_rgba(255,255,255,0.9),inset_8px_0_20px_rgba(255,255,255,0.5)]"></div>
       <div class="absolute top-0 left-[12%] w-[10%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent blur-md z-50 pointer-events-none"></div>
    </div>
    
    <!-- Cup Shadow -->
    <div class="w-64 h-10 bg-[#816252]/15 blur-2xl rounded-[100%] absolute bottom-24 z-10 mx-auto"></div>

    <!-- Intensity Indicator (Taste Profile) -->
    <div v-if="totalVolume > 0" class="absolute bottom-0 left-0 w-full px-4 z-40">
      <div class="flex justify-between items-center bg-white/80 backdrop-blur-3xl border border-white p-6 rounded-[32px] shadow-2xl shadow-[#a89083]/20">
        <div class="flex-1 text-center">
          <div class="text-[10px] uppercase tracking-[0.2em] font-bold text-[#816252] mb-1.5">{{ $t('builder.intensity') }}</div>
          <div class="text-4xl font-extrabold text-[#312723]">{{ intensity }}<span class="text-base text-[#816252]/60 ml-0.5">%</span></div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRecipe } from '../composables/useRecipe';

const { recipe, isIced, totalVolume, intensity } = useRecipe();

// Map ingredients to colors and layer ordering
const layerConfig = {
  coffee: { order: 1, color: '#3D2B1F', opacity: 1 },
  espresso: { order: 2, color: '#27160C', opacity: 1 },
  milk: { order: 4, color: '#FDFBF7', opacity: 0.95 },   // More opaque, milkier white
  lactoseFree: { order: 4, color: '#FFF8F0', opacity: 0.95 },
  oatMilk: { order: 4, color: '#F3E5D8', opacity: 0.98 },
  chocolate: { order: 3, color: '#4A2E1B', opacity: 0.95 },
  cocoa: { order: 3, color: '#5C3A21', opacity: 0.95 },
  caramel: { order: 3, color: '#B36D2B', opacity: 0.9 },
  vanilla: { order: 3, color: '#F4E9CD', opacity: 0.8 },
  sugar: { order: 3, color: '#FFFFFF', opacity: 0.3 },
  foam: { order: 5, color: '#FFFFFF', opacity: 0.9 },
  cinnamon: { order: 6, color: '#8B4513', opacity: 0.8 }
};

const liquidLayers = computed(() => {
  const layers = [];
  let currentVolume = 0;
  
  // Calculate relative sizes without ice
  const ingredientsExclIce = Object.entries(recipe.value).filter(([id]) => id !== 'ice' && recipe.value[id] > 0);
  const totalVolumeExclIce = ingredientsExclIce.reduce((sum, [_, amt]) => sum + amt, 0);

  if (totalVolumeExclIce === 0) return layers;

  // Sort by order 
  ingredientsExclIce.sort((a, b) => {
      const orderA = layerConfig[a[0]]?.order || 99;
      const orderB = layerConfig[b[0]]?.order || 99;
      return orderB - orderA; // Render bottom to top since flex is column-reverse visually due to justify-end
  });

  ingredientsExclIce.forEach(([id, amt]) => {
      const percent = (amt / totalVolumeExclIce) * 100;
      layers.push({
          id,
          heightPercent: percent,
          color: layerConfig[id]?.color || '#CCC',
          opacity: layerConfig[id]?.opacity || 1
      });
  });

  return layers.reverse(); // CSS flex-col justify-end renders from bottom, so array needs to be bottom-first
});

const maxFillCap = 85; 
const cupFillHeight = computed(() => {
    if (totalVolume.value === 0) return 0;
    // Map total volume to visual cup fill (fake bounds for presentation)
    // E.g., if total volume is 300, it fills maxFillCap
    return Math.min(maxFillCap, (totalVolume.value / 300) * maxFillCap);
});
</script>
