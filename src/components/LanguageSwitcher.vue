<template>
  <div class="relative" ref="switcherRef">
    <!-- Globe Toggle Button -->
    <button 
      @click="isOpen = !isOpen"
      class="w-10 h-10 bg-white/60 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)] active:scale-90 transition-transform text-stone-600 focus:outline-none"
      aria-label="Change Language"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <transition name="dropdown">
      <div 
        v-if="isOpen"
        class="absolute right-0 mt-2 w-36 bg-white/95 backdrop-blur-xl border border-stone-200/80 rounded-2xl shadow-xl py-2 z-50 flex flex-col gap-1 overflow-hidden"
      >
        <button 
          v-for="(name, code) in languages" 
          :key="code"
          @click="selectLanguage(code)"
          class="px-4 py-2 text-left text-xs font-semibold hover:bg-stone-50 transition-colors flex items-center justify-between"
          :class="code === locale ? 'text-stone-900 bg-stone-100/50' : 'text-stone-500'"
        >
          <span>{{ name }}</span>
          <span class="text-[9px] uppercase font-bold px-1.5 py-0.5 bg-stone-100 text-stone-400 rounded" v-if="code === locale">active</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const isOpen = ref(false);
const switcherRef = ref(null);

const languages = {
  en: 'English',
  fa: 'فارسی',
  ar: 'العربية',
  tr: 'Türkçe',
  es: 'Español',
  it: 'Italiano'
};

const selectLanguage = (code) => {
  locale.value = code;
  localStorage.setItem('coffee_builder_lang', code);
  isOpen.value = false;
};

// Close dropdown on click outside
const handleClickOutside = (event) => {
  if (switcherRef.value && !switcherRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}
</style>
