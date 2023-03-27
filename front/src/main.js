import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import router from './routes'
import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import {createClient} from 'villus'

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

const pinia = createPinia()
pinia.use(piniaPersist)

const client = createClient({url: API_ENDPOINT})

const app = createApp(App)
app.use(client)
app.use(Quasar)
app.use(router)
app.use(pinia)

app.mount('#app')
