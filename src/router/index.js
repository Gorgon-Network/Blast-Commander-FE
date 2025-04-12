
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import Box from "@/pages/Box.vue";
import Equipment from "@/pages/Equipment.vue";
import Home from '@/pages/Home.vue';
import TestGame from "@/pages/TestGame.vue";
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/game',
    name: 'Game',
    component: TestGame,
  },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/box',
    name: 'box',
    component: Box,
  },
  {
    path: '/equipment',
    name: 'equipment',
    component: Equipment,
  },
  // Add more routes as needed
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
