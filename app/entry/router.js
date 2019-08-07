import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 引入页面组件
import Login from '../page/login.vue'
import Layout from '../page/layout.vue'
import Home from '../page/home.vue'

// 定义路由
const routes = [{
    path: '/',
    component: Layout,
    children: [{
      path: '/',
      component: Home,
      name: 'Home'
    }]
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  },
]

// 跳由实例化
const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
})

// 路由拦截
router.beforeEach((to, from, next) => {
  // 做一个路由拦截
  next()
})

// 路由跳转，滚动条置顶
router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router