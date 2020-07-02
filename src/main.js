import Vue from "vue";
import App from "./App.vue";
import Vuex from 'vuex';
import { router } from "./router/index";
import CKEditor from '@ckeditor/ckeditor5-vue';

import './utils/mixin';

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

import Viser from 'viser-vue'
Vue.use(Viser)

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
});


// document.addEventListener('keydown', event => {
//   switch (event.code) {
//     case 'Backspace':
//     // case 'ArrowLeft':
//       router.go(-1);
//       break;
//     // case 'ArrowRight':
//     //   this.$router.go(1);
//     //   break;
//     default:
//       break;
//   }
// });

new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h => h(App)
});