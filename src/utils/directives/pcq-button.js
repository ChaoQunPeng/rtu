import Vue from "vue";

const pcqButton = Vue.directive('pcq-button', {
  bind: function (el, binding, vnode) {
    // let a = new HTMLElement();
    // a.hasAttribute()

    const prefix = `pcq-btn`;
    el.classList.add(prefix);

    const btnType = el.getAttribute("btnType");
    el.classList.add(`${prefix}-${btnType}`);

    if (el.hasAttribute("block")) {
      if (el.getAttribute("block") == "true") {
        el.classList.add("block");
      }
    }
    // console.log(el.getAttribute("block"));
  }
})

export {
  pcqButton
}