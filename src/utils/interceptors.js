import axios from 'axios'   //引入 axios

import { Message } from '../components/message/index.js'
import Vue from 'vue';

let showLoading = false;
let div;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  createLoading();
  return config;
}, function (error) {
  div.style.display = "none";
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  div.style.display = "none";
  response.msg = response.data.msg;
  if (response.data.code != 200) {
    response.isSuccess = false;
    return Promise.reject(response);
  }
  return response;
}, function (error) {
  div.style.display = "none";
  return Promise.reject(error);
});

function createLoading(display) {
  div = document.createElement("div");
  div.classList.add("loading");
  div.innerHTML = `
    <div class="loading-icon">loading...</div>
  `;
  document.body.appendChild(div);
}

export default axios;