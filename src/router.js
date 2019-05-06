import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login'
import ParentRouteView from './views/ParentRouteView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      title: 'Home',
      component: Home,
      meta: {
        icon: 'dashboard',
        heading: 'Home',
      }
    },
    {
      path: '/',
      name: 'login',
      title: 'Login',
      component: Login,
      hidden: true,
      meta: {heading: 'Login'}
    },
    {
      path: '/admin',
      name: 'admin',
      title: 'Admin Layout',
      meta: {
        icon: 'dashboard',
      },
      component: ParentRouteView,
      children: [
        {
          path: '/test_12',
          name: 'test_12',
          title: 'Stackover Flow',
          component: () => import('./views/Admin.vue'),
          meta: {
            heading: 'Home1',
          }
        },
        {
          path: '/test_11',
          name: 'test_11',
          title: 'Stackover Flow',
          component: () => import('./views/404.vue'),
          meta: {
            heading: 'Home2',
          }
        },
      ]
    },
    { path: '*', hidden: true, component: () => import('@/views/404') },
  ]
})
