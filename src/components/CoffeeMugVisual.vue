<template>
  <div class="relative w-full max-w-[280px] aspect-[4/5] perspective-[1200px] flex justify-center items-end">
    
    <!-- Empty State Text (Behind Mug) -->
    <div v-if="totalVolume === 0" class="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-10 opacity-40 transition-opacity">
      <p class="text-stone-400 text-sm font-medium">Select an ingredient to begin</p>
    </div>

    <!-- The Mug Structure (Realistic Glass & Lighting) -->
    <!-- We make it huge and completely transparent with heavy reflections -->
    <div class="relative w-full h-[85%] border-[6px] border-white/40 rounded-b-[120px] rounded-t-[12px] z-20 
                bg-gradient-to-tr from-white/10 to-white/30 backdrop-blur-sm 
                shadow-[inset_0_-10px_20px_rgba(255,255,255,0.7),_0_20px_50px_rgba(0,0,0,0.1)] 
                overflow-hidden transition-all duration-700 ease-out flex flex-col justify-end"
         :style="mugTransform"
    >
       
       <!-- Liquid Container -->
       <div class="w-full flex-col flex justify-end transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden rounded-b-[110px]" :style="{ height: cupFillHeight + '%' }">
          
          <!-- Colored Liquid Layers -->
          <div 
             v-for="(layer, index) in liquidLayers" 
             :key="layer.id"
             class="w-full transition-all duration-[1200ms] origin-bottom relative border-t border-white/10 mix-blend-multiply"
             :style="{ height: layer.heightPercent + '%', backgroundColor: layer.color, opacity: layer.opacity }"
          >
             <!-- Top Surface Ellipse for depth -->
             <div v-if="index === liquidLayers.length - 1 && layer.id !== 'foam' && !isIced" 
                  class="absolute top-0 left-0 w-full h-8 uppercase rounded-[100%] scale-y-[0.3] -mt-4 shadow-[inset_0_-2px_10px_rgba(0,0,0,0.3)] opacity-80 mix-blend-overlay"
                  :style="{ backgroundColor: lightenColor(layer.color, 40) }">
             </div>
          </div>
       </div>

       <!-- Ice Cubes -->
       <transition name="fade">
           <div v-if="isIced && recipe.ice > 0" class="absolute inset-0 z-30 pointer-events-none mix-blend-overlay overflow-hidden rounded-b-[110px]">
              <div class="absolute w-16 h-16 rounded-[20px] border-2 border-white bg-white/70 backdrop-blur-md top-[30%] left-[15%] rotate-12 shadow-lg animation-bob"></div>
              <div class="absolute w-20 h-20 rounded-[24px] border-2 border-white/80 bg-white/60 backdrop-blur-md top-[50%] right-[10%] -rotate-15 shadow-xl animation-bob" style="animation-delay: 0.5s"></div>
              <div class="absolute w-14 h-14 rounded-[16px] border-2 border-white/60 bg-white/50 backdrop-blur-sm top-[70%] left-[30%] rotate-45 shadow-sm animation-bob" style="animation-delay: 1s"></div>
           </div>
       </transition>
       
       <!-- Steam (Hot drinks only) -->
       <transition name="fade">
           <div v-if="!isIced && totalVolume > 0" class="absolute -top-32 left-1/2 -translate-x-1/2 flex gap-8 opacity-40 z-10 pointer-events-none mix-blend-overlay">
              <div class="w-4 h-32 bg-white rounded-full blur-[12px] animate-[steam_4s_infinite_ease-out]"></div>
              <div class="w-6 h-40 bg-white rounded-full blur-[16px] animate-[steam_5s_infinite_ease-out_1s]"></div>
              <div class="w-3 h-24 bg-white rounded-full blur-[10px] animate-[steam_3s_infinite_ease-out_2s]"></div>
           </div>
       </transition>

       <!-- Outer Mug Highlights (Inner shadow and edge curves) -->
       <div class="absolute inset-0 z-50 pointer-events-none rounded-b-[120px] shadow-[inset_-12px_0_40px_rgba(255,255,255,0.8),inset_8px_0_20px_rgba(255,255,255,0.4)] mix-blend-overlay"></div>
       
       <!-- Left Side Rim Light -->
       <div class="absolute top-0 left-[8%] w-[6%] h-full bg-gradient-to-r from-transparent via-white/80 to-transparent blur-md z-50 pointer-events-none mix-blend-overlay"></div>
    </div>
    
    <!-- Cast Floor Shadow -->
    <div class="w-[300px] h-8 bg-black/10 blur-[20px] rounded-[100%] absolute -bottom-4 z-10 mx-auto transition-transform duration-700" :style="{ transform: `scale(${1 + (totalVolume/1000)})` }"></div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRecipe } from '../composables/useRecipe'

