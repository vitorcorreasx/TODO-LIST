<script setup>
import 'primeicons/primeicons.css';
import { useQuery, useMutation } from 'villus';
import { ref } from 'vue'
import { createTask, deleteTask, updateTask, getTasks } from '../helpers/api';
import Modal from './Modal.vue'

const inputAdd = ref(null)
const modalIsOpen = ref(false)
const modalId = ref(null)
// const inputUpdate = ref(null)

const OpenModal = (id) => {
  modalIsOpen.value = !modalIsOpen.value
  modalId.value = id
}

const addTask = (value) => {
  if (value == null || value == " ") {
    alert('Campo vazio')
    return
  }
  const { execute } = useMutation(createTask, {
    refetchTags: ['query'],
  })
  execute({
    text: value
  })
  inputAdd.value = ""
}
const delTask = (id) => {
  const { execute } = useMutation(deleteTask, {
    refetchTags: ['query'],
  })
  execute({
    id: id
  })
}
const upTask = (value, id) => {
  if (value == "" || value == " ") {
    alert('Campo vazio')
    return
  }
  const { execute } = useMutation(updateTask, {
    refetchTags: ['query'],
  })
  execute({
    id: id,
    content: value
  })
  modalIsOpen.value = false
}
const { data } = useQuery({
  query: getTasks,
  tags: ['query']
});
</script>

<template>
  <Modal :inputUpdate="inputUpdate" :modalId="modalId" :isOpen="modalIsOpen" @toggleModal="OpenModal" @upTask="upTask" />
  <div class="container">
    <div class="todo-container">
      <div class="input-container">
        <input type="text" autofocus placeholder="Digite uma tarefa" v-model="inputAdd"
          v-on:keyup.enter="addTask(inputAdd)" />
        <button @click="addTask(inputAdd)">Adicionar</button>
      </div>
      <div class="tasks-container" v-if="data">
        <div class="task-list" v-for="task in data.allTasks">
          <span>{{ task.content }}</span>
          <div>
            <button class="edit-button" @click="OpenModal(task.id)">
              <i class="pi pi-pencil"></i>
            </button>
            <button class="delete-button" @click="delTask(task.id)">✖</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  box-shadow: 3px 3px 7px 1px rgba(0, 0, 0, 0.3);
  padding-top: 50px;
  width: 50vw;
  height: 80vh;
  justify-content: center;
  overflow: scroll;
}

.input-container input {
  width: 60%;
  height: 3vh;
  border: none;
  border-bottom: solid 1px #4554b1;
}

.input-container button {
  width: 20%;
  height: 3vh;
  margin-left: 10px;
  border-radius: 3px;
  border: none;
  background-color: #4554b1;
  color: white;
  cursor: pointer;
}

.todo-container {
  width: 80%;
}

.task-list {
  display: flex;
  align-items: center;
  height: 4vh;
  border-bottom: solid 1px #4554b1;
  margin-bottom: 30px;
  justify-content: space-between;
  margin-top: 50px;

}

.task-list span {
  width: 90%;
  overflow-wrap: break-word;
}

.edit-button {
  margin-right: 10px;
  border: none;
  background-color: #fff;
  cursor: pointer;
}

.delete-button {
  width: 20px;
  border: none;
  color: white;
  background-color: red;
  border-radius: 100px;
  cursor: pointer;
}
</style>