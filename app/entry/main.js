import 'core-js/features/promise'
import Vue from 'vue'
import store from '../store/index'
import App from './app.vue'

// 取消控制台无关提示
Vue.config.devtools = false
Vue.config.productionTip = false

// 引入样式
// import 'element-ui/lib/theme-chalk/index.css'
import '@css/common.scss'
import '@css/home.scss'
import '@service/filter'

// 引入ui组件
import ElementUI from 'element-ui'
Vue.use(ElementUI)

// 挂载ajax
import ajax from '@service/ajax'
Vue.prototype.$ajax = ajax

// 业务组件
import AppToast from '@component/app-toast'
import AppPage from '@component/app-page'
Vue.use(AppToast)
Vue.use(AppPage)

// 实例化
import router from './router'
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})