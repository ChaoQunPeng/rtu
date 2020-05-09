import Vue from "vue";
import App from "./App.vue";
import Vuex from 'vuex'
import CKEditor from '@ckeditor/ckeditor5-vue';

import { router } from "./router/index";

import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3100/api/';

Vue.use(Vuex)
Vue.use(CKEditor)

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