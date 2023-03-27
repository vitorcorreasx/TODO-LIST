<script setup>
import { ref } from 'vue'
import { useQuery } from 'villus';
import router from '../routes';
import { login } from '../graphql/index'
import { useUserStore } from '../store'

const username = ref(null)
const password = ref(null)

const onSubmit = async (username, password) => {
  const store = useUserStore()
   await useQuery({
    query: login,
    variables:{
      username: username,
      password: password
    },
  }).then((data) => {
    if(data.data.value.loginUser){
      store.$patch({
        userId: data.data.value.loginUser.id_user
      }) 
      router.push({path: 'list'})
    }
  })
};

</script>

<template>
  <q-layout class="column flex-center">
    <q-form @submit="onSubmit(username, password)">
      <q-input v-model="username" label="Usuario"/>
      <q-input v-model="password" label="Senha"/>
        <q-btn type="submit" color="primary" label="Entrar"/>
    </q-form>
  </q-layout>
</template>