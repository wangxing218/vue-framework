import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Index from '../page/Index.vue'
import Home from '../page/Home.vue'
import Login from '../page/Login.vue'

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home,
        },
        {
          path: '/login',
          name: 'Login',
          component: Login,
        },
      ]
    }
  ],
})

export default router