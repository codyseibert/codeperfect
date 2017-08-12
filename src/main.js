
import Vue from 'vue'
import App from './components/App.vue'

import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import VueCodeMirror from 'vue-codemirror'
import 'vue-material/dist/vue-material.css'
import 'codemirror/mode/javascript/javascript'
import { sync } from 'vuex-router-sync'
import store from './store/store'
import VueHighlightJS from 'vue-highlightjs'

Vue.use(VueMaterial)
Vue.use(VueRouter)
Vue.use(VueCodeMirror)
Vue.use(VueHighlightJS)

import Snippits from './components/views/snippits/main.vue'
import Practice from './components/views/practice.vue'
import Results from './components/views/results.vue'

Vue.material.registerTheme('default', {
  primary: {
    color: 'cyan',
    hue: 400,
    textColor: 'white'
  },
  accent: 'red',
  warn: 'red'
})

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
    props: (route) => ({snippitId: parseInt(route.params.snippitId)})
  },
  {
    name: 'results',
    path: '/results/:snippitId',
    component: Results,
    props: (route) => ({snippitId: parseInt(route.params.snippitId)})
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
