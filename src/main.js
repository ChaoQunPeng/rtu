import Vue from "vue";
import App from "./App.vue";
import Vuex from 'vuex';
import { router } from "./router/index";
import CKEditor from '@ckeditor/ckeditor5-vue';
import Viser from 'viser-vue'

// component
import './components/index';

// filters & directives & mixin
import './utils/filters/index';
import './utils/directives/index';
import './utils/mixin';

// style
import './assets/theme';
import './components/style';

//axios 
import axios from './utils/interceptors.js';
Vue.prototype.$axios = axios;

// startup
import './startup';

// other plugins
Vue.use(CKEditor)
Vue.use(Vuex)
Vue.use(Viser)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  }
});

new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h => h(App)
});