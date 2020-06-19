import Vue from "vue";

const pcqButton = Vue.directive('pcq-button', {
  bind: function (el, binding, vnode) {
    const prefix = `pcq-btn`;
    el.classList.add(prefix);
    
    const btnType = el.getAttribute("btnType");
    el.classList.add(`${prefix}-${btnType}`);
  }
})

export {
  pcqButton
}