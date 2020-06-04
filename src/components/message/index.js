import Vue from 'vue';
import MessageComponent from './Message.vue'

const MessageConstructor = Vue.extend(MessageComponent);

let i = 0;
const Message = function (params) {
  const data = {};
  if (typeof params === "string") {
    data.content = params;
    data.componentCount = i;
  }
  const instance = new MessageConstructor({
    data: data
  }).$mount();
  document.body.appendChild(instance.$el);
  i++;
  return instance;
}


export default {
  install(Vue) {
    Vue.prototype.$message = Message;

    // Vue.prototype.$message.info = () => alert("INfO");
  }
}