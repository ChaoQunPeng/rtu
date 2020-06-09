import Vue from 'vue';
import { tools } from './utils'

export const expFormat = Vue.filter('expFormat', (value, key) => {
  let a = tools.getPhaseInfo(value);
  let b = tools.getProgressLength(value, a);
  let data = { ...a, ...b };
  return data[key];
});