import { createI18n } from 'vue-i18n';

import en from './locales/en.json';
import tr from './locales/tr.json';
import fa from './locales/fa.json';
import ar from './locales/ar.json';
import es from './locales/es.json';
import it from './locales/it.json';

const messages = {
  en,
  tr,
  fa,
  ar,
  es,
  it
};

// Check local storage for saved language or fallback to browser language
const getSavedLocale = () => {
  const saved = localStorage.getItem('coffee_builder_lang');
  if (saved && messages[saved]) return saved;
  const browserLang = navigator.language.split('-')[0];
  if (messages[browserLang]) return browserLang;
  return 'en'; // default fallback
};

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: getSavedLocale(),
  fallbackLocale: 'en',
  messages,
});

export default i18n;
