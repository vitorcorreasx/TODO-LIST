<script setup>
import { ref } from 'vue'
import { useQuery } from 'villus';
import router from '../routes';
import { login } from '../graphql/index'
import { useUserStore } from '../store'
import { useQuasar } from 'quasar';

const $q = useQuasar()
const username = ref(null)
const password = ref(null)
const isPwd = ref(true)

const signIn = async (username, password) => {
  const store = useUserStore()
   await useQuery({
    query: login,
    variables:{
      username: username,
      password: password
    },
  }).then((data) => {
    if(data.data.value === undefined){
      $q.notify({
        type: 'negative',
        message: 'Campos vázios!',
        position: 'top-right'
      })
      return
    }
    if(data.data.value.loginUser){
      store.$patch({
        userId: data.data.value.loginUser.user_id
      })
      router.push({path: 'list'})
    }else {
      $q.notify({
        type: 'negative',
        message: 'Usuario ou senha inválida!',
        position: 'top-right'
      })
    }
  })
};

</script>

<template>
  <q-layout class="column flex-center">
    <div class="container">
    <q-form class="column" @submit="signIn(username, password)">
      <q-input v-model="username" label="Usuario"/>
      <q-input v-model="password" label="Senha" :type="isPwd ? 'password' : 'text'">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn class="q-mt-sm q-mb-md text-right" type="submit" color="primary" label="Entrar"/>
    </q-form>
    <span>
      Novo por aqui?
      <q-btn label="Cadastre-se" @click="router.push({path: 'signup'})" no-caps flat class="text-primary"/>
    </span>
  </div>
  </q-layout>

</template>

<style scoped>
.container{
  width: 20%;
}

</style>