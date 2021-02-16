import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import Appartments from '@/components/Appartments'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/dashboard',
      name: 'Dashboard',
      get component () {
        if (localStorage.signedIn) {
          return Dashboard
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
