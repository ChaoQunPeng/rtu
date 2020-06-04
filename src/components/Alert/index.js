import Vue from 'vue';
import MessageComponent from './Message.vue'

// Vue.extend()返回一个Vue的子类，可以new再创建一个组件实例
const MessageConstructor = Vue.extend(MessageComponent);

// 这个params就是外部调用时传进来的参数 this.$message(params);
const Message = function (params) {
  const instance = new MessageConstructor({
    data: {
      content: params
    }
  }).$mount(); // 这里执行$mount()挂载到组件根元素上

  // 把这个根元素添加body里
  document.body.appendChild(instance.$el);
  return instance;
}


export default {
  // 这里是Vue插件的用法，把这个方法以原型链的方式挂到Vue上，就可以使用this.$message()啦~
  /**
   * 不对，还有一步，要在主入口js文件里这样一下
     import Message from "./message/index";
    Vue.use(Message)
   */
  install(Vue) {
    Vue.prototype.$message = Message;
  }
}