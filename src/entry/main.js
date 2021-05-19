import 'core-js/features/promise'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/css/common.scss'
Vue.config.productionTip = false

import { 
  Button, 
  Panel 
} from 'vant'
Vue.use(Button)
Vue.use(Panel)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})