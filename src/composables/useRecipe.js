import { ref, computed } from 'vue';
import { useSettings } from './useSettings';

const { defaultIngredients, availableIngredients } = useSettings();

const recipe = ref({});
const isIced = ref(false);

const initRecipe = () => {
    defaultIngredients.forEach(ing => {
        recipe.value[ing.id] = 0;
    });
};

initRecipe();

export function useRecipe() {
    
  const activeIngredients = computed(() => {
     return defaultIngredients.filter(ing => availableIngredients.value[ing.id]);
  });
  
  const setIngredient = (id, amount) => {
      const ingDef = defaultIngredients.find(ing => ing.id === id);
      if (ingDef && ingDef.type === 'milk' && amount > 0) {
          defaultIngredients.filter(ing => ing.type === 'milk' && ing.id !== id).forEach(ing => {
              recipe.value[ing.id] = 0;
          });
      }
      recipe.value[id] = amount;
  };
  
  const resetRecipe = () => {
      initRecipe();
      isIced.value = false;
  };
  
  const applyPreset = (presetRecipe, iced = false) => {
      resetRecipe();
      Object.keys(presetRecipe).forEach(key => {
          if (recipe.value[key] !== undefined) {
             recipe.value[key] = presetRecipe[key];
          }
      });
      isIced.value = iced;
  };

  const totalVolume = computed(() => {
      return Object.values(recipe.value).reduce((acc, val) => acc + (Number(val) || 0), 0);
  });
  
  const intensity = computed(() => {
      const espresso = recipe.value['espresso'] || 0;
      const coffee = recipe.value['coffee'] || 0;
      const total = totalVolume.value > 0 ? totalVolume.value : 1;
      return Math.min(100, Math.round(((espresso * 30 + coffee) / total) * 100));
  });

  return {
    recipe,
    isIced,
    activeIngredients,
    setIngredient,
    resetRecipe,
    applyPreset,
    totalVolume,
    intensity
  };
}
