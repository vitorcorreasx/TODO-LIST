<script setup>
import 'primeicons/primeicons.css';
import { useQuery, useMutation } from 'villus';
import { ref } from 'vue'
import { createTask, deleteTask, updateTask, getTasks } from '../graphql';

const inputAdd = ref('')
const modalIsOpen = ref(false)
const modalId = ref(null)
const inputUpdate = ref('')

const openModal = (id, value) => {
  modalIsOpen.value = !modalIsOpen.value
  modalId.value = id
  inputUpdate.value = value
}
const addTask = (value) => {
  const newValue = value.trim()
  if (newValue == '') {
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
  <div class="container shadow-2 rounded-borders">
    <div class="column q-mt-lg">
      <div class="row q-pl-xl items-end">
        <q-input class="col-8" autofocus label="Digite uma tarefa" v-model="inputAdd"
          v-on:keyup.enter="addTask(inputAdd)" />
        <q-btn class="q-ml-xl col-2" color="primary" label="Adicionar" @click="addTask(inputAdd)"/>
      </div>
      <div class="q-pa-xl" v-if="data">
        <div class="row q-mb-md" v-for="task in data.allTasks">
          <span class="task">{{ task.content }}</span>
        <div>
            <q-btn class="q-mr-md q-ml-xl" label="Editar" color="primary" @click="openModal(task.id, task.content)"/>
            <q-dialog v-model="modalIsOpen" persistent>
              
              <q-card style="min-width: 350px">
                <q-card-section class="row justify-center">
                  <div class="text-h6">Editar Tarefa</div>
                </q-card-section>

                <q-card-section class="q-pt-xs">
                  <q-input dense v-model="inputUpdate" autofocus @keyup.enter="upTask(inputUpdate, modalId)" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                  <q-btn flat label="Cancel" v-close-popup />
                  <q-btn flat label="Editar" v-close-popup @click="upTask(inputUpdate, modalId)" />
                </q-card-actions>

              </q-card>
            </q-dialog>
            <q-btn color="red" label="delete" @click="delTask(task.id)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container{
  width: 56rem;
  height: 50rem;
  overflow-y: scroll;
  
}
.task{
  width: 35rem;
  overflow-wrap: break-word;
  border-bottom: solid 1px #d1d1d1;
}

</style>