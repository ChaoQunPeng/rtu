import Vue from "vue";
import App from "./App.vue";
import Vuex from 'vuex';
import { router } from "./router/index";
import CKEditor from '@ckeditor/ckeditor5-vue';

// component
import './components/index';

// filters & directives
import './utils/filters/index';
import './utils/directives/index';

// style
import './assets/theme';
import './components/style';

// other plugins
Vue.use(Vuex)
Vue.use(CKEditor)

//axios 
import axios from './utils/interceptors.js';

// global setting
import './setting';

Vue.prototype.$axios = axios;

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