const { recipe, isIced, totalVolume } = useRecipe()

const mugTransform = computed(() => {
    // Slight downward tilt based on volume to give weight
    const yShift = Math.min(10, (totalVolume.value / 300) * 10)
    return {
        transform: `translateY(${yShift}px)`
    }
})

// Hex lighter helper
const lightenColor = (color, percent) => {
    let num = parseInt(color.replace("#",""),16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = (num >> 8 & 0x00FF) + amt,
    G = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
}

const layerConfig = {
  coffee: { order: 1, color: '#4a2512', opacity: 1 },
  espresso: { order: 2, color: '#27160C', opacity: 1 },
  milk: { order: 4, color: '#fcfaf6', opacity: 0.98 },
  lactoseFree: { order: 4, color: '#fffaed', opacity: 0.95 },
  oatMilk: { order: 4, color: '#f3e6d8', opacity: 0.98 },
  chocolate: { order: 3, color: '#422410', opacity: 0.95 },
  cocoa: { order: 3, color: '#52341b', opacity: 0.95 },
  caramel: { order: 3, color: '#bc681b', opacity: 0.9 },
  vanilla: { order: 3, color: '#fdf1d4', opacity: 0.9 },
  sugar: { order: 3, color: '#ffffff', opacity: 0.5 },
  foam: { order: 5, color: '#ffffff', opacity: 0.95 },
  cinnamon: { order: 6, color: '#904e1c', opacity: 0.8 },
  cream: { order: 5, color: '#fff9ef', opacity: 1 }
};

const liquidLayers = computed(() => {
  const layers = [];
  
  // Filter out ice
  const ingredientsExclIce = Object.entries(recipe.value).filter(([id]) => id !== 'ice' && recipe.value[id] > 0);
  const totalVolumeExclIce = ingredientsExclIce.reduce((sum, [_, amt]) => sum + amt, 0);

  if (totalVolumeExclIce === 0) return layers;

  ingredientsExclIce.sort((a, b) => {
      const orderA = layerConfig[a[0]]?.order || 99;
      const orderB = layerConfig[b[0]]?.order || 99;
      return orderB - orderA; // Render bottom up
  });

  ingredientsExclIce.forEach(([id, amt]) => {
      const percent = (amt / totalVolumeExclIce) * 100;
      layers.push({
          id,
          heightPercent: percent,
          color: layerConfig[id]?.color || '#DDD',
          opacity: layerConfig[id]?.opacity || 1
      });
  });

  return layers.reverse();
});

const maxFillCap = 90; 
const cupFillHeight = computed(() => {
    if (totalVolume.value === 0) return 0;
    return Math.min(maxFillCap, (totalVolume.value / 400) * maxFillCap); // scale mapped to typical cup sizes
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes steam {
  0% { transform: translateY(20px) scale(0.8); opacity: 0; filter: blur(8px); }
  30% { opacity: 0.6; }
  100% { transform: translateY(-80px) scale(1.5); opacity: 0; filter: blur(20px); }
}

.animation-bob {
  animation: bob 4s ease-in-out infinite alternate;
}

@keyframes bob {
  0% { transform: translateY(0) rotate(var(--tw-rotate)); }
  100% { transform: translateY(-10px) rotate(calc(var(--tw-rotate) + 5deg)); }
}
</style>
