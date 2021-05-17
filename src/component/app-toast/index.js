import Vue from 'vue'
import ToastComponent from './main.vue'


let instance = null
let tick = null

// init constructor
let ToastConstructor = Vue.extend(ToastComponent);

// 初始化
let initInstance = () => {
  instance = new ToastConstructor({
    el: document.createElement('div')
  });
  document.body.appendChild(instance.$el);
}

// 显示
let Toast = (content, options = {}) => {
  !instance && initInstance()
  clearTimeout(tick)
  instance.content = content
  instance.show = true
  tick = setTimeout(() => {
    instance.show = false
    clearTimeout(tick)
  }, instance.duration);
}

export default {
  install(Vue) {
    Vue.prototype.$toast = Toast;
  }
}