<script setup>
import { ref, computed, watch} from 'vue'
import { useQuery } from 'villus';
import router from '../routes';
import { login } from '../graphql/index'
import { useUserStore } from '../store'
import { colors, useQuasar } from 'quasar';

const $q = useQuasar()
const username = ref(null)
const password = ref(null)
const isPwd = ref(true)

const visible = computed(() => isPwd.value ? 'visibility_off' : 'visibility')
const type = computed(() => isPwd.value ? 'password' : 'text')

const showPassword = () => {
  isPwd.value = !isPwd.value
}

const signIn = async (username, password) => {
  const store = useUserStore()
   await useQuery({
    query: login,
    variables:{
      username: username,
      password: password
    },
  }).then(({data}) => {
    if(data.value === undefined){
      $q.notify({
        type: 'negative',
        message: 'Campos vázios!',
        position: 'top-right'
      })
      return
    }
    if(datavalue.loginUser){
      store.$patch({
        userId: data.value.loginUser.user_id
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
      <q-input v-model="password" label="Senha" :type="type">
        <template v-slot:append>
          <q-icon
            :name="visible"
            class="cursor-pointer"
            @click="showPassword"
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