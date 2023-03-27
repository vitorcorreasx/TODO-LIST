import {createRouter, createWebHashHistory} from 'vue-router'

import Login from "../views/Login.vue"
import List from "../views/List.vue"


const routes = [
  { path: '/', component: Login },
  { path: '/list', component: List},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})
export default router;