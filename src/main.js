// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import 'bulma/bulma.sass'

Vue.use(VueResource)
Vue.config.productionTip = process.env.NODE_ENV === 'production'
Vue.prototype.$API_URL = (Vue.config.productionTip) ? 'http://leatanda.fr/hodos-api' : 'http://leatanda.fr/hodos-api'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
