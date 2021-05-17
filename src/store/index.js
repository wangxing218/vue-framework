import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import getters from './getters.js'
import mutations from './mutations.js'

const store = new Vuex.Store({
  state: {
    loginUser: {}
  },
  getters: {
    getUser: state => {
      return state.loginUser
    }
  },
  mutations: {
    setUser(state, user) {
      state.loginUser = user
    }
  },
})

export default store