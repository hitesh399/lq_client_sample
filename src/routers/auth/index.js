import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Auth'
import { getRouterBaseUrl } from '@/utils'
Vue.use(Router)
export default new Router({
    mode: 'history',
    base: getRouterBaseUrl(),
    routes: [
      {
        path: '/',
        name: 'login',
        title: 'Login',
        component: Login,
        hidden: true,
        meta: {heading: 'Login'}
      }
    ]
})