<script>
import api from "./api/api";

export default {
  name: "app",
  data: function () {
    return {
      task: {},
      inputValue: "",
      checked: false
    };
  },
  created() {
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
      ;
    },
    deleteTask(id) {
      api.delete(`/tasks/${id}`).then(() => {
        console.log('Tarefa deletada com sucesso')
      }).catch((error) => {
        console.log(error);
      });
      location.reload()
    },
    postTask(inputValue) {
      api.post("/tasks", { "content": inputValue, "checked": this.checked }).then(() => {
        console.log('Tarefa cadastrada com sucesso')
      }).catch((error) => {
        console.log(error);
      });
      location.reload()
    },
    // checkedTask(id) {
    //   this.checked = !this.checked;
    //   api.patch(`/tasks/${id}`, { "checked": this.checked }).then(() => {
    //     console.log('Status da tarefa atualizada com sucesso')
    //   }).catch((error) => {
    //     console.log(error);
    //   });
    // }
  }
}


</script>

<template>
  <header>
    <h1>Lista de Tarefas</h1>
  </header>
  <section>
    <div class="todo-container">
      <div class="input-container">
        <input type="text" autofocus placeholder="Digite uma tarefa" v-model="inputValue"
          v-on:keyup.enter="postTask(inputValue)" />
        <button v-on:click="postTask(inputValue)">Adicionar</button>
      </div>
      <div class="tasks-list">
        <div class="task-container" v-for="item in task">
          <div>
            <!-- <input type="checkbox" v-on:click="checkedTask(item.id)" /> -->
            <span>{{ item.content }}</span>
          </div>
          <div>
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
}

.tasks-list {
  width: 76%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  padding-left: 40px;
}

.task-container {
  display: flex;
  align-items: center;
  height: 4vh;
  border-bottom: solid 1px #4554b1;
  margin-bottom: 30px;
  justify-content: space-between;
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
