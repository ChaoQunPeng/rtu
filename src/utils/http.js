import Vue from "vue";
import axios from 'axios';

const http = {};

const post = option => {
  option;
  debugger
  return new Promise((resolve, reject) => {
    resolve(true);
    reject(false);
  });
}

http.post = post;

export default {
  install(Vue) {
    Vue.prototype.$axios = http;
  }
}