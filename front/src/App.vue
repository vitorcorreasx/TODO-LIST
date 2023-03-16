<script setup>
import TaskList from './components/TaskList.vue'

</script>

<template>
  <div>
    <q-layout class="container flex flex-center">
      <q-header 
        elevated 
        style="height: 50px; font-size: 1.8em" 
        class="flex flex-center text-white"
        >Lista de Tarefas
      </q-header>
      <TaskList />
    </q-layout>
  </div>
</template>

