// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFontAwesome, faTwitterSquare, faFacebookSquare, faInstagramSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faSearch, faChevronRight, faBurn, faTimes, faHeart, faStar, faMapMarkerAlt, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueSimpleAlert from 'vue-simple-alert'
import firebase from 'firebase'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Font Awesome
library.add(
  faSearch,
  faChevronRight,
  faBurn,
  faTimes,
  faHeart,
  faStar,
  faFontAwesome,
  faTwitterSquare,
  faFacebookSquare,
  faInstagramSquare,
  faLinkedin,
  faMapMarkerAlt,
  faShoppingBag
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Firebase
var firebaseConfig = {
  apiKey: 'AIzaSyCpcFAjr6rd9Haff08Fqb1GAeoNqH5tRuA',
  authDomain: 'mcmakler-1d110.firebaseapp.com',
  projectId: 'mcmakler-1d110',
  storageBucket: 'mcmakler-1d110.appspot.com',
  messagingSenderId: '255497323205',
  appId: '1:255497323205:web:7084c1e4616770815366ac'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

//  Vue Axios
Vue.use(VueAxios, axios)

// Simple Alert
Vue.use(VueSimpleAlert)

// Bus
export const bus = new Vue()

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
