import Vue from "vue";
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from "../views/home/index.vue";
import Detail from "../views/detail/index.vue";
import Record from "../views/record/index.vue";
import Edit from "../views/edit/index.vue";
import Recycle from "../views/recycle/index.vue";
import Page500 from '../views/exception/500.vue'

const routes = [
  { path: '/home', component: Home, name: "home" },
  { path: '/detail/:id', component: Detail, name: "detail" },
  { path: '/record/:id', component: Record, name: "record" },
  { path: '/edit/:experienceId', component: Edit, name: "edit" },
  { path: '/recycle', component: Recycle, name: "recycle" },
  { path: '/page500', component: Page500, name: "page500" },
  { path: '', component: Home, redirect: '/home' }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'actived'
})

export {
  router
}