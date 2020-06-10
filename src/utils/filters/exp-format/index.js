import Vue from 'vue';
import { tools } from './utils'

const expFormatFunc = (value, key) => {
  let a = tools.getPhaseInfo(value);
  let data = { ...a };
  return data[key];
}

export const expFormat = Vue.filter('expFormat', expFormatFunc);