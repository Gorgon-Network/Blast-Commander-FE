/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { initBaseMiniApp } from './plugins/baseMiniAppSdk';
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import {store} from './store/store'
import 'aos/dist/aos.css';
import AOS from 'aos';
const app = createApp(App)
app.use(store)

registerPlugins(app)

initBaseMiniApp().then(() => {
  app.mount('#app');
});

AOS.init();
