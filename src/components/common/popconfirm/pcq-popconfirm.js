import Vue from "vue";
import PopconfirmComponent from "./popconfirm.vue";

const PopconfirmConstructor = Vue.extend(PopconfirmComponent);

Vue.component("popconfirm", PopconfirmComponent);

let i = 0;

// const emit = (vnode, name, data) => {
//   debugger
//   var handlers = (vnode.data && vnode.data.on) ||
//     (vnode.componentOptions && vnode.componentOptions.listeners);

//   if (handlers && handlers[name]) {
//     handlers[name].fns(data);
//   }
// }
// emit(btnVnode, 'bar', { some: 'event', data: 'here' });


const pcqPopconfirm = Vue.directive('pcq-popconfirm', {
  bind: function (el, binding, vnode) {
    let popconfirm;

    el.addEventListener("click", (event) => {

      el.style.position = "relative";

      if (popconfirm && popconfirm.isTrigger) {
        popconfirm.isTrigger = false;
        popconfirm.$destroy();
        return;
      }

      // if (vnode.componentInstance) {
      //   vnode.componentInstance.$emit("popClick", { datail: "内容" });
      // } else {
      //   vnode.elm.dispatchEvent(new CustomEvent("popClick", { datail: "内容" }));
      // }

      const title = el.getAttribute("pcqPopconfirmTitle");
      popconfirm = getInstance(title);
      console.log(popconfirm);
      const $el = popconfirm.$el;
      el.appendChild($el);
      const btnVnode = popconfirm._vnode.children[1].children[1].children[1];
      console.dir(btnVnode);

      btnVnode.elm.addEventListener("click", () => {
        el.dispatchEvent(new CustomEvent(`onConfirm`));
        popconfirm.$destroy();
      });

      // if (btnVnode.componentInstance) {
      //   btnVnode.componentInstance.$emit(`popOk`, { detail: `eventData` }); // use {detail:} to be uniform
      // } else {
      //   btnVnode.elm.addEventListener("click", () => {
      //     btnVnode.elm.dispatchEvent(new CustomEvent(`popOk`, { detail: `eventData` }));
      //     $el
      //   });
      // }



      // $el.style.top = -(Math.ceil($elRect.height) + 20) + "px";
      // $el.style.marginLeft = -(Math.ceil($elRect.width) / 2) + "px";
      // console.dir(el);
      const $elRect = $el.getBoundingClientRect();
      $el.style.width = el.offsetWidth + "px";
      $el.style.height = el.offsetHeight + "px";
      $el.style.top = -((el.offsetHeight) + 20) + "px";
      $el.style.marginLeft = -(Math.ceil(el.offsetWidth) / 2) + "px";

      // let div = document.createElement("div");
      // div.innerHTML = "test";
      // div.style.border = "1px solid";
      // div.style.position = "absolute";
      // div.style.left = "50%";
      // el.appendChild(div);
      // div.style.color = "#f00";
      // const divRect = div.getBoundingClientRect();
      // div.style.top = -(Math.ceil(divRect.height) + 20) + "px";
      // div.style.marginLeft = -(Math.ceil(divRect.width) / 2) + "px";

      // console.log("offsetX", event.offsetX);
      // console.log("clientX", event.clientX);
      // console.log("screenX", event.screenX);


    });

    document.body.addEventListener("click", (e) => {
      // console.log(e.screenX);
      // console.log(e);
      // console.log(e.screenX);
      // console.log(e.screenY);
      // if (e.target.className.indexOf("pcq-popconfirm") == -1) {
      //   if (popconfirm) {
      //     popconfirm.$destroy();
      //   }
      // }
    });

  }
})

function getInstance(params) {
  const instance = new PopconfirmConstructor({
    propsData: {
      content: params
    }
  }).$mount();

  return instance;
}

export {
  pcqPopconfirm
}