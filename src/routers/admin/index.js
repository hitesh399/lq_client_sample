import {getRouterBaseUrl} from '@/utils'
import Vue from 'vue'
import Router from 'vue-router'
import DashBoard from '@/views/Admin'
import NoFound from '@/views/404'
import Logout from '@/views/Logout'
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: getRouterBaseUrl(),
    routes: [
      {
        path: '/',
        name: 'dashboard',
        title: 'Dashborad',
        component: DashBoard,
        meta: {heading: 'Dashborad'}
      },
      {
        path: '/logout',
        name: 'logout',
        title: 'Log Out',
        component: Logout,
        meta: {heading: 'Log Out'}
      },
      {
        path: '*',
        name: 'NoFound',
        title: 'NoFound',
        component: NoFound,
        hidden: true,
        meta: {heading: 'NoFound'}
      }
    ]
})