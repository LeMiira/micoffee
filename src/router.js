import { createRouter, createWebHashHistory } from 'vue-router'
import BuilderView from './views/BuilderView.vue'
import ShopView from './views/ShopView.vue'
import KitchenView from './views/KitchenView.vue'
import SettingsView from './views/SettingsView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BuilderView
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopView
    },
    {
      path: '/kitchen',
      name: 'kitchen',
      component: KitchenView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    }
  ]
})

export default router
