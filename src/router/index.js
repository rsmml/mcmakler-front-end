import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Add from '@/components/Add'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import Apartments from '@/components/Apartments'
import MyApartments from '@/components/MyApartments'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: Home
    },
    {
      path: '/add',
      name: 'Add',
      get component () {
        if (localStorage.signedIn) {
          return Add
        } else {
          return SignIn
        }
      }
    },
    {
      path: '/myappartments',
      name: 'MyApartments',
      get component () {
        if (localStorage.signedIn) {
          return MyApartments
        } else {
          return SignIn
        }
      }
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/apartments',
      name: 'Apartments,',
      component: Apartments
    }
  ]
})
