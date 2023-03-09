<script>
import { ref } from "vue";
import api from "./api/api";
import 'primeicons/primeicons.css';

export default {
  name: "app",
  data: function () {
    return {
      task: {},
      inputValue: "",
      modalIsOpen: ref(false),
      modalId: ""
    };
  },
  mounted() {
    this.getTask();
  },
  methods: {
    getTask() {
      api.get("/tasks").then((res) => {
        this.task = res.data;
        console.log(this.task)
      }).catch((error) => {
        console.log(error);
      });
    },
    async deleteTask(id) {
      await api.delete(`/tasks/${id}`).then(() => {
        console.log('Tarefa deletada com sucesso')
      }).catch((error) => {
        console.log(error);
      });
      this.getTask()
    },
    async postTask(inputValue) {
      if (inputValue == "" || inputValue == " ") {
        alert("Campo vazio")
      } else {
        await api.post("/tasks", { "content": inputValue }).then(() => {
          console.log('Tarefa cadastrada com sucesso')
        }).catch((error) => {
          console.log(error);
        });
        this.getTask()
      }
    },
    openModal(id) {
      this.modalIsOpen = !this.modalIsOpen
      this.modalId = id;
    },
    async updateTask(inputValue) {
      if (inputValue == "" || inputValue == " ") {
        alert("Campo vazio")
      } else {
        await api.put(`/tasks/${this.modalId}`, { "content": inputValue }).then(() => {
          console.log('Tarefa atualizada com sucesso')
        }).catch((error) => {
          console.log(error);
        });
        this.getTask()
        this.openModal()
      }
    }
  }
}
</script>

<template>
  <header>
    <h1>Lista de Tarefas</h1>
  </header>
  <section>
    <div class="hidden" :class="{ modal: modalIsOpen }">
      <div class="outside" v-on:click="openModal()"></div>
      <div class="content-modal">
        <input type="text" autofocus placeholder="Digite a nova tarefa" v-model="inputValue"
          v-on:keyup.enter="updateTask(inputValue)" />
        <button v-on:click="updateTask(inputValue)">Atualizar</button>
      </div>
    </div>

    <div class="todo-container">
      <div class="input-container">
        <input type="text" autofocus placeholder="Digite uma tarefa" v-model="inputValue"
          v-on:keyup.enter="postTask(inputValue)" />
        <button v-on:click="postTask(inputValue)">Adicionar</button>
      </div>
      <div class="tasks-container">
        <div class="task-list" v-for="item in task">
          <div>
            <span>{{ item.content }}</span>
          </div>
          <div>
            <button class="edit-button" v-on:click="openModal(item.id)">
              <i class="pi pi-pencil"></i>
            </button>
            <button class="delete-button" v-on:click="deleteTask(item.id)">✖</button>
          </div>

        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10vh;
  background-color: #4554b1;
  color: white;
}

section {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 90vh;
  background-color: #e3e9ff;
}

.todo-container {
  width: 30vw;
  min-width: 400px;
  min-height: 40vh;
  background-color: white;
  box-shadow: 3px 3px 7px 1px rgba(0, 0, 0, 0.3);
}

.input-container {
  padding: 40px;
}

.input-container input {
  width: 60%;
  height: 3vh;
  border: none;
  border-bottom: solid 1px #4554b1;
}

.input-container input:focus {
  border: none;
  border-bottom: solid 2px #4554b1;
  ;
  outline: none;
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

.tasks-container {
  width: 76%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  padding-left: 40px;
}

.task-list {
  display: flex;
  align-items: center;
  height: 4vh;
  border-bottom: solid 1px #4554b1;
  margin-bottom: 30px;
  justify-content: space-between;
}

.edit-button {
  margin-right: 10px;
  border: none;
  background-color: none;
}

.delete-button {
  width: 20px;
  border: none;
  color: white;
  background-color: red;
  border-radius: 100px;
  cursor: pointer;
}


.hidden {
  display: none;
}

.modal {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
}

.outside {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.content-modal {
  display: flex;
  width: 50vw;
  height: 5vh;
  margin-top: 20vh;
  padding: 2px;
  z-index: 0;
}

.content-modal input {
  width: 90%;
  border: solid 2px #4554b1;
  padding: 10px;
  border-radius: 5px;

}

.content-modal button {
  width: 20%;
  height: 45px;
  margin-left: 10px;
  border-radius: 3px;
  border: none;
  background-color: #4554b1;
  color: white;
  cursor: pointer;
}
</style>
