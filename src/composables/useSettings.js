import { ref, watch } from 'vue';

const defaultIngredients = [
  { id: 'coffee', type: 'base', max: 100 },
  { id: 'espresso', type: 'base', max: 4 },
  { id: 'milk', type: 'milk', max: 100 },
  { id: 'lactoseFree', type: 'milk', max: 100 },
  { id: 'oatMilk', type: 'milk', max: 100 },
  { id: 'chocolate', type: 'flavor', max: 50 },
  { id: 'cocoa', type: 'flavor', max: 30 },
  { id: 'sugar', type: 'flavor', max: 10 },
  { id: 'vanilla', type: 'flavor', max: 10 },
  { id: 'caramel', type: 'flavor', max: 30 },
  { id: 'foam', type: 'topping', max: 50 },
  { id: 'ice', type: 'topping', max: 100 },
  { id: 'cinnamon', type: 'topping', max: 10 },
];

const availableIngredients = ref({});
const isInitialized = ref(false);

const initSettings = () => {
  if (isInitialized.value) return;
  const saved = localStorage.getItem('coffee_admin_settings');
  if (saved) {
    availableIngredients.value = JSON.parse(saved);
  } else {
    resetSettings();
  }
  isInitialized.value = true;
};

const resetSettings = () => {
  const defaults = {};
  defaultIngredients.forEach(ing => {
    defaults[ing.id] = true;
  });
  availableIngredients.value = defaults;
  saveSettings();
};

const saveSettings = () => {
  localStorage.setItem('coffee_admin_settings', JSON.stringify(availableIngredients.value));
};

watch(availableIngredients, saveSettings, { deep: true });

export function useSettings() {
  initSettings();
  
  return {
    defaultIngredients,
    availableIngredients,
    resetSettings
  };
}
