import Vue from 'vue';
import MessageComponent from './Message.vue'

const MessageConstructor = Vue.extend(MessageComponent);

let i = 0;
let hasMessageContainer = false;

export const Message = function (params) {
  createMessageContainer();
  const data = {};
  if (typeof params === "string") {
    data.content = params;
    data.componentCount = i;
  }
  const instance = new MessageConstructor({
    data: data
  }).$mount();
  // document.body.appendChild(instance.$el);
  document.getElementById("messageContainer").appendChild(instance.$el);
  i++;
  instance._mid = i;
  return instance;
}

/**
 * 创建放置message的容器
 */
function createMessageContainer() {
  if (!hasMessageContainer) {
    const div = document.createElement("div");
    div.id = "messageContainer";
    div.classList.add("message-container");
    document.body.appendChild(div);
    hasMessageContainer = true;
  }
}

export default {
  install(Vue) {
    Vue.prototype.$message = Message;
    // Vue.prototype.$message.info = () => alert("INfO");
  }
}