import Vue from "vue";
import ModalComponent from "./Modal.vue";

const ModalConstructor = Vue.extend(ModalComponent);

export const Modal = function (params) {
  const instance = new ModalConstructor({
    data: {
      isPluginCall: true,
      ...params
    },
    propsData: {
      visible: true
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