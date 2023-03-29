<script setup>
import { ref, computed} from 'vue'
import { useMutation } from 'villus';
import router from '../routes';
import { register } from '../graphql/index'
import { useUserStore } from '../store'
import { useQuasar } from 'quasar';

const $q = useQuasar()
const username = ref('')
const password = ref('')
const isPwd = ref(true)

const visible = computed(() => isPwd.value ? 'visibility_off' : 'visibility')
const type = computed(() => isPwd.value ? 'password' : 'text')

const showPassword = () => {
  isPwd.value = !isPwd.value
}

const signUp = (username, password) => {
  const newUsername = username.trim()
  const newPassword = password.trim()
  const store = useUserStore()
  const { execute } = useMutation(register)
  if(newUsername && newPassword !== ''){
    execute({
      username: newUsername,
      password: newPassword
    }).then(({data}) => {
        if(data.createUser == null){
          $q.notify({
            type: 'negative',
            message: 'Usuário ja existe!',
            position: 'top-right'
          })
          return
        }
        if(data.createUser.user_id){
          store.$patch({
              userId: data.createUser.user_id
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
      <q-input :rules="[ val => val.length >= 5 || 'Por favor, minimo 5 caracteres']" v-model="username" label="Usuario"/>
      <q-input v-model="password" label="Senha" :rules="[ val => val.length >= 5 || 'Por favor, minimo 5 caracteres']" :type="type">
        <template v-slot:append>
          <q-icon
            :name="visible"
            class="cursor-pointer"
            @click="showPassword"
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