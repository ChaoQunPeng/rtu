import Vue from "vue";
import ModalComponent from "./Modal.vue";

const ModalConstructor = Vue.extend(ModalComponent);

export const Modal = function (params) {
  const instance = new ModalConstructor({
    data: {
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