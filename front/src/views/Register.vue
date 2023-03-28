<script setup>
import { ref } from 'vue'
import { useMutation } from 'villus';
import router from '../routes';
import { register } from '../graphql/index'
import { useUserStore } from '../store'
import { useQuasar } from 'quasar';

const $q = useQuasar()
const username = ref('')
const password = ref('')
const isPwd = ref(true)

const signUp = (username, password) => {
  const newUsername = username.trim()
  const newPassword = password.trim()
  const store = useUserStore()
  const { execute } = useMutation(register)
  
  if(newUsername || newPassword != ''){
    execute({
      username: newUsername,
      password: newPassword
    }).then((data) => {
        if(data.data.createUser == null){
          $q.notify({
            type: 'negative',
            message: 'Usuário ja existe!',
            position: 'top-right'
          })
          return
        }
        if(data.data.createUser.user_id){
          store.$patch({
              userId: data.data.createUser.user_id
            })
          router.push('list')
          $q.notify({
            type: 'positive',
            message: 'Cadastrado com sucesso',
            position: 'top-right'
          })
        }
      })
  } else {
    $q.notify({
      type: 'negative',
      message: 'Campos vázios!',
      position: 'top-right'
    })
  }
};
</script>

<template>
  <q-layout class="column flex-center">
    <div class="container">
    <q-form class="column" @submit="signUp(username, password)">
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
      <q-btn class="q-mt-md q-mb-md" type="submit" color="primary" label="Cadastrar"/>
    </q-form>
    <span>Ja possui conta?
      <q-btn  @click="router.push({path: '/'})" no-caps flat class="text-primary">Entre aqui!</q-btn>
    </span>
  </div>
  </q-layout>

</template>

<style scoped>
.container{
  width: 20%;
}

</style>