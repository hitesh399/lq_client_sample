import lqForm from 'lq-form'
import store from '../store'
import Vue from 'vue'
import rules from '../rules';
Vue.use(lqForm, { store })
window.validatejs.validators = {
  ...window.validatejs.validators,
  ...rules
}