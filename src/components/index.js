import Vue from 'vue';

// button - directive
import './common/button/pcq-button';

// input - directive
import './common/input/pcq-input';

import { default as message } from './common/message';

import { default as modal } from './common/modal';

const components = [
  message,
  modal
];

components.map(component => {
  Vue.use(component);
});