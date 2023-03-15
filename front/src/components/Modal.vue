<script setup>
import { ref } from 'vue';

const inputUpdate = ref('')

const props = defineProps({
  isOpen: Boolean,
  modalId: '',
})
</script>

<template>
  <div :class="[isOpen ? 'modal' : 'hidden']">
    <div class="outside" @click="$emit('toggleModal')"></div>
    <div class="content-modal">
      <input class="input-modal" type="text" placeholder="Digite a nova tarefa" v-model="inputUpdate"
        v-on:keyup.enter="$emit('upTask', inputUpdate, modalId)" />
      <div class="row-buttons">
        <button class="cancel-button" @click="$emit('toggleModal')">Cancelar</button>
        <button class="update-button" @click="$emit('upTask', inputUpdate, modalId)">Atualizar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hidden {
  display: none;
}

.modal {
  display: flex;
  position: absolute;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

.content-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: 40%;
  height: 10%;
  z-index: 9999;
  margin-top: 30vh;
}

.input-modal {
  width: 90%;
  border: none;
  border-bottom: solid 1px #4554b1;
  padding: 10px;
}

.row-buttons {
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 50%;
  padding-top: 10px;
}

.update-button,
.cancel-button {
  width: 45%;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.update-button {
  background-color: #4554b1;
  color: #fff;
}

.outside {
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 0;
}
</style>