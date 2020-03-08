import Vue from "vue";
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from "./home/home.vue";
import Detail from "./detail/detail.vue";
import Record from "./record/record.vue";

const routes = [
  { path: '', component: Home },
  { path: '/home', component: Home, name: "home" },
  { path: '/detail/:id', component: Detail, name: "detail" },
  { path: '/record/:id', component: Record, name: "record" },
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'actived'
})

export {
  router
}
