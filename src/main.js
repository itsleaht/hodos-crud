// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import 'bulma/bulma.sass'
import VueHighlightJS from 'vue-highlightjs'

Vue.use(VueResource)
Vue.use(VueHighlightJS)
Vue.config.productionTip = process.env.NODE_ENV === 'production'
Vue.prototype.$API_URL = (Vue.config.productionTip) ? 'http://leatanda.fr/hodos-api' : 'http://localhost:2000'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
