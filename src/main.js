
import Vue from 'vue'
import App from './components/App.vue'

import VueRouter from 'vue-router'
// import VueMaterial from 'vue-material'
import VueCodeMirror from 'vue-codemirror'
// import 'vue-material/dist/vue-material.css'
import 'codemirror/mode/javascript/javascript'
import { sync } from 'vuex-router-sync'
import store from './store/store'
import VueHighlightJS from 'vue-highlightjs'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
// import VueCharts from 'vue-chartjs'

// Vue.use(VueMaterial)
Vue.use(VueRouter)
Vue.use(VueCodeMirror)
Vue.use(VueHighlightJS)
Vue.use(Vuetify)
// Vue.use(VueCharts)

import Snippits from './components/views/snippits/main.vue'
import Practice from './components/views/practice.vue'
import Progress from './components/views/progress.vue'
import Results from './components/views/results.vue'
import Login from './components/views/Login.vue'

const routes = [
  {
    name: 'snippits',
    path: '/snippits',
    component: Snippits,
  },
  {
    name: 'practice',
    path: '/practice/:snippitId',
    component: Practice,
    props: true
  },
  {
    name: 'progress',
    path: '/progress/:snippitId',
    component: Progress,
    props: true
  },
  {
    name: 'results',
    path: '/results',
    component: Results
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    path: '*',
    redirect: '/snippits'
  }
]

const router = new VueRouter({
  routes
})

sync(store, router)

new Vue({
  router,
  store,
  components: {
    App
  }
}).$mount('#app')
