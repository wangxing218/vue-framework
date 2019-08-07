import Main from './main.vue'


export default {
  install(Vue) {
    Vue.component('app-page', Main)
  },
  AppPage: Main
}