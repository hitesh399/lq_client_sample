import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import profile from './modules/profile'
import getters from './getters'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app,
    profile
  },
  getters
})

export default store
