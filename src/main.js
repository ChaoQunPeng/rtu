import Vue from "vue";
import { router } from "./router";

import App from "./app.vue";

import Vuex from 'vuex'

import { mockData } from "./mock.data.js";

Vue.use(Vuex)

// 出现下面这个错误可能是路由导入出错了
// Error in render: "TypeError: Cannot read property 'matched' of undefined"


const store = new Vuex.Store({
  state: {
    mockData: mockData
  },
  mutations: {
    plus1(store, payload) {
      const mockDataList = store.mockData.list;
      mockDataList.forEach(e => {
        if (e.id == payload.id) {
          e.items.push(payload);
          e.exp = e.items.length;
        }
      });
    },
    add(store, payload) {
      store.mockData.list.push({
        id: store.mockData.list.length + 1,
        name: payload.title,
        exp: 0,
        items: []
      });
    }
  }
})

new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h => h(App)
});

import('./app.less');
import('./assets/icon/iconfont.css');