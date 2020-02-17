import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import routes from './routes.js'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

Vue.config.productionTip = false

Vue.use(VueRouter)


new Vue({
  el: '#app',
  render: h => h(App),
  routes
}).$mount('#app')
