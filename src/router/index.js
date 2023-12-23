import { createRouter, createWebHistory } from 'vue-router'
import ScraperView from '../views/ScraperView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ScraperView
    }
  ]
})

export default router
