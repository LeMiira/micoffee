<template>
  <div class="h-[100dvh] w-screen bg-[#f4f2ef] overflow-auto font-sans text-stone-800 p-6">
    <header class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold tracking-tight">Kitchen Dashboard</h1>
      <router-link to="/settings" class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
      </router-link>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="order in activeOrders" :key="order.id" class="bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 flex flex-col gap-4">
        
        <div class="flex justify-between items-start">
          <div>
            <div class="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Order #{{ order.id.slice(-4).toUpperCase() }}</div>
            <div class="text-lg font-bold">Table {{ order.table || 'Walk-in' }}</div>
          </div>
          <div class="px-2 py-1 rounded text-xs font-bold uppercase tracking-wider" :class="statusClass(order.status)">
            {{ order.status }}
          </div>
        </div>

        <div class="bg-stone-50 rounded-xl p-3 text-sm">
          <ul class="space-y-2">
            <li v-for="(amount, ing) in order.recipe" :key="ing" class="flex justify-between">
              <span class="capitalize text-stone-600">{{ ing }}</span>
              <span class="font-medium">{{ amount }}{{ ing === 'espresso' ? 'x' : 'ml' }}</span>
            </li>
          </ul>
        </div>

        <!-- Actions -->
        <div class="mt-auto pt-4 flex gap-2">
          <!-- Pending: Set Price -->
          <div v-if="order.status === 'pending'" class="w-full flex gap-2">
            <input type="number" v-model.number="tempPrices[order.id]" placeholder="Price ($)" class="flex-1 bg-stone-100 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-stone-400" />
            <button @click="setPrice(order.id)" class="bg-stone-900 text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-stone-800 transition-colors">Accept</button>
          </div>
          
          <div v-else-if="order.status === 'priced'" class="w-full text-center text-sm text-stone-500 py-2">
            Waiting for customer...
          </div>
          
          <button v-else-if="order.status === 'accepted'" @click="markReady(order.id)" class="w-full bg-green-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-green-700 transition-colors">
            Mark as Ready
          </button>
          
          <button v-else-if="order.status === 'ready'" @click="completeOrder(order.id)" class="w-full bg-stone-200 text-stone-700 rounded-xl py-3 text-sm font-semibold hover:bg-stone-300 transition-colors">
            Complete (Picked Up)
          </button>
        </div>
        
      </div>
      
      <div v-if="activeOrders.length === 0" class="col-span-full py-20 text-center text-stone-400">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mx-auto mb-4 opacity-50"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>
        <p class="text-lg">No active orders</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useOrdersStore } from '../stores/orders'

const ordersStore = useOrdersStore()
const tempPrices = ref({})

onMounted(() => {
  ordersStore.initSync()
})

const activeOrders = computed(() => {
  return ordersStore.orders.filter(o => o.status !== 'completed').reverse()
})

const statusClass = (status) => {
  switch(status) {
    case 'pending': return 'bg-yellow-100 text-yellow-700'
    case 'priced': return 'bg-blue-100 text-blue-700'
    case 'accepted': return 'bg-orange-100 text-orange-700'
    case 'ready': return 'bg-green-100 text-green-700'
    default: return 'bg-stone-100 text-stone-700'
  }
}

const setPrice = (id) => {
  if(tempPrices.value[id]) {
    ordersStore.setOrderPrice(id, tempPrices.value[id])
  }
}

const markReady = (id) => {
  ordersStore.updateOrderStatus(id, 'ready')
}

const completeOrder = (id) => {
  ordersStore.updateOrderStatus(id, 'completed')
}
</script>
