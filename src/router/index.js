import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Add from '@/components/Add'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import Appartments from '@/components/Appartments'

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
      path: '/appartments',
      name: 'Appartments,',
      component: Appartments
    }
  ]
})
