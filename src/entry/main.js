import 'core-js/features/promise'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/css/common.scss'

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})