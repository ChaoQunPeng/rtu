import Vue from "vue";
import App from "./App.vue";
import Vuex from 'vuex'
import CKEditor from '@ckeditor/ckeditor5-vue';
import { router } from "./router/index";
import filters from './utils/filters';
import directives from './utils/directives';

import axios from './utils/interceptors.js';

if (ENV == 'dev') {
  axios.defaults.baseURL = 'http://localhost:3100/api/';
} else {
  axios.defaults.baseURL = 'http://localhost:3200/api/';
}

Vue.prototype.$axios = axios;


import Message from "./components/message/index";
Vue.use(Message)

import Modal from "./components/modal/index";
Vue.use(Modal)

Vue.use(Vuex)
Vue.use(CKEditor)

// 注册过滤器
filters();
// 注册指令
directives();

// 设置草稿的localStore
if (!localStorage.getItem("RTU_DRAFT")) {
  localStorage.setItem("RTU_DRAFT", "{}");
}

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

if (ENV == 'dev') {
  document.title += '-dev';
} else {
  document.title += '-prod';
}

import('./assets/theme/app.less');
import('./assets/icon/iconfont.css');