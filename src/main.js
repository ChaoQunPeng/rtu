import Vue from "vue";
import { router } from "./router/index";
import App from "./App.vue";
import Vuex from 'vuex'

import axios from "axios";

// axios.defaults.baseURL = '/api/';

// axios.defaults.baseURL = 'api/';

Vue.use(Vuex)

// 出现下面这个错误可能是路由导入出错了
// Error in render: "TypeError: Cannot read property 'matched' of undefined"

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  }
})

new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h => h(App)
});



import('./assets/theme/app.less');
import('./assets/icon/iconfont.css');