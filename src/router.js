import Vue from "vue";
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from "./home/home.vue";
import Detail from "./detail/detail.vue";
import Record from "./record/record.vue";

const routes = [
  { path: '', component: Home },
  { path: '/home', component: Home },
  { path: '/detail/:id', component: Detail },
  { path: '/record/:id', component: Record },
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'actived'
})

export {
  router
}
