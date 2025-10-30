/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { sdk } from '@farcaster/miniapp-sdk';
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import {store} from './store/store'
import 'aos/dist/aos.css';
import AOS from 'aos';
// Once app is ready to be displayed
await sdk.actions.ready();
const app = createApp(App)
app.use(store)

registerPlugins(app)

app.mount('#app')

AOS.init();
