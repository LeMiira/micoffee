<template>
  <div class="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:px-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>
    
    <!-- Modal -->
    <div class="relative bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl animate-slide-up flex flex-col gap-6 font-sans">
        
       <div class="flex justify-between items-center">
           <h2 class="text-2xl font-bold tracking-tight">{{ $t('modal.completeOrder') }}</h2>
           <button @click="$emit('close')" class="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
           </button>
       </div>

       <div class="space-y-4">
            <div>
                <label class="block text-sm font-semibold text-stone-600 mb-1.5 ml-1">{{ $t('modal.nameLabel') }}</label>
                <input v-model="name" type="text" :placeholder="$t('modal.namePlaceholder')" class="w-full bg-stone-50 border-none rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-stone-900 transition-shadow outline-none text-base placeholder:text-stone-400">
            </div>
            
            <div>
                <label class="block text-sm font-semibold text-stone-600 mb-1.5 ml-1">{{ $t('modal.tableLabel') }}</label>
                <input v-model="table" type="number" :placeholder="$t('modal.tablePlaceholder')" class="w-full bg-stone-50 border-none rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-stone-900 transition-shadow outline-none text-base placeholder:text-stone-400">
            </div>
       </div>

       <!-- Drink Summary -->
       <div class="bg-stone-50 rounded-2xl p-4 flex flex-col gap-2">
           <div class="text-xs uppercase tracking-widest font-bold text-stone-400">{{ $t('modal.orderSummary') }}</div>
           <p class="text-sm font-medium text-stone-700 capitalize leading-relaxed">
               {{ summaryText }}
           </p>
       </div>

       <div class="pt-2">
           <button @click="submitOrder" :disabled="!isReady" class="w-full bg-stone-900 text-white rounded-full py-4 text-base font-bold disabled:opacity-50 disabled:active:scale-100 active:scale-95 transition-all flex items-center justify-center gap-2">
              <span v-if="success">{{ $t('modal.orderSent') }}</span>
              <span v-else>{{ $t('modal.sendToKitchen') }}</span>
              <svg v-if="success" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
           </button>
       </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useRecipe } from '../composables/useRecipe'
import { useOrdersStore } from '../stores/orders'

const emit = defineEmits(['close'])
const { recipe, isIced, resetRecipe } = useRecipe()
const store = useOrdersStore()
const router = useRouter()
const { t } = useI18n()

const name = ref('')
const table = ref('')
const success = ref(false)

onMounted(() => {
    // Check main search params first (e.g. /?table=12#/ or /?table=12)
    let params = new URLSearchParams(window.location.search)
    if(params.has('table')) {
        table.value = params.get('table')
        return
    }
    // Check hash query params (e.g. /#/?table=12)
    const hashParts = window.location.hash.split('?')
    if(hashParts.length > 1) {
        params = new URLSearchParams(hashParts[1])
        if(params.has('table')) {
            table.value = params.get('table')
        }
    }
})

const isReady = computed(() => {
    return table.value.trim() !== '' && !success.value
})

const summaryText = computed(() => {
    const parts = [isIced.value ? t('general.iced') : t('general.hot')]
    Object.entries(recipe.value).forEach(([id, amt]) => {
        if(amt > 0) parts.push(`${amt}${id==='espresso'?'x':'ml'} ${t('ingredients.' + id)}`)
    })
    return parts.join(', ')
})

const submitOrder = () => {
    if(!isReady.value) return

    const orderId = store.addOrder({
        customerName: name.value,
        tableNumber: table.value,
        recipe: { ...recipe.value },
        isIced: isIced.value
    })
    
    localStorage.setItem('my_latest_order', orderId)

    success.value = true
    
    setTimeout(() => {
        resetRecipe()
        emit('close')
    }, 1500)
}
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
</style>
