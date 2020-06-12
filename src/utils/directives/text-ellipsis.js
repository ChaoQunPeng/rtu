import Vue from "vue";

let flag = true;
let obj = {}
const textEllipsis = Vue.directive('text-ellipsis', {
  bind: function (el, binding, vnode) {
    // console.log(el);
    // console.log(binding);
    // console.log(vnode);
  }
})

export {
  textEllipsis
}