<script setup>
import { useQuery, useMutation } from 'villus';
import { ref } from 'vue'
import { createTask, deleteTask, updateTask, getTasks } from '../graphql';
import { useUserStore } from '../store'

const iduser = useUserStore();

const variables = ref({
  user_id: iduser.loggedId
})

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
  if (newValue == "" ) {
    return
  }
  const { execute } = useMutation(createTask, {
    refetchTags: ['query'],
  })
  execute({
    content: value,
    user_id: iduser.loggedId
  }),
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
  const newValue = value.trim()
  if (newValue == "" ) {
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
  variables,
  tags: ['query']
});

</script>

<template>
  <div class="container shadow-2 rounded-borders">
    <div class="q-mt-lg">
      <div class="row q-pl-xl items-end">
        <q-input
            class="col-8"
            autofocus
            label="Digite uma tarefa" 
            v-model="inputAdd"
            v-on:keyup.enter="addTask(inputAdd)"
        />
        <q-btn class="q-ml-md col-2" color="primary" label="Adicionar" @click="addTask(inputAdd)"/>
      </div>
      <div class="q-pa-xl" v-if="data">
        <div class="row q-mb-md" v-for="task in data.allTasks">
          <span class="task">{{ task.content }}</span>
        <div>
            <q-btn class="q-mr-md q-ml-md" label="Editar" color="primary" @click="openModal(task.id, task.content)"/>
            <q-dialog v-model="modalIsOpen" persistent>
              
              <q-card style="min-width: 350px">
                <q-card-section class="row justify-center">
                  <div class="text-h6">Editar Tarefa</div>
                </q-card-section>

                <q-card-section class="q-pt-xs">
                  <q-input dense v-model="inputUpdate" autofocus @keyup.enter="upTask(inputUpdate, modalId)" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                  <q-btn flat label="Cancelar" v-close-popup />
                  <q-btn flat label="Confirmar" @click="upTask(inputUpdate, modalId)" />
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
  width: 35.5rem;
  overflow-wrap: break-word;
  border-bottom: solid 1px #d1d1d1;
}

</style>