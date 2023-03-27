<script setup>
import TaskList from '../components/TaskList.vue'
import router from '../routes';
import { useUserStore } from '../store'

const userid = useUserStore()

const loggout = () => {
  userid.$reset()
  router.push({path: '/'})
}

</script>
<template>
  <q-layout class="container flex flex-center">
    <q-header elevated class="header flex text-white">
      <div class="flex justify-between items-center" style="width: 55%;">
      <q-btn flat icon="menu">
         <q-menu anchor="bottom middle" self="top middle">
           <q-item clickable @click="loggout">
             <q-item-section>Sair</q-item-section>
           </q-item>
         </q-menu>
      </q-btn>
      <span>Lista de Tarefas</span>
    </div>
    
    </q-header>
    <TaskList />
  </q-layout>
</template>
<style scoped>
.header{
  height: 50px; 
  font-size: 1.8em
}

</style>