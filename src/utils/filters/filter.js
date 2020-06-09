import Vue from 'vue';
import { expFormat } from './exp-format/index';

const toHour = Vue.filter('toHour', (val) => {
  if (val == null || isNaN(val)) return 0;
  let min = parseFloat(val);
  let hour = min / 60;
  return hour.toFixed(2);
});

const any = Vue.filter('any', (val) => {
  const value = val.toUpperCase();
  return value;
});



const filters = function () {
  toHour,
    any,
    expFormat
}

// const filters = {
//   toHour,
//   any
// }

export default filters;