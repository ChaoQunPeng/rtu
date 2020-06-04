import Vue from "vue";
import Index from "./Index.vue";

let IndexConstructor = Vue.extend(Index);

const IndexCom = function (params) {
  console.log(params);
  const ins = new IndexConstructor();
  const ele = ins.$mount();
  document.body.appendChild(ins.$el);
  return ins;
}

export default {
  install(Vue) {
    Vue.prototype.$tanchuang = IndexCom;
  }
}