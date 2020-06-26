import Vue from "vue";
import ModalComponent from "./modal.vue";

Vue.component('modal', ModalComponent);

const ModalConstructor = Vue.extend(ModalComponent);

export const Modal = function (params) {
  const instance = new ModalConstructor({
    data: {
      isPluginCall: true,
    },
    propsData: {
      visible: true,
      ...params
    }
  });
  instance.$mount();
  document.body.appendChild(instance.$el);
  
  return instance;
}

export default {
  install(Vue) {
    Vue.prototype.$modal = Modal;
  }
}