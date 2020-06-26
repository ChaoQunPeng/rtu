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

import './setting';

Vue.prototype.$axios = axios;

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  }
})


Vue.component('my-comp', {
  template: `<input value="click me and check the console" size="40">`
});

Vue.directive('my-directive', {
  bind: function (el, binding, vnode) {
    el.addEventListener('click', function (e) {
      var eventName = 'my-event';
      var eventData = {myData: 'stuff - ' + binding.expression}
      if (vnode.componentInstance) {
      	vnode.componentInstance.$emit(eventName, {detail: eventData}); // use {detail:} to be uniform
      } else {
      	vnode.elm.dispatchEvent(new CustomEvent(eventName, {detail: eventData}));
      }

    })
  }
})

new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h => h(App)
});