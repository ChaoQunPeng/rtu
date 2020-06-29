import Vue from 'vue';

const pcqInput = Vue.directive('pcq-input', {
  bind: function (el, binding, vnode) {
    el.classList.add('pcq-input');

    if (el instanceof HTMLElement) {
      const keyValue = Math.ceil(Math.random() * 10000);
      el.setAttribute(`key`, keyValue)
    }
  }
})

export {
  pcqInput
}