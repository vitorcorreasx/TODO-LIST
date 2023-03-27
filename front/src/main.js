import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import router from './routes'
import 'quasar/dist/quasar.css'
import { createPinia } from 'pinia'
import {createClient} from 'villus'

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

const pinia = createPinia()

const client = createClient({url: API_ENDPOINT})

const app = createApp(App)
app.use(client)
app.use(Quasar)
app.use(router)
app.use(pinia)

app.mount('#app')
