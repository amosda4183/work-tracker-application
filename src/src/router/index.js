import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/User/Login'
import Register from '@/components/User/Register'
import Profile from '@/components/User/Profile'
import NewDay from '@/components/Day/NewDay'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({

  routes: [
    {
      path: '/',
      name: 'home',
      component:Home
    },
    {
      path: '/login',
      name: 'login',
      component:Login

    },
    {
      path: '/register',
      name: 'register',
      component:Register
    },
    {
      path: '/profile',      
      name: 'profile',
      component:Profile,
      beforeEnter: AuthGuard //only allows authenticated access to page
    },
    {
      path: '/newDay',
      name: 'newDay',
      component:NewDay,
      beforeEnter: AuthGuard
    }
  ],

  mode:'history'
})
