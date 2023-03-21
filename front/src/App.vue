<script setup>
import TaskList from './components/TaskList.vue'

</script>

<template>
    <q-layout class="container flex flex-center">
      <q-header 
        elevated 
        class="header flex flex-center text-white"
        >Lista de Tarefas
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

