<template>
  <div class="min-h-screen bg-[#f3f4f6] text-[#222] font-sans p-6 md:p-10 flex flex-col">
    <!-- Header -->
    <header class="flex justify-between items-center mb-10 w-full max-w-4xl mx-auto">
      <div class="flex items-center gap-4">
          <router-link to="/" class="w-10 h-10 bg-white shadow-sm flex items-center justify-center rounded-full text-stone-600 hover:text-black">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </router-link>
          <div>
            <h1 class="text-2xl font-bold tracking-tight">Orders</h1>
            <p class="text-stone-500 text-sm font-medium">Live queue</p>
          </div>
      </div>
      <button @click="store.clearCompletedOrders()" class="text-sm font-semibold text-stone-500 hover:text-stone-900 bg-white px-4 py-2 rounded-full shadow-sm">
        Clear Done
      </button>
    </header>

    <!-- Orders Grid -->
    <main class="flex-1 w-full max-w-4xl mx-auto">
      <div v-if="store.orders.length === 0" class="flex flex-col items-center justify-center h-64 text-stone-400">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" class="mb-4 opacity-50" stroke="currentColor" stroke-width="1.5"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>
        <p class="text-lg font-medium tracking-tight">No incoming orders</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <transition-group name="order-list">
             <div v-for="order in sortedOrders" :key="order.id" class="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 flex flex-col gap-4 relative overflow-hidden transition-all duration-300">
                <!-- Status bar top -->
                <div class="absolute top-0 left-0 w-full h-1.5" :class="statusColors[order.status]"></div>
                
                <div class="flex justify-between items-start pt-1">
                   <div>
                       <h3 class="font-bold text-lg leading-tight">{{ order.customerName || 'Guest' }}</h3>
                       <div class="text-xs text-stone-500 font-medium mt-1">Table {{ order.tableNumber || '?' }} • {{ formatTime(order.createdAt) }}</div>
                   </div>
                   <div class="text-xs uppercase tracking-widest font-bold px-2.5 py-1 rounded-full bg-stone-100 text-stone-600">
                        {{ order.isIced ? 'Iced' : 'Hot' }}
                   </div>
                </div>

                <div class="my-2 p-3 bg-stone-50 rounded-2xl flex-1">
                   <div v-for="(amount, id) in getNonZeroIngredients(order.recipe)" :key="id" class="flex justify-between text-sm py-1 font-medium">
                       <span class="text-stone-600 capitalize">{{ id }}</span>
                       <span class="text-stone-900">{{ amount }}{{ id === 'espresso' ? 'x' : 'ml' }}</span>
                   </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-2 mt-auto">
                    <button v-if="order.status === 'pending'" @click="store.updateOrderStatus(order.id, 'preparing')" class="flex-1 bg-amber-100 text-amber-800 font-semibold py-2.5 rounded-xl text-sm active:scale-95 transition-all">Start Prep</button>
                    <button v-if="order.status === 'preparing'" @click="store.updateOrderStatus(order.id, 'done')" class="flex-1 bg-green-100 text-green-800 font-semibold py-2.5 rounded-xl text-sm active:scale-95 transition-all">Complete</button>
                    <button v-if="order.status === 'done'" disabled class="flex-1 bg-stone-100 text-stone-400 font-semibold py-2.5 rounded-xl text-sm opacity-50">Done</button>
                </div>
             </div>
          </transition-group>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useOrdersStore } from '../stores/orders'

const store = useOrdersStore()

const statusColors = {
    pending: 'bg-stone-300',
    preparing: 'bg-amber-400',
    done: 'bg-green-400'
}

const statusWeight = {
    pending: 1,
    preparing: 2,
    done: 3
}

const sortedOrders = computed(() => {
    return [...store.orders].sort((a, b) => {
        if (statusWeight[a.status] !== statusWeight[b.status]) {
            return statusWeight[a.status] - statusWeight[b.status];
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
})

const getNonZeroIngredients = (recipe) => {
    const result = {}
    if(recipe){
        Object.entries(recipe).forEach(([k, v]) => {
            if(v > 0) result[k] = v;
        })
    }
    return result;
}

const formatTime = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
.order-list-enter-active,
.order-list-leave-active {
  transition: all 0.4s ease;
}
.order-list-enter-from,
.order-list-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>
