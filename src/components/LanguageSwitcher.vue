<template>
  <div class="relative z-50">
    <div class="flex bg-white/50 backdrop-blur-md border border-white/80 p-1 rounded-xl shadow-sm">
      <button 
        v-for="(name, code) in languages" 
        :key="code"
        @click="selectLanguage(code)"
        class="px-3.5 py-1.5 text-[10px] uppercase font-bold rounded-lg transition-all"
        :class="code === locale ? 'bg-white text-[#5a473d] shadow-sm' : 'text-[#816252] hover:bg-white/40'"
      >
        {{ code }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

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
};
</script>
