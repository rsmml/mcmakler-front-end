// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFontAwesome, faTwitterSquare, faFacebookSquare, faInstagramSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faSearch, faChevronRight, faBurn, faTimes, faHeart, faStar, faMapMarkerAlt, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'

// Import Bootstrap an BootstrapVue CSS files (order is important)
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

//  Vue Axios
Vue.use(VueAxios, axios)

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
