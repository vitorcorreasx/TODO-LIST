<script setup>
import TaskList from './components/TaskList.vue'

</script>

<template>
  <div class="container">
    <div class="header"> Lista de Tarefas </div>
    <TaskList />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10vh;
  width: 100vw;
  background-color: #4554b1;
  color: white;
  font-size: 30px;
}
</style>
