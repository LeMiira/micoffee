<template>
  <div class="h-[100dvh] w-screen bg-gradient-to-br from-[#f8f9fa] via-[#e6e2df] to-[#d5c6be] overflow-hidden flex flex-col font-sans select-none text-[#222]">
    
    <!-- Ambient glowing orbs behind -->
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-white rounded-full blur-[100px] opacity-60 pointer-events-none"></div>
    <div class="absolute bottom-40 -right-20 w-80 h-80 bg-[#b79d8d] rounded-full blur-[100px] opacity-30 pointer-events-none"></div>
    
    <!-- Top Header -->
    <header class="flex justify-between items-center px-6 py-5 absolute top-0 left-0 w-full z-40">
      <div class="text-2xl font-bold tracking-tighter text-[#4a3f39]">mira<span class="text-stone-400 font-medium tracking-normal text-xl">.</span></div>
      <div class="flex gap-2">
        <a href="https://github.com/LeMiira/micoffee" target="_blank" class="h-10 px-3 bg-white/60 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)] active:scale-90 transition-transform gap-1.5 text-xs font-semibold text-stone-700">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="text-stone-700"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
           Star
        </a>
        <router-link to="/kitchen" class="w-10 h-10 bg-white/60 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)] active:scale-90 transition-transform text-stone-600">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        </router-link>
        <button class="w-10 h-10 bg-white/60 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)] active:scale-90 transition-transform" @click="openSettings">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="text-stone-600" stroke="currentColor" stroke-width="2"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
        </button>
      </div>
    </header>

    <!-- Main Coffee Visualization Area -->
    <div class="flex-1 flex flex-col items-center justify-center relative pt-8 pb-56">
        <CoffeeMugVisual />
    </div>

    <!-- Bottom Dock UI -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[420px] flex flex-col gap-4 z-30">
        
        <!-- Interactive Ingredient Dock -->
        <IngredientDock />

        <!-- Action / Order Button -->
        <transition name="fade-slide">
            <div v-if="totalVolume > 0 && activeIdx === activeIngredients.length" class="px-1 w-full flex justify-center">
                <button class="w-[80%] max-w-[300px] bg-stone-900 shadow-xl text-white rounded-full py-4 text-sm font-semibold tracking-wide active:scale-95 transition-transform flex items-center justify-center gap-2" @click="showOrderModal = true">
                    <span>Brew order</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
            </div>
        </transition>
    </div>

    <!-- Order Modal -->
    <OrderModal v-if="showOrderModal" @close="showOrderModal = false" />
    <AdminPanel v-if="isSettingsOpen" @close="isSettingsOpen = false" />

    <!-- Active Order Status -->
    <div v-if="myOrder" class="absolute top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white/95 backdrop-blur-xl border border-stone-200 p-5 rounded-[24px] shadow-2xl z-50 flex flex-col gap-3 animate-slide-up">
       <div class="flex justify-between items-center">
         <span class="font-bold text-xs uppercase tracking-widest text-stone-500">Order #{{ myOrder.id.slice(-4).toUpperCase() }}</span>
         <span class="px-2 py-1 rounded bg-stone-100 text-[10px] font-bold uppercase tracking-widest">{{ myOrder.status }}</span>
       </div>
       
       <div v-if="myOrder.status === 'pending'" class="text-sm font-medium text-stone-600">Waiting for kitchen to review...</div>
       <div v-else-if="myOrder.status === 'priced'" class="flex flex-col gap-3 mt-1">
         <div class="text-sm font-medium text-stone-600">Kitchen accepted! Price: <span class="font-bold text-xl text-stone-900 ml-1">${{ myOrder.price }}</span></div>
         <button @click="acceptPrice(myOrder.id)" class="w-full bg-stone-900 text-white rounded-[16px] py-3 text-sm font-bold active:scale-95 transition-transform">Pay & Brew</button>
       </div>
       <div v-else-if="myOrder.status === 'accepted'" class="text-sm font-medium text-stone-600 flex items-center gap-2">
         <svg class="animate-spin -ml-1 mr-1 h-4 w-4 text-stone-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
         Brewing your coffee...
       </div>
       <div v-else-if="myOrder.status === 'ready'" class="flex flex-col gap-3 mt-1 text-sm text-green-700 font-bold">
         Coffee is ready! Please pick it up at the counter.
         <button @click="dismissOrder" class="w-full bg-green-100 text-green-800 rounded-[16px] py-3 text-sm font-bold active:scale-95 transition-transform">Dismiss</button>
       </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CoffeeMugVisual from '../components/CoffeeMugVisual.vue'
import IngredientDock from '../components/IngredientDock.vue'
import OrderModal from '../components/OrderModal.vue'
import AdminPanel from '../components/AdminPanel.vue'
import { useRecipe } from '../composables/useRecipe'
import { useOrdersStore } from '../stores/orders'

const { totalVolume, activeIdx, activeIngredients } = useRecipe()
const store = useOrdersStore()

const showOrderModal = ref(false)
const isSettingsOpen = ref(false)

const openSettings = () => {
    isSettingsOpen.value = true
}

// Client Order Tracking
onMounted(() => {
    store.initSync()
})

const myOrder = computed(() => {
    const latestId = localStorage.getItem('my_latest_order')
    if(!latestId) return null
    return store.orders.find(o => o.id === latestId && o.status !== 'completed' && o.status !== 'done')
})

const acceptPrice = (id) => {
    store.updateOrderStatus(id, 'accepted')
}

const dismissOrder = () => {
    localStorage.removeItem('my_latest_order')
    // Force reactivity update if needed, but computed should catch it
    store.orders = [...store.orders]
}
</script>
