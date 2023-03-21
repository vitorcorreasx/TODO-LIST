import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import 'quasar/dist/quasar.css'
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

import {createClient} from 'villus'

const client = createClient({url: API_ENDPOINT})

const app = createApp(App)
app.use(client)
app.use(Quasar)

app.mount('#app')
