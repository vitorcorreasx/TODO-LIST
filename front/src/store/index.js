import { defineStore } from 'pinia'

export const useUserStore = defineStore('userId', {
  state: () => {
    return {
      userId: null
    }
  },
  getters:{
    loggedId(){
      return this.userId
    }
  }
})