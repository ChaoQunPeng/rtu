import axios from 'axios'   //引入 axios

import { Message } from '../components/message/index.js'
import Vue from 'vue';
import Router from 'vue-router';

let router = new Router();

let showLoading = false;
// 多个遮罩
let divCollection = [];
let div = null;

// 一个遮罩
let collection = [];

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 根据globalLoading决定是否启用全局loading
  config.globalLoading = config.hasOwnProperty("globalLoading") ? config.globalLoading : true;
  if (config.globalLoading) {
    config.id = `${config.method}_${Date.now()}`
    collection.push(config);
    createLoading();
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  console.log(response)

  response.msg = response.data.msg;
  const code = response.data.code;
  if (code != 200) {
    div.style.display = "none";
    window.location.href = "http://localhost:3100/page500";
    return Promise.reject(response);
  }
  closeLoading(response.config);
  return response;
}, function (error) {
  return Promise.reject(error);
});

function createLoading() {
  if (div) {
    return;
  }

  div = document.createElement("div");
  div.classList.add("loading");
  div.innerHTML = `
    <div class="loading-icon">loading...</div>
  `;
  document.body.appendChild(div);
}

function closeLoading(resConfig) {

  if (collection.length > 0) {

    collection = collection.filter(e => e.id != resConfig.id);

    if (collection.length == 0) {
      div.style.display = "none";
    }
  }
}

export default axios;