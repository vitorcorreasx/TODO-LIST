import { createApp } from 'vue'
import App from './App.vue'

import {createClient} from 'villus'

const client = createClient({
  url: 'http://localhost:64001/'
})

const app = createApp(App)
app.use(client)

app.mount('#app')
