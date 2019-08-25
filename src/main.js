import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router'


import VueResource from 'vue-resource'
Vue.use(VueResource)

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

import mui from './lib/mui/js/mui'
Vue.prototype.$mui = mui;

import './lib/mui/css/mui.min.css'


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
