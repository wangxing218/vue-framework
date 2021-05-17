import Vue from 'Vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: 'Tom'
  },
  mutations: {
    user(state, data){
      state.user = data
    }
  }
})

export default store