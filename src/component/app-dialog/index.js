import Vue from 'vue'
import Dialog from './dialog.vue'
import Confirm from './confirm.vue'


// 确认弹框
const ConfrimInit = Vue.extend(Confirm)
const instance = new ConfrimInit({
  el: document.createElement('div')
})
const ConfirmFunc = (msg, options={}) => {
  !instance.__loaded && document.body.appendChild(instance.$el)
  instance.__loaded = true
  instance.content = msg
  instance.show = true
  instance.sureText =  options.sureText || '确定'
  instance.cancelText =  options.cancelText || '取消'
  let pro = new Promise((resolve, reject) => {
    instance.$on('sure',()=>{
      resolve()
    })
    instance.$on('cancel',()=>{
      reject()
    })
  })
  return pro
}

const AlertFunc = (msg, options={}) => {
  !instance.__loaded && document.body.appendChild(instance.$el)
  instance.__loaded = true
  instance.content = msg
  instance.show = true
  instance.sureText =  options.sureText || '确定'
  instance.cancelText =  ''
  let pro = new Promise((resolve, reject) => {
    instance.$on('sure',()=>{
      resolve()
    })
  })
  return pro
}

export default {
  install(Vue) {
    Vue.component('pub-dialog', Dialog)
    Vue.prototype.$confirm = ConfirmFunc
    Vue.prototype.$alert = AlertFunc
  }
}