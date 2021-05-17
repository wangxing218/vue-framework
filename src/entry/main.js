import 'core-js/features/promise'
import Vue from 'vue'
import store from '../store/index'
import App from './app.vue'

// 取消控制台无关提示
Vue.config.devtools = false
Vue.config.productionTip = false

// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
import '@css/common.scss'
import '@css/home.scss'

// 引入ElementUI组件
import {
  Button,
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Container,
  Header,
  Aside,
  Menu,
  MenuItem,
  Submenu,
  Main,
  Breadcrumb,
  BreadcrumbItem,
  Select,
  Option,
  DatePicker,
  Table,
  TableColumn,
  Loading,
  Message,
} from 'element-ui'

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Main)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Table)
Vue.use(TableColumn)

Vue.use(Loading.directive)
Vue.$message = Message

// 挂载全局方法
import '@service/filter'
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