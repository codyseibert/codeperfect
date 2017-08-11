
import Vue from 'vue'
import App from './app.vue'

import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import VueCodeMirror from 'vue-codemirror'
import 'vue-material/dist/vue-material.css'
import 'codemirror/mode/javascript/javascript'

Vue.use(VueMaterial)
Vue.use(VueRouter)
Vue.use(VueCodeMirror)

import Snippits from './components/views/snippits/main.vue'
import Practice from './components/views/practice/main.vue'

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
    path: '*',
    redirect: '/snippits'
  }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  components: {
    App
  }
}).$mount('#app')
