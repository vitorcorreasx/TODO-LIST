import { defineStore } from 'pinia'

export const useUserStore = defineStore('userId', {
  state: () => {
    return {
      userId: null
    }
  },
  actions:{
    reset(){
      this.userId = null
    }
  },
  getters:{
    loggedId(){
      return this.userId
    }
  },
  persist: {
    enabled: true
  },
})