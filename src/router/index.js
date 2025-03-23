
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from "@/pages/LandingPage.vue";
import Introduce from "@/pages/Introduce.vue";
import TestGame from "@/pages/TestGame.vue";
import Box from "@/pages/Box.vue";

const routes = [
  {
    path: '/',
    name: 'Game',
    component: LandingPage,
  },
  {
    path: '/home',
    name: 'home',
    component: Introduce,
  },
  {
    path: '/test',
    name: 'test',
    component: TestGame,
  },
  {
    path: '/box',
    name: 'box',
    component: Box,
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
