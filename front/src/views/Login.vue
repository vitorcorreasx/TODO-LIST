<script setup>
import { ref } from 'vue'
import { useQuery } from 'villus';
import router from '../routes';
import { login } from '../graphql/index'
import { useUserStore } from '../store'

const username = ref(null)
const password = ref(null)

const signIn = async (username, password) => {
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
        userId: data.data.value.loginUser.user_id
      })
      router.push({path: 'list'})
    }
  })
};
const signUp = () => {
  router.push({path: 'singup'})
}

</script>

<template>
  <q-layout class="column flex-center">
    <div class="container">
    <q-form class="column" @submit="signIn(username, password)">
      <q-input v-model="username" label="Usuario"/>
      <q-input v-model="password" label="Senha"/>
      <q-btn class="q-mt-md q-mb-md" type="submit" color="primary" label="Entrar"/>
    </q-form>
    <span>Novo por aqui?
      <q-btn  no-caps flat class="text-primary">Cadastre-se</q-btn>
    </span>
  </div>
  </q-layout>

</template>

<style scoped>
.container{
  width: 20%;
}

</style>